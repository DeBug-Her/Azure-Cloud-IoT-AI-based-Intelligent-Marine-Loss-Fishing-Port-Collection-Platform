import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ historicalStats, isDarkMode }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || historicalStats.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: historicalStats.map((_, i) => `T-${historicalStats.length - i - 1}`),
        datasets: [
          {
            label: '폐어망',
            data: historicalStats.map(s => s['폐어망']),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5
          },
          {
            label: '통발',
            data: historicalStats.map(s => s['통발']),
            borderColor: '#eab308',
            backgroundColor: 'rgba(234, 179, 8, 0.1)',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5
          },
          {
            label: '부표',
            data: historicalStats.map(s => s['부표']),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 12,
              padding: 10,
              font: { size: 11, weight: '500' },
              color: isDarkMode ? '#9ca3af' : '#6b7280',
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            titleColor: isDarkMode ? '#fff' : '#111',
            bodyColor: isDarkMode ? '#fff' : '#111',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: isDarkMode ? '#374151' : '#f3f4f6', drawBorder: false },
            ticks: { color: isDarkMode ? '#9ca3af' : '#6b7280' }
          },
          x: {
            grid: { display: false },
            ticks: { color: isDarkMode ? '#9ca3af' : '#6b7280' }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [historicalStats, isDarkMode]);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
