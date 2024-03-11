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
  displayedColumns: string[] = [
    'datetime',
    'temperature',
    'humidity',
    'pressure',
  ];

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forecastService.getWeatherForecast().subscribe((data) => {
      this.weatherData = data.hourly.time.map((time: string, index: number) => {
        const date = new Date(time);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because getMonth() returns 0-11
        const year = date.getFullYear().toString();
        const formattedDate = `${day}.${month}.${year}`;

        const formattedTime = date.toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        return {
          datetime: `${formattedDate}, ${formattedTime}`,
          temperature: data.hourly.temperature_2m[index],
          humidity: data.hourly.relative_humidity_2m[index],
          pressure: data.hourly.pressure_msl[index],
        };
      });
    });
  }
}
