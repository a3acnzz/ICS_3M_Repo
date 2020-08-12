import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../../shared/app.constant';
import * as moment from 'moment';

@Component({
  selector: 'app-new-corp-hw-sw-erfe',
  templateUrl: './new-corp-hw-sw-erfe.component.html',
  styleUrls: ['./new-corp-hw-sw-erfe.component.css']
})
export class NewCorpHwSwErfeComponent implements OnInit {

  // Footer
  currentYear: string = moment(new Date()).format("YYYY");

  // Create a busy object to display in the spinner
  // busyLogin = new Subscription();
  busyLoading = false;
  // have to change
  loadingMessage = AppConstant.LOGIN_MESSAGE;
  todayDate: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
