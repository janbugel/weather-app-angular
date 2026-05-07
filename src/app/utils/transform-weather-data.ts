import { formatDate } from './format-date';
import { mapWeatherCodeToState } from './map-weather-code';
import {
  OpenMeteoHourlyResponse,
  WeatherDataRow,
} from '../models/weather.types';

export function transformWeatherData(
  data: OpenMeteoHourlyResponse
): WeatherDataRow[] {
  const { time, temperature_2m, relative_humidity_2m, pressure_msl, weather_code } =
    data.hourly;
  return time.map((dt, index) => ({
    datetime: formatDate(dt),
    temperature: temperature_2m[index],
    humidity: relative_humidity_2m[index],
    pressure: pressure_msl[index],
    weatherCode: weather_code[index],
    weatherState: mapWeatherCodeToState(weather_code[index]),
  }));
}
