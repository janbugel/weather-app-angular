export function mapWeatherCodeToIcon(code: number): string {
  if (code === 0) return 'wb_sunny';
  if (code === 1 || code === 2) return 'partly_cloudy_day';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'foggy';
  if (code >= 51 && code <= 57) return 'grain';
  if (code >= 61 && code <= 67) return 'rainy';
  if (code >= 71 && code <= 77) return 'ac_unit';
  if (code >= 80 && code <= 82) return 'water_drop';
  if (code === 85 || code === 86) return 'cloudy_snowing';
  if (code >= 95 && code <= 99) return 'thunderstorm';
  return 'help_outline';
}
