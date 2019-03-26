import { UserActionsUnion } from '../actions/user.actions';
import { UserActionTypes } from '../actions/user.actions';
import produce from 'immer';

export interface State {
  userId: string;
  username: string;
  token: string;
}

export const initialState: State = {
  userId: undefined,
  username: undefined,
  token: undefined,
};

export const reducer = produce((draftState: State, action: UserActionsUnion): State => {
  switch (action.type) {
    case UserActionTypes.Save: {
      const token = action.payload.token;
      localStorage.setItem('sr-token', token);

      draftState.userId = action.payload.id;
      draftState.username = action.payload.username;
      draftState.token = token;
      return;
    }

    case UserActionTypes.Remove: {
      localStorage.removeItem('sr-token');

      draftState.userId = undefined;
      draftState.username = undefined;
      draftState.token = undefined;
      return;
    }

    default:
      return draftState;
  }
}, initialState);

