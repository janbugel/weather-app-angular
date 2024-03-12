import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.sass'],
  inputs: ['pastDays'] 
})
export class TemperatureChartComponent implements OnInit, OnChanges {
  @Input() pastDays: number = 7; 
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
    this.loadChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pastDays']) {
      this.loadChartData();
    }
  }

  private loadChartData(): void {
    this.forecastService.getWeatherForecast(this.pastDays).subscribe(data => {
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
