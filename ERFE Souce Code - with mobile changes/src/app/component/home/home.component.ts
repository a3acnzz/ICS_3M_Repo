import { Component, OnInit } from '@angular/core';
import { ShowHeaderService } from '../../service/component/show-header.service';
import { ApproverServiceService } from 'src/app/service/component/approver-service.service';
import { IRequestor } from 'src/app/model/ApproverDashboard';
import { CookieService } from 'ngx-cookie-service';
import { AppConstant } from 'src/app/shared/constant/app.constant';
import { Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  requestorResults: IRequestor[];
  approverName: string;
  todayDate: Date = new Date();
  userRole: string;
  userId: string;
  requestString: string;
  busyLoading: Subscription;
  isAdmin: boolean = false;
  deviceInfo = null;
  isMobile: boolean = false;

  /*
  �*/
  /**
   *�Constructor for HomeComponent 
  �*�@author rajkumar
   * @param showHeaderFlagService 
   * @param approverService 
   * @param cookieService 
   */
  constructor(private deviceService: DeviceDetectorService, public showHeaderFlagService: ShowHeaderService, private approverService: ApproverServiceService, private cookieService: CookieService) {
    this.showHeaderFlagService.psHeaderFlagValue = false; //ng if --if true display
    this.showHeaderFlagService.headerFlagValue = false; //hidden --if true will  not display
    this.showHeaderFlagService.corpHeaderFlagValue = true;
    this.userRole = this.cookieService.get(AppConstant.userRole);
    this.userId = this.cookieService.get(AppConstant.userId);
    if (this.userRole === "Admin") {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
    this.isMobile = false;
    this.isMobile = this.deviceService.isMobile();
    this.deviceInfo = this.deviceService.getDeviceInfo();

  }
  /**Calling the ngOnInit() 
    * 
    */
  ngOnInit() {

    /** Have to pass the approver pin from login session
     * 
     */
    this.busyLoading = this.approverService.getCorpPsRfe(this.userId).subscribe((data: IRequestor[]) => {
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
