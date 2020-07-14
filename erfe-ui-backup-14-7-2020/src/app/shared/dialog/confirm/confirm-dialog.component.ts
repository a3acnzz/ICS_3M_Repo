import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppConstant} from '../../constant/app.constant';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div matDialogTitle appDraggableDialog>{{ title }}
      <a class="close ml-auto" (click)="dialogRef.close(false);"><span aria-hidden="true">&times;</span></a>
    </div>
      <div class="card-block">
        <div mat-dialog-content [innerHTML]="message">
        </div>
      </div>
      <br>
      <div mat-dialog-footer class="text-center">
        <button type="button" mat-raised-button color="primary" id="confirm"
                (click)="dialogRef.close(true)">{{okButtonTxt}}
        </button>
        <button type="button" mat-raised-button id="cancelConfirm"
                (click)="dialogRef.close(false)">{{ cancelButtonTxt}}
        </button>
    </div>
  `,
})
export class ConfirmDialogComponent implements OnInit {

  defaultLang: string = AppConstant.LANG_US;
  public title: string;
  public okButtonTxt = 'OK';
  public cancelButtonTxt = 'Cancel';
  public message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {



  }

  ngOnInit() {
    this.title = this.data.title;
    this.message = this.data.message;
    this.okButtonTxt = this.data.okButtonTxt;
    this.cancelButtonTxt = this.data.cancelButtonTxt;

  }
}
