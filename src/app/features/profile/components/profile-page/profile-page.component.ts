import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUser from './../../../../core/reducers';
import * as fromProfile from './../../reducers/profile.reducer';
import * as ProfileActions from '../../actions/profile.actions';
import { IDefaultGoal, IDefaultGroup, IAddDefaultGoal } from '../../models';
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
  groups$ = this.store.pipe(select(fromProfile.selectGroups));
  addGoal$ = this.store.pipe(select(fromProfile.selectAddGoal));
  error$ = this.store.pipe(select(fromProfile.selectError));

  constructor(
    private store: Store<fromUser.State>,
  ) { }

  ngOnInit() {
    this.load();
  }

  trackByFn(index: number, item: IDefaultGroup) {
    return item.type;
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

  onCreateGoal(goal: IAddDefaultGoal, type: GroupType) {
    this.store.dispatch(new ProfileActions.CreateGoal({
      goal,
      groupType: type,
    }));
  }

  onAddedGoal(type: GroupType) {
    this.store.dispatch(new ProfileActions.AddGoal(type));
  }

  onRemoveGoal(type: GroupType) {
    this.store.dispatch(new ProfileActions.RemoveGoal(type));
  }

  load() {
    this.store.dispatch(new ProfileActions.LoadGoals());
  }

}
