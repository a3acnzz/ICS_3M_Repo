import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-down-maintenance',
  templateUrl: './down-maintenance.component.html',
  styleUrls: ['./down-maintenance.component.css']
})
export class DownMaintenanceComponent implements OnInit {

  // Footer
  currentYear: string = moment(new Date()).format("YYYY");

  constructor() { }

  ngOnInit() {
  }

}
