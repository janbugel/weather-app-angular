import { MatTableDataSource } from '@angular/material/table';
import { calculateHeatIndexFahrenheit } from './calculate-heat-index';
import { convertCelsiusToFahrenheit, convertFahrenheitToCelsius } from './temperature-conversions';

export interface HeatIndexRecord {
  temperature: number;
  humidity: number;
  heatIndex: number;
  unit: 'C' | 'F';
}

export class HeatIndexHistory {
  private static readonly MAX_HISTORY_LENGTH = 5;
  private static readonly STORAGE_KEY = 'heatIndexHistory';

  static loadHistory(): MatTableDataSource<HeatIndexRecord> {
    const storedHistory = localStorage.getItem(HeatIndexHistory.STORAGE_KEY);
    const historyData: HeatIndexRecord[] = storedHistory ? JSON.parse(storedHistory) : [];
    return new MatTableDataSource<HeatIndexRecord>(historyData);
  }

  static saveRecord(temperature: number, humidity: number, unit: 'C' | 'F', heatIndex: number | null): void {
    if (heatIndex === null) return;

    let historyData: HeatIndexRecord[] = HeatIndexHistory.loadHistory().data;
    if (unit === 'C') {
      heatIndex = convertFahrenheitToCelsius(heatIndex);
    }

    historyData.unshift({ temperature, humidity, heatIndex, unit });
    historyData = historyData.slice(0, HeatIndexHistory.MAX_HISTORY_LENGTH);

    localStorage.setItem(HeatIndexHistory.STORAGE_KEY, JSON.stringify(historyData));
  }
}