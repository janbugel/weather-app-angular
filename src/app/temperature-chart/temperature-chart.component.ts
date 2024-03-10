// app/temperature-chart/temperature-chart.component.ts

import { Component, OnInit, HostListener } from '@angular/core';
import { ForecastService } from '../services/forecast.service'; // Updated import statement

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.sass'],
})
export class TemperatureChartComponent implements OnInit {
  public temperatureData: any[] = [];
  public view: any = [innerWidth / 1.2, 400];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Time';
  public showYAxisLabel = true;
  public yAxisLabel = 'Temperature (°C)';
  public timeline = true;
  public colorScheme = 'cool'; // Use predefined color schemes like 'vivid', 'natural', etc.

  constructor(private forecastService: ForecastService) {} // Updated service injection

  ngOnInit(): void {
    this.updateChartDimensions();
    this.fetchTemperatureData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateChartDimensions();
  }

  updateChartDimensions(): void {
    this.view = [innerWidth / 1.2, 400]; // Dynamically adjusts the chart dimensions based on the window width
  }

  fetchTemperatureData(): void {
    const lat = 51.5074; // Latitude for London
    const lon = -0.1278; // Longitude for London

    this.forecastService.getWeatherForecast(lat, lon).subscribe({
      next: (data) => {
        // Transform data for chart
        this.temperatureData = this.transformDataForChart(data);
      },
      error: (error) => {
        console.error('Error fetching temperature data:', error);
      }
    });
  }

  transformDataForChart(data: any): any[] {
    // Transform forecast data for chart
    let chartData = [];
    for (let i = 0; i < data.hourly.time.length; i++) {
      chartData.push({
        name: new Date(data.hourly.time[i]).toLocaleString(),
        value: data.hourly.temperature_2m[i]
      });
    }
    return [{ name: 'Temperature', series: chartData }];
  }
}
