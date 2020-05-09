import { Component, OnInit } from '@angular/core';
import {ShowHeaderService} from '../../service/component/show-header.service';
import {environment} from '../../../environments/environment';
import {AppConstant} from '../../shared/constant/app.constant';
import { CookieService } from "ngx-cookie-service";
import { UrlConstant } from 'src/app/shared/constant/url.constant';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';
import { LOGIN_REDUCER, LOGIN_USER_SUCCESS, LoginState,LOG_OUT_USER } from '../../redux/reducers/login-reducer';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  headerLogoFilename = environment.logo3M;
  HomeGETUrl: string;
  Home3MUrl = environment.Home3MUrl;
  corpps:string;
  ps:string;
  hs:string;
  corphs:string;
 CorpPSERFEDashboardDescription: string = AppConstant.CorpPSERFEDashboardDescription;
  PSERFEDashboardDescriptionStart: string = AppConstant.PSERFEDashboardDescriptionStart;
  PSERFEDashboardDescriptionMiddle: string = AppConstant.PSERFEDashboardDescriptionMiddle;
  PSERFEDashboardDescriptionLast: string = AppConstant.PSERFEDashboardDescriptionLast;
  CorpHSITERFEDashboardDescription: string = AppConstant.CorpHSITERFEDashboardDescription;
  HSITERFEDashboardDescription: string = AppConstant.HSITERFEDashboardDescription;
  CorpHsUrl= environment.CorpHsUrl;
  HsUrl= environment.HsUrl;
  prsnName : string;
  personId : string;
  hideLogoInd : boolean ;
  profileSub: Subscription;

/**
 * Hiding the default header and side Bar
 * Constructor for DashboardComponent
 * @param showHeaderFlagService 
 * @param cookieService 
 */
  constructor(public showHeaderFlagService: ShowHeaderService, private cookieService: CookieService, private router: Router,
    private loginStore: Store<LoginState>) {
    this.showHeaderFlagService.headerFlagValue=true;
    this.showHeaderFlagService.psHeaderFlagValue=false;
    this.showHeaderFlagService.corpHeaderFlagValue=false;
     console.log("User pin from dashboard : "+this.cookieService.get("USERNAME"));
   }
/**Calling the ngOnInit() 
  * 
  */
  ngOnInit() {
    this.corpps=AppConstant.CORPPS;
    this.ps=AppConstant.PS;
    this.hs=AppConstant.HS;
    this.corphs=AppConstant.CORPHS; 
     this.profileSub = this.loginStore.select(LOGIN_REDUCER).subscribe((user: LoginState) => {
      if (user && user.token && user.prsnName) {
        this.prsnName = user.prsnName;
        this.personId = user.personId;
      }
    }); 
  }
  /**
   * not implemented alert
   * @param value 
   */
  notImplemented(value) {
    alert(value + ' ' + 'is not implemented')
  }
 /**
   * Logout from application
   */
  logout()
  {
    console.log("loggint out");
    this.cookieService.deleteAll('../');
    this.loginStore.dispatch({ type: LOG_OUT_USER,
                            payload: {type:LOG_OUT_USER,
                                      token:  null, 
                                      personId:null,
                                      prsnName:null
                                     }});  
    //this.router.navigate([UrlConstant.logoutUrl])    
     window.location.href=environment.logOutUrl;
  }

}