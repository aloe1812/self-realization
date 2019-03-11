import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './features/auth/auth.module#AuthModule',
  },
  {
    path: 'profile',
    loadChildren: './features/profile/profile.module#ProfileModule',
  },
  {
    path: 'day',
    loadChildren: './features/day/day.module#DayModule',
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
