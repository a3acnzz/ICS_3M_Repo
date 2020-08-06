import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NewRfeDocumentService } from 'src/app/service/component/new-rfe-document.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-eidpopup',
  templateUrl: './eidpopup.component.html',
  styleUrls: ['./eidpopup.component.scss']
})
export class EIDpopupComponent implements OnInit {
  @Output() eventClick = new EventEmitter();
  @Output() closeSiteContactNamePopup = new EventEmitter();
  @Output() closeOrderFromPopup = new EventEmitter();
  @Output() closeAccountNoPopup = new EventEmitter();
  @Output() closeCostCenterPopup = new EventEmitter();
  @Output() closePopup = new EventEmitter();

  @Input() commonFormDisplay: boolean = false;
  @Input() approvarPopup: boolean = false;
  @Input() orderFormDisplay: boolean = false;
  @Input() accFormDisplay: boolean = false;
  @Input() deptFormDisplay: boolean = false;
  @Input() approverFormDisplay: boolean = false;
  @Input() headers: any[];
  @Input() values: any[];
  @Input() filterValue: any[];
  first: any = 0;
  selectForm: FormGroup;
  orderForm: FormGroup;
  deptForm: FormGroup;
  accForm: FormGroup;
  approverForm: FormGroup;
  selected: any[] = null;
  busyLoading: Subscription;
  noRecordFoundInd = false;
  @ViewChild("lastNameRef", { static: false }) lastNameRef: ElementRef;
  @ViewChild("supplierNameRef", { static: false }) supplierNameRef: ElementRef;
  @ViewChild("accountRef", { static: false }) accountRef: ElementRef;
  @ViewChild("costCenterRef", { static: false }) costCenterRef: ElementRef;

  // Sorting
  multiSortMeta: any = null;

  /**
   *  Constructor for EIDpopupComponent
   * @param formBuilder 
   * @param rfeDocument 
   */
  constructor(private formBuilder: FormBuilder, private rfeDocument: NewRfeDocumentService) { }
  /**Calling the ngOnInit() 
    * 
    */
  ngOnInit() {
    this.selectForm = this.formBuilder.group({
      'lastName': new FormControl(''),
      'firstName': new FormControl(''),
      'pin': new FormControl(''),
      'userPin': new FormControl(''),
    })
    this.orderForm = this.formBuilder.group({
      'base': new FormControl(''),
      'name': new FormControl(''),
    })
    this.accForm = this.formBuilder.group({
      'acc': new FormControl(''),
      'desc': new FormControl(''),
    })
    this.deptForm = this.formBuilder.group({
      'cost': new FormControl(''),
      'costDesc': new FormControl(''),
    })
    this.approverForm = this.formBuilder.group({
      'approvalName': new FormControl(''),
      'personId': new FormControl(''),
    })

    /** Account number Popup 
  * 
  */
    if (this.accFormDisplay) {
      this.headers = [
        { field: 'accountId', header: 'Account No.' },
        { field: 'accountDesc', header: 'Account Description' }];
      let acc = '';
      let desc = '';
      this.busyLoading = this.rfeDocument.getaccountMaster(acc, desc).subscribe((results: any[]) => {
        if (results) {
          this.filterValue = results;

          if (results.length === 0)
            this.noRecordFoundInd = true
        }
        else {
          this.noRecordFoundInd = true;
        }
      })
    }
    /** Cost center popup
       * 
       */
    if (this.deptFormDisplay) {
      this.headers = [
        { field: 'departmentId', header: 'Cost Center No.' },
        { field: 'departmentDesc', header: 'Cost Center Name' }];
      let cost = ''
      let costDesc = ''
      this.busyLoading = this.rfeDocument.getdepartmentMaster(cost, costDesc).subscribe((results: any[]) => {
        if (results) {
          this.filterValue = results;

          if (results.length === 0)
            this.noRecordFoundInd = true
        }
        else {
          this.noRecordFoundInd = true;
        }
      })
    }
    /** Supplier popup 
      * 
      */
    if (this.orderFormDisplay) {
      this.headers = [
        { field: 'providerName', header: 'Supplier Name' },
        { field: 'providerId', header: 'Supplier Base' }];

      // By default sorting is for supplier name, base
      this.multiSortMeta = [];
      this.multiSortMeta.push({ field: 'providerName', order: 1 });
      this.multiSortMeta.push({ field: 'providerId', order: 1 });

      let base = "";
      let supplierName = "";
      this.busyLoading = this.rfeDocument.getProviderMaster(base, supplierName).subscribe((results: any[]) => {
        if (results) {
          this.filterValue = results;

          if (results.length === 0)
            this.noRecordFoundInd = true
        }
        else {
          this.noRecordFoundInd = true;
        }
      })
    }
    /** Common form popup
      * 
      */
    if (this.commonFormDisplay) {
      this.headers = [
        // { field: 'personName', header: 'Name' },
        { field: 'personLastName', header: 'Last Name' },
        { field: 'personFirstName', header: 'First Name' },
        { field: 'userPin', header: 'Pin' },
        { field: 'personId', header: 'Person Id' },
        { field: 'personPhoneNum', header: 'Phone Number' },
        { field: 'deptCode', header: 'Cost Center Code' },
        { field: 'deptName', header: 'Cost Center Name' }];

      // By default sorting is for last name, first name
      this.multiSortMeta = [];
      this.multiSortMeta.push({ field: 'personLastName', order: 1 });
      this.multiSortMeta.push({ field: 'personFirstName', order: 1 });

      if (this.approvarPopup) {
        let user = new User();
        this.busyLoading = this.rfeDocument.getGlobalUserForApprovar(user).subscribe((results: any[]) => {
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
            this.filterValue = results;

            if (results.length === 0)
              this.noRecordFoundInd = true
          }
          else {
            this.noRecordFoundInd = true;
          }
        });
      } else {
        let user = new User();
        this.busyLoading = this.rfeDocument.getglobalUser(user).subscribe((results: any[]) => {
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
            this.filterValue = results;

            if (results.length === 0)
              this.noRecordFoundInd = true
          }
          else {
            this.noRecordFoundInd = true;
          }
        });
      }
    }
  }
  /** Search on Account popup
   * 
   */
  searchAccount() {
    this.first = 0;
    let acc = this.accForm.get("acc").value.trim();
    let desc = this.accForm.get("desc").value.trim();
    this.busyLoading = this.rfeDocument.getaccountMaster(acc, desc).subscribe((results: any[]) => {

      if (results) {

        this.filterValue = results;
        // .filter(result => {
        //   return this.isEqual(result.accountId, this.accForm.get("acc").value) && this.isIncludes(result.accountDesc, this.accForm.get("desc").value);
        // });
        if (results.length === 0)
          this.noRecordFoundInd = true
        if (results.length === 1) {
          this.handleSingleValue(results[0]);
        }

      }
      else {
        this.noRecordFoundInd = true;
      }
    })
  }
  /** Search on cost center popup
    * 
    */
  searchCost() {
    this.first = 0;
    let cost = this.deptForm.get("cost").value;
    let costDesc = this.deptForm.get("costDesc").value;

    this.busyLoading = this.rfeDocument.getdepartmentMaster(cost, costDesc).subscribe((results: any[]) => {

      if (results) {

        this.filterValue = results;
        // .filter(result => {
        //   return this.isEqual(result.departmentId, this.deptForm.get("cost").value) && this.isIncludes(result.departmentDesc, this.deptForm.get("costDesc").value);
        // });
        if (results.length === 0)
          this.noRecordFoundInd = true
        if (results.length === 1) {
          this.handleSingleValue(results[0]);
        }
      }
      else {
        this.noRecordFoundInd = true;
      }
    })
  }
  /** Search on suppler popup
   * 
   */
  orderSearch() {
    this.first = 0;

    this.headers = [
      { field: 'providerName', header: 'Supplier Name' },
      { field: 'providerId', header: 'Supplier Base' }];

    // By default sorting is for supplier name, base
    this.multiSortMeta = [];
    this.multiSortMeta.push({ field: 'providerName', order: 1 });
    this.multiSortMeta.push({ field: 'providerId', order: 1 });

    let base = this.orderForm.get('base').value.trim();
    let supplierName = this.orderForm.get('name').value.trim();
    this.busyLoading = this.rfeDocument.getProviderMaster(base, supplierName).subscribe((results: any[]) => {
      if (results) {
        // if (this.orderForm.get('name').value.trim() && !this.orderForm.get('base').value.trim()) {
        //   this.multiSortMeta = [];
        //   this.multiSortMeta.push({ field: 'providerName', order: 1 });
        // } 
        if (!this.orderForm.get('name').value.trim() && this.orderForm.get('base').value.trim()) {
          this.multiSortMeta = [];
          this.multiSortMeta.push({ field: 'providerId', order: 1 });
          this.multiSortMeta.push({ field: 'providerName', order: 1 });
        }

        this.filterValue = results;

        // .filter(result => {
        //   return this.isEqual(result.providerId, this.orderForm.get('base').value) && this.isIncludes(result.providerName, this.orderForm.get('name').value);
        // });
        if (results.length === 0)
          this.noRecordFoundInd = true
        if (results.length === 1) {
          this.handleSingleValue(results[0]);
        }
      }
      else {
        this.noRecordFoundInd = true;
      }
    });

  }
  /** Search on common form popup
     * 
     */
  searchForm() {
    this.first = 0;

    this.headers = [
      { field: 'personLastName', header: 'Last Name' },
      { field: 'personFirstName', header: 'First Name' },
      { field: 'userPin', header: 'Pin' },
      { field: 'personId', header: 'Person Id' },
      { field: 'personPhoneNum', header: 'Phone Number' },
      { field: 'deptCode', header: 'Cost Center Code' },
      { field: 'deptName', header: 'Cost Center Name' }];

    // By default sorting is for last name, first name
    this.multiSortMeta = [];
    this.multiSortMeta.push({ field: 'personLastName', order: 1 });
    this.multiSortMeta.push({ field: 'personFirstName', order: 1 });

    let user = new User();
    if (this.approvarPopup) {
      user.personId = this.selectForm.get("pin").value.trim();
      user.personFirstName = this.selectForm.get("firstName").value.trim();
      user.personLastName = this.selectForm.get("lastName").value.trim();
      user.userPin = this.selectForm.get("userPin").value.trim();
      this.busyLoading = this.rfeDocument.getGlobalUserForApprovar(user).subscribe((results: any[]) => {
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

          if (!this.selectForm.get("lastName").value.trim() && this.selectForm.get("firstName").value.trim()) {
            this.multiSortMeta = [];
            this.multiSortMeta.push({ field: 'personFirstName', order: 1 });
            this.multiSortMeta.push({ field: 'personLastName', order: 1 });
          }

          this.filterValue = results;

          // .filter(result => {
          //   return this.isIncludes(result.personName, this.selectForm.get("firstName").value) && this.isIncludes(result.personName, this.selectForm.get("lastName").value) && this.isIncludes(result.userPin, this.selectForm.get("userPin").value) && this.isIncludes(result.personId, this.selectForm.get("pin").value);
          // });
          if (results.length === 0)
            this.noRecordFoundInd = true
          if (results.length === 1) {
            this.handleSingleValue(results[0]);
          }
        }
        else {
          this.noRecordFoundInd = true;
        }
      });
    }
    else {
      user.personId = this.selectForm.get("pin").value.trim();
      user.personFirstName = this.selectForm.get("firstName").value.trim();
      user.personLastName = this.selectForm.get("lastName").value.trim();
      user.userPin = this.selectForm.get("userPin").value.trim();
      this.busyLoading = this.rfeDocument.getglobalUser(user).subscribe((results: any[]) => {
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

          if (!this.selectForm.get("lastName").value.trim() && this.selectForm.get("firstName").value.trim()) {
            this.multiSortMeta = [];
            this.multiSortMeta.push({ field: 'personFirstName', order: 1 });
            this.multiSortMeta.push({ field: 'personLastName', order: 1 });
          }

          this.filterValue = results;

          // .filter(result => {
          //   return this.isIncludes(result.personName, this.selectForm.get("firstName").value) && this.isIncludes(result.personName, this.selectForm.get("lastName").value) && this.isIncludes(result.userPin, this.selectForm.get("userPin").value) && this.isIncludes(result.personId, this.selectForm.get("pin").value);
          // });
          if (results.length === 0)
            this.noRecordFoundInd = true
          if (results.length === 1) {
            this.handleSingleValue(results[0]);
          }
        }
        else {
          this.noRecordFoundInd = true;
        }
      });
    }
  }

  /** focus on #lastName input box
  * 
  */
  focusLastName() {
    setTimeout(() => this.lastNameRef.nativeElement.focus());
  }

  /** focus on #supplierNameRef input box
  * 
  */
  focusSupplierName() {
    setTimeout(() => this.supplierNameRef.nativeElement.focus());
  }

  /** focus on #accountRef input box
  * 
  */
  focusAccount() {
    setTimeout(() => this.accountRef.nativeElement.focus());
  }

  /** focus on #costCenterRef input box
    * 
    */
  focusCostCenter() {
    setTimeout(() => this.costCenterRef.nativeElement.focus());
  }

  /** autopopulate names on search input box
    * 
    */
  populateNames(lastName: string, firstName: string) {
    this.selectForm.controls['lastName'].setValue(lastName.trim());
    this.selectForm.controls['firstName'].setValue(firstName.trim());
    if (lastName.trim() && firstName.trim()) {
      this.searchForm();
    }
  }

  populateSupplierName(supplierName: string) {
    this.orderForm.controls['name'].setValue(supplierName.trim());
    if (supplierName.trim()) {
      this.orderSearch();
    }
  }

  populateApproverNames(lastName: string, firstName: string) {
    this.selectForm.controls['lastName'].setValue(lastName.trim());
    this.selectForm.controls['firstName'].setValue(firstName.trim());
    if (lastName.trim() && firstName.trim()) {
      this.searchForm();
    }
  }

  populateCostCenter(costCenter: number) {
    this.deptForm.controls["cost"].setValue(costCenter);
    this.searchCost();
  }
  /** reset form
    * 
    */
  resetForm() {
    this.first = 0;

    this.selected = null;
    this.selectForm.reset();
    this.accForm.reset();
    this.deptForm.reset();
    this.orderForm.reset();
    this.approverForm.reset();
    this.ngOnInit();

    if (this.commonFormDisplay) {
      setTimeout(() => this.lastNameRef.nativeElement.focus());
      this.multiSortMeta = [];
      this.multiSortMeta.push({ field: 'personLastName', order: 1 });
      this.multiSortMeta.push({ field: 'personFirstName', order: 1 });
    }
    if (this.orderFormDisplay) {
      setTimeout(() => this.supplierNameRef.nativeElement.focus());
      this.multiSortMeta = [];
      this.multiSortMeta.push({ field: 'providerName', order: 1 });
      this.multiSortMeta.push({ field: 'providerId', order: 1 });
    }
    if (this.accFormDisplay) {
      setTimeout(() => this.accountRef.nativeElement.focus());
    }
    if (this.deptFormDisplay) {
      setTimeout(() => this.costCenterRef.nativeElement.focus());
    }
  }
  /**onSubmit 
     * 
    */

  onSubmit() {
    this.eventClick.emit(this.selected);
  }

  onDblClick(rowData) {
    this.selected = rowData;
    this.eventClick.emit(this.selected);
  }
  handleSingleValue(rowData) {
    this.selected = rowData;
    this.eventClick.emit(this.selected);
    this.selected = null;
    this.resetForm();
  }
  /** Closing popup
       * 
       */
  close() {
    this.closePopup.emit();
    this.closeSiteContactNamePopup.emit();
    this.closeOrderFromPopup.emit();
    this.closeAccountNoPopup.emit();
    this.closeCostCenterPopup.emit();
  }

}