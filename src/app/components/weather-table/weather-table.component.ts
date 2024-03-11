import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';

interface WeatherData {
  datetime: string;
  temperature: number;
  humidity: number;
  pressure: number | string;
}

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
})
export class WeatherTableComponent implements OnInit {
  weatherData: WeatherData[] = [];
  displayedColumns: string[] = ['datetime', 'temperature', 'humidity', 'pressure'];

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forecastService.getWeatherForecast().subscribe(data => {
      this.weatherData = data.hourly.time.map((time: string, index: number) => ({
        datetime: new Date(time).toLocaleString(),
        temperature: data.hourly.temperature_2m[index],
        humidity: data.hourly.relative_humidity_2m[index],
        pressure: data.hourly.pressure_msl[index],
      }));
    });
  }
}
