import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Program} from '../../../model/Program';
import {Subscription} from 'rxjs';
import {ProgramService} from '../../../service/program.service';

@Component({
  selector: 'app-program-select-dialog',
  templateUrl: './program-select-dialog.component.html',
  styleUrls: ['./program-select-dialog.component.css'],
  providers: [ProgramService]
})
export class ProgramSelectDialogComponent implements OnInit {

  locationId: number;
  programs: Program[] = [];
  busyLoading: Subscription;
  alerts = [];

  constructor(public dialogRef: MatDialogRef<ProgramSelectDialogComponent>,
              private programService: ProgramService) {}

  ngOnInit() {
    if (this.programs.length < 1) {
      this.busyLoading = this.programService.search(null, this.locationId, true).subscribe((results: any) => {
        if (results) {
          this.programs = results;
        }

        if (this.programs.length < 1) {
          this.alerts.push({msg: 'Sorry, there are no available programs.', type: 'primary', id: 'noProgramsAlert'});
        }
      });
    }
  }

  submit(program: Program) {
    this.dialogRef.close(program);
  }

  close() {
    this.dialogRef.close();
  }
}
