import { Component } from '@angular/core';

@Component({
  selector: 'app-heat-index-calculator',
  templateUrl: './heat-index-calculator.component.html',
  styleUrls: ['./heat-index-calculator.component.sass']
})
export class HeatIndexCalculatorComponent {
  temperature: number | null = null;
  humidity: number | null = null;
  temperatureUnit: 'C' | 'F' = 'C';
  heatIndex: number | null = null;

  calculateHeatIndex(): void {
    if (this.temperature !== null && this.humidity !== null) {
      if (this.temperatureUnit === 'F') {
        this.heatIndex = this.calculateHeatIndexFahrenheit(this.temperature, this.humidity);
      } else {
        // Convert Celsius to Fahrenheit for calculation
        const tempInFahrenheit = (this.temperature * 9/5) + 32;
        const heatIndexFahrenheit = this.calculateHeatIndexFahrenheit(tempInFahrenheit, this.humidity);
        // Convert back to Celsius if necessary
        this.heatIndex = (heatIndexFahrenheit - 32) * 5/9;
      }
    }
  }

  private calculateHeatIndexFahrenheit(temp: number, humidity: number): number {
    // Heat index calculation formula
    // This is a simplified version and may need to be adjusted according to the specific formula you wish to use
    if (temp < 80) {
      return temp;
    }
    return -42.379 + 2.04901523 * temp + 10.14333127 * humidity
           - 0.22475541 * temp * humidity - 0.00683783 * temp * temp
           - 0.05481717 * humidity * humidity + 0.00122874 * temp * temp * humidity
           + 0.00085282 * temp * humidity * humidity - 0.00000199 * temp * temp * humidity * humidity;
  }
}
