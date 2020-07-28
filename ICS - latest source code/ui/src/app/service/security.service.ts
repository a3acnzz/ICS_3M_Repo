import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as _ from 'lodash/lodash.min';
import {select} from '@angular-redux/store';
import {ILoginRecord} from '../redux/reducers/login.types';
import {AppConstant} from '../shared/app.constant';
import {Router} from '@angular/router';

@Injectable()
export class SecurityService {

  // listening to redux session service to populate data
  @select(['loginReducer', 'userLogin']) accessTokenData: Observable<ILoginRecord>;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  userPermissions: any[];

  constructor(private router: Router) {

    this.accessTokenData.subscribe((user: ILoginRecord) => {
      if (user && user.access_token) {
        this.token = user.access_token;
        this.userPermissions = user.roles;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
      }
    });
  }

  isAuthorized(authorizedRoles: string[]) {
    if (authorizedRoles) {
      let authorized = false;
      for (const permission of authorizedRoles) {
        if (_.indexOf(this.userPermissions, permission) > -1) {
          authorized = true;
        }
      }
      return authorized;
    } else {
      return false;
    }
  }

  notAvailable() {
    this.token = null;
    this.router.navigate([AppConstant.MaintenanceUrl]);
  }

  forbidden() {
    this.router.navigate([AppConstant.NotAuthorizedUrl]);
  }

  isLoggedIn() {
    return this.token && this.token.length > 0;
    
  }

  getToken() {
    return this.token;
  }
}
