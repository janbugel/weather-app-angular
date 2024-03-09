import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.sass'] // If using SCSS, or change to .css if you're using CSS
})
export class TemperatureChartComponent implements OnInit {
  public temperatureData: any[] = [];
  public timeData: any[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeatherForecast().subscribe(data => {
      this.temperatureData = data.hourly.temperature_2m;
      this.timeData = data.hourly.time;
    }, error => {
      console.error('There was an error fetching the temperature data', error);
    });
  }
}
