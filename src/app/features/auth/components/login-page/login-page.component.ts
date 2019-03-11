import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../../reducers';
import * as AuthActions from '../../auth.actions';
import { Authenticate } from '../../models';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {

  error$ = this.store.pipe(select(fromAuth.selectError));
  loadingPending$ = this.store.pipe(select(fromAuth.selectLoginPending));
  registerPending$ = this.store.pipe(select(fromAuth.selectRegisterPending));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {
  }

  onLogin(event: Authenticate) {
    this.store.dispatch(new AuthActions.Login(event));
  }

  onRegister(event: Authenticate) {
    this.store.dispatch(new AuthActions.Register(event));
  }

}
