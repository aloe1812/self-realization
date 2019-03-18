import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as UserActions from '../actions/user.actions';
import { UserActionTypes } from '../actions/user.actions';
import { tap, switchMap } from 'rxjs/operators';

@Injectable()
export class UserEffects {

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<UserActions.Logout>(UserActionTypes.Logout),
    switchMap(() => [
      new UserActions.Remove(),
      new UserActions.RedirectLogin(),
    ]),
  );

  @Effect({ dispatch: false })
  redirectLogin$ = this.actions$.pipe(
    ofType<UserActions.RedirectLogin>(UserActionTypes.RedirectLogin),
    tap(() => this.router.navigate(['/login'])),
  );

  @Effect({ dispatch: false })
  redirectDay$ = this.actions$.pipe(
    ofType<UserActions.RedirectDay>(UserActionTypes.RedirectDay),
    tap(() => this.router.navigate(['/day'])),
  );

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

}
