import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const CollectionChart = ({ collectionStats, isDarkMode }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || collectionStats.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: collectionStats.map((_, i) => `T-${collectionStats.length - i - 1}`),
        datasets: [{
          label: '수거 완료',
          data: collectionStats,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          tension: 0.4,
          fill: true,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
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
  }, [collectionStats, isDarkMode]);

  return <canvas ref={chartRef}></canvas>;
};

export default CollectionChart;
