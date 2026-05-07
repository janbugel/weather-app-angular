import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherApiService } from '../../services/weather-api.service';
import { SettingsService } from '../../services/settings.service';
import { formatDateForAPI } from '../../utils/format-date';
import { getTemperatureChartAppearance } from '../../utils/chart-appearance';
import { smoothSeries } from '../../utils/smooth-series';
import { convertCelsiusToFahrenheit } from '../../utils/temperature-conversions';
import {
  OpenMeteoHourlyResponse,
  TemperatureUnit,
  WeatherLocation,
} from '../../models/weather.types';

@Component({
    selector: 'app-temperature-chart',
    templateUrl: './temperature-chart.component.html',
    styleUrls: ['./temperature-chart.component.sass'],
    standalone: false
})
export class TemperatureChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('forecastChart') forecastChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('historicalChart') historicalChartRef!: ElementRef<HTMLCanvasElement>;

  pastDays = parseInt(localStorage.getItem('pastDays') ?? '7', 10) || 7;
  smoothing = parseInt(localStorage.getItem('chartSmoothing') ?? '1', 10) || 1;
  loadingForecast = false;
  loadingHistorical = false;
  forecastError: string | null = null;
  historicalError: string | null = null;

  unit: TemperatureUnit = 'C';
  location!: WeatherLocation;

  private forecastChart?: Chart;
  private historicalChart?: Chart;
  private forecastData?: OpenMeteoHourlyResponse;
  private historicalData?: OpenMeteoHourlyResponse;
  private viewInitialized = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly forecastService: WeatherApiService,
    private readonly settings: SettingsService,
    private readonly cdr: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    combineLatest([this.settings.unit$, this.settings.location$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([unit, location]) => {
        const locationChanged = !this.location || this.location.latitude !== location.latitude || this.location.longitude !== location.longitude;
        this.unit = unit;
        this.location = location;
        if (locationChanged) {
          this.fetchForecast();
          this.fetchHistorical();
        } else {
          this.renderForecast();
          this.renderHistorical();
        }
      });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.renderForecast();
    this.renderHistorical();
  }

  ngOnDestroy(): void {
    this.forecastChart?.destroy();
    this.historicalChart?.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSmoothingChange(value: number): void {
    this.smoothing = value;
    localStorage.setItem('chartSmoothing', value.toString());
    this.renderForecast();
    this.renderHistorical();
  }

  private fetchForecast(): void {
    if (!this.location) return;
    this.loadingForecast = true;
    this.forecastError = null;
    this.forecastService
      .getWeatherForecast(this.pastDays, this.location)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.forecastData = data;
          this.loadingForecast = false;
          this.renderForecast();
          this.cdr.markForCheck();
        },
        error: () => {
          this.forecastError = 'Could not load forecast chart.';
          this.loadingForecast = false;
        },
      });
  }

  private fetchHistorical(): void {
    if (!this.location) return;
    const startDate =
      localStorage.getItem('historicalStartDate') ?? formatDateForAPI(this.weekAgo());
    const endDate =
      localStorage.getItem('historicalEndDate') ?? formatDateForAPI(new Date());
    this.loadingHistorical = true;
    this.historicalError = null;
    this.forecastService
      .getHistoricalWeather(
        formatDateForAPI(new Date(startDate)),
        formatDateForAPI(new Date(endDate)),
        this.location
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.historicalData = data;
          this.loadingHistorical = false;
          this.renderHistorical();
          this.cdr.markForCheck();
        },
        error: () => {
          this.historicalError = 'Could not load historical chart.';
          this.loadingHistorical = false;
        },
      });
  }

  private renderForecast(): void {
    if (!this.viewInitialized || !this.forecastData) return;
    this.forecastChart = this.draw(
      this.forecastChartRef.nativeElement,
      this.forecastData,
      'Forecast',
      this.forecastChart
    );
  }

  private renderHistorical(): void {
    if (!this.viewInitialized || !this.historicalData) return;
    this.historicalChart = this.draw(
      this.historicalChartRef.nativeElement,
      this.historicalData,
      'Historical',
      this.historicalChart
    );
  }

  private draw(
    canvas: HTMLCanvasElement,
    data: OpenMeteoHourlyResponse,
    label: string,
    existing?: Chart
  ): Chart | undefined {
    const ctx = canvas.getContext('2d');
    if (!ctx) return existing;

    const labels = this.generateLabels(data.hourly.time);
    const rawValues =
      this.unit === 'F'
        ? data.hourly.temperature_2m.map(convertCelsiusToFahrenheit)
        : data.hourly.temperature_2m.slice();
    const values = smoothSeries(rawValues, this.smoothing);
    const config = getTemperatureChartAppearance(labels, values, label, this.unit);

    if (existing) {
      existing.data.labels = labels;
      existing.data.datasets[0].data = values;
      existing.data.datasets[0].label = config.data.datasets[0].label;
      existing.options = config.options!;
      existing.update();
      return existing;
    }
    return new Chart(ctx, config);
  }

  private generateLabels(times: string[]): string[] {
    return times.map((datetime) => {
      const d = new Date(datetime);
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const hour = d.getHours().toString().padStart(2, '0');
      return `${day}/${month} ${hour}:00`;
    });
  }

  private weekAgo(): Date {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  }
}
