import { createFeatureSelector } from '@ngrx/store';
import { enumToArray, goalsNormalizer } from '../../../utils/common';
import { GroupType } from '../../../enums';
import { DayActionsUnion, DayActionTypes } from '../actions/day.actions';
import produce from 'immer';
import { Goal } from '../models';
import { NormalizedItems } from '../../../models';

const GroupTypes = enumToArray(GroupType);

export interface NormalizedGroup {
  id: string;
  type: GroupType;
  complete: number;
}

export interface State {
  loading: boolean;
  date: string;
  dayComplete: number;
  error: string;
  groups: {
    [key: string]: NormalizedGroup;
  };
  goals: {
    [key: string]: NormalizedItems<Goal>;
  };
}

export const initialState: State = {
  loading: true,
  date: undefined,
  dayComplete: 0,
  error: undefined,
  groups: undefined,
  goals: undefined,
};

export const reducer = produce((draftState: State, action: DayActionsUnion): State => {
  switch (action.type) {

    case DayActionTypes.LoadDay: {
      draftState.loading = true;
      draftState.date = action.payload;
      return;
    }

    case DayActionTypes.LoadDaySuccess: {
      draftState.loading = false;
      draftState.dayComplete = action.payload.complete;
      draftState.error = undefined;
      draftState.groups = {};
      draftState.goals = {};

      action.payload.groups
        .filter(g => GroupTypes.indexOf(g.type) !== -1)
        .forEach(group => {
          draftState.groups[group.type] = {
            id: group._id,
            type: group.type,
            complete: group.complete,
          };

          draftState.goals[group.type] = group.goals.reduce(
            goalsNormalizer,
            { byId: {}, allIds: [] } as NormalizedItems<Goal>,
          );
        });

      return;
    }

    default:
      return draftState;
  }
}, initialState);

export const selectProfileState = createFeatureSelector<State>('day');
