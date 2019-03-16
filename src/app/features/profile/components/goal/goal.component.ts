import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IDefaultGoal } from '../../models';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalComponent implements OnInit {

  @Input() goal: IDefaultGoal;

  constructor() { }

  ngOnInit() {
  }

}
