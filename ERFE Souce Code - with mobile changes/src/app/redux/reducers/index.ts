import {ActionReducerMap} from '@ngrx/store';
import {loginReducer, LoginState} from './login-reducer';
import {ercReducer, ErcState} from './erc-request-reducer';
import {languageReducer, LanguageState} from './language-reducer';

export interface State {
  loginReducer: LoginState;
  ercReducer: ErcState;
  languageReducer: LanguageState;
}

export const reducers: ActionReducerMap<State> = {
  loginReducer: loginReducer,
  ercReducer: ercReducer,
  languageReducer: languageReducer
};
