import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WeatherApiService } from '../../services/weather-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { transformWeatherData } from '../../utils/transform-weather-data';
import { setTablePagination } from '../../utils/table-formatting';

interface WeatherData {
  datetime: string;
  temperature: number;
  humidity: number;
  pressure: number | string;
  weatherState: string;
}

@Component({
  selector: 'app-weather-table-forecast',
  templateUrl: './weather-table-forecast.component.html',
  styleUrls: ['./weather-table-forecast.component.sass'],
})
export class WeatherTableForecastComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'datetime',
    'weatherState',
    'temperature',
    'humidity',
    'pressure',
  ];
  dataSource = new MatTableDataSource<WeatherData>();
  isMobile: boolean = false;

  pastDays = parseInt(localStorage.getItem('pastDays') || '7');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private forecastService: WeatherApiService) {
    this.adjustForScreenSize();
    window.onresize = () => this.adjustForScreenSize();
  }

  ngOnInit(): void {
    this.loadWeatherData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    setTablePagination({
      dataSource: this.dataSource,
      paginator: this.paginator,
      pageIndexKey: 'weatherPaginationPageIndex',
      pageSizeKey: 'weatherPaginationPageSize',
    });
  }

  private loadWeatherData(): void {
    this.forecastService.getWeatherForecast(this.pastDays).subscribe((data) => {
      this.dataSource.data = transformWeatherData(data);
      this.dataSource.sort = this.sort;
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

  private adjustForScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    this.displayedColumns = this.isMobile
      ? ['datetime', 'weatherState', 'temperature', 'humidity']
      : ['datetime', 'weatherState', 'temperature', 'humidity', 'pressure'];
  }
}
