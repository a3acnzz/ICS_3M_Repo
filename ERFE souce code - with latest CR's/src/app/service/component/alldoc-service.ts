import {Injectable} from '@angular/core';
import {HttpService} from '../base/http.service';
import {UrlConstant} from "../../shared/constant/url.constant";
import {Location} from "@angular/common";
import { AllDoc } from 'src/app/model/AllDoc';

@Injectable()
export class AllDocService {
  constructor(private httpService: HttpService, private location:Location) {
  }

  allDocGet() {
    const params: any = {};
    return this.httpService.get(UrlConstant.getAllDocList,params);
  }
  allDocRetrieve(data: AllDoc) {
    return this.httpService.post(UrlConstant.allDocDetail, data);
  }

}
