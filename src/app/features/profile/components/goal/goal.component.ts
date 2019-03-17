import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IDefaultGoal } from '../../models';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalComponent implements OnInit, OnChanges {

  @Input() goal: IDefaultGoal;
  @Output() updateGoal: EventEmitter<IDefaultGoal> = new EventEmitter();

  titleCtrl: FormControl;

  isSaving = false;
  isEdit = false;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.titleCtrl = new FormControl(this.goal.title);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.goal && !changes.goal.firstChange) {
      this.setPristine();
    }
  }

  toggleEdit() {
    if (!this.titleCtrl) {
      this.titleCtrl = new FormControl(this.goal.title);
    }

    this.isEdit = !this.isEdit;
  }

  save() {
    if (this.titleCtrl.value === this.goal.title) {
      this.isEdit = false;
      return;
    }

    this.isSaving = true;

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
          console.log('delete');
        }
      });
  }

  private setPristine() {
    this.isEdit = false;
    this.isSaving = false;
  }

}