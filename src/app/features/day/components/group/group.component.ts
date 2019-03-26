import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NormalizedGroup } from '../../reducers/day.reducer';
import { Goal } from '../../models';
import GroupText from '../../../../texts/groups.json';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('dropdown', [
      state('hide, void',
        style({
          height: 0,
          opacity: 0,
          'margin-right': '-280px',
        })),
      state('show',
        style({
          height: '*',
          opacity: 1,
          'margin-right': '10px',
        })),
      transition('* => *', animate('200ms ease')),
    ]),
    trigger('toggle', [
      state('hide, void',
        style({
          transform: 'rotate(180deg)',
        })),
      state('show',
        style({
          transform: 'rotate(0)',
        })),
      transition('* => *', animate('200ms ease')),
    ]),
  ],
})
export class GroupComponent implements OnInit {

  @Input() group: NormalizedGroup;
  @Input() goals: Goal[];

  constructor() { }

  detailsState = 'hide';

  get title() {
    if (!this.group) {
      return null;
    }

    return GroupText[this.group.type].title; // move get title by type to service
  }

  get icon() {
    if (!this.group) {
      return null;
    }

    return `assets/icons/${this.group.type}.svg`;
  }

  get description() {
    if (!this.group) {
      return null;
    }

    return GroupText[this.group.type].description;
  }

  ngOnInit() {
  }

  toggleDetails() {
    this.detailsState = this.detailsState === 'show' ? 'hide' : 'show';
  }

}
