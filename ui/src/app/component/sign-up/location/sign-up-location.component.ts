import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { LocationService } from '../../../service/location.service';
import { ProgramService } from '../../../service/program.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Appointment } from '../../../model/Appointment';
import { DialogService } from '../../../service/dialog.service';
import { AppointmentService } from '../../../service/appointment.service';
import { AnnouncementService } from '../../../service/announcement.service';
import * as format from 'date-fns/format';
import { AppConstant } from '../../../shared/app.constant';
import { SignUpUser } from '../../../model/SignUpUser';
import { SignUpUserService } from '../../../service/sign-up-user.service';
import { TimeSlotService } from "../../../service/timeslot.service";
import { isSuccess } from "@angular/http/src/http_utils";
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up-location',
  templateUrl: './sign-up-location.component.html',
  styleUrls: ['./sign-up-location.component.css'],
  providers: [
    AppointmentService,
    ProgramService,
    LocationService,
    BrowserAnimationsModule,
    DialogService,
    AnnouncementService,
    SignUpUserService,
    TimeSlotService
  ]
})
export class SignUpLocationComponent implements OnInit {

  alerts = [];
  busySave: Subscription;
  busyLoading: Subscription;
  busyLoadingForListOfPendingAppointmentsRemoval: Subscription;
  systemAnnouncement = '';
  locationAnnouncement = '';
  programList: any[];
  locationId: number;
  locationCode = '';
  locationName = '';
  appointments: Appointment[] = [new Appointment()];
  submitted = false;
  rowsPerPage = AppConstant.rowsPerPageDefault;
  rowsPerPageOptions = AppConstant.rowsPerPageOptions;
  availableAppointments: number;
  minAppointmentsPerUser: number;
  minAppointmentsPerUserValid: boolean = true;
  infoMessageForMinAppointmentsPerUser: number;
  maxAppointmentsPerUser: number;

  formReplicatedIndexes: Array<number> = [];

  constructor(private appointmentService: AppointmentService,
    private programService: ProgramService,
    private locationService: LocationService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private signUpUserService: SignUpUserService,
    private timeSlotService: TimeSlotService) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.locationCode = params['locationCode'];

      // Get location
      this.busyLoading = this.locationService.getLocationByCode(this.locationCode).subscribe((locationResults: any) => {
        if (locationResults) {
          this.locationName = locationResults.name;
          this.locationId = locationResults.id;

          // Get location programs
          this.busyLoading = this.programService.search(null, this.locationId, true).subscribe((results: any) => {
            if (results) {
              this.programList = results;
            }
          });

          // Get location announcements
          this.announcementService.search(this.locationId, true).subscribe((results: any) => {
            if (results.length > 0) {
              this.locationAnnouncement = results[0].message;
            }
          });
        }
      });

      // Get system announcement
      this.announcementService.search(null, true).subscribe((results: any) => {
        if (results.length > 0) {
          this.systemAnnouncement = results[0].message;
        }
      });
    });
  }

  addAppointment(calledBy: string, appointmentIndex: number, value: number) {
    this.submitted = false;
    if (calledBy === 'selectUserPin') {
      this.formReplicatedIndexes.push(appointmentIndex);
      this.infoMessageForMinAppointmentsPerUser = appointmentIndex;

      let appointmentsCopy: Appointment;
      appointmentsCopy = JSON.parse(JSON.stringify(this.appointments[appointmentIndex]));
      appointmentsCopy.date = '';
      appointmentsCopy.endTime = '';
      appointmentsCopy.endTimeDisplay = '';
      appointmentsCopy.programDateId = null;
      appointmentsCopy.startTime = '';
      appointmentsCopy.startTimeDisplay = '';
      appointmentsCopy.timeSlotId = null;
      for (let i = 0; i < value; i++) {
        this.appointments.push(appointmentsCopy);
        this.formReplicatedIndexes.push(this.formReplicatedIndexes[this.formReplicatedIndexes.length - 1] + 1);
      }
    } else {
      this.appointments.push(new Appointment());
    }
  }

  selectProgram(locationId: number, programId: number, programDateId: number, timeSlotId: number, appointmentIndex: number) {
    this.alerts = [];

    this.dialogService.selectProgram(locationId, this.programList).subscribe((results: any) => {
      if (results) {
        this.appointments[appointmentIndex].locationId = this.locationId;
        this.appointments[appointmentIndex].programId = results.id;
        this.appointments[appointmentIndex].programName = results.name;
        this.appointments[appointmentIndex].programVenue = results.venue;
        this.appointments[appointmentIndex].emailRequired = results.emailRequired;

        if (programId !== results.id && !!programId) {
          if (!!timeSlotId) {
            this.busyLoading = this.appointmentService.managePendingAppointment({
              existingTimeSlotId: timeSlotId,
              requestedTimeSlotId: null
            }).subscribe();
          }
          this.appointments[appointmentIndex].timeSlotId = null;
          this.appointments[appointmentIndex].date = '';
          this.appointments[appointmentIndex].programDateId = null;
          this.appointments[appointmentIndex].startTime = '';
          this.appointments[appointmentIndex].endTime = '';
          this.appointments[appointmentIndex].startTimeDisplay = '';
          this.appointments[appointmentIndex].endTimeDisplay = '';
        }
      }
    });
  }

  selectUserPin(appointmentIndex: number) {
    this.dialogService.searchUser().subscribe((result: SignUpUser) => {
      if (result) {
        this.appointments[appointmentIndex].firstName = result.firstName;
        this.appointments[appointmentIndex].lastName = result.lastName;
        this.appointments[appointmentIndex].pin = result.userPin;
        this.appointments[appointmentIndex].emailAddress = result.email;

        if (this.availableAppointments < this.minAppointmentsPerUser) {
          let count: number = 0;
          for (let i = 0; i < this.appointments.length; i++) {
            if (this.appointments[i].firstName == this.appointments[appointmentIndex].firstName &&
              this.appointments[i].lastName == this.appointments[appointmentIndex].lastName &&
              this.appointments[i].programId == this.appointments[appointmentIndex].programId) {
              count++;
            }
          }
          if (this.availableAppointments !== (this.minAppointmentsPerUser - count)) {
            this.appointments[appointmentIndex] = new Appointment();
            this.addAlert(
              `Sorry, this program requires a minimum of ${this.minAppointmentsPerUser} appointments, which not available currently. Check out different programs.`,
              'danger',
              true,
              'invalidAppointmentAlert'
            );
          }
        }

        if (this.availableAppointments >= this.minAppointmentsPerUser) {
          if (!this.minAppointmentsPerUserValid) {
            this.addAppointment('selectUserPin', appointmentIndex, this.minAppointmentsPerUser - 1);
          }
        }
      }
    });
  }

  getDetailsByUserByPin(userPin: string, appointmentIndex: number) {
    if (userPin.length > 0) {
      this.appointments[appointmentIndex].firstName = '';
      this.appointments[appointmentIndex].emailAddress = '';
      this.appointments[appointmentIndex].lastName = '';
      this.busyLoading = this.signUpUserService.getUserByUserPin(userPin).subscribe((result: any) => {
        if (result) {
          this.appointments[appointmentIndex].firstName = result.firstName;
          this.appointments[appointmentIndex].lastName = result.lastName;
          this.appointments[appointmentIndex].pin = result.userPin;
          this.appointments[appointmentIndex].emailAddress = result.email;

          // If user pin is invalid (e.g. typo, not found) display message from backend
          if (result.email) {
            this.appointments[appointmentIndex].pinIsValid = true;
          } else {
            this.appointments[appointmentIndex].pinIsValid = false;
          }
        }
      });
    }
  }

  selectProgramDate(programId: number, appointmentIndex: number) {
    this.alerts = [];

    // Get current program date id, if a program date has previously been selected
    let currentProgramDateId = this.appointments[appointmentIndex].programDateId;
    currentProgramDateId = !!currentProgramDateId ? currentProgramDateId : null;

    // Get current timeslot id, if a timeslot has previously been selected
    let currentTimeSlotId = this.appointments[appointmentIndex].timeSlotId;
    currentTimeSlotId = !!currentTimeSlotId ? currentTimeSlotId : null;

    this.dialogService.selectProgramDate(programId, currentTimeSlotId, currentProgramDateId).subscribe((results: any) => {
      if (results) {
        this.appointments[appointmentIndex].programDateId = results.programDate.id;
        if (results.timeSlot) {
          this.availableAppointments = results.timeSlot.availableAppointments;
          this.minAppointmentsPerUser = results.timeSlot.minAppointmentsPerUser;
          this.maxAppointmentsPerUser = results.timeSlot.maxAppointmentsPerUser;
        }
        if (this.minAppointmentsPerUser > 1) {
          this.minAppointmentsPerUserValid = false;
        } else {
          this.minAppointmentsPerUserValid = true;
        }
        const formattedDateString = format(results.programDate.displayDate, AppConstant.fullDateFormat);
        this.appointments[appointmentIndex].date = formattedDateString;
        this.appointments[appointmentIndex].timeSlotId = results.timeSlot.id;
        this.appointments[appointmentIndex].startTime = results.timeSlot.startTime;
        this.appointments[appointmentIndex].endTime = results.timeSlot.endTime;
        this.appointments[appointmentIndex].startTimeDisplay = results.timeSlot.startTimeDisplay;
        this.appointments[appointmentIndex].endTimeDisplay = results.timeSlot.endTimeDisplay;


        let availableMinAppointmentInFormCount: number = this.checkDuplicateAppointmentsOnDateClick(this.appointments);
        if (availableMinAppointmentInFormCount >= this.minAppointmentsPerUser) {
          this.minAppointmentsPerUserValid = true;
        } else {
          this.minAppointmentsPerUserValid = false;
        }
      }
    });
  }

  clearAppointment(programId: number, programDateId: number, timeSlotId: number, appointmentIndex: number) {
    this.alerts = [];
    this.submitted = false;

    if (!!programId) {
      if (!!programDateId && !!timeSlotId) {
        this.busyLoading = this.appointmentService.managePendingAppointment({
          existingTimeSlotId: timeSlotId,
          requestedTimeSlotId: null
        }).subscribe();
      }
    }
    // Clear selected program
    this.appointments[appointmentIndex].programId = null;
    this.appointments[appointmentIndex].programName = '';
    this.appointments[appointmentIndex].programVenue = '';
    // Clear selected program date and time slot
    this.appointments[appointmentIndex].timeSlotId = null;
    this.appointments[appointmentIndex].date = '';
    this.appointments[appointmentIndex].programDateId = null;
    this.appointments[appointmentIndex].startTime = '';
    this.appointments[appointmentIndex].endTime = '';
    this.appointments[appointmentIndex].startTimeDisplay = '';
    this.appointments[appointmentIndex].endTimeDisplay = '';
    this.appointments[appointmentIndex].emailAddress = '';
    this.appointments[appointmentIndex].firstName = '';
    this.appointments[appointmentIndex].lastName = '';
    this.appointments[appointmentIndex].pin = '';
    this.appointments[appointmentIndex].emailRequired = true;
  }

  removeAppointment(programId: number, programDateId: number, timeSlotId: number, appointmentIndex: number) {
    this.alerts = [];
    this.submitted = false;

    let temp: any;
    // Performs a deep array copy to trigger form control synchronization
    // This component should be refactored into a reactive form when time permits
    const newAppointmentList = JSON.parse(JSON.stringify(this.appointments));
    if (this.formReplicatedIndexes.includes(appointmentIndex)) {
      for (let i = this.formReplicatedIndexes.length - 1; i >= 0; i--) {
        if (newAppointmentList[this.formReplicatedIndexes[i]].programId === programId) {
          if (!!newAppointmentList[this.formReplicatedIndexes[i]].programId) {
            if (!!newAppointmentList[this.formReplicatedIndexes[i]].programDateId && !!newAppointmentList[this.formReplicatedIndexes[i]].timeSlotId) {
              console.log("hi")

              this.busyLoading = this.appointmentService.managePendingAppointment({
                existingTimeSlotId: newAppointmentList[this.formReplicatedIndexes[i]].timeSlotId,
                requestedTimeSlotId: null
              }).subscribe((result: any) => temp = result);

              this.timeout();
              console.log(temp)
            }
          }
          newAppointmentList.splice(this.formReplicatedIndexes[i], 1);
          this.formReplicatedIndexes.splice(i, 1);
        }
      }
    } else {
      if (!!programId) {
        if (!!programDateId && !!timeSlotId) {
          this.busyLoading = this.appointmentService.managePendingAppointment({
            existingTimeSlotId: timeSlotId,
            requestedTimeSlotId: null
          }).subscribe();
        }
      }
      newAppointmentList.splice(appointmentIndex, 1);
    }
    this.appointments = JSON.parse(JSON.stringify(newAppointmentList));
  }

  timeout() {
    setTimeout(() => {
      this.timeout();
    }, 10000);
  }

  save({ value, valid }: { value: any[], valid: boolean }) {
    window.scroll(0, 0); // Scroll to top on save
    this.submitted = true;
    this.alerts = [];

    // if (valid) {
    //   this.clearInvalidUserPins(this.appointments);
    //   let hasDuplicateAppointments = this.checkDuplicateAppointments(this.appointments);
    //   if (!hasDuplicateAppointments) {
    //     this.validateAppointments(this.appointments);
    //   }
    // } else {
    //   this.addAlert('Please correct the validation errors below.', 'danger', true);
    // }
  }

  private validateAppointments(appointments: Appointment[]) {
    let invalidAppointmentNames = [];
    let isValid = false;
    this.busySave = this.appointmentService.validateAppointments(appointments).subscribe((results: any) => {
      if (results && results.length > 0) {
        for (let activeAppt of results) {
          invalidAppointmentNames.push(activeAppt.firstName + ' ' + activeAppt.lastName);
        }
        this.addAlert(
          `Appointments not scheduled. Only ${this.maxAppointmentsPerUser} appointment per program per person is allowed. Please remove appointment entry for ` +
          invalidAppointmentNames.toString() +
          ' and resubmit. If a different date and time is preferred, please reschedule using the \'My Appointments\' screen.',
          'danger',
          true,
          'invalidAppointmentAlert'
        );
      } else {
        isValid = true;
      }
    },
      (error: any) => {
        this.addAlert(error.toString(), 'danger', true);
      },
      () => {
        if (isValid) {
          this.validateTimeSlots(appointments);
        }
      });
  }

  private validateTimeSlots(appointments: Appointment[]) {
    let filledTimeSlots = [];
    this.busyLoading = this.appointmentService.validateTimeSlots(appointments).subscribe((results: any) => {
      if (results && results.length > 0) {
        for (let activeAppt of results) {
          filledTimeSlots.push(activeAppt.programName + ' - ' + activeAppt.programDateDisplay + '[' + activeAppt.startTimeDisplay + ' - ' + activeAppt.endTimeDisplay + '] ');
        }
        this.addAlert(
          'Sorry, following time slot(s) has been already filled :- ' +
          filledTimeSlots.toString() +
          ' . Please select a different time slot.',
          'danger',
          true,
          'invalidAppointmentAlert'
        );
      } else if (results && results.length == 0) {
        this.saveAppointments();
      }

    });
  }
  private saveAppointments() {
    this.busySave = this.appointmentService.save(this.appointments).subscribe((result: any) => {
      this.addAlert(
        'You have successfully saved your appointments. You can view your appointments on the My Appointments tab.',
        'success',
        true,
        'saveMessage');
      this.appointments = [new Appointment()];
      this.submitted = false;
    },
      (error: any) => {
        this.addAlert('Failed to save your appointments.', 'danger', true);
      });
  }

  private checkDuplicateAppointmentsOnDateClick(appointments: Appointment[]) {
    let duplicateAppointmentNames = [];
    let availableMinAppointmentInFormCount: number = 1;

    if (appointments.length > 1) {
      for (let i = 0; i < appointments.length; i++) {
        for (let j = i + 1; j < appointments.length; j++) {
          if (appointments[i].firstName == appointments[j].firstName &&
            appointments[i].lastName == appointments[j].lastName &&
            appointments[i].programId == appointments[j].programId) {
            availableMinAppointmentInFormCount++;
          }
        }
      }
    }
    return availableMinAppointmentInFormCount;
  }

  // private checkDuplicateAppointments(appointments: Appointment[]) {
  //   let duplicateAppointmentNames = [];

  //   for (let i = 0; i < appointments.length; i++) {
  //     for (let j = i + 1; j < appointments.length; j++) {
  //       if (appointments[i].firstName == appointments[j].firstName &&
  //         appointments[i].lastName == appointments[j].lastName &&
  //         appointments[i].programId == appointments[j].programId) {
  //         duplicateAppointmentNames.push(appointments[i].firstName + ' ' + appointments[i].lastName);
  //       }
  //     }
  //   }

  //   let hasDuplicateAppointments = duplicateAppointmentNames.length > 0;
  //   if (hasDuplicateAppointments) {
  //     this.addAlert(
  //       'Appointments not scheduled. Duplicate registrations for ' + duplicateAppointmentNames.toString() +
  //       '. Please remove duplicate appointments and resubmit.',
  //       'danger',
  //       true,
  //       'duplicateAppointmentAlert');
  //   }
  //   return hasDuplicateAppointments;
  // }

  // private clearInvalidUserPins(appointments: Appointment[]) {
  //   for (let i = 0; i < appointments.length; i++) {
  //     if (!appointments[i].pinIsValid) {
  //       appointments[i].pin = '';
  //     }
  //   }
  // }

  private addAlert(alertMsg: string, alertType: string, alertCloseable: boolean, alertId?: string) {
    this.alerts.push({
      msg: alertMsg,
      type: alertType,
      closeable: alertCloseable,
      id: alertId
    });
  }

  viewContactUs() {
    this.dialogService.viewContactUs(this.locationId, this.locationName);
  }

  isClearButtonHide(index: number): boolean {
    return this.formReplicatedIndexes.includes(index);
  }
}
