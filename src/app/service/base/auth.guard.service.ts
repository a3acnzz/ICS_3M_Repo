import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AppConstant} from '../../shared/constant/app.constant';
import {UrlConstant} from '../../shared/constant/url.constant';
import {LoginService} from '../share/login.service';
import {SecurityService} from '../share/security.service';
import {Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    

  constructor(private router: Router, private loginService: LoginService, private securityService: SecurityService,private cookieService: CookieService) {  }

  forbidden() {
    this.router.navigate([UrlConstant.NotAuthorizedUrl]);
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
   if(this.cookieService.get(AppConstant.ENV_CHECK)=== 'LOCAL'){
     
     console.log("local auth guard");
      if (!this.isLoggedIn()) {
      // login
      console.log("!this.isLoggedIn()" + !this.isLoggedIn())
      return this.loginService.authenticated();
     }
      return true;
   }
   else{
     console.log("enl auth guard");
     if(this.isLoggedIn()){  
       
     console.log("already logged in");
        return true;
     }
     else if (this.cookieService.get(AppConstant.SMSESSION)) {
         //return this.loginService.getUserDetails();
          return this.loginService.setUserdetails();  
   
     }
     else{
         console.log("token is not set from ENL");
         this.router.navigate([UrlConstant.NotAuthorizedUrl]);
         return false;
     }
   } 
  }

  isLoggedIn() {
    return this.securityService.isLoggedIn();
  }
}
