export function calculateHeatIndexFahrenheit(temp: number, humidity: number): number {
    if (humidity < 40) return temp;

    let heatIndex =
      -42.379 +
      2.04901523 * temp +
      10.14333127 * humidity -
      0.22475541 * temp * humidity -
      0.00683783 * temp ** 2 -
      0.05481717 * humidity ** 2 +
      0.00122874 * temp ** 2 * humidity +
      0.00085282 * temp * humidity ** 2 -
      0.00000199 * temp ** 2 * humidity ** 2;
      
    if (temp < 80) {
        heatIndex = temp;
    }

    return Math.round(heatIndex * 10) / 10;
}