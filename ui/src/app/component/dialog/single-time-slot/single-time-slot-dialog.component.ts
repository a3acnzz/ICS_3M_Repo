import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TimeSlot } from '../../../model/TimeSlot';
import * as format from 'date-fns/format';
import { AppConstant } from '../../../shared/app.constant';

@Component({
  selector: 'app-single-time-slot-dialog',
  templateUrl: './single-time-slot-dialog.component.html',
  styleUrls: ['./single-time-slot-dialog.component.css']
})
export class SingleTimeSlotDialogComponent implements OnInit {

  submittedProgramDate: String;
  timeSlot: TimeSlot;
  startDateTime: Date;
  endDateTime: Date;
  submitted = false;
  maxAppointmentsValid = true;
  minAppointmentsPerUserValid = true;
  maxAppointmentsPerUserValid = true;
  minApptsPerUserMaxApptsValid = true;
  maxApptsPerUserMaxApptsValid = true;
  maxApptsPerUserMinApptsPerUserValid = true;
  spacetimeContinuumViolated = false;
  isValidStartTime: boolean;

  constructor(public dialogRef: MatDialogRef<SingleTimeSlotDialogComponent>) {
    this.timeSlot = new TimeSlot();
  }

  ngOnInit() {
    // Initialize start time as 8:00 AM
    this.startDateTime = new Date();
    this.startDateTime.setHours(8, 0, 0);
    this.startDateTime.setFullYear(1990, 0, 1);

    // Initialize end time as 5:00 PM
    this.endDateTime = new Date();
    this.endDateTime.setHours(17, 0, 0);
    this.endDateTime.setFullYear(1990, 0, 1);
  }

  submit({ value, valid }: { value: any, valid: boolean }) {
    // Set flags for error messages
    this.minAppointmentsPerUserValid = true;
    this.minApptsPerUserMaxApptsValid = true;
    this.maxApptsPerUserMinApptsPerUserValid = true;
    this.submitted = true;
    this.spacetimeContinuumViolated = value.startDateTime > value.endDateTime;
    this.maxAppointmentsValid = value.maxAppointments > 0;
    if (value.minAppointmentsPerUser || value.minAppointmentsPerUser === 0) {
      this.minAppointmentsPerUserValid = value.minAppointmentsPerUser >= 0;
      this.minApptsPerUserMaxApptsValid = (value.minAppointmentsPerUser <= value.maxAppointments) && (value.minAppointmentsPerUser <= value.maxAppointmentsPerUser);
    }
    this.maxAppointmentsPerUserValid = value.maxAppointmentsPerUser > 0;
    this.maxApptsPerUserMaxApptsValid = value.maxAppointmentsPerUser <= value.maxAppointments;
    if (value.minAppointmentsPerUser || value.minAppointmentsPerUser === 0) {
      this.maxApptsPerUserMinApptsPerUserValid = value.maxAppointmentsPerUser >= value.minAppointmentsPerUser;
    }
    if (valid
      && !this.spacetimeContinuumViolated
      && this.maxAppointmentsValid && this.minAppointmentsPerUserValid && this.maxAppointmentsPerUserValid && this.minApptsPerUserMaxApptsValid && this.maxApptsPerUserMaxApptsValid && this.maxApptsPerUserMinApptsPerUserValid) {
      // Create new time slot
      const timeSlot = new TimeSlot();
      timeSlot.startTimeDisplay = format(value.startDateTime, AppConstant.displayTimeFormat);
      timeSlot.endTimeDisplay = format(value.endDateTime, AppConstant.displayTimeFormat);
      timeSlot.startTime = format(value.startDateTime, AppConstant.timeFormat);
      timeSlot.endTime = format(value.endDateTime, AppConstant.timeFormat);
      timeSlot.maxAppointments = value.maxAppointments;
      timeSlot.minAppointmentsPerUser = value.minAppointmentsPerUser;
      timeSlot.maxAppointmentsPerUser = value.maxAppointmentsPerUser;

      // Pass new time slot back to program detail page
      this.dialogRef.close([timeSlot]);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
