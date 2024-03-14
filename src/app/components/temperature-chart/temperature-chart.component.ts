import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WeatherApiService } from '../../services/weather-api.service';
import { getTemperatureChartAppearance } from '../../utils/chart-appearance';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.sass'],
})
export class TemperatureChartComponent implements AfterViewInit {
  @ViewChild('temperatureChart')
  temperatureChart!: ElementRef<HTMLCanvasElement>;
  private pastDays: number;
  private chart?: Chart;

  constructor(private forecastService: WeatherApiService) {
    Chart.register(...registerables);
    this.pastDays = parseInt(localStorage.getItem('pastDays') || '7');
  }

  ngAfterViewInit(): void {
    this.loadChart();
  }

  private loadChart(): void {
    this.forecastService.getWeatherForecast(this.pastDays).subscribe((data) => {
      const labels = data.hourly.time.map((datetime: string) => {
        const date = new Date(datetime);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:00`;
      });

      const temperatures = data.hourly.temperature_2m;

      const chartAppearance = getTemperatureChartAppearance(labels, temperatures);

      const ctx = this.temperatureChart.nativeElement.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, chartAppearance);
      }
    });
  }
}