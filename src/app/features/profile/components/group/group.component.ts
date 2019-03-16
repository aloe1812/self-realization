import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IDefaultGroup } from '../../models';
import { Groups } from '../../../../texts/texts';

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

  @Input() group: IDefaultGroup;

  detailsState = 'show';

  get title() {
    return Groups[this.group.type].title;
  }

  get icon() {
    return `assets/icons/${this.group.type}.svg`;
  }

  get description() {
    return Groups[this.group.type].description;
  }

  constructor() { }

  ngOnInit() {
  }

  toggleDetails() {
    this.detailsState = this.detailsState === 'show' ? 'hide' : 'show';
  }

}
