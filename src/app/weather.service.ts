// app/weather.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com/v1';
  private baseurlArchive = 'https://archive-api.open-meteo.com/v1/archive';

  constructor(private http: HttpClient) {}

  getWeatherForecast(latitude: number, longitude: number): Observable<any> {
    const url = `${this.baseUrl}/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,pressure_msl`;
    return this.http.get(url);
  }

  getHistoricalWeather(params: any): Observable<any> {
    return this.http.get(this.baseurlArchive, { params }).pipe(
      map((response: any) => {
        // Assuming `response` follows the structure from the example
        // Transform the response to match the expected format for the component
        const utcOffsetSeconds = response.utcOffsetSeconds;
        const interval = response.hourly.interval(); // Assuming interval is constant for all entries

        return {
          hourly: {
            time: this.range(Number(response.hourly.time()), Number(response.hourly.timeEnd()), interval).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000).toISOString()
            ),
            temperature_2m: response.hourly.variables(0)?.valuesArray() || [],
            relative_humidity_2m: [], // Placeholder if needed
            pressure_msl: [] // Placeholder if needed
          }
        };
      })
    );
  }

  // Helper function to form time ranges
  private range(start: number, stop: number, step: number): number[] {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
  }
}
