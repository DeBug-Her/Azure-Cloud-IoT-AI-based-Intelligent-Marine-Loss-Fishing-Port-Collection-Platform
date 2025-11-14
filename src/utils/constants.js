// 폐어구 타입 정의
export const DEBRIS_TYPES = ['폐어망', '통발', '부표', '기타'];

// 폐어구 타입별 색상
export const DEBRIS_COLORS = {
  '폐어망': '#ef4444',
  '통발': '#eab308',
  '부표': '#3b82f6',
  '기타': '#9ca3af'
};

// 폐어구 타입별 이미지
export const DEBRIS_IMAGES = {
  '폐어망': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
  '통발': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
  '부표': 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400',
  '기타': 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400'
};

// 해안 지역 좌표 범위
export const COASTAL_REGIONS = [
  { latMin: 35.05, latMax: 35.25, lngMin: 129.10, lngMax: 129.25 },
  { latMin: 35.35, latMax: 35.55, lngMin: 129.30, lngMax: 129.45 },
  { latMin: 35.15, latMax: 35.30, lngMin: 129.20, lngMax: 129.30 },
  { latMin: 35.12, latMax: 35.18, lngMin: 129.12, lngMax: 129.18 }
];

// 카카오맵 기본 설정
export const MAP_DEFAULT_CENTER = {
  lat: 35.20,
  lng: 129.20
};

export const MAP_DEFAULT_LEVEL = 9;
