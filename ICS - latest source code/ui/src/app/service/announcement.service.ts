import {Injectable} from '@angular/core';
import {HttpService} from './base/http.service';
import {AppConstant} from '../shared/app.constant';

@Injectable()
export class AnnouncementService {

  constructor(private httpService: HttpService) {
  }

  search(locationId: number, active: Boolean) {
    const params: any = {};
    if (!!locationId) {
      params.locationId = locationId;
    }
    if (!!active) {
      params.active = active;
    }
    return this.httpService.get(AppConstant.announcementSearch, params);
  }

  save(announcement) {
    return this.httpService.post(AppConstant.saveAnnouncement, announcement);
  }

}
