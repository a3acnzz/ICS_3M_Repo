import {Component, OnInit} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ILoginRecord} from '../../redux/reducers/login.types';
import {AppConstant} from '../../shared/app.constant';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  // listening to redux session service to populate data
  @select(['loginReducer', 'userLogin']) accessTokenData: Observable<ILoginRecord>;

  profileSub;
  userName = '';
  firstName = '';
  lastName = '';
  userRoles = [];
  userIsProgramOwner = false;
  userIsAdmin = false;
  roleAdmin = AppConstant.ROLE_ADMIN;
  roleProgramOwner = AppConstant.ROLE_PROGRAM_OWNER;
  logoutUrl = environment.logoutUrl;

  constructor() {}

  ngOnInit() {
    this.profileSub = this.accessTokenData.subscribe((user: ILoginRecord) => {
      if (user && user.access_token && user.username) {
        this.userName = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userRoles = user.roles;
        this.userIsProgramOwner = user.roles.indexOf(this.roleProgramOwner) > -1;
        this.userIsAdmin = user.roles.indexOf(this.roleAdmin) > -1;
      }
    });
  }
}
