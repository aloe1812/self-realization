import { Component, OnInit, ChangeDetectionStrategy, Inject, Renderer2, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../../reducers';
import * as AuthActions from '../../actions/auth.actions';
import { Authenticate } from '../../models';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit, OnDestroy {

  error$ = this.store.pipe(select(fromAuth.selectError));
  loadingPending$ = this.store.pipe(select(fromAuth.selectLoginPending));
  registerPending$ = this.store.pipe(select(fromAuth.selectRegisterPending));

  constructor(
    private store: Store<fromAuth.State>,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.document.body, 'login-page');
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'login-page');
  }

  onLogin(event: Authenticate) {
    this.store.dispatch(new AuthActions.Login(event));
  }

  onRegister(event: Authenticate) {
    this.store.dispatch(new AuthActions.Register(event));
  }

}
