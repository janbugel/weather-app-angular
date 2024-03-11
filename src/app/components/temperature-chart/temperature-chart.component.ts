import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.sass'],
})
export class TemperatureChartComponent implements OnInit {
  chartData: any[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Temperature (°C)';
  colorScheme = 'vivid';

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forecastService.getWeatherForecast().subscribe(data => {
      this.chartData = [
        {
          name: 'Temperature',
          series: data.hourly.time.map((time: string, index: number) => ({
            name: new Date(time).toLocaleString(),
            value: data.hourly.temperature_2m[index]
          }))
        }
      ];
    });
  }
}
