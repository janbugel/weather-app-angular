import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';

const routes: Routes = [
  { path: 'temperature-chart', component: TemperatureChartComponent } // Make sure this path is correct
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

