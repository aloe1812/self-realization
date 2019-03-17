import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IDefaultGoal } from '../../models';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalComponent implements OnInit {

  @Input() goal: IDefaultGoal;

  isEdit = false;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
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

}
