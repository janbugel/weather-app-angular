import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Lazy loading feature modules
const routes: Routes = [
  { 
    path: 'weather-table', 
    loadChildren: () => import('./components/weather-table/weather-table.module').then(m => m.WeatherTableModule) 
  },
  { 
    path: 'temperature-chart', 
    loadChildren: () => import('./components/temperature-chart/temperature-chart.module').then(m => m.TemperatureChartModule) 
  },
  { 
    path: 'heat-index-calculator', 
    loadChildren: () => import('./components/heat-index-calculator/heat-index-calculator.module').then(m => m.HeatIndexCalculatorModule) 
  },
  { path: '', redirectTo: '/weather-table', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
