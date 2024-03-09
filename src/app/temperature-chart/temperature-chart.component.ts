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

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchTemperatureData();
  }

  fetchTemperatureData(): void {
    this.weatherService.getWeatherForecast(51.5074, -0.1278).subscribe(data => {
      this.temperatureData = [{
        name: 'Temperature',
        series: this.transformDataForChart(data.hourly.time, data.hourly.temperature_2m)
      }];
    });
  }

  transformDataForChart(times: string[], temperatures: number[]): any[] {
    return times.map((time, index) => ({
      name: new Date(time).toLocaleString(),
      value: temperatures[index]
    }));
  }
}