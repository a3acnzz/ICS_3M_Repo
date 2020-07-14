import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SecurityService} from '../share/security.service';
import {AppConstant} from '../../shared/constant/app.constant';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError,map} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';
import {Store} from '@ngrx/store';
import {LOGIN_USER_ERROR, LoginState} from '../../redux/reducers/login-reducer';


import { Headers, Http, RequestOptionsArgs, Response } from '@angular/http';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private securityService: SecurityService,
              private loginStore: Store<LoginState>) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = `${AppConstant.AUTHORIZATION_TYPE}${this.securityService.getToken()}`;    
    const authReq = req.clone({ withCredentials : true, setHeaders: {Authorization: authHeader,'content-type' : 'application/json'}}); 
    // console.log("Iterceptor Username:" + authReq.headers.get('USERNAME'));    
    // console.log("Iterceptor GroupList:" + authReq.headers.get('GROUPLIST'));    
    // console.log("Iterceptor Person  ID:" + authReq.headers.get('PERSONID'));    
    // console.log("Iterceptor header  keys" + authReq.headers.keys());   
    return next.handle(authReq).pipe(map((response) => {
        if (response instanceof HttpResponse) {
            // console.log(response.headers);
            return response;
        }     
      }),
      catchError((response) => {
        if (response instanceof HttpErrorResponse) {
          if (response.status === AppConstant.HTTP_STATUS_CODE_FORBIDDEN ||
            response.status === AppConstant.HTTP_STATUS_CODE_NOT_AUTHORIZE) {
            this.securityService.forbidden();
          } else if (response.status === AppConstant.HTTP_STATUS_CODE_NOT_AVAILABLE) {
            this.loginStore.dispatch({
              type: LOGIN_USER_ERROR,
              payload: response
            });
            this.securityService.notAvailable();
          }
        }
        const error = response.error.message || 'Server error';
        return throwError(error);
      }));
  }


}
