import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl, NgForm } from '@angular/forms';
import { ShowHeaderService } from '../../service/component/show-header.service';
import { debounceTime } from 'rxjs/operators';
import { AppConstant } from 'src/app/shared/constant/app.constant';
import { Router } from '@angular/router';
import { NewRfeDocumentService } from 'src/app/service/component/new-rfe-document.service';
import { CorppsrfeService } from '../../service/component/corppsrfe-service';
import { CorpsRFE } from '../../model/CorpsRFE';
import { BidMaster } from '../../model/BidMaster';
import { ProviderMaster } from '../../model/ProviderMaster';
import { User } from '../../model/User';
import { StatusMaster } from '../../model/StatusMaster';
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { accountIdClass, departmentIdClass } from 'src/app/model/CorpPsTableInformation';
import { RenewalService } from 'src/app/service/component/renewal.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivityLog } from 'src/app/model/ActivityLog';
import { ApproverMasterDetail } from 'src/app/model/ApproverMasterDetail';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { PreviousRouteServiceService } from 'src/app/service/component/previous-route-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-new-rfe-document',
    templateUrl: './new-rfe-document.component.html',
    styleUrls: ['./new-rfe-document.component.scss']
})
export class NewRFEDocumentComponent implements OnInit, OnDestroy {

    newRFEDocument: FormGroup;

    /** Validation 
      * 
     */
    siteContactNameValid: boolean = false;
    siteContactMsg: string = '';
    orderFromValid: boolean = false;
    orderFromMsg: string = '';
    startDateValid: boolean = false;
    startDateMsg: string = '';
    completionDateValid: boolean = false;
    completionDateMsg: string = '';
    workerRowsToAddValid: boolean = false;
    workerRowsToAddMsg: string = '';
    approvalRowsToAddValid: boolean = false;
    approvalRowsToAddMsg: string = '';
    projectTitleValid: boolean = false;
    projectTitleMsg: string = '';
    descAllServeValid: boolean = false;
    descAllServeMsg: string = '';

    // estKeyPress: boolean = true;
    // rateKeyPress: boolean = true;
    // addexpKeyPress: boolean = true;
    // fixedKeyPress: boolean = true;

    distributionValid: boolean = false;
    distributionPMsg: number;
    distributionMsg: string = '';
    distributionSum: number = 0;
    distributionKeyPress: boolean = true;
    approvalValid: boolean = false;
    approvalMsg: string = '';
    percentValid: boolean = false;
    percentMsg: string = '';
    infoValid: boolean = false;
    infoMsg: string = '';
    fixedBidMsg: string = '';
    fixedBidValid: boolean = false;
    isRetract: boolean = true;
    resourceMsg: string = AppConstant.resourceTitleRequiredMessage;;
    estMsg: string = AppConstant.estHoursRequiredMessage;
    rateMsg: string = AppConstant.rateRequiredMessage;
    selectedApprover: string;
    accountNoMsg: string = AppConstant.accountNoRequiredMessage;
    accountNoValid = false;
    accountNoPMsg: number;
    costCenterMsg: string = AppConstant.costCenterRequiredMessage;
    costCenterValid = false;
    costCenterPMsg: number;
    requiredFullPop: boolean = false;
    approvalAmountZeroMsg: string = '';
    approvalAmountZeroValid: boolean = false;
    savedAsDraftRequiredPopup: boolean = false;
    retractDisplay: boolean = false;
    retractComments: string;
    requestorDetails: string = "";
    requestorData: string;
    isRequestComment: boolean = true;

    // Enhancement
    @ViewChild('siteContactName', { static: false }) siteContactName: any;
    userLastName: string = '';
    userFirstName: string = '';
    userSupplierName: string = '';
    siteContactNameNotAvailable: boolean = false;
    siteContactNameNotAvailableMsg: string = '';
    projectCoordinatorNameNotAvailable: boolean = false;
    projectCoordinatorNameNotAvailableMsg: string = '';
    supplierNameNotAvailable: boolean = false;
    supplierNameNotAvailableMsg: string = '';
    approverNameNotAvailable: boolean = false;
    approverNameNotAvailableMsg: string = '';
    inforNameNotAvailable: boolean = false;
    inforNameNotAvailableMsg: string = '';
    infoMsgIndex: number;
    confirmPrintPopup: boolean = false;

    /** Same Name insertion validation
     * 
    */
    siteContactNameCheck: boolean = false;
    siteContactNameCheckMsg: string = '';
    coordinatorNameCheck: boolean = false;
    coordinatorNameCheckMsg: string = '';
    approvalNameCheck: boolean = false;
    approvalNameCheckMsg: string;
    approvalPMsg: number;
    allNameCheckForSubmit: boolean = false;

    /**  For approver Limit Check	
         * 
        */
    approverId: string;
    individualApproverLimit: number;
    greatestApproverLimit: number;
    approverLimitValid: boolean = false;
    activityLogConstruct: any[];

    /** Renewal Number validation
      * 
      */
    rfeNumberForRenewal: any;
    rfeNumberExist: boolean = false;
    /** For worker info caluculation
        *
        */
    multipliedValue: number = 0;
    approvalAmount: number = 0;
    currentEstValue: number = 0;
    currentRateValue: number = 0;
    currentAdditionalExpensesValue: number = 0;
    currentfixedBidAmountValue: number = 0;

    display: boolean;
    readMode: false;
    readonly = false;
    uploadedFiles: any[] = [];
    attachments: any[] = [];
    renewalAttachments: any[] = [];
    approveComments: string;
    rejectComments: string;
    contactNameList: any[];
    logs: any[];
    cols: any[];
    nameHeaders: any[];
    nameValues: any[];
    coordinatorsHeaders: any[];
    coordinatorsValues: any[];
    orderHeaders: any[];
    orderValues: any[];
    accountHeaders: any[];
    accountValues: any[];
    informationHeaders: any[];
    informationValues: any[];
    approvalHeaders: any[];
    approvalValues: any[];
    deptHeaders: any[];
    deptValues: any[];
    siteNameDisplay: boolean = false;
    ptCoordinaterDisplay: boolean = false;
    orderDisplay: boolean = false;
    accountDisplay: boolean = false;
    informationalDisplay: boolean = false;
    approvalNameDisplay: boolean = false;
    deptDisplay: boolean = false;
    index: number;
    corpReqNum: string;
    busyLoading: Subscription;
    noRecordFoundInd = false;
    rfeNumber: string;
    approveDisplay: boolean = false;
    rejectDisplay: boolean = false;
    renewalDisplay: boolean = false;
    userRole: string;
    userId: string;
    user: string;
    isDisable: boolean = false;
    isSave: boolean = true;
    isComments: boolean = false;
    isClosable: boolean = true;
    isSubmit: boolean = true;
    supplierInformationId: number = 0;
    busySave: Subscription;
    alerts = [];
    corpResults: any;
    input: string;
    action: string;
    docId: number;
    isApprover: boolean = false;
    isRenewal: boolean = false;
    isEditable: boolean = false;
    commentsDisplay: boolean = false;
    formData: CorpsRFE;
    approverComments: any;
    pendingApprovers: any;
    pendingApproverAsString: string = '';
    isAdmin: boolean = false;
    formStatus: string;
    navigationSubscription: any;
    paramsSub: any;
    reqNum: string;
    oldCorpReqNum: string;
    renewalData: any;
    isPrintable: boolean = true;
    rfeNoLabel: string = 'RFE No.';
    submitted: boolean;
    busy: Subscription;
    isRenewalForm: boolean;
    minDate: Date;
    maxDate: Date;
    currentApproverIndicator: boolean = false;
    currentApproverIndex: number = -1;
    currentRFEDocumentContentFromPrint: string = '';
    specificErrorMessagesContainer: any[] = [];
    toastSuccess: string;
    toastError: string;
    formCorpReqNumber: string = "0";

    accountNoDataList: any[] = [];
    costCenterDataList: any[] = [];
    validateAccountingTable: { [key: string]: any };
    accountNoInValid = false;
    accountNoInValidPMsg: number;
    costCenterInValid = false;
    costCenterInValidPMsg: number;

    // Admin edit approved form
    isEditSaveApprovedForm: boolean = false;
    adminEditInfoCopyLength: number;
    adminEditUpdateAddRowButtonShow: boolean = false;

    // For Mobile	
    deviceInfo = null;
    isMobile: boolean = false;

    // Not Used
    isVisible: boolean = false;
    @ViewChild('uploader', { static: false }) uploadInput: any;
    isUser: boolean;

    /** Dynamic Table
     * 
     */
    get workerInfo(): FormArray {
        return this.newRFEDocument.get('workerInfo') as FormArray;
    }

    get acctInfo(): FormArray {
        return this.newRFEDocument.get('acctInfo') as FormArray;
    }

    get approval(): FormArray {
        return this.newRFEDocument.get('approval') as FormArray;
    }

    get informationalCopy(): FormArray {
        return this.newRFEDocument.get('informationalCopy') as FormArray;
    }

    /**
     * Constructor for NewRFEDocumentComponent
     * @param fb 
     * @param showHeaderFlagService 
     * @param router 
     * @param datum 
     * @param corppsrfeService 
     * @param datepipe 
     * @param route 
     * @param renewalService 
     * @param cookieService 
     */
    constructor(private deviceService: DeviceDetectorService,
        private fb: FormBuilder,
        public showHeaderFlagService: ShowHeaderService,
        private router: Router,
        private datum: NewRfeDocumentService,
        private corppsrfeService: CorppsrfeService, private datepipe: DatePipe,
        private route: ActivatedRoute,
        private renewalService: RenewalService,
        private cookieService: CookieService,
        private toastr: ToastrService,
        private previousRouteService: PreviousRouteServiceService) {
        this.showHeaderFlagService.psHeaderFlagValue = false;
        this.showHeaderFlagService.headerFlagValue = false;
        this.showHeaderFlagService.corpHeaderFlagValue = true;

        this.isMobile = false;
        this.isMobile = this.deviceService.isMobile();
        this.deviceInfo = this.deviceService.getDeviceInfo();
    }
    /**Calling the ngOnDestroy() 
      * 
      */
    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
        this.paramsSub.unsubscribe();
    }
    /**Calling the ngOnInit() 
      * 
      */
    async ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        }
        this.isDisable = false;
        this.isSave = true;
        this.isComments = false;
        this.isClosable = true;
        this.isApprover = false;
        this.isSubmit = true;
        this.isRetract = true;
        this.isEditable = false;
        this.isPrintable = true;
        this.isRenewalForm = false;
        this.userId = this.cookieService.get(AppConstant.userId);
        this.userRole = this.cookieService.get(AppConstant.userRole);


        if (this.userRole === "Admin") {
            this.isAdmin = true;

        }
        this.corpReqNum = this.route.snapshot.params['id'];
        this.action = this.route.snapshot.params['action'];
        this.cols = [
            { field: 'logActionDate', header: 'Timestamp' },
            { field: 'logAction', header: 'Action' },
            { field: 'logDescConstruct', header: 'Description' },
            { field: 'userPinWithName', header: 'Last Updated By' },
        ];
        /** Form Model: 
         * 
        */
        this.newRFEDocument = this.fb.group({
            originDate: this.transform(new Date()),
            psReqNumber: [''],
            rfeNum: [''],
            siteContactName: new FormControl('', [Validators.required, Validators.minLength(2)]),
            phoneNumber: [''],
            personID: [''],
            projectCoordinator: [''],
            coordinatorPhoneNumber: [''],
            coordinatorPersonID: [''],
            orderFrom: ['', [Validators.required, Validators.minLength(2)]],
            supplierBase: [''],
            startDate: [new Date(), [Validators.required]],
            completionDate: ['', [Validators.required]],
            bid: ['1'],
            projectTitle: ['', [Validators.required, Validators.minLength(2)]],
            serviceDescription: ['', [Validators.required, Validators.minLength(3)]],
            additionalExpenses: [''],
            fixedBidAmount: [''],

            workerNumOfRows: [''],
            acctNumOfRows: [''],
            approvalNumOfRows: [''],
            infoCopyNumOfRows: [''],

            workerInfo: this.fb.array([this.buildRow()]),
            acctInfo: this.fb.array([this.buildAcctRowIntialize()]),
            approval: this.fb.array([this.buildApprovalRow()]),
            informationalCopy: this.fb.array([this.buildInfoRow()]),
            comments: [''],
        });


        this.paramsSub = this.route.params.subscribe(params => {

            this.input = params['input'];
            this.action = params['action'];
            if (this.action) {
                this.action = 'view';
            }
            this.reqNum = params['id'];

            if (this.input === "corpReqNum") {
                this.corpReqNum = this.reqNum;

                if (this.action === "view") {
                    this.isDisable = true;
                    this.newRFEDocument.disable();
                }
                else
                    this.isDisable = false;
                if (this.corpReqNum != undefined && this.corpReqNum != '0') {
                    this.busyLoading = this.corppsrfeService.getCorpsByPSReqNum(this.corpReqNum).subscribe((results: any) => {
                        if (results) {
                            this.corpResults = results;
                            this.docId = results.docId;
                            this.setValues(this.corpResults);
                        }
                        else {
                            this.noRecordFoundInd = true;
                            this.router.navigate(['dataNotFound']);
                        }
                    })
                }
            } else {
                setTimeout(() => this.siteContactName.nativeElement.focus());
                this.formStatus = "NEW";
                this.logs = [{
                    logActionDate: "No Records Found",
                    logAction: "No Records Found",
                    logDescConstruct: "No Records Found",
                    userPinWithName: "No Records Found",
                }];
            }


            if (this.input === "renewal") {
                this.rfeNumber = this.reqNum;
                this.action = params['action'];
                this.oldCorpReqNum = this.action;
                this.isDisable = true;
                this.isSave = false;
                this.isRenewal = true;
                this.formStatus = "Renewal For " + this.rfeNumber;
                this.rfeNoLabel = "Renewal For RFE No.";
                if (this.rfeNumber != undefined && this.rfeNumber != '0') {
                    this.busyLoading = this.corppsrfeService.getCorpPsRfeNum(this.userId).subscribe((corpReqNum: any) => {
                        this.corpReqNum = corpReqNum.psIdentity + corpReqNum.reqNum;
                        this.busyLoading = this.renewalService.getRenewForm(+this.rfeNumber).subscribe((renewal) => {
                            if (this.oldCorpReqNum != '0') {
                                this.busyLoading = this.corppsrfeService.getCorpsByPSReqNum(this.oldCorpReqNum).subscribe((corpsData: any) => {

                                    this.setRenewalValues(this.rfeNumber, this.oldCorpReqNum, corpsData, renewal, this.corpReqNum);

                                })
                            }
                            else {
                                this.setRenewalValues(this.rfeNumber, this.oldCorpReqNum, new CorpsRFE(), renewal, this.corpReqNum);
                            }
                        })
                    });
                }
            }
        })


        /** PS-Req Number
        * 
        */
        if (this.action === undefined && this.input === undefined) {
            let corpPsReqData;
            corpPsReqData = await this.corppsrfeService.getCorpPsRfeNum(this.userId).toPromise();
            if (corpPsReqData) {
                this.corpReqNum = corpPsReqData.psIdentity + corpPsReqData.reqNum;
            }
            this.newRFEDocument.get('psReqNumber').setValue(this.corpReqNum);
        }
        /** Validations on change detection on the form 
        * 
       */
        const siteContactControl = this.newRFEDocument.get('siteContactName');
        siteContactControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.setSiteContactValidation(siteContactControl)
        );
        const projectCoordinatorControl = this.newRFEDocument.get('projectCoordinator');
        projectCoordinatorControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.setProjectCoordinatorValidation(projectCoordinatorControl)
        );
        const orderFromControl = this.newRFEDocument.get('orderFrom');
        orderFromControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.setOrderFromValidation(orderFromControl)
        );
        const startDateControl = this.newRFEDocument.get('startDate');
        startDateControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.startDateValidation(startDateControl)
        );
        const completionDateControl = this.newRFEDocument.get('completionDate');
        completionDateControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.completionDateValidation(completionDateControl)
        );
        const typeOfBidControl = this.newRFEDocument.get('bid');
        this.setEstAndRateValidation(typeOfBidControl);
        typeOfBidControl.valueChanges.subscribe(
            value => this.setEstAndRateValidation(typeOfBidControl)
        );
        const fixedBidControl = this.newRFEDocument.get('fixedBidAmount');
        fixedBidControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.fixedBidValidation(fixedBidControl)
        );
        const projectTitleControl = this.newRFEDocument.get('projectTitle');
        projectTitleControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.setprojectTitleValidation(projectTitleControl)
        );
        const approvalControl = this.newRFEDocument.get('approval');
        approvalControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.setApprovalValidation(approvalControl)
        );
        const informationalCopyControl = this.newRFEDocument.get('informationalCopy');
        informationalCopyControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.informationalCopyValidation(informationalCopyControl)
        );
        const descAllServeControl = this.newRFEDocument.get('serviceDescription');
        descAllServeControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.setdescAllServeValidation(descAllServeControl)
        );
        const workerInfoControl = this.newRFEDocument.get('workerInfo');
        const additionalExpensesControl = this.newRFEDocument.get('additionalExpenses');
        const fixedBidAmountControl = this.newRFEDocument.get('fixedBidAmount');
        workerInfoControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.calculateApprovalAmount(workerInfoControl, additionalExpensesControl, fixedBidAmountControl)
        );
        additionalExpensesControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.calculateApprovalAmount(workerInfoControl, additionalExpensesControl, fixedBidAmountControl)
        );
        fixedBidAmountControl.valueChanges.pipe(
            debounceTime(0)
        ).subscribe(
            value => this.calculateApprovalAmount(workerInfoControl, additionalExpensesControl, fixedBidAmountControl)
        );
        this.setMaxMinDate();
        /**
       * If navigated back from print component
       */
        if (this.formStatus === 'NEW') {
            AppConstant.newErfeForm = true;
        } else {
            AppConstant.newErfeForm = false;
        }
        if (this.action === 'view' || this.input === 'renewal') {
            this.datum.changeRFEDocContent(null);
            this.datum.changeApprovalAmount(0);
            this.datum.changeAttatchments(null);
            this.datum.changeRFEDocActivityLogContent(null);
            this.datum.changeStatus(null);

        }
        let previousRoute: boolean = false;
        if (this.previousRouteService.getPreviousUrl()) {
            previousRoute = this.previousRouteService.getPreviousUrl().split("/").includes('print-rfe-form');
        }
        this.datum.currentRFEDocumentContent.subscribe(currentRFEDocumentContent => this.currentRFEDocumentContentFromPrint = currentRFEDocumentContent);
        if (this.currentRFEDocumentContentFromPrint && AppConstant.printComponentLoad && this.formStatus === 'NEW' && previousRoute) {
            this.datum.currentStatus.subscribe(status => {
                if (status) {
                    this.formStatus = status;
                }
            })

            this.datum.currentApprovalAmount.subscribe(ApprovalAmount => {
                if (ApprovalAmount) {
                    this.approvalAmount = ApprovalAmount;
                }
            });
            this.datum.currentAttatchment.subscribe(currentAttatchment => {
                if (currentAttatchment) {
                    if (currentAttatchment.length > 0) {
                        this.attachments = currentAttatchment;
                    }
                }
            });
            this.datum.currentActivityLog.subscribe(currentActivtyLog => {
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

            let values = JSON.parse(this.currentRFEDocumentContentFromPrint);
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

            /**
             * Value Patching 
             */
            this.addWorkerTableForPatching(values.workerInfo.length - 1);
            this.addAcctTableForPatching(values.acctInfo.length - 1);
            this.addApprovalTableForPatching(values.approval.length - 1);
            this.addInfoTableForPatching(values.informationalCopy.length - 1);
            this.newRFEDocument.patchValue({
                originDate: values.originDate,
                psReqNumber: values.psReqNumber,
                rfeNum: values.rfeNum,
                siteContactName: values.siteContactName,
                phoneNumber: values.phoneNumber,
                personID: values.personID,
                projectCoordinator: values.projectCoordinator,
                coordinatorPhoneNumber: values.coordinatorPhoneNumber,
                coordinatorPersonID: values.coordinatorPersonID,
                orderFrom: values.orderFrom,
                supplierBase: values.supplierBase,
                startDate: latestStartDateFormat,
                completionDate: latestCompletionDateFormat,
                bid: values.bid,
                projectTitle: values.projectTitle,
                serviceDescription: values.serviceDescription,
                additionalExpenses: values.additionalExpenses,
                fixedBidAmount: values.fixedBidAmount,

                workerInfo: values.workerInfo,
                acctInfo: values.acctInfo,
                approval: values.approval,
                informationalCopy: values.informationalCopy,
                comments: values.comments,
            });
            AppConstant.printComponentLoad = false;
            this.datum.changeRFEDocContent(null);
            this.datum.changeApprovalAmount(0);
            this.datum.changeAttatchments(null);
            this.datum.changeRFEDocActivityLogContent(null);
        }
        this.rejectComments = "";
        this.approveComments = "";
        this.retractComments = "";

        this.accountNoDataList = [];
        this.costCenterDataList = [];
        this.datum.getaccountMaster('', '').subscribe({
            next: (results: any[]) => {
                if (results) {
                    results.forEach(element => {
                        this.accountNoDataList.push(element.accountId);
                    });
                    if (results.length === 0) {
                        this.noRecordFoundInd = true;
                    }
                }
                else {
                    this.noRecordFoundInd = true;
                }
            },
            error: err => console.log(err)
        });
        this.datum.getdepartmentMaster('', '').subscribe({
            next: (results: any[]) => {
                if (results) {
                    results.forEach(element => {
                        this.costCenterDataList.push(element.departmentId);
                    });
                    if (results.length === 0) {
                        this.noRecordFoundInd = true;
                    }
                }
                else {
                    this.noRecordFoundInd = true;
                }
            },
            error: err => console.log(err)
        });

    }


    /**
     * Set values to the form on renewal 
     * @param rfeNum 
     * @param oldCorpReqNum 
     * @param corpsData 
     * @param renewal 
     * @param corpPsReqData 
     * @param users 
     */
    setRenewalValues(rfeNum, oldCorpReqNum, corpsData, renewal, corpPsReqData) {
        this.newRFEDocument.reset();
        this.uploadedFiles = [];
        if (this.uploadInput)
            this.uploadInput.clear();
        this.isRenewalForm = true;
        this.isRenewal = true;
        this.isEditable = true;
        this.isSave = true;
        this.rfeNumber = rfeNum;
        this.oldCorpReqNum = oldCorpReqNum;
        this.corpResults = corpsData;
        this.renewalData = renewal;
        this.corpReqNum = corpPsReqData;
        let approverInfo;

        if (this.isDisable) {
            this.newRFEDocument.disable();
        }
        if (this.corpResults)
            approverInfo = this.corpResults.approverInformation;
        let infoCopy;
        let siteContactAllInfo = this.renewalData.infoDetails;
        if (siteContactAllInfo.length > 0) {
            if (siteContactAllInfo[0].siteCntc != null && siteContactAllInfo[0].siteCntc != undefined) {
                this.busyLoading = this.datum.getglobalUserById((siteContactAllInfo[0].siteCntc).trim()).subscribe((result: User) => {
                    let sitecontactDetails = result;
                    if (sitecontactDetails.personId != null && sitecontactDetails.personId != undefined) {
                        this.newRFEDocument.patchValue({
                            siteContactName: sitecontactDetails.personFirstName + ' ' + sitecontactDetails.personMiddleName + ' ' + sitecontactDetails.personLastName,
                            phoneNumber: sitecontactDetails.personPhoneNum,
                            personID: sitecontactDetails.personId,
                        });
                    }
                })
            } else {
                if (this.corpResults)
                    if (this.corpResults.siteContactPin) {
                        this.newRFEDocument.patchValue({
                            siteContactName: this.corpResults.siteContactPin.personFirstName + ' ' + this.corpResults.siteContactPin.personMiddleName + ' ' + this.corpResults.siteContactPin.personLastName,
                            phoneNumber: this.corpResults.siteContactPin.personPhoneNum,
                            personID: this.corpResults.siteContactPin.personId,
                        });
                    }
            }
            if (siteContactAllInfo[0].projCord != null && siteContactAllInfo[0].projCord != undefined) {
                this.busyLoading = this.datum.getglobalUserById((siteContactAllInfo[0].projCord).trim()).subscribe((result: User) => {
                    let projectCoordinators = result;
                    if (projectCoordinators) {
                        if (projectCoordinators != undefined && projectCoordinators != null) {
                            this.newRFEDocument.patchValue({
                                projectCoordinator: projectCoordinators.personFirstName + ' ' + projectCoordinators.personMiddleName + ' ' + projectCoordinators.personLastName,
                                coordinatorPhoneNumber: projectCoordinators.personPhoneNum,
                                coordinatorPersonID: projectCoordinators.personId,
                            })
                        }
                    }
                })
            } else {
                if (this.corpResults)
                    if (this.corpResults.projectCoordinator) {
                        this.newRFEDocument.patchValue({
                            projectCoordinator: this.corpResults.projectCoordinator.personFirstName + ' ' + this.corpResults.projectCoordinator.personMiddleName + ' ' + this.corpResults.projectCoordinator.personLastName,
                            coordinatorPhoneNumber: this.corpResults.projectCoordinator.personPhoneNum,
                            coordinatorPersonID: this.corpResults.projectCoordinator.personId,
                        })
                    }
            }
        }
        let infoId = siteContactAllInfo.map(item => {
            if (item.infoCopy == null)
                return null
            else
                return item.infoCopy.trim()

        })

        this.busyLoading = this.datum.getglobalUsersByMulIds(infoId).subscribe((results: User[]) => {
            infoCopy = results.map(value => {
                return {
                    personName: value.personFirstName + ' ' + value.personMiddleName + ' ' + value.personLastName,
                    personId: value.personId
                }

            });

            if (infoCopy.length === 0) {
                if (this.corpResults) {
                    if (this.corpResults.informationalCopyInformation.length > 0) {
                        infoCopy = this.corpResults.informationalCopyInformation.map((value) => {
                            return {
                                personName: value.informationPersonId.personFirstName + ' ' + value.informationPersonId.personMiddleName + ' ' + value.informationPersonId.personLastName,
                                personId: value.informationPersonId.personId
                            }
                        });
                    }
                }

            }
            if (infoCopy) {
                this.addInfoTableForPatching(infoCopy.length - 1);
                let ctrl = <FormArray>this.newRFEDocument.controls['informationalCopy'];
                let i = 0;
                if (infoCopy.length > 0 && infoCopy != null) {
                    ctrl.controls.forEach((field) => {
                        let infoDetails = infoCopy[i];
                        field.get('infoName').setValue(infoDetails.personName);
                        field.get('infoPersonId').setValue(infoDetails.personId);
                        i++;
                    });
                }
            }
            if (this.isDisable) {
                this.newRFEDocument.disable();
            }
        })

        if (this.renewalData != null) {
            this.isRenewal = true;
            this.isSubmit = true;
            let values = this.renewalData;
            let bidInfo;
            let workerInfo = values.workerDetails;
            let accInfo = values.accountDetails;

            if (values.fixedM === '1') {
                bidInfo = '1'
            }
            if (values.hourlyM === '1') {
                bidInfo = '1'
            }

            let startDate = null;
            if (this.corpResults) {
                if (this.corpResults.completionDate != null) {
                    startDate = new Date(this.corpResults.completionDate);
                }
            }
            // 16/04/2020
            let additionalExpenses = null;
            if (values.additionalExpM != null) {
                additionalExpenses = values.additionalExpM.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
            } else {
                additionalExpenses = (0).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
            }
            this.newRFEDocument.patchValue({
                originDate: this.transform(new Date()),
                psReqNumber: this.corpReqNum,
                rfeNum: this.rfeNumber,
                orderFrom: values.supplierNameM,
                supplierBase: values.supplierNumberM,
                bid: bidInfo,
                startDate: startDate,
                additionalExpenses: additionalExpenses,
                projectTitle: values.projectTitleM,
                serviceDescription: values.descriptionM,
            })
            this.approvalAmount = values.approvalAmtM;
            if (workerInfo) {
                this.addWorkerTableForPatching(workerInfo.length - 1);
                let ctrl = <FormArray>this.newRFEDocument.controls['workerInfo'];
                let i = 0;
                if (workerInfo.length > 0) {
                    ctrl.controls.forEach((field) => {
                        // 16/04/2020
                        let hoursLocale = null;
                        if (workerInfo[i].hours != null) {
                            hoursLocale = workerInfo[i].hours.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
                        } else {
                            hoursLocale = (0).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
                        }
                        let amtLocale = null;
                        if (workerInfo[i].amt != null) {
                            amtLocale = workerInfo[i].amt.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
                        } else {
                            amtLocale = (0).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
                        }
                        field.get('resourceTitle').setValue(workerInfo[i].renewalWrkId);
                        field.get('estHours').setValue(hoursLocale);
                        field.get('rate').setValue(amtLocale);
                        i++;
                    });
                }
            }
            if (accInfo) {
                this.addAcctTableForPatching(accInfo.length - 1);
                let ctrl = <FormArray>this.newRFEDocument.controls['acctInfo'];
                let i = 0;
                if (accInfo.length > 0) {
                    ctrl.controls.forEach((field) => {
                        let distributionLocale = null;
                        if (accInfo[i].distPer != null) {
                            distributionLocale = accInfo[i].distPer.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 });
                        } else {
                            distributionLocale = (0).toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 });
                        }
                        field.get('account').setValue(accInfo[i].accountId)
                        field.get('dept').setValue(accInfo[i].deptId);
                        field.get('wbs').setValue(accInfo[i].wbs);
                        field.get('distribution').setValue(distributionLocale);
                        field.get('accountFields').setValue(accInfo[i].otherDesc);
                        i++;
                    });
                }
            }
            if (approverInfo) {
                this.addApprovalTableForPatching(approverInfo.length - 1);
                let ctrl = <FormArray>this.newRFEDocument.controls['approval'];
                let i = 0;
                if (approverInfo.length > 0) {
                    ctrl.controls.forEach((field) => {
                        let acct;
                        if (approverInfo[i].approverPin != null) {
                            acct = approverInfo[i].approverPin;
                        }
                        field.get('corpApproverId').setValue(approverInfo[i].corpApproverId);
                        field.get('approvalName').setValue(acct.personFirstName + ' ' + acct.personMiddleName + ' ' + acct.personLastName);
                        field.get('personId').setValue(acct.personId);
                        i++;
                    });
                }
            }

            if (this.corpResults)
                this.renewalAttachments = this.corpResults.corpAttachments;
            else
                this.renewalAttachments = [];

            if (this.isDisable) {
                this.newRFEDocument.disable();
            }
        }
        else
            this.noRecordFoundInd = true;

        this.setMaxMinDate();
        this.validateAccountingTable = null;
    }


    /**
     * Set values to the form from database 
     * @param currentNewRFEDocumentContent 
     */
    setValues(currentNewRFEDocumentContent) {
        if (currentNewRFEDocumentContent !== null) {
            this.newRFEDocument.reset();
            this.uploadedFiles = [];
            if (this.uploadInput)
                this.uploadInput.clear();
            let values = currentNewRFEDocumentContent;
            this.isRenewal = true;
            this.formCorpReqNumber = values.corpPSReqNum;

            this.formData = values;
            let siteContact;
            let siteContactName = '';
            let phoneNumber = '';
            let siteContactpersonID = '';
            if (values.siteContactPin != null) {
                siteContact = values.siteContactPin;
                siteContactName = siteContact.personFirstName + ' ' + siteContact.personMiddleName + ' ' + siteContact.personLastName;
                phoneNumber = siteContact.personPhoneNum;
                siteContactpersonID = siteContact.personId;
            }
            let providers;
            let orderFrom = '';
            let supplierBase = '';
            if (values.providerMaster != null) {
                providers = values.providerMaster;
                orderFrom = providers.providerName;
                supplierBase = providers.providerId;
            }
            let projectCoordinator;
            let projectCoordinatorName = '';
            let coordinatorPhoneNumber = '';
            let coordinatorPersonID = '';
            if (values.projectCoordinator != null) {
                projectCoordinator = values.projectCoordinator;
                projectCoordinatorName = projectCoordinator.personFirstName + ' ' + projectCoordinator.personMiddleName + ' ' + projectCoordinator.personLastName;
                coordinatorPhoneNumber = projectCoordinator.personPhoneNum;
                coordinatorPersonID = projectCoordinator.personId;
            }
            let status = values.statusMaster;
            let bidValues = values.bidMaster;
            /**Table	
             * 
             */
            let workerInfo = values.workerInformation;
            let accInfo = values.accountingInformation;
            let approverInfo = values.approverInformation;
            let infoCopy = values.informationalCopyInformation;
            let requestors = values.requesterPerson;
            this.requestorDetails = "";
            if (requestors != null && requestors != undefined) {
                if (requestors.personId)
                    this.requestorDetails = this.requestorDetails + requestors.personId + " - ";

                if (requestors.personFirstName)
                    this.requestorDetails = this.requestorDetails + requestors.personFirstName + " ";

                if (requestors.personMiddleName)
                    this.requestorDetails = this.requestorDetails + requestors.personMiddleName + " ";

                if (requestors.personLastName)
                    this.requestorDetails = this.requestorDetails + requestors.personLastName + " ";
            }
            this.requestorData = this.requestorDetails;

            if (values.renewedRfeNum != null && values.renewedRfeNum != undefined)
                this.rfeNoLabel = "Renewal For RFE No.";

            if (approverInfo.length > 0) {
                this.approverComments = approverInfo;
                this.approverComments = this.approverComments.map(result => {
                    let approverDetail = result.approverPin;
                    if (approverDetail === null || approverDetail === undefined)
                        return {
                            approverAction: '',
                            approverComments: '',
                            actionDate: '',
                            approverName: ''
                        }
                    if (approverDetail.personFirstName === null)
                        approverDetail.personFirstName = '';
                    if (approverDetail.personLastName === null)
                        approverDetail.personLastName = '';
                    if (approverDetail.personMiddleName === null)
                        approverDetail.personMiddleName = '';
                    return {
                        approverAction: result.approverAction,
                        approverComments: result.approverComments,
                        actionDate: result.actionDate,
                        approverName: approverDetail.personFirstName + ' ' + approverDetail.personMiddleName + ' ' + approverDetail.personLastName
                    }
                })

            }
            this.approvalAmount = values.approvedAmount;

            /**approver button display
            * 
            */
            let creater = values.createdPersonId
            if (this.isAdmin) {
                this.isVisible = true;
            }
            else {
                if (status.statusId === 2) {
                    if (creater == this.userId)
                        this.isVisible = true;
                    if (!this.isVisible)
                        this.router.navigate(['notAuthorizedForm']);

                }
                else {
                    this.isVisible = false;
                    if (creater == this.userId)
                        this.isVisible = true;

                    if (siteContactpersonID == this.userId)
                        this.isVisible = true;
                    if (coordinatorPersonID == this.userId)
                        this.isVisible = true;
                    approverInfo.forEach(element => {
                        let approver = element.approverPin;
                        if (approver)
                            if (approver.personId == this.userId)
                                this.isVisible = true;
                    });
                    infoCopy.forEach(element => {
                        let informationPersonId = element.informationPersonId
                        if (informationPersonId)
                            if (informationPersonId.personId == this.userId)
                                this.isVisible = true;
                    });
                    if (!this.isVisible)
                        this.router.navigate(['notAuthorizedForm']);

                }
            }
            if (status.statusId === 1) {
                this.isClosable = false;
                this.isComments = true;
                this.isSave = false;
                this.isSubmit = false;
                this.formStatus = "Submitted"
                let approversList;
                approversList = approverInfo.filter(approvers => {
                    if (approvers.approverAction === "Approved")
                        return false;
                    else {
                        return true;
                    }
                });
                if (approversList.length > 0) {
                    approversList = approversList.map(approvers => {
                        let person;
                        if (approvers.approverPin != null) {
                            person = approvers.approverPin;
                        }
                        if (person.personMiddleName == null)
                            person.personMiddleName = '';

                        return { label: person.personId + ' - ' + person.personFirstName + ' ' + person.personMiddleName + ' ' + person.personLastName, code: person.personId, name: person.personFirstName + ' ' + person.personMiddleName + ' ' + person.personLastName }
                    });
                    let i = 0;
                    this.pendingApprovers = approversList.filter(result => {
                        if (i === 0) {
                            i++;
                            return true;
                        }
                        else
                            return false;
                    });
                    this.pendingApproverAsString = this.pendingApprovers[0].label;
                }

                if (this.userRole === "Admin") {
                    this.isApprover = true;
                    if (this.pendingApprovers) {
                        if (this.pendingApprovers[0].code === this.userId) {
                            this.isUser = true;
                        }
                        else {
                            this.isUser = false;
                        }
                    }
                    else {
                        this.isApprover = false;
                    }
                }
                else {
                    approverInfo.forEach(approver => {
                        let acct;
                        if (approver.approverPin != null) {
                            acct = approver.approverPin;
                        }
                        if (this.userRole === "User") {
                            if (acct.personId == this.userId && approver.approverAction != "Approved" && approver.approverAction != "Rejected")
                                this.isApprover = true;
                            else if (acct.personId == this.userId && (approver.approverAction === "Approved" || approver.approverAction === "Rejected")) {

                                this.isApprover = false;
                                this.isClosable = true;
                                this.isSave = false;
                                this.isComments = true;
                            }
                        }
                    })
                    let orderSeq;
                    let approverOrderSeq;
                    for (let approver of approverInfo) {
                        let acct = approver.approverPin;
                        if (approver.approverAction === null) {
                            orderSeq = approver.orderSeq;
                            break;
                        }
                    }
                    for (let approver of approverInfo) {
                        let acct = approver.approverPin;

                        if (acct.personId == this.userId) {
                            approverOrderSeq = approver.orderSeq;
                            break;
                        }
                    }
                    if (orderSeq === approverOrderSeq) {
                        this.isApprover = true;
                    }
                    else {
                        this.isApprover = false;
                        this.isClosable = true;
                        this.isSave = false;
                        this.isComments = true;
                    }
                }
                if (this.isApprover) {
                    this.isRetract = true;
                }
                if (creater === this.userId || this.isAdmin) {
                    this.isRetract = false;
                    this.isRequestComment = false;
                    if (creater === this.userId && this.isAdmin) {
                        this.isRequestComment = true;
                    }
                    if (creater === this.userId) {
                        this.isRequestComment = true;
                    }
                }
            }
            this.isEditSaveApprovedForm = false;
            if (status.statusId === 3 || status.statusId === 4) {
                if (status.statusId === 3) {
                    this.formStatus = "Approved"
                    if (this.isAdmin) {
                        this.isEditable = true;
                        this.isEditSaveApprovedForm = true;
                        this.isRenewal = false;
                    }
                    if (creater === this.userId || siteContactpersonID === this.userId || coordinatorPersonID === this.userId) {
                        this.isRenewal = false;
                    }
                    let infoCopyInformation;
                    for (let i = 0; i < infoCopy.length; i++) {
                        if (infoCopy[i].informationPersonId != null) {
                            infoCopyInformation = infoCopy[i].informationPersonId.personId;
                        }
                        if (infoCopyInformation === this.userId) {
                            this.isRenewal = false;
                        }
                    }
                    this.isApprover = false;
                    this.isClosable = false;
                    this.isSave = false;
                    this.isComments = true;
                    this.isSubmit = false;
                }
                if (status.statusId === 4) {
                    this.formStatus = "Rejected"
                    if (this.isAdmin || this.userId === creater) {
                        this.isApprover = false;
                        this.isComments = true;
                        this.isSave = true;
                        this.isSubmit = true;
                        this.isEditable = true;
                        this.isClosable = true;
                    }
                    else {
                        this.isApprover = false;
                        this.isComments = true;
                        this.isSave = false;
                        this.isSubmit = false;
                        this.isEditable = false;
                        this.isClosable = false;
                    }
                }
            }
            if (status.statusId === 2) {
                this.formStatus = "Not Submitted";
                if (this.isAdmin) {
                    this.isEditable = true;
                    this.isSubmit = true;
                    this.isSave = true;
                }
                else if (this.userId != creater) {
                    this.isEditable = false;
                    this.isSubmit = false;
                    this.isSave = false;
                }
                else {
                    this.isEditable = true;
                    this.isSubmit = true;
                    this.isSave = true;
                }
            }
            let startDate = null;
            let completionDate = null;
            if (values.startDate != null) {
                startDate = values.startDate;
            }
            if (values.completionDate != null) {
                completionDate = values.completionDate;
            }
            let additionalExpenses = null;
            if (values.expenses != null) {
                additionalExpenses = values.expenses.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
            }
            let rfeNum = null;
            if (values.rfeNum != 0) {
                rfeNum = values.rfeNum;
            }

            this.newRFEDocument.patchValue({
                originDate: this.transform(values.createdDate),
                psReqNumber: values.corpPSReqNum,
                rfeNum: rfeNum,
                siteContactName: siteContactName,
                phoneNumber: phoneNumber,
                personID: siteContactpersonID,
                orderFrom: orderFrom,
                supplierBase: supplierBase,
                bid: bidValues.bidId,
                projectTitle: values.projectTitle,
                serviceDescription: values.projectDesc,
                comments: values.comments,
                additionalExpenses: additionalExpenses,

                startDate: this.transform(startDate),
                completionDate: this.transform(completionDate),
            });
            this.addWorkerTableForPatching(workerInfo.length - 1);
            this.addAcctTableForPatching(accInfo.length - 1);
            this.addApprovalTableForPatching(approverInfo.length - 1);
            this.addInfoTableForPatching(infoCopy.length - 1);

            let ctrl = <FormArray>this.newRFEDocument.controls['workerInfo'];
            let i = 0;

            if (workerInfo.length > 0) {
                ctrl.controls.forEach((field) => {
                    let estimatedHours = null;
                    let rate = null;
                    if (workerInfo[i].estimatedHours != null) {
                        estimatedHours = workerInfo[i].estimatedHours.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 });
                    }
                    if (workerInfo[i].rate != null) {
                        rate = workerInfo[i].rate.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
                    }
                    field.get('corpWorkerId').setValue(workerInfo[i].corpWorkerId)
                    field.get('resourceTitle').setValue(workerInfo[i].resourceTitle);
                    field.get('estHours').setValue(estimatedHours);
                    field.get('rate').setValue(rate);
                    i++;
                });
            }
            let fixedBidAmount = null;
            if (values.fixedBidAmount != null) {
                fixedBidAmount = values.fixedBidAmount.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
            }
            this.newRFEDocument.patchValue({
                fixedBidAmount: fixedBidAmount,
            });
            ctrl = <FormArray>this.newRFEDocument.controls['acctInfo'];
            i = 0;
            if (accInfo.length > 0) {
                ctrl.controls.forEach((field) => {
                    let acct;
                    let department;
                    let accountId = '';
                    let departmentId = '';
                    let distributionPercentage = null;
                    if (accInfo[i].accountMaster != null) {
                        acct = accInfo[i].accountMaster;
                        accountId = acct.accountId;
                    }
                    if (accInfo[i].departmentMaster != null) {
                        department = accInfo[i].departmentMaster;
                        departmentId = department.departmentId;
                    }
                    if (accInfo[i].distributionPer != 0) {
                        distributionPercentage = accInfo[i].distributionPer.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 });
                    }
                    field.get('corpAccountId').setValue(accInfo[i].corpAccountId);
                    field.get('account').setValue(accountId);
                    field.get('dept').setValue(departmentId);
                    field.get('wbs').setValue(accInfo[i].wbs);
                    field.get('distribution').setValue(distributionPercentage);
                    field.get('accountFields').setValue(accInfo[i].accountFields);
                    i++;
                });
            }
            ctrl = <FormArray>this.newRFEDocument.controls['approval'];
            i = 0;
            if (approverInfo.length > 0) {
                ctrl.controls.forEach((field) => {
                    let acct;
                    let acctPersonName = '';
                    let acctPersonId = '';
                    if (approverInfo[i].approverPin != null) {
                        acct = approverInfo[i].approverPin;
                        acctPersonName = acct.personFirstName + ' ' + acct.personMiddleName + ' ' + acct.personLastName;
                        acctPersonId = acct.personId;
                    }
                    if (this.pendingApprovers) {
                        if (acctPersonId === this.pendingApprovers[0].code && this.formStatus == 'Submitted') {
                            this.currentApproverIndicator = true;
                            this.currentApproverIndex = i;
                        }
                    }
                    field.get('corpApproverId').setValue(approverInfo[i].corpApproverId);
                    field.get('approvalName').setValue(acctPersonName);
                    field.get('personId').setValue(acctPersonId);
                    i++;
                });
                if (this.formStatus !== 'Submitted') {
                    this.currentApproverIndicator = false;
                    this.currentApproverIndex = -1;
                }
                if (!this.currentApproverIndicator) {
                    this.currentApproverIndicator = false;
                    this.currentApproverIndex = -1;
                }
            }
            ctrl = <FormArray>this.newRFEDocument.controls['informationalCopy'];
            i = 0;
            if (infoCopy.length > 0) {
                ctrl.controls.forEach((field) => {
                    let infoDetails;
                    let personName = '';
                    let personId = '';
                    if (infoCopy[i].informationPersonId != null) {
                        infoDetails = infoCopy[i].informationPersonId;
                        personName = infoDetails.personFirstName + ' ' + infoDetails.personMiddleName + ' ' + infoDetails.personLastName;
                        personId = infoDetails.personId;
                    }
                    field.get('infoId').setValue(infoCopy[i].infoId)
                    field.get('infoName').setValue(personName);
                    field.get('infoPersonId').setValue(personId);
                    i++;
                });
            }
            if (values.activityLogInformation.length > 0) {
                this.activityLogConstruct = values.activityLogInformation.map(field => {
                    let Name;
                    let logDescConstruct;
                    if (field.logPersonPin) {
                        Name = (field.logPersonPin.personFirstName) + " " + (field.logPersonPin.personMiddleName) + " " + (field.logPersonPin.personLastName);
                        logDescConstruct = field.logDesc;
                    }
                    let logActionDate = this.transformWithHoursAndMinutes(field.logActionDate);
                    return {
                        logActionDate: logActionDate,
                        logAction: field.logAction,
                        logDescConstruct: logDescConstruct,
                        userPinWithName: (field.logPersonPin.userPin) + ' - ' + Name,
                    }
                });
                this.logs = this.activityLogConstruct;
            } else {
                this.logs = [{
                    logActionDate: "No Records Found",
                    logAction: "No Records Found",
                    logDescConstruct: "No Records Found",
                    userPinWithName: "No Records Found",
                }];
            }
            if (projectCoordinator != null) {
                this.newRFEDocument.patchValue({
                    projectCoordinator: projectCoordinatorName,
                    coordinatorPhoneNumber: coordinatorPhoneNumber,
                    coordinatorPersonID: coordinatorPersonID,

                })
            }
        }
        this.attachments = currentNewRFEDocumentContent.corpAttachments;
        if (this.isDisable)
            this.newRFEDocument.disable();

        this.setMaxMinDate();

        // console.log(this.newRFEDocument.get('approval').get('controls'))
    }


    /**
     * Dynamic Approval Amount Caluculation
     * @param workerInfoControl 
     * @param additionalExpensesControl 
     * @param fixedBidAmountControl 
     */
    calculateApprovalAmount(workerInfoControl: AbstractControl, additionalExpensesControl: AbstractControl, fixedBidAmountControl: AbstractControl): void {
        if (this.newRFEDocument.enabled) {

            if (workerInfoControl.valid) {
                this.workerRowsToAddValid = false;
                this.approvalAmountZeroValid = false;
            }

            let traverse: number = 0;

            this.currentEstValue = 0;
            this.currentRateValue = 0;
            this.currentAdditionalExpensesValue = 0;
            this.multipliedValue = 0;
            this.approvalAmount = 0;

            if (this.newRFEDocument.get('bid').value == '1') {
                let currentLength = +workerInfoControl.get(['length']);
                while (traverse < currentLength) {
                    currentLength = +workerInfoControl.get(['length']);
                    if (workerInfoControl.get([traverse]).value.estHours) {
                        this.currentEstValue = +workerInfoControl.get([traverse]).value.estHours;
                    } else {
                        this.currentEstValue = 0;
                    }
                    if (workerInfoControl.get([traverse]).value.rate) {
                        if (isNaN(workerInfoControl.get([traverse]).value.rate)) {
                            let FullCurrentRateValueAsString = workerInfoControl.get([traverse]).value.rate.trim().replace(/,/gi, '');
                            let latestRateNumberValue = +FullCurrentRateValueAsString;
                            this.currentRateValue = latestRateNumberValue;
                        } else {
                            this.currentRateValue = +workerInfoControl.get([traverse]).value.rate;
                        }
                    } else {
                        this.currentRateValue = 0;
                    }

                    this.multipliedValue = (this.multipliedValue) + (this.currentEstValue * this.currentRateValue);
                    traverse++;
                }
            }
            if (additionalExpensesControl.value || fixedBidAmountControl.value) {
                if (additionalExpensesControl.value) {
                    if (isNaN(additionalExpensesControl.value)) {
                        let FullCurrentAddExpensesValueAsString = additionalExpensesControl.value.trim().replace(/,/gi, '');
                        let latestAddExpensesNumberValue = +FullCurrentAddExpensesValueAsString;
                        this.currentAdditionalExpensesValue = latestAddExpensesNumberValue;
                    } else {
                        this.currentAdditionalExpensesValue = +additionalExpensesControl.value;
                    }
                    this.approvalAmount = (this.multipliedValue + (this.currentAdditionalExpensesValue));
                } else {
                    this.approvalAmount = this.approvalAmount + this.multipliedValue;
                }
                if (fixedBidAmountControl.value) {
                    if (isNaN(fixedBidAmountControl.value)) {
                        let FullCurrentFixedBidValueAsString = fixedBidAmountControl.value.trim().replace(/,/gi, '');
                        let latestFixedBidNumberValue = +FullCurrentFixedBidValueAsString;
                        this.currentfixedBidAmountValue = latestFixedBidNumberValue;
                    } else {
                        this.currentfixedBidAmountValue = +fixedBidAmountControl.value;
                    }
                    this.approvalAmount = (this.approvalAmount + (this.currentfixedBidAmountValue));
                }
            } else {
                this.approvalAmount = this.approvalAmount + this.multipliedValue;
            }

            const approvalControl = this.newRFEDocument.get('approval');
            this.setApprovalValidation(approvalControl);
        }
    }

    /** Validations 
     * Dynamic addition/removal of validation on workers table 
     * @param typeOfBidControl 
     */
    setEstAndRateValidation(typeOfBidControl: AbstractControl): void {
        if (this.newRFEDocument.enabled) {
            this.fixedBidValid = false;
            this.fixedBidMsg = '';

            let workerCurrentLength = 1;
            const workerControl = this.newRFEDocument.get('workerInfo');
            if (typeOfBidControl.value == '2') {

                workerCurrentLength = +(this.newRFEDocument.get('workerInfo').value.length);

                for (let i = 0; i < workerCurrentLength; i++) {
                    this.newRFEDocument.get(['workerInfo', i, 'estHours']).clearValidators();
                    this.newRFEDocument.get(['workerInfo', i, 'estHours']).updateValueAndValidity();
                    this.newRFEDocument.get(['workerInfo', i, 'rate']).clearValidators();
                    this.newRFEDocument.get(['workerInfo', i, 'rate']).updateValueAndValidity();
                    this.newRFEDocument.get('fixedBidAmount').setValidators([Validators.required]);
                    this.newRFEDocument.get('fixedBidAmount').updateValueAndValidity();
                }
            } else {
                this.newRFEDocument.patchValue({
                    fixedBidAmount: null,
                });
                workerCurrentLength = +(this.newRFEDocument.get('workerInfo').value.length);
                for (let i = 0; i < workerCurrentLength; i++) {
                    this.newRFEDocument.get(['workerInfo', i, 'estHours']).setValidators([Validators.required]);
                    this.newRFEDocument.get(['workerInfo', i, 'estHours']).updateValueAndValidity();
                    this.newRFEDocument.get(['workerInfo', i, 'rate']).setValidators([Validators.required]);
                    this.newRFEDocument.get(['workerInfo', i, 'rate']).updateValueAndValidity();
                    this.newRFEDocument.get('fixedBidAmount').clearValidators();
                    this.newRFEDocument.get('fixedBidAmount').updateValueAndValidity();
                }
            }

            const workerInfoControl = this.newRFEDocument.get('workerInfo');
            const additionalExpensesControl = this.newRFEDocument.get('additionalExpenses');
            const fixedBidAmountControl = this.newRFEDocument.get('fixedBidAmount');
            this.calculateApprovalAmount(workerInfoControl, additionalExpensesControl, fixedBidAmountControl);
        }
    }

    /**
     * Site contact name validation 
     * @param siteContactControl 
     */
    setSiteContactValidation(siteContactControl: AbstractControl): void {
        if (siteContactControl.errors) {
            if ((siteContactControl.touched || siteContactControl.dirty) && siteContactControl.errors.required) {
                this.siteContactNameValid = true;
                this.siteContactMsg = AppConstant.siteContactRequiredMessage;
                this.newRFEDocument.controls['phoneNumber'].setValue('');
                this.newRFEDocument.controls['personID'].setValue('');
            } else if ((siteContactControl.touched || siteContactControl.dirty) && siteContactControl.errors.minlength) {
                this.siteContactNameValid = true;
                this.siteContactMsg = AppConstant.siteContactMinMessage;
            }
        }
        else if (siteContactControl.valid) {
            this.siteContactNameValid = false;
            this.siteContactNameNotAvailable = false;
        }
    }

    /**
    * project co-ordinator error msg change 
    * @param projectCoordinatorControl 
    */
    setProjectCoordinatorValidation(projectCoordinatorControl: AbstractControl): void {
        if (projectCoordinatorControl.value.trim() === '') {
            this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
            this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
        }
        if (projectCoordinatorControl.value.trim() !== '') {
            this.projectCoordinatorNameNotAvailable = false;
        }
    }

    /**
     * Supplier name validation
     * @param orderFromControl 
     */
    setOrderFromValidation(orderFromControl: AbstractControl): void {
        if (orderFromControl.errors) {
            if ((orderFromControl.touched || orderFromControl.dirty) && orderFromControl.errors.required) {
                this.orderFromValid = true;
                this.orderFromMsg = AppConstant.orderFromRequiredMessage;
                this.newRFEDocument.controls['supplierBase'].setValue('');
            } else if ((orderFromControl.touched || orderFromControl.dirty) && orderFromControl.errors.minlength) {
                this.orderFromValid = true;
                this.orderFromMsg = AppConstant.orderFromMinMessage;
            }
        }
        else if (orderFromControl.valid) {
            this.orderFromValid = false;
            this.supplierNameNotAvailable = false;
        }
    }

    /**
     *  Start date validation 
     * @param startDateControl 
     */
    startDateValidation(startDateControl: AbstractControl): void {
        if (startDateControl.errors) {
            if ((startDateControl.touched || startDateControl.dirty) && startDateControl.errors.required) {
                this.startDateValid = true;
                this.startDateMsg = AppConstant.startDateRequiredMessage;
            }
        }
        else if (startDateControl.valid) {
            this.startDateValid = false;
        }
    }
    /** Date Range Picker
       * @returns void
       */
    startDateClosed(): void {
        const startDateControl = this.newRFEDocument.get('startDate');
        if (startDateControl.touched || startDateControl.dirty) {
            this.startDateValidation(startDateControl);
        }

    }


    /**
     * Completion date validation
     * @param completionDateControl 
     */
    completionDateValidation(completionDateControl: AbstractControl): void {
        if (completionDateControl.errors) {
            if ((completionDateControl.touched || completionDateControl.dirty) && completionDateControl.errors.required) {
                this.completionDateValid = true;
                this.completionDateMsg = AppConstant.completionDateRequiredMessage;
            }
        }
        else if (completionDateControl.valid) {
            this.completionDateValid = false;
        }
    }
    /**
     * completion date validation with close
     */
    completionDateClosed(): void {
        const completionDateControl = this.newRFEDocument.get('completionDate');
        if (completionDateControl.touched || completionDateControl.dirty) {
            this.completionDateValidation(completionDateControl);
        }
    }

    /** 
     * @param i 
     * Est. hours two decimal restriction
    */
    estHoursLeft(i): void {
        let latestestHoursValueAsString = this.newRFEDocument.get('workerInfo').get([i, 'estHours']).value;
        let latestestHourNumberValue = +latestestHoursValueAsString;
        if (latestestHourNumberValue) {
            this.newRFEDocument.get('workerInfo').get([i]).patchValue({
                estHours: latestestHourNumberValue.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 }),
            });
        }
    }

    /**
     * 
     * @param i 
     * Rate two decimal restriction
     */
    rateLeft(i): void {
        let latestRateValueAsString = this.newRFEDocument.get('workerInfo').get([i]).value.rate;
        let latestRateNumberValue;
        if (isNaN(latestRateValueAsString)) {
            let FullCurrentRateValueAsString = latestRateValueAsString.trim().replace(/,/gi, '');
            latestRateNumberValue = +FullCurrentRateValueAsString;
        } else {
            latestRateNumberValue = +this.newRFEDocument.get('workerInfo').get([i]).value.rate;
        }
        if (latestRateNumberValue) {
            this.newRFEDocument.get('workerInfo').get([i]).patchValue({
                rate: latestRateNumberValue.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
            });
        }
    }
    /**
    * 
    * @param i 
    * Additional Expenses two decimal restriction
    */
    additionalExpensesLeft() {
        let latestAddExpensesValueAsString = this.newRFEDocument.get('additionalExpenses').value;
        let latestAddExpensesNumberValue;
        if (isNaN(latestAddExpensesValueAsString)) {
            let FullCurrentAddExpensesValueAsString = latestAddExpensesValueAsString.trim().replace(/,/gi, '');
            latestAddExpensesNumberValue = +FullCurrentAddExpensesValueAsString;
        } else {
            latestAddExpensesNumberValue = +this.newRFEDocument.get('additionalExpenses').value;
        }
        if (latestAddExpensesNumberValue) {
            this.newRFEDocument.patchValue({
                additionalExpenses: latestAddExpensesNumberValue.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
            });
        }
    }

    /**
     *  Fixed bid amount validation
     * @param fixedBidControl 
     */
    fixedBidValidation(fixedBidControl: AbstractControl): void {
        if (!this.isDisable) {
            if (this.newRFEDocument.get('bid').value == '2') {
                if (fixedBidControl.errors) {
                    if ((fixedBidControl.touched || fixedBidControl.dirty) && fixedBidControl.errors.required) {
                        this.fixedBidValid = true;
                        this.fixedBidMsg = AppConstant.fixedBidRequiredMessage;
                    }
                }
                else if (fixedBidControl.valid) {
                    this.fixedBidValid = false;

                }
            }
        }
    }
    /**
     * fixed bid close
     */
    fixedBidClosed(): void {
        const fixedBidControl = this.newRFEDocument.get('fixedBidAmount');
        let latestfixedBidAsString = fixedBidControl.value;
        let latestfixedBidNumberValue;
        if (isNaN(latestfixedBidAsString)) {
            let FullCurrentAddExpensesValueAsString = latestfixedBidAsString.trim().replace(/,/gi, '');
            latestfixedBidNumberValue = +FullCurrentAddExpensesValueAsString;
        } else {
            latestfixedBidNumberValue = +this.newRFEDocument.get('fixedBidAmount').value;
        }
        if (latestfixedBidNumberValue) {
            this.newRFEDocument.patchValue({
                fixedBidAmount: latestfixedBidNumberValue.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
            });
        }

        if (fixedBidControl.touched || fixedBidControl.dirty) {
            this.fixedBidValidation(fixedBidControl);
        }
    }

    /**
     * Project title validation 
     * @param projectTitleControl 
     */
    setprojectTitleValidation(projectTitleControl: AbstractControl): void {
        if (projectTitleControl.errors) {
            if ((projectTitleControl.touched || projectTitleControl.dirty) && projectTitleControl.errors.required) {
                this.projectTitleValid = true;
                this.projectTitleMsg = AppConstant.projectTitleRequiredMessage;
            }
            else if ((projectTitleControl.touched || projectTitleControl.dirty) && projectTitleControl.errors.minlength) {
                this.projectTitleValid = true;
                this.projectTitleMsg = AppConstant.projectTitleMinMessage;
            }
        }
        else if ((projectTitleControl.touched || projectTitleControl.dirty) && !(projectTitleControl.value.trim().length > 0)) {
            this.projectTitleValid = true;
            this.projectTitleMsg = AppConstant.projectTitleRequiredMessage;
        }
        else if (projectTitleControl.valid) {
            this.projectTitleValid = false;
        }
    }
    /**
     * project title validation
     */
    projectTitleLeft(): void {
        const projectTitleControl = this.newRFEDocument.get('projectTitle');
        if (projectTitleControl.value && !(projectTitleControl.value.trim().length > 0)) {
            this.setprojectTitleValidation(projectTitleControl);
        }
        if (projectTitleControl.touched || projectTitleControl.dirty) {
            this.setprojectTitleValidation(projectTitleControl);
        }
    }

    /**
     * Description validation 
     * @param descAllServeControl 
     */
    setdescAllServeValidation(descAllServeControl: AbstractControl): void {
        if (descAllServeControl.errors) {
            if ((descAllServeControl.touched || descAllServeControl.dirty) && descAllServeControl.errors.required) {
                this.descAllServeValid = true;
                this.descAllServeMsg = AppConstant.descAllServeRequiredMessage;
            } else if ((descAllServeControl.touched || descAllServeControl.dirty) && descAllServeControl.errors.minlength) {
                this.descAllServeValid = true;
                this.descAllServeMsg = AppConstant.descAllServeMinMessage;
            }
        }
        else if ((descAllServeControl.touched || descAllServeControl.dirty) && !(descAllServeControl.value.trim().length > 0)) {
            this.descAllServeValid = true;
            this.descAllServeMsg = AppConstant.descAllServeRequiredMessage;
        }
        else if (descAllServeControl.valid) {
            this.descAllServeValid = false;
        }
    }
    /**
     * description control
     */
    descAllServeLeft(): void {
        const descAllServeControl = this.newRFEDocument.get('serviceDescription');
        if (descAllServeControl.value && !(descAllServeControl.value.trim().length > 0)) {
            this.setdescAllServeValidation(descAllServeControl);
        }
        if (descAllServeControl.touched || descAllServeControl.dirty) {
            this.setdescAllServeValidation(descAllServeControl);
        }
    }

    /**
     *  Account number validation
     * @param accountNoControl 
     * @param ix 
     */
    setAccountNoValidation(accountNoControl: AbstractControl, ix: number): boolean {
        if (accountNoControl.errors) {
            if ((accountNoControl.touched || accountNoControl.dirty) && accountNoControl.errors.required) {
                this.accountNoValid = true;
                this.accountNoPMsg = ix;
                this.accountNoMsg = AppConstant.accountNoRequiredMessage;
            }
            return false;
        }
        else if (accountNoControl.valid) {
            this.accountNoValid = false;
            this.accountNoMsg = AppConstant.accountNoRequiredMessage;

            this.percentValid = false;
            return true;
        }
    }
    accountBlur(i) {
        this.setAccountNoValidation(this.newRFEDocument.get('acctInfo').get([i, 'account']), i);
        let currentAccountNumber = this.newRFEDocument.get('acctInfo').get([i, 'account']).value;
        if (currentAccountNumber) {
            if (this.accountNoDataList.includes(+currentAccountNumber)) {
                this.accountNoInValid = false;
            } else {
                this.accountNoInValid = true;
                this.accountNoInValidPMsg = i;
            }
        }
    }
    accountFocus(i) {
        this.accountNoInValid = false;
        if (this.validateAccountingTable) {
            if (this.validateAccountingTable.accountInValidOccurance.length > 0) {
                this.validateAccountingTable.accountInValidOccurance.forEach(element => {
                    if (element === i) {
                        const index = this.validateAccountingTable.accountInValidOccurance.indexOf(element);
                        this.validateAccountingTable.accountInValidOccurance.splice(index, 1);
                    }
                });
            }
        }
        this.setAccountNoValidation(this.newRFEDocument.get('acctInfo').get([i, 'account']), i);
    }

    /**
     * Cost center validation
     * @param costCenterControl 
     * @param ix 
     */
    setCostCenterValidation(costCenterControl: AbstractControl, ix: number): boolean {
        if (costCenterControl.errors) {
            if ((costCenterControl.touched || costCenterControl.dirty) && costCenterControl.errors.required) {
                this.costCenterValid = true;
                this.costCenterPMsg = ix;
                this.costCenterMsg = AppConstant.costCenterRequiredMessage;
            }
            return false;
        }
        else if (costCenterControl.valid) {
            this.costCenterValid = false;

            this.percentValid = false;
            return true;
        }
    }
    costCenterBlur(i) {
        this.setCostCenterValidation(this.newRFEDocument.get('acctInfo').get([i, 'dept']), i);
        let currentCostCenter = this.newRFEDocument.get('acctInfo').get([i, 'dept']).value;
        if (currentCostCenter) {
            if (this.costCenterDataList.includes(+currentCostCenter)) {
                this.costCenterInValid = false;
            } else {
                this.costCenterInValid = true;
                this.costCenterInValidPMsg = i;
            }
        }
    }
    costCenterFocus(i) {
        this.costCenterInValid = false;
        if (this.validateAccountingTable) {
            if (this.validateAccountingTable.costCenterInValidOccurance.length > 0) {
                this.validateAccountingTable.costCenterInValidOccurance.forEach(element => {
                    if (element === i) {
                        const index = this.validateAccountingTable.costCenterInValidOccurance.indexOf(element);
                        this.validateAccountingTable.costCenterInValidOccurance.splice(index, 1);
                    }
                });
            }
        }
        this.setCostCenterValidation(this.newRFEDocument.get('acctInfo').get([i, 'dept']), i);
    }

    /**
     * Distribution percentage validation 
     * @param distributionControl 
     * @param ix 
     */
    setdistributionValidation(distributionControl: AbstractControl, ix: number): boolean {
        if (distributionControl.errors) {

            if ((distributionControl.touched || distributionControl.dirty) && distributionControl.errors.required) {
                this.distributionValid = true;
                this.distributionPMsg = ix;
                this.distributionMsg = AppConstant.distributionRequiredMessage;
            }
            return false;
        }
        else if (distributionControl.valid) {
            this.distributionValid = false;

            this.percentValid = false;
            return true;
        }
    }
    /**
     * distribution percent check
     * @param i 
     */
    distributionLeft(i): void {
        let currentValue;
        const accountingInfoControl = this.newRFEDocument.get('acctInfo');
        currentValue = accountingInfoControl.get([i]).value.distribution;
        if (currentValue) {
            currentValue = +currentValue;
            currentValue = (currentValue.toFixed(2));
            this.newRFEDocument.get('acctInfo').get([i]).patchValue({
                distribution: currentValue,
            });
        }
        if (accountingInfoControl.touched || accountingInfoControl.dirty) {
            this.setdistributionValidation(accountingInfoControl.get([i, 'distribution']), i);
        }
    }
    /**
     * distribution percent check
     * @param i 
     */
    distributionRegexCheck(i): void {
        let distRegex = /^[0-9]{0,3}(\.?[0-9]{0,1})?$/;
        let currentValue;
        const accountingInfoControl = this.newRFEDocument.get('acctInfo');
        currentValue = accountingInfoControl.get([i]).value.distribution;
        if (currentValue) {
            currentValue = +currentValue;
            if (currentValue > 100) {
                this.percentValid = true;
                this.percentMsg = AppConstant.percentMessage;
            }
            if (distRegex.test(currentValue.toString()) && currentValue < 100) {
                this.distributionKeyPress = true;
                this.percentValid = false;
                this.percentMsg = '';
            } else {
                if (isNaN(currentValue)) {
                    this.newRFEDocument.get('acctInfo').get([i]).patchValue({
                        distribution: null,
                    });
                }
                this.distributionKeyPress = false;
            }
        } else {
            this.distributionKeyPress = true;
            this.percentValid = false;
            this.percentMsg = '';
        }
    }

    /**
     * Approval limit check 
     * @param approvalControl 
     */
    setApprovalValidation(approvalControl: AbstractControl): void {
        this.approvalRowsToAddValid = false;
        if (true) {
            let traverse: number = 0;
            this.approverId = '';
            this.individualApproverLimit = 0;
            this.greatestApproverLimit = 0;
            let currentLength = +approvalControl.get(['length']);
            while (traverse < currentLength) {
                currentLength = +approvalControl.get(['length']);
                if (approvalControl.get([traverse]).value.approvalName) {
                    this.datum.getApproverDetailsForLimit(approvalControl.get([traverse]).value.personId).pipe(debounceTime(1500)).subscribe({
                        next: (data: ApproverMasterDetail) => {
                            if (data) {
                                this.individualApproverLimit = data.approvalAmount;
                                if (this.individualApproverLimit > this.greatestApproverLimit) {
                                    this.greatestApproverLimit = this.individualApproverLimit;
                                }
                                if (this.approvalAmount > this.greatestApproverLimit) {
                                    this.approverLimitValid = true;
                                    this.approvalMsg = AppConstant.approvalLimitMessage;
                                } else {
                                    this.approverLimitValid = false;
                                }
                            } else {
                                this.individualApproverLimit = 0;
                                if (this.individualApproverLimit > this.greatestApproverLimit) {
                                    this.greatestApproverLimit = this.individualApproverLimit;
                                }
                                if (this.approvalAmount > this.greatestApproverLimit) {
                                    this.approverLimitValid = true;
                                    this.approvalMsg = AppConstant.approvalLimitMessage;
                                } else {
                                    this.approverLimitValid = false;
                                }
                            }
                        },
                        error: err => console.log(err)
                    });
                } else {
                    this.newRFEDocument.get(['approval', traverse, 'personId']).setValue('');
                }
                traverse++;
            }
            let validFlag = 0;
            const ctrl = <FormArray>approvalControl;
            ctrl.controls.forEach(element => {
                if (element.status === 'VALID') {
                    validFlag = 1;
                }
            });
            if (validFlag) {
                this.approvalValid = false;
                this.approverNameNotAvailable = false;
            }
            if (approvalControl.valid) {
                this.approvalValid = false;
            }
        }
    }

    /**
     * Approval same name insertion check
     * @param currentPersonIdInsertion 
     * @param index 
     */
    setApprovalValidationForNameCheck(currentPersonIdInsertion, index: number): boolean {
        let traverse: number = 0;
        let flag: number = 0;
        let temporaryStore: string = '';
        temporaryStore = currentPersonIdInsertion;
        const approvalControl = this.newRFEDocument.get('approval');
        let currentLength = +approvalControl.get(['length']);
        while (traverse < currentLength) {
            currentLength = +approvalControl.get(['length']);
            if (approvalControl.get([traverse]).value.personId && (traverse != index) || (index == -1)) {
                if (temporaryStore === approvalControl.get([traverse]).value.personId) {
                    flag = 1;
                }
            }
            traverse++;
        }
        if (flag === 1) {
            flag = 0;
            return false;
        } else {
            return true;
        }
    }

    informationalCopyValidation(informationalCopyControl: AbstractControl): void {
        const ctrl = <FormArray>informationalCopyControl;
        ctrl.controls.forEach(element => {
            if (element.value.infoName.trim() === '') {
                element.get(['infoPersonId']).setValue('');
            }
            if (element.value.infoName.trim() !== '') {
                this.inforNameNotAvailable = false;
            }
        });
    }

    /* ========================================================================================================================================= */

    /** Closing Popups 
     * 
    */
    closeSiteContactNamePopup(): void {
        this.siteContactNameCheck = false;
        this.siteNameDisplay = false;
        if (this.newRFEDocument.controls['personID'].value.trim() === '') {
            this.newRFEDocument.controls['siteContactName'].setValue('');
            this.newRFEDocument.controls['phoneNumber'].setValue('');
            this.newRFEDocument.controls['personID'].setValue('');
        }
        this.setSiteContactValidation(this.newRFEDocument.get('siteContactName'));
    }
    /** Closing Popups 
     * 
    */
    closeProjectCoordinatorNamePopup(): void {
        if (this.newRFEDocument.controls['coordinatorPersonID'].value.trim() === '') {
            this.newRFEDocument.controls['projectCoordinator'].setValue('');
            this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
            this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
        }
    }
    /** Closing Popups 
   * 
  */
    closeOrderFromPopup(): void {
        this.orderDisplay = false;
        if (this.newRFEDocument.controls['supplierBase'].value.trim() === '') {
            this.newRFEDocument.controls['orderFrom'].setValue('');
            this.newRFEDocument.controls['supplierBase'].setValue('');
        }
        this.setOrderFromValidation(this.newRFEDocument.get('orderFrom'));
    }
    /** Closing Popups 
   * 
  */
    closeAccountNoPopup(): void {
        this.accountDisplay = false;
        this.setAccountNoValidation(this.newRFEDocument.get('acctInfo').get([this.index, 'account']), this.index);
    }
    /** Closing Popups 
   * 
  */
    closeCostCenterPopup(): void {
        this.deptDisplay = false;
        this.setCostCenterValidation(this.newRFEDocument.get('acctInfo').get([this.index, 'dept']), this.index);
    }
    /** Closing Popups 
   * 
  */
    closeApprovalPopup(): void {
        if (this.newRFEDocument.get(['approval', this.index, 'personId']).value.trim() === '') {
            this.newRFEDocument.get(['approval', this.index, 'approvalName']).setValue('');
            this.newRFEDocument.get(['approval', this.index, 'personId']).setValue('');
        }
    }
    /** Closing Popups 
   * 
  */
    closeInformationalCopyPopUp() {
        if (this.newRFEDocument.get(['informationalCopy', this.index, 'infoPersonId']).value.trim() === '') {
            this.newRFEDocument.get(['informationalCopy', this.index, 'infoName']).setValue('');
            this.newRFEDocument.get(['informationalCopy', this.index, 'infoPersonId']).setValue('');
        }
    }
    /** Closing Popups 
   * 
  */
    closePopup() {
        this.coordinatorNameCheck = false;
        this.approvalNameCheck = false;
        this.siteNameDisplay = false;
        this.ptCoordinaterDisplay = false;
        this.orderDisplay = false;
        this.accountDisplay = false;
        this.informationalDisplay = false;
        this.approvalNameDisplay = false;
        this.deptDisplay = false;
    }

    /* ============================================================================================================================================= */

    /** Positive Values
     * @param i
     */

    estPositiveValues(i): void {
        let currentValue = this.newRFEDocument.get('workerInfo').get([i, 'estHours']).value;
        if (currentValue) {
            let FullCurrentestHoursAsString = currentValue.trim().replace(/,/gi, '');
            let latestestHoursNumberValue = +FullCurrentestHoursAsString;
            if (isNaN(latestestHoursNumberValue)) {
                this.newRFEDocument.get('workerInfo').get([i]).patchValue({
                    estHours: null
                });
            }
        }
    }
    /**
     * positive value check
     * @param i 
     */
    ratePositiveValues(i): void {
        let currentValue = this.newRFEDocument.get('workerInfo').get([i, 'rate']).value;
        if (currentValue) {
            let FullCurrentRateAsString = currentValue.trim().replace(/,/gi, '');
            let latestRateNumberValue = +FullCurrentRateAsString;
            if (isNaN(latestRateNumberValue)) {
                this.newRFEDocument.get('workerInfo').get([i]).patchValue({
                    rate: null
                });
            }
        }
    }
    /**
     * Additional expences positive value check
     */
    additionalExpensesPositiveValues(): void {
        let currentValue = this.newRFEDocument.get('additionalExpenses').value;
        if (currentValue) {
            let FullCurrentAddExpensesValueAsString = currentValue.trim().replace(/,/gi, '');
            let latestAddExpensesNumberValue = +FullCurrentAddExpensesValueAsString;
            if (isNaN(latestAddExpensesNumberValue)) {
                this.newRFEDocument.patchValue({
                    additionalExpenses: null
                });
            }
        }
    }
    /**
     * fixed bid  positive value check
     */
    fixedBidPositiveValues() {
        let currentValue = this.newRFEDocument.get('fixedBidAmount').value;
        if (currentValue) {
            let FullCurrentfixedBidAsString = currentValue.trim().replace(/,/gi, '');
            let latestfixedBidNumberValue = +FullCurrentfixedBidAsString;
            if (isNaN(latestfixedBidNumberValue)) {
                this.newRFEDocument.patchValue({
                    fixedBidAmount: null
                });
            }
        }
    }
    /** Positive values for Tables 
       * 
      */
    workerRowsPositiveValues() {
        let positive = 0;
        let currentValue = this.newRFEDocument.get('workerNumOfRows').value;
        if (currentValue) {
            currentValue = +currentValue.toFixed();
            positive = Math.abs(currentValue);
            if (positive === 0) {
                positive = null;
            }
            this.newRFEDocument.patchValue({
                workerNumOfRows: positive,
            });
        }
    }
    /**
     * Positive values for Tables
     */
    accountingInfoRowsPositiveValues(): void {
        let positive = 0;
        let currentValue = this.newRFEDocument.get('acctNumOfRows').value;
        if (currentValue) {
            currentValue = +currentValue.toFixed();
            positive = Math.abs(currentValue);
            if (positive === 0) {
                positive = null;
            }
            this.newRFEDocument.patchValue({
                acctNumOfRows: positive,
            });
        }
    }
    /**
     * Positive values for Tables
     */
    approvalRowsPositiveValues() {
        let positive = 0;
        let currentValue = this.newRFEDocument.get('approvalNumOfRows').value;
        if (currentValue) {
            currentValue = +currentValue.toFixed();
            positive = Math.abs(currentValue);
            if (positive === 0) {
                positive = null;
            }
            this.newRFEDocument.patchValue({
                approvalNumOfRows: positive,
            });
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

    /** Number of. Rows validation 
    * 
   */
    workerMaxRows(): void {
        this.workerRowsToAddValid = false;
    }
    /** Number of. Rows validation 
  * 
 */
    accountMaxRows(): void {
        this.percentValid = false;
    }
    /**
     * Number of. Rows validation
     */
    approvalMaxRows(): void {
        this.approvalRowsToAddValid = false;
    }
    /**
     * Number of. Rows validation
     */
    infoMaxRows(): void {
        this.infoValid = false;
    }

    /**
     * Dynamic Table - Worker Information
     * @param value 
     */
    addTable(value): void {
        if (value === "") {
            this.workerRowsToAddValid = false;
        }
        if (value) {
            value = +value;
            if (value < 101 && value > 0) {
                this.workerRowsToAddValid = false;
                for (let i = 1; i <= value; i++) {
                    this.workerInfo.push(this.buildRow());
                }
                this.setEstAndRateValidation(this.newRFEDocument.get('bid'));
            } else {
                this.workerRowsToAddValid = true;
                this.workerRowsToAddMsg = AppConstant.numberOfRowsToAddValidate;
            }
        }
    }
    /** Add worker Table
     * @param value 
     */
    addWorkerTableForPatching(value) {
        for (let i = 0; i < value; i++) {
            this.workerInfo.push(this.buildRow());
        }
    }
    /**Remove worker Table
     * 
     * @param formArray 
     */
    removeTable(formArray): void {
        while (formArray.length !== 1) {
            formArray.removeAt(1);
        }
        formArray.get([0]).patchValue({
            resourceTitle: null,
            estHours: null,
            rate: null
        });
        this.newRFEDocument.patchValue({
            additionalExpenses: null,
            fixedBidAmount: null,
        });
        this.setEstAndRateValidation(this.newRFEDocument.get('bid'));
    }
    /**Build Row
     *
     */
    buildRow(): FormGroup {
        return this.fb.group({
            corpWorkerId: [''],
            resourceTitle: [''],
            estHours: [''],
            rate: ['']
        });
    }
    /**Remove row
     * 
     * @param rowIndex 
     * 
     */
    removeRow(rowIndex: number) {
        if (this.newRFEDocument.get('bid').value == '1') {
            this.workerInfo.removeAt(rowIndex);
            this.setEstAndRateValidation(this.newRFEDocument.get('bid'));
        }
    }

    /** Dynamic Table - Accounting Information 
     * @param value
    */
    addAcctTable(value): void {
        if (value) {
            value = +value;
            if (value < 101 && value > 0) {
                this.percentValid = false;
                for (let i = 0; i < value; i++) {
                    if (this.distCheck()) {
                        this.acctInfo.push(this.buildAcctRow());
                    }
                }
            } else {
                this.percentValid = true;
                this.percentMsg = AppConstant.numberOfRowsToAddValidate;
            }
        }
    }
    /**Add account table
     * 
     * @param value 
     */
    addAcctTableForPatching(value) {
        for (let i = 0; i < value; i++) {
            this.acctInfo.push(this.buildAcctRow());
        }
    }
    /**Remove account table
     * 
     * @param formArray 
     */
    removeAcctTable(formArray): void {
        this.distributionSum = 0;
        this.percentValid = false;
        while (formArray.length !== 1) {
            formArray.removeAt(1);
        }
        formArray.get([0]).patchValue({
            account: null,
            dept: null,
            wbs: null,
            distribution: null,
            accountFields: null
        });
        this.distCheck();
        this.distributionValid = false;
    }
    /**Build row
     * 
     */
    buildAcctRow(): FormGroup {
        return this.fb.group({
            corpAccountId: [''],
            account: ['', Validators.required],
            dept: ['', Validators.required],
            wbs: [''],
            distribution: ['', Validators.required],
            accountFields: [''],
        });
    }
    buildAcctRowIntialize(): FormGroup {
        return this.fb.group({
            corpAccountId: [''],
            account: ['', Validators.required],
            dept: ['', Validators.required],
            wbs: [''],
            distribution: [(100).toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 }), Validators.required],
            accountFields: [''],
        });
    }
    /**Remove row
     * 
     * @param rowIndex 
     */
    removeAcctRow(rowIndex: number) {
        this.percentValid = false;
        if (rowIndex == this.distributionPMsg) {
            this.distributionValid = false;
        }
        this.acctInfo.removeAt(rowIndex);
        this.distCheck();
    }
    /** Control addition of rows in accounting table
       * 
       */
    distCheck(): boolean {
        let traverse: number = 0;
        this.distributionSum = 0;
        const accountingInfoControl = this.newRFEDocument.get('acctInfo');
        let currentLength = +accountingInfoControl.get(['length']);
        if (+accountingInfoControl.get([traverse]).value.distribution < 100) {
            while (traverse < currentLength) {
                currentLength = +accountingInfoControl.get(['length']);

                if (+accountingInfoControl.get([traverse]).value.distribution < 100) {
                    let currentValue = +accountingInfoControl.get([traverse]).value.distribution;

                    if (this.distributionSum < 100) {
                        this.distributionSum = this.distributionSum + currentValue;
                    }
                } else {
                    this.distributionSum = 101;
                }
                traverse++;
            }
            if (this.distributionSum < 100) {
                this.percentValid = false;
                return true;
            }
            else {
                this.percentValid = true;
                this.percentMsg = AppConstant.percentMessage;
                this.distributionSum = 0;
                return false;
            }
        }
        else {
            this.distributionSum = 0;
            if (+accountingInfoControl.get([traverse]).value.distribution > 99.99) {
                this.percentValid = true;
                this.percentMsg = AppConstant.percentMessage;
            }
            return false;
        }
    }

    /**Dynamic Table - Approval Names 
     * 
     * @param value 
     */
    addApprovalTable(value): void {
        if (value === "") {
            this.approvalRowsToAddValid = false;
        }
        if (value) {
            value = +value;
            if (value < 101 && value > 0) {
                this.approvalRowsToAddValid = false;

                for (let i = 1; i <= value; i++) {
                    this.approval.push(this.buildApprovalRow());
                }
            } else {
                this.approvalRowsToAddValid = true;
                this.approvalRowsToAddMsg = AppConstant.numberOfRowsToAddValidate;
            }
        }
    }
    /**Add approval table
     * 
     * @param value 
     */
    addApprovalTableForPatching(value) {
        for (let i = 0; i < value; i++) {
            this.approval.push(this.buildApprovalRow());
        }
    }
    /**Remove approval table
     * 
     * @param formArray 
     */
    removeApprovalTable(formArray): void {
        this.approvalRowsToAddValid = false;
        this.approvalValid = true;
        this.approvalNameCheck = false;
        this.approvalMsg = AppConstant.approvalRequiredMessage;

        while (formArray.length !== 1) {
            formArray.removeAt(1);
        }
        formArray.get([0]).patchValue({
            approvalName: null,
            personId: null,
        });
    }
    /**Build row
     * 
     */
    buildApprovalRow(): FormGroup {
        return this.fb.group({
            corpApproverId: [''],
            approvalName: ['', Validators.required],
            personId: ['']
        });
    }
    /**Remove row
     * 
     * @param rowIndex 
     */
    removeApprovalRow(rowIndex: number) {
        if (rowIndex == this.approvalPMsg) {
            this.approvalNameCheck = false;
        }
        this.approval.removeAt(rowIndex);
        if (this.newRFEDocument.get('approval').value.length === 0) {
            this.addApprovalTable(1);
        }
    }

    /**Dynamic Table - Informational Copy
     * 
     * @param value 
     */
    addInfoTable(value): void {
        if (value === "") {
            this.infoValid = false;
        }
        if (value) {
            value = +value;
            if (value < 101 && value > 0) {
                this.infoValid = false;
                for (let i = 1; i <= value; i++) {
                    this.informationalCopy.push(this.buildInfoRow());
                }
            } else {
                this.infoValid = true;
                this.infoMsg = AppConstant.numberOfRowsToAddValidate;
            }
        }
    }
    /**Add Info table
     * 
     * @param value 
     */
    addInfoTableForPatching(value) {
        for (let i = 0; i < value; i++) {
            this.informationalCopy.push(this.buildInfoRow());
        }
    }
    /**Remove info table
     * 
     * @param formArray 
     */
    removeInfoTable(formArray): void {
        while (formArray.length !== 1) {
            formArray.removeAt(1);
        }
        formArray.get([0]).patchValue({
            infoName: null,
            infoPersonId: null,
        });
    }
    /**Build row
     * 
     */
    buildInfoRow(): FormGroup {
        return this.fb.group({
            infoId: [''],
            infoName: [''],
            infoPersonId: ['']
        });
    }
    /**Remove row
     * 
     * @param rowIndex 
     */
    removeInfoRow(rowIndex: number) {
        this.informationalCopy.removeAt(rowIndex);
        if (this.newRFEDocument.get('informationalCopy').value.length === 0) {
            this.addInfoTableForPatching(1);
        }
    }

    /** order from popup
       * 
      */
    orderFromPopup() {
        if (!this.isDisable &&
            this.newRFEDocument.get('workerInfo').enabled &&
            this.newRFEDocument.get('acctInfo').enabled &&
            this.newRFEDocument.get('approval').enabled) {
            this.siteNameDisplay = false;
            this.ptCoordinaterDisplay = false;
            this.orderDisplay = true;
            this.accountDisplay = false;
            this.informationalDisplay = false;
            this.approvalNameDisplay = false;
            this.deptDisplay = false;
        }
    }
    /**Sitename popup
     * 
     */
    siteNamePopup() {
        if (!this.isDisable &&
            this.newRFEDocument.get('workerInfo').enabled &&
            this.newRFEDocument.get('acctInfo').enabled &&
            this.newRFEDocument.get('approval').enabled) {
            this.siteNameDisplay = true;
            this.ptCoordinaterDisplay = false;
            this.orderDisplay = false;
            this.accountDisplay = false;
            this.informationalDisplay = false;
            this.approvalNameDisplay = false;
            this.deptDisplay = false;
        }
    }
    /**PtCoordinaterPopup
     * 
     */
    ptCoordinaterPopup() {
        if (!this.isDisable &&
            this.newRFEDocument.get('workerInfo').enabled &&
            this.newRFEDocument.get('acctInfo').enabled &&
            this.newRFEDocument.get('approval').enabled) {
            this.siteNameDisplay = false;
            this.ptCoordinaterDisplay = true;
            this.orderDisplay = false;
            this.accountDisplay = false;
            this.informationalDisplay = false;
            this.approvalNameDisplay = false;
            this.deptDisplay = false;
        }
    }
    /**ApprovalNamePopup
     * 
     * @param i 
     */
    approvalNamePopup(i) {
        if (!this.isDisable) {
            const approvalControl = this.newRFEDocument.get('approval');
            if (approvalControl.value.length < 1) {
                approvalControl.setValidators([Validators.required]);
            } else {
                approvalControl.clearValidators();
            }
            approvalControl.updateValueAndValidity();

            this.index = i;
            this.siteNameDisplay = false;
            this.ptCoordinaterDisplay = false;
            this.orderDisplay = false;
            this.accountDisplay = false;
            this.informationalDisplay = false;
            this.approvalNameDisplay = true;
            this.deptDisplay = false;
        }
    }
    /**InformationPopup
     * 
     * @param i 
     */
    informationPopup(i) {
        if (!this.isDisable) {
            this.index = i;
            this.siteNameDisplay = false;
            this.ptCoordinaterDisplay = false;
            this.orderDisplay = false;
            this.accountDisplay = false;
            this.informationalDisplay = true;
            this.approvalNameDisplay = false;
            this.deptDisplay = false;
        }
    }
    /**AccountPopup
     * 
     * @param i 
     */
    accountPopup(i) {
        if (!this.isDisable) {
            this.index = i;
            this.siteNameDisplay = false;
            this.ptCoordinaterDisplay = false;
            this.orderDisplay = false;
            this.accountDisplay = true;
            this.informationalDisplay = false;
            this.approvalNameDisplay = false;
            this.deptDisplay = false;
        }
    }
    /**DeptPopup
     * 
     * @param i 
     */
    deptPopup(i) {
        if (!this.isDisable) {
            this.index = i;
            this.siteNameDisplay = false;
            this.ptCoordinaterDisplay = false;
            this.orderDisplay = false;
            this.accountDisplay = false;
            this.informationalDisplay = false;
            this.approvalNameDisplay = false;
            this.deptDisplay = true;
        }
    }
    /**CloseRequiredPopup
     * 
     */
    closeRequiredPopup(): void {
        this.specificErrorMessagesContainer = [];
        this.requiredFullPop = false;
        this.savedAsDraftRequiredPopup = false;
    }
    close() {
        return false;
    }

    /**getDetailsByUserName
    * 
    * @param userNameEntered
    * @param calledBy
    */
    getDetailsByUserName(userNameEntered: string, calledBy: string, inComingIndex: number) {
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
                    this.busyLoading = this.datum.getglobalUser(user).subscribe((results: any[]) => {
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
                                if (calledBy === 'siteContactName') {
                                    this.newRFEDocument.controls['siteContactName'].setValue('');
                                    this.newRFEDocument.controls['phoneNumber'].setValue('');
                                    this.newRFEDocument.controls['personID'].setValue('');
                                    this.siteContactNameNotAvailable = true;
                                    this.siteContactNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                                } else if (calledBy === 'projectCoordinator') {
                                    this.newRFEDocument.controls['projectCoordinator'].setValue('');
                                    this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
                                    this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
                                    this.projectCoordinatorNameNotAvailable = true;
                                    this.projectCoordinatorNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                                } else if (calledBy === 'infoName') {
                                    this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoName']).setValue('');
                                    this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoPersonId']).setValue('');
                                    this.infoMsgIndex = inComingIndex;
                                    this.inforNameNotAvailable = true;
                                    this.inforNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                                }
                            } else if (results.length === 1) {
                                if (calledBy === 'siteContactName') {
                                    this.siteContactNameNotAvailable = false;
                                    this.handleName(results[0]);
                                } else if (calledBy === 'projectCoordinator') {
                                    this.projectCoordinatorNameNotAvailable = false;
                                    this.handleCoordinators(results[0]);
                                } else if (calledBy === 'infoName') {
                                    this.inforNameNotAvailable = false;
                                    this.index = inComingIndex;
                                    this.handleInformation(results[0]);
                                }
                            } else if (results.length > 1) {
                                if (calledBy === 'siteContactName') {
                                    this.newRFEDocument.controls['siteContactName'].setValue('');
                                    this.newRFEDocument.controls['phoneNumber'].setValue('');
                                    this.newRFEDocument.controls['personID'].setValue('');
                                    this.siteContactNameNotAvailable = false;
                                    this.siteNamePopup();
                                } else if (calledBy === 'projectCoordinator') {
                                    this.newRFEDocument.controls['projectCoordinator'].setValue('');
                                    this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
                                    this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
                                    this.projectCoordinatorNameNotAvailable = false;
                                    this.ptCoordinaterPopup();
                                } else if (calledBy === 'infoName') {
                                    this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoName']).setValue('');
                                    this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoPersonId']).setValue('');
                                    this.inforNameNotAvailable = false;
                                    this.informationPopup(inComingIndex);
                                }
                            }
                        } else {
                            if (calledBy === 'siteContactName') {
                                this.newRFEDocument.controls['siteContactName'].setValue('');
                                this.newRFEDocument.controls['phoneNumber'].setValue('');
                                this.newRFEDocument.controls['personID'].setValue('');
                                this.siteContactNameNotAvailable = true;
                                this.siteContactNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                            } else if (calledBy === 'projectCoordinator') {
                                this.newRFEDocument.controls['projectCoordinator'].setValue('');
                                this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
                                this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
                                this.projectCoordinatorNameNotAvailable = true;
                                this.projectCoordinatorNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                            } else if (calledBy === 'infoName') {
                                this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoName']).setValue('');
                                this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoPersonId']).setValue('');
                                this.infoMsgIndex = inComingIndex;
                                this.inforNameNotAvailable = true;
                                this.inforNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                            }
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
                    this.busyLoading = this.datum.getglobalUser(user).subscribe((results: any[]) => {
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
                                if (calledBy === 'siteContactName') {
                                    this.newRFEDocument.controls['siteContactName'].setValue('');
                                    this.newRFEDocument.controls['phoneNumber'].setValue('');
                                    this.newRFEDocument.controls['personID'].setValue('');
                                    this.siteContactNameNotAvailable = true;
                                    this.siteContactNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                                } else if (calledBy === 'projectCoordinator') {
                                    this.newRFEDocument.controls['projectCoordinator'].setValue('');
                                    this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
                                    this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
                                    this.projectCoordinatorNameNotAvailable = true;
                                    this.projectCoordinatorNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                                } else if (calledBy === 'infoName') {
                                    this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoName']).setValue('');
                                    this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoPersonId']).setValue('');
                                    this.infoMsgIndex = inComingIndex;
                                    this.inforNameNotAvailable = true;
                                    this.inforNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                                }
                            } else if (results.length === 1) {
                                if (calledBy === 'siteContactName') {
                                    this.siteContactNameNotAvailable = false;
                                    this.handleName(results[0]);
                                } else if (calledBy === 'projectCoordinator') {
                                    this.projectCoordinatorNameNotAvailable = false;
                                    this.handleCoordinators(results[0]);
                                } else if (calledBy === 'infoName') {
                                    this.inforNameNotAvailable = false;
                                    this.index = inComingIndex;
                                    this.handleInformation(results[0]);
                                }
                            } else if (results.length > 1) {
                                if (calledBy === 'siteContactName') {
                                    this.newRFEDocument.controls['siteContactName'].setValue('');
                                    this.newRFEDocument.controls['phoneNumber'].setValue('');
                                    this.newRFEDocument.controls['personID'].setValue('');
                                    this.siteContactNameNotAvailable = false;
                                    this.siteNamePopup();
                                } else if (calledBy === 'projectCoordinator') {
                                    this.newRFEDocument.controls['projectCoordinator'].setValue('');
                                    this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
                                    this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
                                    this.projectCoordinatorNameNotAvailable = false;
                                    this.ptCoordinaterPopup();
                                } else if (calledBy === 'infoName') {
                                    this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoName']).setValue('');
                                    this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoPersonId']).setValue('');
                                    this.inforNameNotAvailable = false;
                                    this.informationPopup(inComingIndex);
                                }
                            }
                        } else {
                            if (calledBy === 'siteContactName') {
                                this.newRFEDocument.controls['siteContactName'].setValue('');
                                this.newRFEDocument.controls['phoneNumber'].setValue('');
                                this.newRFEDocument.controls['personID'].setValue('');
                                this.siteContactNameNotAvailable = true;
                                this.siteContactNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                            } else if (calledBy === 'projectCoordinator') {
                                this.newRFEDocument.controls['projectCoordinator'].setValue('');
                                this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
                                this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
                                this.projectCoordinatorNameNotAvailable = true;
                                this.projectCoordinatorNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                            } else if (calledBy === 'infoName') {
                                this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoName']).setValue('');
                                this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoPersonId']).setValue('');
                                this.infoMsgIndex = inComingIndex;
                                this.inforNameNotAvailable = true;
                                this.inforNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                            }
                        }
                    });
                } else {
                    if (calledBy === 'siteContactName') {
                        this.newRFEDocument.controls['siteContactName'].setValue('');
                        this.newRFEDocument.controls['phoneNumber'].setValue('');
                        this.newRFEDocument.controls['personID'].setValue('');
                        this.siteContactNameNotAvailable = true;
                        this.siteContactNameNotAvailableMsg = AppConstant.wrongNameFormat;
                    } else if (calledBy === 'projectCoordinator') {
                        this.newRFEDocument.controls['projectCoordinator'].setValue('');
                        this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
                        this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
                        this.projectCoordinatorNameNotAvailable = true;
                        this.projectCoordinatorNameNotAvailableMsg = AppConstant.wrongNameFormat;
                    } else if (calledBy === 'infoName') {
                        this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoName']).setValue('');
                        this.newRFEDocument.get(['informationalCopy', inComingIndex, 'infoPersonId']).setValue('');
                        this.infoMsgIndex = inComingIndex;
                        this.inforNameNotAvailable = true;
                        this.inforNameNotAvailableMsg = AppConstant.wrongNameFormat;
                    }
                }
            }
        }
    }
    // Common for both
    noDataForFirstLastName() {
        this.userLastName = '';
        this.userFirstName = '';
    }
    /**getApproverDetailsByUserName
    *
    * @param userNameEntered
    * @param calledBy
    */
    getApproverDetailsByUserName(userNameEntered: string, inComingIndex: number) {
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
                    this.busyLoading = this.datum.getGlobalUserForApprovar(user).subscribe((results: any[]) => {
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
                                this.newRFEDocument.get(['approval', inComingIndex, 'approvalName']).setValue('');
                                this.newRFEDocument.get(['approval', inComingIndex, 'personId']).setValue('');
                                this.approvalPMsg = inComingIndex;
                                this.approverNameNotAvailable = true;
                                this.approverNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                            } else if (results.length === 1) {
                                this.approverNameNotAvailable = false;
                                this.index = inComingIndex;
                                this.handleApproval(results[0]);
                            } else if (results.length > 1) {
                                this.newRFEDocument.get(['approval', inComingIndex, 'approvalName']).setValue('');
                                this.newRFEDocument.get(['approval', inComingIndex, 'personId']).setValue('');
                                this.approverNameNotAvailable = false;
                                this.approvalNamePopup(inComingIndex);
                            }
                        } else {
                            this.newRFEDocument.get(['approval', inComingIndex, 'approvalName']).setValue('');
                            this.newRFEDocument.get(['approval', inComingIndex, 'personId']).setValue('');
                            this.approvalPMsg = inComingIndex;
                            this.approverNameNotAvailable = true;
                            this.approverNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
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
                    this.busyLoading = this.datum.getGlobalUserForApprovar(user).subscribe((results: any[]) => {
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
                                this.newRFEDocument.get(['approval', inComingIndex, 'approvalName']).setValue('');
                                this.newRFEDocument.get(['approval', inComingIndex, 'personId']).setValue('');
                                this.approvalPMsg = inComingIndex;
                                this.approverNameNotAvailable = true;
                                this.approverNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                            } else if (results.length === 1) {
                                this.approverNameNotAvailable = false;
                                this.index = inComingIndex;
                                this.handleApproval(results[0]);
                            } else if (results.length > 1) {
                                this.newRFEDocument.get(['approval', inComingIndex, 'approvalName']).setValue('');
                                this.newRFEDocument.get(['approval', inComingIndex, 'personId']).setValue('');
                                this.approverNameNotAvailable = false;
                                this.approvalNamePopup(inComingIndex);
                            }
                        } else {
                            this.newRFEDocument.get(['approval', inComingIndex, 'approvalName']).setValue('');
                            this.newRFEDocument.get(['approval', inComingIndex, 'personId']).setValue('');
                            this.approvalPMsg = inComingIndex;
                            this.approverNameNotAvailable = true;
                            this.approverNameNotAvailableMsg = AppConstant.nameNotAvailableMsg;
                        }
                    });
                } else {
                    this.newRFEDocument.get(['approval', inComingIndex, 'approvalName']).setValue('');
                    this.newRFEDocument.get(['approval', inComingIndex, 'personId']).setValue('');
                    this.approvalPMsg = inComingIndex;
                    this.approverNameNotAvailable = true;
                    this.approverNameNotAvailableMsg = AppConstant.wrongNameFormat;
                }
            }
        }
    }

    /**getDetailsBySupplierName 
     * 
     * @param supplierNameEntered 
     */
    getDetailsBySupplierName(supplierNameEntered: string) {
        this.userSupplierName = '';
        if (supplierNameEntered !== null && supplierNameEntered !== undefined) {
            if (supplierNameEntered.length > 0) {
                let base = "";
                this.userSupplierName = supplierNameEntered.trim();
                this.busyLoading = this.datum.getProviderMaster(base, this.userSupplierName).subscribe((results: any[]) => {
                    if (results) {
                        if (results.length === 0) {
                            this.newRFEDocument.controls['orderFrom'].setValue('');
                            this.newRFEDocument.controls['supplierBase'].setValue('');
                            this.supplierNameNotAvailable = true;
                            this.supplierNameNotAvailableMsg = AppConstant.supplierNameNotAvailableMsg;
                        } else if (results.length === 1) {
                            this.supplierNameNotAvailable = false;
                            this.handleOrder(results[0]);
                        } else if (results.length > 1) {
                            this.newRFEDocument.controls['orderFrom'].setValue('');
                            this.newRFEDocument.controls['supplierBase'].setValue('');
                            this.supplierNameNotAvailable = false;
                            this.orderFromPopup();
                        }
                    } else {
                        this.newRFEDocument.controls['orderFrom'].setValue('');
                        this.newRFEDocument.controls['supplierBase'].setValue('');
                        this.supplierNameNotAvailable = true;
                        this.supplierNameNotAvailableMsg = AppConstant.supplierNameNotAvailableMsg;
                    }
                });
            }
        }
    }
    noDataForSupplierName() {
        this.userSupplierName = '';
    }

    /**Insertion of data from popup to the form 
     * 
     * @param event 
     */
    handleName(event) {
        if (event !== null) {

            const coordinatorPersonIDControl = this.newRFEDocument.get('coordinatorPersonID');
            // if (coordinatorPersonIDControl.value === event.personId) {
            //     this.siteContactNameCheckMsg = AppConstant.CoordinatorSiteContactNameMatch;
            //     this.siteContactNameCheck = true;
            //     this.newRFEDocument.controls['siteContactName'].setValue('');
            //     this.newRFEDocument.controls['phoneNumber'].setValue('');
            //     this.newRFEDocument.controls['personID'].setValue('');
            // } else {
            if (this.setApprovalValidationForNameCheck(event.personId, -1)) {
                this.siteContactNameCheck = false;
                this.newRFEDocument.controls['siteContactName'].setValue(event.personName);
                this.newRFEDocument.controls['phoneNumber'].setValue(event.personPhoneNum);
                this.newRFEDocument.controls['personID'].setValue(event.personId);
            } else {
                this.siteContactNameCheckMsg = AppConstant.siteContactApproverNameMatch;
                this.siteContactNameCheck = true;
                this.newRFEDocument.controls['siteContactName'].setValue('');
                this.newRFEDocument.controls['phoneNumber'].setValue('');
                this.newRFEDocument.controls['personID'].setValue('');
            }
            //}
        } else {
            this.siteContactNameCheck = false;
            this.newRFEDocument.controls['siteContactName'].setValue('');
            this.newRFEDocument.controls['phoneNumber'].setValue('');
            this.newRFEDocument.controls['personID'].setValue('');
        }
        this.siteNameDisplay = false;
    }
    /**HandleCoordinators
     * 
     * @param event 
     */
    handleCoordinators(event) {
        if (event !== null) {
            const siteContactPersonIdControl = this.newRFEDocument.get('personID');
            // if (siteContactPersonIdControl.value === event.personId) {
            //     this.coordinatorNameCheckMsg = AppConstant.siteContactCoordinatorNameMatch;
            //     this.coordinatorNameCheck = true;
            //     this.newRFEDocument.controls['projectCoordinator'].setValue('');
            //     this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
            //     this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
            // } else if (event.personId === this.userId) {
            //     this.coordinatorNameCheckMsg = AppConstant.selfCoordinatorNameMatch;
            //     this.coordinatorNameCheck = true;
            //     this.newRFEDocument.controls['projectCoordinator'].setValue('');
            //     this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
            //     this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
            // }
            // else {
            if (this.setApprovalValidationForNameCheck(event.personId, -1)) {
                this.coordinatorNameCheck = false;
                this.newRFEDocument.controls['projectCoordinator'].setValue(event.personName);
                this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue(event.personPhoneNum);
                this.newRFEDocument.controls['coordinatorPersonID'].setValue(event.personId);
            } else {
                this.coordinatorNameCheckMsg = AppConstant.projectCoodinatorApproverNameMatch;
                this.coordinatorNameCheck = true;
                this.newRFEDocument.controls['projectCoordinator'].setValue('');
                this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
                this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
            }
            // }
        }
        else {
            this.coordinatorNameCheck = false;
            this.newRFEDocument.controls['projectCoordinator'].setValue('');
            this.newRFEDocument.controls['coordinatorPhoneNumber'].setValue('');
            this.newRFEDocument.controls['coordinatorPersonID'].setValue('');
        }
        this.ptCoordinaterDisplay = false;
    }
    /**HandleOrder
     * 
     * @param event 
     */
    handleOrder(event) {
        if (event !== null) {
            this.newRFEDocument.controls['orderFrom'].setValue(event.providerName);
            this.newRFEDocument.controls['supplierBase'].setValue(event.providerId);
            this.supplierInformationId = event.providerId;
        }
        else {
            this.newRFEDocument.controls['orderFrom'].setValue('');
            this.newRFEDocument.controls['supplierBase'].setValue('');
        }
        this.orderDisplay = false;
    }
    /**HandleAccount
     * 
     * @param event 
     */
    handleAccount(event) {
        let i = 0;
        const ctrl = <FormArray>this.newRFEDocument.controls['acctInfo'];
        if (event !== null) {
            this.accountNoInValid = false;
            ctrl.controls.forEach((field) => {
                if (i === this.index) {
                    field.get('account').setValue(event.accountId);
                }
                i++;
            });
        } else {
            ctrl.controls.forEach((field) => {
                if (i === this.index) {
                    field.get('account').setValue('');
                }
                i++;
            });
        }
        this.accountDisplay = false;
    }
    /**HandleDept
     * 
     * @param event 
     */
    handleDept(event) {
        let i = 0;
        const ctrl = <FormArray>this.newRFEDocument.controls['acctInfo'];
        if (event !== null) {
            this.costCenterInValid = false;
            ctrl.controls.forEach((field) => {
                if (i === this.index) {
                    field.get('dept').setValue(event.departmentId);
                }
                i++;
            });
        } else {
            ctrl.controls.forEach((field) => {
                if (i === this.index) {
                    field.get('dept').setValue('');
                }
                i++;
            });
        }
        this.deptDisplay = false;
    }
    /**HandleApproval
     * 
     * @param event 
     */
    handleApproval(event) {
        let i = 0;
        const ctrl = <FormArray>this.newRFEDocument.controls['approval'];
        if (event !== null) {
            ctrl.controls.forEach((field) => {
                if (i === this.index) {

                    const siteContactPersonIdControl = this.newRFEDocument.get('personID');
                    const coordinatorPersonIDControl = this.newRFEDocument.get('coordinatorPersonID');
                    if (siteContactPersonIdControl.value === event.personId) {
                        this.approvalNameCheckMsg = '';
                        this.approvalNameCheckMsg = AppConstant.siteContactApproverNameMatch;
                        this.approvalNameCheck = true;
                        this.approvalPMsg = i;
                        field.get('approvalName').setValue('');
                        field.get('personId').setValue('');
                    } else if (coordinatorPersonIDControl.value === event.personId) {
                        this.approvalNameCheckMsg = '';
                        this.approvalNameCheckMsg = AppConstant.projectCoodinatorApproverNameMatch;
                        this.approvalNameCheck = true;
                        this.approvalPMsg = i;
                        field.get('approvalName').setValue('');
                        field.get('personId').setValue('');
                    } else if (event.personId === this.userId) {
                        this.approvalNameCheckMsg = AppConstant.selfApproverNameMatch;
                        this.approvalNameCheck = true;
                        this.approvalPMsg = i;
                        field.get('approvalName').setValue('');
                        field.get('personId').setValue('');
                    } else if (this.corpResults) {
                        if (this.corpResults.requesterPerson) {
                            if (this.corpResults.requesterPerson.personId !== this.userId && event.personId === this.corpResults.requesterPerson.personId) {
                                let creator = '';
                                if (this.corpResults.requesterPerson.personFirstName) {
                                    creator = this.corpResults.requesterPerson.personFirstName;
                                }
                                if (this.corpResults.requesterPerson.personMiddleName) {
                                    creator = creator + ' ' + this.corpResults.requesterPerson.personMiddleName;
                                }
                                if (this.corpResults.requesterPerson.personLastName) {
                                    creator = creator + ' ' + this.corpResults.requesterPerson.personLastName;
                                }
                                this.approvalNameCheckMsg = creator + '(' + this.corpResults.requesterPerson.personId + '- Creator' + ') ' + AppConstant.creatorAsApproverByAdmin;
                                this.approvalNameCheck = true;
                                this.approvalPMsg = i;
                                field.get('approvalName').setValue('');
                                field.get('personId').setValue('');
                            } else {
                                if (this.setApprovalValidationForNameCheck(event.personId, i)) {
                                    this.approvalNameCheck = false;
                                    field.get('approvalName').setValue(event.personName);
                                    field.get('personId').setValue(event.personId);
                                    this.approverId = event.personID;
                                } else {
                                    this.approvalNameCheckMsg = AppConstant.sameApproverNameTwice;
                                    this.approvalNameCheck = true;
                                    this.approvalPMsg = i;
                                    field.get('approvalName').setValue('');
                                    field.get('personId').setValue('');
                                }
                            }
                        }
                        else {
                            if (this.setApprovalValidationForNameCheck(event.personId, i)) {
                                this.approvalNameCheck = false;
                                field.get('approvalName').setValue(event.personName);
                                field.get('personId').setValue(event.personId);
                                this.approverId = event.personID;
                            } else {
                                this.approvalNameCheckMsg = AppConstant.sameApproverNameTwice;
                                this.approvalNameCheck = true;
                                this.approvalPMsg = i;
                                field.get('approvalName').setValue('');
                                field.get('personId').setValue('');
                            }
                        }

                    }
                    else {
                        if (this.setApprovalValidationForNameCheck(event.personId, i)) {
                            this.approvalNameCheck = false;
                            field.get('approvalName').setValue(event.personName);
                            field.get('personId').setValue(event.personId);
                            this.approverId = event.personID;
                        } else {
                            this.approvalNameCheckMsg = AppConstant.sameApproverNameTwice;
                            this.approvalNameCheck = true;
                            this.approvalPMsg = i;
                            field.get('approvalName').setValue('');
                            field.get('personId').setValue('');
                        }
                    }
                }
                i++;
            });
        } else {
            ctrl.controls.forEach((field) => {
                if (i === this.index) {
                    this.approvalNameCheck = false;
                    field.get('approvalName').setValue('');
                    field.get('personId').setValue('');
                }
                i++;
            });
        }
        this.approvalNameDisplay = false;
    }

    /**HandleInformation
     * 
     * @param event 
     */
    handleInformation(event) {
        let i = 0;
        const ctrl = <FormArray>this.newRFEDocument.controls['informationalCopy'];
        if (event !== null) {
            ctrl.controls.forEach((field) => {
                if (i === this.index) {
                    field.get('infoName').setValue(event.personName);
                    field.get('infoPersonId').setValue(event.personId);
                }
                i++;
            });
        } else {
            ctrl.controls.forEach((field) => {
                if (i === this.index) {
                    field.get('infoName').setValue('');
                    field.get('infoPersonId').setValue('');
                }
                i++;
            });
        }
        this.informationalDisplay = false;
    }

    /** On save as draft check for account number and cost center
     *  Accounting Information validation is removed
     */
    checkAccountingInformationSaveAsDraft(): boolean {
        this.siteContactNameValid = false;
        this.orderFromValid = false;
        this.startDateValid = false;
        this.completionDateValid = false;
        this.fixedBidValid = false;
        this.projectTitleValid = false;
        this.descAllServeValid = false;
        this.workerRowsToAddValid = false;
        this.approvalRowsToAddValid = false;
        this.approvalValid = false;
        this.infoValid = false;
        this.distributionValid = false;

        this.validateAccountingTable = this.validateAccountingInformation();
        if (this.validateAccountingTable.accountInValid || this.validateAccountingTable.costCenterInValid) {
            this.savedAsDraftRequiredPopup = true;
            this.requiredFullPop = true;
            if (this.validateAccountingTable.accountInValid) {
                this.percentValid = true;
                this.percentMsg = AppConstant.inValidAccountNumber;
            }
            if (this.validateAccountingTable.costCenterInValid) {
                this.percentValid = true;
                if (this.validateAccountingTable.accountInValid) {
                    this.percentMsg = AppConstant.inValidAccountNumberAndCostCenter;
                } else {
                    this.percentMsg = AppConstant.inValidCostCenter;
                }
            }
            return false;
        } else {
            this.savedAsDraftRequiredPopup = false;
            this.requiredFullPop = false;
            this.percentValid = false;
            return true;
        }
    }

    /** onSubmit 
     * 
    */
    /** Validations for renewal form
     * 
     */
    checkFormValidationForRenewal(): boolean {
        let flag: number = 0;
        const siteContactControl = this.newRFEDocument.get('siteContactName');
        siteContactControl.enable();
        siteContactControl.setValidators([Validators.required, Validators.minLength(2)]);
        siteContactControl.updateValueAndValidity();
        if ((siteContactControl.invalid)) {
            this.specificErrorMessagesContainer.push(AppConstant.siteContactInvalidForContainer);
            this.siteContactMsg = AppConstant.siteContactRequiredMessage;
            this.siteContactNameValid = true;
            flag = 1;
        } else {
            siteContactControl.disable();
        }
        const orderFromControl = this.newRFEDocument.get('orderFrom');
        orderFromControl.enable();
        orderFromControl.setValidators([Validators.required, Validators.minLength(2)]);
        orderFromControl.updateValueAndValidity();
        if ((orderFromControl.invalid)) {
            this.specificErrorMessagesContainer.push(AppConstant.supplierNameInvalidForContainer);
            this.orderFromMsg = AppConstant.orderFromRequiredMessage;
            this.orderFromValid = true;
            flag = 1;
        } else {
            orderFromControl.disable();
        }
        const startDateControl = this.newRFEDocument.get('startDate');
        startDateControl.enable();
        startDateControl.setValidators([Validators.required]);
        startDateControl.updateValueAndValidity();
        if ((startDateControl.invalid)) {
            this.specificErrorMessagesContainer.push(AppConstant.startDateInvalidForContainer);
            this.startDateMsg = AppConstant.startDateRequiredMessage;
            this.startDateValid = true;
            flag = 1;
        } else {
            startDateControl.disable();
        }
        const completionDateControl = this.newRFEDocument.get('completionDate');
        completionDateControl.enable();
        completionDateControl.setValidators([Validators.required]);
        completionDateControl.updateValueAndValidity();
        if ((completionDateControl.invalid)) {
            this.specificErrorMessagesContainer.push(AppConstant.completionDateInvalidForContainer);
            this.completionDateMsg = AppConstant.completionDateRequiredMessage;
            this.completionDateValid = true;
            flag = 1;
        } else {
            completionDateControl.disable();
        }
        const projectTitleControl = this.newRFEDocument.get('projectTitle');
        projectTitleControl.enable();
        projectTitleControl.setValidators([Validators.required, Validators.minLength(2)]);
        projectTitleControl.updateValueAndValidity();
        if ((projectTitleControl.invalid)) {
            this.specificErrorMessagesContainer.push(AppConstant.projectTitleInvalidForContainer);
            this.projectTitleMsg = AppConstant.projectTitleRequiredMessage;
            this.projectTitleValid = true;
            flag = 1;
        } else {
            projectTitleControl.disable();
        }
        const descAllServeControl = this.newRFEDocument.get('serviceDescription');
        descAllServeControl.enable();
        descAllServeControl.setValidators([Validators.required, Validators.minLength(2)]);
        descAllServeControl.updateValueAndValidity();
        if ((descAllServeControl.invalid)) {
            this.specificErrorMessagesContainer.push(AppConstant.descriptionOfServicesInvalidForContainer);
            this.descAllServeMsg = AppConstant.descAllServeRequiredMessage;
            this.descAllServeValid = true;
            flag = 1;
        } else {
            descAllServeControl.disable();
        }
        if (flag === 1) {
            this.isDisable = false;
            return false;
        } else {
            return true;
        }
    }
    /**On submit validation for new rfe 
     * 
     * @param form 
     */
    checkFormValidation(form): boolean {

        this.newRFEDocument.enable();

        if (this.siteNameDisplay ||
            this.ptCoordinaterDisplay ||
            this.orderDisplay ||
            this.approvalNameDisplay ||
            this.informationalDisplay) {
            this.specificErrorMessagesContainer.push(AppConstant.closePopups);
            this.isDisable = false;
            return false;
        }

        this.validateAccountingTable = this.validateAccountingInformation();
        let distributionCheck: boolean = this.submitDistributionCheck();
        let approverCheckForSelfTag: boolean = this.validateApprover();

        this.newRFEDocument.get('siteContactName').setValidators([Validators.required, Validators.minLength(2)]);
        this.newRFEDocument.get('siteContactName').updateValueAndValidity();

        this.newRFEDocument.get('orderFrom').setValidators([Validators.required, Validators.minLength(2)]);
        this.newRFEDocument.get('orderFrom').updateValueAndValidity();

        this.newRFEDocument.get('startDate').setValidators([Validators.required]);
        this.newRFEDocument.get('startDate').updateValueAndValidity();

        this.newRFEDocument.get('completionDate').setValidators([Validators.required]);
        this.newRFEDocument.get('completionDate').updateValueAndValidity();

        this.newRFEDocument.get('projectTitle').setValidators([Validators.required, Validators.minLength(2)]);
        this.newRFEDocument.get('projectTitle').updateValueAndValidity();

        this.newRFEDocument.get('serviceDescription').setValidators([Validators.required, Validators.minLength(3)]);
        this.newRFEDocument.get('serviceDescription').updateValueAndValidity();

        const typeOfBidControl = this.newRFEDocument.get('bid');
        if (typeOfBidControl.value == 2) {
            let workerCurrentLength = +(this.newRFEDocument.get('workerInfo').value.length);
            for (let i = 0; i < workerCurrentLength; i++) {
                this.newRFEDocument.get(['workerInfo', i, 'estHours']).clearValidators();
                this.newRFEDocument.get(['workerInfo', i, 'estHours']).updateValueAndValidity();
                this.newRFEDocument.get(['workerInfo', i, 'rate']).clearValidators();
                this.newRFEDocument.get(['workerInfo', i, 'rate']).updateValueAndValidity();
            }
            this.newRFEDocument.get('fixedBidAmount').setValidators([Validators.required]);
            this.newRFEDocument.get('fixedBidAmount').updateValueAndValidity();
        } else {
            let workerCurrentLength = +(this.newRFEDocument.get('workerInfo').value.length);
            for (let i = 0; i < workerCurrentLength; i++) {
                this.newRFEDocument.get(['workerInfo', i, 'estHours']).setValidators([Validators.required]);
                this.newRFEDocument.get(['workerInfo', i, 'estHours']).updateValueAndValidity();
                this.newRFEDocument.get(['workerInfo', i, 'rate']).setValidators([Validators.required]);
                this.newRFEDocument.get(['workerInfo', i, 'rate']).updateValueAndValidity();
            }
            this.newRFEDocument.get('fixedBidAmount').clearValidators();
            this.newRFEDocument.get('fixedBidAmount').updateValueAndValidity();
        }

        let accountingInfoLength = +(this.newRFEDocument.get('acctInfo').value.length);
        for (let i = 0; i < accountingInfoLength; i++) {
            this.newRFEDocument.get(['acctInfo', i, 'account']).setValidators([Validators.required]);
            this.newRFEDocument.get(['acctInfo', i, 'account']).updateValueAndValidity();
            this.newRFEDocument.get(['acctInfo', i, 'dept']).setValidators([Validators.required]);
            this.newRFEDocument.get(['acctInfo', i, 'dept']).updateValueAndValidity();
            this.newRFEDocument.get(['acctInfo', i, 'distribution']).setValidators([Validators.required]);
            this.newRFEDocument.get(['acctInfo', i, 'distribution']).updateValueAndValidity();
        }
        let approvalLength = +(this.newRFEDocument.get('approval').value.length);
        for (let i = 0; i < approvalLength; i++) {
            this.newRFEDocument.get(['approval', i, 'approvalName']).setValidators([Validators.required]);
            this.newRFEDocument.get(['approval', i, 'approvalName']).updateValueAndValidity();
        }
        if (form.invalid || !approverCheckForSelfTag) {
            if (!approverCheckForSelfTag) {
                this.specificErrorMessagesContainer.push(AppConstant.approverNameCreatorInvalidForContainer);
            }

            const siteContactControl = this.newRFEDocument.get('siteContactName');
            if ((siteContactControl.invalid)) {
                this.specificErrorMessagesContainer.push(AppConstant.siteContactInvalidForContainer);
                this.siteContactMsg = AppConstant.siteContactRequiredMessage;
                this.siteContactNameValid = true;
            }
            const orderFromControl = this.newRFEDocument.get('orderFrom');
            if ((orderFromControl.invalid)) {
                this.specificErrorMessagesContainer.push(AppConstant.supplierNameInvalidForContainer);
                this.orderFromMsg = AppConstant.orderFromRequiredMessage;
                this.orderFromValid = true;
            }
            const startDateControl = this.newRFEDocument.get('startDate');
            if ((startDateControl.invalid)) {
                this.specificErrorMessagesContainer.push(AppConstant.startDateInvalidForContainer);
                this.startDateMsg = AppConstant.startDateRequiredMessage;
                this.startDateValid = true;
            }
            const completionDateControl = this.newRFEDocument.get('completionDate');
            if ((completionDateControl.invalid)) {
                this.specificErrorMessagesContainer.push(AppConstant.completionDateInvalidForContainer);
                this.completionDateMsg = AppConstant.completionDateRequiredMessage;
                this.completionDateValid = true;
            }
            const fixedBidControl = this.newRFEDocument.get('fixedBidAmount');
            if ((fixedBidControl.invalid)) {
                this.specificErrorMessagesContainer.push(AppConstant.fixedBidInvalidForContainer);
                this.fixedBidMsg = AppConstant.fixedBidRequiredMessage;
                this.fixedBidValid = true;
            }
            /** Tables 
            * 
           */
            const workerInfoControl = this.newRFEDocument.get('workerInfo');
            if ((workerInfoControl.invalid)) {
                this.specificErrorMessagesContainer.push(AppConstant.workerInformationInvalidForContainer);
                this.workerRowsToAddMsg = AppConstant.tableRequiredMsg;
                this.workerRowsToAddValid = true;
            }
            const projectTitleControl = this.newRFEDocument.get('projectTitle');
            if ((projectTitleControl.invalid)) {
                this.specificErrorMessagesContainer.push(AppConstant.projectTitleInvalidForContainer);
                this.projectTitleMsg = AppConstant.projectTitleRequiredMessage;
                this.projectTitleValid = true;
            }
            const descAllServeControl = this.newRFEDocument.get('serviceDescription');
            if ((descAllServeControl.invalid)) {
                this.specificErrorMessagesContainer.push(AppConstant.descriptionOfServicesInvalidForContainer);
                this.descAllServeMsg = AppConstant.descAllServeRequiredMessage;
                this.descAllServeValid = true;
            }
            /** Tables 
            * 
           */
            const acctInfoControl = this.newRFEDocument.get('acctInfo');
            if ((acctInfoControl.invalid)) {
                this.specificErrorMessagesContainer.push(AppConstant.accountingInformationInvalidForContainer);
                this.percentMsg = AppConstant.tableRequiredMsg;
                this.percentValid = true;
            }
            const approvalControl = this.newRFEDocument.get('approval');
            if ((approvalControl.invalid) && (approverCheckForSelfTag)) {
                this.specificErrorMessagesContainer.push(AppConstant.approverNameInvalidForContainer);
                this.approvalMsg = AppConstant.tableRequiredMsg;
                this.approvalValid = true;
            }
            const infoCopyControl = this.newRFEDocument.get('informationalCopy');
            if ((infoCopyControl.invalid)) {
                this.infoMsg = AppConstant.tableRequiredMsg;
                this.infoValid = true;
            }
            this.isDisable = false;
            return false;

        } else if (this.projectCoordinatorNameNotAvailable || !distributionCheck || this.approvalAmount === 0 || this.approverLimitValid || this.validateAccountingTable.accountInValid || this.validateAccountingTable.costCenterInValid || this.inforNameNotAvailable) {
            if (this.projectCoordinatorNameNotAvailable) {
                this.specificErrorMessagesContainer.push(AppConstant.projectCoordinatorInvalidForContainer);
            }
            if (this.approvalAmount === 0) {
                this.specificErrorMessagesContainer.push(AppConstant.approvalAmountZero);
                this.approvalAmountZeroValid = true;
                this.approvalAmountZeroMsg = AppConstant.approvalAmountZero;
            } else {
                this.approvalAmountZeroValid = false;
            }
            if (this.validateAccountingTable.costCenterInValid) {
                this.specificErrorMessagesContainer.push(AppConstant.inValidCostCenterForContainer);
                this.percentValid = true;
                if (!distributionCheck) {
                    this.percentMsg = AppConstant.inValidCostCenter + '. ' + this.percentMsg + '.';
                } else {
                    this.percentMsg = AppConstant.inValidCostCenter;
                }
            }
            if (this.validateAccountingTable.accountInValid) {
                this.specificErrorMessagesContainer.push(AppConstant.inValidAccountNumberForContainer);
                this.percentValid = true;
                if (!distributionCheck || this.validateAccountingTable.costCenterInValid) {
                    if (this.validateAccountingTable.costCenterInValid && distributionCheck) {
                        this.percentMsg = AppConstant.inValidAccountNumberAndCostCenter;
                    } else {
                        this.percentMsg = AppConstant.inValidAccountNumber + '. ' + this.percentMsg + '.';
                    }
                } else {
                    this.percentMsg = AppConstant.inValidAccountNumber;
                }
            }
            if (this.approverLimitValid) {
                this.specificErrorMessagesContainer.push(AppConstant.approvalLimitMessage);
            }
            if (this.inforNameNotAvailable) {
                this.specificErrorMessagesContainer.push(AppConstant.informationalCopyInvalidForContainer);
            }

            this.isDisable = false;
            return false;
        } else if (form.valid) {
            return true;
        }
    }
    /** On submit check of Account Number
     * 
    */
    validateAccountingInformation(): { [key: string]: any } {
        this.accountNoInValid = false;
        this.costCenterInValid = false;
        let traverse: number = 0;
        let accountFlag: boolean = false;
        let costCenterFlag: boolean = false;
        let accountInValidoccurances: number[] = [];
        let costCenterInValidoccurances: number[] = [];
        let currentLength = this.newRFEDocument.getRawValue().acctInfo.length;
        while (traverse < currentLength) {
            if (this.newRFEDocument.getRawValue().acctInfo[traverse].account) {
                if (!this.accountNoDataList.includes(+this.newRFEDocument.getRawValue().acctInfo[traverse].account)) {
                    accountFlag = true;
                    accountInValidoccurances.push(traverse);
                }
            }
            if (this.newRFEDocument.getRawValue().acctInfo[traverse].dept) {
                if (!this.costCenterDataList.includes(+this.newRFEDocument.getRawValue().acctInfo[traverse].dept)) {
                    costCenterFlag = true;
                    costCenterInValidoccurances.push(traverse);
                }
            }
            traverse++;
        }
        return { 'accountInValid': accountFlag, 'accountInValidOccurance': accountInValidoccurances, 'costCenterInValid': costCenterFlag, 'costCenterInValidOccurance': costCenterInValidoccurances };
    }
    /** On submit check of distribution % for 100% 
     * 
    */
    submitDistributionCheck(): boolean {
        let traverse: number = 0;
        let submitDistributionSum: number = 0;
        let flag: number = 0;
        let currentLength = this.newRFEDocument.getRawValue().acctInfo.length;
        while (traverse < currentLength) {
            if (+this.newRFEDocument.getRawValue().acctInfo[traverse].distribution == 0) {
                flag = 1;
            }
            if (this.newRFEDocument.getRawValue().acctInfo[traverse].distribution) {
                let currentValue = +this.newRFEDocument.getRawValue().acctInfo[traverse].distribution;
                submitDistributionSum = submitDistributionSum + currentValue;
                let submitDistributionSumAsString = submitDistributionSum.toString();
                submitDistributionSum = +parseFloat(submitDistributionSumAsString).toFixed(2);
            }
            traverse++;
        }
        if (submitDistributionSum == 100) {
            this.percentValid = false;
            return true;
        } else if (flag === 1 || submitDistributionSum != 100) {
            if (flag === 1) {
                this.percentMsg = AppConstant.submitCheckOfDistributionForZero;
                this.percentValid = true;
                this.specificErrorMessagesContainer.push(AppConstant.submitCheckOfDistributionForZero);
            }
            if (submitDistributionSum != 100) {
                if (flag) {
                    this.percentMsg = AppConstant.submitCheckOfDistribution + '. And also ' + AppConstant.submitCheckOfDistributionForZero;
                } else {
                    this.percentMsg = AppConstant.submitCheckOfDistribution;
                }
                this.percentValid = true;
                this.specificErrorMessagesContainer.push(AppConstant.submitCheckOfDistribution);
            }
            return false;
        }
    }
    /** On submit check of approver
    * 
   */
    validateApprover() {
        let i = 0;
        const ctrl = <FormArray>this.newRFEDocument.controls['approval'];
        let valid: boolean = true;
        ctrl.controls.forEach((field) => {
            let personId = field.get('personId').value;
            if (this.userId === personId) {
                this.approvalNameCheckMsg = AppConstant.selfApproverNameMatch;
                this.approvalNameCheck = true;
                this.approvalPMsg = i;
                field.get('approvalName').setValue('');
                field.get('personId').setValue('');
                valid = false;
            }
            i++;
        });
        return valid
    }
    /** Get raw values from new form 
     * 
    */
    getFormValues() {
        let corpsData = this.newRFEDocument.getRawValue();
        let corpsRFE = new CorpsRFE();
        let bidMaster = new BidMaster();
        let statusMaster = new StatusMaster();
        let providerMaster = new ProviderMaster();
        let requesterPerson = new User();
        let siteContactPin = new User();
        let projectCoordinator = new User();
        requesterPerson.personId = this.userId;
        /**From Session
         * 
         */
        corpsRFE.requesterPerson = requesterPerson;
        corpsRFE.createdPersonId = this.userId;
        corpsRFE.modifiedPersonId = this.userId;
        corpsRFE.createdDate = new Date();
        corpsRFE.modifiedDate = new Date();
        /** By Default
               * 
               */
        statusMaster.statusId = 2;
        statusMaster.statusName = "Not Submitted";
        corpsRFE.statusMaster = statusMaster;
        /**From form
          * 
          */
        corpsRFE.corpPSReqNum = corpsData.psReqNumber;
        if (corpsData.rfeNum)
            corpsRFE.rfeNum = +corpsData.rfeNum;

        if (corpsData.personID != "" && corpsData.personID !== null) {
            siteContactPin.personId = corpsData.personID;
            corpsRFE.siteContactPin = siteContactPin;
        }
        if (corpsData.coordinatorPersonID != "" && corpsData.coordinatorPersonID != null) {
            projectCoordinator.personId = corpsData.coordinatorPersonID;
            corpsRFE.projectCoordinator = projectCoordinator;
        }
        if (corpsData.projectTitle != "" && corpsData.projectTitle !== null) {
            corpsRFE.projectTitle = corpsData.projectTitle;
        }
        bidMaster.bidId = +corpsData.bid;
        if (corpsData.bid == '1') {
            bidMaster.bidName = "Hourly";
        } else if (corpsData.bid == '2') {
            bidMaster.bidName = "Fixed";
        }
        corpsRFE.bidMaster = bidMaster;
        if (corpsData.supplierBase != "" && corpsData.supplierBase !== null) {
            providerMaster.providerId = corpsData.supplierBase;
            providerMaster.providerName = corpsData.orderFrom;
            corpsRFE.providerMaster = providerMaster;
        }
        if (corpsData.startDate === null || corpsData.startDate === "" || corpsData.startDate === undefined) {
            corpsRFE.startDate = null;
        } else {
            corpsRFE.startDate = new Date(corpsData.startDate);
        }
        if (corpsData.completionDate === undefined || corpsData.completionDate === null || corpsData.completionDate === "") {
            corpsRFE.completionDate = null;
        } else {
            corpsRFE.completionDate = new Date(corpsData.completionDate);
        }
        if (corpsData.additionalExpenses != "" && corpsData.additionalExpenses !== null) {
            let latestAddExpensesNumberValue;
            if (isNaN(corpsData.additionalExpenses)) {
                let FullCurrentAddExpensesValueAsString = corpsData.additionalExpenses.trim().replace(/,/gi, '');
                latestAddExpensesNumberValue = +FullCurrentAddExpensesValueAsString;
            } else {
                latestAddExpensesNumberValue = +corpsData.additionalExpenses;
            }
            corpsRFE.expenses = latestAddExpensesNumberValue;
        }
        corpsRFE.approvedAmount = this.approvalAmount;
        /** From form
        * 
        */
        if (corpsData.comments != "" && corpsData.comments !== null) {
            corpsRFE.comments = corpsData.comments;
        }
        if (corpsData.serviceDescription != "" && corpsData.serviceDescription !== null) {
            corpsRFE.projectDesc = corpsData.serviceDescription;
        }
        if (corpsData.fixedBidAmount != "" && corpsData.fixedBidAmount !== null) {
            let latestfixedBidNumberValue;
            if (isNaN(corpsData.fixedBidAmount)) {
                let FullCurrentfixedBidValueAsString = corpsData.fixedBidAmount.trim().replace(/,/gi, '');
                latestfixedBidNumberValue = +FullCurrentfixedBidValueAsString;
            } else {
                latestfixedBidNumberValue = +corpsData.fixedBidAmount;
            }
            corpsRFE.fixedBidAmount = latestfixedBidNumberValue;
        }
        /** Table
          * 
          */
        /** Worker information table
         * 
         */
        let i = 0;
        let rawWorkerInformation = corpsData.workerInfo;
        rawWorkerInformation = rawWorkerInformation.map(field => {
            let latestRateNumberValue;
            if (isNaN(field.rate)) {
                let FullCurrentRateValueAsString = field.rate.trim().replace(/,/gi, '');
                latestRateNumberValue = +FullCurrentRateValueAsString;
            } else {
                latestRateNumberValue = +field.rate;
            }
            return {
                orderSeq: ++i,
                corpWorkerId: field.corpWorkerId,
                resourceTitle: field.resourceTitle,
                estimatedHours: +field.estHours,
                rate: latestRateNumberValue,
                createdPersonId: this.userId,
                createdDate: new Date(),
                modifiedPersonId: this.userId,
                modifiedDate: new Date(),
            };
        });
        corpsRFE.workerInformation = rawWorkerInformation;

        /** Accounting information table
         * 
         */
        let j = 0;
        let rawAccountingInformation = corpsData.acctInfo;
        rawAccountingInformation = rawAccountingInformation.map(field => {
            let acctId = new accountIdClass();
            let deptId = new departmentIdClass();
            if ((field.account == "" || field.account == null) && (field.dept != "" && field.dept != null)) {
                deptId.departmentId = field.dept;
                return {
                    orderSeq: ++j,
                    corpAccountId: field.corpAccountId,
                    departmentMaster: deptId,
                    wbs: field.wbs,
                    accountFields: field.accountFields,
                    distributionPer: +field.distribution,
                    createdPersonId: this.userId,
                    createdDate: new Date(),
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else if ((field.account != "" && field.account != null) && (field.dept == "" || field.dept == null)) {
                acctId.accountId = field.account;
                return {
                    orderSeq: ++j,
                    corpAccountId: field.corpAccountId,
                    accountMaster: acctId,
                    wbs: field.wbs,
                    accountFields: field.accountFields,
                    distributionPer: +field.distribution,
                    createdPersonId: this.userId,
                    createdDate: new Date(),
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else if ((field.account == "" || field.account == null) && (field.dept == "" || field.dept == null)) {
                return {
                    orderSeq: ++j,
                    corpAccountId: field.corpAccountId,
                    wbs: field.wbs,
                    accountFields: field.accountFields,
                    distributionPer: +field.distribution,
                    createdPersonId: this.userId,
                    createdDate: new Date(),
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else {
                acctId.accountId = field.account;
                deptId.departmentId = field.dept;
                return {
                    orderSeq: ++j,
                    corpAccountId: field.corpAccountId,
                    accountMaster: acctId,
                    departmentMaster: deptId,
                    wbs: field.wbs,
                    accountFields: field.accountFields,
                    distributionPer: +field.distribution,
                    createdPersonId: this.userId,
                    createdDate: new Date(),
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            }
        });
        corpsRFE.accountingInformation = rawAccountingInformation;

        /** Approver information table
       * 
       */
        let k = 0;
        let rawApproverInformation = corpsData.approval;
        rawApproverInformation = rawApproverInformation.map(field => {
            let apprPin = new User();
            if (field.personId != "" && field.personId != null) {
                apprPin.personId = field.personId;
                return {
                    orderSeq: ++k,
                    corpApproverId: field.corpApproverId,
                    approverPin: apprPin,
                    approverComments: null,
                    approverAction: null,
                    actionDate: null,
                    createdPersonId: this.userId,
                    createdDate: new Date(),
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else if (field.personId == "" || field.personId == null) {
                return {
                    orderSeq: ++k,
                    corpApproverId: field.corpApproverId,
                    approverComments: null,
                    approverAction: null,
                    actionDate: null,
                    createdPersonId: this.userId,
                    createdDate: new Date(),
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else {
                return null;
            }
        });
        rawApproverInformation = rawApproverInformation.filter(result => {
            if (result === null)
                return false;
            else
                return true;
        })
        corpsRFE.approverInformation = rawApproverInformation;

        /**Informational copy table
         * 
         */
        let l = 0;
        let rawInformationalCopy = corpsData.informationalCopy;
        rawInformationalCopy = rawInformationalCopy.map(field => {
            let informerId = new User();
            if (field.infoPersonId != "" && field.infoPersonId != null) {
                informerId.personId = field.infoPersonId;
                return {
                    orderSeq: ++l,
                    infoId: field.infoId,
                    informationPersonId: informerId,
                    createdPersonId: this.userId,
                    createdDate: new Date(),
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else if (field.infoPersonId == "" || field.infoPersonId == null) {
                return {
                    orderSeq: ++l,
                    infoId: field.infoId,
                    createdPersonId: this.userId,
                    createdDate: new Date(),
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else {
                return null;
            }
        });

        rawInformationalCopy = rawInformationalCopy.filter(result => {
            if (result === null)
                return false;
            else
                return true;
        });

        corpsRFE.informationalCopyInformation = rawInformationalCopy;

        corpsData = corpsRFE;

        return corpsRFE;
    }

    /**Get raw values from updated rfe form
     * 
     * @param formData 
     */
    getFormNewValues(formData: CorpsRFE) {
        let corpsData = this.newRFEDocument.getRawValue();
        let corpsRFE = new CorpsRFE();
        let bidMaster = new BidMaster();
        let statusMaster = new StatusMaster();
        let providerMaster = new ProviderMaster();
        let requesterPerson = new User();
        let siteContactPin = new User();
        let projectCoordinator = new User();
        /**From Session
        * 
        */
        requesterPerson = formData.requesterPerson;
        let oldCreatedPersonId = requesterPerson.personId;
        let oldCreatedDate = formData.createdDate;

        corpsRFE.requesterPerson = requesterPerson;
        corpsRFE.createdPersonId = oldCreatedPersonId;
        corpsRFE.createdDate = oldCreatedDate;
        corpsRFE.modifiedPersonId = this.userId;
        corpsRFE.modifiedDate = new Date();
        /** By Default
           * 
           */
        statusMaster.statusId = 2;
        statusMaster.statusName = "Not Submitted";
        corpsRFE.statusMaster = statusMaster;
        /** From form
             * 
             */
        corpsRFE.corpPSReqNum = corpsData.psReqNumber;
        if (corpsData.rfeNum)
            corpsRFE.rfeNum = +corpsData.rfeNum;
        corpsRFE.docId = formData.docId;

        if (corpsData.personID != "" && corpsData.personID != null) {
            siteContactPin.personId = corpsData.personID;
            corpsRFE.siteContactPin = siteContactPin;
        }
        if (corpsData.coordinatorPersonID != "" && corpsData.coordinatorPersonID != null) {
            projectCoordinator.personId = corpsData.coordinatorPersonID;
            corpsRFE.projectCoordinator = projectCoordinator;
        }
        if (corpsData.projectTitle != "" && corpsData.projectTitle != null) {
            corpsRFE.projectTitle = corpsData.projectTitle;
        }
        bidMaster.bidId = +corpsData.bid;
        if (corpsData.bid == '1') {
            bidMaster.bidName = "Hourly";
        } else if (corpsData.bid == '2') {
            bidMaster.bidName = "Fixed";
        }
        corpsRFE.bidMaster = bidMaster;
        if (corpsData.supplierBase != "" && corpsData.supplierBase != null) {
            providerMaster.providerId = corpsData.supplierBase;
            providerMaster.providerName = corpsData.orderFrom;
            corpsRFE.providerMaster = providerMaster;
        }
        if (corpsData.startDate === null) {
            corpsRFE.startDate = null;
        } else {
            corpsRFE.startDate = new Date(corpsData.startDate);
        }
        if (corpsData.completionDate === null) {
            corpsRFE.completionDate = null;
        } else {
            corpsRFE.completionDate = new Date(corpsData.completionDate);
        }
        if (corpsData.additionalExpenses != "" && corpsData.additionalExpenses != null) {
            let latestAddExpensesNumberValue;
            if (isNaN(corpsData.additionalExpenses)) {
                let FullCurrentAddExpensesValueAsString = corpsData.additionalExpenses.trim().replace(/,/gi, '');
                latestAddExpensesNumberValue = +FullCurrentAddExpensesValueAsString;
            } else {
                latestAddExpensesNumberValue = +corpsData.additionalExpenses;
            }
            corpsRFE.expenses = latestAddExpensesNumberValue;
        }
        corpsRFE.approvedAmount = this.approvalAmount;
        /** From form
          * 
          */
        if (corpsData.comments != "" && corpsData.comments != null) {
            corpsRFE.comments = corpsData.comments;
        }
        if (corpsData.serviceDescription != "" && corpsData.serviceDescription != null) {
            corpsRFE.projectDesc = corpsData.serviceDescription;
        }
        if (corpsData.fixedBidAmount != "" && corpsData.fixedBidAmount != null) {
            let latestfixedBidNumberValue;
            if (isNaN(corpsData.fixedBidAmount)) {
                let FullCurrentfixedBidValueAsString = corpsData.fixedBidAmount.trim().replace(/,/gi, '');
                latestfixedBidNumberValue = +FullCurrentfixedBidValueAsString;
            } else {
                latestfixedBidNumberValue = +corpsData.fixedBidAmount;
            }
            corpsRFE.fixedBidAmount = latestfixedBidNumberValue;
        }
        /** Table
          * 
          */
        /** Worker information table
         * 
         */
        let i = 0;
        let rawWorkerInformation = corpsData.workerInfo;
        rawWorkerInformation = rawWorkerInformation.map(field => {
            let latestRateNumberValue;
            if (isNaN(field.rate)) {
                let FullCurrentRateValueAsString = field.rate.trim().replace(/,/gi, '');
                latestRateNumberValue = +FullCurrentRateValueAsString;
            } else {
                latestRateNumberValue = +field.rate;
            }
            return {
                orderSeq: ++i,
                corpWorkerId: field.corpWorkerId,
                resourceTitle: field.resourceTitle,
                estimatedHours: +field.estHours,
                rate: latestRateNumberValue,
                createdPersonId: oldCreatedPersonId,
                createdDate: oldCreatedDate,
                modifiedPersonId: this.userId,
                modifiedDate: new Date(),
            };
        });
        corpsRFE.workerInformation = rawWorkerInformation;

        /**Accounting information table
        * 
        */
        let j = 0;
        let rawAccountingInformation = corpsData.acctInfo;
        rawAccountingInformation = rawAccountingInformation.map(field => {
            let acctId = new accountIdClass();
            let deptId = new departmentIdClass();
            if ((field.account == "" || field.account == null) && (field.dept != "" && field.dept != null)) {
                deptId.departmentId = field.dept;
                return {
                    orderSeq: ++j,
                    corpAccountId: field.corpAccountId,
                    departmentMaster: deptId,
                    wbs: field.wbs,
                    accountFields: field.accountFields,
                    distributionPer: +field.distribution,
                    createdPersonId: oldCreatedPersonId,
                    createdDate: oldCreatedDate,
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else if ((field.account != "" && field.account != null) && (field.dept == "" || field.dept == null)) {
                acctId.accountId = field.account;
                return {
                    orderSeq: ++j,
                    corpAccountId: field.corpAccountId,
                    accountMaster: acctId,
                    wbs: field.wbs,
                    accountFields: field.accountFields,
                    distributionPer: +field.distribution,
                    createdPersonId: oldCreatedPersonId,
                    createdDate: oldCreatedDate,
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else if ((field.account == "" || field.account == null) && (field.dept == "" || field.dept == null)) {
                return {
                    orderSeq: ++j,
                    corpAccountId: field.corpAccountId,
                    wbs: field.wbs,
                    accountFields: field.accountFields,
                    distributionPer: +field.distribution,
                    createdPersonId: oldCreatedPersonId,
                    createdDate: oldCreatedDate,
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else {
                acctId.accountId = field.account;
                deptId.departmentId = field.dept;
                return {
                    orderSeq: ++j,
                    corpAccountId: field.corpAccountId,
                    accountMaster: acctId,
                    departmentMaster: deptId,
                    wbs: field.wbs,
                    accountFields: field.accountFields,
                    distributionPer: +field.distribution,
                    createdPersonId: oldCreatedPersonId,
                    createdDate: oldCreatedDate,
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            }
        });
        corpsRFE.accountingInformation = rawAccountingInformation;

        /** Approver information table
         * 
         */
        let k = 0;
        let rawApproverInformation = corpsData.approval;
        rawApproverInformation = rawApproverInformation.map(field => {
            let apprPin = new User();
            if (field.personId != "" && field.personId != null) {
                apprPin.personId = field.personId;
                return {
                    orderSeq: ++k,
                    corpApproverId: field.corpApproverId,
                    approverPin: apprPin,
                    approverComments: null,
                    approverAction: null,
                    actionDate: null,
                    createdPersonId: oldCreatedPersonId,
                    createdDate: oldCreatedDate,
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else if (field.personId == "" || field.personId == null) {
                return {
                    orderSeq: ++k,
                    corpApproverId: field.corpApproverId,
                    approverComments: null,
                    approverAction: null,
                    actionDate: null,
                    createdPersonId: oldCreatedPersonId,
                    createdDate: oldCreatedDate,
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else {
                return null;
            }
        });
        rawApproverInformation = rawApproverInformation.filter(result => {
            if (result === null)
                return false;
            else
                return true;
        })
        corpsRFE.approverInformation = rawApproverInformation;

        /** Informational copy table
       * 
       */
        let l = 0;
        let rawInformationalCopy = corpsData.informationalCopy;
        rawInformationalCopy = rawInformationalCopy.map(field => {
            let informerId = new User();
            if (field.infoPersonId != "" && field.infoPersonId != null) {
                informerId.personId = field.infoPersonId;
                return {
                    orderSeq: ++l,
                    infoId: field.infoId,
                    informationPersonId: informerId,
                    createdPersonId: oldCreatedPersonId,
                    createdDate: oldCreatedDate,
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else if (field.infoPersonId == "" || field.infoPersonId == null) {
                return {
                    orderSeq: ++l,
                    infoId: field.infoId,
                    createdPersonId: this.userId,
                    createdDate: new Date(),
                    modifiedPersonId: this.userId,
                    modifiedDate: new Date(),
                };
            } else {
                return null;
            }
        });

        rawInformationalCopy = rawInformationalCopy.filter(result => {
            if (result === null)
                return false;
            else
                return true;
        });

        corpsRFE.informationalCopyInformation = rawInformationalCopy;

        corpsData = corpsRFE;

        return corpsRFE;
    }

    /**Save as draft
     * 
     * @param form 
     * @param oldData 
     */
    saveAsDraft(form, oldData, isSavedTheApprovedForm: boolean) {
        this.toastSuccess = "RFE Saved Successfully";
        this.toastError = "RFE is not Saved";
        this.newRFEDocument.get('siteContactName').clearValidators();
        this.newRFEDocument.get('siteContactName').updateValueAndValidity();
        this.newRFEDocument.get('orderFrom').clearValidators();
        this.newRFEDocument.get('orderFrom').updateValueAndValidity();
        this.newRFEDocument.get('startDate').clearValidators();
        this.newRFEDocument.get('startDate').updateValueAndValidity();
        this.newRFEDocument.get('completionDate').clearValidators();
        this.newRFEDocument.get('completionDate').updateValueAndValidity();
        this.newRFEDocument.get('projectTitle').clearValidators();
        this.newRFEDocument.get('projectTitle').updateValueAndValidity();
        this.newRFEDocument.get('serviceDescription').clearValidators();
        this.newRFEDocument.get('serviceDescription').updateValueAndValidity();
        const typeOfBidControl = this.newRFEDocument.get('bid');
        if (typeOfBidControl.value === '2') {
            this.newRFEDocument.get('fixedBidAmount').clearValidators();
            this.newRFEDocument.get('fixedBidAmount').updateValueAndValidity();
        } else {
            let workerCurrentLength = +(this.newRFEDocument.get('workerInfo').value.length);
            for (let i = 0; i < workerCurrentLength; i++) {
                this.newRFEDocument.get(['workerInfo', i, 'estHours']).clearValidators();
                this.newRFEDocument.get(['workerInfo', i, 'estHours']).updateValueAndValidity();
                this.newRFEDocument.get(['workerInfo', i, 'rate']).clearValidators();
                this.newRFEDocument.get(['workerInfo', i, 'rate']).updateValueAndValidity();
            }
        }
        let accountingInfoLength = +(this.newRFEDocument.get('acctInfo').value.length);
        for (let i = 0; i < accountingInfoLength; i++) {
            this.newRFEDocument.get(['acctInfo', i, 'distribution']).clearValidators();
            this.newRFEDocument.get(['acctInfo', i, 'distribution']).updateValueAndValidity();
        }
        let approvalLength = +(this.newRFEDocument.get('approval').value.length);
        for (let i = 0; i < approvalLength; i++) {
            this.newRFEDocument.get(['approval', i, 'approvalName']).clearValidators();
            this.newRFEDocument.get(['approval', i, 'approvalName']).updateValueAndValidity();
        }

        if (this.checkAccountingInformationSaveAsDraft()) {
            let corpsRFE = new CorpsRFE();
            if (this.input === "renewal") {
                corpsRFE = this.getFormValues();
                let statusMaster = new StatusMaster();
                statusMaster.statusId = 2;
                statusMaster.statusName = "Not Submitted";

                corpsRFE.statusMaster = statusMaster;
                corpsRFE.renewedRfeNum = '' + corpsRFE.rfeNum;
                let approverInfo = corpsRFE.approverInformation;

                for (let approver of approverInfo) {
                    approver.corpApproverId = null;
                    approver.createdPersonId = this.userId;
                    approver.createdDate = new Date();
                    approver.modifiedPersonId = this.userId;
                    approver.modifiedDate = new Date();
                }
                corpsRFE.approverInformation = approverInfo;

                type MyArrayType = Array<ActivityLog>;
                let currentUser = new User;
                currentUser.personId = this.userId;
                const currentActivity: MyArrayType = [
                    { logAction: "Saved as draft", logPersonPin: currentUser, logDesc: "Renewed and saved as draft", logActionDate: new Date() }
                ];
                corpsRFE.activityLogInformation = currentActivity;

                this.saveCorpsErfe(corpsRFE);
                return true;

            }
            else if (this.action === undefined && this.input === undefined) {
                corpsRFE = this.getFormValues();
                let statusMaster = new StatusMaster();
                statusMaster.statusId = 2;
                statusMaster.statusName = "Not Submitted";
                corpsRFE.statusMaster = statusMaster;
                type MyArrayType = Array<ActivityLog>;
                let currentUser = new User;
                currentUser.personId = this.userId;
                const currentActivity: MyArrayType = [
                    { logAction: "Saved as draft", logPersonPin: currentUser, logDesc: "Created a new form and saved as draft", logActionDate: new Date() }
                ];
                corpsRFE.activityLogInformation = currentActivity;
                this.saveCorpsErfe(corpsRFE);
            }
            else {
                corpsRFE = this.getFormNewValues(oldData);

                if (isSavedTheApprovedForm) {
                    this.adminEditUpdateAddRowButtonShow = false;
                    this.toastSuccess = "RFE is updated Successfully(Admin Only)";
                    this.toastError = "RFE is not updated";

                    let statusMaster = new StatusMaster();
                    statusMaster.statusId = 3;
                    statusMaster.statusName = "Approved";
                    corpsRFE.statusMaster = statusMaster;

                    let currentUser = new User;
                    currentUser.personId = this.userId;
                    let currentActivity: Array<ActivityLog>;
                    currentActivity = [
                        { logAction: "Updated", logPersonPin: currentUser, logDesc: "Edited and Updated an Approved Form (Admin Access Only)", logActionDate: new Date() }
                    ];

                    corpsRFE.activityLogInformation = currentActivity;
                } else {

                    let statusMaster = new StatusMaster();
                    statusMaster.statusId = 2;
                    statusMaster.statusName = "Not Submitted";
                    corpsRFE.statusMaster = statusMaster;

                    let CreaterPerson = corpsRFE.requesterPerson;
                    let savedAsDraftFlag = 0;
                    let corpLogIdToBeUpdated;
                    let oldActivityLogInformation: ActivityLog[] = JSON.parse(JSON.stringify(oldData.activityLogInformation));
                    if (oldActivityLogInformation.length > 0) {
                        if ((oldActivityLogInformation[oldActivityLogInformation.length - 1].logAction.toLowerCase() === 'saved as draft' || oldActivityLogInformation[oldActivityLogInformation.length - 1].logAction === 'Saved as draft') && (oldActivityLogInformation[oldActivityLogInformation.length - 1].logDesc.trim().substring(0, 7) === 'Updated')) {
                            if (savedAsDraftFlag === 0) {
                                corpLogIdToBeUpdated = oldActivityLogInformation[oldActivityLogInformation.length - 1].corpLogId;
                                savedAsDraftFlag = 1;
                            }
                        }
                    }
                    if (this.userRole === "Admin" && this.userId != CreaterPerson.personId) {
                        let userName;
                        userName = CreaterPerson.personFirstName + ' ' + CreaterPerson.personMiddleName + ' ' + CreaterPerson.personLastName;
                        let currentUser = new User;
                        currentUser.personId = this.userId;
                        let currentActivity: Array<ActivityLog>;
                        if (savedAsDraftFlag) {
                            currentActivity = [
                                { corpLogId: corpLogIdToBeUpdated, logAction: "Saved as draft", logPersonPin: currentUser, logDesc: "Updated and saved as draft on behalf of " + userName, logActionDate: new Date() }
                            ];
                        } else {
                            currentActivity = [
                                { logAction: "Saved as draft", logPersonPin: currentUser, logDesc: "Updated and saved as draft on behalf of " + userName, logActionDate: new Date() }
                            ];
                        }
                        corpsRFE.activityLogInformation = currentActivity;
                    } else {
                        let currentUser = new User;
                        currentUser.personId = this.userId;
                        let currentActivity: Array<ActivityLog>;
                        if (savedAsDraftFlag) {
                            currentActivity = [
                                { corpLogId: corpLogIdToBeUpdated, logAction: "Saved as draft", logPersonPin: currentUser, logDesc: "Updated and saved as draft", logActionDate: new Date() }
                            ];
                        } else {
                            currentActivity = [
                                { logAction: "Saved as draft", logPersonPin: currentUser, logDesc: "Updated and saved as draft", logActionDate: new Date() }
                            ];
                        }
                        corpsRFE.activityLogInformation = currentActivity;
                    }
                }

                this.updateCorpsErfe(corpsRFE);
            }
        }
        return true;
    }

    /**Submission of form
     * 
     * @param form 
     * @param oldData 
     */
    submitForm(form, oldData) {
        this.specificErrorMessagesContainer = [];
        this.toastSuccess = "RFE Submitted Successfully"
        this.toastError = "RFE Submit Failed"
        if (this.input === "renewal") {

            if (this.checkFormValidation(this.newRFEDocument)) {
                let corpsRFE = this.getFormValues();
                let statusMaster = new StatusMaster();
                //statusMaster.statusId = 3;
                //statusMaster.statusName = "Approved";
                statusMaster.statusId = 1;
                statusMaster.statusName = "Submitted";
                corpsRFE.statusMaster = statusMaster;
                corpsRFE.renewedRfeNum = '' + corpsRFE.rfeNum;
                let approverInfo = corpsRFE.approverInformation;

                for (let approver of approverInfo) {
                    approver.corpApproverId = null;
                    approver.createdPersonId = this.userId;
                    approver.createdDate = new Date();
                    approver.modifiedPersonId = this.userId;
                    approver.modifiedDate = new Date();
                }
                corpsRFE.approverInformation = approverInfo;

                type MyArrayType = Array<ActivityLog>;
                let currentUser = new User;
                currentUser.personId = this.userId;
                const currentActivity: MyArrayType = [
                    { logAction: "Submitted", logPersonPin: currentUser, logDesc: "Renewed and submitted RFE form", logActionDate: new Date() }
                ];
                corpsRFE.activityLogInformation = currentActivity;

                this.saveCorpsErfe(corpsRFE);
                return true;
            } else {
                this.requiredFullPop = true;
            }
        }
        else if (this.checkFormValidation(this.newRFEDocument)) {

            if ((this.action === undefined && this.input === undefined)) {
                let corpsRFE = this.getFormValues();
                let statusMaster = new StatusMaster();
                statusMaster.statusId = 1;
                statusMaster.statusName = "Submitted";
                corpsRFE.statusMaster = statusMaster;

                // if (this.userRole === "Admin") {
                //     let userName;
                //     userName = this.pendingApprovers[0].name;
                //     type MyArrayType = Array<ActivityLog>;
                //     let currentUser = new User;
                //     currentUser.personId = this.userId;
                //     const currentActivity: MyArrayType = [
                //         { logAction: "Submitted", logPersonPin: currentUser, logDesc: "Created and submitted a RFE form on behalf of " + userName, logActionDate: new Date() }
                //     ];
                //     corpsRFE.activityLogInformation = currentActivity;
                // } else {
                type MyArrayType = Array<ActivityLog>;
                let currentUser = new User;
                currentUser.personId = this.userId;
                const currentActivity: MyArrayType = [
                    { logAction: "Submitted", logPersonPin: currentUser, logDesc: "Created a new form and submitted", logActionDate: new Date() }
                ];
                corpsRFE.activityLogInformation = currentActivity;

                this.saveCorpsErfe(corpsRFE);
            }
            else {
                let corpsRFE = this.getFormNewValues(oldData);
                let statusMaster = new StatusMaster();
                statusMaster.statusId = 1;
                statusMaster.statusName = "Submitted";
                corpsRFE.statusMaster = statusMaster;
                let CreaterPerson = corpsRFE.requesterPerson;
                if (this.userRole === "Admin" && this.userId != CreaterPerson.personId) {
                    let userName;
                    userName = CreaterPerson.personFirstName + ' ' + CreaterPerson.personMiddleName + ' ' + CreaterPerson.personLastName;
                    type MyArrayType = Array<ActivityLog>;
                    let currentUser = new User;
                    currentUser.personId = this.userId;
                    const currentActivity: MyArrayType = [
                        { logAction: "Submitted", logPersonPin: currentUser, logDesc: "Submitted the RFE form on behalf of " + userName, logActionDate: new Date() }
                    ];
                    corpsRFE.activityLogInformation = currentActivity;

                } else {
                    type MyArrayType = Array<ActivityLog>;
                    let currentUser = new User;
                    currentUser.personId = this.userId;
                    const currentActivity: MyArrayType = [
                        { logAction: "Submitted", logPersonPin: currentUser, logDesc: "Submitted RFE form", logActionDate: new Date() }
                    ];
                    corpsRFE.activityLogInformation = currentActivity;
                }

                this.updateCorpsErfe(corpsRFE);

            }

            return true;
        }
        else {
            this.requiredFullPop = true;
            return false;
        }
    }
    /** Edit navigation
      * 
      */
    edit(isEditApprovedForm: boolean) {
        if (isEditApprovedForm) {
            this.adminEditInfoCopyLength = this.newRFEDocument.get('informationalCopy').value.length;
            this.newRFEDocument.get('informationalCopy').enable();
            this.adminEditUpdateAddRowButtonShow = true;
            for (let i = 0; i < this.adminEditInfoCopyLength; i++) {
                if (this.newRFEDocument.get(['informationalCopy', i]).value.infoName !== "") {
                    this.newRFEDocument.get(['informationalCopy', i]).disable();
                }
            }
            if (this.newRFEDocument.get(['informationalCopy']).disabled) {
                this.addInfoTable(1);
            }
            this.isDisable = false;
        } else {
            this.newRFEDocument.enable();
            this.isDisable = false;
        }
    }
    /**Saving data into db
     * 
     * @param corpsRFE 
     */
    saveCorpsErfe(corpsRFE) {
        if (this.attachments.length > 0) {
            corpsRFE.value.attachments = this.attachments;
        }
        this.busyLoading = this.corppsrfeService.corpsSave(corpsRFE, this.uploadedFiles, this.renewalAttachments, this.oldCorpReqNum).subscribe(value => {

            if (value) {

                this.toastr.success(this.toastSuccess, "Success");
                let status = corpsRFE.statusMaster;
                if (status.statusId === 2) {
                    if (corpsRFE.corpPSReqNum != value.text()) {
                        this.toastr.info("The PS Request number " + corpsRFE.corpPSReqNum + " is already taken by another document. The New PS Request Number : " + value.text(), "Info");
                    }
                    this.router.navigate(['new-rfe-document/corpReqNum/view', value.text()]);

                }
                else {
                    this.router.navigate(['home']);
                }
            }
        },
            (error: any) => {
                this.toastr.error(this.toastError, "Failed");
            });
        return true;
    }
    /**Update data in db
     * 
     * @param corpsRFE 
     */
    updateCorpsErfe(corpsRFE) {
        this.busyLoading = this.corppsrfeService.corpsUpdate(corpsRFE, this.uploadedFiles).subscribe(value => {
            let data = value.json();
            if (value) {
                this.toastr.success(this.toastSuccess, "Success");
            }
            let status = corpsRFE.statusMaster;
            if (status.statusId === 2) {
                this.ngOnInit();
            }
            else {
                this.router.navigate(['home']);
            }

        },
            (error: any) => {

                this.toastr.error(this.toastError, "Failed");
            });
        return true;
    }
    /**Update data in db
     * 
     * @param commentData 
     * @param data 
     * @param user 
     */
    approve(commentData, data: CorpsRFE, user) {
        this.toastSuccess = "RFE Approved Successfully"
        this.toastError = "RFE Approve Failed"
        this.formData = this.getFormNewValues(data);
        let comments = commentData.approveComments;
        let userId;
        let userName;
        let currentApproverId = user[0].code;
        userName = user[0].name;
        if (this.userRole === "Admin" && currentApproverId != this.userId) {

            userId = user[0].code;
            userName = user[0].name;

            type MyArrayType = Array<ActivityLog>;
            let currentUser = new User;
            currentUser.personId = this.userId;
            const currentActivity: MyArrayType = [
                { logAction: "Approved", logPersonPin: currentUser, logDesc: "Approved the request on behalf of " + userName, logActionDate: new Date() }
            ];
            this.formData.activityLogInformation = currentActivity;
        }
        else {
            userId = this.userId;
            type MyArrayType = Array<ActivityLog>;
            let currentUser = new User;
            currentUser.personId = this.userId;
            const currentActivity: MyArrayType = [
                { logAction: "Approved", logPersonPin: currentUser, logDesc: "Approved the request", logActionDate: new Date() }
            ];
            this.formData.activityLogInformation = currentActivity;
        }
        this.formData.approverInformation = data.approverInformation;

        let approverInfo = this.formData.approverInformation;
        let orderSeq;
        let approverOrderSeq;
        for (let approver of approverInfo) {
            let acct = approver.approverPin;
            if (approver.approverAction === null) {

                orderSeq = approver.orderSeq;
                break;

            }
        }
        for (let approver of approverInfo) {
            let acct = approver.approverPin;
            if (acct.personId == userId) {
                approver.actionDate = new Date();
                approver.approverComments = comments;
                approver.approverAction = "Approved";

                approverOrderSeq = approver.orderSeq;
                approver.modifiedPersonId = this.userId;
                approver.modifiedDate = new Date();
                break;
            }

        }
        let isApproved = approverInfo.filter(approver => {
            if (approver.approverAction === "Approved")
                return false
            else
                return true;
        })
        this.formData.approverInformation = approverInfo;
        if (isApproved.length === 0) {
            let statusMaster = new StatusMaster();
            statusMaster.statusId = 3;
            statusMaster.statusName = "Approved";
            this.formData.statusMaster = statusMaster;
        }
        else {
            let statusMaster = new StatusMaster();
            statusMaster.statusId = 1;
            statusMaster.statusName = "Submitted";
            this.formData.statusMaster = statusMaster;
        }
        if (orderSeq === approverOrderSeq) {
            this.updateCorpsErfe(this.formData);
            this.approveDisplay = !this.approveDisplay;
            /** AppConstant.reload = true;
            this.router.navigate(['/home']);
            window.location.reload();
            *
            */

        }
        else {
            this.approveDisplay = !this.approveDisplay;
            window.alert("Previous Approver is Not Approved")
        }
    }
    /**Update data in db
     * 
     * @param commentData 
     * @param data 
     * @param user 
     */
    reject(commentData, data: CorpsRFE, user) {
        this.toastSuccess = "RFE Rejected Successfully"
        this.toastError = "RFE Rejection Failed"
        this.formData = this.getFormNewValues(data);

        let comments = commentData.rejectComments;

        let userId;
        let userName;
        let currentApproverId = user[0].code;
        userName = user[0].name;
        if (this.userRole === "Admin" && currentApproverId != this.userId) {
            userId = user[0].code;
            userName = user[0].name;

            type MyArrayType = Array<ActivityLog>;
            let currentUser = new User;
            currentUser.personId = this.userId;
            const currentActivity: MyArrayType = [
                { logAction: "Rejected", logPersonPin: currentUser, logDesc: "Rejected the request on behalf of " + userName, logActionDate: new Date() }
            ];
            this.formData.activityLogInformation = currentActivity;

        } else {
            userId = this.userId;

            type MyArrayType = Array<ActivityLog>;
            let currentUser = new User;
            currentUser.personId = this.userId;
            const currentActivity: MyArrayType = [
                { logAction: "Rejected", logPersonPin: currentUser, logDesc: "Rejected the request", logActionDate: new Date() }
            ];
            this.formData.activityLogInformation = currentActivity;
        }
        this.formData.approverInformation = data.approverInformation;
        let approverInfo = this.formData.approverInformation;
        let orderSeq;
        let approverOrderSeq;

        for (let approver of approverInfo) {
            let acct = approver.approverPin;
            if (approver.approverAction === null) {
                orderSeq = approver.orderSeq;
                break;

            }
        }
        for (let approver of approverInfo) {
            let acct = approver.approverPin;
            if (acct.personId == userId) {
                approver.actionDate = new Date();
                approver.approverComments = comments;
                approver.approverAction = "Reject";
                approverOrderSeq = approver.orderSeq;
                approver.modifiedPersonId = this.userId;
                approver.modifiedDate = new Date();
                break;
            }
        }


        let isRejected = approverInfo.filter(approver => {
            if (approver.approverAction === "Reject")
                return true
            else
                return false;
        })
        this.formData.approverInformation = approverInfo;
        if (isRejected.length > 0) {

            let statusMaster = new StatusMaster();
            statusMaster.statusId = 4;
            statusMaster.statusName = "Rejected";
            this.formData.statusMaster = statusMaster;
        }

        if (orderSeq === approverOrderSeq) {
            this.updateCorpsErfe(this.formData);
            this.rejectDisplay = !this.rejectDisplay;
            /** AppConstant.reload = true;
            this.router.navigate(['/home']);
            *
            */
        }
        else {
            this.rejectDisplay = !this.rejectDisplay;
            window.alert("Previous Approver is Not Approved")
        }

    }
    retractAction(data: CorpsRFE) {
        this.retractDisplay = true;
    }

    /**Retract of submitted form 
     * 
     * @param data 
     */
    retract(data: CorpsRFE, comments: string, requestor: string) {
        this.toastSuccess = "RFE Retracted Successfully"
        this.toastError = "RFE Retraction Failed"
        this.retractDisplay = false;
        if (this.isAdmin && data.requesterPerson.personId != this.userId) {
            let requestors = data.requesterPerson;
            let name = ""
            if (requestors.personFirstName)
                name = name + requestors.personFirstName + " ";

            if (requestors.personMiddleName)
                name = name + requestors.personMiddleName + " ";

            if (requestors.personLastName)
                name = name + requestors.personLastName;

            type MyArrayType = Array<ActivityLog>;
            let currentUser = new User;
            currentUser.personId = this.userId;
            const currentActivity: MyArrayType = [
                { logAction: "Retracted", logPersonPin: currentUser, logDesc: "Retracted the form on behalf of " + name + ". Comments: " + comments, logActionDate: new Date() }
            ];
            data.activityLogInformation = currentActivity;

            let statusMaster = new StatusMaster();
            statusMaster.statusId = 2;
            statusMaster.statusName = "Not Submitted";
            data.statusMaster = statusMaster;
            this.updateCorpsErfe(data);
            /** window.location.reload();
             * 
             */
        }
        else {
            type MyArrayType = Array<ActivityLog>;
            let currentUser = new User;
            currentUser.personId = this.userId;
            const currentActivity: MyArrayType = [
                { logAction: "Retracted", logPersonPin: currentUser, logDesc: "Retracted the form. Comments: " + comments, logActionDate: new Date() }
            ];
            data.activityLogInformation = currentActivity;

            let statusMaster = new StatusMaster();
            statusMaster.statusId = 2;
            statusMaster.statusName = "Not Submitted";
            data.statusMaster = statusMaster;
            this.updateCorpsErfe(data);
            /** window.location.reload();
             * 
             */
        }
    }

    /**Renewal RFE Number Validation
     * 
     * @param rfeNumber 
     * @param corpReqNum 
     */
    renewalRFENumberValidation(rfeNumber, corpReqNum): void {
        if (rfeNumber) {
            this.renewalService.isPresentRfeNumberForRenwal(rfeNumber).subscribe({
                next: (data: Boolean) => {
                    if (data) {
                        this.rfeNumberExist = false;
                        this.renewal(rfeNumber, corpReqNum);
                    } else {
                        this.rfeNumberExist = true;
                    }
                },
                error: err => console.log(err)
            });
        }
    }
    /**Renewal form
     * 
     * @param value 
     * @param corpReqNum 
     */
    renewal(value, corpReqNum) {
        if (this.formStatus === "NEW") {
            this.renewalDisplay = !this.renewalDisplay;
            this.input = 'renewal';
            this.isDisable = true;
            this.isSave = false;
            this.isRenewal = true;
            this.oldCorpReqNum = '0';
            this.rfeNumber = value;
            this.formStatus = "Renewal For " + this.rfeNumber;
            this.rfeNoLabel = "Renewal For RFE No.";

            if (this.rfeNumber != undefined && this.rfeNumber != '0') {
                this.busyLoading = this.renewalService.getRenewForm(+this.rfeNumber).subscribe((renewal) => {
                    this.setRenewalValues(this.rfeNumber, this.oldCorpReqNum, new CorpsRFE(), renewal, this.corpReqNum);
                })
            }
        }
        else {
            this.router.navigate(['new-rfe-document/renewal/', corpReqNum, value]);
            this.renewalDisplay = !this.renewalDisplay;
        }
    }

    /** Close without saving navigation
     * 
     */
    closeWithoutSaving() {
        this.router.navigate(['/home'])
    }
    /** Print Functionality 
    * 
   */
    confirmPrint() {
        if (this.formStatus == 'NEW') {
            this.confirmPrintPopup = true;
        } else {
            this.confirmPrintPopup = false;
            this.print();
        }
    }
    cancelPrint() {
        this.confirmPrintPopup = false;
    }
    print() {
        let link = '/print-rfe-form/' + this.corpReqNum;
        this.datum.changeRFEDocContent(JSON.stringify(this.newRFEDocument.getRawValue()));
        this.datum.changeApprovalAmount(this.approvalAmount);
        this.datum.changeAttatchments(this.attachments);
        this.datum.changeRFEDocActivityLogContent(this.activityLogConstruct);
        this.datum.changeStatus(this.formStatus);
        this.router.navigate([link]);
    }

    /**file upload
     * 
     * @param event 
     */
    onFileError(event) {
        const index = this.uploadedFiles.indexOf(event.file, 0);
        if (index > -1) {
            this.uploadedFiles.splice(index, 1);
        }
    }
    /**
      * Upload selection
      * @param event 
      */
    onFileUpload(event) {
        for (let file of event.files) {
            let filename = file.name;
            if (filename.endsWith(".docx") || filename.endsWith(".doc") || filename.endsWith(".xlsx") ||
                filename.endsWith(".xls") || filename.endsWith(".ppt") || filename.endsWith(".pptx") ||
                filename.endsWith(".txt") || filename.endsWith(".pdf") || filename.endsWith(".zip") ||
                filename.endsWith(".msg") || /image\/?/.test(filename) ||
                filename.endsWith(".png") || filename.endsWith(".PNG") || filename.endsWith(".jpg")) {
                this.uploadedFiles.push(file);
                if (file.size <= 50000000) {
                    this.toastr.success("Upload Success", "Success");
                }
                else {
                    this.toastr.error("Upload Failed", "Failed")
                }
            }

        }
    }

    /**
     * Upload cancel
     * @param event 
     */
    onFileRemove(event) {
        const index = this.uploadedFiles.indexOf(event.file, 0);
        if (index > -1) {
            this.uploadedFiles.splice(index, 1);
            this.toastr.success("Removed Successfully", "Success");
        }
    }
    /**
     * Upload all clear
     */
    onAllFileClear() {
        this.uploadedFiles = [];
    }

    /**Delete File
     * 
     * @param id 
     * @param index 
     */
    deleteFile(id, index) {
        this.corppsrfeService.deleteAttachmentFile(id)
            .subscribe(
                (responseData) => {
                    this.attachments.splice(index, 1);
                    this.toastr.success("Deleted Successfully", "Success");
                },
                (error: any) => {

                    this.toastr.error("Delete Operation Failed", "Failed");
                });
    }
    /**
     * 
     * @param id 
     * @param index 
     */
    deleteRenewalAttachment(id, index) {
        this.renewalAttachments.splice(index, 1);
        this.toastr.success("Deleted Successfully", "Success");
    }
    /**Download file
     * 
     * @param name 
     */
    downloadFile(corpReqNum, name) {
        this.corppsrfeService.downloadAttachmentFile(corpReqNum, name)
            .subscribe(
                (responseData) => {
                    let headers = responseData.headers;
                    var fileType = headers.get("content-type");
                    const blob = new Blob([responseData._body], { type: fileType });
                    if (window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(blob, name);
                        window.navigator.msSaveOrOpenBlob(blob, name);
                    } else {
                        const url = window.URL.createObjectURL(blob);
                        var anchor = document.createElement("a");
                        anchor.setAttribute('download', name);
                        anchor.href = url;
                        anchor.click();
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
    /**
* Date and Time Formatting
* @param value 
* @param format 
*/
    transformWithHoursAndMinutes(value: any, format: string = "MM/DD/YYYY hh:mm A"): string {
        return moment(value).isValid() ? moment(value).format(format) : value;
    }

    setMaxMinDate() {
        let currentStartDate = this.newRFEDocument.controls.startDate.value;
        let currentCompletionDate = this.newRFEDocument.controls.completionDate.value;
        if (currentStartDate != null && currentStartDate != '') {
            let setMinDate = new Date(currentStartDate);
            this.minDate = new Date(setMinDate.setDate(setMinDate.getDate() + 1));
        }
        else {
            this.minDate = null;
        }
        if (currentCompletionDate != null && currentCompletionDate != '') {
            let setMaxDate = new Date(currentCompletionDate);
            this.maxDate = new Date(setMaxDate.setDate(setMaxDate.getDate() - 1));
        }
        else {
            this.maxDate = null;
        }
    }

    filterDataForAccountNumber: any[] = [];
    filterDataForCostCenter: any[] = [];
    filterAccount(event) {
        let query = event.query;
        this.filterDataForAccountNumber = [];
        this.accountNoDataList.forEach(data => {
            if (((data).toString()).indexOf(query) === 0) {
                this.filterDataForAccountNumber.push(data);
            }
        })
    }
    filterCostCenter(event) {
        let query = event.query;
        this.filterDataForCostCenter = [];
        this.costCenterDataList.forEach(data => {
            if (((data).toString()).indexOf(query) === 0) {
                this.filterDataForCostCenter.push(data);
            }
        })
    }
}
