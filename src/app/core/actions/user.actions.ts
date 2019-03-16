import { Action } from '@ngrx/store';

export enum UserActionTypes {
  Save = '[User] Save',
  Remove = '[User] Remove',

  RedirectLogin = '[User] Redirect Login',
  RedirectDay = '[User] Redirect Day',
}

export interface IUserDetails {
  username: string;
  token: string;
}

export class Save implements Action {
  readonly type = UserActionTypes.Save;

  constructor(public payload: IUserDetails) {}
}

export class Remove implements Action {
  readonly type = UserActionTypes.Remove;
}

export class RedirectLogin implements Action {
  readonly type = UserActionTypes.RedirectLogin;
}

export class RedirectDay implements Action {
  readonly type = UserActionTypes.RedirectDay;
}

export type UserActionsUnion = Save | Remove | RedirectLogin | RedirectDay;
