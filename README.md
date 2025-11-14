# Azure-Cloud-IoT-AI-based-Intelligent-Marine-Loss-Fishing-Port-Collection-Platform

Azure 기반 IoT + AI를 활용한 폐어구(해양쓰레기) 자동 탐지·수거 데모 웹.

## 빠른 시작(로컬)

1) 웹 폴더 열기  
`web/index.html` 파일을 브라우저로 직접 열어도 동작합니다.  
또는 간단 서버로 실행:

```bash
npx serve web -l 5173
```

2) 기본 기능  
- 시뮬레이션된 소나(음향) 텔레메트리 생성
- 지도(Leaflet) 시각화: 위치 마커, 히트맵
- 차트(Chart.js): 클래스 분포, 탐지 빈도
- 테이블: 최근 탐지 내역

3) 구성 변경  
`web/config.example.js`를 참고해 `web/config.js`를 생성하여 Azure 키/엔드포인트를 설정할 수 있습니다. (로컬 데모는 설정 없이도 동작)

## 아키텍처(개념)

문서: `docs/architecture.md`
- 시뮬레이션 데이터 → Azure IoT Hub → Stream Analytics → 저장/전달
- Azure Machine Learning 모델 추론(분류)
- 웹 대시보드(서버리스)에서 위치/경로/성과 실시간 시각화
- 필요 시 Azure Web PubSub/SignalR로 실시간 업데이트

## 배포(Azure Static Web Apps)

1) GitHub 리포지토리로 푸시  
2) Azure Portal → Static Web Apps → Create  
   - Build Presets: Custom  
   - App location: `web`  
   - Build location: (비워둠)  
   - Output location: (비워둠)  
3) 배포 후 `web/config.js`에 운영 키/엔드포인트 설정(필요 시)

## 추후 연동(실데이터)

- Azure Functions(API)로 IoT Hub/Storage/AML 엔드포인트 프록시
- Azure Web PubSub/SignalR로 실시간 WebSocket 전송
- Azure Maps 또는 Leaflet + 타일로 지도 고도화(경로 안내, 영역 분석)
