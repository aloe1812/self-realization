import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { UserActionTypes } from '../actions/user.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserEffects {

  @Effect({ dispatch: false })
  redirectLogin$ = this.actions$.pipe(
    ofType(UserActionTypes.RedirectLogin),
    tap(() => this.router.navigate(['/login'])),
  );

  @Effect({ dispatch: false })
  redirectDay$ = this.actions$.pipe(
    ofType(UserActionTypes.RedirectDay),
    tap(() => this.router.navigate(['/day'])),
  );

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

}
