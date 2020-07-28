import {Injectable} from '@angular/core';
import {HttpService} from './base/http.service';
import {AppConstant} from '../shared/app.constant';

@Injectable()
export class ContactUsService {

  constructor(private httpService: HttpService) {
  }

  search(locationId: number, active: Boolean) {
    const params: any = {};
    if (!!locationId) {
      params.locationId = locationId;
    }
    return this.httpService.get(AppConstant.contactUsSearch, params);
  }

  save(contactUs) {
    return this.httpService.post(AppConstant.saveContactUs, contactUs);
  }

}
