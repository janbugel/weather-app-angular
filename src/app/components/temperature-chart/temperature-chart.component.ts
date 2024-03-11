import { Component, OnInit, HostListener } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';

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
  public colorScheme = 'vivid'; // 'cool', 'vivid', 'natural' ...

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.updateChartDimensions();
    this.fetchTemperatureData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateChartDimensions();
  }

  updateChartDimensions(): void {
    this.view = [innerWidth / 1.2, 400];
  }

  fetchTemperatureData(): void {
    const lat = 51.5074;
    const lon = -0.1278;

    this.forecastService.getWeatherForecast().subscribe({
      next: (data) => {
        this.temperatureData = this.transformDataForChart(data);
      },
      error: (error) => {
        console.error('Error fetching temperature data:', error);
      },
    });
  }

  transformDataForChart(data: any): any[] {
    let chartData = [];
    for (let i = 0; i < data.hourly.time.length; i++) {
      chartData.push({
        name: new Date(data.hourly.time[i]).toLocaleString(),
        value: data.hourly.temperature_2m[i],
      });
    }
    return [{ name: 'Temperature', series: chartData }];
  }
}
