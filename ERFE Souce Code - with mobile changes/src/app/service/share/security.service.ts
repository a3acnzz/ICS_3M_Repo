import { Injectable } from '@angular/core';
import { UserRole } from '../../model/UserRole';
import * as _ from 'lodash';
import { AppConstant } from '../../shared/constant/app.constant';
import { UrlConstant } from '../../shared/constant/url.constant';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGIN_REDUCER, LoginState } from '../../redux/reducers/login-reducer';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {


  token: string;
  personId: string;
  prsnName: string;
  userPermissions: any[];

  constructor(private router: Router,
    private loginStore: Store<LoginState>) {

    this.loginStore.select(LOGIN_REDUCER).subscribe((user: LoginState) => {

      if (user && user.token) {
        this.token = user.token;
        this.personId = user.personId;
        this.prsnName = user.prsnName;
        // console.log("token from store : "+  this.token);        
        // console.log("personId from store : "+  this.personId);        
        // console.log("prsnName from store : "+  this.prsnName);
      }
      else {
        // console.log("else ");
        this.token = null;
        this.personId = null;
        this.prsnName = null;

      }
    });
  }

  isCheckAuthorized(userPermissions: UserRole[], authorizedRoles: string[]) {
    let indx = -1;
    for (const permission of authorizedRoles) {
      indx = _.findIndex(userPermissions, function (userPermission: UserRole) {
        return userPermission.permissionNme === permission &&
          (userPermission.permissionActiveInd === false || userPermission.authorizedInd);
      });
      if (indx > -1) {
        return true;
      }
    }
    return false;
  }

  isAuthorized(authorizedRoles: string[]) {
    let indx = -1;
    for (const permission of authorizedRoles) {
      indx = _.findIndex(this.userPermissions, function (userPermission: UserRole) {
        return userPermission.permissionNme === permission &&
          (userPermission.permissionActiveInd === false || userPermission.authorizedInd);
      });
      if (indx > -1) {
        return true;
      }
    }
    return false;
  }

  isVisible(authorizedRoles: string[]) {
    const permissions = this.userPermissions;
    let indx = -1;
    for (const permission of authorizedRoles) {
      indx = _.findIndex(permissions, function (userPermission: UserRole) {
        return userPermission.permissionNme === permission &&
          (userPermission.permissionActiveInd === false || userPermission.authorizedInd);
      });
      if (indx > -1) {
        return true;
      }
    }
    return false;
  }

  forbidden() {
    this.token = null;
    this.router.navigate([UrlConstant.NotAuthorizedUrl]);
  }

  notAvailable() {
    this.token = null;
    this.router.navigate([UrlConstant.MaintenanceUrl]);
  }

  notAuthorized() {
    this.token = null;
    this.router.navigate([UrlConstant.NotAuthorizedUrl]);
  }

  isLoggedIn() {
    // console.log("logged in token " + this.token);
    return !!this.token && this.token.length > 0;
  }

  getToken() {
    return this.token;
  }

  getPersonName() {
    return this.prsnName;
  }

  getPermissionRoles() {
    return this.userPermissions;
  }
}
