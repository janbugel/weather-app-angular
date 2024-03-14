import { ChartConfiguration, ChartEvent, ActiveElement, Chart } from 'chart.js';

export function getTemperatureChartAppearance(labels: string[], temperatures: number[], chartLabel: string): ChartConfiguration<'line', number[], string> {
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: chartLabel,
                    backgroundColor: 'rgb(96, 111, 199)',
                    borderColor: 'rgb(96, 111, 199)',
                    data: temperatures,
                    fill: false,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                intersect: false,
                axis: 'x',
            },
            plugins: {
                tooltip: {
                    position: 'nearest',
                },
                legend: {
                    display: true,
                },
            },
            scales: {
                y: {
                    beginAtZero: false,
                },
                x: {
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
            elements: {
                line: {
                    borderWidth: 2.5,
                },
                point: {
                    radius: 5, // dot size
                    hoverRadius: 5, // dot size on hover
                },
            },
            onHover: (
                event: ChartEvent,
                chartElements: ActiveElement[],
                chart: Chart
            ) => {
                if (chartElements.length) {
                    const x = chartElements[0].element.x;
                    const yAxis = chart.scales['y'];
                    chart.ctx.save();
                    chart.ctx.beginPath();
                    chart.ctx.moveTo(x, yAxis.top);
                    chart.ctx.lineTo(x, yAxis.bottom);
                    chart.ctx.lineWidth = 2; // line width
                    chart.ctx.strokeStyle = 'rgba(96, 111, 199, 0.5)';
                    chart.ctx.stroke();
                    chart.ctx.restore();
                }
            },
        },
    };
}
