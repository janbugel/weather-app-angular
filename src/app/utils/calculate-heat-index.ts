/**
 * NOAA Rothfusz regression. Inputs and output are in degrees Fahrenheit.
 * Returns the input temperature unchanged when the equation is out of range
 * (humidity < 40 % or temperature < 80 °F), matching the convention used by
 * the National Weather Service.
 */
export function calculateHeatIndexFahrenheit(
  temp: number,
  humidity: number
): number {
  if (humidity < 40 || temp < 80) return temp;

  const heatIndex =
    -42.379 +
    2.04901523 * temp +
    10.14333127 * humidity -
    0.22475541 * temp * humidity -
    0.00683783 * temp ** 2 -
    0.05481717 * humidity ** 2 +
    0.00122874 * temp ** 2 * humidity +
    0.00085282 * temp * humidity ** 2 -
    0.00000199 * temp ** 2 * humidity ** 2;

  return Math.round(heatIndex * 10) / 10;
}
