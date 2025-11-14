# 해양 폐어구 자동 탐지·수거 플랫폼(개념 아키텍처)

## 흐름 요약
1) 소나(음향) 데이터 수집
2) Azure IoT Hub 전송 → Stream Analytics/Functions로 전처리/분기
3) 저장(Blob/ADLS/Database) 및 실시간 채널(Web PubSub/SignalR)
4) Azure Machine Learning(Endpoint)으로 분류/추론
5) 서버리스 웹 대시보드(Static Web Apps)에서 위치/경로/성과 시각화
6) 정책·운영 시스템과 연계, 장비 제어/수거 경로 가이드

## 데이터 모델(예시)
```json
{
  "deviceId": "sonar-sim-001",
  "timestamp": "2025-11-11T12:34:56Z",
  "geo": { "lat": 35.1, "lng": 129.04 },
  "signal": { "freq": 120, "intensity": 0.83, "shape": [/* ... */] },
  "inference": { "class": "net|rope|trap|other", "confidence": 0.92 }
}
```

## 실시간 전달
- WebSocket: Azure Web PubSub 또는 SignalR로 브라우저에 푸시
- 백엔드: Azure Functions가 IoT Hub/Storage/AML과 통신, 토큰/키 보호

## 웹 대시보드
- 지도(Leaflet/Azure Maps): 위치, 클러스터, 히트맵, 관심구역(금지/우선수거)
- 차트(Chart.js): 클래스 분포, 빈도 추이, 성과지표
- 경로 안내: 최근 탐지/밀집도 기반 휴리스틱 → 추후 최적화(해류/항로/준설구역 반영)

## 확장/운영
- 데이터 축적 → 정책 수립, 예방 조치, 자동화된 폐기·재활용 연계
- 모델 재학습 파이프라인(Azure ML Pipelines/PromptFlow)로 지속 개선





