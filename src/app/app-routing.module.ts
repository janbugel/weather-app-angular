import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { HeatIndexCalculatorComponent } from './heat-index-calculator/heat-index-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/weather-table', pathMatch: 'full' },
  { path: 'weather-table', component: WeatherTableComponent },
  { path: 'temperature-chart', component: TemperatureChartComponent },
  { path: 'heat-index-calculator', component: HeatIndexCalculatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
