import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const LOAD_USER_PROFILE = 'LOAD_USER_PROFILE';
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR';

@Injectable()
export class SessionActions {

  constructor(private ngRedux: NgRedux<any>) {
  }

  loadUserProfile(userProfile) {
    this.ngRedux.dispatch({
      type: LOAD_USER_PROFILE,
      payload: {
        userProfile: userProfile
      }
    });
  };

    changeLang(lang) {
    this.ngRedux.dispatch({
      type: CHANGE_LANGUAGE,
      payload: {
        language: lang
      }
    });
  };

}
