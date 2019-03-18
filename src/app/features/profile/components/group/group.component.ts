import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IDefaultGoal, IDefaultGoalTemplate, AddGoalStatus } from '../../models';
import { Groups } from '../../../../texts/texts';
import { GroupType } from '../../../../enums';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('dropdown', [
      state('hide',
        style({
          height: 0,
          opacity: 0,
          'margin-right': '-280px',
        })),
      state('show, void',
        style({
          height: '*',
          opacity: 1,
          'margin-right': '10px',
        })),
      transition('* => *', animate('200ms ease')),
    ]),
  ],
})
export class GroupComponent implements OnInit {

  @Input() goals: IDefaultGoal[];
  @Input() type: GroupType;
  @Input() addGoalStatus: AddGoalStatus;

  @Output() updateGoal: EventEmitter<IDefaultGoal> = new EventEmitter();
  @Output() deleteGoal: EventEmitter<IDefaultGoal> = new EventEmitter();
  @Output() createGoal: EventEmitter<IDefaultGoalTemplate> = new EventEmitter();

  @Output() addGoal = new EventEmitter();
  @Output() removeGoal = new EventEmitter();

  addGoalTemplate = { title: '' };
  detailsState = 'show';

  get title() {
    return Groups[this.type].title;
  }

  get icon() {
    return `assets/icons/${this.type}.svg`;
  }

  get description() {
    return Groups[this.type].description;
  }

  constructor() { }

  ngOnInit() {
  }

  toggleDetails() {
    this.detailsState = this.detailsState === 'show' ? 'hide' : 'show';
  }

  trackByFn(index: number, item: IDefaultGoal) {
    return item._id;
  }

  onUpdateGoal($event: IDefaultGoal) {
    this.updateGoal.next($event);
  }

  onDeleteGoal($event: IDefaultGoal) {
    this.deleteGoal.next($event);
  }

  onCreateGoal($event: IDefaultGoalTemplate) {
    this.createGoal.next($event);
  }

  triggerAddGoal() {
    this.addGoal.next();
  }

  onRemoveGoal() {
    this.removeGoal.next();
  }

}
