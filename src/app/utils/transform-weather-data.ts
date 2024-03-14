import { formatDate } from './format-date';
import { mapWeatherCodeToState } from './map-weather-code';

export function transformWeatherData(data: any): any[] {
  return data.hourly.time.map((time: string, index: number) => {
    return {
      datetime: formatDate(time),
      temperature: data.hourly.temperature_2m[index],
      humidity: data.hourly.relative_humidity_2m[index],
      pressure: data.hourly.pressure_msl[index],
      weatherState: mapWeatherCodeToState(data.hourly.weather_code[index]),
    };
  });
}