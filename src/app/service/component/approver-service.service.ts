import { Injectable } from '@angular/core';
import { HttpService } from '../base/http.service';
import { UrlConstant } from 'src/app/shared/constant/url.constant';

@Injectable({
  providedIn: 'root'
})
export class ApproverServiceService {

  constructor(private httpService: HttpService) { }


  getCorpPsRfe(approverPin) {
    const params: any = { approverPin: approverPin };
    return this.httpService.get(UrlConstant.getApproverDashboard, params);
  }

}
