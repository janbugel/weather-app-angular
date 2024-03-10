// app/weather-table/weather-table.component.ts
import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { HistoricalService } from '../services/historical.service';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.sass'],
})
export class WeatherTableComponent implements OnInit {
  weatherData: any[] = [];
  displayedColumns: string[] = ['datetime', 'temperature', 'humidity', 'pressure'];
  private readonly londonLat = 51.5074;
  private readonly londonLon = -0.1278;
  private readonly endDate = new Date().toISOString().split('T')[0];
  private readonly startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  constructor(private forecastService: ForecastService, private historicalService: HistoricalService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Fetch historical data for the past week
    this.historicalService.getHistoricalWeather({
      latitude: this.londonLat,
      longitude: this.londonLon,
      start_date: this.startDate,
      end_date: this.endDate,
      hourly: 'temperature_2m,relative_humidity_2m,pressure_msl'
    }).subscribe({
      next: (historicalData) => {
        this.weatherData = this.transformWeatherData(historicalData);
      },
      error: (error) => {
        console.error('Error fetching historical data:', error);
      }
    });

    // Fetch forecast data for the next few days
    this.forecastService.getWeatherForecast(this.londonLat, this.londonLon).subscribe({
      next: (forecastData) => {
        this.weatherData.push(...this.transformWeatherData(forecastData));
      },
      error: (error) => {
        console.error('Error fetching forecast data:', error);
      }
    });
  }

  private transformWeatherData(data: any): any[] {
    return data.hourly.time.map((time: string, index: number) => ({
      datetime: new Date(time).toLocaleString(),
      temperature: data.hourly.temperature_2m[index],
      humidity: data.hourly.relative_humidity_2m[index],
      pressure: data.hourly.pressure_msl?.[index] ?? 'N/A',
    }));
  }
}
