import { Pipe, PipeTransform } from '@angular/core';
import { TemperatureUnit } from '../models/weather.types';
import { convertCelsiusToFahrenheit } from '../utils/temperature-conversions';

@Pipe({ name: 'temperature', standalone: false, pure: true })
export class TemperaturePipe implements PipeTransform {
  transform(
    valueCelsius: number | null | undefined,
    unit: TemperatureUnit = 'C',
    digits = 1
  ): string {
    if (valueCelsius === null || valueCelsius === undefined || Number.isNaN(valueCelsius)) {
      return '—';
    }
    const value =
      unit === 'F' ? convertCelsiusToFahrenheit(valueCelsius) : valueCelsius;
    return `${value.toFixed(digits)}°${unit}`;
  }
}
