import {Injectable} from '@angular/core';
import {HttpService} from './base/http.service';
import {AppConstant} from '../shared/app.constant';

@Injectable()
export class LocationService {

  constructor(private httpService: HttpService) {
  }

  getSignUpLocations() {
    return this.httpService.get(AppConstant.getSignUpLocations);
  }

  getProgramOwnerLocations() {
    return this.httpService.get(AppConstant.getProgramOwnerLocations);
  }

  getAdminLocations() {
    return this.httpService.get(AppConstant.getAdminLocations);
  }

  getLocation(id: number) {
    const params = {id: id};
    return this.httpService.get(AppConstant.getLocation, params);
  }

  getLocationByCode(code: string) {
    const params = {code: code};
    return this.httpService.get(AppConstant.getLocationByCode, params);
  }

  getTimeZones() {
    return this.httpService.get(AppConstant.getTimeZones);
  }

  save(location) {
    return this.httpService.post(AppConstant.saveLocation, location);
  }

}
