import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayPageComponent } from './components/day-page/day-page.component';
import { DayGuard } from './guards/day.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [DayGuard],
  },
  {
    path: ':date',
    component: DayPageComponent,
    canActivate: [DayGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DayRoutingModule { }
