import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SecurityService} from '../security.service';
import {select} from '@angular-redux/store';
import {ILoginRecord} from '../../redux/reducers/login.types';
import {AppConstant} from '../../shared/app.constant';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token: string;
  @select(['loginReducer', 'userLogin']) accessTokenData: Observable<ILoginRecord>;

  constructor(private securityService: SecurityService) {

    this.accessTokenData.subscribe((user: ILoginRecord) => {
      if (user && user.access_token) {
        this.token = user.access_token;
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth header from the service.
    const authHeader = `${AppConstant.AUTHORIZATION_TYPE}${this.token}`;
    // Clone the request to add the new header.
    const authReq = req.clone({setHeaders: {Authorization: authHeader}});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq).pipe(
      catchError((response) => {
        if (response instanceof HttpErrorResponse) {
          if (response.status === 401 || response.status === 403) {
            this.securityService.forbidden();
            return throwError(new Error(response.message));
          } else if (response.status === 0) {
            this.securityService.notAvailable();
            return throwError(new Error(response.message));
          } else {
            return throwError(new Error(response.message));
          }
        }
      }));
  }
}
