import React from 'react';
import Header from './Header';
import DetectionView from './views/DetectionView';
import CollectionView from './views/CollectionView';

const Sidebar = ({
  isDarkMode,
  setIsDarkMode,
  currentView,
  setCurrentView,
  latestDetection,
  stats,
  historicalStats,
  collectionStats,
  visibleEvents,
  enabledTypes,
  setEnabledTypes,
  showOptimalRoute,
  setShowOptimalRoute,
  handleRouteRequest,
  handleCollectAll
}) => {
  const sidebarBg = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  return (
    <div className={`w-96 overflow-y-auto border-r ${sidebarBg} shadow-2xl flex flex-col`}>
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {currentView === 'detection' && (
        <DetectionView
          latestDetection={latestDetection}
          stats={stats}
          historicalStats={historicalStats}
          isDarkMode={isDarkMode}
          visibleEvents={visibleEvents}
          enabledTypes={enabledTypes}
          setEnabledTypes={setEnabledTypes}
          showOptimalRoute={showOptimalRoute}
          handleRouteRequest={handleRouteRequest}
        />
      )}

      {currentView === 'collection' && (
        <CollectionView
          collectionStats={collectionStats}
          isDarkMode={isDarkMode}
          visibleEvents={visibleEvents}
          enabledTypes={enabledTypes}
          handleCollectAll={handleCollectAll}
        />
      )}
    </div>
  );
};

export default Sidebar;
