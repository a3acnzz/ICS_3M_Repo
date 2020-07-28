import {Injectable} from '@angular/core';
import {HttpService} from './base/http.service';
import {AppConstant} from '../shared/app.constant';
import {User} from '../model/User';

@Injectable()
export class AdminService {

  constructor(private httpService: HttpService) {
  }

  getAdminUserList() {
    return this.httpService.get(AppConstant.getAdminUserList);
  }

  saveAdminUserList(adminUserList: User[]) {
    return this.httpService.post(AppConstant.saveAdminUserList, adminUserList);
  }
}
