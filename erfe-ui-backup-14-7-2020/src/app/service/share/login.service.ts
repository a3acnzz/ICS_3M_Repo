import { Injectable } from '@angular/core';
import { HttpService } from '../base/http.service';
import { AppConstant } from '../../shared/constant/app.constant';
import { UrlConstant } from '../../shared/constant/url.constant';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { SecurityService } from './security.service';
import { Store } from '@ngrx/store';
import { LOGIN_USER_SUCCESS, LOGIN_ENL_USER, LoginState } from '../../redux/reducers/login-reducer';
import { CookieService } from "ngx-cookie-service";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  userName = '';
  public loader = false;

  constructor(private httpService: HttpService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private loginStore: Store<LoginState>,
    private securityService: SecurityService,
    private http: HttpClient) {
  }

  authenticated() {
    const userName = this.getUserName();
    const groupList = this.getGroupList();
    const personId = this.getUserId();
    const personName = "test";
    //const personName = this.getPersonName();
    const USERNAME: string = this.cookieService.get("USERNAME");
    // console.log("From Login service:");
    // console.log("USERNAME" + USERNAME + "USER_NAME" + "groupList"+groupList + "personId" + personId );
    // if (!userName) {
    //   this.securityService.forbidden();
    //   this.stopLoader();
    //   return false;
    // }
    // return true
    return this.login(userName, groupList, personId, personName);
  }

  login(username, groupList, personId, personName) {

    const parms = { username: username, password: '**********', groupList: groupList, personId: personId, personName: personName };
    this.loader = true;
    // console.log("calling login api");

    return this.http.post(environment.baseURL + UrlConstant.loginUrl, JSON.stringify(parms)).pipe(map(result => {
      if (result) {
        this.loginStore.dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: result
        });
        this.stopLoader();
        return true;
      } else {
        this.stopLoader();
        return false;
      }
    }),
      catchError((err) => {
        this.stopLoader();
        return of(false);
      })
    );
  }


  getUserName() {
    const cookieUsername: string = this.cookieService.get(UrlConstant.COOKIE_USER_NAME);
    if (environment.envName === AppConstant.ENV_PROD || environment.envName === AppConstant.ENV_QA || environment.envName === AppConstant.ENV_DEVSERVER) {
      // console.log("environment :" + environment.envName);
      if (!this.isvalid(cookieUsername)) {
        return null;
      } else {
        return cookieUsername;
      }
    } else {
      let username: string = cookieUsername;
      const testUsername = this.getTestUser();

      if (this.isvalid(testUsername)) {
        username = testUsername;
      }
      // use local user
      if (!this.isvalid(username)) {
        username = environment.username;
      }
      if (!this.isvalid(username)) {
        return null;
      }
      return username;
    }
  }
  getUserId() {
    const cookieUserId: string = this.cookieService.get(AppConstant.COOKIE_PERSON_ID);
    if (!this.isvalid(cookieUserId)) {
      return null;
    } else {
      return cookieUserId;
    }
  }
  //  getPersonName() {
  //   const cookiePersonName: string = this.cookieService.get(AppConstant.COOKIE_PERSON_NAME);    
  //     if (!this.isvalid(cookiePersonName)) {
  //       return null;
  //     } else {
  //       return cookiePersonName;
  //     }  
  // }
  getGroupList() {
    const cookieGroupList: string = this.cookieService.get(AppConstant.COOKIE_GROUP_LIST);
    if (!this.isvalid(cookieGroupList)) {
      return null;
    } else {
      return cookieGroupList;
    }
  }
  keepAliveConnection() {
    return this.httpService.get(UrlConstant.keepAliveConnection);
  }

  private isvalid(value) {
    return value && value != null && value.length > 0;
  }

  private getTestUser() {
    const results = new RegExp('[\\?&]' + AppConstant.TEST_USER_NAME + '=([^&#]*)').exec(window.location.href);
    if (!!results && results.length > 0) {
      return results[1];
    }
    return null;
  }

  reAuthenticate() {
    const username = this.getUserName();
    const groupList = this.getGroupList();
    const personId = this.getUserId();
    //  const personName = this.getPersonName();
    if (!username) {
      this.securityService.forbidden();
      this.stopLoader();
      return of(false);
    }
    const parms = { username: username, password: '**********', groupList: groupList, personId: personId };
    return this.httpService.post(UrlConstant.loginUrl, parms);
  }

  stopLoader() {
    this.loader = false;
  }


  getUserDetails() {
    // console.log("storing token in store");
    this.loginStore.dispatch({
      type: LOGIN_ENL_USER,
      payload: { token: this.cookieService.get(AppConstant.SMSESSION) }
    });
    // console.log("calling get details api");
    return this.http.post(environment.baseURL + UrlConstant.profileUrl, null).pipe(map((result: any) => {
      if (result) {
        // console.log(result);
        this.cookieService.set(UrlConstant.COOKIE_USER_NAME, result.userName);
        this.cookieService.set(AppConstant.userId, result.personId);
        // console.log("storing person details in store");
        this.loginStore.dispatch({
          type: LOGIN_ENL_USER,
          payload: result
        });
        this.stopLoader();
        return true;
      } else {

        // console.log("no results  returned from api");
        this.stopLoader();
        return false;
      }
    }),
      catchError((err) => {

        // console.log("error returned from api");
        this.stopLoader();
        return of(false);
      })
    );
  }

  setUserdetails() {
    if (this.cookieService.get(AppConstant.COOKIE_USER_NAME)) {
      this.loginStore.dispatch({
        type: LOGIN_ENL_USER,
        payload: {
          token: this.cookieService.get(AppConstant.SMSESSION),
          personId: this.cookieService.get(AppConstant.userId),
          prsnName: this.cookieService.get(AppConstant.COOKIE_USER_NAME)
        }
      });
      // console.log(this.cookieService.get(AppConstant.userId) + this.cookieService.get(AppConstant.COOKIE_USER_NAME));
      return true;
    }
    else {
      window.location.href = environment.baseURL;
      return false;
    }
  }
}
