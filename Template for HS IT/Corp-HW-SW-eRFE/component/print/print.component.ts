import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  // Footer
  currentYear: string = moment(new Date()).format("YYYY");

  constructor() { }

  ngOnInit() {
  }

}
