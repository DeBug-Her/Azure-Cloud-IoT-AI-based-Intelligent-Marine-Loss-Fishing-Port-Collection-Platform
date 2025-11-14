import { useState, useEffect } from 'react';
import { MAP_DEFAULT_CENTER, MAP_DEFAULT_LEVEL } from '../utils/constants';

/**
 * 카카오 맵 초기화 및 관리 Hook
 */
export const useKakaoMap = (mapRef) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

    if (!KAKAO_API_KEY) {
      console.error("KAKAO_API_KEY가 설정되지 않았습니다. .env 파일에 REACT_APP_KAKAO_API_KEY를 추가해주세요.");
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("Kakao Maps SDK 로드 실패");
        return;
      }

      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const kakaoMap = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(
            MAP_DEFAULT_CENTER.lat,
            MAP_DEFAULT_CENTER.lng
          ),
          level: MAP_DEFAULT_LEVEL
        });

        setMap(kakaoMap);
      });
    };

    return () => {
      // Cleanup은 선택사항
    };
  }, [mapRef]);

  return map;
};
