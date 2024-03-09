import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.sass']
})
export class WeatherTableComponent implements OnInit {
  weatherData: any;
  historicalData: any;
  combinedData: any[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.fetchWeatherData();
  }

  fetchWeatherData(): void {
    this.weatherService.getWeatherForecast().subscribe(
      forecastData => {
        this.weatherData = forecastData;
        this.fetchHistoricalData();
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  fetchHistoricalData(): void {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
    this.weatherService.getWeatherHistory(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]).subscribe(
      historyData => {
        this.historicalData = historyData;
        this.combineData();
      },
      error => {
        console.error('Error fetching historical data:', error);
      }
    );
  }

  combineData(): void {
    if (this.weatherData && this.historicalData) {
      const forecastTimes = this.weatherData.hourly.times.map((time: string) => new Date(time).getTime());
      const historyTimes = this.historicalData.hourly.times.map((time: string) => new Date(time).getTime());
      const combinedTimes = [...forecastTimes, ...historyTimes];
      const uniqueTimes = Array.from(new Set(combinedTimes)).sort();
      
      this.combinedData = uniqueTimes.map(time => {
        const forecastIndex = forecastTimes.indexOf(time);
        const historyIndex = historyTimes.indexOf(time);
        return {
          time: new Date(time).toISOString(),
          temperature: forecastIndex !== -1 ? this.weatherData.hourly.temperature_2m[forecastIndex] : this.historicalData.hourly.temperature_2m[historyIndex],
          pressure: forecastIndex !== -1 ? this.weatherData.hourly.pressure_surface_level[forecastIndex] : this.historicalData.hourly.pressure_surface_level[historyIndex],
          humidity: forecastIndex !== -1 ? this.weatherData.hourly.relative_humidity[forecastIndex] : this.historicalData.hourly.relative_humidity[historyIndex],
        };
      });
    }
  }
}
