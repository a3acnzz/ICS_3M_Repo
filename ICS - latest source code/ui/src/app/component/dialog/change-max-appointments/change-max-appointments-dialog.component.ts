import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {ProgramService} from '../../../service/program.service';
import {TimeSlot} from '../../../model/TimeSlot';
import {TimeSlotService} from '../../../service/timeslot.service';

@Component({
  selector: 'app-change-max-appointments-dialog',
  templateUrl: './change-max-appointments-dialog.component.html',
  styleUrls: ['./change-max-appointments-dialog.component.css'],
  providers: [ProgramService, TimeSlotService]
})
export class ChangeMaxAppointmentsDialogComponent implements OnInit {

  alerts = [];
  programDateId: number;
  timeSlotId: number;
  existingMaxAppointments: number;
  maxAppointmentsChange: number;
  busySave: Subscription;
  submitted = false;
  increaseDecreaseInd = 'increase';
  timeSlot: TimeSlot;
  availableAppointments: number;
  currentAppointments: number;
  pendingAppointments: number;
  busyLoading: Subscription;
  warningIndicator = false;

  constructor(public dialogRef: MatDialogRef<ChangeMaxAppointmentsDialogComponent>,
              private programService: ProgramService,
              private timeSlotService: TimeSlotService) {
    this.timeSlot = new TimeSlot()
  }

  ngOnInit() {
    this.timeSlotService.getAppointmentCounts(this.timeSlotId).subscribe((result: any) => {
      if (result) {
        this.currentAppointments = result.currentAppointments;
        this.pendingAppointments = result.pendingAppointments;
        this.availableAppointments = result.availableAppointments;
      }
    });
  }

  changeMaxAppointments({value, valid}: { value: any, valid: boolean }) {
    this.submitted = true;
    this.alerts = [];
    if (valid) {
      // If increasing maximum appointments
      if (this.increaseDecreaseInd === 'increase') {
        // For all time slots in a program date
        if (!!this.programDateId) {
          this.busySave = this.programService.increaseProgramDateMaxAppointments({
            programDateId: this.programDateId,
            maxAppointmentsChange: value.maxAppointmentsChange
          }).subscribe((result: TimeSlot) => {
              this.dialogRef.close(value.maxAppointmentsChange);
            },
            (error: any) => {
              this.alerts.push({msg: 'Failed to save your changes.', type: 'danger', closable: true});
            }
          );
          // For a specific time slot
        } else if (!!this.timeSlotId) {
          this.busySave = this.timeSlotService.increaseTimeSlotMaxAppointments({
            timeSlotId: this.timeSlotId,
            maxAppointmentsChange: value.maxAppointmentsChange
          }).subscribe((result: TimeSlot) => {
              this.dialogRef.close(value.maxAppointmentsChange);
            },
            (error: any) => {
              this.alerts.push({msg: 'Failed to save your changes.', type: 'danger', closable: true});
            }
          );
        }
        // Else if decreasing maximum appointments
      } else if ((this.increaseDecreaseInd === 'decrease') && (value.maxAppointmentsChange <= this.existingMaxAppointments)) {
        // For all time slots in a program date
        if (!!this.programDateId) {
          this.busySave = this.programService.decreaseProgramDateMaxAppointments({
            programDateId: this.programDateId,
            maxAppointmentsChange: value.maxAppointmentsChange
          }).subscribe((result: TimeSlot) => {
              this.dialogRef.close(-value.maxAppointmentsChange);
            },
            (error: any) => {
              this.alerts.push({msg: 'Failed to save your changes.', type: 'danger', closable: true});
            }
          );
          // For a specific time slot
        } else if (!!this.timeSlotId) {
          if (((this.pendingAppointments + this.availableAppointments) < value.maxAppointmentsChange) && !this.warningIndicator) {
            this.warningIndicator = true;
            this.alerts.push({
              msg: 'Decrease count entered will result in cancelling already booked appointments. Click save if you would like to proceed',
              type: 'warning',
              closable: true
            });
          } else {
            this.warningIndicator = false;
              this.busySave = this.timeSlotService.decreaseTimeSlotMaxAppointments({
              timeSlotId: this.timeSlotId,
              maxAppointmentsChange: value.maxAppointmentsChange
            }).subscribe((result: TimeSlot) => {
                this.dialogRef.close(-value.maxAppointmentsChange);
              },
              (error: any) => {
                this.alerts.push({msg: 'Failed to save your changes.', type: 'danger', closable: true});
              }
            );
          }
        }
        } else {
        this.alerts.push({msg: 'Please correct the validation errors below.', type: 'danger', closable: true});
      }
    } else {
      this.alerts.push({msg: 'Please correct the validation errors below.', type: 'danger', closable: true});
    }
  }

  close() {
    this.dialogRef.close();
  }

}
