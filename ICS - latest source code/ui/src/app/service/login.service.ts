import {Injectable} from '@angular/core';
import {HttpService} from './base/http.service';
import {AppConstant} from '../shared/app.constant';
import {CookieService} from 'ngx-cookie';
import {environment} from '../../environments/environment';
import {LoginActions} from '../redux/actions/login-actions';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class LoginService {

  constructor(private httpService: HttpService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private loginActions: LoginActions) {
  }

  authenticated() {
    return new Promise((resolve, reject) => {
      // use cookie user
      const cookieUsername: string = this.cookieService.get(AppConstant.COOKIE_USER_NAME);
      if (environment.envName === AppConstant.ENV_PROD || environment.envName === AppConstant.ENV_STAGING) {
        if (!this.isvalid(cookieUsername)) {
          this.loginActions.forbidden();
          resolve(false);
        } else {
          this.login(cookieUsername, resolve);
        }
      } else {
        let username: string = cookieUsername;
        this.route.queryParams.subscribe(
          data => {
            // override user
            const testUsername = data[AppConstant.TEST_USER_NAME];
            if (this.isvalid(testUsername)) {
              username = testUsername;
            }
            // use local user
            if (!this.isvalid(username) && environment.envName === AppConstant.ENV_DEVELOPMENT) {
              username = environment.username;
            }
            if (!this.isvalid(username)) {
              this.loginActions.forbidden();
              resolve(false);
              return;
            }
            this.login(username, resolve);
          });
      }

    });
  }

  private login(username, resolve) {

    const parms = {username: username, password: '[PROTECTED]'};

    this.httpService.post(AppConstant.loginUrl, parms).subscribe((result) => {
      if (result) {
        this.loginActions.loginSuccess(result);
        resolve(true);
      }
    }, (error) => {
      this.loginActions.forbidden();
      resolve(false);
    });
  }

  private isvalid(value) {
    return value && value != null && value.length > 0;
  }
}
