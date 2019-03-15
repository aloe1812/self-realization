import { Action } from '@ngrx/store';
import { Authenticate, AuthResponse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Register = '[Auth] Register',

  LoginSuccess = '[Auth] Login Success',
  RegisterSuccess = '[Auth] Register Success',

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

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: AuthResponse) {}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.RegisterSuccess;

  constructor(public payload: AuthResponse) {}
}

export class AuthFailure implements Action {
  readonly type = AuthActionTypes.AuthFailure;

  constructor(public payload: HttpErrorResponse) {}
}

export type AuthActionsUnion =
  | Login
  | Register
  | LoginSuccess
  | RegisterSuccess
  | AuthFailure;
