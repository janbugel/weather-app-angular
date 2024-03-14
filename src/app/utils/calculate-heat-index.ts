export function calculateHeatIndexFahrenheit(temp: number, humidity: number): number {
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
    return Math.round(heatIndex * 10) / 10;
}

export function convertCelsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
}

export function convertFahrenheitToCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) * 5) / 9;
}