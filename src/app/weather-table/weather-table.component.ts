import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.sass'],
})
export class WeatherTableComponent implements OnInit {
  combinedData: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeatherData();
  }

  fetchWeatherData(): void {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // Fetching data for the last 7 days as an example

    this.weatherService
      .getWeatherHistoricalData(51.5074, -0.1278, startDate, endDate)
      .subscribe(
        (data) => {
          this.combinedData = data.hourly.time.map(
            (time: string, index: number) => {
              const dateTime = new Date(time);
              const hour = dateTime.getHours();
              const emoji = hour >= 6 && hour < 18 ? '☀️' : '🌙'; // Sun emoji from 6 AM to 6 PM, else Moon
              return {
                datetime: `${emoji} ${dateTime.toLocaleString()} `,
                temperature: data.hourly.temperature_2m[index],
                humidity: data.hourly.relative_humidity_2m[index],
              };
            }
          );
        },
        (error) => {
          console.error('Error fetching historical data:', error);
        }
      );
  }
}
