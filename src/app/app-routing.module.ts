import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureChartComponent } from './components/temperature-chart/temperature-chart.component';

const routes: Routes = [
  { path: 'temperature-chart', component: TemperatureChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
