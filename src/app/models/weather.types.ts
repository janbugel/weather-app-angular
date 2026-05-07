export type TemperatureUnit = 'C' | 'F';

export interface WeatherLocation {
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface WeatherDataRow {
  datetime: string;
  temperature: number;
  humidity: number;
  pressure: number;
  weatherState: string;
  weatherCode: number;
}

export interface OpenMeteoHourlyResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    pressure_msl: number[];
    weather_code: number[];
  };
}

export interface GeocodingResult {
  id: number;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

export const DEFAULT_LOCATION: WeatherLocation = {
  name: 'London',
  country: 'United Kingdom',
  latitude: 51.5074,
  longitude: -0.1278,
};
