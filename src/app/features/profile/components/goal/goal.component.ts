import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges,
         SimpleChanges, Output, EventEmitter, SimpleChange } from '@angular/core';
import { IDefaultGoal } from '../../models';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalComponent implements OnInit, OnChanges {

  @Input() goal: IDefaultGoal;

  @Output() updateGoal: EventEmitter<IDefaultGoal> = new EventEmitter();
  @Output() deleteGoal: EventEmitter<IDefaultGoal> = new EventEmitter();

  titleCtrl: FormControl;
  isEdit = false;
  isNewGoal = false;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.titleCtrl = new FormControl(this.goal.title, Validators.required);
    this.isNewGoal = !this.goal._id;

    if (this.isNewGoal) {
      this.isEdit = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!(changes.goal && !changes.goal.firstChange)) {
      return;
    }

    // toggle edit status if new goal was saved (i.e. title changed)
    if (this.goalHasChanged(changes.goal)) {
      this.isEdit = false;
    }
  }

  toggleEdit() {
    if (this.isNewGoal) {
      this.deleteGoal.next();
      return;
    }

    if (!this.titleCtrl) {
      this.titleCtrl = new FormControl(this.goal.title);
    }

    this.isEdit = !this.isEdit;
  }

  save() {
    if (this.titleCtrl.invalid) {
      return;
    }

    // toggle edit status is title was not changed
    if (!this.isNewGoal && (this.titleCtrl.value === this.goal.title)) {
      this.isEdit = false;
      return;
    }

    this.updateGoal.next({
      ...this.goal,
      title: this.titleCtrl.value,
    });
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Are you sure you want to delete?',
        confirmTitle: 'Delete',
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.deleteGoal.next(this.goal);
        }
      });
  }

  private goalHasChanged(change: SimpleChange) {
    return change.currentValue.title !== change.previousValue.title;
  }

}
