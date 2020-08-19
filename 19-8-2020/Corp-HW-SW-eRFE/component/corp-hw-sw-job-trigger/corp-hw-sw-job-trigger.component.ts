import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-corp-hw-sw-job-trigger',
  templateUrl: './corp-hw-sw-job-trigger.component.html',
  styleUrls: ['./corp-hw-sw-job-trigger.component.css']
})
export class CorpHwSwJobTriggerComponent implements OnInit {

  // Footer
  currentYear: string = moment(new Date()).format("YYYY");

  constructor() { }

  ngOnInit() {
  }

}
