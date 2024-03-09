import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.sass']
})
export class WeatherTableComponent implements OnInit {
  public combinedData: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeatherData();
  }

  fetchWeatherData(): void {
    // Implement fetching weather data from the service
  }

  combineData(forecast: any[], history: any[]): void {
    // Implement combining forecast and history data
  }
}
