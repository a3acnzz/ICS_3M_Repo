import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../../service/program.service';
import { MatDialogRef } from '@angular/material';
import { Program } from '../../../model/Program';
import { Subscription } from 'rxjs';
import * as _ from 'lodash/lodash.min';
import { AppointmentService } from '../../../service/appointment.service';
import { AppConstant } from '../../../shared/app.constant';
import * as format from 'date-fns/format';
import { TimeSlotService } from '../../../service/timeslot.service';

@Component({
  selector: 'app-program-date-select-dialog',
  templateUrl: './program-date-select-dialog.component.html',
  styleUrls: ['./program-date-select-dialog.component.css'],
  providers: [ProgramService, TimeSlotService, AppointmentService]
})
export class ProgramDateSelectDialogComponent implements OnInit {

  programId: number;
  existingTimeSlotId: number;
  existingProgramDateId: number;
  program: Program;
  busyLoading: Subscription;
  alerts = [];
  currentTime: string;
  currentDate: Date;

  constructor(
    public dialogRef: MatDialogRef<ProgramDateSelectDialogComponent>,
    private programService: ProgramService,
    private timeSlotService: TimeSlotService,
    private appointmentService: AppointmentService
  ) {
    this.program = new Program();
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.currentTime = format(new Date(), AppConstant.timeFormat);

    // Get program, program dates, and time slots
    this.busyLoading = this.programService.getProgramDates(this.programId).subscribe((results: any) => {
      if (results.length > 0) {
        // this.program = results;
        this.program.programDates = results;

        // Show message if program does not have any current program dates
        // Clean this up during refactoring!!
        const lastProgramDate = _.maxBy(this.program.programDates, 'date');
        if (this.compareDate(lastProgramDate.date) < 0) {
          this.alerts.push({
            msg: 'Sorry, there are no available dates for this program. All dates for this program have passed.',
            type: 'primary',
            id: 'noAvailableDatesAlert'
          });
        }
      }

      // Show message if program does not have any program dates
      if (this.program.programDates.length < 1) {
        this.alerts.push({ msg: 'Sorry, there are no dates for this program.', type: 'primary', id: 'noDatesAlert' });
      }
    });
  }

  getProgramDateTimeSlots(programDateId: number, programDateIndex: number) {
    if (!this.program.programDates[programDateIndex].timeSlots) {
      this.busyLoading = this.timeSlotService.getTimeSlots(programDateId).subscribe((results: any) => {
        if (results) {
          this.program.programDates[programDateIndex].timeSlots = results;
        }
      })
    }
  };

  selectTimeSlot(programDateIndex: number, timeSlotIndex: number) {
    // Get selected program date and time slot
    const returnProgramDate = this.program.programDates[programDateIndex];
    const returnTimeSlot = this.program.programDates[programDateIndex].timeSlots[timeSlotIndex];

    // Check latest time slot availability. See JIRA issue ICS-313
    // this.timeSlotService.isTimeSlotFull(returnTimeSlot.id);

    this.busyLoading = this.timeSlotService.isTimeSlotFull(returnTimeSlot.id).subscribe((results: any) => {
      if (!results.timeSlotFull) {
        console.log('Good to go - valid time slot');
        // If selected time slot has changed
        if (this.existingTimeSlotId !== returnTimeSlot.id) {
          this.busyLoading = this.appointmentService
            // Update pending appointments
            .managePendingAppointment({
              existingTimeSlotId: this.existingTimeSlotId,
              requestedTimeSlotId: returnTimeSlot.id,
              pendingAppointmentInsertedId: null
            })
            .subscribe((managePendingResults: any) => {
              if (managePendingResults) {
                let pendingAppointmentId: number = 0;
                if (managePendingResults.length > 1) {
                  pendingAppointmentId = managePendingResults[0].id;
                }
                // Close dialog box and return selected program date and time slot
                this.close({ programDate: returnProgramDate, timeSlot: returnTimeSlot, pendingAppointmentInsertedId: pendingAppointmentId });
              }
            });
        } else { // If time slot has not changed, return null (no change)
          this.close(null);
        }
      } else {
        this.alerts = [];
        this.alerts.push({
          msg: 'Sorry, that time slot has been filled. Please select a different time slot.',
          type: 'primary',
          id: 'timeSlotFilledAlert'
        });
        this.busyLoading = this.programService.getProgramDates(this.programId).subscribe((programDateResults: any) => {
          if (programDateResults.length > 0) {
            this.program.programDates = programDateResults;
          }
        });
      }
    });
  }

  close(result: any) {
    // Close dialog box with selected data
    this.dialogRef.close(result);
  }

  compareDate(progDateString) {
    const year = progDateString.substr(0, 4);
    const month = progDateString.substr(5, 2);
    const day = progDateString.substr(8, 2);

    const newdate = new Date();
    newdate.setFullYear(year, month - 1, day); // months are 0-11. why, javascript.
    newdate.setHours(0, 0, 0, 0);
    const currentDate = this.currentDate;
    currentDate.setHours(0, 0, 0, 0);
    if (newdate < currentDate) {
      return -1;
    } else if (newdate > currentDate) {
      return 1;
    } else {
      return 0;
    }
  }

  validateTimeSlot(programDate: string, timeSlot: string) {
    const comparedate = this.compareDate(programDate);
    let isValidTimeSlot = false;
    if ((comparedate === 1) || (comparedate === 0 && timeSlot.substr(11, 8) > this.currentTime)) {
      isValidTimeSlot = true;
    }
    return isValidTimeSlot
  }
}
