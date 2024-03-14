import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { calculateHeatIndexFahrenheit, convertCelsiusToFahrenheit, convertFahrenheitToCelsius } from '../../utils/calculate-heat-index';

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
  history = new MatTableDataSource<{ temperature: number; humidity: number; heatIndex: number; unit: string; }>([]);

  constructor() {
    this.loadHistory();
  }

  calculateHeatIndex(): void {
    this.heatIndex = null;
    this.message = null;

    if (this.temperature !== null && this.humidity !== null) {
      if (this.temperatureUnit === 'F') {
        if (this.temperature < 80) {
          this.message =
            'Heat Index value cannot be calculated for temperatures below 80°F.';
        } else {
          this.heatIndex = calculateHeatIndexFahrenheit(
            this.temperature,
            this.humidity
          );
          this.addToHistory();
        }
      } else {
        if (this.temperature < 26.7) {
          this.message =
            'Heat Index value cannot be calculated for temperatures below 26.7°C.';
        } else {
          const tempInFahrenheit = convertCelsiusToFahrenheit(this.temperature);
          this.heatIndex = convertFahrenheitToCelsius(
            calculateHeatIndexFahrenheit(tempInFahrenheit, this.humidity)
          );
          this.addToHistory();
        }
      }
    }
  }

  private addToHistory(): void {
    if (this.heatIndex !== null) {
      const newHistory = this.history.data;
      newHistory.unshift({
        temperature: this.temperature!,
        humidity: this.humidity!,
        heatIndex: this.heatIndex,
        unit: this.temperatureUnit,
      });
      this.history.data = newHistory.slice(0, 5); // Keep only the last 5 entries
      localStorage.setItem('heatIndexHistory', JSON.stringify(this.history.data));
    }
  }

  private loadHistory(): void {
    const history = localStorage.getItem('heatIndexHistory');
    if (history) {
      this.history.data = JSON.parse(history);
    }
  }
}