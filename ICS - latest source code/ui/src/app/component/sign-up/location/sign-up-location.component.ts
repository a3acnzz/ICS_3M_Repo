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
  isRecursive: boolean = false;
  isShowStepFourInfo: boolean = false;
  infoMessageForMinAppointmentsPerUser: Array<number> = [];
  maxApptsPerUserProgamIdUserInValid: Array<{ [key: string]: any }> = [];
  formReplicatedIndexes: Array<number> = [];
  prgArray: Array<{ [key: string]: any }> = [];
  pendingAppointmentInsertedId: Array<number> = [];
  dateLookUpDisabling: Array<{ [key: string]: any }> = [];

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

  addAppointment(called: string, appointmentIndex: number, value: number) {
    this.submitted = false;
    if (called === 'internal') {
      this.isShowStepFourInfo = true;
      this.infoMessageForMinAppointmentsPerUser.push(appointmentIndex);
      this.formReplicatedIndexes.push(appointmentIndex);
      this.formReplicatedIndexes.sort((n1, n2) => n1 - n2);

      for (let i = 0; i < value; i++) {
        // Performs a copy of this.appointments[appointmentIndex] and creates new objects with deprecated values of date
        let appointmentsCopy: Appointment = new Appointment();
        appointmentsCopy.alreadyReachedMinApptsPerUser = null;
        appointmentsCopy.archived = this.appointments[appointmentIndex].archived;
        appointmentsCopy.availableAppointments = null;
        if (this.isRecursive) {
          appointmentsCopy.programDateId = this.prgArray[this.prgArray.length - 1].programDateId;
          appointmentsCopy.date = format(this.prgArray[this.prgArray.length - 1].programDate, AppConstant.fullDateFormat);
          appointmentsCopy.timeSlotId = this.prgArray[this.prgArray.length - 1].timeSlotId;
          this.prgArray.pop();
          appointmentsCopy.startTime = this.appointments[appointmentIndex].startTime;
          appointmentsCopy.startTimeDisplay = this.appointments[appointmentIndex].startTimeDisplay;
          appointmentsCopy.endTime = this.appointments[appointmentIndex].endTime;
          appointmentsCopy.endTimeDisplay = this.appointments[appointmentIndex].endTimeDisplay;

          if (this.pendingAppointmentInsertedId.length > 0) {
            appointmentsCopy.pendingAppointmentInsertedId = this.pendingAppointmentInsertedId[0];
            this.pendingAppointmentInsertedId.splice(this.pendingAppointmentInsertedId.indexOf(this.pendingAppointmentInsertedId[0]), 1);
          } else {
            appointmentsCopy.pendingAppointmentInsertedId = null;
          }
        }
        else {
          appointmentsCopy.date = '';
          appointmentsCopy.startTime = '';
          appointmentsCopy.startTimeDisplay = '';
          appointmentsCopy.endTime = '';
          appointmentsCopy.endTimeDisplay = '';
          appointmentsCopy.programDateId = null;
          appointmentsCopy.timeSlotId = null;
          appointmentsCopy.pendingAppointmentInsertedId = null;
        }
        appointmentsCopy.emailAddress = this.appointments[appointmentIndex].emailAddress;
        appointmentsCopy.emailRequired = this.appointments[appointmentIndex].emailRequired;
        appointmentsCopy.firstName = this.appointments[appointmentIndex].firstName;
        appointmentsCopy.lastName = this.appointments[appointmentIndex].lastName;
        appointmentsCopy.locationId = this.appointments[appointmentIndex].locationId;
        appointmentsCopy.maxAppointmentsPerUser = this.appointments[appointmentIndex].maxAppointmentsPerUser;
        appointmentsCopy.minAppointmentsPerUser = this.appointments[appointmentIndex].minAppointmentsPerUser;
        appointmentsCopy.pin = this.appointments[appointmentIndex].pin;
        appointmentsCopy.pinIsValid = this.appointments[appointmentIndex].pinIsValid;
        appointmentsCopy.programId = this.appointments[appointmentIndex].programId;
        appointmentsCopy.programName = this.appointments[appointmentIndex].programName;
        appointmentsCopy.programVenue = this.appointments[appointmentIndex].programVenue;

        this.appointments.push(appointmentsCopy);
        this.formReplicatedIndexes.push(this.appointments.length - 1);
        this.formReplicatedIndexes.sort((n1, n2) => n1 - n2);

        if (!this.dateLookUpDisabling.includes({ 'mainForm': appointmentIndex, 'replicatedChild': this.appointments.length - 1 })) {
          this.dateLookUpDisabling.push({ 'mainForm': appointmentIndex, 'replicatedChild': this.appointments.length - 1 });
        }
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
        this.appointments[appointmentIndex].minAppointmentsPerUser = results.minAppointmentsPerUser;
        this.appointments[appointmentIndex].maxAppointmentsPerUser = results.maxAppointmentsPerUser;
        this.isRecursive = results.recursiveApp;

        if (programId !== results.id && !!programId) {
          if (!!timeSlotId) {
            this.busyLoading = this.appointmentService.managePendingAppointment({
              existingTimeSlotId: timeSlotId,
              requestedTimeSlotId: null,
              pendingAppointmentInsertedId: null
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

        if (!!this.appointments[appointmentIndex].firstName &&
          !!this.appointments[appointmentIndex].lastName) {
          this.busyLoading = this.appointmentService.alreadySavedAppointmentsCount(this.appointments[appointmentIndex].programId,
            this.appointments[appointmentIndex].firstName,
            this.appointments[appointmentIndex].lastName).subscribe((result: any) => {
              if (result) {
                this.appointments[appointmentIndex].alreadyReachedMinApptsPerUser = result.size >= this.appointments[appointmentIndex].minAppointmentsPerUser;
                if (!this.appointments[appointmentIndex].alreadyReachedMinApptsPerUser) {
                  let minAppointmentsPerUserValidationReturn: { [key: string]: any } = this.minPerUserValidation(appointmentIndex);
                  if (!minAppointmentsPerUserValidationReturn.minAppointmentsPerUserValid) {
                    if (minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount !== null && minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount !== undefined) {
                      this.formReplication(appointmentIndex, minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount);
                    }
                  }
                }
              }
            });
          this.maxPerUserValidation(appointmentIndex);
        }
      }
    });
  }

  selectUserPin(appointmentIndex: number) {
    this.dialogService.searchUser().subscribe((result: SignUpUser) => {
      if (result) {
        if (!this.containinMaxApptsPerUserProgamIdUserInValidArray(this.appointments[appointmentIndex].programId, result.firstName, result.lastName)) {
          this.appointments[appointmentIndex].firstName = result.firstName;
          this.appointments[appointmentIndex].lastName = result.lastName;
          this.appointments[appointmentIndex].pin = result.userPin;
          this.appointments[appointmentIndex].emailAddress = result.email;

          if (!!this.appointments[appointmentIndex].programName &&
            !!this.appointments[appointmentIndex].programVenue) {
            this.busyLoading = this.appointmentService.alreadySavedAppointmentsCount(this.appointments[appointmentIndex].programId,
              this.appointments[appointmentIndex].firstName,
              this.appointments[appointmentIndex].lastName).subscribe((result: any) => {
                if (result) {
                  this.appointments[appointmentIndex].alreadyReachedMinApptsPerUser = result.size >= this.appointments[appointmentIndex].minAppointmentsPerUser;
                  if (!this.appointments[appointmentIndex].alreadyReachedMinApptsPerUser) {
                    let minAppointmentsPerUserValidationReturn: { [key: string]: any } = this.minPerUserValidation(appointmentIndex);
                    if (!minAppointmentsPerUserValidationReturn.minAppointmentsPerUserValid) {
                      if (minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount !== null && minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount !== undefined) {
                        this.formReplication(appointmentIndex, minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount);
                      }
                    }
                  }
                }
              });
            this.maxPerUserValidation(appointmentIndex);
          }
        } else {
          window.scroll(0, 0); // Scroll to top on save
          this.addAlert(
            `Sorry, this specific user cannot be tagged again for this program appointment. Only ${this.appointments[appointmentIndex].maxAppointmentsPerUser} appointments per user is allowed as a maximum limit for this program.`,
            'danger',
            true,
            'invalidAppointmentSelectionMaxLimitReach'
          );
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
          if (!this.containinMaxApptsPerUserProgamIdUserInValidArray(this.appointments[appointmentIndex].programId, result.firstName, result.lastName)) {
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

            if (!!this.appointments[appointmentIndex].programName &&
              !!this.appointments[appointmentIndex].programVenue) {
              this.busyLoading = this.appointmentService.alreadySavedAppointmentsCount(this.appointments[appointmentIndex].programId,
                this.appointments[appointmentIndex].firstName,
                this.appointments[appointmentIndex].lastName).subscribe((result: any) => {
                  if (result) {
                    this.appointments[appointmentIndex].alreadyReachedMinApptsPerUser = result.size >= this.appointments[appointmentIndex].minAppointmentsPerUser;
                    if (!this.appointments[appointmentIndex].alreadyReachedMinApptsPerUser) {
                      let minAppointmentsPerUserValidationReturn: { [key: string]: any } = this.minPerUserValidation(appointmentIndex);
                      if (!minAppointmentsPerUserValidationReturn.minAppointmentsPerUserValid) {
                        if (minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount !== null && minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount !== undefined) {
                          this.formReplication(appointmentIndex, minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount);
                        }
                      }
                    }
                  }
                });
              this.maxPerUserValidation(appointmentIndex);
            }
          } else {
            window.scroll(0, 0); // Scroll to top on save
            this.addAlert(
              `Sorry, this specific user cannot be tagged again for this program appointment. Only ${this.appointments[appointmentIndex].maxAppointmentsPerUser} appointments per user is allowed as a maximum limit for this program.`,
              'danger',
              true,
              'invalidAppointmentSelectionMaxLimitReach'
            );
          }
        }
      });
    }
  }

  selectProgramDate(programId: number, appointmentIndex: number, isRecursive: boolean) {
    this.alerts = [];

    // Get current program date id, if a program date has previously been selected
    let currentProgramDateId = this.appointments[appointmentIndex].programDateId;
    currentProgramDateId = !!currentProgramDateId ? currentProgramDateId : null;

    // Get current timeslot id, if a timeslot has previously been selected
    let currentTimeSlotId = this.appointments[appointmentIndex].timeSlotId;
    currentTimeSlotId = !!currentTimeSlotId ? currentTimeSlotId : null;

    this.dialogService.selectProgramDate(programId, currentTimeSlotId, currentProgramDateId, isRecursive).subscribe((results: any) => {
      if (results) {
        if (isRecursive) {
          for (let j = 0; j < results.programDateArray.length; j++) {

            this.prgArray.push({ 'programDateId': results.programDateArray[j].id, 'programDate': results.programDateArray[j].displayDate, 'timeSlotId': results.programDateArray[j].timeSlots[0].id });

          }
          this.prgArray.reverse();
          this.prgArray.pop();
        }

        this.appointments[appointmentIndex].programDateId = results.programDate.id;
        if (results.programDate.totalAvailableAppointments) {
          this.appointments[appointmentIndex].availableAppointments = results.programDate.totalAvailableAppointments;
        }
        if (results.pendingAppointmentInsertedId.length > 0) {
          this.appointments[appointmentIndex].pendingAppointmentInsertedId = results.pendingAppointmentInsertedId[0];
          results.pendingAppointmentInsertedId.splice(results.pendingAppointmentInsertedId.indexOf(results.pendingAppointmentInsertedId[0]), 1);
        }
        this.pendingAppointmentInsertedId = results.pendingAppointmentInsertedId;

        const formattedDateString = format(results.programDate.displayDate, AppConstant.fullDateFormat);
        this.appointments[appointmentIndex].date = formattedDateString;
        this.appointments[appointmentIndex].timeSlotId = results.timeSlot.id;
        this.appointments[appointmentIndex].startTime = results.timeSlot.startTime;
        this.appointments[appointmentIndex].endTime = results.timeSlot.endTime;
        this.appointments[appointmentIndex].startTimeDisplay = results.timeSlot.startTimeDisplay;
        this.appointments[appointmentIndex].endTimeDisplay = results.timeSlot.endTimeDisplay;

        if ((!!this.appointments[appointmentIndex].programName &&
          !!this.appointments[appointmentIndex].programVenue)
          && (!!this.appointments[appointmentIndex].firstName &&
            !!this.appointments[appointmentIndex].lastName)) {
          this.busyLoading = this.appointmentService.alreadySavedAppointmentsCount(this.appointments[appointmentIndex].programId,
            this.appointments[appointmentIndex].firstName,
            this.appointments[appointmentIndex].lastName).subscribe((result: any) => {
              if (result) {
                this.appointments[appointmentIndex].alreadyReachedMinApptsPerUser = result.size >= this.appointments[appointmentIndex].minAppointmentsPerUser;
                if (!this.appointments[appointmentIndex].alreadyReachedMinApptsPerUser) {
                  let minAppointmentsPerUserValidationReturn: { [key: string]: any } = this.minPerUserValidation(appointmentIndex);
                  if (!minAppointmentsPerUserValidationReturn.minAppointmentsPerUserValid) {
                    if (minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount !== null && minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount !== undefined) {
                      this.formReplication(appointmentIndex, minAppointmentsPerUserValidationReturn.availableMinAppointmentInFormCount);
                    }
                  }
                }
              }
            });
          this.maxPerUserValidation(appointmentIndex);
        }

        // For making step 4 false
        let tempCount: number = 0;
        this.formReplicatedIndexes.forEach(index => {
          if (this.appointments[index]) {
            if (!!this.appointments[index].programId) {
              if (!!this.appointments[index].programDateId && !!this.appointments[index].timeSlotId) {
                tempCount++;
              }
            }
          }
        });
        // have to re-check
        if (tempCount >= this.formReplicatedIndexes.length) {
          this.isShowStepFourInfo = false;
          this.infoMessageForMinAppointmentsPerUser = [];
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
          requestedTimeSlotId: null,
          pendingAppointmentInsertedId: null
        }).subscribe();
      }
    }

    // Removal of this programId if it is in invalid array for reaching max appt per user
    // Since it is a clear now this programId cannot be in max
    if (!!programId && !!this.appointments[appointmentIndex].firstName && !!this.appointments[appointmentIndex].lastName) {
      this.spliceMaxApptsPerUserProgamIdUserInValidArray(appointmentIndex);
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
    this.appointments[appointmentIndex].availableAppointments = null;
    this.appointments[appointmentIndex].minAppointmentsPerUser = null;
    this.appointments[appointmentIndex].maxAppointmentsPerUser = null;
    this.appointments[appointmentIndex].pendingAppointmentInsertedId = null;

  }

  removeAppointment(programId: number, programDateId: number, timeSlotId: number, appointmentIndex: number) {
    this.alerts = [];
    this.submitted = false;

    // Making the array that disables the date field right
    this.dateLookUpDisabling.forEach(element => {
      if (appointmentIndex === element.mainForm || appointmentIndex === element.replicatedChild) {
        this.dateLookUpDisabling.splice(this.dateLookUpDisabling.indexOf(element), 1);
      }
    });

    // Removal of this programId if it is in invalid array for reaching max appt per user
    // Since it is a remove now this programId cannot be in max
    if (!!programId && !!this.appointments[appointmentIndex].firstName && !!this.appointments[appointmentIndex].lastName) {
      this.spliceMaxApptsPerUserProgamIdUserInValidArray(appointmentIndex);
    }

    // Performs a deep array copy to trigger form control synchronization
    // This component should be refactored into a reactive form when time permits
    const newAppointmentList = JSON.parse(JSON.stringify(this.appointments));

    let minAppointmentsPerUserValidWhileRemove: boolean = true;
    let availableMinAppointmentInFormCount: number = this.checkDuplicateAppointmentsAndCount(
      newAppointmentList,
      newAppointmentList[appointmentIndex].programId,
      newAppointmentList[appointmentIndex].firstName,
      newAppointmentList[appointmentIndex].lastName,
      newAppointmentList[appointmentIndex].emailAddress
    );
    // Self-sustained with min appointments per user: if this is true then remove that particular index alone
    if (availableMinAppointmentInFormCount !== null && availableMinAppointmentInFormCount !== undefined &&
      newAppointmentList[appointmentIndex].minAppointmentsPerUser !== null && newAppointmentList[appointmentIndex].minAppointmentsPerUser !== undefined) {
      if (availableMinAppointmentInFormCount - 1 >= newAppointmentList[appointmentIndex].minAppointmentsPerUser) {
        minAppointmentsPerUserValidWhileRemove = true;
      } else {
        minAppointmentsPerUserValidWhileRemove = false;
      }
    }
    if (minAppointmentsPerUserValidWhileRemove) {
      // check and updating replicated array for the next immediate index to hide clear button
      if (this.formReplicatedIndexes.length > 0) {
        if (this.formReplicatedIndexes.includes(appointmentIndex)) {
          let removelIndexInReplicationArray = this.formReplicatedIndexes.indexOf(appointmentIndex);
          this.decrementArrayValue(this.formReplicatedIndexes, 1, removelIndexInReplicationArray + 1);
          this.formReplicatedIndexes.splice(removelIndexInReplicationArray, 1);
          for (let i = appointmentIndex + 1; i < newAppointmentList.length; i++) {
            if (newAppointmentList[i].programId === newAppointmentList[appointmentIndex].programId &&
              newAppointmentList[i].firstName === newAppointmentList[appointmentIndex].firstName &&
              newAppointmentList[i].lastName === newAppointmentList[appointmentIndex].lastName) {
              if (!this.formReplicatedIndexes.includes(i - 1)) {
                this.formReplicatedIndexes.push(i - 1);
                this.formReplicatedIndexes.sort((n1, n2) => n1 - n2);
                break;
              }
            }
          }
        }
      }
      // not updating this array just removing step 4 completely
      this.isShowStepFourInfo = false;
      this.infoMessageForMinAppointmentsPerUser = [];

      if (!!programId) {
        if (!!programDateId && !!timeSlotId) {
          this.busyLoading = this.appointmentService.managePendingAppointment({
            existingTimeSlotId: timeSlotId,
            requestedTimeSlotId: null,
            pendingAppointmentInsertedId: null
          }).subscribe();
        }
      }
      newAppointmentList.splice(appointmentIndex, 1);

    } else if (this.formReplicatedIndexes.includes(appointmentIndex)) {
      for (let i = this.formReplicatedIndexes.length - 1; i >= 0; i--) {
        if (newAppointmentList[this.formReplicatedIndexes[i]].programId === programId) {
          if (!!newAppointmentList[this.formReplicatedIndexes[i]].programId) {
            if (!!newAppointmentList[this.formReplicatedIndexes[i]].programDateId
              && !!newAppointmentList[this.formReplicatedIndexes[i]].timeSlotId
              && !!this.appointments[this.formReplicatedIndexes[i]].pendingAppointmentInsertedId) {
              this.busyLoading = this.appointmentService.managePendingAppointment({
                existingTimeSlotId: null,
                requestedTimeSlotId: null,
                pendingAppointmentInsertedId: this.appointments[this.formReplicatedIndexes[i]].pendingAppointmentInsertedId
              }).subscribe();
            }
          }
          newAppointmentList.splice(this.formReplicatedIndexes[i], 1);

          // updating formReplicatedIndexes array
          this.decrementArrayValue(this.formReplicatedIndexes, 1, (i + 1));
          this.formReplicatedIndexes.splice(i, 1);

          // updating step 4 msg index array
          if (this.infoMessageForMinAppointmentsPerUser.length > 0) {
            if (this.infoMessageForMinAppointmentsPerUser.includes(this.formReplicatedIndexes[i])) {
              this.infoMessageForMinAppointmentsPerUser.splice(this.infoMessageForMinAppointmentsPerUser.indexOf(this.formReplicatedIndexes[i]), 1);
            }
          }
        }
      }
    } else {
      if (!!programId) {
        if (!!programDateId && !!timeSlotId) {
          this.busyLoading = this.appointmentService.managePendingAppointment({
            existingTimeSlotId: timeSlotId,
            requestedTimeSlotId: null,
            pendingAppointmentInsertedId: null
          }).subscribe();
        }
      }
      newAppointmentList.splice(appointmentIndex, 1);
    }

    this.appointments = JSON.parse(JSON.stringify(newAppointmentList));
  }

  private decrementArrayValue(array: any, decrementValue: number, fromIndex: number) {
    for (let i = fromIndex; i < array.length; i++) {
      // Decrement the value of the original array by 1 after the index of removal(fromIndex)
      array[i] = array[i] - decrementValue;
    }
  }

  save({ value, valid }: { value: any[], valid: boolean }) {
    window.scroll(0, 0); // Scroll to top on save
    this.submitted = true;
    this.alerts = [];

    if (valid) {
      this.clearInvalidUserPins(this.appointments);
      let hasDuplicateAppointments = this.checkMinAndMaxPerUserSatisfy(this.appointments);
      if (!hasDuplicateAppointments) {
        this.validateAppointments(this.appointments);
      }
    } else {
      this.addAlert('Please correct the validation errors below.', 'danger', true);
    }
  }

  private validateAppointments(appointments: Appointment[]) {
    let invalidAppointmentNames = [];
    let isValid = false;
    this.busySave = this.appointmentService.validateAppointments(appointments).subscribe((results: any) => {
      if (results && results.length > 0) {
        for (let activeAppt of results) {
          if (!invalidAppointmentNames.includes(`Prgram Name: ${activeAppt.programName}, User: ${activeAppt.firstName} ${activeAppt.lastName}, Maximum Appointment Limit: ${activeAppt.maxAppointmentsPerUser}`)) {
            invalidAppointmentNames.push(`Prgram Name: ${activeAppt.programName}, User: ${activeAppt.firstName} ${activeAppt.lastName}, Maximum Appointment Limit: ${activeAppt.maxAppointmentsPerUser}`);
          }
        }
        this.addAlert(
          'Appointments not scheduled. Maximum appointments per person limit is reached for some programs. Deatails of invalid programs: ' +
          invalidAppointmentNames.toString() +
          '. Please remove those entries and resubmit. If a different date and time is preferred, please reschedule using the \'My Appointments\' screen.',
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
      this.maxApptsPerUserProgamIdUserInValid = [];
      this.formReplicatedIndexes = [];
    },
      (error: any) => {
        this.addAlert('Failed to save your appointments.', 'danger', true);
      });
  }

  private checkMinAndMaxPerUserSatisfy(appointments: Appointment[]) {
    let duplicateAppointmentNames = [];

    for (let i = 0; i < appointments.length; i++) {
      let availableAppointmentInFormCount: number = this.checkDuplicateAppointmentsAndCount(
        this.appointments,
        this.appointments[i].programId,
        this.appointments[i].firstName,
        this.appointments[i].lastName,
        this.appointments[i].emailAddress
      );
      if (!this.appointments[i].alreadyReachedMinApptsPerUser) {
        if (availableAppointmentInFormCount !== null && availableAppointmentInFormCount !== undefined &&
          this.appointments[i].minAppointmentsPerUser !== null && this.appointments[i].minAppointmentsPerUser !== undefined) {
          if (availableAppointmentInFormCount < this.appointments[i].minAppointmentsPerUser) {
            if (!duplicateAppointmentNames.includes(`Minimum appointments for the ${appointments[i].programName} program is ${appointments[i].minAppointmentsPerUser} per user (User Name: ${appointments[i].firstName} ${appointments[i].lastName})`)) {
              duplicateAppointmentNames.push(`Minimum appointments for the ${appointments[i].programName} program is ${appointments[i].minAppointmentsPerUser} per user (User Name: ${appointments[i].firstName} ${appointments[i].lastName})`);
            }
          }
        }
      }
      if (availableAppointmentInFormCount !== null && availableAppointmentInFormCount !== undefined &&
        this.appointments[i].maxAppointmentsPerUser !== null && this.appointments[i].maxAppointmentsPerUser !== undefined) {
        if (availableAppointmentInFormCount > this.appointments[i].maxAppointmentsPerUser) {
          if (!duplicateAppointmentNames.includes(`Maximum appointments for the ${appointments[i].programName} program is ${appointments[i].maxAppointmentsPerUser} per user (User Name: ${appointments[i].firstName} ${appointments[i].lastName})`)) {
            duplicateAppointmentNames.push(`Maximum appointments for the ${appointments[i].programName} program is ${appointments[i].maxAppointmentsPerUser} per user (User Name: ${appointments[i].firstName} ${appointments[i].lastName})`);
          }
        }
      }
    }

    let hasDuplicateAppointments = duplicateAppointmentNames.length > 0;
    if (hasDuplicateAppointments) {
      this.addAlert(
        'Appointments not scheduled. ' + duplicateAppointmentNames.toString() +
        '. Please add or remove appointments appropriately to pass validations and resubmit.',
        'danger',
        true,
        'duplicateAppointmentAlert');
    }
    return hasDuplicateAppointments;
  }

  private clearInvalidUserPins(appointments: Appointment[]) {
    for (let i = 0; i < appointments.length; i++) {
      if (!appointments[i].pinIsValid) {
        appointments[i].pin = '';
      }
    }
  }

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

  isLookUpDisabled(index: number): boolean {
    return this.formReplicatedIndexes.includes(index);
  }

  isDateLookUpDisabled(index: number): boolean {
    if (this.isRecursive) {
      let disable: number = 0;
      this.dateLookUpDisabling.forEach(element => {
        if (element.replicatedChild === index) {
          disable = 1;
        }
      });
      if (disable) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isClearButtonHide(index: number): boolean {
    return this.formReplicatedIndexes.includes(index);
  }

  isInfoMessageForMinAppointmentsPerUser(index: number): number {
    if (this.infoMessageForMinAppointmentsPerUser.includes(index)) {
      return index;
    } else {
      return -1;
    }
  }

  // Min appointments per user validation
  private minPerUserValidation(appointmentIndex: number): { [key: string]: any } {
    let minAppointmentsPerUserValid: boolean = true;
    let availableMinAppointmentInFormCount: number = this.checkDuplicateAppointmentsAndCount(
      this.appointments,
      this.appointments[appointmentIndex].programId,
      this.appointments[appointmentIndex].firstName,
      this.appointments[appointmentIndex].lastName,
      this.appointments[appointmentIndex].emailAddress
    );
    if (availableMinAppointmentInFormCount !== null && availableMinAppointmentInFormCount !== undefined &&
      this.appointments[appointmentIndex].minAppointmentsPerUser !== null && this.appointments[appointmentIndex].minAppointmentsPerUser !== undefined) {
      if (availableMinAppointmentInFormCount < this.appointments[appointmentIndex].minAppointmentsPerUser) {
        minAppointmentsPerUserValid = false;
      } else if (availableMinAppointmentInFormCount >= this.appointments[appointmentIndex].minAppointmentsPerUser) {
        minAppointmentsPerUserValid = true;
      }
    }

    return { 'minAppointmentsPerUserValid': minAppointmentsPerUserValid, 'availableMinAppointmentInFormCount': availableMinAppointmentInFormCount };
  }

  // Replication of forms if minimum is more than 1
  private formReplication(appointmentIndex: number, availableMinAppointmentInFormCount: number) {
    if (this.appointments[appointmentIndex].availableAppointments !== null && this.appointments[appointmentIndex].availableAppointments !== undefined &&
      this.appointments[appointmentIndex].minAppointmentsPerUser !== null && this.appointments[appointmentIndex].minAppointmentsPerUser !== undefined) {
      if (this.appointments[appointmentIndex].availableAppointments < this.appointments[appointmentIndex].minAppointmentsPerUser) {
        let count: number = 0;
        for (let i = 0; i < this.appointments.length; i++) {
          if (this.appointments[i].firstName == this.appointments[appointmentIndex].firstName &&
            this.appointments[i].lastName == this.appointments[appointmentIndex].lastName &&
            this.appointments[i].programId == this.appointments[appointmentIndex].programId) {
            count++;
          }
        }
        if (this.appointments[appointmentIndex].availableAppointments !== (this.appointments[appointmentIndex].minAppointmentsPerUser - count)) {
          this.appointments[appointmentIndex] = new Appointment();
          this.addAlert(
            `Sorry, this program requires a minimum of ${this.appointments[appointmentIndex].minAppointmentsPerUser} appointments, which is not available currently. Check out different programs.`,
            'danger',
            true,
            'invalidAppointmentAlert'
          );
        } else {
          this.addAppointment('internal', appointmentIndex, (this.appointments[appointmentIndex].minAppointmentsPerUser - availableMinAppointmentInFormCount));
        }
      } else if (this.appointments[appointmentIndex].availableAppointments >= this.appointments[appointmentIndex].minAppointmentsPerUser) {
        this.addAppointment('internal', appointmentIndex, (this.appointments[appointmentIndex].minAppointmentsPerUser - availableMinAppointmentInFormCount));
      }
    }

  }

  // Max appointments per user validation
  private maxPerUserValidation(appointmentIndex: number): boolean {
    let maxAppointmentsPerUserValid: boolean = true;
    if (this.appointments[appointmentIndex].maxAppointmentsPerUser !== null && this.appointments[appointmentIndex].maxAppointmentsPerUser !== undefined) {
      let availableMaxAppointmentInFormCount: number = this.checkDuplicateAppointmentsAndCount(
        this.appointments,
        this.appointments[appointmentIndex].programId,
        this.appointments[appointmentIndex].firstName,
        this.appointments[appointmentIndex].lastName,
        this.appointments[appointmentIndex].emailAddress
      );
      if (availableMaxAppointmentInFormCount !== null && availableMaxAppointmentInFormCount !== undefined) {
        if (availableMaxAppointmentInFormCount >= this.appointments[appointmentIndex].maxAppointmentsPerUser) {
          maxAppointmentsPerUserValid = false;
          if (!this.containinMaxApptsPerUserProgamIdUserInValidArray(this.appointments[appointmentIndex].programId, this.appointments[appointmentIndex].firstName, this.appointments[appointmentIndex].lastName)) {
            this.maxApptsPerUserProgamIdUserInValid.push({
              'inValidProgramId': this.appointments[appointmentIndex].programId,
              'forThisSpecificUserFirstName': this.appointments[appointmentIndex].firstName,
              'forThisSpecificUserLastName': this.appointments[appointmentIndex].lastName
            });
          }
        } else if (availableMaxAppointmentInFormCount < this.appointments[appointmentIndex].maxAppointmentsPerUser) {
          maxAppointmentsPerUserValid = true;
          this.spliceMaxApptsPerUserProgamIdUserInValidArray(appointmentIndex);
        }
      }
    }

    return maxAppointmentsPerUserValid;
  }

  // isPresent check for invalid program for a specific user due to reaching max appts per user
  private containinMaxApptsPerUserProgamIdUserInValidArray(programId: number, firstName: string, lastName: string): boolean {
    return this.maxApptsPerUserProgamIdUserInValid.some(inValidIdAndUser =>
      (inValidIdAndUser.inValidProgramId === programId) &&
      (inValidIdAndUser.forThisSpecificUserFirstName === firstName) &&
      (inValidIdAndUser.forThisSpecificUserLastName === lastName)
    );
  }

  // max appts per user error array splice
  private spliceMaxApptsPerUserProgamIdUserInValidArray(appointmentIndex: number) {
    if (this.maxApptsPerUserProgamIdUserInValid.length > 0) {
      if (this.containinMaxApptsPerUserProgamIdUserInValidArray(this.appointments[appointmentIndex].programId, this.appointments[appointmentIndex].firstName, this.appointments[appointmentIndex].lastName)) {
        for (let i = 0; i < this.maxApptsPerUserProgamIdUserInValid.length; i++) {
          if ((this.maxApptsPerUserProgamIdUserInValid[i].inValidProgramId === this.appointments[appointmentIndex].programId) &&
            (this.maxApptsPerUserProgamIdUserInValid[i].forThisSpecificUserFirstName === this.appointments[appointmentIndex].firstName) &&
            (this.maxApptsPerUserProgamIdUserInValid[i].forThisSpecificUserLastName === this.appointments[appointmentIndex].lastName)) {
            this.maxApptsPerUserProgamIdUserInValid.splice(i, 1);
          }
        }
      }
    }
  }

  // common for both min and max appointments per user
  private checkDuplicateAppointmentsAndCount(appointments: Appointment[], programId, firstName, lastName, emailAddress) {
    let availableAppointmentInFormCount: number = 0;

    for (let i = 0; i < appointments.length; i++) {
      if (appointments[i].programId == programId &&
        appointments[i].firstName == firstName &&
        appointments[i].lastName == lastName) {
        availableAppointmentInFormCount++;
      }
    }

    return availableAppointmentInFormCount;
  }

}