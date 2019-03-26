import { Action } from '@ngrx/store';
import { Day } from '../models';

export enum DayActionTypes {
  LoadDay = '[Day] Load Day',
  LoadDaySuccess = '[Day] Load Day Success',
  LoadDayFail = '[Day] Load Day Fail',
}

export class LoadDay implements Action {
  readonly type = DayActionTypes.LoadDay;
  constructor(public payload: string) {}
}

export class LoadDaySuccess implements Action {
  readonly type = DayActionTypes.LoadDaySuccess;
  constructor(public payload: Day) {}
}

export class LoadDayFail implements Action {
  readonly type = DayActionTypes.LoadDayFail;
  constructor(public payload: any) {}
}


export type DayActionsUnion = LoadDay | LoadDaySuccess | LoadDayFail;
