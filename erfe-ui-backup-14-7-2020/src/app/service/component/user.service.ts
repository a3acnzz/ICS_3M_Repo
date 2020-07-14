import {Injectable} from '@angular/core';
import {AppConstant} from '../../shared/constant/app.constant';
import {HttpService} from '../base/http.service';
import {User} from '../../model/User';
import {DialogService} from '../dialog/dialog.service';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService,
              private dialogService: DialogService) {
  }


}
