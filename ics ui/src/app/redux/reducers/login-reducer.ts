import {INITIAL_USER_LOGIN_STATE, IUserLoginRecord, LoginFactory} from './login.types';
import {LOGIN_USER_ERROR, LOGIN_USER_SUCCESS} from '../actions/login-actions';
import {IPayloadAction} from './session.types';

export default function LoginReducer(state: IUserLoginRecord = INITIAL_USER_LOGIN_STATE,
                                     action: IPayloadAction): IUserLoginRecord {

    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return state.merge({
              userLogin: LoginFactory(action.payload.userLogin)
            });
        case LOGIN_USER_ERROR:
            return state.merge({
                hasError: true
            });
        default:
            return state;
    }
}
