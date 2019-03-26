import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayPageComponent } from './components/day-page/day-page.component';
import { DayRoutingModule } from './day-routing.module';
import { SelectDayComponent } from './components/select-day/select-day.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, DateAdapter } from '@angular/material';
import { CustomDateAdapter } from './custom-date-adapter';
import { StoreModule } from '@ngrx/store';
import * as fromDay from './reducers/day.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DayEffects } from './effects/day.effects';

@NgModule({
  declarations: [DayPageComponent, SelectDayComponent],
  imports: [
    CommonModule,
    DayRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('day', fromDay.reducer),
    EffectsModule.forFeature([DayEffects]),
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    },
  ],
})
export class DayModule { }
