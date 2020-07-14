import {Injectable} from '@angular/core';
import {HttpService} from '../base/http.service';
import {AppConstant} from '../../shared/constant/app.constant';

@Injectable()
export class DashboardService {

  constructor(private httpService: HttpService) {
  }

  getGreetings() {
    return this.httpService.get("greetings");
  }
}
