import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.sass']
})
export class WeatherTableComponent implements OnInit {
  combinedData: any[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.fetchWeatherData();
  }

  fetchWeatherData(): void {
    this.weatherService.getWeatherForecast(52.52, 13.41).subscribe(
      forecastData => {
        const current = forecastData['current'];
        const hourly = forecastData['hourly'];

        // Assuming 'time' is an array of timestamps in seconds
        const times = hourly['time'].map((timestamp: number) => new Date(timestamp * 1000));

        // Assuming other data is in arrays corresponding to each timestamp
        const temperatures = hourly['temperature_2m'];
        const humidity = hourly['relative_humidity_2m'];
        const windSpeed = hourly['wind_speed_10m'];

        // Assuming all arrays have the same length
        for (let i = 0; i < times.length; i++) {
          this.combinedData.push({
            time: times[i],
            temperature: temperatures[i],
            humidity: humidity[i],
            windSpeed: windSpeed[i]
          });
        }
      },
      error => {
        console.error('Error fetching forecast data:', error);
      }
    );
  }
}
