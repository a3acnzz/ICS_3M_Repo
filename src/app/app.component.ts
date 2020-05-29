import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { LoginService } from './service/share/login.service';
import { Subscription } from 'rxjs';
import { AppConstant } from './shared/constant/app.constant';
import { UrlConstant } from './shared/constant/url.constant';
import { LOGIN_REDUCER, LOGIN_USER_ERROR, LoginState } from './redux/reducers/login-reducer';
import { Store } from '@ngrx/store';
import { ShowHeaderService } from './service/component/show-header.service';
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  busyLogin = new Subscription();
  loginMessage = UrlConstant.loginMessage;
  showHeader: boolean;

  constructor(public loginService: LoginService, public showHeaderFlagService: ShowHeaderService,
    private loginStore: Store<LoginState>, private cookieService: CookieService) {
    this.showHeaderFlagService.headerFlagValue = false;
    this.showHeaderFlagService.headerFlag.subscribe(val => this.showHeader = val)
    // console.log("app component constructor");
    // console.log("User pin from app Component (Cookie) : " + this.cookieService.get("USERNAME"));
    // console.log("Token id from app Component (Cookie) :" + this.cookieService.get(AppConstant.SMSESSION) );
    //  if(this.cookieService.get(AppConstant.SMSESSION)){
    //    console.log("calling user details");         
    //      this.loginService.setENLToken();
    //  }
    //  else {
    //     // this.securityService.notAuthorized();
    //     // console.log("stoploader callled");
    //  }
    this.loginStore.select(LOGIN_REDUCER).subscribe((response: LoginState) => {
      if (response && response.hasError) {
        this.loginService.stopLoader();
      }
    });

  }

  //@ViewChild('sidenav') sidenav: MatSidenav;
  /*close(reason: string) {
    this.sidenav.close();
  }*/



}
