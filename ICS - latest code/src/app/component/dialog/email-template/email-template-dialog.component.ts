import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmailTemplateService } from '../../../service/email-template.service';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { AppConstant } from '../../../shared/app.constant';
import { EmailTemplate, EmailTemplateMetadata } from '../../../model/EmailTemplate';
import * as _ from 'lodash';

@Component({
  selector: 'app-email-template-dialog',
  templateUrl: './email-template-dialog.component.html',
  styleUrls: ['./email-template-dialog.component.css'],
  providers: [EmailTemplateService],
  encapsulation: ViewEncapsulation.None // Used to apply styles from this component's .scss file to ngprime components
})

export class EmailTemplateDialogComponent implements OnInit {

  alerts = [];
  programId: number;
  programName: String;
  locationId: number;
  locationName: String;
  displayTemplates: EmailTemplate[];
  editableTemplates: EmailTemplate[];
  templateTypeConfirm = AppConstant.emailTypeConfirm;
  templateTypeCancel = AppConstant.emailTypeCancel;
  busyLoading: Subscription;
  busySave: Subscription;
  emailTemplateMetadata = new EmailTemplateMetadata(); // Used for controlling form max values
  submitted = false;
  //mandatoryMessage: String;

  constructor(public dialogRef: MatDialogRef<EmailTemplateDialogComponent>,
    private emailTemplateService: EmailTemplateService) {
  }

  ngOnInit() {
    this.busyLoading = this.emailTemplateService.search(this.locationId, this.programId).subscribe((result: any) => {
      this.displayTemplates = result.displayTemplates;
      this.editableTemplates = result.editableTemplates;

      // Add confirmation template if we don't have an existing template
      if (_.findIndex(this.editableTemplates, ['templateType', AppConstant.emailTypeConfirm]) < 0) {
        const confirmationEmailTemplate = new EmailTemplate();
        confirmationEmailTemplate.templateType = AppConstant.emailTypeConfirm;
        confirmationEmailTemplate.programId = this.programId;
        confirmationEmailTemplate.locationId = this.locationId;
        confirmationEmailTemplate.templateLevel = this.setTemplateLevel(this.locationId, this.programId);
        this.editableTemplates.push(confirmationEmailTemplate);
      }

      // Add cancellation template if we don't have an existing template
      if (_.findIndex(this.editableTemplates, ['templateType', AppConstant.emailTypeCancel]) < 0) {
        const cancellationEmailTemplate = new EmailTemplate();
        cancellationEmailTemplate.templateType = AppConstant.emailTypeCancel;
        cancellationEmailTemplate.programId = this.programId;
        cancellationEmailTemplate.locationId = this.locationId;
        cancellationEmailTemplate.templateLevel = this.setTemplateLevel(this.locationId, this.programId);
        this.editableTemplates.push(cancellationEmailTemplate);
      }

    });
  }

  saveEmailTemplates({ value, valid }: { value: any, valid: boolean }) {
    this.alerts = [];
    this.submitted = true;

    const emailTemplateData = {
      locationId: this.locationId,
      programId: this.programId,
      templates: this.editableTemplates
    };

    if (valid) {
      this.busySave = this.emailTemplateService.save(emailTemplateData).subscribe((result: any) => {
        this.ngOnInit();
        this.alerts.push({
          msg: 'Changes saved.',
          type: 'success',
          id: 'saveMessage',
          closable: true
        });
        this.close();
      },
        (error: any) => {
          this.alerts.push({ msg: 'Failed to save your changes.', id: 'failedSaveMessage', type: 'danger', closable: true });
        }
      );
    } else {
      this.alerts.push({ msg: 'Please correct the validation errors.', id: 'validationErrorMessage', type: 'danger', closable: true });
    }
  }

  clearTemplate(templateIndex: number) {
    this.editableTemplates[templateIndex].subject = '';
    this.editableTemplates[templateIndex].message = '';
  }

  private setTemplateLevel(locationId: number, programId: number) {
    if (locationId === null && programId === null) {
      return 'System'
    }
    else if (locationId && programId === null) {
      return 'Location'
    }
    else if (locationId && programId) {
      return 'Program'
    }
    else {
      return 'Undefined Email Template Level'
    }
  }

  close() {
    this.dialogRef.close();
  }
}
