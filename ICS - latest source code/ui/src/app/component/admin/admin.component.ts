import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LocationService} from '../../service/location.service';
import {DialogService} from '../../service/dialog.service';
import {AppConstant} from '../../shared/app.constant';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [LocationService, DialogService]
})
export class AdminComponent implements OnInit {

  locationList: any [];
  programOwnerList: any [];
  busyLoading: Subscription;
  rowsPerPage = AppConstant.rowsPerPageDefault;
  rowsPerPageOptions = AppConstant.rowsPerPageOptions;

  constructor(private locationService: LocationService,
              private dialogService: DialogService) {}

  ngOnInit() {
    this.busyLoading = this.locationService.getAdminLocations().subscribe((results: any) => {
      if (results) {
        this.locationList = results;
      }
    });
  }

  configureEmailTemplates() {
    this.dialogService.emailTemplates(null, null, 'System', null);
  }

  configureBccEmails() {
    this.dialogService.bccEmails(null, null, 'System', null);
  }

  configureAnnouncement() {
    this.dialogService.announcement(null, 'System');
  }
}
