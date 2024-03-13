import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, registerables, ChartConfiguration, ChartEvent } from 'chart.js';
import { ForecastService } from '../../services/forecast.service';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.sass']
})
export class TemperatureChartComponent implements AfterViewInit {
  @ViewChild('temperatureChart') temperatureChart: any;
  private pastDays: number;

  constructor(private forecastService: ForecastService) {
    Chart.register(...registerables);
    this.pastDays = parseInt(localStorage.getItem('pastDays') || '7');
  }

  ngAfterViewInit(): void {
    this.loadChart();
  }

  private loadChart(): void {
    this.forecastService.getWeatherForecast(this.pastDays).subscribe(data => {
      const labels = data.hourly.time.map((datetime: string) => {
        const date = new Date(datetime);
        return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:00`;
      });

      const temperatures = data.hourly.temperature_2m;

      const config: ChartConfiguration<'line'> = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Temperature (°C)',
            backgroundColor: 'rgb(96, 111, 199)',
            borderColor: 'rgb(96, 111, 199)',
            data: temperatures,
            fill: false,
            pointRadius: 0,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            tooltip: {
              position: 'nearest',
            }
          },
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      };

      new Chart(this.temperatureChart.nativeElement.getContext('2d'), config);
    });
  }
}
