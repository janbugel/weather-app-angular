import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.sass']
})
export class TemperatureChartComponent implements OnInit {
  public temperatureData: any[] = [];
  public view: [number, number] = [700, 300];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Time';
  public showYAxisLabel = true;
  public yAxisLabel = 'Temperature (°C)';
  public timeline = true;
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  londonLatitude = 51.5074;
  londonLongitude = -0.1278;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // Get data starting from 7 days ago
    this.fetchData(this.londonLatitude, this.londonLongitude, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
  }

  fetchData(latitude: number, longitude: number, startDate: string, endDate: string): void {
    this.weatherService.getWeatherForecast(latitude, longitude).subscribe(forecastData => {
      this.transformAndAddData(forecastData, 'forecast');
      this.weatherService.getHistoricalWeather(latitude, longitude, startDate, endDate).subscribe(historicalData => {
        this.transformAndAddData(historicalData, 'historical');
      });
    });
  }

  private transformAndAddData(data: any, dataType: 'forecast' | 'historical'): void {
    // Assumed transformation, actual implementation depends on your API structure
    const series = data.hourly.temperature_2m.map((temp: number, index: number) => {
      return {
        name: new Date(data.hourly.time[index] * 1000).toLocaleString(),
        value: temp
      }
    });
    this.temperatureData.push({
      name: dataType === 'forecast' ? 'Forecast' : 'Historical',
      series
    });
  }
}