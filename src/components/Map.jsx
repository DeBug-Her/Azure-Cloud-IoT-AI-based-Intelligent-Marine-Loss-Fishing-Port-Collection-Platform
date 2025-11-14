import React, { useRef, useEffect, useState } from 'react';
import { useKakaoMap } from '../hooks/useKakaoMap';
import { DEBRIS_COLORS } from '../utils/constants';

const Map = ({ visibleEvents, enabledTypes, showOptimalRoute, isDarkMode }) => {
  const mapRef = useRef(null);
  const map = useKakaoMap(mapRef);
  const [overlays, setOverlays] = useState([]);
  const [routePolyline, setRoutePolyline] = useState(null);

  // 마커 표시
  useEffect(() => {
    if (!map || !window.kakao) return;

    // 기존 오버레이 제거
    overlays.forEach(({ overlay }) => overlay.setMap(null));

    const created = [];

    visibleEvents.forEach(event => {
      if (!enabledTypes[event.type]) return;

      const pos = new window.kakao.maps.LatLng(event.lat, event.lng);
      const color = DEBRIS_COLORS[event.type];

      const div = document.createElement('div');
      div.style.cssText = `width:18px;height:18px;background:${color};border:3px solid white;border-radius:50%;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:all 0.3s;cursor:pointer;`;

      const overlay = new window.kakao.maps.CustomOverlay({
        position: pos,
        content: div,
        yAnchor: 0.5
      });
      overlay.setMap(map);
      created.push({ overlay, event });

      div.addEventListener('mouseover', () => {
        div.style.transform = 'scale(1.4)';
        div.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
      });
      div.addEventListener('mouseout', () => {
        div.style.transform = 'scale(1)';
        div.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
      });
    });

    setOverlays(created);
  }, [map, visibleEvents, enabledTypes]);

  // 최적 경로 표시
  useEffect(() => {
    if (!map || !window.kakao) return;

    if (!showOptimalRoute) {
      if (routePolyline) {
        routePolyline.setMap(null);
        setRoutePolyline(null);
      }
      return;
    }

    const activeEvents = visibleEvents.filter(e => enabledTypes[e.type]);
    if (activeEvents.length < 2) return;

    const sorted = [...activeEvents].sort((a, b) => (a.lat + a.lng) - (b.lat + b.lng));
    const path = sorted.map(e => new window.kakao.maps.LatLng(e.lat, e.lng));

    if (routePolyline) routePolyline.setMap(null);

    const polyline = new window.kakao.maps.Polyline({
      path: path,
      strokeWeight: 4,
      strokeColor: '#3b82f6',
      strokeOpacity: 0.8,
      strokeStyle: 'solid'
    });

    polyline.setMap(map);
    setRoutePolyline(polyline);
  }, [map, showOptimalRoute, visibleEvents, enabledTypes]);

  return (
    <>
      <div ref={mapRef} className="w-full h-full" />

      {/* 지도 컨트롤 */}
      <div className="absolute top-6 right-6 space-y-3" style={{ zIndex: 100 }}>
        <button
          onClick={() => map && map.setLevel(map.getLevel() - 1)}
          className={`w-12 h-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-110`}
        >
          <span className="text-2xl font-bold">+</span>
        </button>
        <button
          onClick={() => map && map.setLevel(map.getLevel() + 1)}
          className={`w-12 h-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-110`}
        >
          <span className="text-2xl font-bold">−</span>
        </button>
      </div>
    </>
  );
};

export default Map;
