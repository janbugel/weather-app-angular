import { MatTableDataSource } from '@angular/material/table';
import { TemperatureUnit } from '../models/weather.types';

export interface HeatIndexRecord {
  temperature: number;
  humidity: number;
  heatIndex: number;
  unit: TemperatureUnit;
  timestamp?: number;
}

export class HeatIndexHistory {
  private static readonly MAX_HISTORY_LENGTH = 5;
  private static readonly STORAGE_KEY = 'heatIndexHistory';

  static loadHistory(): MatTableDataSource<HeatIndexRecord> {
    return new MatTableDataSource<HeatIndexRecord>(HeatIndexHistory.read());
  }

  static saveRecord(
    temperature: number,
    humidity: number,
    unit: TemperatureUnit,
    heatIndex: number | null
  ): void {
    if (heatIndex === null) return;

    const next: HeatIndexRecord[] = HeatIndexHistory.read();
    next.unshift({ temperature, humidity, heatIndex, unit, timestamp: Date.now() });
    localStorage.setItem(
      HeatIndexHistory.STORAGE_KEY,
      JSON.stringify(next.slice(0, HeatIndexHistory.MAX_HISTORY_LENGTH))
    );
  }

  static clear(): void {
    localStorage.removeItem(HeatIndexHistory.STORAGE_KEY);
  }

  private static read(): HeatIndexRecord[] {
    const stored = localStorage.getItem(HeatIndexHistory.STORAGE_KEY);
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
