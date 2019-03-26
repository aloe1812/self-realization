import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import * as DayActions from '../actions/day.actions';
import { DayActionTypes } from '../actions/day.actions';
import { DayService } from '../services/day.service';


@Injectable()
export class DayEffects {

  @Effect()
  loadGoals$ = this.actions$.pipe(
    ofType<DayActions.LoadDay>(DayActionTypes.LoadDay),
    map(action => action.payload),
    switchMap(date =>
      this.dayService.loadDay(date).pipe(
        map(day => new DayActions.LoadDaySuccess(day)),
        catchError((error: HttpErrorResponse) => of(new DayActions.LoadDayFail(error))),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private dayService: DayService,
  ) {}

}
