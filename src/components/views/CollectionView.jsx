import React from 'react';
import CollectionChart from '../charts/CollectionChart';

const CollectionView = ({
  collectionStats,
  isDarkMode,
  visibleEvents,
  enabledTypes,
  handleCollectAll
}) => {
  const cardBg = isDarkMode ? 'bg-gray-750' : 'bg-white';

  // 수거 가능한 항목 수
  const collectableCount = visibleEvents.filter(e => enabledTypes[e.type]).length;

  // 총 수거량 계산
  const totalCollected = collectionStats.reduce((sum, val) => sum + val, 0);

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 animate-fade-in">
      {/* 수거 통계 카드 */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`${cardBg} rounded-2xl p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} card-shadow`}>
          <div className="text-xs opacity-60 mb-1">수거 대기</div>
          <div className="text-3xl font-bold text-blue-500">{collectableCount}</div>
          <div className="text-xs opacity-60 mt-1">건</div>
        </div>
        <div className={`${cardBg} rounded-2xl p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} card-shadow`}>
          <div className="text-xs opacity-60 mb-1">총 수거량</div>
          <div className="text-3xl font-bold text-green-500">{totalCollected}</div>
          <div className="text-xs opacity-60 mt-1">건</div>
        </div>
      </div>

      {/* 수거 현황 차트 */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3">수거 현황</h2>
        <div className={`${cardBg} rounded-2xl p-5 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} card-shadow`}>
          <div className="h-52">
            <CollectionChart collectionStats={collectionStats} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>

      {/* 수거 정보 */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3">수거 정보</h2>
        <div className={`${cardBg} rounded-2xl p-5 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} card-shadow space-y-3`}>
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-75">평균 수거 시간</span>
            <span className="text-sm font-bold">2.5시간</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-75">수거 성공률</span>
            <span className="text-sm font-bold text-green-500">95%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-75">금일 수거 건수</span>
            <span className="text-sm font-bold">{collectionStats.length > 0 ? collectionStats[collectionStats.length - 1] : 0}건</span>
          </div>
        </div>
      </div>

      {/* 수거 대기 목록 */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3">
          수거 대기 목록 ({collectableCount}건)
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
                  <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full font-bold">
                    대기중
                  </span>
                </div>
                <div className="text-xs opacity-75 space-y-1">
                  <div>📍 {event.lat.toFixed(4)}°N, {event.lng.toFixed(4)}°E</div>
                  <div>🌊 깊이: {event.depth}m</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 전체 수거 요청 버튼 */}
      <div className="space-y-3">
        <button
          onClick={handleCollectAll}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          📦 전체 수거 요청 ({collectableCount}건)
        </button>

        <button
          className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-4 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          ✓ 수거 완료 확인
        </button>
      </div>
    </div>
  );
};

export default CollectionView;
