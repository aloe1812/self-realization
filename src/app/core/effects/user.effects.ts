import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { UserActionTypes } from '../actions/user.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserEffects {

  @Effect({ dispatch: false })
  registerSuccess$ = this.actions$.pipe(
    ofType(UserActionTypes.RedirectLogin),
    tap(() => this.router.navigate(['/login'])),
  );

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

}
