import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { ShowHeaderService } from '../../service/component/show-header.service';
import { CorppsrfeService } from "../../service/component/corppsrfe-service";
import { CorpsSearch } from 'src/app/model/CorpsSearch';
import { Subscription } from "rxjs";
import * as moment from 'moment';
@Component({
  selector: 'app-corp-ps-search',
  templateUrl: './corp-ps-search.component.html',
  styleUrls: ['./corp-ps-search.component.scss']
})
/**
 *  @author senthil
 */
export class CorpPsSearchComponent implements OnInit, AfterViewInit {
  searchForm: FormGroup;
  sortOptions: any[];
  headers: any[];
  rowSize = 10;
  rowOptions: any[];
  status: any[];
  order: any[];
  noValue: boolean = false;
  orderDisplay: boolean = false;
  busyLoading: Subscription;
  noRecordFoundInd = false;
  corpspsSearchList: CorpsSearch[] = [];
  alerts: any[];
  first: any = 0;
  @ViewChild("contact", { static: true }) contact: ElementRef;
  /**
   * @description constructor for CorpPsSearchComponent
   * @param formBuilder 
   * @param showHeaderFlagService 
   * @param corppsrfeService 
   */
  constructor(private formBuilder: FormBuilder, private showHeaderFlagService: ShowHeaderService,
    private corppsrfeService: CorppsrfeService) {
    this.showHeaderFlagService.psHeaderFlagValue = false;
    this.showHeaderFlagService.headerFlagValue = false;
    this.showHeaderFlagService.corpHeaderFlagValue = true;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.contact.nativeElement.focus();
    }, 0);
  }
  /** 
   * @description ng oninit for CorpPsSearchComponent
   * 
   */
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      'contact': new FormControl('', Validators.required),
      'rfe': new FormControl('', Validators.required),
      'psRequestNumber': new FormControl('', Validators.required),
      'supplier': new FormControl('', Validators.required),
      'projectTitle': new FormControl('', Validators.required),
      'projectDescription': new FormControl('', Validators.required),
      'costCenter': new FormControl('', Validators.required),
      'wbs': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.required),
      'orderBy': new FormControl('origDate'),
      'sortByType': new FormControl(1)
    })
    this.sortOptions = [{ value: 0, label: 'Ascending' }, { value: 1, label: 'Descending' },];

    this.status = [{ label: "View All", value: "viewAll" }, { label: "Approved", value: "Approved" }, { label: "Submitted", value: "Submitted" }, { label: "Not Submitted", value: "Not Submitted" }, { label: "Rejected", value: "Rejected" }];

    this.order = [{ value: "origDate", label: "Origin Date" }, { value: "approvedDate", label: "Approved Date" }, { value: "completionDate", label: "Completion Date" }, { value: "startDate", label: "Start Date" }];

    this.headers = [{ field: 'status', header: 'Status' }, { field: 'approvedDate', header: "Approved Date" }, { field: 'contactName', header: 'Contact' }, { field: 'rfeNum', header: 'RFE No.' }, { field: "currentApprover", header: "Current Approver" }, { field: 'corpPSReqNum', header: 'PS Request No.' },
    { field: 'originDate', header: 'Origin Date' }, { field: 'supplier', header: 'Supplier' }, { field: 'projectTitle', header: 'Project Title' }, { field: 'projectDesc', header: 'Project Description' },
    { field: 'costCenter', header: 'Cost Center' }, { field: 'wbs', header: 'WBS' }, { field: "approvedAmount", header: "Approval Amount" }];

    this.rowOptions = [{ label: "10", value: 10 }, { label: "20", value: 20 }, { label: "50", value: 50 }, { label: "100", value: 100 }];
  }
  /** 
   * @description Enabling the popup for Supplier
   * 
   */
  orderFromPopup() {
    this.orderDisplay = true;
  }
  /**
   * @description Get and set the value from popup for Supplier 
   * @param event
   */
  handleOrder(event) {
    if (event != null && event != undefined) {
      this.searchForm.controls['supplier'].setValue(event.providerName);
    }
    else {
      this.searchForm.controls['supplier'].setValue('');
    }
    this.orderDisplay = false;
  }
  /**
   * @description Closing the popup for Supplier*/
  closeOrderFromPopup(): void {
    this.orderDisplay = false;
  }
  /**
   *  @description Search by given form values
   */
  searchCorps() {
    this.first = 0;
    let corpSearch = new CorpsSearch();
    if (this.searchForm.get("status").value === "viewAll")
      corpSearch.status = "";
    else
      if (this.searchForm.get("status").value != null && this.searchForm.get("status").value != undefined)
        corpSearch.status = this.searchForm.get("status").value.trim();
    corpSearch.supplier = this.searchForm.get("supplier").value;
    if (this.searchForm.get("contact").value != null && this.searchForm.get("contact").value != undefined)
      corpSearch.contactName = this.searchForm.get("contact").value.trim();
    if (this.searchForm.get("psRequestNumber").value != null && this.searchForm.get("psRequestNumber").value != undefined)
      corpSearch.corpPSReqNum = this.searchForm.get("psRequestNumber").value.trim();
    if (this.searchForm.get("costCenter").value != null && this.searchForm.get("costCenter").value != undefined)
      corpSearch.costCenter = this.searchForm.get("costCenter").value.trim();
    if (this.searchForm.get("projectDescription").value != null && this.searchForm.get("projectDescription").value != undefined)
      corpSearch.projectDesc = this.searchForm.get("projectDescription").value.trim();
    if (this.searchForm.get("projectTitle").value != null && this.searchForm.get("projectTitle").value != undefined)
      corpSearch.projectTitle = this.searchForm.get("projectTitle").value.trim();
    corpSearch.rfeNum = this.searchForm.get("rfe").value;
    if (this.searchForm.get("wbs").value != null && this.searchForm.get("wbs").value != undefined)
      corpSearch.wbs = this.searchForm.get("wbs").value.trim();
    this.busyLoading = this.corppsrfeService.corpsSearch(corpSearch, this.searchForm.get("orderBy").value,
      this.searchForm.get("sortByType").value).subscribe((results: any[]) => {
        this.corpspsSearchList = results.map(field => {
          return {
            status: field.status,
            contactName: field.contactName,
            rfeNum: field.rfeNum,
            corpPSReqNum: field.corpPSReqNum,
            supplier: field.supplier,
            projectTitle: field.projectTitle,
            projectDesc: field.projectDesc,
            costCenter: field.costCenter,
            wbs: field.wbs,
            originDate: field.origDate,
            approvedAmount: +field.approvedAmount,
            currentApprover: field.currentApprover,
            approvedDate: field.approvedDate
          };
        });


        /**
         * @description Eliminating duplicate values
         */
        this.corpspsSearchList = Array.from(this.corpspsSearchList.reduce((m, result) => m.set(result.corpPSReqNum, result), new Map()).values());

        if (this.corpspsSearchList) {
          if (results.length === 0) {
            this.noRecordFoundInd = true;
          }
        } else {
          this.noRecordFoundInd = true;
        }
      });
  }


  /**
   * @description reset the form
   */
  resetFrom() {
    this.searchForm.reset();
    this.corpspsSearchList = [];
    this.searchForm.controls['sortByType'].setValue(1);
    this.searchForm.controls['orderBy'].setValue('origDate');
    this.contact.nativeElement.focus();
  }
  /**
   *@description checking link or not */
  isLink(field) {
    if (field === "status") {
      return true;
    }
    else
      return false;
  }

  /**
   * Check the Origin Date
   * @param field 
   */

  isDate(field) {
    if (field === "originDate" || field === "approvedDate")
      return true;

    return false;
  }

  /**
   * Check the Approval Amount
   * @param field 
   */
  isApprovalAmount(field) {
    if (field === "approvedAmount") {
      return true;
    }
    else
      return false;
  }
  /** 
   *  @description validation for search form
  */
  checkValid() {
    if (this.searchForm.get("contact").valid && this.searchForm.get("contact").value.trim() != '' ||
      this.searchForm.get("rfe").valid && this.searchForm.get("rfe").value.trim() != '' ||
      this.searchForm.get("psRequestNumber").valid && this.searchForm.get("psRequestNumber").value.trim() != '' ||
      this.searchForm.get("supplier").valid && this.searchForm.get("supplier").value.trim() != '' ||
      this.searchForm.get("projectTitle").valid && this.searchForm.get("projectTitle").value.trim() != '' ||
      this.searchForm.get("projectDescription").valid && this.searchForm.get("projectDescription").value.trim() != '' ||
      this.searchForm.get("costCenter").valid && this.searchForm.get("costCenter").value.trim() != '' ||
      this.searchForm.get("wbs").valid && this.searchForm.get("wbs").value.trim() != '' ||
      this.searchForm.get("status").valid && this.searchForm.get("status").value.trim() != '') {
      this.noValue = false;
      return true;
    }
    else {
      this.noValue = true;
      return false
    }
  }

  substring(value) {
    if (value) {
      if (value.length > 100)
        return value.slice(0, 100) + "...";
      else
        return value;
    }
    else
      return value;

  }
  countCheck(value) {
    if (value) {
      if (value.length > 100)
        return true;
      else
        return false;
    }
    else
      return false;
  }
  transform(value: any, format: string = "MM/DD/YYYY"): string {
    return moment(value).isValid() ? moment(value).format(format) : value;
  }
}
