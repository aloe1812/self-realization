import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IDefaultGoal, INewDefaultGoal } from '../../models';
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
    trigger('toggle', [
      state('hide',
        style({
          transform: 'rotate(180deg)',
        })),
      state('show, void',
        style({
          transform: 'rotate(0)',
        })),
      transition('* => *', animate('200ms ease')),
    ]),
  ],
})
export class GroupComponent implements OnInit {

  @Input() goals: IDefaultGoal[];
  @Input() type: GroupType;
  @Input() newGoal: INewDefaultGoal;

  @Output() addGoal = new EventEmitter();
  @Output() removeGoal = new EventEmitter();

  @Output() updateGoal: EventEmitter<IDefaultGoal> = new EventEmitter();
  @Output() deleteGoal: EventEmitter<IDefaultGoal> = new EventEmitter();
  @Output() createGoal: EventEmitter<INewDefaultGoal> = new EventEmitter();

  detailsState = 'show';

  get title() {
    return Groups[this.type].title; // move get title by type to service
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

  onCreateGoal($event: INewDefaultGoal) {
    this.createGoal.next($event);
  }

  triggerAddGoal() {
    this.addGoal.next();
  }

  onRemoveGoal() {
    this.removeGoal.next();
  }

}
