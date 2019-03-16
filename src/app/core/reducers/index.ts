import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromUser from './user.reducer';

export interface State {
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];

// Selectors
export const selectUserState = createFeatureSelector<State, fromUser.State>('user');

export const selectUsername = createSelector(
  selectUserState,
  (state: fromUser.State) => state.username,
);

export const selectToken = createSelector(
  selectUserState,
  (state: fromUser.State) => state.token,
);

export const selectLoggedIn = createSelector(
  selectToken,
  (token: string) => !!token,
);
