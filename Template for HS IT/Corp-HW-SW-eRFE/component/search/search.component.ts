import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../../shared/app.constant';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      contact: new FormControl('', [Validators.required]),
      rfeNumber: new FormControl('', [Validators.required]),
      hwSwRequestNumber: new FormControl('', [Validators.required]),
      supplier: new FormControl('', [Validators.required]),
      projectTitle: new FormControl('', [Validators.required]),
      projectDescription: new FormControl('', [Validators.required]),
      costCenter: new FormControl('', [Validators.required]),
      miscellaneous: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      orderBy: new FormControl('origDate'),
      sortByType: new FormControl(1)
    })
  }

  searchCorpHwSwRecords() {

  }

  // Contact
  contactPopupWithUpdatedNames(userNameEntered: string) {
  }
  getDetailsByUserName(userNameEntered: string, calledBy: string) {
  }

  // Supplier
  supplierPopup(){
  }
  getDetailsBySupplierName(supplierNameEntered: string, calledBy: string) {
  }







  // Validation
  checkValid() {
  }

}
