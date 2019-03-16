import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IDefaultGroup } from '../models';

export enum ProfileActionTypes {
  LoadGoals = '[Profile] Load Goals',
  LoadGoalsSuccess = '[Profile] Load Goals Success',
  LoadGoalsFail = '[Profile] Load Goals Fail',
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

export type ProfileActionsUnion = LoadGoals | LoadGoalsSuccess | LoadGoalsFail;
