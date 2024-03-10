import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

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
  private readonly startDate = '2023-01-01'; // Example start date for historical data
  private readonly endDate = '2023-01-07'; // Example end date for historical data

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchForecastData();
    this.fetchHistoricalData();
  }

  private fetchForecastData(): void {
    this.weatherService.getWeatherForecast(this.londonLat, this.londonLon).subscribe({
      next: (data) => this.weatherData = [...this.weatherData, ...this.transformWeatherData(data)],
      error: (error) => console.error('Error fetching forecast data:', error),
    });
  }

  private fetchHistoricalData(): void {
    const params = {
      latitude: this.londonLat,
      longitude: this.londonLon,
      start_date: this.startDate,
      end_date: this.endDate,
      hourly: 'temperature_2m,relative_humidity_2m,pressure_msl', // Adjust based on what's needed
    };
    this.weatherService.getHistoricalWeather(params).subscribe({
      next: (data) => this.weatherData = [...this.weatherData, ...this.transformWeatherData(data)],
      error: (error) => console.error('Error fetching historical data:', error),
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
