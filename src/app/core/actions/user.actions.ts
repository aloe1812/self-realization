import { Action } from '@ngrx/store';

export enum UserActionTypes {
  Save = '[User] Save',
  Remove = '[User] Remove',

  RedirectLogin = '[User] Redirect Login',
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

export type UserActionsUnion = Save | Remove | RedirectLogin;
