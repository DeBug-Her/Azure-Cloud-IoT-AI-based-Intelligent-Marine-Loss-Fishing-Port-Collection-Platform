import React from 'react';
import LatestDetection from '../LatestDetection';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import { DEBRIS_COLORS } from '../../utils/constants';

const DetectionView = ({
  latestDetection,
  stats,
  historicalStats,
  isDarkMode,
  visibleEvents,
  enabledTypes,
  setEnabledTypes,
  showOptimalRoute,
  handleRouteRequest
}) => {
  const cardBg = isDarkMode ? 'bg-gray-750' : 'bg-white';
  const hoverBg = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 animate-fade-in">
      {/* 최신 탐지 */}
      {latestDetection && (
        <LatestDetection detection={latestDetection} isDarkMode={isDarkMode} />
      )}

      {/* 탐지 현황 */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3">탐지 현황</h2>
        <div className={`${cardBg} rounded-2xl p-5 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} card-shadow`}>
          <div className="h-52">
            <BarChart stats={stats} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>

      {/* 시간별 탐지 추이 */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3">시간별 탐지 추이</h2>
        <div className={`${cardBg} rounded-2xl p-5 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} card-shadow`}>
          <div className="h-52">
            <LineChart historicalStats={historicalStats} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>

      {/* 탐지 유형 필터 */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3">탐지 유형 필터</h2>
        <div className="space-y-2">
          {Object.keys(enabledTypes).map(type => (
            <label
              key={type}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${hoverBg} transition-all ${cardBg} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <input
                type="checkbox"
                checked={enabledTypes[type]}
                onChange={() => setEnabledTypes({ ...enabledTypes, [type]: !enabledTypes[type] })}
                className="w-5 h-5 rounded"
              />
              <div
                className="w-4 h-4 rounded-full shadow-md"
                style={{ background: DEBRIS_COLORS[type] }}
              ></div>
              <span className="text-sm font-medium">
                {type} <span className="opacity-60">({stats[type]}건)</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 탐지 이벤트 목록 */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3">
          탐지 이벤트 ({visibleEvents.filter(e => enabledTypes[e.type]).length}건)
        </h2>
        <div className="space-y-2">
          {visibleEvents
            .filter(e => enabledTypes[e.type])
            .slice(0, 5)
            .map(event => (
              <div
                key={event.id}
                className={`${cardBg} rounded-xl p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} card-shadow-hover transition-all`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">{event.type}</span>
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold">
                    {event.confidence}%
                  </span>
                </div>
                <div className="text-xs opacity-75 space-y-1">
                  <div>📍 {event.lat.toFixed(4)}°N, {event.lng.toFixed(4)}°E</div>
                  <div>⏰ {event.time} | 🌊 {event.depth}m</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 최적 경로 추천 버튼 */}
      <div>
        <button
          onClick={handleRouteRequest}
          className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
            showOptimalRoute
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
              : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
          }`}
        >
          {showOptimalRoute ? '✓ 최적 경로 표시 중' : '🗺️ 최적 경로 추천'}
        </button>
      </div>
    </div>
  );
};

export default DetectionView;
