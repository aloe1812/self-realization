import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, selectLoggedIn } from '../../reducers';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Are you sure you want to logout?',
        confirmTitle: 'Logout',
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.store.dispatch(new UserActions.Logout());
        }
      });
  }

}
