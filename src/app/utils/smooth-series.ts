/**
 * Centered simple moving average. windowSize <= 1 returns the input unchanged.
 * The window is clamped at the series boundaries so the output length matches the input.
 */
export function smoothSeries(values: number[], windowSize: number): number[] {
  if (windowSize <= 1 || values.length === 0) return values.slice();
  const half = Math.floor(windowSize / 2);
  const result: number[] = new Array(values.length);
  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - half);
    const end = Math.min(values.length - 1, i + half);
    let sum = 0;
    let count = 0;
    for (let j = start; j <= end; j++) {
      const v = values[j];
      if (Number.isFinite(v)) {
        sum += v;
        count++;
      }
    }
    result[i] = count > 0 ? sum / count : values[i];
  }
  return result;
}
