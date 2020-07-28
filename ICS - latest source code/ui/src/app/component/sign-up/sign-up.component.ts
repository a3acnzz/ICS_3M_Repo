import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LocationService} from '../../service/location.service';
import {AnnouncementService} from '../../service/announcement.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [LocationService, AnnouncementService]
})
export class SignUpComponent implements OnInit {

  busyLoading: Subscription;
  systemAnnouncement = '';
  locationList: any [];

  constructor(private locationService: LocationService,
              private announcementService: AnnouncementService) { }

  ngOnInit() {
    this.busyLoading = this.locationService.getSignUpLocations().subscribe((results: any) => {
      if (results) {
        this.locationList = results;
      }
    });

    this.busyLoading = this.announcementService.search(null, true).subscribe((results: any) => {
      if (results.length > 0) {
        this.systemAnnouncement = results[0].message;
      }
    });
  }
}
