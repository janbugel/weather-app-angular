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

  // Separate method for fetching historical data with start and end dates
  getWeatherHistoricalData(
    latitude: number,
    longitude: number,
    startDate: Date,
    endDate: Date
  ): Observable<any> {
    const startFormat = startDate.toISOString().split('T')[0];
    const endFormat = endDate.toISOString().split('T')[0];

    const url = `${this.baseUrl}/forecast?latitude=${latitude}&longitude=${longitude}&start=${startFormat}&end=${endFormat}&hourly=temperature_2m,relative_humidity_2m`;
    return this.http.get(url);
  }
}
