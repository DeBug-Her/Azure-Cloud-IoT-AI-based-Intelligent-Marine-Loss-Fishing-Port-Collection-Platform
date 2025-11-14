import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ stats, isDarkMode }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['폐어망', '통발', '부표', '기타'],
        datasets: [{
          label: '탐지 건수',
          data: [stats['폐어망'], stats['통발'], stats['부표'], stats['기타']],
          backgroundColor: ['#ef4444', '#eab308', '#3b82f6', '#9ca3af'],
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
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
  }, [stats, isDarkMode]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
