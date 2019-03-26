import { UserActionsUnion } from '../actions/user.actions';
import { UserActionTypes } from '../actions/user.actions';

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

export function reducer(state = initialState, action: UserActionsUnion): State {
  switch (action.type) {

    case UserActionTypes.Save: {
      const token = action.payload.token;

      localStorage.setItem('sr-token', token);

      return {
        ...state,
        userId: action.payload.id,
        username: action.payload.username,
        token,
      };
    }

    case UserActionTypes.Remove: {
      localStorage.removeItem('sr-token');

      return {
        ...state,
        userId: undefined,
        username: undefined,
        token: undefined,
      };
    }

    default:
      return state;
  }
}
