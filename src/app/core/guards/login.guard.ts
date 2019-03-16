import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State, selectLoggedIn } from '../reducers';
import { map, take } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {

  constructor(private store: Store<State>) {}

  canLoad(): Observable<boolean> {
    return this.store.pipe(
      select(selectLoggedIn),
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.store.dispatch(new UserActions.RedirectDay());
          return false;
        }

        return true;
      }),
      take(1),
    );
  }

}
