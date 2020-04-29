import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProgramService } from '../../../../service/program.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap';
import { LocationService } from '../../../../service/location.service';
import { Program } from '../../../../model/Program';
import { TimeSlot } from '../../../../model/TimeSlot';
import { DialogService } from '../../../../service/dialog.service';
import * as _ from 'lodash/lodash.min';
import { TimeSlotService } from '../../../../service/timeslot.service';
import { ProgramDate } from '../../../../model/ProgramDate';
import * as format from 'date-fns/format';
import { AppConstant } from '../../../../shared/app.constant';

// Allows jQuery $ selector for expand/collapse all during production build. Look for a better way to do this during refactoring.
declare var $: any;

@Component({
  selector: 'app-program-owner-location-program',
  templateUrl: './location-program.component.html',
  styleUrls: ['./location-program.component.css'],
  providers: [ProgramService, LocationService, AlertModule, BrowserAnimationsModule, DialogService, TimeSlotService]
})
export class LocationProgramComponent implements OnInit {

  alerts = [];
  programId: number;
  locationId: number;
  locationName = '';
  program: Program;
  saveIndicator: boolean;
  busyLoading: Subscription;
  busySave: Subscription;
  availableAppointments: number;
  currentDate: string;
  currentTime: string;
  minCalendarDate: Date = new Date();
  totalAppointmentSlots = 0;
  totalBookedAppointmentSlots = 0;
  totalAvailableAppointmentSlots = 0;

  constructor(private programService: ProgramService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private timeSlotService: TimeSlotService
  ) {
    this.program = new Program();
  }

  ngOnInit() {
    this.currentDate = new Date().toISOString();
    this.currentTime = format(new Date(), AppConstant.timeFormat);
    this.route.params.forEach((params: Params) => {
      // Get programId and locationId from URL parameters
      this.programId = +params['programId'];
      this.locationId = +params['locationId'];

      // Get program data
      this.busyLoading = this.programService.programOwnerGetProgram(this.locationId, this.programId).subscribe((result: Program) => {
        this.program = result;
        this.program.programDates = this.sortProgramDates(this.program);
        this.program.locationId = this.locationId;

        this.calculateProgramMetrics();
      });

      if (this.programId === 0) {
        this.alerts = [];
      }
    });

    // Get location name
    this.locationService.getLocation(this.locationId).subscribe((results: any) => {
      if (results) {
        this.locationName = results.name;
      }
    });
  }

  addProgramDate(data) {
    const submittedProgramDate = {
      id: null,
      date: new Date(data).toISOString(),
      active: true,
      timeSlots: [],
      displayDate: new Date(data).toISOString()
    };
    // Check if program date is already in the list of program dates
    if (!this.dateExists(this.program, submittedProgramDate.date)) {
      // Add program date to top of program dates list
      this.program.programDates.unshift(submittedProgramDate);
    }
  }

  createSingleTimeSlot(submittedProgramDate: string, programDateIndex: number) {
    this.alerts = [];
    const index = programDateIndex;

    this.dialogService.singleTimeSlot(submittedProgramDate).subscribe((results: any[]) => {
      if (results) {
        for (const slot of results) {
          // Build time slot
          const newTimeSlot = this.buildTimeSlot(slot);
          // Check if time slot is already in the list of time slots
          if (this.checkForNoDuplicateTimeSlot(index, newTimeSlot)) {
            // Add time slot to list of program date time slots
            this.program.programDates[index].timeSlots.push(newTimeSlot);
          }
        }
        // Sort list of time slots
        this.program.programDates[index].timeSlots = (_.sortBy(this.program.programDates[index].timeSlots, 'startTime'));
        this.calculateProgramMetrics();
      }
    });
  }

  createMultipleTimeSlots(submittedProgramDate: string, programDateIndex: number) {
    this.alerts = [];
    const index = programDateIndex;

    this.dialogService.multipleTimeSlot(submittedProgramDate).subscribe((results: any[]) => {
      if (results) {
        for (const slot of results) {
          // Build time slot
          const newTimeSlot = this.buildTimeSlot(slot);
          // this.program.programDates[index].timeSlots.push(newTimeSlot);
          // Check if time slot is already in the list of time slots
          if (this.checkForNoDuplicateTimeSlot(index, newTimeSlot)) {
            // Add time slot to list of program date time slots
            this.program.programDates[index].timeSlots.push(newTimeSlot);
          }
        }
        // Sort list of time slots
        this.program.programDates[index].timeSlots = (_.sortBy(this.program.programDates[index].timeSlots, 'startTime'));
        this.calculateProgramMetrics();
      }
    });
  }

  createBulkTimeSlots(submittedProgramDate: string) {
    this.alerts = [];
    this.dialogService.multipleTimeSlot(submittedProgramDate).subscribe((results: any[]) => {
      if (results) {
        for (const slot of results) {
          const newTimeSlot = this.buildTimeSlot(slot);
          for (let i = 0; i < this.program.programDates.length; i++) {
            const programDate = this.program.programDates[i];

            if (this.isProgramDateEditable(programDate)) {
              const parsedProgramDate = this.parseDateFromString(programDate.date);
              const parsedCurrentDate = this.parseDateFromString(this.currentDate);

              // does not add new time slot for current date if new time slot has already expired
              if (parsedProgramDate === parsedCurrentDate) {
                if (newTimeSlot.endTime > this.currentTime) {
                  if (this.checkForNoDuplicateTimeSlot(i, newTimeSlot)) {
                    this.program.programDates[i].timeSlots.push(newTimeSlot);
                  }
                }
              } else {
                if (this.checkForNoDuplicateTimeSlot(i, newTimeSlot)) {
                  this.program.programDates[i].timeSlots.push(newTimeSlot);
                }
              }
            }
          }
        }
        this.calculateProgramMetrics();
      }
    });
  }

  private checkForNoDuplicateTimeSlot(i: number, newTimeSlot) {
    if (_.findIndex(this.program.programDates[i].timeSlots,
      { startTime: newTimeSlot.startTime, endTime: newTimeSlot.endTime }) < 0) {
      return true;
    }
  }

  private buildTimeSlot(slot: TimeSlot) {
    const newTimeSlot = new TimeSlot();
    newTimeSlot.id = slot.id;
    newTimeSlot.startTime = slot.startTime;
    newTimeSlot.endTime = slot.endTime;
    newTimeSlot.startTimeDisplay = slot.startTimeDisplay;
    newTimeSlot.endTimeDisplay = slot.endTimeDisplay;
    newTimeSlot.maxAppointments = slot.maxAppointments;
    if (slot.minAppointmentsPerUser) {
      newTimeSlot.minAppointmentsPerUser = slot.minAppointmentsPerUser;
    } else {
      newTimeSlot.minAppointmentsPerUser = 1;
    }
    newTimeSlot.maxAppointmentsPerUser = slot.maxAppointmentsPerUser;
    return newTimeSlot;
  }

  changeProgramDateMaxAppointments(programDateId: number, programDateIndex: number) {
    this.alerts = [];
    const existingMaxAppointments = _.minBy(this.program.programDates[programDateIndex].timeSlots, 'maxAppointments').maxAppointments;

    this.dialogService.changeMaxAppointments(programDateId, null, existingMaxAppointments).subscribe((results: number) => {
      if (results) {
        const tempProgramDate = this.program.programDates[programDateIndex].date.substr(0, 10);
        // const tempCurrentDate = this.currentDate.substr(0, 10);
        const tempCurrentDate = format(new Date(), 'YYYY-MM-DD');

        for (const slot of this.program.programDates[programDateIndex].timeSlots) {
          // Prevents update of expired time slots
          if ((tempProgramDate > tempCurrentDate) || ((tempProgramDate === tempCurrentDate) && slot.endTime > this.currentTime)) {
            slot.maxAppointments += results;
            if (results > 0) {
              slot.availableAppointments += results;
            } else if (results > -slot.availableAppointments) {
              slot.availableAppointments += results;
            } else {
              slot.availableAppointments = 0;
            }
          }
        }
        this.calculateProgramMetrics();
      }
    });
  }

  changeTimeSlotMaxAppointments(timeSlotId: number, existingMaxAppointments: number, programDateIndex: number, timeSlotIndex: number) {
    this.alerts = [];

    this.dialogService.changeMaxAppointments(null, timeSlotId, existingMaxAppointments).subscribe((results: number) => {
      if (!results) { return; }
      this.program.programDates[programDateIndex].timeSlots[timeSlotIndex].maxAppointments += results;
      this.timeSlotService.getAppointmentCounts(timeSlotId).subscribe(
        (result: any) => {
          if (result) {
            this.program.programDates[programDateIndex].timeSlots[timeSlotIndex].availableAppointments = result.availableAppointments;
            this.calculateProgramMetrics();
          }
        });
    });
  }

  cancelProgramDate(programDateId: number, programDateIndex: number) {
    this.alerts = [];

    if (!!programDateId) {
      this.dialogService.programCancellation(programDateId, null).subscribe((results: any) => {
        if (results.status === 'success') {
          this.program.programDates.splice(programDateIndex, 1);
          this.calculateProgramMetrics();
        }
      });
    } else {
      this.program.programDates.splice(programDateIndex, 1);
    }
  }

  cancelTimeSlot(timeSlotId: number, programDateIndex: number, timeSlotIndex: number) {
    this.alerts = [];

    this.dialogService.programCancellation(null, timeSlotId).subscribe((results: any) => {
      if (results.status === 'success') {
        this.program.programDates[programDateIndex].timeSlots.splice(timeSlotIndex, 1);
        this.calculateProgramMetrics();
      }
    });
  }

  configureEmailTemplates() {
    this.dialogService.emailTemplates(this.locationId, this.programId, this.locationName, this.program.name);
  }

  configureBccEmails() {
    this.dialogService.bccEmails(this.locationId, this.programId, this.locationName, this.program.name);
  }

  managePendingAppointments() {
    this.dialogService.managePendingAppointments(this.programId);
  }

  private calculateProgramMetrics() {
    this.totalAvailableAppointmentSlots = 0;
    this.totalAppointmentSlots = 0;
    this.totalBookedAppointmentSlots = 0;
    for (const programDate of this.program.programDates) {
      for (const timeSlot of programDate.timeSlots) {
        this.totalAvailableAppointmentSlots += timeSlot.availableAppointments;
        this.totalAppointmentSlots += timeSlot.maxAppointments;
      }
    }
    this.totalBookedAppointmentSlots = this.totalAppointmentSlots - this.totalAvailableAppointmentSlots;
  }

  save({ value, valid }: { value: Program, valid: boolean }) {
    this.alerts = [];
    this.saveIndicator = true;
    if (valid) {
      this.busySave = this.programService.save(this.program).subscribe((result: Program) => {
        this.program = result;
        this.program.programDates = this.sortProgramDates(this.program);
        this.programId = result.id;
        this.alerts.push({ msg: 'You have successfully saved your changes.', type: 'success', closable: true });
        // Update URL for new programs
        if (this.programId > 0) {
          this.router.navigate(['/program-owner/location/' + result.locationId + '/program/' + result.id]);
        }
        this.saveIndicator = false;
        this.calculateProgramMetrics();
      },
        (error: any) => {
          this.alerts.push({ msg: 'Failed to save your changes.', type: 'danger', closable: true });
        }
      );
    } else {
      this.alerts.push({ msg: 'Please correct the validation errors below.', type: 'danger', closable: true });
    }
  }

  isTimeSlotEditable(programDate: ProgramDate, timeSlot: TimeSlot) {
    const parsedProgramDate = this.parseDateFromString(programDate.date);
    const parsedCurrentDate = this.parseDateFromString(this.currentDate);

    return (parsedProgramDate > parsedCurrentDate)
      || ((parsedProgramDate === parsedCurrentDate) && (timeSlot.endTime > this.currentTime));
  }

  isProgramDateEditable(programDate: ProgramDate) {
    const parsedProgramDate = this.parseDateFromString(programDate.date);
    const parsedCurrentDate = this.parseDateFromString(this.currentDate);

    return parsedProgramDate >= parsedCurrentDate;
  }

  private parseDateFromString(date: string) {
    return date.substr(0, 10);
  }

  // Sorts program dates in ascending order, with active dates on top and expired dates below
  private sortProgramDates(program: Program) {
    const programDates = (_.sortBy(program.programDates, 'date'));
    const expiredProgramDates = [];
    const activeProgramDates = [];

    for (const date of programDates) {
      if (this.isProgramDateEditable(date)) {
        activeProgramDates.push(date);
      } else {
        expiredProgramDates.push(date);
      }
    }
    return activeProgramDates.concat(expiredProgramDates);
  }

  private dateExists(program: Program, newDate: string) {
    const parsedNewDate = this.parseDateFromString(newDate);

    for (const date of program.programDates) {
      const parsedDate = this.parseDateFromString(date.date);
      if (parsedDate === parsedNewDate) {
        return true;
      }
    }
    return false;
  }

  expandAll() {
    $('#accordion .collapse').collapse('show');
  }

  collapseAll() {
    $('#accordion .collapse').collapse('hide');
  }

}
