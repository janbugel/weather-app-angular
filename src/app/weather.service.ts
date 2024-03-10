// app/weather.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com/v1';

  constructor(private http: HttpClient) {}

  // Method for fetching forecast data
  getWeatherForecast(latitude: number, longitude: number): Observable<any> {
    const url = `${this.baseUrl}/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,pressure_msl`;
    return this.http.get(url);
  }
}
