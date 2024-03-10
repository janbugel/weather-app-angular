// app/services/historical.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoricalService {
  private baseUrl = 'https://archive-api.open-meteo.com/v1/archive';

  constructor(private http: HttpClient) {}

  getHistoricalWeather(params: any): Observable<any> {
    return this.http.get(this.baseUrl, { params });
  }
}
