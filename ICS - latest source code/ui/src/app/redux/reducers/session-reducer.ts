import {CHANGE_LANGUAGE, LOAD_USER_ERROR, LOAD_USER_PROFILE} from '../actions/session-actions';
import {INITIAL_STATE, IPayloadAction, ISessionRecord, UserFactory} from './session.types';

export default function SessionReducer(state: ISessionRecord = INITIAL_STATE,
    action: IPayloadAction): ISessionRecord {

  switch (action.type) {
    case LOAD_USER_PROFILE:
      return state.merge({
        userProfile: UserFactory(action.payload.userProfile)
      });
    case LOAD_USER_ERROR:
      return state.merge({
        hasError: true
      });
    case CHANGE_LANGUAGE:
      return state.merge({
        language: action.payload.language
      });
    default:
      return state;
  }
}
