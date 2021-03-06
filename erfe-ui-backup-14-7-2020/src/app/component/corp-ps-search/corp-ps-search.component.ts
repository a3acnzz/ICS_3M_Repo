import { NewRfeDocumentService } from 'src/app/service/component/new-rfe-document.service';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { ShowHeaderService } from '../../service/component/show-header.service';
import { CorppsrfeService } from "../../service/component/corppsrfe-service";
import { CorpsSearch } from 'src/app/model/CorpsSearch';
import { Subscription } from "rxjs";
import * as moment from 'moment';
import { AppConstant } from 'src/app/shared/constant/app.constant';
import { User } from 'src/app/model/User';
import { debounceTime } from 'rxjs/operators';
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
  contactDisplay: boolean = false;
  busyLoading: Subscription;
  noRecordFoundInd = false;
  corpspsSearchList: CorpsSearch[] = [];
  alerts: any[];
  first: any = 0;

  userSupplierName: string = '';
  supplierButtonDisabled: boolean = false;
  supplierNameNotAvailable: boolean = false;
  supplierNameNotAvailableMsg: string = '';
  supplierTabOutPerformed: boolean = false;

  userLastName: string = '';
  userFirstName: string = '';
  contactButtonDisabled: boolean = false;
  contactNameNotAvailable: boolean = false;
  contactTabOutPerformed: boolean = false;

  @ViewChild("contact", { static: true }) contact: ElementRef;


  /**
   * @description constructor for CorpPsSearchComponent
   * @param formBuilder 
   * @param showHeaderFlagService 
   * @param corppsrfeService 
   */
  constructor(private formBuilder: FormBuilder, private showHeaderFlagService: ShowHeaderService,
    private corppsrfeService: CorppsrfeService, private reusableNewRfeService: NewRfeDocumentService) {
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
  /**getDetailsBySupplierName 
   * 
   * @param supplierNameEntered 
   *  if (this.userSupplierName.charAt(0) === '%' || this.userSupplierName.charAt(this.userSupplierName.length - 1) === '%') {
        this.userSupplierName = supplierNameEntered.trim();
      } else {
        this.userSupplierName = supplierNameEntered.trim() + '%';
      }
   */
  getDetailsBySupplierName(supplierNameEntered: string, calledBy: string) {
    this.supplierTabOutPerformed = true;

    this.userSupplierName = '';
    if (supplierNameEntered !== null && supplierNameEntered !== undefined) {
      if (supplierNameEntered.length > 0) {
        let base = "";
        this.userSupplierName = supplierNameEntered.trim();
        this.busyLoading = this.reusableNewRfeService.getProviderMaster(base, this.userSupplierName).subscribe((results: any[]) => {
          if (results) {
            if (results.length === 0) {
              this.supplierNameNotAvailable = true;
              this.supplierNameNotAvailableMsg = AppConstant.supplierNameNotAvailableMsg;
            } else if (results.length === 1) {
              this.supplierNameNotAvailable = false;
              this.handleOrder(results[0]);
              if (calledBy === 'internal') {
                this.searchCorps();
              }
            } else if (results.length > 1) {
              this.supplierNameNotAvailable = false;
              this.orderFromPopup();
            }
          } else {
            this.supplierNameNotAvailable = true;
            this.supplierNameNotAvailableMsg = AppConstant.supplierNameNotAvailableMsg;
          }
        });
      } else if (calledBy === 'internal') {
        this.searchCorps();
      }
    } else if (calledBy === 'internal') {
      this.searchCorps();
    }
  }
  /**
   * @description Get and set the value from popup for Supplier 
   * @param event
   */
  handleOrder(event) {
    if (event != null && event != undefined) {
      this.searchForm.controls['supplier'].setValue(event.providerName);
      this.supplierButtonDisabled = true;
    }
    else {
      this.searchForm.controls['supplier'].setValue('');
      this.supplierButtonDisabled = false;
    }
    this.orderDisplay = false;
  }
  /**
   * @description Closing the popup for Supplier*/
  closeOrderFromPopup(): void {
    this.orderDisplay = false;
  }

  /** 
   * @description Enabling the popup for contact
   * 
   */
  contactPopup() {
    this.contactDisplay = true;
  }
  contactPopupWithUpdatedNames(userNameEntered: string) {
    this.userLastName = '';
    this.userFirstName = '';
    if (userNameEntered) {
      if (userNameEntered.length > 0) {
        let userName = userNameEntered.trim();
        let noOfSpaces = userName.split(' ').length - 1;
        if (noOfSpaces === 0 || noOfSpaces === 1) {
          if (userName.indexOf(' ') < 0) {
            this.userLastName = userName;
          } else {
            this.userLastName = userName.substr(0, userName.indexOf(' '));
            this.userFirstName = userName.substr(userName.indexOf(' ') + 1, userName.length - 1);
          }
        } else if (noOfSpaces === 2) {
          let index = 0;
          let indexOfSpace = [];
          while ((index = userName.indexOf(' ', index + 1)) > 0) {
            indexOfSpace.push(index);
          }
          this.userFirstName = userName.substr(0, indexOfSpace[0]);
          this.userLastName = userName.substr(indexOfSpace[1] + 1, userName.length - 1);
        }
      }
    }
    this.contactDisplay = true;
  }
  /**getDetailsByUserName
      * 
      * @param userNameEntered
      */
  getDetailsByUserName(userNameEntered: string, calledBy: string) {
    this.contactTabOutPerformed = true;

    this.userLastName = '';
    this.userFirstName = '';
    if (userNameEntered !== null && userNameEntered !== undefined) {
      if (userNameEntered.length > 0) {
        let userName = userNameEntered.trim();
        let noOfSpaces = userName.split(' ').length - 1;
        if (noOfSpaces === 0 || noOfSpaces === 1) {
          if (userName.indexOf(' ') < 0) {
            this.userLastName = userName;
          } else {
            this.userLastName = userName.substr(0, userName.indexOf(' '));
            this.userFirstName = userName.substr(userName.indexOf(' ') + 1, userName.length - 1);
          }

          let user = new User();
          user.personId = '';
          user.personLastName = this.userLastName;
          user.personFirstName = this.userFirstName;
          user.userPin = '';
          this.busyLoading = this.reusableNewRfeService.getglobalUser(user).subscribe((results: any[]) => {
            if (results) {
              results = results.map(result => {
                return {
                  personName: result.personFirstName + ' ' + result.personMiddleName + ' ' + result.personLastName,
                  userPin: result.userPin,
                  personId: result.personId,
                  personPhoneNum: result.personPhoneNum,
                  deptCode: result.deptCode,
                  deptName: result.deptName,

                  personFirstName: result.personFirstName,
                  personMiddleName: result.personMiddleName,
                  personLastName: result.personLastName,
                };
              });
              if (results.length === 0) {
                this.contactNameNotAvailable = true;
              } else if (results.length === 1) {
                this.contactNameNotAvailable = false;
                this.handleContact(results[0]);
                if (calledBy === 'internal') {
                  this.searchCorps();
                }
              } else if (results.length > 1) {
                this.contactNameNotAvailable = false;
                this.contactPopup();
              }
            } else {
              this.contactNameNotAvailable = true;
            }
          });
        } else if (noOfSpaces === 2) {
          let index = 0;
          let indexOfSpace = [];
          while ((index = userName.indexOf(' ', index + 1)) > 0) {
            indexOfSpace.push(index);
          }
          this.userFirstName = userName.substr(0, indexOfSpace[0]);
          this.userLastName = userName.substr(indexOfSpace[1] + 1, userName.length - 1);

          let user = new User();
          user.personId = '';
          user.personLastName = this.userLastName;
          user.personFirstName = this.userFirstName;
          user.userPin = '';
          this.busyLoading = this.reusableNewRfeService.getglobalUser(user).subscribe((results: any[]) => {
            if (results) {
              results = results.map(result => {
                return {
                  personName: result.personFirstName + ' ' + result.personMiddleName + ' ' + result.personLastName,
                  userPin: result.userPin,
                  personId: result.personId,
                  personPhoneNum: result.personPhoneNum,
                  deptCode: result.deptCode,
                  deptName: result.deptName,

                  personFirstName: result.personFirstName,
                  personMiddleName: result.personMiddleName,
                  personLastName: result.personLastName,
                };
              });
              if (results.length === 0) {
                this.contactNameNotAvailable = true;
              } else if (results.length === 1) {
                this.contactNameNotAvailable = false;
                this.handleContact(results[0]);
                if (calledBy === 'internal') {
                  this.searchCorps();
                }
              } else if (results.length > 1) {
                this.contactNameNotAvailable = false;
                this.contactPopup();
              }
            } else {
              this.contactNameNotAvailable = true;
            }
          });
        } else {
          this.contactNameNotAvailable = true;
        }
      } else if (calledBy === 'internal') {
        this.searchCorps();
      }
    } else if (calledBy === 'internal') {
      this.searchCorps();
    }
  }

  /**
     * @description Get and set the value from popup for contact 
     * @param event
     */
  handleContact(event) {
    if (event != null && event != undefined) {
      this.searchForm.controls['contact'].setValue(event.personName);
      this.contactButtonDisabled = true;
    }
    else {
      this.searchForm.controls['contact'].setValue('');
      this.contactButtonDisabled = false;
    }
    this.contactDisplay = false;
  }
  /**
   * @description Closing the popup for contact*/
  closeContactPopup(): void {
    this.contactDisplay = false;
  }

  /**
   *  @description Search by given form values
   */
  searchCorps() {
    if (this.supplierTabOutPerformed && this.contactTabOutPerformed) {
      this.contactNameNotAvailable = false;
      this.supplierNameNotAvailable = false;

      this.first = 0;
      let corpSearch = new CorpsSearch();
      if (this.searchForm.get("status").value === "viewAll")
        corpSearch.status = "";
      else if (this.searchForm.get("status").value != null && this.searchForm.get("status").value != undefined)
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
    } else {
      if (!this.supplierTabOutPerformed) {
        this.getDetailsBySupplierName(this.searchForm.get('supplier').value, 'internal');
      }
      if (!this.contactTabOutPerformed) {
        this.getDetailsByUserName(this.searchForm.get('contact').value, 'internal');
      }
    }
  }


  /**
   * @description reset the form
   */
  resetFrom() {
    this.noValue = false;
    this.contactNameNotAvailable = false;
    this.supplierNameNotAvailable = false;
    this.supplierButtonDisabled = false;
    this.contactButtonDisabled = false;

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
