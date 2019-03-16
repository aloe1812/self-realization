import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './features/auth/auth.module#AuthModule',
  },
  {
    path: 'profile',
    loadChildren: './features/profile/profile.module#ProfileModule',
    canLoad: [AuthGuard],
  },
  {
    path: 'day',
    loadChildren: './features/day/day.module#DayModule',
    canLoad: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
