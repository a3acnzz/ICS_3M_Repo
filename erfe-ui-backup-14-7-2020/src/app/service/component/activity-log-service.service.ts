import { Injectable } from '@angular/core';
import { HttpService } from '../base/http.service';
import { UrlConstant } from 'src/app/shared/constant/url.constant';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogServiceService {

  constructor(private httpService: HttpService) { }

  // Not used yet
  
  postActivity(logPersonPin) {
    const params: any = { logPersonPin: logPersonPin };
    return this.httpService.get(UrlConstant.postActivityLog, params);
  }

  getAllActivity(docId) {
    const params: any = { docId: docId };
    return this.httpService.get(UrlConstant.getActivityLog, params);
  }

}
