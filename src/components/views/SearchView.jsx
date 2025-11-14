import React from 'react';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import { DEBRIS_COLORS } from '../../utils/constants';

const SearchView = ({
  expandedSections,
  setExpandedSections,
  stats,
  historicalStats,
  enabledTypes,
  setEnabledTypes,
  visibleEvents,
  showOptimalRoute,
  setShowOptimalRoute,
  handleCollectAll,
  isDarkMode
}) => {
  const cardBg = isDarkMode ? 'bg-gray-750' : 'bg-white';
  const hoverBg = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  return (
    <div className="flex-1 overflow-y-auto animate-fade-in">
      {/* ACTIVITY */}
      <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={() => setExpandedSections({ ...expandedSections, activity: !expandedSections.activity })}
          className={`w-full p-4 flex items-center justify-between ${hoverBg} transition-colors`}
        >
          <span className="text-sm font-bold uppercase tracking-wider">Activity</span>
          <span className="text-lg">{expandedSections.activity ? '▲' : '▼'}</span>
        </button>
        {expandedSections.activity && (
          <div className="px-4 pb-4 space-y-3">
            <div className={`${cardBg} rounded-xl p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} card-shadow`}>
              <h3 className="text-sm font-bold mb-3">현재 탐지 현황</h3>
              <div className="h-40">
                <BarChart stats={stats} isDarkMode={isDarkMode} />
              </div>
            </div>
            <div className={`${cardBg} rounded-xl p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} card-shadow`}>
              <h3 className="text-sm font-bold mb-3">시간별 추이</h3>
              <div className="h-40">
                <LineChart historicalStats={historicalStats} isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DETECTIONS */}
      <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={() => setExpandedSections({ ...expandedSections, detections: !expandedSections.detections })}
          className={`w-full p-4 flex items-center justify-between ${hoverBg} transition-colors`}
        >
          <span className="text-sm font-bold uppercase tracking-wider">Detections</span>
          <span className="text-lg">{expandedSections.detections ? '▲' : '▼'}</span>
        </button>
        {expandedSections.detections && (
          <div className="px-4 pb-4 space-y-2">
            {Object.keys(enabledTypes).map(type => (
              <label
                key={type}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${hoverBg} transition-all`}
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
        )}
      </div>

      {/* EVENTS */}
      <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex-1`}>
        <button
          onClick={() => setExpandedSections({ ...expandedSections, events: !expandedSections.events })}
          className={`w-full p-4 flex items-center justify-between ${hoverBg} transition-colors`}
        >
          <span className="text-sm font-bold uppercase tracking-wider">
            Events ({visibleEvents.filter(e => enabledTypes[e.type]).length})
          </span>
          <span className="text-lg">{expandedSections.events ? '▲' : '▼'}</span>
        </button>
        {expandedSections.events && (
          <div className="px-4 pb-4 space-y-2">
            <label className={`flex items-center gap-2 mb-3 p-3 rounded-xl ${hoverBg} cursor-pointer transition-all`}>
              <input
                type="checkbox"
                checked={showOptimalRoute}
                onChange={() => setShowOptimalRoute(!showOptimalRoute)}
                className="w-5 h-5 rounded"
              />
              <span className="text-sm font-medium">최적 경로 표시</span>
            </label>
            {visibleEvents
              .filter(e => enabledTypes[e.type])
              .slice(0, 8)
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
                    <div>⏰ {event.time} | 🌊 {event.depth}m</div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* 수거하기 버튼 */}
      <div className="p-4">
        <button
          onClick={handleCollectAll}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-4 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          전체 수거하기 ({visibleEvents.filter(e => enabledTypes[e.type]).length}건)
        </button>
      </div>
    </div>
  );
};

export default SearchView;
