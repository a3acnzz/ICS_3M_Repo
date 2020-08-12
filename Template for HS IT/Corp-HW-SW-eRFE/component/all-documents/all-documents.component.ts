import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrls: ['./all-documents.component.css']
})
export class AllDocumentsComponent implements OnInit {

  // Footer
  currentYear: string = moment(new Date()).format("YYYY");

  constructor() { }

  ngOnInit() {
  }

}
