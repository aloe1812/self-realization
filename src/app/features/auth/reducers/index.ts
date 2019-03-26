import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';
import { extractErrorMessage } from '../../../utils/common';
import produce from 'immer';

export interface State {
  error: string;
  loginPending: boolean;
  registerPending: boolean;
}

export const initialState: State = {
  error: undefined,
  loginPending: false,
  registerPending: false,
};

export const reducer = produce((draftState: State, action: AuthActionsUnion): State => {
  switch (action.type) {
    case AuthActionTypes.Login: {
      draftState.error = undefined;
      draftState.loginPending = true;
      draftState.registerPending = false;
      return;
    }

    case AuthActionTypes.Register: {
      draftState.error = undefined;
      draftState.loginPending = false;
      draftState.registerPending = true;
      return;
    }

    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.RegisterSuccess: {
      draftState.error = undefined;
      draftState.loginPending = false;
      draftState.registerPending = false;
      return;
    }

    case AuthActionTypes.AuthFailure: {
      draftState.error = extractErrorMessage(action.payload);
      draftState.loginPending = false;
      draftState.registerPending = false;
      return;
    }

    default: {
      return draftState;
    }
  }
}, initialState);

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectError = createSelector(
  selectAuthState,
  (state: State) => state.error,
);

export const selectLoginPending = createSelector(
  selectAuthState,
  (state: State) => state.loginPending,
);

export const selectRegisterPending = createSelector(
  selectAuthState,
  (state: State) => state.registerPending,
);
