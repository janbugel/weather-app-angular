import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms'; // Import FormsModule here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { HeatIndexCalculatorComponent } from './heat-index-calculator/heat-index-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    WeatherTableComponent,
    TemperatureChartComponent,
    HeatIndexCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    MatTabsModule,
    FormsModule // Add FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
