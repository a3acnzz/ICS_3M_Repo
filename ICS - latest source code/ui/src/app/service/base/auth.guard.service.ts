import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login.service';
import {SecurityService} from '../security.service';
import {AppConstant} from '../../shared/app.constant';

@Injectable()
export class AuthGuardService implements CanActivate {

  // Indicator for displaying "Logging in" message & spinner in app.component.html
  public loader = false;

  constructor(private router: Router, private loginService: LoginService, private securityService: SecurityService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any>|boolean {
    const roles = route.data['roles'] as Array<string>;
    if (!this.isLoggedIn()) {
      this.loader = true;
      // pass 'this' into function as 'self'
      const self = this;
      // log in
      return this.loginService.authenticated().then(function(result) {
        self.loader = false;
        // if login is successful, return whether or not user is authorized
        // if user is not authorized, display unauthorized page
        const isAuthorized = self.isAuthorized(roles);
        if (!isAuthorized) {
          self.forbidden();
        }
        return isAuthorized;
      }, function(err) {
        // console.log(err)
        self.loader = false;
        // if there is an error, direct user to forbidden page
        self.forbidden();
      });
    } else {
      this.loader = false;
      // if user is already logged in, return whether or not they are authorized
      // if user is not authorized, display unauthorized page
      const isAuthorized = this.isAuthorized(roles);
      if (!isAuthorized) {
        this.forbidden();
      }
      return isAuthorized;
    }
  }

  isLoggedIn() {
    return this.securityService.isLoggedIn();
    // return true;
  }

  isAuthorized(roles) {
    // return true;
    return this.securityService.isAuthorized(roles);
  }

  forbidden() {
    this.router.navigate([AppConstant.NotAuthorizedUrl]);
  }
}
