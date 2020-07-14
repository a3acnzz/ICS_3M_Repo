import { Component, OnInit } from '@angular/core';
import { ShowHeaderService } from '../../service/component/show-header.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Workers, Renewal, Account, InfoContact } from 'src/app/model/Renewal';
import { RenewalService } from 'src/app/service/component/renewal.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.component.html',
  styleUrls: ['./renewal.component.scss']
})
export class RenewalComponent implements OnInit {
  renewData: any;
  personId: string;
  information: string = "";
  workers: Workers[];
  account: Account[];
  renewal: Renewal;
  siteContactPersonId: string = '';
  projectCoordinatorPersonId: any;
  infoCopy: InfoContact[];
  workerHeader: any[];
  accountHeader: any[];
  renewalForm: FormGroup;
  contactHeader: any[];
  selectedId: any;
  busyLoading: Subscription;
  /**
   * Constructor for RenewalComponent
   * @param showHeaderFlagService 
   * @param formBuilder 
   * @param route 
   * @param renewalService 
   * @param datepipe 
   */
  constructor(public showHeaderFlagService: ShowHeaderService, private formBuilder: FormBuilder, private route: ActivatedRoute, private renewalService: RenewalService, private datepipe: DatePipe) {
    this.showHeaderFlagService.psHeaderFlagValue = false;
    this.showHeaderFlagService.headerFlagValue = false;
    this.showHeaderFlagService.corpHeaderFlagValue = true;
    this.workerHeader = [
      { field: 'hours', header: 'Est. Hours' },
      { field: 'amt', header: 'Dollars' },
      { field: 'desginatedNbr', header: 'Designated Worker' },
      { field: 'contractNbr', header: 'Contract Worker' }
    ];
    this.accountHeader = [
      { field: 'accountId', header: 'Account No.' },
      { field: 'deptId', header: 'Cost Center' },
      { field: 'wbs', header: 'WBS' },
      { field: 'distPer', header: 'Distribution Percentage' },
      { field: 'otherDesc', header: 'Accounting Comments' }
    ];
    this.contactHeader = [
      { field: 'infoCopy', header: 'Informational Copy Person Id' },
    ];
  }
  /**Calling the ngOnInit() 
  * 
  */
  ngOnInit() {
    this.selectedId = this.route.snapshot.params['id'];
    this.renewalForm = this.formBuilder.group({
      'rfeNo': new FormControl({ value: '', disabled: true }),
      'projectTitle': new FormControl({ value: '', disabled: true }),
      'description': new FormControl({ value: '', disabled: true }),
      'supplierNumber': new FormControl({ value: '', disabled: true }),
      'startDate': new FormControl({ value: '', disabled: true }),
      'completionDate': new FormControl({ value: '', disabled: true }),
      'additionalExp': new FormControl({ value: '', disabled: true }),
      'approvalAmt': new FormControl({ value: '', disabled: true }),
      'supplierName': new FormControl({ value: '', disabled: true }),
      'hourly': new FormControl({ value: '', disabled: true }),
      'fixed': new FormControl({ value: '', disabled: true }),
    })
    /**Feteching Data 
     * 
    */
    this.busyLoading = this.renewalService.getRenewForm(+this.selectedId).subscribe(data => {
      if (data) {
        this.renewData = data
        let latestStartDateFormat;
        let latestCompletionDateFormat;

        if (this.renewData.startDateM) {
          latestStartDateFormat = this.transform(this.renewData.startDateM);
        } else {
          latestStartDateFormat = 'No record found';
        }
        if (this.renewData.completionDateM) {
          latestCompletionDateFormat = this.transform(this.renewData.completionDateM);
        } else {
          latestCompletionDateFormat = 'No record found';
        }

        this.renewalForm.patchValue({
          rfeNo: this.selectedId,
          projectTitle: this.renewData.projectTitleM,
          description: this.renewData.descriptionM,
          supplierNumber: this.renewData.supplierNumberM,
          startDate: latestStartDateFormat,
          completionDate: latestCompletionDateFormat,
          additionalExp: this.renewData.additionalExpM,
          approvalAmt: this.renewData.approvalAmtM,
          supplierName: this.renewData.supplierNameM,
          hourly: this.renewData.hourlyM,
          fixed: this.renewData.fixedM
        });
        this.workers = this.renewData.workerDetails;
        this.account = this.renewData.accountDetails;
        if (this.renewData.infoDetails[0].siteCntc) {
          this.siteContactPersonId = this.renewData.infoDetails[0].siteCntc;
        }
        if (this.renewData.infoDetails[0].projCord) {
          this.projectCoordinatorPersonId = this.renewData.infoDetails[0].projCord;
        }
        this.infoCopy = this.renewData.infoDetails;
      }
    });
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
