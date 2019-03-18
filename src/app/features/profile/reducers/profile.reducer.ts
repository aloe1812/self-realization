import { ProfileActionTypes, ProfileActionsUnion } from '../actions/profile.actions';
import { IDefaultGoal, NormalizedGoals, INewDefaultGoal } from '../models';
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
      const newGoal = {} as { [key: string]: INewDefaultGoal };

      action.payload
        .filter(g => GroupTypes.indexOf(g.type) !== -1)
        .forEach(group => {
          groupsId[group.type] = group._id;
          goals[group.type] = group.goals.reduce(goalsNormalizer, { byId: {}, allIds: [] } as NormalizedGoals);
          newGoal[group.type] = undefined;
        });

      return {
        ...state,
        loading: false,
        error: undefined,
        groupsId,
        goals,
        newGoal,
      };
    }

    case ProfileActionTypes.LoadGoalsFail: {
      return {
        ...initialState,
        loading: false,
        error: 'Something went wrong on loading profile',
      };
    }

    case ProfileActionTypes.UpdateGoal: {
      const { groupType, goal } = action.payload;
      const groupGoals = state.goals[groupType];

      return {
        ...state,
        goals: {
          ...state.goals,
          [groupType]: {
            byId: {
              ...groupGoals.byId,
              [goal._id]: {
                ...groupGoals.byId[goal._id],
                isSaving: true,
              },
            },
            allIds: groupGoals.allIds,
          },
        },
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
              [goal._id]: {
                ...goal,
                isSaving: false,
              },
            },
            allIds: groupGoals.allIds,
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
              [goal._id]: {
                ...groupGoals.byId[goal._id],
                isSaving: false,
                isDeleting: false,
              },
            },
            allIds: [...groupGoals.allIds],
          },
        },
      };
    }

    case ProfileActionTypes.DeleteGoal: {
      const { groupType, goal } = action.payload;
      const groupGoals = state.goals[groupType];

      return {
        ...state,
        goals: {
          ...state.goals,
          [groupType]: {
            byId: {
              ...groupGoals.byId,
              [goal._id]: {
                ...groupGoals.byId[goal._id],
                isDeleting: true,
              },
            },
            allIds: groupGoals.allIds,
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
        newGoal: {
          ...state.newGoal,
          [type]: { title: '' },
        },
      };
    }

    case ProfileActionTypes.RemoveGoal: {
      const type = action.payload;

      return {
        ...state,
        newGoal: {
          ...state.newGoal,
          [type]: undefined,
        },
      };
    }

    case ProfileActionTypes.CreateGoal: {
      const { groupType } = action.payload;

      return {
        ...state,
        newGoal: {
          ...state.newGoal,
          [groupType]: {
            ...state.newGoal[groupType],
            isSaving: true,
          },
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
        newGoal: {
          ...state.newGoal,
          [groupType]: undefined,
        },
      };
    }

    case ProfileActionTypes.CreateGoalFail: {
      const type = action.payload;

      return {
        ...state,
        newGoal: {
          ...state.newGoal,
          [type]: {
            ...state.newGoal[type],
            isSaving: false,
          },
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

export const selectNewGoal = createSelector(
  selectProfileState,
  (state: State) => state.newGoal,
);

export const selectError = createSelector(
  selectProfileState,
  (state: State) => state.error,
);

