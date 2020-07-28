import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../service/location.service';
import {Subscription} from 'rxjs';
import {AppConstant} from '../../shared/app.constant';

@Component({
  selector: 'app-program-owner',
  templateUrl: './program-owner.component.html',
  styleUrls: ['./program-owner.component.css'],
  providers: [LocationService]
})
export class ProgramOwnerComponent implements OnInit {

  locationList: any[];
  busyLoading: Subscription;
  rowsPerPage = AppConstant.rowsPerPageDefault;
  rowsPerPageOptions = AppConstant.rowsPerPageOptions;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.busyLoading = this.locationService.getProgramOwnerLocations().subscribe((results: any) => {
      if (results) {
        this.locationList = results;
      }
    });
  }
}
