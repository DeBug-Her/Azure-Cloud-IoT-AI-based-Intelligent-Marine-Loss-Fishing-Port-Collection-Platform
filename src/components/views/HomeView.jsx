import React from 'react';
import LatestDetection from '../LatestDetection';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import CollectionChart from '../charts/CollectionChart';

const HomeView = ({
  latestDetection,
  stats,
  historicalStats,
  collectionStats,
  isDarkMode,
  visibleEvents,
  enabledTypes,
  showOptimalRoute,
  handleRouteRequest,
  handleCollectAll
}) => {
  const cardBg = isDarkMode ? 'bg-gray-750' : 'bg-white';

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 animate-fade-in">
      {latestDetection && (
        <>
          {/* 최신 탐지 */}
          <LatestDetection detection={latestDetection} isDarkMode={isDarkMode} />

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

          {/* 수거 현황 */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3">수거 현황</h2>
            <div className={`${cardBg} rounded-2xl p-5 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} card-shadow`}>
              <div className="h-52">
                <CollectionChart collectionStats={collectionStats} isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="space-y-3">
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

            <button
              onClick={handleCollectAll}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              📦 전체 수거 요청 ({visibleEvents.filter(e => enabledTypes[e.type]).length}건)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeView;
