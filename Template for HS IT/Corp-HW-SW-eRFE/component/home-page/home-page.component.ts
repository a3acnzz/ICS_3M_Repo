import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AppConstant } from '../../shared/app.constant';
import { IRequestor } from 'src/app/model/ApproverDashboard';
import { ApproverServiceService } from 'src/app/service/component/approver-service.service';

declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  // Header
  @Output() headerHighlightEvent = new EventEmitter();
  // Footer
  currentYear: string = moment(new Date()).format("YYYY");

  // Create a busy object to display in the spinner
  // busyLogin = new Subscription();
  busyLoading = false;
  loadingMessage = AppConstant.LOGIN_MESSAGE;
  todayDate: Date = new Date();

  requestorResults: IRequestor[];
  approverName: string;
  userRole: string;
  userId: string;
  requestString: string;
  // busyLoading: Subscription;
  isAdmin: boolean = false;
  deviceInfo = null;
  isMobile: boolean = false;

  constructor(private approverService: ApproverServiceService) {

    this.headerHighlightEvent.emit('home');

  }

  // ngOnInit() {
  // }

  ngOnInit() {

    /** Have to pass the approver pin from login session
     * 
     */
    // this.busyLoading =
    this.approverService.getCorpPsRfe(this.userId).subscribe((data: IRequestor[]) => {
      this.requestorResults = data;
      this.requestorResults = this.requestorResults.map(field => {
        if (field.corpPsNumber) {
          field.corpPsNumber = field.corpPsNumber;
        } else {
          field.corpPsNumber = "";
        }
        if (field.requestorName) {
          field.requestorName = field.requestorName;
        } else {
          field.requestorName = "";
        }
        if (field.createdDate) {
          field.createdDate = field.createdDate;
        } else {
          field.createdDate = new Date();
        }
        return {
          docId: field.docId,
          id: field.id,
          approverAction: field.approverAction,
          approverName: field.approverName,
          approverPin: field.approverPin,
          corpPsNumber: field.corpPsNumber,
          createdDate: field.createdDate,
          requestorName: field.requestorName,
          rfeNum: field.rfeNum,
          status: field.status,
          projectTitle: field.projectTitle
        };
      });
      if (this.requestorResults.length > 0) {
        this.approverName = this.requestorResults[0].approverName;
        this.requestString = 'Requests pending for your Approval';
      }
    });
  }

  substring(value) {
    if (value) {
      if (value.length > 15)
        return value.slice(0, 15) + "...";
      else
        return value;
    }
    else
      return value;

  }
  countCheck(value) {
    if (value) {
      if (value.length > 15)
        return true;
      else
        return false;
    }
    else
      return false;
  }

  // Can be added to click event of <a> tag
  collapseUntouched(i: number) {
    let traverse: number = 0;
    this.requestorResults.forEach(element => {
      if (traverse !== i) {
        $(`#accordion #collapse${traverse}`).collapse('hide');
      }
      traverse++;
    });
  }

}
