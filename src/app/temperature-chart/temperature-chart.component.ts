import { Component, OnInit, HostListener } from '@angular/core';
import { WeatherService } from '../weather.service';

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

  constructor(private weatherService: WeatherService) {}

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
    const currentDate = new Date();
    const endDate = currentDate.toISOString().split('T')[0]; // Format the current date as YYYY-MM-DD
    const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 7)).toISOString().split('T')[0]; // Get the date 7 days ago

    this.weatherService.getWeatherHistoricalData(lat, lon, new Date(pastDate), new Date(endDate)).subscribe({
      next: (data) => {
        let temperatures = data.hourly.temperature_2m;
        let times = data.hourly.time;
        this.temperatureData = this.transformDataForChart(times, temperatures);
      },
      error: (error) => {
        console.error('Error fetching temperature data:', error);
      }
    });
  }

  transformDataForChart(times: string[], temperatures: number[]): any[] {
    let chartData = [];
    for (let i = 0; i < times.length; i++) {
      chartData.push({
        name: new Date(times[i]).toLocaleString(),
        value: temperatures[i]
      });
    }
    return [{ name: 'Temperature', series: chartData }];
  }
}
