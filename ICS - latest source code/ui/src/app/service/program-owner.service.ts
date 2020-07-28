import {Injectable} from '@angular/core';
import {HttpService} from './base/http.service';
import {AppConstant} from '../shared/app.constant';

@Injectable()
export class ProgramOwnerService {

  constructor(private httpService: HttpService) {
  }

  search(locationId: number, userId: number) {
    const params: any = {};
    if (!!locationId) {
      params.locationId = locationId;
    }
    if (!!userId) {
      params.userId = userId;
    }
    return this.httpService.get(AppConstant.programOwnerSearch, params);
  }
}
