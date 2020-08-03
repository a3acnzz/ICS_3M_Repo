import { Injectable } from '@angular/core';
import { HttpService } from '../base/http.service';
import { UrlConstant } from "../../shared/constant/url.constant";
import { Location } from "@angular/common";
import { CorpsRFE } from '../../model/CorpsRFE'
import { CookieService } from 'ngx-cookie-service';
import { AppConstant } from 'src/app/shared/constant/app.constant';
import { environment } from './../../../environments/environment';
import { Http, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { CorpsSearch } from 'src/app/model/CorpsSearch';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorppsrfeService {

  reqBody: any;

  constructor(private httpService: HttpService, private location: Location, private cookieService: CookieService, private http: Http) {
  }

  /**
   * Searching for corp PS RFE form based on orderby value an status
   * @param status 
   * @param order 
   * @param sort 
   */
  corpsSearch(search: CorpsSearch, order, sort) {
    let userId = this.cookieService.get(AppConstant.userId);
    let userRole = this.cookieService.get(AppConstant.userRole);
    let corpsSearch = JSON.stringify(search);
    let params: any = {};
    if (userRole === "Admin") {
      params = { corpsSearch: corpsSearch, order: order, sort: sort };
      return this.httpService.get(UrlConstant.getCorpsSearch, params);
    }
    else {
      params = { corpsSearch: corpsSearch, order: order, sort: sort, userId: userId };
      return this.httpService.get(UrlConstant.getUserCorpsSearch, params);
    }


  }
  /**
   * Save the corpPs RFE form
   * @param corpsRFE 
   * @param files 
   */
  corpsSave(corpsRFE: CorpsRFE, files: File[], attachment, oldCorpReq) {
    this.reqBody = corpsRFE;
    let params = { attachment: attachment, oldCorpReq: oldCorpReq }
    var formData: FormData = new FormData();
    formData.append('corpRFEData', JSON.stringify(this.reqBody));
    if (attachment)
      formData.append('attachments', JSON.stringify(attachment));
    else {
      attachment = []
      formData.append('attachments', JSON.stringify(attachment));
    }
    if (oldCorpReq != undefined && oldCorpReq != null)
      formData.append('oldCorpReq', JSON.stringify(oldCorpReq));
    else {
      oldCorpReq = '';
      formData.append('oldCorpReq', JSON.stringify(oldCorpReq));
    }
    var count: number = 0;
    for (let file of files) {
      formData.append('uploadfile', file, file.name);
    }
    return this.http.post(environment.baseURL + UrlConstant.saveCorps, formData);


  }
  /**
   * get form details by
   * @param corpsRfeNum 
   */
  getCorpsByPSReqNum(corpsRfeNum) {
    const params: any = { CorpPSReqNum: corpsRfeNum };
    return this.httpService.get(UrlConstant.getCorpsByPSReqNum, params);
  }
  /**
   * update the Corp PS RFE form 
   * @param corpsRFE 
   * @param files 
   */
  corpsUpdate(corpsRFE: CorpsRFE, files: File[]) {
    this.reqBody = corpsRFE;
    var formData: FormData = new FormData();
    formData.append('corpRFEData', JSON.stringify(this.reqBody));
    var count: number = 0;
    for (let file of files) {
      formData.append('uploadfile', file, file.name);
    }
    return this.http.post(environment.baseURL + UrlConstant.updateCorps, formData);
  }
  /**
   * get corp PS RFE new Number by
   * @param personId 
   */
  getCorpPsRfeNum(personId: String) {
    const params: any = { personId: personId };
    return this.httpService.get(UrlConstant.getCorpPsReqNum, params);
  }

  /**
   * delete the attachment by
   * @param id 
   */

  deleteAttachmentFile(id: number) {
    return this.http.get(environment.baseURL + "attchmentfile/" + id)
  }

  // downloadAttachmentFile(docId:number,fileName:string): Observable<any>{
  /**
   * download the attachment file
   * @param CorpPSReqNum 
   * @param fileName 
   */
  downloadAttachmentFile(CorpPSReqNum: string, fileName: string): Observable<any> {
    var formData: FormData = new FormData();
    formData.append('corpPsRfeNum', CorpPSReqNum);
    formData.append('fileName', fileName);
    let options = new RequestOptions({ responseType: ResponseContentType.Blob });
    return this.http.post(environment.baseURL + "downloadAttachmentFile", formData, options)
  }

  jobTrigger(jobName: string): Observable<any> {
    return this.httpService.post(UrlConstant.jobTrigger, jobName).pipe(delay(1500), catchError(this.errorHandler));
  }
  jobHistory(jobName: string): Observable<any> {
    return this.httpService.post(UrlConstant.jobHistory, jobName).pipe(catchError(this.jobHistoryErrorHandler));
  }
  errorHandler() {
    return throwError("Sorry, something went wrong internally. The Job Trigger has not been performed. Please refresh and try again later.");
  }
  jobHistoryErrorHandler() {
    return throwError("Sorry, something went wrong internally. Unable to fetch the Job History details. Please refresh and try again later.");
  }
}
