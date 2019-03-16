import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes } from '../actions/auth.actions';
import * as AuthActions from '../actions/auth.actions';
import { catchError, exhaustMap, map, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Authenticate } from '../models';
import { Router } from '@angular/router';
import * as UserActions from '../../../core/actions/user.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<AuthActions.Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.authService.signIn(auth).pipe(
        map(user => new AuthActions.LoginSuccess(user)),
        catchError(error => of(new AuthActions.AuthFailure(error))),
      ),
    ),
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType<AuthActions.Register>(AuthActionTypes.Register),
    map(action => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.authService.signUp(auth).pipe(
        map(user => new AuthActions.RegisterSuccess(user)),
        catchError(error => of(new AuthActions.AuthFailure(error))),
      ),
    ),
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType<AuthActions.LoginSuccess>(AuthActionTypes.LoginSuccess),
    map(action => action.payload),
    switchMap(user => [
      new UserActions.Save(user),
      new AuthActions.LoginRedirect(),
    ]),
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<AuthActions.LoginRedirect>(AuthActionTypes.LoginRedirect),
    tap(() => this.router.navigate(['/day'])),
  );

  @Effect()
  registerSuccess$ = this.actions$.pipe(
    ofType<AuthActions.RegisterSuccess>(AuthActionTypes.RegisterSuccess),
    map(action => action.payload),
    switchMap(user => [
      new UserActions.Save(user),
      new AuthActions.RegisterRedirect(),
    ]),
  );

  @Effect({ dispatch: false })
  registerRedirect$ = this.actions$.pipe(
    ofType<AuthActions.RegisterRedirect>(AuthActionTypes.RegisterRedirect),
    tap(() => this.router.navigate(['/profile'])),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

}
