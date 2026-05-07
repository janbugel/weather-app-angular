import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from './services/settings.service';
import { TemperatureUnit, WeatherLocation } from './models/weather.types';

type SectionKey =
  | 'weather-table'
  | 'temperature-chart'
  | 'heat-index-calculator'
  | 'weather-historical';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  selectedSection: SectionKey = 'weather-table';
  unit: TemperatureUnit = 'C';
  location!: WeatherLocation;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly settings: SettingsService) {}

  ngOnInit(): void {
    this.settings.unit$
      .pipe(takeUntil(this.destroy$))
      .subscribe((unit) => (this.unit = unit));
    this.settings.location$
      .pipe(takeUntil(this.destroy$))
      .subscribe((location) => (this.location = location));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectSection(section: SectionKey): void {
    this.selectedSection = section;
  }

  toggleUnit(): void {
    this.settings.setUnit(this.unit === 'C' ? 'F' : 'C');
  }
}
