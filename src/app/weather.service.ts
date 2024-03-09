import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com';

  constructor(private http: HttpClient) { }

  getWeatherForecast(): Observable<any> {
    const url = `${this.baseUrl}/v1/forecast?latitude=51.5074&longitude=-0.1278&hourly=temperature_2m,relative_humidity,pressure_surface_level`;
    return this.http.get(url);
  }

  getWeatherHistory(startDate: string, endDate: string): Observable<any> {
    const url = `${this.baseUrl}/v1/history?latitude=51.5074&longitude=-0.1278&start=${startDate}&end=${endDate}&hourly=temperature_2m,relative_humidity,pressure_surface_level`;
    return this.http.get(url);
  }
}
