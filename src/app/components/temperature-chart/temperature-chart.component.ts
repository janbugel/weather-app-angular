import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {
  Chart,
  registerables,
  ChartConfiguration,
  ChartEvent,
  ActiveElement,
  ChartType,
} from 'chart.js';
import { WeatherApiService } from '../../services/weather-api.service';

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
        return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:00`;
      });

      const temperatures = data.hourly.temperature_2m;

      const config: ChartConfiguration<'line', number[], string> = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature (°C)',
              backgroundColor: 'rgb(96, 111, 199)',
              borderColor: 'rgb(96, 111, 199)',
              data: temperatures,
              fill: false,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'nearest',
            intersect: false,
            axis: 'x',
          },
          plugins: {
            tooltip: {
              position: 'nearest',
            },
            legend: {
              display: true,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
            },
            x: {
              grid: {
                drawOnChartArea: false,
              },
            },
          },
          elements: {
            line: {
              borderWidth: 2.5,
            },
            point: {
              radius: 5, // dot size
              hoverRadius: 5, // dot size on hower
            },
          },
          onHover: (
            event: ChartEvent,
            chartElements: ActiveElement[],
            chart: Chart
          ) => {
            if (chartElements.length) {
              const x = chartElements[0].element.x;
              const yAxis = chart.scales['y'];
              chart.ctx.save();
              chart.ctx.beginPath();
              chart.ctx.moveTo(x, yAxis.top);
              chart.ctx.lineTo(x, yAxis.bottom);
              chart.ctx.lineWidth = 2; // line width
              chart.ctx.strokeStyle = 'rgba(96, 111, 199, 0.5)';
              chart.ctx.stroke();
              chart.ctx.restore();
            }
          },
        },
      };

      const ctx = this.temperatureChart.nativeElement.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, config);
      }
    });
  }
}
