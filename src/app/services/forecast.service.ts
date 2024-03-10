// app/services/forecast.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeatherForecast(latitude: number, longitude: number): Observable<any> {
    const params = {
      latitude: latitude,
      longitude: longitude,
      hourly: 'temperature_2m,relative_humidity_2m,pressure_msl'
    };
    return this.http.get(this.baseUrl, { params });
  }
}

