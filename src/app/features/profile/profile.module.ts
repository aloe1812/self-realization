import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { GroupComponent } from './components/group/group.component';
import { GoalComponent } from './components/goal/goal.component';
import { StoreModule } from '@ngrx/store';
import * as fromProfile from './reducers/profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './effects/profile.effects';
import { AboutComponent } from './components/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProfilePageComponent, GroupComponent, GoalComponent, AboutComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('profile', fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects]),
  ],
})
export class ProfileModule { }
