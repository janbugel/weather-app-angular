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
        const tempInFahrenheit = this.convertCelsiusToFahrenheit(this.temperature);
        const heatIndexFahrenheit = this.calculateHeatIndexFahrenheit(tempInFahrenheit, this.humidity);
        // Convert back to Celsius for the result
        this.heatIndex = this.convertFahrenheitToCelsius(heatIndexFahrenheit);
      }
    }
  }

  private calculateHeatIndexFahrenheit(temp: number, humidity: number): number {
    // Enhanced Heat Index formula using the provided files and logic
    if (temp < 80) { 
      return temp; 
    } 
    let heatIndex = -42.379 + 2.04901523 * temp + 10.14333127 * humidity - 0.22475541 * temp * humidity
           - 0.00683783 * temp ** 2 - 0.05481717 * humidity ** 2 + 0.00122874 * temp ** 2 * humidity
           + 0.00085282 * temp * humidity ** 2 - 0.00000199 * temp ** 2 * humidity ** 2;
    return Math.round(heatIndex * 10) / 10; // Rounded to one decimal place
  }
  
  private convertCelsiusToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }
  
  private convertFahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5/9;
  }
}