import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { TemperatureChartComponent } from './temperature-chart.component';

@NgModule({
  declarations: [TemperatureChartComponent],
  imports: [CommonModule, MatProgressBarModule, MatIconModule, MatSliderModule],
  exports: [TemperatureChartComponent],
})
export class TemperatureChartModule {}
