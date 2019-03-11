import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayPageComponent } from './components/day-page/day-page.component';
import { DayRoutingModule } from './day-routing.module';

@NgModule({
  declarations: [DayPageComponent],
  imports: [
    CommonModule,
    DayRoutingModule,
  ],
})
export class DayModule { }
