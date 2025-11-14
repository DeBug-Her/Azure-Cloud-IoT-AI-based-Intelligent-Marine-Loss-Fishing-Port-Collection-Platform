// 설정 로딩 (optional): web/config.js 가 있으면 그것을, 없으면 기본값
let APP_CONFIG = { azureMapsKey: "", amlScoringUrl: "", webPubSubUrl: "", iotHubProxyUrl: "" };
try {
	const mod = await import('./config.js');
	APP_CONFIG = { ...APP_CONFIG, ...(mod.default || {}) };
} catch (_e) {
	// config.js가 없어도 데모는 동작
}

// 기본 중심(부산항 근방)
const BASE = { lat: 35.101, lng: 129.036 };
const CLASSES = ["net", "rope", "trap", "other"]; // 그물, 밧줄, 통발, 기타

// 전역 상태
const state = {
	isRunning: false,
	intervalMs: 800,
	timer: null,
	totalCount: 0,
	classCount: { net: 0, rope: 0, trap: 0, other: 0 },
	recent: [], // { ts, cls, conf, lat, lng }
	perMinute: [], // 최근 10분 집계
	map: null,
	markers: [],
	heat: null,
	routeLayer: null
};

// 지도 초기화
function initMap() {
	const map = L.map('map', { zoomControl: true, preferCanvas: true }).setView([BASE.lat, BASE.lng], 12);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; OpenStreetMap contributors'
	}).addTo(map);

	state.map = map;
	state.heat = L.heatLayer([], { radius: 18, blur: 14, maxZoom: 15, gradient: { 0.3: 'blue', 0.65: 'cyan', 1.0: 'lime' } }).addTo(map);
	state.routeLayer = L.layerGroup().addTo(map);
}

// UI 요소
const el = {
	btnStart: document.getElementById('btn-start'),
	btnStop: document.getElementById('btn-stop'),
	btnGenRoute: document.getElementById('btn-generate-route'),
	btnClearRoute: document.getElementById('btn-clear-route'),
	speed: document.getElementById('sim-speed'),
	speedLabel: document.getElementById('sim-speed-label'),
	toggleMarkers: document.getElementById('toggle-markers'),
	toggleHeat: document.getElementById('toggle-heat'),
	kpi: {
		total: document.getElementById('kpi-total'),
		net: document.getElementById('kpi-net'),
		rope: document.getElementById('kpi-rope'),
		trap: document.getElementById('kpi-trap'),
		other: document.getElementById('kpi-other')
	},
	recentTable: document.getElementById('recent-table')
};

// 차트 초기화
let chartClasses, chartRate;
function initCharts() {
	const ctx1 = document.getElementById('chart-classes');
	const ctx2 = document.getElementById('chart-rate');

	chartClasses = new Chart(ctx1, {
		type: 'bar',
		data: {
			labels: ['그물', '밧줄', '통발', '기타'],
			datasets: [{ label: '건수', data: [0,0,0,0], backgroundColor: ['#2cc5ff','#7ad3ff','#8ad8b9','#b7c6d9'] }]
		},
		options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
	});
	chartRate = new Chart(ctx2, {
		type: 'line',
		data: {
			labels: Array.from({ length: 10 }, (_, i) => `${10 - i}m`),
			datasets: [{ label: '분당 탐지', data: Array(10).fill(0), borderColor: '#2cc5ff', backgroundColor: 'rgba(44,197,255,0.2)', tension: 0.3, fill: true }]
		},
		options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
	});
}

// 상태 업데이트 렌더
function renderKPIs() {
	el.kpi.total.textContent = state.totalCount.toString();
	el.kpi.net.textContent = state.classCount.net.toString();
	el.kpi.rope.textContent = state.classCount.rope.toString();
	el.kpi.trap.textContent = state.classCount.trap.toString();
	el.kpi.other.textContent = state.classCount.other.toString();
}
function renderRecent() {
	el.recentTable.innerHTML = state.recent.slice(0, 20).map(r => {
		const t = new Date(r.ts).toLocaleTimeString();
		const label = r.cls === 'net' ? '그물' : r.cls === 'rope' ? '밧줄' : r.cls === 'trap' ? '통발' : '기타';
		return `<tr><td>${t}</td><td>${label}</td><td>${(r.conf*100).toFixed(0)}%</td><td>${r.lat.toFixed(3)}, ${r.lng.toFixed(3)}</td></tr>`;
	}).join('');
}
function renderCharts() {
	chartClasses.data.datasets[0].data = [
		state.classCount.net, state.classCount.rope, state.classCount.trap, state.classCount.other
	];
	chartClasses.update();

	const last10 = state.perMinute.slice(-10);
	const padded = Array(10 - last10.length).fill(0).concat(last10);
	chartRate.data.datasets[0].data = padded;
	chartRate.update();
}

// 지도 렌더
function addMarker(lat, lng, cls) {
	if (!el.toggleMarkers.checked) return;
	const color = cls === 'net' ? '#2cc5ff' : cls === 'rope' ? '#7ad3ff' : cls === 'trap' ? '#8ad8b9' : '#b7c6d9';
	const marker = L.circleMarker([lat, lng], { radius: 6, color, fillColor: color, fillOpacity: 0.8, weight: 1 });
	marker.addTo(state.map);
	state.markers.push(marker);
	if (state.markers.length > 500) {
		const m = state.markers.shift();
		if (m) state.map.removeLayer(m);
	}
}
function addHeat(lat, lng) {
	if (!el.toggleHeat.checked) return;
	const pts = state.heat._latlngs || [];
	pts.push([lat, lng, 0.5 + Math.random() * 0.5]);
	state.heat.setLatLngs(pts.slice(-800));
}

// 경로 스텁: 최근 탐지 상위 K 지점을 이어 선을 그림
function suggestRoute(k = 8) {
	state.routeLayer.clearLayers();
	const pts = state.recent.slice(0, 100).map(r => [r.lat, r.lng]);
	if (pts.length < 2) return;
	// 샘플에서 k개를 균등 추출
	const sampled = [];
	for (let i = 0; i < Math.min(k, pts.length); i++) {
		const idx = Math.floor(i * (pts.length / Math.min(k, pts.length)));
		sampled.push(pts[idx]);
	}
	const line = L.polyline(sampled, { color: '#ffd166', weight: 3, opacity: 0.9 });
	line.addTo(state.routeLayer);
}
function clearRoute() {
	state.routeLayer.clearLayers();
}

// 시뮬레이터
function randomAround(base, maxDelta) {
	return base + (Math.random() - 0.5) * maxDelta;
}
function simulateOne() {
	// 위치: 중심에서 대략 수 km 범위
	const lat = randomAround(BASE.lat, 0.18);
	const lng = randomAround(BASE.lng, 0.18);
	const cls = CLASSES[Math.floor(Math.random() * CLASSES.length)];
	const conf = 0.5 + Math.random() * 0.5;
	const item = { ts: Date.now(), cls, conf, lat, lng };

	// 상태 반영
	state.totalCount += 1;
	state.classCount[cls] += 1;
	state.recent.unshift(item);
	state.recent = state.recent.slice(0, 500);

	addMarker(lat, lng, cls);
	addHeat(lat, lng);
	renderKPIs();
	renderRecent();
	renderCharts();
}
function start() {
	if (state.isRunning) return;
	state.isRunning = true;
	el.btnStart.disabled = true;
	el.btnStop.disabled = false;
	state.timer = setInterval(simulateOne, state.intervalMs);
}
function stop() {
	if (!state.isRunning) return;
	state.isRunning = false;
	el.btnStart.disabled = false;
	el.btnStop.disabled = true;
	clearInterval(state.timer);
	state.timer = null;
}

// 분당 집계 타이머
setInterval(() => {
	// 최근 60초 내 탐지 수
	const cutoff = Date.now() - 60_000;
	const count = state.recent.filter(r => r.ts >= cutoff).length;
	state.perMinute.push(count);
	state.perMinute = state.perMinute.slice(-10);
	renderCharts();
}, 10_000);

// 이벤트 바인딩
el.btnStart.addEventListener('click', start);
el.btnStop.addEventListener('click', stop);
el.speed.addEventListener('input', (e) => {
	const v = Number(e.target.value);
	state.intervalMs = v;
	el.speedLabel.textContent = `${v}ms`;
	if (state.isRunning) {
		stop(); start();
	}
});
el.toggleMarkers.addEventListener('change', () => {
	// 토글 off 시 기존 마커 제거
	if (!el.toggleMarkers.checked) {
		for (const m of state.markers) state.map.removeLayer(m);
		state.markers = [];
	}
});
el.toggleHeat.addEventListener('change', () => {
	if (!el.toggleHeat.checked) state.heat.setLatLngs([]);
});
el.btnGenRoute.addEventListener('click', () => suggestRoute());
el.btnClearRoute.addEventListener('click', () => clearRoute());

// 초기화
initMap();
initCharts();
renderKPIs();
renderRecent();





