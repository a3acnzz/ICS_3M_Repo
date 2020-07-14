import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../base/http.service';
import { UrlConstant } from "../../shared/constant/url.constant";
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class NewRfeDocumentService {

  private RFEDocumentContent = new BehaviorSubject(null);
  currentRFEDocumentContent = this.RFEDocumentContent.asObservable();
  private approvalAmount = new BehaviorSubject(0);
  currentApprovalAmount = this.approvalAmount.asObservable();
  private attatchment = new BehaviorSubject(null);
  currentAttatchment = this.attatchment.asObservable();
  private activityLog = new BehaviorSubject(null);
  currentActivityLog = this.activityLog.asObservable();
  private status = new BehaviorSubject(null);
  currentStatus = this.status.asObservable();


  constructor(private httpService: HttpService) { }
/**
 * get provider(supplier) details
 */
  getProviderMaster(base:string,supplierName:string) {
    const params: any = {base:base,supplierName:supplierName};
    return this.httpService.get(UrlConstant.getproviderMaster, params)
  }
  /**
   * get department details list
   */
  getdepartmentMaster(cost:string,costDesc:string) {
    const params: any = {cost:cost,costDesc:costDesc};
    return this.httpService.get(UrlConstant.getdepartmentMaster, params)
  }
  /**
   * get Account details
   */
  getaccountMaster(acc:string,desc:string) {
    const param: any = {acc:acc,desc:desc};
    return this.httpService.get(UrlConstant.getaccountMaster, param)
  }
  /**
   * Get all the Users
   */
  getglobalUser(user:User) {
    // const params: any = {user:user};
    return this.httpService.post(UrlConstant.getglobalUser, user)
  }
  /**
   * get All users who are all approver
   */
  getGlobalUserForApprovar(user:User) {
    // const params: any = {user:user};
    return this.httpService.post(UrlConstant.getGlobalUserForApprovar, user)
  }
  getglobalUserById(personId:String){
    const params: any = {personId:personId};
    return  this.httpService.get(UrlConstant.getGlobalUserById, params)
  }
  getglobalUsersByMulIds(personId:string[]){
    return this.httpService.post(UrlConstant.getglobalUsersByMulIds,personId);
  }
  /**
   * get Approver list
   */
  getapproverMaster() {
    const params: any = {};
    return this.httpService.get(UrlConstant.getapproverMaster, params)
  }
  /**
   * get approver details for approval amount limit check
   * @param personId 
   */
  getApproverDetailsForLimit(personId: string) {
    const params: any = { personId: personId };
    return this.httpService.get(UrlConstant.approverDetails, params);
  }
/**
 * change form details to observable
 * @param formContents 
 */
  changeRFEDocContent(formContents: string) {
    this.RFEDocumentContent.next(formContents);
  }
  /**
   * get approval amount from current form
   * @param approvalAmountFromForm 
   */
  changeApprovalAmount(approvalAmountFromForm: number) {
    this.approvalAmount.next(approvalAmountFromForm);
  }
  /**
   * get all activity log
   */
  changeRFEDocActivityLogContent(activityLogContents: any[]) {
    this.activityLog.next(activityLogContents);
  }


  changeStatus(status:string)
  {
    this.status.next(status);
  }

  /**
   * get all attachments
   * @param attatchmentContents 
   */
  changeAttatchments(attatchmentContents: any[]) {
    this.attatchment.next(attatchmentContents);
  }
}
