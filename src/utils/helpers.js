import { COASTAL_REGIONS, DEBRIS_TYPES, DEBRIS_IMAGES } from './constants';

/**
 * 해안 지역의 랜덤 좌표 생성
 */
export const generateCoastalCoordinates = () => {
  const region = COASTAL_REGIONS[Math.floor(Math.random() * COASTAL_REGIONS.length)];
  return {
    lat: region.latMin + Math.random() * (region.latMax - region.latMin),
    lng: region.lngMin + Math.random() * (region.lngMax - region.lngMin)
  };
};

/**
 * 폐어구 타입에 해당하는 이미지 URL 반환
 */
export const getDetectionImage = (type) => {
  return DEBRIS_IMAGES[type] || DEBRIS_IMAGES['기타'];
};

/**
 * 랜덤 폐어구 이벤트 생성
 */
export const generateRandomEvent = (id) => {
  const coords = generateCoastalCoordinates();
  const type = DEBRIS_TYPES[Math.floor(Math.random() * DEBRIS_TYPES.length)];

  return {
    id,
    type,
    time: `${(9 + Math.floor(Math.random() * 9)).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    depth: 20 + Math.floor(Math.random() * 60),
    confidence: 75 + Math.floor(Math.random() * 25),
    image: getDetectionImage(type),
    ...coords
  };
};

/**
 * 여러 랜덤 이벤트 생성
 */
export const generateRandomEvents = () => {
  const count = 10 + Math.floor(Math.random() * 10);
  const events = [];

  for (let i = 0; i < count; i++) {
    events.push(generateRandomEvent(Date.now() + i));
  }

  return events;
};

/**
 * 탐지 통계 계산
 */
export const calculateStats = (events, enabledTypes) => {
  const stats = { '폐어망': 0, '통발': 0, '부표': 0, '기타': 0 };

  events.forEach(event => {
    if (enabledTypes[event.type]) {
      stats[event.type]++;
    }
  });

  return stats;
};
