import { Action } from '@ngrx/store';
import { Authenticate } from './models';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Register = '[Auth] Register',

  AuthSuccess = '[Auth] Auth Success',
  AuthFailure = '[Auth] Auth Failure',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class Register implements Action {
  readonly type = AuthActionTypes.Register;

  constructor(public payload: Authenticate) {}
}

export class AuthSuccess implements Action {
  readonly type = AuthActionTypes.AuthSuccess;
}

export class AuthFailure implements Action {
  readonly type = AuthActionTypes.AuthFailure;
}

export type AuthActionsUnion =
  | Login
  | Register
  | AuthSuccess
  | AuthFailure;
