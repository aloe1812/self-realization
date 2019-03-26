import { ProfileActionTypes, ProfileActionsUnion } from '../actions/profile.actions';
import { IDefaultGoal, INewDefaultGoal } from '../models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { goalsNormalizer, groupSorter, GroupTypes } from '../../../utils/common';
import produce from 'immer';
import { NormalizedItems } from '../../../models';

export interface State {
  loading: boolean;

  groupsId: {
    [key: string]: string;
  };

  goals: {
    [key: string]: NormalizedItems<IDefaultGoal>;
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
      const goals = {} as { [key: string]: NormalizedItems<IDefaultGoal> };
      const groupsId = {} as { [key: string]: string };
      const newGoal = {} as { [key: string]: INewDefaultGoal };

      action.payload
        .filter(g => GroupTypes.indexOf(g.type) !== -1)
        .forEach(group => {
          groupsId[group.type] = group._id;
          goals[group.type] = group.goals.reduce(
            goalsNormalizer,
            { byId: {}, allIds: [] } as NormalizedItems<IDefaultGoal>,
          );
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
      .sort(groupSorter)
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

