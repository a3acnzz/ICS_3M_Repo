import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../../service/location.service';
import {ProgramOwnerService} from '../../../service/program-owner.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AlertModule} from 'ngx-bootstrap';
import {Subscription} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Location} from '../../../model/Location';
import {DialogService} from '../../../service/dialog.service';
import {ProgramOwner} from '../../../model/ProgramOwner';
import * as _ from 'lodash/lodash.min';
import {AppConstant} from '../../../shared/app.constant';

@Component({
  selector: 'app-admin-location',
  templateUrl: './admin-location.component.html',
  styleUrls: ['./admin-location.component.css'],
  providers: [LocationService, ProgramOwnerService, DialogService, AlertModule, BrowserAnimationsModule]
})
export class AdminLocationComponent implements OnInit {

  alerts = [];
  locationId: number;
  location: Location;
  timeZoneList: any;
  saveIndicator: boolean;
  busyLoading: Subscription;
  busySave: Subscription;
  rowsPerPage = AppConstant.rowsPerPageDefault;
  rowsPerPageOptions = AppConstant.rowsPerPageOptions;
  urlString = '';

  constructor(private locationService: LocationService,
              private programOwnerService: ProgramOwnerService,
              private dialogService: DialogService,
              private route: ActivatedRoute,
              private router: Router) {
    this.location = new Location;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.locationId = +params['id'];
      this.busyLoading = this.locationService.getLocation(this.locationId).subscribe((result: any) => {
        this.location = {
          id: result.id,
          name: result.name,
          code: result.code,
          timeZone: !!result.timeZone ? result.timeZone : '',
          active: result.active,
          showInSignUpList: result.showInSignUpList,
          programOwnerList : this.location.programOwnerList
        };
      });
      if (this.locationId > 0) {
        this.busyLoading = this.programOwnerService.search(this.locationId, null).subscribe((result: any) => {
          this.location.programOwnerList = result;
        });
      } else {
        this.location.programOwnerList = [];
        this.alerts = [];
      }
    });

    this.busyLoading = this.locationService.getTimeZones().subscribe((result: any) => {
      this.timeZoneList = result;
    });

    // Get full URL string, e.g.: http://ics-dev/ics-app/admin/location/0
    this.urlString = location.href;
    // Replace admin URL section (/admin/location/{id}) with sign-up routing path, so we can build full link by adding a location code
    this.urlString = this.urlString.replace(this.router.url, '/sign-up/location/')
  }

  addProgramOwner() {
    this.dialogService.searchUser().subscribe((result: ProgramOwner) => {
      if (result) {
        const programOwner = new ProgramOwner();
        programOwner.firstName  = result.firstName;
        programOwner.lastName  = result.lastName;
        programOwner.locationId = this.location.id;
        programOwner.userPin  = result.userPin;
        programOwner.email = result.email;
        if (_.findIndex(this.location.programOwnerList, programOwner) < 0) {
          this.location.programOwnerList.push(programOwner);
        }
      }
    });
  }

  removeProgramOwner(programOwner: ProgramOwner) {
    _.remove(this.location.programOwnerList, programOwner);
  }

  save({value, valid}: { value: any, valid: boolean }) {
    this.alerts = [];
    this.saveIndicator = true;
    if (valid) {
      this.busySave = this.locationService.save(this.location).subscribe((result: any) => {
          this.alerts.push({msg: 'Changes saved.', type: 'success', closable: true});
          // Update URL for new locations
          if (this.locationId <= 0) {
            this.router.navigate(['/admin/location/' + result.id]);
          }
          this.saveIndicator = false;
        },
        (error: any) => {
          this.alerts.push({msg: 'Save failed.', type: 'danger', closable: true});
        }
      );
    }
  }
}
