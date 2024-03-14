import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WeatherApiService } from '../../services/weather-api.service';
import { formatDateForAPI } from '../../utils/format-date';
import { getTemperatureChartAppearance } from '../../utils/chart-appearance';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.sass'],
})
export class TemperatureChartComponent implements AfterViewInit {
  @ViewChild('temperatureChart')
  temperatureChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('historicalTemperatureChart')
  historicalTemperatureChart!: ElementRef<HTMLCanvasElement>;
  private pastDays: number;
  private chart?: Chart;
  private historicalChart?: Chart;

  constructor(private forecastService: WeatherApiService) {
    Chart.register(...registerables);
    this.pastDays = parseInt(localStorage.getItem('pastDays') || '7');
  }

  ngAfterViewInit(): void {
    this.loadForecastChart();
    this.loadHistoricalChart();
  }

  private loadForecastChart(): void {
    this.forecastService.getWeatherForecast(this.pastDays).subscribe((data) => {
      const labels = this.generateLabels(data.hourly.time);
      const temperatures = data.hourly.temperature_2m;
      this.createChart(this.temperatureChart.nativeElement, labels, temperatures, 'Temperature °C - Forecast');
    });
  }

  private loadHistoricalChart(): void {
    const startDate = localStorage.getItem('historicalStartDate') || new Date().toISOString().split('T')[0];
    const endDate = localStorage.getItem('historicalEndDate') || new Date().toISOString().split('T')[0];
    this.forecastService.getHistoricalWeather(formatDateForAPI(new Date(startDate)), formatDateForAPI(new Date(endDate))).subscribe((data) => {
      const labels = this.generateLabels(data.hourly.time);
      const temperatures = data.hourly.temperature_2m;
      this.createChart(this.historicalTemperatureChart.nativeElement, labels, temperatures, 'Temperature °C - Historical');
    });
  }

  private createChart(canvas: HTMLCanvasElement, labels: string[], temperatures: number[], label: string): void {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const chartAppearance = getTemperatureChartAppearance(labels, temperatures, label);
      new Chart(ctx, chartAppearance);
    }
  }

  private generateLabels(times: string[]): string[] {
    return times.map((datetime: string) => {
      const date = new Date(datetime);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:00`;
    });
  }
}
