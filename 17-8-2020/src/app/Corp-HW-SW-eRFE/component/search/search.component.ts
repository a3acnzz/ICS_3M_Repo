import * as moment from 'moment';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AppConstant } from '../../shared/app.constant';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  // Footer
  currentYear: string = moment(new Date()).format("YYYY");

  // Create a busy object to display in the spinner
  // busyLogin = new Subscription();
  busyLoading = false;
  // have to change
  loadingMessage = AppConstant.LOGIN_MESSAGE;
  todayDate: Date = new Date();

  // properties
  searchForm: FormGroup;
  wildCardPopup: boolean = false;
  noValue: boolean = false;
  contactNameNotAvailable: boolean = false;
  contactButtonDisabled: boolean = false;
  contactTabOutPerformed: boolean = false;

  userSupplierName: string = '';
  supplierButtonDisabled: boolean = false;
  supplierNameNotAvailable: boolean = false;
  supplierNameNotAvailableMsg: string = '';
  supplierTabOutPerformed: boolean = false;

  usedFor: any[];
  storeUse: any[];
  status: any[];
  order: any[];
  headers: any[];
  rowSize = 10;
  rowOptions: any[];
  first: any = 0;

  // corpHwSwSearchList: CorpsSearch[] = [];
  corpHwSwSearchList: any[] = [];


  @ViewChild("contact", { static: true }) contact: ElementRef;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      contact: new FormControl('', [Validators.required]),
      supplier: new FormControl('', [Validators.required]),
      hwSwRequestNumber: new FormControl('', [Validators.required]),
      usedFor: new FormControl('', [Validators.required]),
      storeUse: new FormControl('', [Validators.required]),
      projectTitle: new FormControl('', [Validators.required]),
      projectDescription: new FormControl('', [Validators.required]),
      costCenter: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      orderBy: new FormControl('origDate'),
      sortByType: new FormControl(1)
    });

    this.usedFor = [{ label: "Direct production of a 3M product (Resale)", value: "directProduction" }, { label: "R&D purposes", value: "rdPurposes" }, { label: "General office use", value: "generalOfficeUse" }];

    this.storeUse = [{ label: "3M data center (Bldg.243/277) (On Prem)", value: "dataCenter" }, { label: "Hosted 3M's cloud (SaaS)", value: "hosted3MCloud" }, { label: "Cloud hosted by the supplier or a 3rd party (SaaSx)", value: "cloudOr3rdParty" }, { label: "Downloaded to desktop (PC/Mac) (On Prem)", value: "downloaded" }];

    this.status = [{ label: "View All", value: "viewAll" }, { label: "Approved", value: "Approved" }, { label: "Submitted", value: "Submitted" }, { label: "Not Submitted", value: "Not Submitted" }, { label: "Rejected", value: "Rejected" }];

    this.order = [{ value: "origDate", label: "Origin Date" }, { value: "approvedDate", label: "Approved Date" }, { value: "completionDate", label: "Completion Date" }, { value: "startDate", label: "Start Date" }];

    this.headers = [{ field: 'status', header: 'Status' },
    { field: 'approvedDate', header: "Approved Date" },
    { field: "currentApprover", header: "Current Approver" },
    { field: 'contactName', header: 'Contact' },
    { field: 'supplier', header: 'Supplier' },
    { field: 'corpHwSwReqNum', header: 'HW/SW Request No.' },
    { field: 'usedForResult', header: 'Used For' },
    { field: 'storeUseResult', header: 'Storage/ Usage' },
    { field: 'originDate', header: 'Origin Date' },
    { field: 'projectTitle', header: 'Project Title' },
    { field: 'projectDesc', header: 'Project Description' },
    { field: 'costCenter', header: 'Cost Center' },
    { field: 'wbs', header: 'WBS' },
    { field: "approvedAmount", header: "Approval Amount" }];

    this.rowOptions = [{ label: "10", value: 10 }, { label: "20", value: 20 }, { label: "50", value: 50 }, { label: "100", value: 100 }];

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.contact.nativeElement.focus();
    }, 0);
  }

  searchCorpHwSwRecords() {

  }

  // Contact
  contactPopupWithUpdatedNames(userNameEntered: string) {
  }
  getDetailsByUserName(userNameEntered: string, calledBy: string) {
  }

  // Supplier
  supplierPopup() {
  }
  getDetailsBySupplierName(supplierNameEntered: string, calledBy: string) {
  }







  // Validation
  checkValid() {
  }

  // Reset form
  resetFrom() {
  }

}
