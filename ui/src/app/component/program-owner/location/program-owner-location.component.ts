import {Component, OnInit} from '@angular/core';
import {ProgramService} from '../../../service/program.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationService} from '../../../service/location.service';
import {DialogService} from '../../../service/dialog.service';
import {AppConstant} from '../../../shared/app.constant';

@Component({
  selector: 'app-program-owner-location',
  templateUrl: './program-owner-location.component.html',
  styleUrls: ['./program-owner-location.component.css'],
  providers: [ProgramService, LocationService, BrowserAnimationsModule, DialogService]
})
export class ProgramOwnerLocationComponent implements OnInit {

  programList: any[];
  locationId: number;
  locationName = '';
  busyLoading: Subscription;
  rowsPerPage = AppConstant.rowsPerPageDefault;
  rowsPerPageOptions = AppConstant.rowsPerPageOptions;

  constructor(private programService: ProgramService,
              private locationService: LocationService,
              private dialogService: DialogService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.locationId = +params['locationId'];
      this.busyLoading = this.programService.programOwnerLocationPrograms(this.locationId).subscribe((results: any) => {
        if (results) {
          this.programList = results;
        }
      });

      this.locationService.getLocation(this.locationId).subscribe((results: any) => {
        if (results) {
          this.locationName = results.name;
        }
      });
    });
  }

  configureEmailTemplates() {
    this.dialogService.emailTemplates(this.locationId, null, this.locationName, null);
  }

  configureBccEmails() {
    this.dialogService.bccEmails(this.locationId, null, this.locationName, null);
  }

  configureAnnouncement() {
    this.dialogService.announcement(this.locationId, this.locationName);
  }

  configureContactUs() {
    this.dialogService.configureContactUs(this.locationId, this.locationName);
  }
}
