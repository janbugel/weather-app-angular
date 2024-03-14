import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WeatherApiService } from '../../services/weather-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { transformWeatherData } from '../../utils/transform-weather-data';
import { setTablePagination } from '../../utils/table-formatting';
import { formatDateForAPI } from '../../utils/format-date';

interface WeatherData {
  datetime: string;
  temperature: number;
  humidity: number;
  pressure: number | string;
  weatherState: string;
}

@Component({
  selector: 'app-weather-table-historical',
  templateUrl: './weather-table-historical.component.html',
  styleUrls: ['./weather-table-historical.component.sass']
})
export class WeatherTableHistoricalComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['datetime', 'weatherState', 'temperature', 'humidity', 'pressure'];
  dataSource = new MatTableDataSource<WeatherData>();

  startDate: string; 
  endDate: string; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private weatherService: WeatherApiService) {
    const today = formatDateForAPI(new Date());
    this.startDate = localStorage.getItem('historicalStartDate') || today;
    this.endDate = localStorage.getItem('historicalEndDate') || today;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadHistoricalData(); 
    setTablePagination({
      dataSource: this.dataSource,
      paginator: this.paginator,
      pageIndexKey: 'weatherPaginationPageIndex',
      pageSizeKey: 'weatherPaginationPageSize',
    });
  }

  loadHistoricalData(): void {
    localStorage.setItem('historicalStartDate', this.startDate);
    localStorage.setItem('historicalEndDate', this.endDate);
    
    const formattedStartDate = formatDateForAPI(new Date(this.startDate));
    const formattedEndDate = formatDateForAPI(new Date(this.endDate));
    
    this.weatherService.getHistoricalWeather(formattedStartDate, formattedEndDate).subscribe(data => {
      this.dataSource.data = transformWeatherData(data);
      this.dataSource.sort = this.sort;
      
      setTablePagination({
        dataSource: this.dataSource,
        paginator: this.paginator,
        pageIndexKey: 'weatherPaginationPageIndex',
        pageSizeKey: 'weatherPaginationPageSize',
      });
    });
  }
}