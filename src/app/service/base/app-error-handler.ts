import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AppConstant} from '../../shared/constant/app.constant';
import {SecurityService} from '../share/security.service';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {
  }


  public handleError(error: any) {
    const securityService = this.injector.get(SecurityService);
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (error.status === AppConstant.HTTP_STATUS_CODE_NOT_AUTHORIZE || error.status === AppConstant.HTTP_STATUS_CODE_FORBIDDEN) {
        console.log('Error Connection', error);
        securityService.forbidden();
      } else if (error.status === AppConstant.HTTP_STATUS_CODE_NOT_AVAILABLE) {
        securityService.notAvailable();
      }
    } else {
      console.log('Error', error);
    }
  }
}
