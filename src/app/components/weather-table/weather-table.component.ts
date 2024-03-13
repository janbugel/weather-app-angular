import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

interface WeatherData {
  datetime: string;
  temperature: number;
  humidity: number;
  pressure: number | string;
  weatherState: string;
}

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.sass']
})
export class WeatherTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['datetime', 'weatherState', 'temperature', 'humidity', 'pressure'];
  dataSource = new MatTableDataSource<WeatherData>();

  pastDays = parseInt(localStorage.getItem('pastDays') || '7');
  paginatorPageIndex = parseInt(localStorage.getItem('paginatorPageIndex') || '0');
  paginatorPageSize = parseInt(localStorage.getItem('paginatorPageSize') || '10');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() pastDaysChanged = new EventEmitter<number>();

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.loadWeatherData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.pageIndex = this.paginatorPageIndex;
    this.paginator.pageSize = this.paginatorPageSize;
    this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.paginatorPageIndex = pageEvent.pageIndex;
      this.paginatorPageSize = pageEvent.pageSize;
      localStorage.setItem('paginatorPageIndex', this.paginatorPageIndex.toString());
      localStorage.setItem('paginatorPageSize', this.paginatorPageSize.toString());
    });
  }

  updatePastDays(): void {
    if (this.pastDays > 92) {
      return;
    }

    if (this.pastDays >= 1) {
      this.loadWeatherData();
      this.pastDaysChanged.emit(this.pastDays);
      localStorage.setItem('pastDays', this.pastDays.toString());
    }
  }

  private loadWeatherData(): void {
    this.forecastService.getWeatherForecast(this.pastDays).subscribe((data) => {
      this.dataSource.data = data.hourly.time.map((time: string, index: number) => {
        const date = new Date(time);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const formattedDate = `${day}.${month}.${year}`;
        const formattedTime = date.toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        return {
          datetime: `${formattedDate}, ${formattedTime}`,
          temperature: data.hourly.temperature_2m[index],
          humidity: data.hourly.relative_humidity_2m[index],
          pressure: data.hourly.pressure_msl[index],
          weatherState: this.mapWeatherCodeToState(data.hourly.weather_code[index]),
        };
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private mapWeatherCodeToState(code: number): string {
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

  updatePaginatorSettings(event: PageEvent) {
    localStorage.setItem('paginatorPageIndex', event.pageIndex.toString());
    localStorage.setItem('paginatorPageSize', event.pageSize.toString());
  }
}
