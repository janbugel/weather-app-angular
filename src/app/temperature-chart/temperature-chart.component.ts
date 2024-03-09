import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
// Ensure correct import for ScaleType if needed
import { ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.sass']
})
export class TemperatureChartComponent implements OnInit {
  temperatureData: any[] = [];
  view: [number, number] = [700, 300]; // Width and height of the chart

  // Options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Temperature (°C)';
  timeline = true;

  // Correcting the colorScheme assignment
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // Correct ScaleType if required
  scaleType = ScaleType.Ordinal; // This line is optional, only add if needed by your version of NGX-Charts

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeatherForecast().subscribe(data => {
      this.temperatureData = this.transformDataForChart(data.hourly.time, data.hourly.temperature_2m);
    }, error => {
      console.error('There was an error fetching the temperature data', error);
    });
  }

  transformDataForChart(times: string[], temperatures: number[]): any[] {
    return [{
      name: 'Temperature',
      series: times.map((time, index) => ({
        name: new Date(time).toLocaleString(),
        value: temperatures[index]
      }))
    }];
  }
}
