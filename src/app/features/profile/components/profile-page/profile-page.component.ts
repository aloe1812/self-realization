import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUser from './../../../../core/reducers';
import * as fromProfile from './../../reducers/profile.reducer';
import * as ProfileActions from '../../actions/profile.actions';
import { IDefaultGoal } from '../../models';
import { GroupType } from '../../../../enums';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent implements OnInit {

  user$ = this.store.pipe(select(fromUser.selectUsername));
  loading$ = this.store.pipe(select(fromProfile.selectLoading));
  mindGoals$ = this.store.pipe(select(fromProfile.selectMindGoals));
  bodyGoals$ = this.store.pipe(select(fromProfile.selectBodyGoals));
  soulGoals$ = this.store.pipe(select(fromProfile.selectSoulGoals));
  error$ = this.store.pipe(select(fromProfile.selectError));

  constructor(
    private store: Store<fromUser.State>,
  ) { }

  ngOnInit() {
    this.load();
  }

  onUpdateGoal(goal: IDefaultGoal, type: GroupType) {
    this.store.dispatch(new ProfileActions.UpdateGoal({
      goal,
      groupType: type,
    }));
  }

  onDeleteGoal(goal: IDefaultGoal, type: GroupType) {
    this.store.dispatch(new ProfileActions.DeleteGoal({
      goal,
      groupType: type,
    }));
  }

  load() {
    this.store.dispatch(new ProfileActions.LoadGoals());
  }

}
