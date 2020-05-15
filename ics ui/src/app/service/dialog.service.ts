import { MatDialog, MatDialogRef } from '@angular/material';
import { Injectable } from '@angular/core';
import { SingleTimeSlotDialogComponent } from '../component/dialog/single-time-slot/single-time-slot-dialog.component';
import { MultipleTimeSlotDialogComponent } from '../component/dialog/multiple-time-slot/multiple-time-slot-dialog.component';
import { ProgramSelectDialogComponent } from '../component/dialog/program-select/program-select-dialog.component';
import { ProgramDateSelectDialogComponent } from '../component/dialog/program-date-select/program-date-select-dialog.component';
import { EmailTemplateDialogComponent } from '../component/dialog/email-template/email-template-dialog.component';
import { AnnouncementDialogComponent } from '../component/dialog/announcement/announcement-dialog.component';
import { BccEmailDialogComponent } from '../component/dialog/bcc-email/bcc-email-dialog.component';
import { ChangeMaxAppointmentsDialogComponent } from '../component/dialog/change-max-appointments/change-max-appointments-dialog.component';
import { ProgramCancellationDialogComponent } from '../component/dialog/program-cancellation/program-cancellation-dialog.component';
import { UserSearchDialogComponent } from '../component/dialog/user-search/user-search-dialog.component';
import { AppointmentCancellationDialogComponent } from '../component/dialog/appointment-cancellation/appointment-cancellation-dialog.component';
import { ContactUsConfigureDialogComponent } from '../component/dialog/contact-us-configure/contact-us-configure-dialog.component';
import { ContactUsViewDialogComponent } from '../component/dialog/contact-us-view/contact-us-view-dialog.component';
import { Program } from '../model/Program';
import { PendingAppointmentDialogComponent } from '../component/dialog/pending-appointment/pending-appointment-dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  public singleTimeSlot(submittedProgramDate: String, minAppointmentsPerUser: number, maxAppointmentsPerUser: number) {

    let dialogRef: MatDialogRef<SingleTimeSlotDialogComponent>;

    dialogRef = this.dialog.open(SingleTimeSlotDialogComponent);

    dialogRef.componentInstance.submittedProgramDate = submittedProgramDate.substr(0, 10);
    dialogRef.componentInstance.minAppointmentsPerUser = minAppointmentsPerUser;
    dialogRef.componentInstance.maxAppointmentsPerUser = maxAppointmentsPerUser;

    return dialogRef.afterClosed();
  }

  public multipleTimeSlot(submittedProgramDate: string, minAppointmentsPerUser: number, maxAppointmentsPerUser: number) {

    let dialogRef: MatDialogRef<MultipleTimeSlotDialogComponent>;

    dialogRef = this.dialog.open(MultipleTimeSlotDialogComponent);

    dialogRef.componentInstance.programDate = submittedProgramDate.substr(0, 10);
    dialogRef.componentInstance.minAppointmentsPerUser = minAppointmentsPerUser;
    dialogRef.componentInstance.maxAppointmentsPerUser = maxAppointmentsPerUser;

    return dialogRef.afterClosed();
  }

  public selectProgram(locationId: number, programs: Program[]) {

    let dialogRef: MatDialogRef<ProgramSelectDialogComponent>;

    dialogRef = this.dialog.open(ProgramSelectDialogComponent);

    dialogRef.componentInstance.locationId = locationId;
    dialogRef.componentInstance.programs = programs;

    return dialogRef.afterClosed();
  }

  public selectProgramDate(programId: number, timeSlotId: number, programDateId: number) {

    let dialogRef: MatDialogRef<ProgramDateSelectDialogComponent>;

    dialogRef = this.dialog.open(ProgramDateSelectDialogComponent);

    dialogRef.componentInstance.programId = programId;
    dialogRef.componentInstance.existingTimeSlotId = timeSlotId;
    dialogRef.componentInstance.existingProgramDateId = programDateId;

    return dialogRef.afterClosed();
  }

  public emailTemplates(locationId: number, programId: number, locationName: String, programName: String) {

    let dialogRef: MatDialogRef<EmailTemplateDialogComponent>;

    dialogRef = this.dialog.open(EmailTemplateDialogComponent);

    dialogRef.componentInstance.locationId = locationId;
    dialogRef.componentInstance.programId = programId;
    dialogRef.componentInstance.locationName = locationName;
    dialogRef.componentInstance.programName = programName;
  }

  public bccEmails(locationId: number, programId: number, locationName: String, programName: String) {

    let dialogRef: MatDialogRef<BccEmailDialogComponent>;

    dialogRef = this.dialog.open(BccEmailDialogComponent);

    dialogRef.componentInstance.locationId = locationId;
    dialogRef.componentInstance.programId = programId;
    dialogRef.componentInstance.locationName = locationName;
    dialogRef.componentInstance.programName = programName;
  }

  public announcement(locationId: number, locationName: String) {

    let dialogRef: MatDialogRef<AnnouncementDialogComponent>;

    dialogRef = this.dialog.open(AnnouncementDialogComponent);

    dialogRef.componentInstance.locationId = locationId;
    dialogRef.componentInstance.locationName = locationName;
  }

  public changeMaxAppointments(programDateId: number, timeSlotId: number, existingMaxAppointments: number) {

    let dialogRef: MatDialogRef<ChangeMaxAppointmentsDialogComponent>;

    dialogRef = this.dialog.open(ChangeMaxAppointmentsDialogComponent);

    dialogRef.componentInstance.programDateId = programDateId;
    dialogRef.componentInstance.timeSlotId = timeSlotId;
    dialogRef.componentInstance.existingMaxAppointments = existingMaxAppointments;

    return dialogRef.afterClosed();
  }

  public programCancellation(programDateId: number, timeSlotId: number) {

    let dialogRef: MatDialogRef<ProgramCancellationDialogComponent>;

    dialogRef = this.dialog.open(ProgramCancellationDialogComponent);

    dialogRef.componentInstance.programDateId = programDateId;
    dialogRef.componentInstance.timeSlotId = timeSlotId;

    return dialogRef.afterClosed();
  }

  public searchUser() {

    let dialogRef: MatDialogRef<UserSearchDialogComponent>;

    dialogRef = this.dialog.open(UserSearchDialogComponent);

    return dialogRef.afterClosed();
  }

  public appointmentCancellation(appointmentId: number) {

    let dialogRef: MatDialogRef<AppointmentCancellationDialogComponent>;

    dialogRef = this.dialog.open(AppointmentCancellationDialogComponent);

    dialogRef.componentInstance.appointmentId = appointmentId;

    return dialogRef.afterClosed();
  }

  public managePendingAppointments(programDateId: number) {

    let dialogRef: MatDialogRef<PendingAppointmentDialogComponent>;

    dialogRef = this.dialog.open(PendingAppointmentDialogComponent);

    dialogRef.componentInstance.programDateId = programDateId;

    return dialogRef.afterClosed();
  }

  public configureContactUs(locationId: number, locationName: String) {

    let dialogRef: MatDialogRef<ContactUsConfigureDialogComponent>;

    dialogRef = this.dialog.open(ContactUsConfigureDialogComponent);

    dialogRef.componentInstance.locationId = locationId;
    dialogRef.componentInstance.locationName = locationName;
  }

  public viewContactUs(locationId: number, locationName: String) {

    let dialogRef: MatDialogRef<ContactUsViewDialogComponent>;

    dialogRef = this.dialog.open(ContactUsViewDialogComponent);

    dialogRef.componentInstance.locationId = locationId;
    dialogRef.componentInstance.locationName = locationName;
  }
}
