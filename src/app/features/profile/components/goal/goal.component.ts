import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IDefaultGoal, AddGoalStatus } from '../../models';
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
  @Input() addGoalStatus: AddGoalStatus; // this component is an add goal component, if this input is not empty

  @Output() updateGoal: EventEmitter<IDefaultGoal> = new EventEmitter();
  @Output() deleteGoal: EventEmitter<IDefaultGoal> = new EventEmitter();

  titleCtrl: FormControl;

  isDeleting = false;
  isEdit = false;

  // tslint:disable-next-line: variable-name
  private _isSaving = false;

  get isAdd() {
    return !!this.addGoalStatus;
  }

  get isSaving() {
    return this._isSaving || (this.addGoalStatus && this.addGoalStatus.isSaving);
  }

  set isSaving(value: boolean) {
    this._isSaving = value;
  }

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    if (this.isAdd) {
      this.isEdit = true;
    }

    this.titleCtrl = new FormControl(this.goal.title, Validators.required);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!(changes.goal && !changes.goal.firstChange)) {
      return;
    }

    if (changes.goal.currentValue.title === changes.goal.previousValue.title) { // same goal returned => update failed
      this.isDeleting = false;
      this.isSaving = false;
    } else {
      this.setPristine();
    }
  }

  toggleEdit() {
    if (this.isAdd) {
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

    if (!this.isAdd) {
      if (this.titleCtrl.value === this.goal.title) {
        this.isEdit = false;
        return;
      }

      this.isSaving = true;
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
          this.isDeleting = true;
          this.deleteGoal.next(this.goal);
        }
      });
  }

  private setPristine() {
    this.isEdit = false;
    this.isSaving = false;
    this.isDeleting = false;
  }

}
