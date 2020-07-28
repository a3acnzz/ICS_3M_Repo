import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProgramService} from '../../../../../service/program.service';
import {DialogService} from '../../../../../service/dialog.service';
import {isPast, isToday, parse} from 'date-fns';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';

@Component({
  selector: 'app-program-appointments',
  templateUrl: './program-appointments.component.html',
  styleUrls: ['./program-appointments.component.css'],
  providers: [ProgramService, DialogService]
})
export class ProgramAppointmentsComponent implements OnInit {

  alerts = [];
  programId: number;
  locationId: number;
  busyLoading: Subscription;
  appointments = [];
  pastAppointments = [];
  futureAppointments = [];
  isRecursive:boolean;
  constructor(private programService: ProgramService,
              private route: ActivatedRoute,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      // Get programId and locationId from URL parameters
      this.programId = +params['programId'];
      this.locationId = +params['locationId'];

      // Get program data
      this.busyLoading = this.programService
        .programOwnerGetProgramAppointments(this.locationId, this.programId)
        .subscribe((result: any) => {
          // Sort appointments into past and future dates
          for (let appointment of result) {
            let appointmentDate = parse(appointment.programDate.replace(/-/g, '\/').replace(/T.+/, ''));
            if (isPast(appointmentDate) && !isToday(appointmentDate)) {
              this.pastAppointments.push(appointment);
            } else {
              this.futureAppointments.push(appointment);
            }
          }

          // Sort appointments by date and start time
          this.futureAppointments = _.sortBy(this.futureAppointments, ['programDate', 'startTime']);
          this.pastAppointments = _.sortBy(this.pastAppointments, ['programDate', 'startTime']);

          // Concat future appointments first, then past appointments
          this.appointments = this.futureAppointments;
          this.appointments = this.appointments.concat(this.pastAppointments);
        });
    });
  }

  cancelAppointment(appointmentId: number, index: number) {
    this.alerts = [];
    this.dialogService.appointmentCancellation(appointmentId,false,null).subscribe((results: any) => {
      if (results.status === 'success') {
        this.appointments.splice(index, 1);
      }
    });
  }

  exportExcel() {
    let elt = document.getElementsByTagName('table')[0];
    let wb = XLSX.utils.table_to_book(elt);
    return XLSX.writeFile(wb, this.appointments[0].programName + ' - Appointments.xlsx');
  }
}

