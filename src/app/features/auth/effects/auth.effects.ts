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
        map((user: any) => new AuthActions.AuthSuccess()),
        catchError(error => of(new AuthActions.AuthSuccess())),
      ),
    ),
  );

  @Effect({ dispatch: false })
  authSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.AuthSuccess),
    tap(() => this.router.navigate(['/day'])),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

}
