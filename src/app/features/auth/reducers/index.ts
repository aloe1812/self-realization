import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';
import { extractErrorMessage } from '../../../utils/common';

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

export function reducer(state = initialState, action: AuthActionsUnion): State {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return {
        ...state,
        error: undefined,
        loginPending: true,
        registerPending: false,
      };
    }

    case AuthActionTypes.Register: {
      return {
        ...state,
        error: undefined,
        loginPending: false,
        registerPending: true,
      };
    }

    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.RegisterSuccess: {
      return {
        ...state,
        error: undefined,
        loginPending: false,
        registerPending: false,
      };
    }

    case AuthActionTypes.AuthFailure: {
      return {
        ...state,
        error: extractErrorMessage(action.payload),
        loginPending: false,
        registerPending: false,
      };
    }

    default: {
      return state;
    }
  }
}

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
