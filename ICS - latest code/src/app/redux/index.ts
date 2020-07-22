import {combineReducers} from 'redux';
import LoginReducer from './reducers/login-reducer';
import SessionReducer from './reducers/session-reducer';

export const rootReducer = combineReducers({
  sessionReducer: SessionReducer,
  loginReducer: LoginReducer,
});
