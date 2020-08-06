import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-security-dialog',
  templateUrl: './security-dialog.component.html',
  styleUrls: ['./security-dialog.component.scss']
})
export class SecurityDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SecurityDialogComponent>) {
  }

  ngOnInit() {
  }

}
