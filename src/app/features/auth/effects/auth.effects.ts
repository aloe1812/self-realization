import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Login, AuthActionTypes } from '../auth.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../auth.actions';
import { Authenticate } from '../models';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.authService.signIn(auth).pipe(
        map(user => new AuthActions.LoginSuccess(user)),
        catchError(error => of(new AuthActions.AuthFailure())),
      ),
    ),
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Register),
    map(action => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.authService.signIn(auth).pipe(
        map(user => new AuthActions.RegisterSuccess(user)),
        catchError(error => of(new AuthActions.AuthFailure())),
      ),
    ),
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/day'])),
  );

  @Effect({ dispatch: false })
  registerSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.RegisterSuccess),
    tap(() => this.router.navigate(['/profile'])),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

}
