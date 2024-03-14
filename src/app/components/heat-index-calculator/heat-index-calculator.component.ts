import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { convertFahrenheitToCelsius, convertCelsiusToFahrenheit } from '../../utils/temperature-conversions';
import { calculateHeatIndexFahrenheit } from '../../utils/calculate-heat-index';
import { HeatIndexHistory, HeatIndexRecord } from '../../utils/heat-index-history';

@Component({
  selector: 'app-heat-index-calculator',
  templateUrl: './heat-index-calculator.component.html',
  styleUrls: ['./heat-index-calculator.component.sass'],
})
export class HeatIndexCalculatorComponent {
  temperature: number | null = null;
  humidity: number | null = null;
  temperatureUnit: 'C' | 'F' = 'C';
  heatIndex: number | null = null;
  message: string | null = null;
  history: MatTableDataSource<HeatIndexRecord>;

  constructor() {
    this.history = HeatIndexHistory.loadHistory();
  }

  calculateHeatIndex(): void {
    this.heatIndex = null;
    this.message = null;

    if (this.temperature !== null && this.humidity !== null) {
      let tempInFahrenheit = this.temperatureUnit === 'C' ? convertCelsiusToFahrenheit(this.temperature) : this.temperature;

      if (tempInFahrenheit < 80) {
        this.message = 'Heat Index value cannot be calculated for temperatures below 26.7°C (80°F).';
        return;
      }

      // Direct calculation in Fahrenheit for the heat index.
      let heatIndexFahrenheit = calculateHeatIndexFahrenheit(tempInFahrenheit, this.humidity);
      
      // Convert back to Celsius for display if needed.
      this.heatIndex = this.temperatureUnit === 'C' ? convertFahrenheitToCelsius(heatIndexFahrenheit) : heatIndexFahrenheit;

      HeatIndexHistory.saveRecord(this.temperature, this.humidity, this.temperatureUnit, this.heatIndex);
      this.history = HeatIndexHistory.loadHistory();
    }
  }
}