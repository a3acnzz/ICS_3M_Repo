import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {LOAD_USER_PROFILE} from './session-actions';

export const LOGIN = 'LOGIN';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

@Injectable()
export class LoginActions {

  constructor(private ngRedux: NgRedux<any>) {
  }

  loginSuccess(user) {
    this.ngRedux.dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: {
        userLogin: user
      }
    });
  };

  loadUserProfile(userProfile) {
    this.ngRedux.dispatch({
      type: LOAD_USER_PROFILE,
      payload: {
        userProfile: userProfile
      }
    });
  };

  forbidden() {
    this.ngRedux.dispatch({
      type: LOGIN_USER_ERROR,
      payload: {
        hasError: true
      }
    });
  };
}
