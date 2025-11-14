import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Timeline from './components/Timeline';
import { useDetections } from './hooks/useDetections';
import './styles/globals.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [showOptimalRoute, setShowOptimalRoute] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    activity: true,
    detections: true,
    events: true
  });

  const {
    visibleEvents,
    latestDetection,
    enabledTypes,
    setEnabledTypes,
    stats,
    historicalStats,
    collectionStats
  } = useDetections();

  const handleCollectAll = () => {
    const count = visibleEvents.filter(e => enabledTypes[e.type]).length;
    alert(`${count}건의 폐어구 수거 작업을 시작합니다.`);
  };

  const handleRouteRequest = () => {
    setShowOptimalRoute(!showOptimalRoute);
    if (!showOptimalRoute) {
      alert('최적 경로를 계산했습니다.');
    }
  };

  const bgClass = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';

  return (
    <div className={`flex h-screen ${bgClass}`}>
      <Sidebar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentView={currentView}
        setCurrentView={setCurrentView}
        latestDetection={latestDetection}
        stats={stats}
        historicalStats={historicalStats}
        collectionStats={collectionStats}
        visibleEvents={visibleEvents}
        enabledTypes={enabledTypes}
        setEnabledTypes={setEnabledTypes}
        showOptimalRoute={showOptimalRoute}
        setShowOptimalRoute={setShowOptimalRoute}
        handleRouteRequest={handleRouteRequest}
        handleCollectAll={handleCollectAll}
        expandedSections={expandedSections}
        setExpandedSections={setExpandedSections}
      />

      <div className="flex-1 relative">
        <Map
          visibleEvents={visibleEvents}
          enabledTypes={enabledTypes}
          showOptimalRoute={showOptimalRoute}
          isDarkMode={isDarkMode}
        />
        <Timeline isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;
