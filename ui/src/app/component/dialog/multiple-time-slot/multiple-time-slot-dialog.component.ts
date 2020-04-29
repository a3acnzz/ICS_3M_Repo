import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../../../model/TimeSlot';
import { MatDialogRef } from '@angular/material';
import * as format from 'date-fns/format';
import * as addHours from 'date-fns/add_hours';
import * as addMinutes from 'date-fns/add_minutes';
import * as parse from 'date-fns/parse';
import * as isValid from 'date-fns/is_valid';
import { AppConstant } from '../../../shared/app.constant';

@Component({
  selector: 'app-multiple-time-slot-dialog',
  templateUrl: './multiple-time-slot-dialog.component.html',
  styleUrls: ['./multiple-time-slot-dialog.component.css']
})
export class MultipleTimeSlotDialogComponent implements OnInit {

  programDate = '';
  maxAppointments: number;
  minAppointmentsPerUser: number;
  maxAppointmentsPerUser: number;
  slotHours = 0;
  slotMinutes = 0;
  slotHoursMin = 0;
  slotHoursMax = 23;
  slotMinutesMin = 0;
  slotMinutesMax = 59;
  timeSlots: TimeSlot[] = [];
  canAddSlot: boolean;
  startDateTime: Date;
  endDateTime: Date;
  submitted = false;
  maxAppointmentsValid = true;
  minAppointmentsPerUserValid = true;
  minApptsPerUserMaxApptsValid = true;
  maxAppointmentsPerUserValid = true;
  maxApptsPerUserMaxApptsValid = true;
  maxApptsPerUserMinApptsPerUserValid = true;
  slotMinutesValid = true;
  slotHoursValid = true;
  slotHoursMinutesValid = true;
  spacetimeContinuumViolated = false;

  constructor(public dialogRef: MatDialogRef<MultipleTimeSlotDialogComponent>) {
    this.canAddSlot = true;
  }

  ngOnInit() {
    const dialogTitleDate = parse(this.programDate);

    if (isValid(dialogTitleDate)) {
      this.programDate = format(this.programDate, AppConstant.fullDateFormat);
    }

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

    // Bugfix for MIS-572 - prevent the timepicker component from changing the date when selecting AM/PM
    if (this.startDateTime) { this.startDateTime.setFullYear(1990, 0, 1); }
    if (this.endDateTime) { this.endDateTime.setFullYear(1990, 0, 1); }

    // Set flags for error messages
    this.minAppointmentsPerUserValid = true;
    this.minApptsPerUserMaxApptsValid = true;
    this.maxApptsPerUserMinApptsPerUserValid = true;
    this.submitted = true;
    this.spacetimeContinuumViolated = value.startDateTime > value.endDateTime;
    this.maxAppointmentsValid = value.maxAppointments > 0;
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

    this.slotMinutesValid = (this.slotMinutes >= this.slotMinutesMin && this.slotMinutes <= this.slotMinutesMax);
    this.slotHoursValid = (this.slotHours >= this.slotHoursMin && this.slotHours <= this.slotHoursMax);
    this.slotHoursMinutesValid = (this.slotHours + this.slotMinutes) > 0;

    if (valid && (value.startDateTime < value.endDateTime) && (value.maxAppointments > 0) && (value.maxAppointmentsPerUser > 0) && this.maxApptsPerUserMaxApptsValid && this.slotMinutesValid && this.slotHoursValid && this.slotHoursMinutesValid && this.minAppointmentsPerUserValid && this.minApptsPerUserMaxApptsValid && this.maxApptsPerUserMinApptsPerUserValid) {
      const programEndTime = value.endDateTime;
      let currentSlotStartTime = value.startDateTime;
      let currentSlotEndTime = addHours(currentSlotStartTime, this.slotHours);
      currentSlotEndTime = addMinutes(currentSlotEndTime, this.slotMinutes);

      while (this.canAddSlot) {
        // Check that time slot end time is not past program end time
        if (currentSlotEndTime <= programEndTime) {
          // create new time slot object
          const timeSlot = new TimeSlot();
          timeSlot.startTime = format(currentSlotStartTime, AppConstant.timeFormat);
          timeSlot.endTime = format(currentSlotEndTime, AppConstant.timeFormat);
          timeSlot.startTimeDisplay = format(currentSlotStartTime, AppConstant.displayTimeFormat);
          timeSlot.endTimeDisplay = format(currentSlotEndTime, AppConstant.displayTimeFormat);
          timeSlot.maxAppointments = this.maxAppointments;
          timeSlot.minAppointmentsPerUser = value.minAppointmentsPerUser;
          timeSlot.maxAppointmentsPerUser = this.maxAppointmentsPerUser;

          // Add time slot to time slots array
          this.timeSlots.push(timeSlot);

          // Update slot start time and end time
          currentSlotStartTime = currentSlotEndTime;
          currentSlotEndTime = addHours(currentSlotStartTime, this.slotHours);
          currentSlotEndTime = addMinutes(currentSlotEndTime, this.slotMinutes);
        } else {
          this.canAddSlot = false;
        }
      }
      this.dialogRef.close(this.timeSlots);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
