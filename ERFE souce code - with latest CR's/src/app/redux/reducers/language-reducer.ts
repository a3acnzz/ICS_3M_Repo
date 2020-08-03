import {AppConstant} from '../../shared/constant/app.constant';
import {Action} from '@ngrx/store';

export interface IPayloadAction extends Action {
  payload?: any;
}

export const LANGUAGE_REDUCER = 'languageReducer';
export const CHANGE_LANGUAGE = '[Language] Change Language';

export interface LanguageState {
  language: string;
}

export const initialLanguageState: LanguageState = {
  language: AppConstant.LANG_US,
};

export function languageReducer(state: LanguageState = initialLanguageState,
                                action: IPayloadAction): LanguageState {

  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        language: action.payload.language,
      };
    default:
      return state;
  }
}
