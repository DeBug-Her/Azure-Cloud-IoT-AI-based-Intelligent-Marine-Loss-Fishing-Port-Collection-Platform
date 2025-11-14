import React, { useState, useEffect } from 'react';

const Timeline = ({ isDarkMode }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => prev >= 100 ? 0 : prev + 0.5);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div
      style={{ zIndex: 1000 }}
      className={`absolute bottom-0 left-0 right-0 ${isDarkMode ? 'glass-effect-dark' : 'glass-effect'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} py-4 px-6 shadow-2xl`}
    >
      <div className="flex items-center gap-4 mb-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:from-blue-700 hover:to-blue-900 flex items-center justify-center shadow-lg transition-all transform hover:scale-105"
        >
          <span className="text-white text-xl">{isPlaying ? '⏸' : '▶'}</span>
        </button>
        <div
          className="flex gap-2 text-xs rounded-xl p-1.5"
          style={{ background: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}
        >
          <button className="px-5 py-2 rounded-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
            DAY
          </button>
          <button className="px-5 py-2 rounded-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
            HOUR
          </button>
        </div>
        <div className="ml-auto text-sm font-bold flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full pulse-animation"></div>
          실시간 탐지 중
        </div>
      </div>

      <div
        className="relative h-14 rounded-xl overflow-hidden mb-3 border-2"
        style={{
          background: isDarkMode ? '#1f2937' : '#eff6ff',
          borderColor: isDarkMode ? '#374151' : '#bfdbfe'
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.4 }} />
              <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.7 }} />
              <stop offset="100%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
          <path
            d="M0,30 L50,20 L100,35 L150,15 L200,40 L250,10 L300,30 L350,20 L400,35 L450,25 L500,40 L550,20 L600,30 L650,25 L700,35 L750,20 L800,30 L850,25 L900,40 L950,30 L1000,35 L1050,25 L1100,40 L1150,30 L1200,35 L1250,25 L1300,30 L1350,20 L1400,35 L1450,25 L1500,30 L1500,56 L0,56 Z"
            fill="url(#grad)"
          />
        </svg>
        <div
          className="absolute top-1/2 transform -translate-y-1/2"
          style={{ left: `${currentTime}%`, zIndex: 30 }}
        >
          <div className="w-5 h-5 bg-blue-600 rounded-full border-3 border-white shadow-xl timeline-glow"></div>
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={currentTime}
        onChange={(e) => setCurrentTime(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{ background: isDarkMode ? '#374151' : '#bfdbfe' }}
      />

      <div className="flex justify-between text-xs font-medium opacity-60 mt-2">
        <span>시작</span>
        <span>진행 중</span>
        <span>현재</span>
      </div>
    </div>
  );
};

export default Timeline;
