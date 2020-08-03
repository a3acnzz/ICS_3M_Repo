import {Action} from '@ngrx/store';

export const ERC_REDUCER = 'ercReducer';

export const OpenERC = '[Request] Open ERC';
export const CloseERC = '[Request] Close ERC';

export interface ErcState {
  closeErcInd: boolean;
}

export const initialState: ErcState = {
  closeErcInd: true,
};

export function ercReducer(
  state: ErcState = initialState,
  action: Action
): ErcState {
  switch (action.type) {
    case CloseERC:
      return {
        closeErcInd: true,
      };

    case OpenERC:
      return {
        closeErcInd: false,
      };

    default:
      return state;
  }
}
