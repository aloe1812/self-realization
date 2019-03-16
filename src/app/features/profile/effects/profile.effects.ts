import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProfileActionTypes } from '../actions/profile.actions';
import * as ProfileActions from '../actions/profile.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
  ) {}

}
