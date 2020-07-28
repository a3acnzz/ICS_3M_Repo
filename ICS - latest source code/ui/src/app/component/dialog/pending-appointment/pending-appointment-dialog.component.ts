import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {AppointmentService} from '../../../service/appointment.service';

@Component({
  selector: 'app-pending-appointment-dialog',
  templateUrl: './pending-appointment-dialog.component.html',
  styleUrls: ['./pending-appointment-dialog.component.css'],
  providers: [AppointmentService]
})
export class PendingAppointmentDialogComponent implements OnInit {

  alert = {
    id: null,
    type: null,
    msg: null
  };
  programDateId: number;
  busyLoading: Subscription;
  busySave: Subscription;
  pendingAppointmentList: any[] = [];

  constructor(public dialogRef: MatDialogRef<PendingAppointmentDialogComponent>,
              private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.busyLoading = this.appointmentService.getPendingAppointments(this.programDateId).subscribe((result: any) => {
      this.pendingAppointmentList = result;
    });
  }

  clearPendingAppointment(pendingAppointmentId: number, listIndex: number) {
    this.busySave = this.appointmentService.clearPendingAppointment({pendingAppointmentId: pendingAppointmentId}).subscribe((result: any) => {
        this.pendingAppointmentList.splice(listIndex, 1);
        this.alert = {
          msg: 'Pending appointment cleared',
          type: 'success',
          id: 'pendingAppointmentCleared'
        };
      },
      (error: any) => {
        this.alert = {
          msg: 'Failed to save your changes.',
          type: 'danger',
          id: 'pendingAppointmentClearedError'};
      });
  }

  close() {
    this.dialogRef.close();
  }
}
