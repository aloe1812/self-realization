import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromDay from '../../reducers/day.reducer';
import * as DayActions from '../../actions/day.actions';
import { Goal } from '../../models';

@Component({
  selector: 'app-day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss'],
})
export class DayPageComponent implements OnInit {

  loading$ = this.store.pipe(select(fromDay.selectLoading));
  groups$ = this.store.pipe(select(fromDay.selectGroups));

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromDay.State>,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      const date = p.get('date');
      this.store.dispatch(new DayActions.LoadDay(date));
    });
  }

  trackByFn(index: number, item: { group: fromDay.NormalizedGroup; goals: Goal[]}) {
    return item.group.id;
  }

}
