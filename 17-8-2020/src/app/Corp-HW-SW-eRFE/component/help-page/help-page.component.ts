import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css']
})
export class HelpPageComponent implements OnInit {

  // Footer
  currentYear: string = moment(new Date()).format("YYYY");

  constructor() { }

  ngOnInit() {
  }

}
