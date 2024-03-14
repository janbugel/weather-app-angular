import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WeatherApiService } from '../../services/weather-api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '../../utils/format-date';

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

  constructor(private forecastService: WeatherApiService) {}

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
      this.updatePastDays(); // This now calls updatePastDays() to reflect changes
    });
  }

  updatePastDays(): void {
    if (this.pastDays > 92) {
      return;
    }

    if (this.pastDays >= 1) {
      this.loadWeatherData();
      localStorage.setItem('pastDays', this.pastDays.toString());
    }
  }

  private loadWeatherData(): void {
    this.forecastService.getWeatherForecast(this.pastDays).subscribe((data) => {
      this.dataSource.data = data.hourly.time.map((time: string, index: number) => {
        return {
          datetime: formatDate(time),
          temperature: data.hourly.temperature_2m[index],
          humidity: data.hourly.relative_humidity_2m[index],
          pressure: data.hourly.pressure_msl[index],
          weatherState: this.forecastService.mapWeatherCodeToState(data.hourly.weather_code[index]),
        };
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}