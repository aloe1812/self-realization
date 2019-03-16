import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, selectLoggedIn } from '../../reducers';
import { MatDialog } from '@angular/material';
import { ConfirmLogoutDialogComponent } from '../confirm-logout-dialog/confirm-logout-dialog.component';
import * as UserActions from '../../actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  loggedIn$ = this.store.pipe(select(selectLoggedIn));

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
  ) {}

  ngOnInit() { }

  confirmLogout() {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent);
    dialogRef.afterClosed()
    .subscribe(res => {
      if (res === 'logout') {
        this.store.dispatch(new UserActions.Logout());
      }
    });
  }

}
