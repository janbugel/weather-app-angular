import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { TemperatureChartComponent } from './temperature-chart.component';

@NgModule({
  declarations: [
    TemperatureChartComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  exports: [
    TemperatureChartComponent
  ]
})
export class TemperatureChartModule {}
