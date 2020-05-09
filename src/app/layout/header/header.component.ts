import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UrlConstant } from '../../shared/constant/url.constant';
import { AppConstant } from '../../shared/constant/app.constant';
import { environment } from '../../../environments/environment';
import { User } from '../../model/User';
import { DialogService } from '../../service/dialog/dialog.service';
import { LoginService } from '../../service/share/login.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGIN_REDUCER, LOGIN_USER_SUCCESS, LoginState, LOG_OUT_USER } from '../../redux/reducers/login-reducer';
import { Keepalive } from '@ng-idle/keepalive';
import { CHANGE_LANGUAGE, LanguageState } from '../../redux/reducers/language-reducer';
import { ERC_REDUCER, ErcState } from '../../redux/reducers/erc-request-reducer';
import { Subscription } from 'rxjs/internal/Subscription';
import { CookieService } from 'ngx-cookie-service';
import { NewRfeDocumentService } from 'src/app/service/component/new-rfe-document.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sidenav;

  profileSub: Subscription;
  userProfile: User;
  personId = '';
  prsnName: string;
  showLangInd = false;
  headerLogoFilename = environment.logo3M;
  HomeGETUrl: string;
  Home3MUrl = environment.Home3MUrl;
  logoutUrl: string;
  hideLogoInd: boolean;
  isopen: boolean;
  openAdminPanel: boolean = false;
  userRole: string;
  isAdmin: boolean = false;


  /**
   * constructor for HeaderComponent
   * @param loginService 
   * @param dialogService 
   * @param idle 
   * @param keepalive 
   * @param router 
   * @param ercStore 
   * @param loginStore 
   * @param languageStore 
   * @param cookieService 
   */
  constructor(private loginService: LoginService,
    private dialogService: DialogService,
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router,
    private ercStore: Store<ErcState>,
    private loginStore: Store<LoginState>,
    private languageStore: Store<LanguageState>,
    private cookieService: CookieService,
    private datum: NewRfeDocumentService) {

    /**
     * set Idle value
     */
    idle.setIdle(AppConstant.TIMEOUT_IDLE_TIME);

    /**  sets a timeout period of 1 hours of idle*/
    idle.setTimeout(AppConstant.TIMEOUT_TIME);
    /**
     *      sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
     */
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    keepalive.interval(AppConstant.KEEPALIVE_INTERVAL);

    idle.watch();
    keepalive.start()

    idle.onIdleEnd.subscribe(() => {
      console.log('No longer idle.');
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      console.log('Timed out!');
      //this.router.navigate(['/login']);
      this.logout();

    });

    idle.onIdleStart.subscribe(() => {
      console.log('You\'ve gone idle!');
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      console.log('You will time out in seconds!');
    });

    //idle.onIdleEnd.subscribe(() => {
    // this.loginService.reAuthenticate().subscribe((user: any) => {
    //   if (user) {
    //     this.loginStore.dispatch({
    //       type: LOGIN_USER_SUCCESS,
    //       payload: user
    //     });
    //   } else {
    //     this.idle.stop();
    //     this.keepalive.stop();
    //     this.router.navigate([UrlConstant.SessionExpiredUrl]);
    //   }
    // }, (error) => {
    //   this.idle.stop();
    //   this.keepalive.stop();
    //   this.router.navigate([UrlConstant.MaintenanceUrl]);
    // });
    //});

    keepalive.onPing.subscribe(() => {
      if (this.cookieService.get(AppConstant.SMSESSION)) {
        console.log("keep alive ");
      }
      else {
        this.idle.stop();
        this.keepalive.stop();
        // this.router.navigate([UrlConstant.SessionExpiredUrl]);
        this.logout();
      }

      // this.loginService.keepAliveConnection().subscribe(() => {
      // }, (error) => {
      //   this.idle.stop();
      //   this.keepalive.stop();
      //   this.router.navigate([UrlConstant.SessionExpiredUrl]);
      // });
    });
  }
  /**
   * reaet idle and keep alive
   */
  reset() {
    this.idle.watch();
    this.keepalive.start();
  }
  /**
   * custom clen up for profilesub
   */
  ngOnDestroy(): void {
    if (this.profileSub) {
      this.profileSub.unsubscribe();
    }
  }
  /**ng onit for HeaderComponent
   * 
   */
  ngOnInit(): void {

    if (!environment.haltKeepAliveForE2E) {
      this.reset();
    }
    this.profileSub = this.loginStore.select(LOGIN_REDUCER).subscribe((user: LoginState) => {
      if (user && user.token && user.prsnName) {
        this.prsnName = user.prsnName;
        this.personId = user.personId;
        this.userProfile = null;
      }
    });

    this.ercStore.select(ERC_REDUCER).subscribe((result: ErcState) => {
      if (result) {
        this.showLangInd = !result.closeErcInd;
      }
    });

    this.headerLogoFilename = environment.logo3M;
    this.Home3MUrl = environment.Home3MUrl;
    this.userRole = this.cookieService.get(AppConstant.userRole);
    if (this.userRole === "Admin")
      this.isAdmin = true;
    else
      this.isAdmin = false;
  }

  /**
   * 
   * @param lang Select language
   */
  selectLang(lang) {
    this.languageStore.dispatch({
      type: CHANGE_LANGUAGE,
      payload: {
        language: lang
      }
    });
  }
  /**
   * logout link
   */
  logout() {
    console.log("loggint out");
    this.cookieService.deleteAll('../');
    this.loginStore.dispatch({
      type: LOG_OUT_USER,
      payload: {
        type: LOG_OUT_USER,
        token: null,
        personId: null,
        prsnName: null
      }
    });
    //this.router.navigate([UrlConstant.logoutUrl])    
    window.location.href = environment.logOutUrl;
  }
  openAdministration() {

    this.openAdminPanel = true;
  }
  closeAdministration() {

    this.openAdminPanel = false;
  }
  newrfeClicked() {
    this.datum.changeRFEDocContent(null);
    this.datum.changeApprovalAmount(0);
    this.datum.changeAttatchments(null);
    this.datum.changeRFEDocActivityLogContent(null);
  }
}
