# 해양 폐어구 모니터링 시스템 (React)

Azure Cloud IoT AI 기반 지능형 해양 폐어구 수거 플랫폼

## 프로젝트 구조

```
├── public/
│   └── index.html              # React 앱 엔트리 포인트
├── src/
│   ├── components/             # React 컴포넌트
│   │   ├── charts/            # 차트 컴포넌트
│   │   │   ├── BarChart.jsx   # 막대 차트
│   │   │   ├── LineChart.jsx  # 라인 차트
│   │   │   └── CollectionChart.jsx  # 수거 현황 차트
│   │   ├── views/             # 뷰 컴포넌트
│   │   │   ├── HomeView.jsx   # 홈 화면
│   │   │   └── SearchView.jsx # 검색 화면
│   │   ├── Header.jsx         # 헤더 컴포넌트
│   │   ├── Sidebar.jsx        # 사이드바 컴포넌트
│   │   ├── Map.jsx            # 카카오 맵 컴포넌트
│   │   ├── Timeline.jsx       # 타임라인 컴포넌트
│   │   └── LatestDetection.jsx # 최신 탐지 카드
│   ├── hooks/                 # 커스텀 훅
│   │   ├── useKakaoMap.js     # 카카오 맵 훅
│   │   └── useDetections.js   # 폐어구 탐지 데이터 훅
│   ├── utils/                 # 유틸리티 함수
│   │   ├── constants.js       # 상수 정의
│   │   └── helpers.js         # 헬퍼 함수
│   ├── styles/                # 스타일 파일
│   │   └── globals.css        # 전역 스타일
│   ├── App.jsx                # 메인 앱 컴포넌트
│   └── index.js               # React 엔트리 포인트
├── web/
│   └── index.html.backup      # 기존 HTML 파일 (백업)
├── package.json               # 프로젝트 의존성
├── .env.example               # 환경 변수 예제
└── README_REACT.md            # 프로젝트 문서

```

## 주요 기능

### 1. 컴포넌트 구조

- **Header**: 로고, 다크모드 토글, 홈/검색 버튼
- **Sidebar**: 사이드바 메인 컨테이너
- **HomeView**: 최신 탐지, 통계, 차트, 액션 버튼
- **SearchView**: 활동, 탐지 유형 필터, 이벤트 목록
- **Map**: 카카오맵, 마커 표시, 최적 경로
- **Timeline**: 타임라인 컨트롤, 재생/일시정지
- **LatestDetection**: 최신 탐지된 폐어구 카드
- **Charts**: 막대 차트, 라인 차트, 수거 현황 차트

### 2. 커스텀 훅

- **useKakaoMap**: 카카오 맵 SDK 로드 및 초기화
- **useDetections**: 폐어구 탐지 데이터 관리 및 통계 계산

### 3. 유틸리티

- **constants.js**: 폐어구 타입, 색상, 이미지, 지역 좌표 등
- **helpers.js**: 랜덤 좌표 생성, 이벤트 생성, 통계 계산

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 카카오 API 키를 설정하세요:

```bash
cp .env.example .env
```

`.env` 파일 수정:

```
REACT_APP_KAKAO_API_KEY=your_kakao_api_key_here
```

### 3. 개발 서버 실행

```bash
npm start
```

브라우저에서 `http://localhost:3000` 접속

### 4. 프로덕션 빌드

```bash
npm run build
```

## 기술 스택

- **React 18**: 최신 React 버전
- **Chart.js**: 데이터 시각화
- **Kakao Maps API**: 지도 표시
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **Create React App**: React 프로젝트 기반 구조

## 주요 개선 사항

1. **모듈화**: 기능별로 컴포넌트 분리
2. **재사용성**: 커스텀 훅을 통한 로직 재사용
3. **유지보수성**: 명확한 폴더 구조와 파일 명명 규칙
4. **확장성**: 새로운 기능 추가가 용이한 구조
5. **타입 안정성**: Props를 통한 명확한 데이터 흐름

## 원본 파일

기존 HTML 파일은 `web/index.html.backup`에 백업되어 있습니다.

## 라이선스

MIT License
