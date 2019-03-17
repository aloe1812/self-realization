import { ProfileActionTypes, ProfileActionsUnion } from '../actions/profile.actions';
import { IDefaultGoal } from '../models';
import { GroupType } from '../../../enums';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { enumToArray } from '../../../utils/common';

interface NormalizedGoals {
  byId: {
    [key: string]: IDefaultGoal;
  };
  allIds: string[];
}

const GroupTypes = enumToArray(GroupType);

function goalsNormalizer(result: NormalizedGoals, goal: IDefaultGoal) {
  result.byId[goal._id] = goal;
  result.allIds.push(goal._id);
  return result;
}

export interface State {
  loading: boolean;
  groupsId: {
    [key: string]: string;
  };
  mindGoals: NormalizedGoals;
  bodyGoals: NormalizedGoals;
  soulGoals: NormalizedGoals;
  error: string;
}

export const initialState: State = {
  loading: true,
  groupsId: undefined,
  mindGoals: undefined,
  bodyGoals: undefined,
  soulGoals: undefined,
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
      const goals = {} as { [key: string]: NormalizedGoals };
      const groupsId = {} as { [key: string]: string };

      action.payload
        .filter(g => GroupTypes.indexOf(g.type) !== -1)
        .forEach(group => {
          const goalsKey = `${group.type}Goals`;
          groupsId[group.type] = group._id;
          goals[goalsKey] = group.goals.reduce(goalsNormalizer, { byId: {}, allIds: [] } as NormalizedGoals);
        });

      return {
        ...state,
        loading: false,
        error: undefined,
        groupsId,
        ...goals,
      };
    }

    case ProfileActionTypes.LoadGoalsFail: {
      return {
        ...initialState,
        loading: false,
        error: 'Something went wrong on loading profile',
      };
    }

    case ProfileActionTypes.UpdatedGoal: {
      const { groupType, goal } = action.payload;
      const goalsKey = `${groupType}Goals`;

      return {
        ...state,
        [goalsKey]: {
          byId: {
            ...state[goalsKey].byId,
            [goal._id]: { ...goal },
          },
          allIds: [...state[goalsKey].allIds],
        },
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

export const selectMindGoals = createSelector(
  selectProfileState,
  (state: State) => state.mindGoals.allIds.map(id => state.mindGoals.byId[id]),
);

export const selectBodyGoals = createSelector(
  selectProfileState,
  (state: State) => state.bodyGoals.allIds.map(id => state.bodyGoals.byId[id]),
);

export const selectSoulGoals = createSelector(
  selectProfileState,
  (state: State) => state.soulGoals.allIds.map(id => state.soulGoals.byId[id]),
);

export const selectError = createSelector(
  selectProfileState,
  (state: State) => state.error,
);

export const selectGroupsIds = createSelector(
  selectProfileState,
  (state: State) => state.groupsId,
);
