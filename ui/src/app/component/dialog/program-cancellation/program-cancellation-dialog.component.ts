import {Component, OnInit} from '@angular/core';
import {ProgramService} from '../../../service/program.service';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {TimeSlotService} from '../../../service/timeslot.service';

@Component({
  selector: 'app-program-cancellation-dialog',
  templateUrl: './program-cancellation-dialog.component.html',
  styleUrls: ['./program-cancellation-dialog.component.css'],
  providers: [ProgramService, TimeSlotService]
})
export class ProgramCancellationDialogComponent implements OnInit {

  alerts = [];
  programDateId: number;
  timeSlotId: number;
  confirm = false;
  busySave: Subscription;

  constructor(public dialogRef: MatDialogRef<ProgramCancellationDialogComponent>,
              private programService: ProgramService,
              private timeSlotService: TimeSlotService) {}

  ngOnInit() {}

  submit() {
    if (this.confirm && this.programDateId !== null) {
      this.busySave = this.programService.cancelProgramDate({
        programDateId: this.programDateId,
        timeSlotId: this.timeSlotId
      }).subscribe((result: any) => {
          this.dialogRef.close({
            status: 'success'
          });
        },
        (error: any) => {
          this.alerts.push({msg: 'Failed to save your changes.', type: 'danger', closable: true});
        }
      );
    } else if (this.confirm && this.timeSlotId !== null) {
      this.busySave = this.timeSlotService.cancelTimeSlot({
        programDateId: this.programDateId,
        timeSlotId: this.timeSlotId
      }).subscribe((result: any) => {
          this.dialogRef.close({
            status: 'success'
          });
        },
        (error: any) => {
          this.alerts.push({msg: 'Failed to save your changes.', type: 'danger', closable: true});
        }
      );
    } else {
      this.alerts.push({msg: 'Please correct the validation errors below.', type: 'danger', closable: true});
    }
  }

  close() {
    this.dialogRef.close({
      status: 'closed'
    });
  }
}
