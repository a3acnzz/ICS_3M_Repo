import { Component, OnInit } from '@angular/core';
import { ShowHeaderService } from '../../service/component/show-header.service';
import { AllDoc } from 'src/app/model/AllDoc';
import { AllDocService } from "../../service/component/alldoc-service";
import { Subscription } from "rxjs";
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-alldoc',
  templateUrl: './alldoc.component.html',
  styleUrls: ['./alldoc.component.scss']
})
export class AlldocComponent implements OnInit {
  /**
   * @author senthil
   */
  busyLoading: Subscription;
  noRecordFoundInd = false;
  allDocList: AllDoc[] = [];
  displayRows = 20;
  searchDetails: AllDoc[];
  cols: any[];


  /**
   * Hiding the default side bar
   * Constructor for AlldocComponent
   * @param showHeaderFlagService 
   * @param allDocdata 
   * @param datepipe 
   */
  constructor(public showHeaderFlagService: ShowHeaderService, private allDocdata: AllDocService, private datepipe: DatePipe) {
    this.showHeaderFlagService.psHeaderFlagValue = false; //ng if --if true display
    this.showHeaderFlagService.headerFlagValue = false; //hidden --if true will  not display
    this.showHeaderFlagService.corpHeaderFlagValue = true;
  }
  /**Calling the ngOnInit() method
   * 
   */
  ngOnInit() {
    /**To fetch data from Back end and patching values
     * 
    */
    this.busyLoading = this.allDocdata.allDocGet().subscribe((results: any[]) => {
      if (results) {

        results = results.map(field => {
          
          let latestOrigDateFormat = this.transform(field.origDate);
          return {
            status: field.status,
            requestor: field.requestor,
            psNumber: field.psNumber,
            origDate: latestOrigDateFormat,
            approver: field.approver,
            rfeNumber: field.rfeNumber,
            approvedAmt: +field.approvedAmt,
          };
        });
        this.allDocList = results;
        if (results.length === 0) {
          this.noRecordFoundInd = true;
        }
      } else {
        this.noRecordFoundInd = true;
      }
    });

    this.cols = [
      { field: 'status', header: 'Status' },
      { field: 'requestor', header: 'Requestor' },
      { field: 'psNumber', header: 'PS Request Number' },
      { field: 'origDate', header: 'Origin Date' },
      { field: 'approver', header: 'Current Approver' },
      { field: 'rfeNumber', header: 'RFE Number' },
      { field: 'approvedAmt', header: 'Approval Amount' }
    ];
  }

  /**
   * Check the status
   * @param field 
   */
  isLink(field) {
    if (field === "status") {
      return true;
    }
    else
      return false;
  }
  /**
   * Check the Approval Amount
   * @param field 
   */
  isApprovalAmount(field) {
    if (field === "approvedAmt") {
      return true;
    }
    else
      return false;
  }
  /**
   * Date Formatting
   * @param value 
   * @param format 
   */
  transform(value: any, format: string = "MM/DD/YYYY"): string {
    return moment(value).isValid() ? moment(value).format(format) : value;
  }

}
