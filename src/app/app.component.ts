import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  selectedComponent: 'weather-table' | 'temperature-chart' | 'heat-index-calculator' | 'weather-historical' = 'weather-table';
}