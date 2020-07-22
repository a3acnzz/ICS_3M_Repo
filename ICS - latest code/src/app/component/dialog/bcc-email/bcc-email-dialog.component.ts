import {Component, OnInit} from '@angular/core';
import {BccEmailService} from '../../../service/bcc-email.service';
import {Subscription} from 'rxjs';
import {BccEmail} from '../../../model/BccEmail';
import {MatDialogRef} from '@angular/material';
import * as _ from 'lodash/lodash.min';

@Component({
  selector: 'app-bcc-email-dialog',
  templateUrl: './bcc-email-dialog.component.html',
  styleUrls: ['./bcc-email-dialog.component.css'],
  providers: [BccEmailService]
})
export class BccEmailDialogComponent implements OnInit {

  alerts = [];
  locationId: number;
  locationName: String;
  programId: number;
  programName: String;
  bccEmailList: BccEmail[];
  hasDuplicateEmails = false;
  submitted = false;
  busyLoading: Subscription;
  busySave: Subscription;

  constructor(public dialogRef: MatDialogRef<BccEmailDialogComponent>,
              private bccEmailService: BccEmailService) {
  }

  ngOnInit() {
    this.busyLoading = this.bccEmailService.search(this.locationId, this.programId).subscribe((result: any) => {
      this.bccEmailList = result;
    });
  }

  addBccEmail() {
    let newBccEmail: BccEmail;
    newBccEmail = new BccEmail();
    newBccEmail.id = null;

    /*
    Angular loses data binding if you splice and array and then push to it (e.g. if you delete a bcc email and then add a new one).
    Not sure if this is a bug, or expected javascript behavior. To avoid this, we are deep copying the array when adding a new email,
    to force Angular to do change detection and display the email list properly.

    https://stackoverflow.com/questions/38951934/angular2-input-text-value-is-not-showing-although-its-model-contain-the-value
    https://stackoverflow.com/questions/7486085/copying-array-by-value-in-javascript

    this.bccEmailList.push(newBccEmail); // Angular loses data binding on the last populated item.
    */

    const newBccEmailList = JSON.parse(JSON.stringify(this.bccEmailList));
    newBccEmailList.push(newBccEmail);
    this.bccEmailList = JSON.parse(JSON.stringify(newBccEmailList));
  }

  removeBccEmail(index: number) {
    this.alerts = [];

    const newBccEmailList = JSON.parse(JSON.stringify(this.bccEmailList));
    newBccEmailList.splice(index, 1);
    this.bccEmailList = JSON.parse(JSON.stringify(newBccEmailList));

    this.hasDuplicateEmails = this.checkDuplicateEmails();
  }

  saveBccEmailList({value, valid}: { value: any, valid: boolean }) {
    this.alerts = [];
    this.submitted = true;
    this.hasDuplicateEmails = this.checkDuplicateEmails();
    if (valid && !this.checkDuplicateEmails()) {
      this.busySave = this.bccEmailService.save(this.bccEmailList, this.locationId, this.programId).subscribe((result: any) => {
          this.bccEmailList = result;
          this.submitted = false;
          this.alerts.push({msg: 'Changes saved.', type: 'success', closable: true});
        },
        (error: any) => {
          this.alerts.push({msg: 'Save failed.', type: 'danger', closable: true});
        }
      );
    } else {
      this.alerts.push({msg: 'Please correct the validation errors below.', type: 'danger', closable: true});
    }
  }

  private checkDuplicateEmails() {
    const emails = this.bccEmailList;
    if (emails && emails.length > 0) {
      return _.uniqBy(emails, 'email').length !== emails.length;
    } else {
      return false;
    }
  }

  close() {
    this.dialogRef.close();
  }
}
