import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com/v1';

  constructor(private http: HttpClient) { }

  getWeatherForecast(latitude: number, longitude: number): Observable<any> {
    const url = `${this.baseUrl}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    return this.http.get(url);
  }
}
