import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
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

  public mapWeatherCodeToState(code: number): string {
    switch (code) {
      case 0: return 'Clear sky';
      case 1: return 'Mainly clear';
      case 2: return 'Partly cloudy';
      case 3: return 'Cloudy';
      case 45: return 'Fog';
      case 48: return 'Depositing rime fog';
      case 51: return 'Light drizzle';
      case 53: return 'Moderate drizzle';
      case 55: return 'Dense drizzle';
      case 56: return 'Light freezing drizzle';
      case 57: return 'Dense freezing drizzle';
      case 61: return 'Slight rain';
      case 63: return 'Moderate rain';
      case 65: return 'Heavy rain';
      case 66: return 'Light freezing rain';
      case 67: return 'Heavy freezing rain';
      case 71: return 'Slight snow fall';
      case 73: return 'Moderate snow fall';
      case 75: return 'Heavy snow fall';
      case 77: return 'Snow grains';
      case 80: return 'Slight rain showers';
      case 81: return 'Moderate rain showers';
      case 82: return 'Heavy rain showers';
      case 85: return 'Slight snow showers';
      case 86: return 'Heavy snow showers';
      case 95: return 'Thunderstorm: Slight or moderate';
      case 96: return 'Thunderstorm with light hail';
      case 99: return 'Thunderstorm with heavy hail';
      default: return 'Unknown';
    }
  }
}