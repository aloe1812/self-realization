import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProfileActionTypes } from '../actions/profile.actions';
import * as fromProfile from '../reducers/profile.reducer';
import * as ProfileActions from '../actions/profile.actions';
import { switchMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';

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
  createGoal$ = this.actions$.pipe(
    ofType<ProfileActions.CreateGoal>(ProfileActionTypes.CreateGoal),
    map(action => action.payload),
    withLatestFrom(this.store.select(fromProfile.selectGroupsIds)),
    switchMap(([createData, groupsIds]) =>
      this.profileService.createGoal({
        ...createData.goal,
        typeId: groupsIds[createData.groupType],
      })
        .pipe(
          map(goal => new ProfileActions.CreateGoalSuccess({
            goal,
            groupType: createData.groupType,
          })),
          catchError(() => of(new ProfileActions.CreateGoalFail(createData.groupType))),
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
          map(goal => new ProfileActions.UpdateGoalSuccess({
            goal,
            groupType: updateData.groupType,
          })),
          catchError(() => of(new ProfileActions.UpdateGoalFail({
            goalData: updateData,
            message: 'Update failed!',
          }))),
        ),
    ),
  );

  @Effect()
  deleteGoal$ = this.actions$.pipe(
    ofType<ProfileActions.DeleteGoal>(ProfileActionTypes.DeleteGoal),
    map(action => action.payload),
    withLatestFrom(this.store.select(fromProfile.selectGroupsIds)),
    switchMap(([deleteData, groupsIds]) =>
      this.profileService.deleteGoal({
        id: deleteData.goal._id,
        typeId: groupsIds[deleteData.groupType],
      })
        .pipe(
          map(() => new ProfileActions.DeleteGoalSuccess(deleteData)),
          catchError(() => of(new ProfileActions.UpdateGoalFail({
            goalData: deleteData,
            message: 'Delete failed!',
          }))),
        ),
    ),
  );

  @Effect({ dispatch: false })
  updateGoalsFail$ = this.actions$.pipe(
    ofType<ProfileActions.UpdateGoalFail>(ProfileActionTypes.UpdateGoalFail),
    map(action => action.payload.message),
    tap(message => this.snackBar.open(message, 'Got it', { duration: 2000 })),
  );

  @Effect({ dispatch: false })
  createGoalFail$ = this.actions$.pipe(
    ofType<ProfileActions.CreateGoalFail>(ProfileActionTypes.CreateGoalFail),
    tap(() => this.snackBar.open('Creating new goal failed', 'Got it', { duration: 2000 })),
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store<fromProfile.State>,
    private snackBar: MatSnackBar,
  ) {}

}
