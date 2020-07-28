import {Injectable} from '@angular/core';
import {HttpService} from './base/http.service';
import {AppConstant} from '../shared/app.constant';

@Injectable()
export class BccEmailService {

  constructor(private httpService: HttpService) {
  }

  search(locationId: number, programId: number) {
    const params: any = {};
    if (!!locationId) {
      params.locationId = locationId;
    }
    if (!!programId) {
      params.programId = programId;
    }
    return this.httpService.get(AppConstant.bccEmailSearch, params);
  }

  save(bccEmailList, locationId: number, programId: number) {
    const params: any = {};
    params.bccEmailList = bccEmailList;
    if (!!locationId) {
      params.locationId = locationId;
    }
    if (!!programId) {
      params.programId = programId;
    }
    return this.httpService.post(AppConstant.saveBccEmail, params);
  }
}
