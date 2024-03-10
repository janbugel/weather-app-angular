import { Component } from '@angular/core';

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
  message: string | null = null; // New property to hold messages

  calculateHeatIndex(): void {
    this.heatIndex = null; // Reset heat index for each calculation
    this.message = null; // Reset message for each calculation

    if (this.temperature !== null && this.humidity !== null) {
      if (this.temperatureUnit === 'F') {
        if (this.temperature < 80) {
          this.message = "Heat Index value cannot be calculated for temperatures below 80°F.";
        } else {
          this.heatIndex = this.calculateHeatIndexFahrenheit(
            this.temperature,
            this.humidity
          );
        }
      } else {
        if (this.temperature < 26.7) {
          this.message = "Heat Index value cannot be calculated for temperatures below 26.7°C.";
        } else {
          // Convert Celsius to Fahrenheit for calculation
          const tempInFahrenheit = this.convertCelsiusToFahrenheit(this.temperature);
          this.heatIndex = this.convertFahrenheitToCelsius(
            this.calculateHeatIndexFahrenheit(tempInFahrenheit, this.humidity)
          );
        }
      }
    }
  }

  private calculateHeatIndexFahrenheit(temp: number, humidity: number): number {
    let heatIndex =
      -42.379 +
      2.04901523 * temp +
      10.14333127 * humidity -
      0.22475541 * temp * humidity -
      0.00683783 * temp ** 2 -
      0.05481717 * humidity ** 2 +
      0.00122874 * temp ** 2 * humidity +
      0.00085282 * temp * humidity ** 2 -
      0.00000199 * temp ** 2 * humidity ** 2;
    return Math.round(heatIndex * 10) / 10; // Rounded to one decimal place
  }

  private convertCelsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
  }

  private convertFahrenheitToCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) * 5) / 9;
  }
}
