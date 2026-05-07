import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  convertCelsiusToFahrenheit,
  convertFahrenheitToCelsius,
} from '../../utils/temperature-conversions';
import { calculateHeatIndexFahrenheit } from '../../utils/calculate-heat-index';
import {
  HeatIndexHistory,
  HeatIndexRecord,
} from '../../utils/heat-index-history';
import { SettingsService } from '../../services/settings.service';
import { TemperatureUnit } from '../../models/weather.types';

const HEAT_INDEX_MIN_F = 80;
const HEAT_INDEX_MIN_C = 26.7;

@Component({
  selector: 'app-heat-index-calculator',
  templateUrl: './heat-index-calculator.component.html',
  styleUrls: ['./heat-index-calculator.component.sass'],
})
export class HeatIndexCalculatorComponent implements OnInit, OnDestroy {
  temperature: number | null = null;
  humidity: number | null = null;
  temperatureUnit: TemperatureUnit = 'C';
  heatIndex: number | null = null;
  message: string | null = null;
  history: MatTableDataSource<HeatIndexRecord>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly settings: SettingsService) {
    this.history = HeatIndexHistory.loadHistory();
  }

  ngOnInit(): void {
    this.settings.unit$
      .pipe(takeUntil(this.destroy$))
      .subscribe((unit) => (this.temperatureUnit = unit));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onUnitChange(unit: TemperatureUnit): void {
    this.settings.setUnit(unit);
  }

  calculateHeatIndex(): void {
    this.heatIndex = null;
    this.message = null;

    if (this.temperature === null || this.humidity === null) return;
    if (this.humidity < 0 || this.humidity > 100) {
      this.message = 'Humidity must be between 0 and 100%.';
      return;
    }

    const tempInFahrenheit =
      this.temperatureUnit === 'C'
        ? convertCelsiusToFahrenheit(this.temperature)
        : this.temperature;

    if (tempInFahrenheit < HEAT_INDEX_MIN_F) {
      const min =
        this.temperatureUnit === 'C' ? HEAT_INDEX_MIN_C : HEAT_INDEX_MIN_F;
      this.message = `Heat index requires at least ${min}°${this.temperatureUnit}.`;
      return;
    }

    const heatIndexFahrenheit = calculateHeatIndexFahrenheit(
      tempInFahrenheit,
      this.humidity
    );
    this.heatIndex =
      this.temperatureUnit === 'C'
        ? convertFahrenheitToCelsius(heatIndexFahrenheit)
        : heatIndexFahrenheit;

    HeatIndexHistory.saveRecord(
      this.temperature,
      this.humidity,
      this.temperatureUnit,
      this.heatIndex
    );
    this.history = HeatIndexHistory.loadHistory();
  }

  clearHistory(): void {
    HeatIndexHistory.clear();
    this.history = HeatIndexHistory.loadHistory();
  }

  get heatIndexCategory(): string | null {
    if (this.heatIndex === null) return null;
    const f =
      this.temperatureUnit === 'F'
        ? this.heatIndex
        : convertCelsiusToFahrenheit(this.heatIndex);
    if (f < 80) return 'Comfortable';
    if (f < 91) return 'Caution';
    if (f < 104) return 'Extreme caution';
    if (f < 126) return 'Danger';
    return 'Extreme danger';
  }
}
