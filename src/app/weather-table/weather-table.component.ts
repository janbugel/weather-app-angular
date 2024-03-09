import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.sass']
})
export class WeatherTableComponent implements OnInit {
  combinedData: any[] = [];
  londonLatitude = 51.5074;
  londonLongitude = -0.1278;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // Get data starting from 7 days ago
    this.fetchData(this.londonLatitude, this.londonLongitude, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
  }

  fetchData(latitude: number, longitude: number, startDate: string, endDate: string): void {
    this.weatherService.getWeatherForecast(latitude, longitude).subscribe(forecastData => {
      // Transform and add forecast data to combinedData
      this.transformAndAddData(forecastData, 'forecast');

      this.weatherService.getHistoricalWeather(latitude, longitude, startDate, endDate).subscribe(historicalData => {
        // Transform and add historical data to combinedData
        this.transformAndAddData(historicalData, 'historical');
      });
    });
  }

  private transformAndAddData(data: any, dataType: 'forecast' | 'historical'): void {
    // Example transformation, needs fine-tuning based on the exact structure of your response data
    const hourlyData = data.hourly;
    for (let i = 0; i < hourlyData.time.length; i++) {
      this.combinedData.push({
        time: new Date(hourlyData.time[i] * 1000),
        temperature: hourlyData.temperature_2m[i],
        humidity: hourlyData.relative_humidity_2m[i],
        // Add additional data transformation as needed
      });
    }
    // You might need to sort combinedData based on time if ordering is important
  }
}