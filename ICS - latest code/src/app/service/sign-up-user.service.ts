import {Injectable} from '@angular/core';
import {HttpService} from './base/http.service';
import {AppConstant} from '../shared/app.constant';

@Injectable()
export class SignUpUserService {

  constructor(private httpService: HttpService) {
  }

  search(firstName: String, lastName: String, userPin: String) {
    const params: any = {};
    if (!!firstName) {
      params.firstName = firstName;
    }
    if (!!lastName) {
      params.lastName = lastName;
    }
    if (!!userPin) {
      params.userPin = userPin;
    }
    return this.httpService.get(AppConstant.signUpUserSearch, params);
  }

  getUserByUserPin(userPin: String) {
    const params = {userPin: userPin};
    return this.httpService.get(AppConstant.getSignUpUser, params);
  }
}
