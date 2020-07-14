import { Component, OnInit } from '@angular/core';
import { ShowHeaderService } from 'src/app/service/component/show-header.service';
import { Router } from '@angular/router';
import { RenewalService } from 'src/app/service/component/renewal.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-renewal-list',
  templateUrl: './renewal-list.component.html',
  styleUrls: ['./renewal-list.component.scss']
})
export class RenewalListComponent implements OnInit {
  renewalheaders: any[];
  renewal: any[];
  renewalDashData: any;
  busyLoading: Subscription;

  /**
   * Constructor for RenewalListComponent
   * @param showHeaderFlagService 
   * @param router 
   * @param renewalService 
   * @param datepipe 
   */
  constructor(public showHeaderFlagService: ShowHeaderService, private router: Router, private renewalService: RenewalService, private datepipe: DatePipe) {
    this.showHeaderFlagService.psHeaderFlagValue = false;
    this.showHeaderFlagService.headerFlagValue = false;
    this.showHeaderFlagService.corpHeaderFlagValue = true;
  }
  /**Calling the ngOnInit() 
  * 
  */
  ngOnInit() {

    this.renewalheaders = [
      { field: 'rfeNo', header: 'RFE No.' },
      { field: 'projectTitle', header: 'Title' },
      { field: 'supplierNumber', header: 'Supplier No.' },
      { field: 'supplierName', header: 'Supplier Name' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'completionDate', header: 'Completion Date' },];
    /** Selecting the data
     * 
     */
    this.busyLoading = this.renewalService.getRenewalDash().subscribe((renewaldata: any[]) => {
      renewaldata = renewaldata.map(field => {
        let latestStartDateFormat = this.transform(field.startDate)
        return {
          rfeNo: field.rfeNo,
          projectTitle: field.projectTitle,
          supplierNumber: field.supplierNumber,
          supplierName: field.supplierName,
          startDate: latestStartDateFormat,
          completionDate: field.completionDate,
        };
      });
      this.renewal = renewaldata;
    })
  }
  /**Checking the rfeNo
   * 
   */
  isLink(field) {
    if (field === "rfeNo") {
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
