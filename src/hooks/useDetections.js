import { useState, useEffect } from 'react';
import { generateRandomEvents, calculateStats } from '../utils/helpers';

/**
 * 폐어구 탐지 데이터 관리 Hook
 */
export const useDetections = () => {
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [latestDetection, setLatestDetection] = useState(null);
  const [enabledTypes, setEnabledTypes] = useState({
    '폐어망': true,
    '통발': true,
    '부표': true,
    '기타': true
  });
  const [stats, setStats] = useState({ '폐어망': 0, '통발': 0, '부표': 0, '기타': 0 });
  const [historicalStats, setHistoricalStats] = useState([]);
  const [collectionStats, setCollectionStats] = useState([]);

  // 랜덤 이벤트 생성
  useEffect(() => {
    const generateEvents = () => {
      const newEvents = generateRandomEvents();
      setVisibleEvents(newEvents);

      if (newEvents.length > 0) {
        setLatestDetection(newEvents[0]);
      }
    };

    generateEvents();
    const interval = setInterval(generateEvents, 5000);

    return () => clearInterval(interval);
  }, []);

  // 통계 계산
  useEffect(() => {
    const newStats = calculateStats(visibleEvents, enabledTypes);
    setStats(newStats);

    setHistoricalStats(prev => {
      const updated = [...prev, newStats];
      return updated.slice(-10);
    });

    setCollectionStats(prev => {
      const collected = Math.floor(Math.random() * 5);
      const updated = [...prev, collected];
      return updated.slice(-10);
    });
  }, [visibleEvents, enabledTypes]);

  return {
    visibleEvents,
    latestDetection,
    enabledTypes,
    setEnabledTypes,
    stats,
    historicalStats,
    collectionStats
  };
};
