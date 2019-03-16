import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './features/auth/auth.module#AuthModule',
    canLoad: [LoginGuard],
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
