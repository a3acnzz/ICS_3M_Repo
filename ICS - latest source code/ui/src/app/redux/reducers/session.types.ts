import {makeTypedFactory, TypedRecord} from 'typed-immutable-record';
import {Action} from 'redux';
import {User} from '../../model/User';
import {UserRole} from '../../model/UserRole';

export interface ISession {
  token: string;
  userProfile: IUserProfile;
  userRoles: UserRole[];
  hasError: boolean;
  isLoading: boolean;
}

export interface IUserProfile {
  user: User;
  userRoles: UserRole[];
}

export interface ISessionRecord extends TypedRecord<ISessionRecord>,
  ISession {
}

export interface IUserRecord extends TypedRecord<IUserRecord>, IUserProfile {
}

export const UserFactory = makeTypedFactory<IUserProfile, IUserRecord>({
  user: new User(),
  userRoles: []
});

export interface IPayloadAction extends Action {
  payload?: any;
}

export const INITIAL_USER_STATE = UserFactory();

export const SessionFactory = makeTypedFactory<ISession, ISessionRecord>({
  token: null,
  userProfile: INITIAL_USER_STATE,
  userRoles: [],
  hasError: false,
  isLoading: false
});

export const INITIAL_STATE = SessionFactory();
