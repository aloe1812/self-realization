import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromDay from '../../reducers/day.reducer';
import * as DayActions from '../../actions/day.actions';

@Component({
  selector: 'app-day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss'],
})
export class DayPageComponent implements OnInit {

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

}
