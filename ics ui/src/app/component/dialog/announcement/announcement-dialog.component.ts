import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {AnnouncementService} from '../../../service/announcement.service';
import {Announcement} from '../../../model/Announcement';

@Component({
  selector: 'app-announcement-dialog',
  templateUrl: './announcement-dialog.component.html',
  styleUrls: ['./announcement-dialog.component.css'],
  providers: [AnnouncementService]
})
export class AnnouncementDialogComponent implements OnInit {

  alerts = [];
  locationId: number;
  locationName: String;
  announcement: Announcement = new Announcement();
  busyLoading: Subscription;
  busySave: Subscription;

  constructor(public dialogRef: MatDialogRef<AnnouncementDialogComponent>,
              private announcementService: AnnouncementService) {}

  ngOnInit() {
    this.busyLoading = this.announcementService.search(this.locationId, null).subscribe((result: any) => {
      if (result.length > 0) {
        this.announcement = result[0];
      } else {
        this.announcement.locationId = this.locationId;
        // defaults to non-active status for when a user wants to setup the message without turning the announcement on
        this.announcement.active = false;
      }
    });
  }

  saveAnnouncement({value, valid}: { value: any, valid: boolean }) {
    this.alerts = [];
    if (valid) {
      // If message is empty, set message as empty string and inactive
      if (this.announcement.message.trim().length < 1) {
        this.announcement.message = '';
        this.announcement.active = false;
      }
      this.busySave = this.announcementService.save(this.announcement).subscribe((result: any) => {
          this.alerts.push({msg: 'Changes saved.', type: 'success', closable: true});
          this.announcement.id = result.id;
          this.announcement.message = result.message;
          this.announcement.active = result.active;
        },
        (error: any) => {
          this.alerts.push({msg: 'Save failed.', type: 'danger', closable: true});
        }
      );
    } else {
      this.alerts.push({msg: 'Please correct the validation errors below.', type: 'danger', closable: true});
    }
  }

  close() {
    this.dialogRef.close();
  }
}
