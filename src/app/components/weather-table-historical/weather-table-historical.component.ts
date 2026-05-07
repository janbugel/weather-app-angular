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
import { formatDateForAPI } from '../../utils/format-date';
import { mapWeatherCodeToIcon } from '../../utils/map-weather-icon';
import {
  TemperatureUnit,
  WeatherDataRow,
  WeatherLocation,
} from '../../models/weather.types';

@Component({
    selector: 'app-weather-table-historical',
    templateUrl: './weather-table-historical.component.html',
    styleUrls: ['./weather-table-historical.component.sass'],
    standalone: false
})
export class WeatherTableHistoricalComponent
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

  startDate: string;
  endDate: string;

  unit: TemperatureUnit = 'C';
  location!: WeatherLocation;

  readonly mapWeatherCodeToIcon = mapWeatherCodeToIcon;
  readonly maxDate = new Date();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly destroy$ = new Subject<void>();
  private paginatorSub?: Subscription;

  constructor(
    private readonly weatherService: WeatherApiService,
    private readonly settings: SettingsService
  ) {
    const today = formatDateForAPI(new Date());
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    this.startDate =
      localStorage.getItem('historicalStartDate') ?? formatDateForAPI(weekAgo);
    this.endDate = localStorage.getItem('historicalEndDate') ?? today;
    this.adjustForScreenSize();
  }

  ngOnInit(): void {
    this.settings.location$
      .pipe(takeUntil(this.destroy$))
      .subscribe((location) => {
        this.location = location;
        this.loadHistoricalData();
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
      storageNamespace: 'weatherHistoricalTable',
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

  loadHistoricalData(): void {
    if (!this.location) return;
    if (!this.startDate || !this.endDate) {
      this.error = 'Please pick a start and end date.';
      return;
    }
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      this.error = 'Invalid date range.';
      return;
    }
    if (start > end) {
      this.error = 'Start date must be before end date.';
      return;
    }

    localStorage.setItem('historicalStartDate', this.startDate);
    localStorage.setItem('historicalEndDate', this.endDate);

    this.loading = true;
    this.error = null;
    this.weatherService
      .getHistoricalWeather(
        formatDateForAPI(start),
        formatDateForAPI(end),
        this.location
      )
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
          this.error = 'Could not load historical data. Please try again.';
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
