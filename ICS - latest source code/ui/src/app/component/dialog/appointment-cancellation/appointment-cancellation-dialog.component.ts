import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { AppointmentService } from '../../../service/appointment.service';

@Component({
  selector: 'app-appointment-cancellation-dialog',
  templateUrl: './appointment-cancellation-dialog.component.html',
  styleUrls: ['./appointment-cancellation-dialog.component.css'],
  providers: [AppointmentService]
})
export class AppointmentCancellationDialogComponent implements OnInit {

  alerts = [];
  appointmentId: number;
  timeSlotId: number;
  confirm = false;
  busySave: Subscription;
  firstName = '';
  lastName = '';
  programName = '';
  programDate = '';
  startTime = '';
  endTime = '';
  busyLoading: Subscription;
  isRecursive: boolean;
  cancelappointments: any[];

  constructor(public dialogRef: MatDialogRef<AppointmentCancellationDialogComponent>,
    private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.busyLoading = this.appointmentService.getAppointment(this.appointmentId).subscribe((result: any) => {
      if (result) {
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.programName = result.programName;
        this.programDate = result.programDateDisplay;
        this.startTime = result.startTimeDisplay;
        this.endTime = result.endTimeDisplay;
      }
    });
  }

  submit() {
    if (this.confirm && this.appointmentId !== null) {
      if (this.isRecursive) {
        this.cancelappointments.forEach(element => {
          this.busySave = this.appointmentService.cancelAppointment({
            appointmentId: element
          }).subscribe((result: any) => {
            this.dialogRef.close({
              status: 'success'
            });
          },
            (error: any) => {
              this.alerts.push({ msg: 'Failed to save your changes.', type: 'danger', closable: true });
            }
          );
        });

      }
      else {
        this.busySave = this.appointmentService.cancelAppointment({
          appointmentId: this.appointmentId
        }).subscribe((result: any) => {
          this.dialogRef.close({
            status: 'success'
          });
        },
          (error: any) => {
            this.alerts.push({ msg: 'Failed to save your changes.', type: 'danger', closable: true });
          }
        );
      }
    } else {
      this.alerts.push({ msg: 'Please correct the validation errors below.', type: 'danger', closable: true });
    }
  }

  close() {
    this.dialogRef.close({
      status: 'closed'
    });
  }
}
