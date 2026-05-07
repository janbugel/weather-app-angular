import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapWeatherCodeToState } from '../utils/map-weather-code';
import {
  GeocodingResponse,
  GeocodingResult,
  OpenMeteoHourlyResponse,
  WeatherLocation,
} from '../models/weather.types';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private readonly forecastBaseUrl = 'https://api.open-meteo.com/v1/forecast';
  private readonly historicalBaseUrl =
    'https://archive-api.open-meteo.com/v1/archive';
  private readonly geocodingBaseUrl =
    'https://geocoding-api.open-meteo.com/v1/search';
  private readonly hourlyFields =
    'temperature_2m,relative_humidity_2m,pressure_msl,weather_code';

  constructor(
    private readonly http: HttpClient,
    private readonly settings: SettingsService
  ) {}

  getWeatherForecast(
    pastDays: number,
    location: WeatherLocation = this.settings.location
  ): Observable<OpenMeteoHourlyResponse> {
    const params = new HttpParams()
      .set('latitude', location.latitude)
      .set('longitude', location.longitude)
      .set('hourly', this.hourlyFields)
      .set('past_days', pastDays);
    return this.http.get<OpenMeteoHourlyResponse>(this.forecastBaseUrl, {
      params,
    });
  }

  getHistoricalWeather(
    startDate: string,
    endDate: string,
    location: WeatherLocation = this.settings.location
  ): Observable<OpenMeteoHourlyResponse> {
    const params = new HttpParams()
      .set('latitude', location.latitude)
      .set('longitude', location.longitude)
      .set('start_date', startDate)
      .set('end_date', endDate)
      .set('hourly', this.hourlyFields);
    return this.http.get<OpenMeteoHourlyResponse>(this.historicalBaseUrl, {
      params,
    });
  }

  searchCities(query: string): Observable<GeocodingResult[]> {
    const trimmed = query.trim();
    if (!trimmed) {
      return new Observable<GeocodingResult[]>((subscriber) => {
        subscriber.next([]);
        subscriber.complete();
      });
    }
    const params = new HttpParams()
      .set('name', trimmed)
      .set('count', 8)
      .set('language', 'en')
      .set('format', 'json');
    return this.http
      .get<GeocodingResponse>(this.geocodingBaseUrl, { params })
      .pipe(map((response) => response.results ?? []));
  }

  public mapWeatherCodeToState = mapWeatherCodeToState;
}
