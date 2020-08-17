import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LOGIN_REDUCER, LoginState } from '../../redux/reducers/login-reducer';
import { Store } from '@ngrx/store';
import { AppConstant } from '../../shared/constant/app.constant';
import { ShowHeaderService } from 'src/app/service/component/show-header.service';
import { CookieService } from 'ngx-cookie-service';
import { NewRfeDocumentService } from 'src/app/service/component/new-rfe-document.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {

  @Input() sidenav;
  expandHeight = '42px';
  collapseHeight = '42px';
  logoFilename = '../../../assets/img/3M-Header-Logo.png';
  displayMode = 'flat';
  version = '1.0';
  personName = '';
  showCorpPsHeader: boolean;
  showPsHeader: boolean;
  home: string;
  corpps: string;
  ps: string;
  newrfe: string;
  view: string;
  isAdmin: boolean = false;
  userRole: String;

  constructor(public showHeaderFlagService: ShowHeaderService, private loginStore: Store<LoginState>, private cookieService: CookieService, private datum: NewRfeDocumentService) {
    this.showHeaderFlagService.psHeaderFlag.subscribe(val => this.showPsHeader = val)
    // this.showPsHeader = this.showHeaderFlagService.psHeaderFlagValue;
    this.showHeaderFlagService.corpHeaderFlag.subscribe(val => this.showCorpPsHeader = val)
    // this.showCorpPsHeader =this.showHeaderFlagService.corpHeaderFlagValue;
  }

  getHeaderLogoFilename() {
    switch (environment.envName) {
      case AppConstant.ENV_PROD:
        this.logoFilename = '../../../assets/img/3M-Header-Logo.png';
        break;
      case AppConstant.ENV_STAGING:
        this.logoFilename = '../../../assets/img/3M-Header-Logo.png';
        break;
      case AppConstant.ENV_QA:
        this.logoFilename = '../../../assets/img/3M-Header-Logo-QA.png';
        // logoFilename = '../../../assets/img/3M-Header-Logo.png';
        break;
      case AppConstant.ENV_DEVELOPMENT:
      case AppConstant.ENV_DEVSERVER:
        this.logoFilename = '../../../assets/img/3M-Header-Logo-Dev.png';
        break;
      default:
        this.logoFilename = '../../../assets/img/3M-Header-Logo.png';
        break;
    }
    return this.logoFilename;
  }

  ngOnInit() {
    this.home = AppConstant.HOME;
    this.corpps = AppConstant.CORPPS;
    this.ps = AppConstant.PS;
    this.newrfe = AppConstant.NEW_RFE;
    this.view = AppConstant.VIEW;
    this.userRole = this.cookieService.get(AppConstant.userRole);
    if (this.userRole === "Admin")
      this.isAdmin = true;
    this.loginStore.select(LOGIN_REDUCER).subscribe((login: LoginState) => {
      if (!login) {
        return;
      }
      if (login.version) {
        this.version = login.version;
      }
      if (login.prsnName) {
        this.personName = login.prsnName;
      }
    });
    this.getHeaderLogoFilename();
  }

  newrfeClicked() {

    this.datum.changeRFEDocContent(null);
    this.datum.changeApprovalAmount(0);
    this.datum.changeAttatchments(null);
    this.datum.changeRFEDocActivityLogContent(null);
  }
}
