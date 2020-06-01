import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {ContactUs} from '../../../model/ContactUs';
import {ContactUsService} from '../../../service/contactUs.service';

@Component({
  selector: 'app-contact-us-configure-dialog',
  templateUrl: './contact-us-configure-dialog.component.html',
  styleUrls: ['./contact-us-configure-dialog.component.css'],
  providers: [ContactUsService]
})
export class ContactUsConfigureDialogComponent implements OnInit {

  contactUs: ContactUs = new ContactUs();
  alerts = [];
  locationId: number;
  locationName: String;
  busyLoading: Subscription;
  busySave: Subscription;

  constructor(public dialogRef: MatDialogRef<ContactUsConfigureDialogComponent>, private contactUsService: ContactUsService) {}

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

  saveContactUs({value, valid}: { value: any, valid: boolean }) {
    this.alerts = [];
    // Set blank message if no message is entered
    if (this.contactUs.message.trim().length < 1) {
      this.contactUs.message = '';
    }
    if (valid) {
      this.busySave = this.contactUsService.save(this.contactUs).subscribe((result: any) => {
          this.alerts.push({msg: 'Changes saved.', type: 'success', id: 'saveMessage', closable: true});
        },
        (error: any) => {
          this.alerts.push({msg: 'Save failed.', type: 'danger', id: 'erorMessage', closable: true});
        }
      );
    } else {
      this.alerts.push({msg: 'Please correct the validation errors below.', type: 'danger', id: 'validationMessage', closable: true});
    }
  }

  close() {
    this.dialogRef.close();
  }

}
