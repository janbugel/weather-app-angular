import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  DEFAULT_LOCATION,
  TemperatureUnit,
  WeatherLocation,
} from '../models/weather.types';

const UNIT_KEY = 'temperatureUnit';
const LOCATION_KEY = 'selectedLocation';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly unitSubject: BehaviorSubject<TemperatureUnit>;
  private readonly locationSubject: BehaviorSubject<WeatherLocation>;

  readonly unit$: Observable<TemperatureUnit>;
  readonly location$: Observable<WeatherLocation>;

  constructor() {
    this.unitSubject = new BehaviorSubject<TemperatureUnit>(this.readUnit());
    this.locationSubject = new BehaviorSubject<WeatherLocation>(
      this.readLocation()
    );
    this.unit$ = this.unitSubject.asObservable();
    this.location$ = this.locationSubject.asObservable();
  }

  get unit(): TemperatureUnit {
    return this.unitSubject.value;
  }

  get location(): WeatherLocation {
    return this.locationSubject.value;
  }

  setUnit(unit: TemperatureUnit): void {
    if (unit === this.unitSubject.value) return;
    localStorage.setItem(UNIT_KEY, unit);
    this.unitSubject.next(unit);
  }

  setLocation(location: WeatherLocation): void {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
    this.locationSubject.next(location);
  }

  private readUnit(): TemperatureUnit {
    const stored = localStorage.getItem(UNIT_KEY);
    return stored === 'F' ? 'F' : 'C';
  }

  private readLocation(): WeatherLocation {
    const stored = localStorage.getItem(LOCATION_KEY);
    if (!stored) return DEFAULT_LOCATION;
    try {
      const parsed = JSON.parse(stored) as WeatherLocation;
      if (
        typeof parsed?.name === 'string' &&
        typeof parsed?.latitude === 'number' &&
        typeof parsed?.longitude === 'number'
      ) {
        return parsed;
      }
    } catch {
      // fall through
    }
    return DEFAULT_LOCATION;
  }
}
