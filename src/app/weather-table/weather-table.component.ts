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

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeatherData();
  }

  fetchWeatherData(): void {
    const lat = 51.5074; // London's latitude
    const lon = -0.1278; // London's longitude
    // Fetch forecast data
    this.weatherService.getWeatherForecast(lat, lon).subscribe({
      next: (forecastData) => {
        // Fetch historical data
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7); // Set to 7 days ago

        this.weatherService.getWeatherHistoricalData(lat, lon, startDate, endDate).subscribe({
          next: (historicalData) => {
            // Combine and transform forecast and historical data
            const combinedData = [
              ...this.transformWeatherData(forecastData),
              ...this.transformWeatherData(historicalData)
            ];
            this.weatherData = combinedData.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
          },
          error: (error) => console.error('Error fetching historical data:', error)
        });
      },
      error: (error) => console.error('Error fetching forecast data:', error)
    });
  }

  transformWeatherData(data: any): any[] {
    // Assumes potentially common formatting logic between historical and forecast data
    return data.hourly.time.map((time: string, index: number) => ({
      datetime: new Date(time).toLocaleString(),
      temperature: data.hourly.temperature_2m[index],
      humidity: data.hourly.relative_humidity_2m[index],
      pressure: data.hourly.pressure_msl ? data.hourly.pressure_msl[index] : 'N/A'
    }));
  }
}