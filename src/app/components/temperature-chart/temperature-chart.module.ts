import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureChartComponent } from './temperature-chart.component';

@NgModule({
  declarations: [
    TemperatureChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TemperatureChartComponent 
  ]
})
export class TemperatureChartModule {}