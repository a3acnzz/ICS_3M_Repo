import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ShowHeaderService } from 'src/app/service/component/show-header.service';
import { NewRfeDocumentService } from 'src/app/service/component/new-rfe-document.service';
import { CorppsrfeService } from 'src/app/service/component/corppsrfe-service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { AppConstant } from 'src/app/shared/constant/app.constant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print-rfe-form',
  templateUrl: './print-rfe-form.component.html',
  styleUrls: ['./print-rfe-form.component.scss']
})
export class PrintRfeFormComponent implements OnInit {

  marqueeInformation: boolean = false;

  rfeForm: FormGroup;
  currentYear: string = moment(new Date()).format("YYYY");
  /** Tables
   * @author Rajkumar
   */
  workerHeader: any[];
  worker: any[];
  logsHeader: any[];
  logs: any[];
  accountHeader: any[];
  account: any[];
  approvalHeader: any[];
  approval: any[];
  informationHeader: any[];
  information: any[];
  attatchmentHeader: any[];
  attatchments: any[];
  pageReloaded: boolean = false;

  /** Temporary values 
   * 
  */
  currentRFEDocumentContent: string = '';

  /** Hiding
   * 
   */
  isProjectCoordinator: boolean = true;
  isInformationalCopy: boolean = true;
  isComments: boolean = true;
  isAttatchments: boolean = true;

  /** Values 
   * 
  */
  originDate: string;
  psReqNumber: string;
  rfeNumber: string;
  siteContactName: string;
  phoneNumber: string;
  personID: string;
  projectCoordinator: string;
  coordinatorPhoneNumber: string;
  coordinatorPersonID: string;
  orderFrom: string;
  supplierBase: string;
  startDate: string;
  completionDate: string;
  projectTitle: string;
  serviceDescription: string;
  comments: string;
  additionalExpenses: number = 0;
  additionalExpensesAsString: string = '0.00';
  fixedBidAmount: number = 0;
  fixedBidAsString: string = '0.00';
  approvalAmount: number = 0;

  /** If Reloaded
   * 
   */
  corpReqNum: string;
  paramsSub: any;
  busyLoading: Subscription;

  /**
   * Constructor for PrintRfeFormComponent
   * @param showHeaderFlagService 
   * @param fb 
   * @param data 
   * @param datepipe 
   * @param router 
   * @param route 
   * @param corppsrfeService 
   */
  constructor(public showHeaderFlagService: ShowHeaderService, private fb: FormBuilder, private data: NewRfeDocumentService, private route: ActivatedRoute, private corppsrfeService: CorppsrfeService, private _location: Location) {
    this.showHeaderFlagService.psHeaderFlagValue = false; //ng if --if true display
    this.showHeaderFlagService.headerFlagValue = false; //hidden --if true will  not display
    this.showHeaderFlagService.corpHeaderFlagValue = true;

    this.workerHeader = [
      { field: 'resourceTitle', header: 'Resource Title' },
      { field: 'estHours', header: 'Est. Hours' },
      { field: 'rate', header: 'Rate' },
    ];

    this.accountHeader = [
      { field: 'account', header: 'Account No. *' },
      { field: 'dept', header: 'CostCenter *' },
      { field: 'wbs', header: 'WBS' },
      { field: 'distribution', header: 'Distribution * %' },
      { field: 'accountFields', header: 'Other charts of account fields' },
    ];

    this.approvalHeader = [
      { field: 'approvalName', header: 'Approval Names' },
      { field: 'personId', header: 'Person Id' }
    ];

    this.informationHeader = [
      { field: 'infoName', header: 'Names' },
      { field: 'infoPersonId', header: 'Person Id' }
    ];

    this.logsHeader = [
      { field: 'logActionDate', header: 'Timestamp' },
      { field: 'logAction', header: 'Action' },
      { field: 'logDescConstruct', header: 'Description' },
      { field: 'userPinWithName', header: 'Last Updated By' }
    ];
    this.attatchmentHeader = [
      { field: 'fileName', header: 'Attachment Names' }
    ];

  }
  /**Calling the ngOnInit() 
    * 
    */
  ngOnInit() {

    if (AppConstant.newErfeForm) {
      this.marqueeInformation = AppConstant.newErfeForm;
    } else {
      this.marqueeInformation = false;
    }
    /** Form Model 
     * 
    */
    this.rfeForm = this.fb.group({
      bid: new FormControl({ value: '', disabled: true }),
    });
    this.corpReqNum = this.route.snapshot.params['corpPsReqNum'];
    /**
     * print data
     */
    this.data.currentRFEDocumentContent.subscribe(currentRFEDocumentContent => this.currentRFEDocumentContent = currentRFEDocumentContent);
    if (this.currentRFEDocumentContent) {
      AppConstant.printComponentLoad = true;
      this.pageReloaded = false;
      this.data.currentApprovalAmount.subscribe(ApprovalAmount => {
        if (ApprovalAmount) {
          this.approvalAmount = ApprovalAmount;
        } else {
          this.approvalAmount = 0;
        }
      });
      this.data.currentAttatchment.subscribe(currentAttatchment => {
        if (currentAttatchment) {
          if (currentAttatchment.length > 0) {
            this.attatchments = currentAttatchment;
            this.isAttatchments = true;
          } else {
            this.isAttatchments = false;
          }
        }
      });
      this.data.currentActivityLog.subscribe(currentActivtyLog => {
        if (currentActivtyLog) {
          if (currentActivtyLog.length > 0) {
            this.logs = currentActivtyLog;
          }
        } else {
          this.logs = [{
            logActionDate: "No Records Found",
            logAction: "No Records Found",
            logDescConstruct: "No Records Found",
            userPinWithName: "No Records Found",
          }];
        }
      });

      let values = JSON.parse(this.currentRFEDocumentContent);
      let startDateFormat;
      let latestStartDateFormat;
      if (values.startDate) {
        startDateFormat = new Date(values.startDate);
        latestStartDateFormat = this.transform(startDateFormat);
      } else {
        latestStartDateFormat = null;
      }
      let completionDateFormat;
      let latestCompletionDateFormat;
      if (values.completionDate) {
        completionDateFormat = new Date(values.completionDate);
        latestCompletionDateFormat = this.transform(completionDateFormat);
      } else {
        latestCompletionDateFormat = null;
      }

      /** Hiding of non-mandatory fields
       * 
       */
      if (values.projectCoordinator) {
        this.isProjectCoordinator = true;
      } else {
        this.isProjectCoordinator = false;
      }
      if (values.informationalCopy) {
        if ((values.informationalCopy.length == 1) && (values.informationalCopy[0].infoName == "")) {
          this.isInformationalCopy = false;
        } else if (values.informationalCopy.length > 1) {
          this.isInformationalCopy = true;
        }
      }
      if (values.comments) {
        this.isComments = true;
      } else {
        this.isComments = false;
      }

      /** Value Patching 
       * 
      */
      this.originDate = values.originDate;
      this.psReqNumber = values.psReqNumber;
      this.rfeNumber = values.rfeNum;
      this.siteContactName = values.siteContactName;
      this.phoneNumber = values.phoneNumber;
      this.personID = values.personID;
      this.projectCoordinator = values.projectCoordinator;
      this.coordinatorPhoneNumber = values.coordinatorPhoneNumber;
      this.coordinatorPersonID = values.coordinatorPersonID;
      this.orderFrom = values.orderFrom;
      this.supplierBase = values.supplierBase;
      this.startDate = latestStartDateFormat;
      this.completionDate = latestCompletionDateFormat;
      if (values.projectTitle) {
        this.projectTitle = values.projectTitle;
      } else {
        this.projectTitle = "No Records Found";
      }
      if (values.serviceDescription) {
        this.serviceDescription = values.serviceDescription;
      } else {
        this.serviceDescription = "No Records Found";
      }
      this.comments = values.comments;

      let bidValue = values.bid.toString();
      this.rfeForm.patchValue({
        bid: bidValue,
      });
      if (values.additionalExpenses) {
        this.additionalExpensesAsString = values.additionalExpenses;
      } else {
        this.additionalExpensesAsString = '0.00';
      }
      if (values.fixedBidAmount) {
        this.fixedBidAsString = values.fixedBidAmount;
      } else {
        this.fixedBidAsString = '0.00';
      }
      /** Tables
       * 
       */
      if (values.workerInfo) {
        if ((values.workerInfo.length == 1) && (values.workerInfo[0].resourceTitle == "") && (values.workerInfo[0].estHours == "") && (values.workerInfo[0].rate == "")) {
          this.worker = [{
            resourceTitle: "No Records Found",
            estHours: "No Records Found",
            rate: "No Records Found",
          }];
        } else {
          this.worker = values.workerInfo;
        }
      }
      if (values.acctInfo) {
        if ((values.acctInfo.length == 1) && (values.acctInfo[0].account == "") && (values.acctInfo[0].dept == "") && (values.acctInfo[0].wbs == "") && (values.acctInfo[0].distribution == "") && (values.acctInfo[0].accountFields == "")) {
          this.account = [{
            account: "No Records Found",
            dept: "No Records Found",
            wbs: "No Records Found",
            distribution: "No Records Found",
            accountFields: "No Records Found"
          }];
        } else {
          this.account = values.acctInfo;
        }
      }
      if (values.approval) {
        if ((values.approval.length == 1) && (values.approval[0].approvalName == "")) {
          this.approval = [{
            approvalName: "No Records Found",
            personId: "No Records Found"
          }];
        } else {
          this.approval = values.approval;
        }
      }
      this.information = values.informationalCopy;

      /**
       * BackUp data fill for the main form
       */
      this.data.changeRFEDocContent(this.currentRFEDocumentContent);
      this.data.changeApprovalAmount(this.approvalAmount);
      this.data.changeAttatchments(this.attatchments);
      this.data.changeRFEDocActivityLogContent(this.logs);
    }

    /** If Reloaded
     * 
     */
    else {
      this.busyLoading = this.corppsrfeService.getCorpsByPSReqNum(this.corpReqNum).subscribe((results: any) => {
        if (results) {
          let values = results;
          let startDateFormat;
          let latestStartDateFormat;
          if (values.startDate) {
            startDateFormat = new Date(values.startDate);
            latestStartDateFormat = this.transform(startDateFormat);
          } else {
            latestStartDateFormat = null;
          }
          let completionDateFormat;
          let latestCompletionDateFormat;
          if (values.completionDate) {
            completionDateFormat = new Date(values.completionDate);
            latestCompletionDateFormat = this.transform(completionDateFormat);
          } else {
            latestCompletionDateFormat = null;
          }

          /** Hiding of non-mandatory fields
           * 
           */
          if (values.projectCoordinator) {
            this.isProjectCoordinator = true;
          } else {
            this.isProjectCoordinator = false;
          }
          if (values.informationalCopyInformation) {
            if (values.informationalCopyInformation.length === 0) {
              this.isInformationalCopy = false;
            } else if (values.informationalCopyInformation.length > 0) {
              this.isInformationalCopy = true;
            }
          }
          if (values.comments) {
            this.isComments = true;
          } else {
            this.isComments = false;
          }
          if (values.corpAttachments) {
            if (values.corpAttachments.length > 0) {
              this.isAttatchments = true;
            } else {
              this.isAttatchments = false;
            }
          }
          /** Value Patching 
           * 
          */
          this.originDate = this.transform(values.createdDate),
            this.psReqNumber = values.corpPSReqNum;
          this.rfeNumber = values.rfeNum;

          let siteContact;
          if (values.siteContactPin != null) {
            siteContact = values.siteContactPin;
            this.siteContactName = siteContact.personFirstName + ' ' + siteContact.personMiddleName + ' ' + siteContact.personLastName;
            this.phoneNumber = siteContact.personPhoneNum;
            this.personID = siteContact.personId;
          }

          let projectCoordinator;
          if (values.projectCoordinator != null) {
            projectCoordinator = values.projectCoordinator;
            this.projectCoordinator = projectCoordinator.personFirstName + ' ' + projectCoordinator.personMiddleName + ' ' + projectCoordinator.personLastName;
            this.coordinatorPhoneNumber = projectCoordinator.personPhoneNum;
            this.coordinatorPersonID = projectCoordinator.personId;
          }
          let providers;
          if (values.providerMaster != null) {
            providers = values.providerMaster;
            this.orderFrom = providers.providerName;
            this.supplierBase = providers.providerId;
          }
          this.startDate = latestStartDateFormat;
          this.completionDate = latestCompletionDateFormat;
          let bidValue = values.bidMaster.bidId.toString();
          this.rfeForm.patchValue({
            bid: bidValue,
          });
          if (values.expenses) {
            this.additionalExpenses = values.expenses;
          } else {
            this.additionalExpenses = 0;
          }
          if (values.fixedBidAmount) {
            this.fixedBidAmount = values.fixedBidAmount;
          } else {
            this.fixedBidAmount = 0;
          }
          if (values.approvedAmount) {
            this.approvalAmount = values.approvedAmount;
          } else {
            this.approvalAmount = 0;
          }
          if (values.projectTitle) {
            this.projectTitle = values.projectTitle;
          } else {
            this.projectTitle = "No Records Found";
          }
          if (values.projectDesc) {
            this.serviceDescription = values.projectDesc;
          } else {
            this.serviceDescription = "No Records Found";
          }

          this.comments = values.comments;

          /** Tables
           * 
           */
          this.worker = values.workerInformation.map(value => {
            return {
              resourceTitle: value.resourceTitle,
              estHours: value.estimatedHours,
              rate: value.rate
            }
          });
          this.account = values.accountingInformation.map(value => {
            let acct;
            let department;
            let accountId = '';
            let departmentId = '';
            let distributionPercentage = null;
            if (value.accountMaster != null) {
              acct = value.accountMaster;
              accountId = acct.accountId;
            }

            if (value.departmentMaster != null) {
              department = value.departmentMaster;
              departmentId = department.departmentId;
            }
            if (value.distributionPer != 0) {
              distributionPercentage = value.distributionPer;
            }
            return {
              account: accountId,
              dept: departmentId,
              wbs: value.wbs,
              distribution: distributionPercentage,
              accountFields: value.accountFields
            }
          });
          if (values.approverInformation) {
            if (values.approverInformation.length > 0 && values.approverInformation[0].approverPin != null) {
              this.approval = values.approverInformation.map(value => {
                let acct;
                let acctPersonName = '';
                let acctPersonId = '';
                if (value.approverPin != null) {
                  acct = value.approverPin;
                  acctPersonName = acct.personFirstName + ' ' + acct.personMiddleName + ' ' + acct.personLastName;
                  acctPersonId = acct.personId;
                }
                return {
                  approvalName: acctPersonName,
                  personId: acctPersonId
                }
              });
            } else {
              this.approval = [{
                approvalName: "No Records Found",
                personId: "No Records Found"
              }];
            }
          }
          if (values.informationalCopyInformation) {
            if (values.informationalCopyInformation.length > 0 && values.informationalCopyInformation[0].informationPersonId != null) {
              this.information = values.informationalCopyInformation.map(value => {
                let infoDetails;
                let personName = '';
                let personId = '';
                if (value.informationPersonId != null) {
                  infoDetails = value.informationPersonId;
                  personName = infoDetails.personFirstName + ' ' + infoDetails.personMiddleName + ' ' + infoDetails.personLastName;
                  personId = infoDetails.personId;
                }
                return {
                  infoName: personName,
                  infoPersonId: personId
                }
              });
            } else {
              this.information = [{
                infoName: "No Records Found",
                infoPersonId: "No Records Found"
              }];
            }
          }
          if (values.corpAttachments) {
            this.attatchments = values.corpAttachments;
          }
          if (values.activityLogInformation) {
            if (values.activityLogInformation.length > 0) {
              this.logs = values.activityLogInformation.map(value => {
                return {
                  logActionDate: this.transformWithHoursAndMinutes(value.logActionDate) + ' Hrs',
                  logAction: value.logAction,
                  logDescConstruct: value.logDesc,
                  userPinWithName: value.logPersonPin.personFirstName + ' ' + value.logPersonPin.personMiddleName + ' ' + value.logPersonPin.personLastName
                }
              });
            } else {
              this.logs = [{
                logActionDate: "No Records Found",
                logAction: "No Records Found",
                logDescConstruct: "No Records Found",
                userPinWithName: "No Records Found",
              }];
            }
          }
        }
      });
      this.pageReloaded = true;
    }
  }
  goBack() {
    this._location.back();
  }

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
  transformWithHoursAndMinutes(value: any, format: string = "MM/DD/YYYY hh:mm"): string {
    return moment(value).isValid() ? moment(value).format(format) : value;
  }

} 
