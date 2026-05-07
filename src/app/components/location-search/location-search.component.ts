import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { WeatherApiService } from '../../services/weather-api.service';
import { SettingsService } from '../../services/settings.service';
import { GeocodingResult, WeatherLocation } from '../../models/weather.types';

@Component({
    selector: 'app-location-search',
    templateUrl: './location-search.component.html',
    styleUrls: ['./location-search.component.sass'],
    standalone: false
})
export class LocationSearchComponent implements OnInit, OnDestroy {
  readonly searchControl = new FormControl<string>('', { nonNullable: true });
  results: GeocodingResult[] = [];
  loading = false;
  currentLocation!: WeatherLocation;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly weatherApi: WeatherApiService,
    private readonly settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.settings.location$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loc) => (this.currentLocation = loc));

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          const query = (value ?? '').trim();
          if (query.length < 2) {
            this.results = [];
            this.loading = false;
            return [];
          }
          this.loading = true;
          return this.weatherApi.searchCities(query);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (results) => {
          this.results = results;
          this.loading = false;
        },
        error: () => {
          this.results = [];
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  displayLocation(location: GeocodingResult | string | null): string {
    if (!location || typeof location === 'string') return '';
    return this.formatName(location);
  }

  selectLocation(result: GeocodingResult): void {
    this.settings.setLocation({
      name: result.name,
      country: result.country,
      admin1: result.admin1,
      latitude: result.latitude,
      longitude: result.longitude,
    });
    this.searchControl.setValue('', { emitEvent: false });
    this.results = [];
  }

  formatName(result: GeocodingResult | WeatherLocation): string {
    const parts = [result.name];
    if (result.admin1 && result.admin1 !== result.name) parts.push(result.admin1);
    if (result.country) parts.push(result.country);
    return parts.join(', ');
  }
}
