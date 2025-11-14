import React from 'react';
import Header from './Header';
import HomeView from './views/HomeView';
import SearchView from './views/SearchView';

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
  handleCollectAll,
  expandedSections,
  setExpandedSections
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

      {currentView === 'home' && (
        <HomeView
          latestDetection={latestDetection}
          stats={stats}
          historicalStats={historicalStats}
          collectionStats={collectionStats}
          isDarkMode={isDarkMode}
          visibleEvents={visibleEvents}
          enabledTypes={enabledTypes}
          showOptimalRoute={showOptimalRoute}
          handleRouteRequest={handleRouteRequest}
          handleCollectAll={handleCollectAll}
        />
      )}

      {currentView === 'search' && (
        <SearchView
          expandedSections={expandedSections}
          setExpandedSections={setExpandedSections}
          stats={stats}
          historicalStats={historicalStats}
          enabledTypes={enabledTypes}
          setEnabledTypes={setEnabledTypes}
          visibleEvents={visibleEvents}
          showOptimalRoute={showOptimalRoute}
          setShowOptimalRoute={setShowOptimalRoute}
          handleCollectAll={handleCollectAll}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default Sidebar;
