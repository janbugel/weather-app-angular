import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTableHistoricalComponent } from '../historical-weather-table/historical-weather-table.component';

describe('WeatherTableHistoricalComponent', () => {
  let component: WeatherTableHistoricalComponent;
  let fixture: ComponentFixture<WeatherTableHistoricalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherTableHistoricalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherTableHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
