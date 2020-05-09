import { Component, OnInit } from '@angular/core';
import { ShowHeaderService } from 'src/app/service/component/show-header.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UrlConstant } from 'src/app/shared/constant/url.constant';
import { AppConstant } from 'src/app/shared/constant/app.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  userList:any[];
  userRole:any;
  userName:string;
  userId:string;
/** l 
 */
/**
 * Constructor for LoginComponent
 *@author senthi
 * @param showHeaderFlagService 
 * @param formBuilder 
 * @param router 
 * @param cookieService 
 */
  constructor(public showHeaderFlagService: ShowHeaderService,private formBuilder:FormBuilder,private router:Router,private cookieService:CookieService) {
    this.showHeaderFlagService.headerFlagValue=true;
    this.showHeaderFlagService.psHeaderFlagValue=false;
    this.showHeaderFlagService.corpHeaderFlagValue=false;

   }
   /**Calling the ngOnInit() 
  * 
  */
  ngOnInit() {
   
    this.userList = [
      {name: 'Admin', code: '0'},
      {name: 'User', code: '1'}
  ];
  }
 /**Calling login()
  * 
  */
  login(value)
  {
    

    this.userRole=value.userRole;
    this.cookieService.set(UrlConstant.COOKIE_USER_NAME,value.userName);
    this.cookieService.set(AppConstant.userRole,this.userRole.name);
    this.cookieService.set(AppConstant.userId,value.userId);
    this.cookieService.set(AppConstant.COOKIE_GROUP_LIST,"local");
    this.cookieService.set(AppConstant.ENV_CHECK,"LOCAL");
    this.router.navigate(['/dashboard']);
  }
}
