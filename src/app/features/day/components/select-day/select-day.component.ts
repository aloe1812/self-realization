import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import dayjs from 'dayjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-day',
  templateUrl: './select-day.component.html',
  styleUrls: ['./select-day.component.scss'],
})
export class SelectDayComponent implements OnInit {

  currentDay: string;
  prevDay: string;
  nextDay: string;
  dateControl = new FormControl();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.dateControl = new FormControl();

    // redirect to new selected datepicker changes
    this.dateControl.valueChanges.subscribe((day: Date) => {
      const parsed = dayjs(day);
      this.router.navigate(['/day', parsed.format('YYYY-MM-DD')]);
    });

    // listen to route params changes
    this.route.paramMap.subscribe(p => {
      const date = p.get('date');
      const parsed = dayjs(date);

      this.currentDay = parsed.format('D MMM YYYY');
      this.prevDay = parsed.subtract(1, 'day').format('D MMM YYYY');
      this.nextDay = parsed.add(1, 'day').format('D MMM YYYY');

      this.dateControl.setValue(parsed.toDate(), { emitEvent: false });
    });
  }

}
