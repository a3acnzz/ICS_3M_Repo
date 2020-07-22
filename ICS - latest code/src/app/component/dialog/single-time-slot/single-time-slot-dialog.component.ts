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
  minAppointmentsPerUser: number;
  maxAppointmentsPerUser: number;
  timeSlot: TimeSlot;
  startDateTime: Date;
  endDateTime: Date;
  submitted = false;
  maxAppointmentsValid = true;
  maxAppointmentsAndMinAppPerUserValid = true;
  maxAppointmentsAndMaxAppPerUserValid = true;
  spacetimeContinuumViolated = false;
  isValidStartTime: boolean;
  recursiveSingle:boolean;

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
    this.maxAppointmentsValid = true;
    this.maxAppointmentsAndMinAppPerUserValid = true;
    this.maxAppointmentsAndMaxAppPerUserValid = true;

    this.submitted = true;
    this.spacetimeContinuumViolated = value.startDateTime > value.endDateTime;

    if (value.maxAppointments !== null && value.maxAppointments !== undefined) {
      this.maxAppointmentsValid = value.maxAppointments > 0;
      if (this.minAppointmentsPerUser !== null && this.minAppointmentsPerUser !== undefined) {
        this.maxAppointmentsAndMinAppPerUserValid = value.maxAppointments >= this.minAppointmentsPerUser;
      }
      if (this.maxAppointmentsPerUser !== null && this.maxAppointmentsPerUser !== undefined) {
        this.maxAppointmentsAndMaxAppPerUserValid = value.maxAppointments >= this.maxAppointmentsPerUser;
      }
    }

    if (valid
      && !this.spacetimeContinuumViolated
      && this.maxAppointmentsValid
      && this.maxAppointmentsAndMinAppPerUserValid
      && this.maxAppointmentsAndMaxAppPerUserValid) {
      // Create new time slot
      const timeSlot = new TimeSlot();
      timeSlot.startTimeDisplay = format(value.startDateTime, AppConstant.displayTimeFormat);
      timeSlot.endTimeDisplay = format(value.endDateTime, AppConstant.displayTimeFormat);
      timeSlot.startTime = format(value.startDateTime, AppConstant.timeFormat);
      timeSlot.endTime = format(value.endDateTime, AppConstant.timeFormat);
      timeSlot.maxAppointments = value.maxAppointments;

      // Pass new time slot back to program detail page
      this.dialogRef.close([timeSlot]);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
