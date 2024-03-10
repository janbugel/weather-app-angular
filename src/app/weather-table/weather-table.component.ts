import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { HistoricalService } from '../services/historical.service';
import { combineLatest, of, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

interface WeatherData {
  datetime: string;
  temperature: number;
  humidity: number;
  pressure: number | string;
}

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.sass'],
})
export class WeatherTableComponent implements OnInit {
  weatherData: WeatherData[] = [];
  displayedColumns: string[] = [
    'datetime',
    'temperature',
    'humidity',
    'pressure',
  ];
  isLoading = false;
  errorMessage: string | null = null;

  private readonly londonLat = 51.5074;
  private readonly londonLon = -0.1278;
  pastDays = 7;

  constructor(
    private forecastService: ForecastService,
    private historicalService: HistoricalService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - this.pastDays));
    const historicalEndDate = new Date();

    const historical$ = this.historicalService
      .getHistoricalWeather({
        latitude: this.londonLat,
        longitude: this.londonLon,
        start_date: startDate.toISOString().split('T')[0],
        end_date: historicalEndDate.toISOString().split('T')[0],
        hourly: 'temperature_2m,relative_humidity_2m,pressure_msl',
      })
      .pipe(
        map((historicalData) => this.transformWeatherData(historicalData)),
        catchError((error) => {
          this.errorMessage = 'Error fetching historical data';
          console.error(error);
          return of([]);
        })
      );

    const forecast$ = this.forecastService
      .getWeatherForecast(this.londonLat, this.londonLon)
      .pipe(
        map((forecastData) => this.transformWeatherData(forecastData)),
        catchError((error) => {
          this.errorMessage = 'Error fetching forecast data';
          console.error(error);
          return of([]);
        })
      );

    combineLatest([historical$, forecast$]).subscribe(
      ([historicalData, forecastData]) => {
        this.weatherData = [...historicalData, ...forecastData];
        this.isLoading = false;
      }
    );
  }

  private transformWeatherData(data: any): WeatherData[] {
    return data.hourly.time.map((time: string, index: number) => ({
      datetime: new Date(time).toLocaleString(),
      temperature: data.hourly.temperature_2m[index],
      humidity: data.hourly.relative_humidity_2m[index],
      pressure: data.hourly.pressure_msl?.[index] ?? 'Not Available',
    }));
  }
}
