import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherApiService } from '../../services/weather-api.service';
import { SettingsService } from '../../services/settings.service';
import { transformWeatherData } from '../../utils/transform-weather-data';
import { setTablePagination } from '../../utils/table-formatting';
import { mapWeatherCodeToIcon } from '../../utils/map-weather-icon';
import {
  TemperatureUnit,
  WeatherDataRow,
  WeatherLocation,
} from '../../models/weather.types';

@Component({
  selector: 'app-weather-table-forecast',
  templateUrl: './weather-table-forecast.component.html',
  styleUrls: ['./weather-table-forecast.component.sass'],
})
export class WeatherTableForecastComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns: string[] = [
    'datetime',
    'weatherState',
    'temperature',
    'humidity',
    'pressure',
  ];
  readonly dataSource = new MatTableDataSource<WeatherDataRow>();
  isMobile = false;
  loading = false;
  error: string | null = null;
  pastDays = parseInt(localStorage.getItem('pastDays') ?? '7', 10) || 7;
  unit: TemperatureUnit = 'C';
  location!: WeatherLocation;

  readonly mapWeatherCodeToIcon = mapWeatherCodeToIcon;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly destroy$ = new Subject<void>();
  private paginatorSub?: Subscription;

  constructor(
    private readonly forecastService: WeatherApiService,
    private readonly settings: SettingsService
  ) {
    this.adjustForScreenSize();
  }

  ngOnInit(): void {
    this.settings.location$
      .pipe(takeUntil(this.destroy$))
      .subscribe((location) => {
        this.location = location;
        this.loadWeatherData();
      });
    this.settings.unit$
      .pipe(takeUntil(this.destroy$))
      .subscribe((unit) => (this.unit = unit));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.paginatorSub = setTablePagination({
      dataSource: this.dataSource,
      paginator: this.paginator,
      storageNamespace: 'weatherForecastTable',
    });
  }

  ngOnDestroy(): void {
    this.paginatorSub?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.adjustForScreenSize();
  }

  updatePastDays(): void {
    if (!Number.isFinite(this.pastDays) || this.pastDays < 1 || this.pastDays > 92) {
      return;
    }
    localStorage.setItem('pastDays', this.pastDays.toString());
    this.loadWeatherData();
  }

  private loadWeatherData(): void {
    if (!this.location) return;
    this.loading = true;
    this.error = null;
    this.forecastService
      .getWeatherForecast(this.pastDays, this.location)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.dataSource.data = transformWeatherData(data);
          if (this.sort) this.dataSource.sort = this.sort;
          this.loading = false;
        },
        error: () => {
          this.dataSource.data = [];
          this.loading = false;
          this.error = 'Could not load forecast data. Please try again.';
        },
      });
  }

  private adjustForScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    this.displayedColumns = this.isMobile
      ? ['datetime', 'weatherState', 'temperature', 'humidity']
      : ['datetime', 'weatherState', 'temperature', 'humidity', 'pressure'];
  }
}
