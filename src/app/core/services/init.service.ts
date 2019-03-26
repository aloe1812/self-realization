import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as UserActions from '../actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class InitService {

  constructor(
    private store: Store<State>,
    private userService: UserService,
  ) { }

  init() {
    return new Promise(resolve => {
      const token = localStorage.getItem('sr-token');

      if (!token) {
        resolve();
        return;
      }

      // check that saved token is still valid
      this.userService.getMe(token)
        .subscribe(
          user => { // valid => save user info
            this.store.dispatch(new UserActions.Save({
              token,
              id: user.id,
              username: user.username,
            }));
            resolve();
          },
          () => { // invalid => remove token
            localStorage.removeItem('sr-token');
            resolve();
          },
        );
    });
  }

}
