import {MatDialogRef} from '@angular/material';
import {Component} from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  template: `
    <div matDialogTitle id='infoTitle' appDraggableDialog>
      {{title}}
      <a class='close ml-auto' (click)='dialogRef.close();'><span aria-hidden='true'>&times;</span></a>
    </div>
    <div mat-dialog-content id='infoContent' [innerHTML]='message'>
    </div>
    <br>
    <div class='text-center'>
      <button mat-raised-button color='primary' (click)='dialogRef.close(true)' id='info'>OK</button>
    </div>
  `,
})
export class InfoDialogComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) {

  }
}
