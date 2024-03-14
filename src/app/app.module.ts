import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { WeatherTableForecastModule } from './components/weather-table-forecast/weather-table-forecast.module'; 
import { TemperatureChartModule } from './components/temperature-chart/temperature-chart.module'; 
import { HeatIndexCalculatorModule } from './components/heat-index-calculator/heat-index-calculator.module';
import { WeatherTableHistoricalModule } from './components/weather-table-historical/weather-table-historical.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    WeatherTableForecastModule,
    TemperatureChartModule,
    HeatIndexCalculatorModule,
    WeatherTableHistoricalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
