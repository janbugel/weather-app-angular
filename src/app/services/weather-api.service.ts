import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mapWeatherCodeToState } from '../utils/map-weather-code';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private forecastBaseUrl = 'https://api.open-meteo.com/v1/forecast';
  private historicalBaseUrl = 'https://archive-api.open-meteo.com/v1/archive';

  constructor(private http: HttpClient) {}

  getWeatherForecast(pastDays: number): Observable<any> {
    const params = {
      latitude: 51.5074,
      longitude: -0.1278,
      hourly: 'temperature_2m,relative_humidity_2m,pressure_msl,weather_code',
      past_days: pastDays
    };
    return this.http.get(this.forecastBaseUrl, { params });
  }

  getHistoricalWeather(startDate: string, endDate: string): Observable<any> {
    const params = {
      latitude: 51.5074,
      longitude: -0.1278, 
      start_date: startDate,
      end_date: endDate,
      hourly: 'temperature_2m,relative_humidity_2m,pressure_msl,weather_code'
    };
    return this.http.get(this.historicalBaseUrl, { params });
  }

  public mapWeatherCodeToState = mapWeatherCodeToState;
}