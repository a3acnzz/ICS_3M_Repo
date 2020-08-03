import { IPayloadAction } from './language-reducer';

export const LOGIN_REDUCER = 'loginReducer';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const LOGIN_ENL_USER = 'LOGIN_ENL_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';

export interface LoginState {
  token: string;
  username: string;
  personId: string;
  prsnName: string;
  hasError: boolean;
  type: string;
  version: string;
}

export const initialLoginState: LoginState = {
  token: null,
  type: null,
  hasError: false,
  username: null,
  prsnName: null,
  personId: null,
  version: null
};

export function loginReducer(state: LoginState = initialLoginState,
  action: IPayloadAction): LoginState {

  // console.log(action.type);
  // storage.removeItem('persist:root')
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, action.payload);
    case LOGIN_ENL_USER:
      return Object.assign({}, state, action.payload);
    case LOGIN_USER_ERROR:
      state.hasError = true;
      return Object.assign({}, state, action.payload);
    case LOG_OUT_USER:
      // console.log(action.type + "enterd");
      return Object.assign({}, state, initialLoginState);
    default:
      return state;
  }
}

export const getToken = (state: LoginState) => state.token;

export const getPersonName = (state: LoginState) => state.prsnName;

export const getPersonId = (state: LoginState) => state.personId;

export const getVersion = (state: LoginState) => state.version;

export const getUserPin = (state: LoginState) => state.username;
