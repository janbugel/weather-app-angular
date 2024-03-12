import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeatherForecast(pastDays: number): Observable<any> {
    const params = {
      latitude: 51.5074, // London's latitude
      longitude: -0.1278, // London's longitude
      hourly: 'temperature_2m,relative_humidity_2m,pressure_msl,weather_code',
      past_days: pastDays
    };
    return this.http.get(this.baseUrl, { params });
  }
}
