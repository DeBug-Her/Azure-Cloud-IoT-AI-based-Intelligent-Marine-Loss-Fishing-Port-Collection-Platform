import React from 'react';

const LatestDetection = ({ detection, isDarkMode }) => {
  if (!detection) return null;

  const cardBg = isDarkMode ? 'bg-gray-750' : 'bg-white';

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-red-500 rounded-full pulse-animation"></div>
        <h2 className="text-sm font-bold uppercase tracking-wider">최신 탐지</h2>
      </div>
      <div className={`${cardBg} rounded-2xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden card-shadow card-shadow-hover transition-all duration-200`}>
        <img
          src={detection.image}
          alt={detection.type}
          className="w-full h-52 object-cover"
        />
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-red-500">{detection.type}</span>
            <span className="text-sm bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1.5 rounded-full font-bold shadow-lg">
              {detection.confidence}%
            </span>
          </div>
          <div className={`text-sm space-y-2 p-3 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span className="font-medium opacity-90">위도: {detection.lat.toFixed(4)}°N</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span className="font-medium opacity-90">경도: {detection.lng.toFixed(4)}°E</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⏰</span>
              <span className="font-medium opacity-90">시간: {detection.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🌊</span>
              <span className="font-medium opacity-90">깊이: {detection.depth}m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestDetection;
