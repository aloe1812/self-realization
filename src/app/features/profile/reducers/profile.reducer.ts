import { ProfileActionTypes, ProfileActionsUnion } from '../actions/profile.actions';
import { IDefaultGroup } from '../models';
import { GroupType } from '../../../enums';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  loading: boolean;
  [GroupType.Mind]: IDefaultGroup;
  [GroupType.Body]: IDefaultGroup;
  [GroupType.Soul]: IDefaultGroup;
  error: string;
}

export const initialState: State = {
  loading: true,
  [GroupType.Mind]: undefined,
  [GroupType.Body]: undefined,
  [GroupType.Soul]: undefined,
  error: undefined,
};

export function reducer(state = initialState, action: ProfileActionsUnion): State {
  switch (action.type) {
    case ProfileActionTypes.LoadGoals: {
      return {
        ...initialState,
      };
    }

    case ProfileActionTypes.LoadGoalsSuccess: {
      const groupsHash = action.payload.reduce((hash, group) => {
        hash[group.type] = group;
        return hash;
      }, {} as {[key: string]: IDefaultGroup});

      return {
        ...state,
        loading: false,
        ...groupsHash,
        error: undefined,
      };
    }

    case ProfileActionTypes.LoadGoalsFail: {
      return {
        ...state,
        loading: false,
        [GroupType.Mind]: undefined,
        [GroupType.Body]: undefined,
        [GroupType.Soul]: undefined,
        error: 'Load goals error',
      };
    }

    default:
      return state;
  }
}


export const selectProfileState = createFeatureSelector<State>('profile');

export const selectLoading = createSelector(
  selectProfileState,
  (state: State) => state.loading,
);

export const selectMind = createSelector(
  selectProfileState,
  (state: State) => state[GroupType.Mind],
);

export const selectBody = createSelector(
  selectProfileState,
  (state: State) => state[GroupType.Body],
);

export const selectSoul = createSelector(
  selectProfileState,
  (state: State) => state[GroupType.Soul],
);

export const selectError = createSelector(
  selectProfileState,
  (state: State) => state.error,
);
