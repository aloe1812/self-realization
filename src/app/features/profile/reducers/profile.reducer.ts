import { ProfileActionTypes, ProfileActionsUnion } from '../actions/profile.actions';
import { IDefaultGoal, NormalizedGoals, AddGoalStatus } from '../models';
import { GroupType } from '../../../enums';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { enumToArray } from '../../../utils/common';

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

  addGoalStatus: {
    [key: string]: AddGoalStatus;
  };

  error: string;
}

export const initialState: State = {
  loading: true,

  groupsId: undefined,
  goals: undefined,
  addGoalStatus: undefined,

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
      const addGoalStatus = {} as { [key: string]: AddGoalStatus };

      action.payload
        .filter(g => GroupTypes.indexOf(g.type) !== -1)
        .forEach(group => {
          groupsId[group.type] = group._id;
          goals[group.type] = group.goals.reduce(goalsNormalizer, { byId: {}, allIds: [] } as NormalizedGoals);
          addGoalStatus[group.type] = undefined;
        });

      return {
        ...state,
        loading: false,
        error: undefined,
        groupsId,
        goals,
        addGoalStatus,
      };
    }

    case ProfileActionTypes.LoadGoalsFail: {
      return {
        ...initialState,
        loading: false,
        error: 'Something went wrong on loading profile',
      };
    }

    case ProfileActionTypes.UpdateGoalSuccess: {
      const { groupType, goal } = action.payload;
      const groupGoals = state.goals[groupType];

      return {
        ...state,
        goals: {
          ...state.goals,
          [groupType]: {
            byId: {
              ...groupGoals.byId,
              [goal._id]: { ...goal },
            },
            allIds: [...groupGoals.allIds],
          },
        },
      };
    }

    case ProfileActionTypes.UpdateGoalFail: {
      const { goalData: { groupType, goal } } = action.payload;
      const groupGoals = state.goals[groupType];

      return {
        ...state,
        goals: {
          ...state.goals,
          [groupType]: {
            byId: {
              ...groupGoals.byId,
              [goal._id]: { ...groupGoals.byId[goal._id] },
            },
            allIds: [...groupGoals.allIds],
          },
        },
      };
    }

    case ProfileActionTypes.DeleteGoalSuccess: {
      const { groupType, goal } = action.payload;
      const groupGoals = state.goals[groupType];
      const { [goal._id]: deleted, ...restById } = groupGoals.byId;
      const newIds = groupGoals.allIds.filter(id => id !== goal._id);

      return {
        ...state,
        goals: {
          ...state.goals,
          [groupType]: {
            byId: {
              ...restById,
            },
            allIds: newIds,
          },
        },
      };
    }

    case ProfileActionTypes.AddGoal: {
      const type = action.payload;

      return {
        ...state,
        addGoalStatus: {
          ...state.addGoalStatus,
          [type]: { isSaving: false },
        },
      };
    }

    case ProfileActionTypes.RemoveGoal: {
      const type = action.payload;

      return {
        ...state,
        addGoalStatus: {
          ...state.addGoalStatus,
          [type]: undefined,
        },
      };
    }

    case ProfileActionTypes.CreateGoal: {
      const { groupType } = action.payload;

      return {
        ...state,
        addGoalStatus: {
          ...state.addGoalStatus,
          [groupType]: { isSaving: true },
        },
      };
    }

    case ProfileActionTypes.CreateGoalSuccess: {
      const { groupType, goal } = action.payload;
      const groupGoals = state.goals[groupType];

      return {
        ...state,
        goals: {
          ...state.goals,
          [groupType]: {
            byId: {
              ...groupGoals.byId,
              [goal._id]: goal,
            },
            allIds: [...groupGoals.allIds, goal._id],
          },
        },
        addGoalStatus: {
          ...state.addGoalStatus,
          [groupType]: undefined,
        },
      };
    }

    case ProfileActionTypes.CreateGoalFail: {
      const type = action.payload;

      return {
        ...state,
        addGoalStatus: {
          ...state.addGoalStatus,
          [type]: { isSaving: false },
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

export const selectAddGoalStatus = createSelector(
  selectProfileState,
  (state: State) => state.addGoalStatus,
);

export const selectError = createSelector(
  selectProfileState,
  (state: State) => state.error,
);

