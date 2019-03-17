import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProfileActionTypes } from '../actions/profile.actions';
import * as fromProfile from '../reducers/profile.reducer';
import * as ProfileActions from '../actions/profile.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable()
export class ProfileEffects {

  @Effect()
  loadGoals$ = this.actions$.pipe(
    ofType<ProfileActions.LoadGoals>(ProfileActionTypes.LoadGoals),
    switchMap(() =>
      this.profileService.loadGoals().pipe(
        map(groups => new ProfileActions.LoadGoalsSuccess(groups)),
        catchError((error: HttpErrorResponse) => of(new ProfileActions.LoadGoalsFail(error))),
      ),
    ),
  );

  @Effect()
  updateGoal$ = this.actions$.pipe(
    ofType<ProfileActions.UpdateGoal>(ProfileActionTypes.UpdateGoal),
    map(action => action.payload),
    withLatestFrom(this.store.select(fromProfile.selectGroupsIds)),
    switchMap(([updateData, groupsIds]) =>
      this.profileService.updateGoal({
        id: updateData.goal._id,
        title: updateData.goal.title,
        typeId: groupsIds[updateData.groupType],
      })
        .pipe(
          map(goal => new ProfileActions.UpdatedGoal({
            goal,
            groupType: updateData.groupType,
          })),
          catchError((error: HttpErrorResponse) => of(new ProfileActions.LoadGoalsFail(error))),
        ),
    ),
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store<fromProfile.State>,
  ) {}

}
