import { ProfileActionTypes, ProfileActionsUnion } from '../actions/profile.actions';
import { IDefaultGoal, NormalizedGoals, INewDefaultGoal } from '../models';
import { GroupType } from '../../../enums';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { enumToArray } from '../../../utils/common';
import produce from 'immer';

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

  goals: {
    [key: string]: NormalizedGoals;
  };

  newGoal: {
    [key: string]: INewDefaultGoal;
  };

  error: string;
}

export const initialState: State = {
  loading: true,

  groupsId: undefined,
  goals: undefined,
  newGoal: undefined,

  error: undefined,
};

export const reducer = produce((draftState: State, action: ProfileActionsUnion): State => {

  switch (action.type) {
    case ProfileActionTypes.LoadGoals: {
      return initialState;
    }

    case ProfileActionTypes.LoadGoalsSuccess: {
      const goals = {} as { [key: string]: NormalizedGoals };
      const groupsId = {} as { [key: string]: string };
      const newGoal = {} as { [key: string]: INewDefaultGoal };

      action.payload
        .filter(g => GroupTypes.indexOf(g.type) !== -1)
        .forEach(group => {
          groupsId[group.type] = group._id;
          goals[group.type] = group.goals.reduce(goalsNormalizer, { byId: {}, allIds: [] } as NormalizedGoals);
          newGoal[group.type] = undefined;
        });

      draftState.loading = false;
      draftState.error = undefined;
      draftState.groupsId = groupsId;
      draftState.goals = goals;
      draftState.newGoal = newGoal;

      return;
    }

    case ProfileActionTypes.LoadGoalsFail: {
      draftState.loading = false;
      draftState.error = 'Something went wrong on loading profile';
      return;
    }

    case ProfileActionTypes.UpdateGoal: {
      const { groupType, goal } = action.payload;
      draftState.goals[groupType].byId[goal._id].isSaving = true;
      return;
    }

    case ProfileActionTypes.UpdateGoalSuccess: {
      const { groupType, goal } = action.payload;

      draftState.goals[groupType].byId[goal._id] = {
        ...goal,
        isSaving: false,
      };
      return;
    }

    case ProfileActionTypes.UpdateGoalFail: {
      const { goalData: { groupType, goal } } = action.payload;

      draftState.goals[groupType].byId[goal._id].isSaving = false;
      draftState.goals[groupType].byId[goal._id].isDeleting = false;
      return;
    }

    case ProfileActionTypes.DeleteGoal: {
      const { groupType, goal } = action.payload;

      draftState.goals[groupType].byId[goal._id].isDeleting = false;
      return;
    }

    case ProfileActionTypes.DeleteGoalSuccess: {
      const { groupType, goal } = action.payload;

      delete draftState.goals[groupType].byId[goal._id];
      draftState.goals[groupType].allIds = draftState.goals[groupType].allIds.filter(id => id !== goal._id);
      return;
    }

    case ProfileActionTypes.AddGoal: {
      const type = action.payload;

      draftState.newGoal[type] = { title: '' };
      return;
    }

    case ProfileActionTypes.RemoveGoal: {
      const type = action.payload;

      draftState.newGoal[type] = undefined;
      return;
    }

    case ProfileActionTypes.CreateGoal: {
      const { groupType } = action.payload;

      draftState.newGoal[groupType].isSaving = true;
      return;
    }

    case ProfileActionTypes.CreateGoalSuccess: {
      const { groupType, goal } = action.payload;

      draftState.goals[groupType].byId[goal._id] = goal;
      draftState.goals[groupType].allIds.push(goal._id);
      draftState.newGoal[groupType] = undefined;
      return;
    }

    case ProfileActionTypes.CreateGoalFail: {
      const type = action.payload;

      draftState.newGoal[type].isSaving = false;
      return;
    }

    default:
      return draftState;
  }

}, initialState);

export const selectProfileState = createFeatureSelector<State>('profile');

export const selectLoading = createSelector(
  selectProfileState,
  (state: State) => state.loading,
);

export const selectGroups = createSelector(
  selectProfileState,
  (state: State) => {
    if (!state.goals) {
      return undefined;
    }

    return Object.keys(state.goals)
      .sort((a: GroupType, b: GroupType) => {
        const indexA = GroupTypes.indexOf(a);
        const indexB = GroupTypes.indexOf(b);
        return indexA - indexB;
      })
      .map(type => {
        const normalized = state.goals && state.goals[type];

        return {
          type,
          goals: normalized ? normalized.allIds.map(id => normalized.byId[id]) : undefined,
        };
      });
  },
);

export const selectGroupsIds = createSelector(
  selectProfileState,
  (state: State) => state.groupsId,
);

export const selectNewGoal = createSelector(
  selectProfileState,
  (state: State) => state.newGoal,
);

export const selectError = createSelector(
  selectProfileState,
  (state: State) => state.error,
);

