import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {ContactUs} from '../../../model/ContactUs';
import {ContactUsService} from '../../../service/contactUs.service';

@Component({
  selector: 'app-contact-us-view-dialog',
  templateUrl: './contact-us-view-dialog.component.html',
  styleUrls: ['./contact-us-view-dialog.component.css'],
  providers: [ContactUsService]
})

export class ContactUsViewDialogComponent implements OnInit {

  contactUs: ContactUs = new ContactUs();
  alerts = [];
  locationId: number;
  locationName: String;
  busyLoading: Subscription;
  busySave: Subscription;

  constructor(public dialogRef: MatDialogRef<ContactUsViewDialogComponent>,
  private contactUsService: ContactUsService) {}

  ngOnInit() {
    this.busyLoading = this.contactUsService.search(this.locationId, null).subscribe((result: any) => {
      if (result.length > 0) {
        this.contactUs = result[0];
      } else {
        this.contactUs.locationId = this.locationId;
        this.contactUs.message = 'There is no contact us information configured for this location.';
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
