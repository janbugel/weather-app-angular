import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseForecastUrl = 'https://api.open-meteo.com/v1/forecast';
  private baseHistoricalUrl = 'https://api.open-meteo.com/v1/history';

  constructor(private http: HttpClient) { }

  getWeatherForecast(latitude: number, longitude: number): Observable<any> {
    const params = `latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode,surface_pressure`;
    return this.http.get(`${this.baseForecastUrl}?${params}`);
  }

  getHistoricalWeather(latitude: number, longitude: number, startDate: string, endDate: string): Observable<any> {
    const params = `latitude=${latitude}&longitude=${longitude}&start=${startDate}&end=${endDate}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode,surface_pressure`;
    return this.http.get(`${this.baseHistoricalUrl}?${params}`);
  }
}