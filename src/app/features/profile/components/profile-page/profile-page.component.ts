import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUser from './../../../../core/reducers';
import * as fromProfile from './../../reducers/profile.reducer';
import * as ProfileActions from '../../actions/profile.actions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent implements OnInit {

  user$ = this.store.pipe(select(fromUser.selectUsername));
  loading$ = this.store.pipe(select(fromProfile.selectLoading));
  mind$ = this.store.pipe(select(fromProfile.selectMind));
  body$ = this.store.pipe(select(fromProfile.selectBody));
  soul$ = this.store.pipe(select(fromProfile.selectSoul));
  error$ = this.store.pipe(select(fromProfile.selectError));

  constructor(
    private store: Store<fromUser.State>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new ProfileActions.LoadGoals());
  }

}
