import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  // Footer
  currentYear: string = moment(new Date()).format("YYYY");

  constructor() { }

  ngOnInit() {
  }

}
