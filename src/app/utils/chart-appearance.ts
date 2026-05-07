import { ChartConfiguration, ChartEvent, ActiveElement, Chart } from 'chart.js';
import { TemperatureUnit } from '../models/weather.types';

const PRIMARY_COLOR = 'rgb(96, 111, 199)';
const PRIMARY_FILL = 'rgba(96, 111, 199, 0.18)';
const CROSSHAIR_COLOR = 'rgba(96, 111, 199, 0.5)';

export function getTemperatureChartAppearance(
  labels: string[],
  temperatures: number[],
  chartLabel: string,
  unit: TemperatureUnit = 'C'
): ChartConfiguration<'line', number[], string> {
  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: `${chartLabel} (°${unit})`,
          backgroundColor: PRIMARY_FILL,
          borderColor: PRIMARY_COLOR,
          data: temperatures,
          fill: true,
          tension: 0.25,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 250 },
      interaction: { mode: 'nearest', intersect: false, axis: 'x' },
      plugins: {
        tooltip: {
          position: 'nearest',
          callbacks: {
            label: (ctx) => `${ctx.parsed.y.toFixed(1)}°${unit}`,
          },
        },
        legend: { display: true, position: 'top' },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: { callback: (value) => `${value}°${unit}` },
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
        x: {
          grid: { drawOnChartArea: false },
          ticks: { autoSkip: true, maxRotation: 0, maxTicksLimit: 12 },
        },
      },
      elements: {
        line: { borderWidth: 2 },
        point: { hoverRadius: 5 },
      },
      onHover: (
        _event: ChartEvent,
        chartElements: ActiveElement[],
        chart: Chart
      ) => {
        if (!chartElements.length) return;
        const x = chartElements[0].element.x;
        const yAxis = chart.scales['y'];
        chart.ctx.save();
        chart.ctx.beginPath();
        chart.ctx.moveTo(x, yAxis.top);
        chart.ctx.lineTo(x, yAxis.bottom);
        chart.ctx.lineWidth = 1.5;
        chart.ctx.strokeStyle = CROSSHAIR_COLOR;
        chart.ctx.stroke();
        chart.ctx.restore();
      },
    },
  };
}
