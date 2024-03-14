import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Lazy loading feature modules
const routes: Routes = [
  { 
    path: 'weather-table', 
    loadChildren: () => import('./components/weather-table-forecast/weather-table-forecast.module').then(m => m.WeatherTableForecastModule) 
  },
  { 
    path: 'temperature-chart', 
    loadChildren: () => import('./components/temperature-chart/temperature-chart.module').then(m => m.TemperatureChartModule) 
  },
  { 
    path: 'heat-index-calculator', 
    loadChildren: () => import('./components/heat-index-calculator/heat-index-calculator.module').then(m => m.HeatIndexCalculatorModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
