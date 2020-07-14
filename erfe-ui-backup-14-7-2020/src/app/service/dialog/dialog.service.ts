import {Observable} from 'rxjs';
import {ConfirmDialogComponent} from '../../shared/dialog/confirm/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Injectable} from '@angular/core';
import {InfoDialogComponent} from '../../shared/dialog/confirm/info-dialog.component';
import {SecurityDialogComponent} from '../../shared/dialog/security/security-dialog.component';
import {User} from '../../model/User';

import {AppConstant} from '../../shared/constant/app.constant';



@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }


  public confirm(title: string, message: string, lang: string = AppConstant.LANG_US,
                 okButton: string = 'OK', cancelButton: string = 'Cancel'): Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          'cancelButtonTxt': cancelButton,
          'okButtonTxt': okButton,
          'defaultLang': lang,
          'title': title,
          'message': message
        }
      }
    );

    return dialogRef.afterClosed();
  }

  public info(title: string, message: string): Observable<boolean> {

    let dialogRef: MatDialogRef<InfoDialogComponent>;

    dialogRef = this.dialog.open(InfoDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  public securityError(): Observable<boolean> {

    let dialogRef: MatDialogRef<SecurityDialogComponent>;

    dialogRef = this.dialog.open(SecurityDialogComponent);

    return dialogRef.afterClosed();
  }


}
