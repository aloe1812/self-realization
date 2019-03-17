import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IDefaultGroup, IDefaultGoal } from '../models';
import { GroupType } from '../../../enums';

export enum ProfileActionTypes {
  LoadGoals = '[Profile] Load Goals',
  LoadGoalsSuccess = '[Profile] Load Goals Success',
  LoadGoalsFail = '[Profile] Load Goals Fail',

  UpdateGoal = '[Profile] Update Goal',
  UpdateGoalSuccess = '[Profile] Update Goal Success',
  UpdateGoalFail = '[Profile] Updated Goal Fail',

  DeleteGoal = '[Profile] Delete Goal',
  DeleteGoalSuccess = '[Profile] Delete Goal Success',
}

export interface GoalPayload {
  goal: IDefaultGoal;
  groupType: GroupType;
}

export class LoadGoals implements Action {
  readonly type = ProfileActionTypes.LoadGoals;
}

export class LoadGoalsSuccess implements Action {
  readonly type = ProfileActionTypes.LoadGoalsSuccess;

  constructor(public payload: IDefaultGroup[]) {}
}

export class LoadGoalsFail implements Action {
  readonly type = ProfileActionTypes.LoadGoalsFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateGoal implements Action {
  readonly type = ProfileActionTypes.UpdateGoal;

  constructor(public payload: GoalPayload) {}
}

export class UpdateGoalSuccess implements Action {
  readonly type = ProfileActionTypes.UpdateGoalSuccess;

  constructor(public payload: GoalPayload) {}
}

export class UpdateGoalFail implements Action {
  readonly type = ProfileActionTypes.UpdateGoalFail;

  constructor(public payload: {
    goalData: GoalPayload,
    message: string,
  }) {}
}

export class DeleteGoal implements Action {
  readonly type = ProfileActionTypes.DeleteGoal;

  constructor(public payload: GoalPayload) {}
}

export class DeleteGoalSuccess implements Action {
  readonly type = ProfileActionTypes.DeleteGoalSuccess;

  constructor(public payload: GoalPayload) {}
}

export type ProfileActionsUnion =
  | LoadGoals
  | LoadGoalsSuccess
  | LoadGoalsFail
  | UpdateGoal
  | UpdateGoalSuccess
  | UpdateGoalFail
  | DeleteGoal
  | DeleteGoalSuccess;
