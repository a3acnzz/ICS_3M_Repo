import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AnnouncementService} from '../../service/announcement.service';
import {AppointmentService} from '../../service/appointment.service';
import * as format from 'date-fns/format';
import {DialogService} from '../../service/dialog.service';
import {Appointment} from '../../model/Appointment';
import {AppConstant} from '../../shared/app.constant';
import {isPast, parse} from 'date-fns';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css'],
  providers: [AppointmentService, AnnouncementService, DialogService]
})
export class MyAppointmentsComponent implements OnInit {

  alerts = [];
  appointmentList: any[];
  busyLoading: Subscription;
  busySave: Subscription;
  systemAnnouncement = '';
  rowsPerPage = AppConstant.rowsPerPageDefault;
  rowsPerPageOptions = AppConstant.rowsPerPageOptions;

  constructor(private appointmentService: AppointmentService,
              private announcementService: AnnouncementService,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    this.busyLoading = this.appointmentService.getUserAppointments().subscribe((results: any) => {
      if (results) {
        this.appointmentList = results;
      }
    });

    this.announcementService.search(null, true).subscribe((results: any) => {
      if (results.length > 0) {
        this.systemAnnouncement = results[0].message;
      }
    });
  }

  cancel(appointmentId: number, appointmentIndex: number) {
    this.dialogService.appointmentCancellation(appointmentId).subscribe((results: any) => {
        if (results.status === 'success') {
          this.appointmentList.splice(appointmentIndex, 1);
          this.alerts.push({
            msg: 'Your appointment has been cancelled.',
            type: 'success',
            closable: true,
            id: 'appointmentCancelledAlert'
          });
        }
      },
      (error: any) => {
        this.alerts.push({
          msg: 'Failed to cancel your appointment.',
          type: 'danger',
          closable: true,
          id: 'cancelFailedAlert'
        });
      });
  }

  reschedule(programId, timeSlotId, programDateId, appointmentId, appointmentIndex) {
    this.dialogService.selectProgramDate(programId, timeSlotId, programDateId).subscribe((results: any) => {
      if (results) {

        const newAppointment = new Appointment();
        newAppointment.programDateId = results.programDate.id;

        const formattedDateString = format(results.programDate.date, AppConstant.fullDateFormat);
        newAppointment.date = formattedDateString;
        newAppointment.timeSlotId = results.timeSlot.id;
        newAppointment.startTime = results.timeSlot.startTime;
        newAppointment.endTime = results.timeSlot.endTime;
        newAppointment.startTimeDisplay = results.timeSlot.startTimeDisplay;
        newAppointment.endTimeDisplay = results.timeSlot.endTimeDisplay;
        newAppointment.firstName = this.appointmentList[appointmentIndex].firstName;
        newAppointment.lastName = this.appointmentList[appointmentIndex].lastName;
        newAppointment.emailAddress = this.appointmentList[appointmentIndex].emailAddress;
        newAppointment.pin = this.appointmentList[appointmentIndex].pin;
        newAppointment.programId = this.appointmentList[appointmentIndex].programId;
        newAppointment.programName = this.appointmentList[appointmentIndex].programName;
        newAppointment.locationId = this.appointmentList[appointmentIndex].locationId;

        this.busyLoading = this.appointmentService.rescheduleAppointment(
          {
            newAppointment: [newAppointment],
            oldAppointment: {appointmentId: appointmentId}
          }
        ).subscribe((rescheduleResults: any) => {
            this.busyLoading = this.appointmentService.getUserAppointments().subscribe((appointmentResults: any) => {
              if (appointmentResults) {
                this.appointmentList = appointmentResults;
              }
            });
            this.alerts.push({
              msg: 'Your appointment has been rescheduled. ' +
                'You will receive a cancellation email for your previous appointment, ' +
                'and a confirmation email for your new appointment.',
              type: 'success',
              closable: true,
              id: 'appointmentRescheduledAlert'
            });
          },
          (error: any) => {
            this.alerts.push({
              msg: 'Failed to reschedule your appointment.',
              type: 'danger',
              closable: true,
              id: 'rescheduleFailedAlert'
            });
          }
        );
      }
    });
  }

  canChangeAppointment(appointment) {
    // Users can cancel or reschedule their appointments up to 48 hours after their appointment date
    let programDate = parse(appointment.programDate.substring(0, 10));
    programDate.setDate(programDate.getDate() + 2);
    programDate.setHours(23, 59, 59);
    return !isPast(parse(programDate));
  }

}
