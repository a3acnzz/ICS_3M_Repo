import {makeTypedFactory, TypedRecord} from 'typed-immutable-record';

export interface IUserLogin {
  userLogin: ILogin;
  hasError: boolean;
}

export interface ILogin {
  access_token: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: any[];
  hasError: boolean;
  token_type: string;
  version: string;
}

export interface IUserLoginRecord extends TypedRecord<IUserLoginRecord>, IUserLogin {
}

export interface ILoginRecord extends TypedRecord<ILoginRecord>, ILogin {
}

export const LoginFactory = makeTypedFactory<ILogin, ILoginRecord>({
  access_token: null,
  roles: [],
  token_type: null,
  hasError: false,
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  version: null
});

export const INITIAL_LOGIN_STATE = LoginFactory();

export const UserLoginFactory = makeTypedFactory<IUserLogin, IUserLoginRecord>({
  userLogin: INITIAL_LOGIN_STATE,
  hasError: false
});
export const INITIAL_USER_LOGIN_STATE = UserLoginFactory();

