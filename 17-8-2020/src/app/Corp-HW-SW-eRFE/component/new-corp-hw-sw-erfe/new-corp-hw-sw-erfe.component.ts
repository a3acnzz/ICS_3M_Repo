import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../../shared/app.constant';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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

  // Properties
  newRFEDocument: FormGroup;

  corpHwSwReqNum: string;


  // Supplier Table
  supplierRowsToAddValid: boolean = false;
  supplierRowsToAddMsg: string = '';


  // Expenditure Breakdown
  approvalAmount: number = 0;

  // Accounting Information
  filterDataForAccountNumber: any[] = [];
  filterDataForCostCenter: any[] = [];
  distributionKeyPress: boolean = true;
  distributionSum: number = 0;
  // validation
  percentValid: boolean = false;
  percentMsg: string = '';
  distributionValid: boolean = false;
  distributionMsg: string = '';

  // Approver Table
  approvalRowsToAddValid: boolean = false;
  approvalRowsToAddMsg: string = '';

  // Informational Copy
  infoCopyValid: boolean = false;
  infoCopyMsg: string = '';

  // File Upload
  attachments: any[] = [];

  // Activity Logs
  activityLogsCols: any[];
  activityLogsValue: any[];


  constructor(private fb: FormBuilder) {
    this.newRFEDocument = this.fb.group({
      originDate: this.transform(new Date()),
      hwSwRequestNumber: [''],

      siteContactName: ['', [Validators.required]],
      contactPhoneNumber: [''],
      contactPersonID: [''],
      contactUserPin: [''],

      deliverToName: [''],
      deliverToAddress: [''],
      deliverToPhoneNumber: [''],
      deliverToEmail: [''],

      projectTitle: ['', [Validators.required]],
      summarySpec: ['', [Validators.required]],
      justification: ['', [Validators.required]],

      usedFor: ['', [Validators.required]],
      storeUse: ['', [Validators.required]],
      personalInfoShare: ['', [Validators.required]],
      licenceReview: ['', [Validators.required]],
      licencecompliance: ['', [Validators.required]],

      supplierNumOfRows: [''],
      accountNumOfRows: [''],
      approverNumOfRows: [''],
      infoCopyNumOfRows: [''],

      suppplierInfo: this.fb.array([this.buildSupplierRow()]),
      expenditureBreakdown: this.fb.array([this.buildExpenditureBreakdown()]),
      accountInfo: this.fb.array([this.buildAccountRowIntialize()]),
      approverInfo: this.fb.array([this.buildApproverRow()]),
      informationalCopyInfo: this.fb.array([this.buildInfoCopyRow()]),

      comments: [''],
    });
  }

  ngOnInit() {

    // temp
    this.activityLogsCols = [
      { field: 'logActionDate', header: 'Timestamp' },
      { field: 'logAction', header: 'Action' },
      { field: 'logDescConstruct', header: 'Description' },
      { field: 'userPinWithName', header: 'Last Updated By' },
    ];
    this.activityLogsValue = [{
      logActionDate: "No Records Found",
      logAction: "No Records Found",
      logDescConstruct: "No Records Found",
      userPinWithName: "No Records Found",
    }];
  }

  // --------------------------------Building of dynamic tables----------------------------//

  buildSupplierRow(): FormGroup {
    return this.fb.group({
      corpHwSwSupplierId: [''],
      orderFromName: ['', [Validators.required]],
      orderFromNameAddress: [''],
    });
  }

  buildExpenditureBreakdown(): FormGroup {
    return this.fb.group({
      eAFEExpenditure: [''],
      capitalizedHwSw: [''],
      expenditureHwSw: [''],
      otherCosts: [''],
      maintenanceAndSupport: [''],
      tax: [''],
    });
  }

  buildAccountRowIntialize(): FormGroup {
    return this.fb.group({
      corpHwSwAccountId: [''],
      account: ['', Validators.required],
      costCenter: ['', Validators.required],
      wbs: [''],
      distribution: [(100).toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 }), Validators.required],
      miscellaneous: [''],
    });
  }

  buildAccountRow(): FormGroup {
    return this.fb.group({
      corpHwSwAccountId: [''],
      account: ['', Validators.required],
      costCenter: ['', Validators.required],
      wbs: [''],
      distribution: ['', Validators.required],
      miscellaneous: [''],
    });
  }

  buildApproverRow(): FormGroup {
    return this.fb.group({
      corpHwSwApproverId: [''],
      approverName: ['', Validators.required],
      approverPersonId: ['']
    });
  }

  buildInfoCopyRow(): FormGroup {
    return this.fb.group({
      corpHwSwInfoCopyId: [''],
      infoCopyName: [''],
      infoCopyPersonId: ['']
    });
  }

  /** Fetching of dynamic Table
  * 
  */
  get suppplierInfo(): FormArray {
    return this.newRFEDocument.get('suppplierInfo') as FormArray;
  }

  get expenditureBreakdown(): FormArray {
    return this.newRFEDocument.get('expenditureBreakdown') as FormArray;
  }

  get accountInfo(): FormArray {
    return this.newRFEDocument.get('accountInfo') as FormArray;
  }

  get approverInfo(): FormArray {
    return this.newRFEDocument.get('approverInfo') as FormArray;
  }

  get informationalCopyInfo(): FormArray {
    return this.newRFEDocument.get('informationalCopyInfo') as FormArray;
  }





  // --------------------------------Supplier dynamic table----------------------------//

  /**Dynamic Table - Supplier Names 
   * 
   * @param value 
   */
  addSupplierInfoTable(value): void {
    if (value === "") {
      this.supplierRowsToAddValid = false;
    }
    if (value) {
      value = +value;
      if (value < 101 && value > 0) {
        this.supplierRowsToAddValid = false;
        for (let i = 1; i <= value; i++) {
          this.suppplierInfo.push(this.buildSupplierRow());
        }
      } else {
        this.supplierRowsToAddValid = true;
        this.supplierRowsToAddMsg = AppConstant.numberOfRowsToAddValidate;
      }

      if (this.newRFEDocument.get('supplierNumOfRows').value) {
        this.newRFEDocument.patchValue({
          supplierNumOfRows: null,
        });
      }
    }
  }
  /**
  * Positive values for Tables
  */
  supplierRowsPositiveValues() {
    let positive = 0;
    let currentValue = this.newRFEDocument.get('supplierNumOfRows').value;
    if (currentValue) {
      currentValue = +currentValue.toFixed();
      positive = Math.abs(currentValue);
      if (positive === 0) {
        positive = null;
      }
      this.newRFEDocument.patchValue({
        supplierNumOfRows: positive,
      });
    }
  }
  /**Remove supplier table
  * 
  * @param formArray 
  */
  removeSupplierTable(formArray): void {
    this.supplierRowsToAddValid = false;
    while (formArray.length !== 1) {
      formArray.removeAt(1);
    }
    formArray.get([0]).patchValue({
      corpHwSwSupplierId: null,
      orderFromName: null,
      orderFromNameAddress: null,
    });
  }

  /**Remove row
   * 
   * @param rowIndex 
   */
  removeSupplierRow(rowIndex: number) {
    this.suppplierInfo.removeAt(rowIndex);
    if (this.newRFEDocument.get('suppplierInfo').value.length === 0) {
      this.addSupplierTableForPatching(1);
    }
  }

  /**Add supplier table
  * 
  * @param value 
  */
  addSupplierTableForPatching(value) {
    if (value) {
      for (let i = 0; i < value; i++) {
        this.suppplierInfo.push(this.buildSupplierRow());
      }
    }
  }


  // --------------------------------Accounting dynamic table----------------------------//

  /**Dynamic Table - Accounting Information 
   * 
   * @param value 
   */
  addAccountInfoTable(value): void {
    if (value === "") {
      this.percentValid = false;
    }
    if (value) {
      value = +value;
      if (value < 101 && value > 0) {
        this.percentValid = false;
        for (let i = 0; i < value; i++) {
          // if (this.distCheck()) {
          this.accountInfo.push(this.buildAccountRow());
          // }
        }
      } else {
        this.percentValid = true;
        this.percentMsg = AppConstant.numberOfRowsToAddValidate;
      }

      if (this.newRFEDocument.get('accountNumOfRows').value) {
        this.newRFEDocument.patchValue({
          accountNumOfRows: null,
        });
      }
    }
  }
  /**
  * Positive values for Tables
  */
  accountingRowsPositiveValues() {
    let positive = 0;
    let currentValue = this.newRFEDocument.get('accountNumOfRows').value;
    if (currentValue) {
      currentValue = +currentValue.toFixed();
      positive = Math.abs(currentValue);
      if (positive === 0) {
        positive = null;
      }
      this.newRFEDocument.patchValue({
        accountNumOfRows: positive,
      });
    }
  }
  /**Remove account table
  * 
  * @param formArray 
  */
  removeAccountTable(formArray): void {
    this.distributionSum = 0;
    this.percentValid = false;
    this.distributionValid = false;
    while (formArray.length !== 1) {
      formArray.removeAt(1);
    }
    formArray.get([0]).patchValue({
      corpHwSwAccountId: null,
      account: null,
      costCenter: null,
      wbs: null,
      distribution: null,
      miscellaneous: null
    });
    // this.distCheck();
  }
  /**Remove row
  *
  * @param rowIndex 
  */
  removeAccountRow(rowIndex: number) {
    this.accountInfo.removeAt(rowIndex);
    if (this.newRFEDocument.get('accountInfo').value.length === 0) {
      this.accountInfo.push(this.buildAccountRowIntialize());
    }
  }
  /**Add account table
  * 
  * @param value 
  */
  addAccountTableForPatching(value) {
    if (value) {
      for (let i = 0; i < value; i++) {
        this.accountInfo.push(this.buildAccountRow());
      }
    }
  }

  // Account
  filterAccount(event) {
  }
  accountBlur(i) {
  }
  accountFocus(i) {
  }

  // Cost center
  filterCostCenter(event) {

  }
  costCenterBlur(i) {

  }
  costCenterFocus(i) {

  }

  // Distribution
  distributionLeft(i) {

  }
  distributionRegexCheck(i) {

  }



  // --------------------------------Approver dynamic table----------------------------//

  /**Dynamic Table - Approval Names 
   * 
   * @param value 
   */
  addApproverInfoTable(value): void {
    if (value === "") {
      this.approvalRowsToAddValid = false;
    }
    if (value) {
      value = +value;
      if (value < 101 && value > 0) {
        this.approvalRowsToAddValid = false;
        for (let i = 1; i <= value; i++) {
          this.approverInfo.push(this.buildApproverRow());
        }
      } else {
        this.approvalRowsToAddValid = true;
        this.approvalRowsToAddMsg = AppConstant.numberOfRowsToAddValidate;
      }

      if (this.newRFEDocument.get('approverNumOfRows').value) {
        this.newRFEDocument.patchValue({
          approverNumOfRows: null,
        });
      }
    }
  }
  /**
  * Positive values for Tables
  */
  approverRowsPositiveValues() {
    let positive = 0;
    let currentValue = this.newRFEDocument.get('approverNumOfRows').value;
    if (currentValue) {
      currentValue = +currentValue.toFixed();
      positive = Math.abs(currentValue);
      if (positive === 0) {
        positive = null;
      }
      this.newRFEDocument.patchValue({
        approverNumOfRows: positive,
      });
    }
  }
  /**Remove approval table
  * 
  * @param formArray 
  */
  removeApproverTable(formArray): void {
    this.approvalRowsToAddValid = false;
    while (formArray.length !== 1) {
      formArray.removeAt(1);
    }
    formArray.get([0]).patchValue({
      corpHwSwApproverId: null,
      approverName: null,
      approverPersonId: null,
    });
  }
  /**Remove row
  * 
  * @param rowIndex 
  */
  removeApproverRow(rowIndex: number) {
    this.approverInfo.removeAt(rowIndex);
    if (this.newRFEDocument.get('approverInfo').value.length === 0) {
      this.addApproverTableForPatching(1);
    }
  }

  /**Add approval table
  * 
  * @param value 
  */
  addApproverTableForPatching(value) {
    if (value) {
      for (let i = 0; i < value; i++) {
        this.approverInfo.push(this.buildApproverRow());
      }
    }
  }
  // --------------------------------Informational copy dynamic table----------------------------//

  /**Dynamic Table - Informational Copy
  * 
  * @param value 
  */
  addInfoCopyTable(value): void {
    if (value === "") {
      this.infoCopyValid = false;
    }
    if (value) {
      value = +value;
      if (value < 101 && value > 0) {
        this.infoCopyValid = false;
        for (let i = 1; i <= value; i++) {
          this.informationalCopyInfo.push(this.buildInfoCopyRow());
        }
      } else {
        this.infoCopyValid = true;
        this.infoCopyMsg = AppConstant.numberOfRowsToAddValidate;
      }

      if (this.newRFEDocument.get('infoCopyNumOfRows').value) {
        this.newRFEDocument.patchValue({
          infoCopyNumOfRows: null,
        });
      }
    }
  }
  /**
  * Positive values for Tables
  */
  infoCopyRowsPositiveValues() {
    let positive = 0;
    let currentValue = this.newRFEDocument.get('infoCopyNumOfRows').value;
    if (currentValue) {
      currentValue = +currentValue.toFixed();
      positive = Math.abs(currentValue);
      if (positive === 0) {
        positive = null;
      }
      this.newRFEDocument.patchValue({
        infoCopyNumOfRows: positive,
      });
    }
  }
  /**Remove infoCopy table
  * 
  * @param formArray 
  */
  removeInfoTable(formArray): void {
    this.infoCopyValid = false;
    while (formArray.length !== 1) {
      formArray.removeAt(1);
    }
    formArray.get([0]).patchValue({
      corpHwSwInfoCopyId: null,
      infoCopyName: null,
      infoCopyPersonId: null,
    });
  }
  /**Remove row
  * 
  * @param rowIndex 
  */
  removeInfoCopyRow(rowIndex: number) {
    this.informationalCopyInfo.removeAt(rowIndex);
    if (this.newRFEDocument.get('informationalCopyInfo').value.length === 0) {
      this.addInfoCopyTableForPatching(1);
    }
  }
  /**Add Info Copy table
  * 
  * @param value 
  */
  addInfoCopyTableForPatching(value) {
    if (value) {
      for (let i = 0; i < value; i++) {
        this.informationalCopyInfo.push(this.buildInfoCopyRow());
      }
    }
  }

  // --------------------------------File Upload Section----------------------------//

  /**
  * Upload selection
  * @param event 
  */
  onFileUpload(event) {

  }
  /**
  * Upload cancel
  * @param event 
  */
  onFileRemove(event) {

  }
  /**
  * Upload all clear
  */
  onAllFileClear() {
  }
  /**file error
  * 
  * @param event 
  */
  onFileError(event) {
  }
  /**Download file
  * @param corpHwSwReqNum
  * @param name 
  */
  downloadFile(corpHwSwReqNum, name) {
  }
  /**Delete File
  * 
  * @param id 
  * @param index 
  */
  deleteFile(id, index) {
  }












  // --------------------------------Miscellaneous----------------------------//

  /**
   * Date Formatting
   * @param value 
   * @param format 
   */
  transform(value: any, format: string = "MM/DD/YYYY"): string {
    return moment(value).isValid() ? moment(value).format(format) : value;
  }
  /**
  * Date and Time Formatting
  * @param value 
  * @param format 
  */
  transformWithHoursAndMinutes(value: any, format: string = "MM/DD/YYYY hh:mm A"): string {
    return moment(value).isValid() ? moment(value).format(format) : value;
  }

}
