const canvas = document.querySelector('#starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let width = 0;
let height = 0;

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  stars = Array.from({ length: Math.floor(width * height / 8500) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.2,
    speed: 0.08 + Math.random() * 0.18,
    alpha: 0.2 + Math.random() * 0.7
  }));
}

function animateStars() {
  ctx.clearRect(0, 0, width, height);
  for (const star of stars) {
    star.y += star.speed;
    if (star.y > height) star.y = 0;
    ctx.beginPath();
    ctx.fillStyle = `rgba(180, 220, 210, ${star.alpha})`;
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(animateStars);
}

resize();
animateStars();
window.addEventListener('resize', resize);

const spectrum = document.querySelector('#spectrum');
const spectrumCtx = spectrum.getContext('2d');
function drawSpectrum() {
  const rect = spectrum.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  spectrum.width = rect.width * ratio;
  spectrum.height = rect.height * ratio;
  spectrumCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
  spectrumCtx.clearRect(0, 0, rect.width, rect.height);
  spectrumCtx.strokeStyle = 'rgba(115, 251, 211, .15)';
  spectrumCtx.lineWidth = 1;
  for (let x = 0; x < rect.width; x += 28) {
    spectrumCtx.beginPath(); spectrumCtx.moveTo(x, 0); spectrumCtx.lineTo(x, rect.height); spectrumCtx.stroke();
  }
  spectrumCtx.beginPath();
  for (let x = 0; x <= rect.width; x++) {
    const y = rect.height * .72
      - Math.sin(x * .035) * 18
      - Math.sin(x * .11) * 7
      - Math.exp(-Math.pow((x - rect.width * .34) / 18, 2)) * 55
      - Math.exp(-Math.pow((x - rect.width * .68) / 12, 2)) * 38;
    if (x === 0) spectrumCtx.moveTo(x, y); else spectrumCtx.lineTo(x, y);
  }
  spectrumCtx.strokeStyle = '#73fbd3';
  spectrumCtx.lineWidth = 1.5;
  spectrumCtx.stroke();
}
requestAnimationFrame(drawSpectrum);
window.addEventListener('resize', drawSpectrum);

const navButtons = document.querySelectorAll('.nav-icon');
const views = document.querySelectorAll('.view');
navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    navButtons.forEach((item) => item.classList.remove('active'));
    views.forEach((view) => view.classList.remove('active'));
    button.classList.add('active');
    document.querySelector(`#${button.dataset.view}`).classList.add('active');
  });
});

function updateClock() {
  document.querySelector('#mission-time').textContent = new Date().toISOString().slice(11, 19);
}
updateClock();
setInterval(updateClock, 1000);

const latency = document.querySelector('#latency');
setInterval(() => {
  latency.textContent = `${14 + Math.floor(Math.random() * 9)}ms`;
}, 2200);

const signalValue = document.querySelector('.signal-value');
setInterval(() => {
  const value = 93.7 + Math.random() * 1.4;
  signalValue.innerHTML = `${value.toFixed(1)} <b>%</b>`;
}, 1800);

const waveform = document.querySelector('#waveform');
for (let i = 0; i < 90; i++) {
  const bar = document.createElement('i');
  bar.style.cssText = `position:absolute;left:${i / 89 * 100}%;bottom:0;width:2px;height:${12 + Math.abs(Math.sin(i * .47)) * 115}px;background:#73fbd3;opacity:${.25 + Math.abs(Math.sin(i * .21)) * .75};transform-origin:bottom;`;
  waveform.appendChild(bar);
}

// Deterministic planetary archive: 2,847 fictional catalog entries.
const planetTypes = ['Terrestrial', 'Oceanic', 'Volcanic', 'Gas Giant', 'Ice Giant', 'Dwarf'];
const sectors = ['Cygnus', 'Lyra', 'Orion', 'Vela', 'Aquila', 'Draco', 'Carina', 'Pavo', 'Centaurus', 'Pegasus'];
const planetNames = [
  'Malevelon Creek', 'Cyberstan', 'Meridia', 'Super Earth', 'Oshaune', 'Tien Kwan',
  'Vernen Wells', 'Mort', 'Clasa', 'Heeth', 'Troost', 'Mantes', 'Ustotu', 'Gaellivare',
  'Draupnir', 'Acamar IV', 'Vandalon IV', 'Widow’s Harbor', 'Fort Union', 'Esmara',
  'Erata Prime', 'Zea Rugosia', 'Aesir Pass', 'Chort Bay', 'Pöpli IX', 'Tarsh',
  'Achernar Secundus', 'Hydrobius', 'Fenrir III', 'Angel’s Venture'
];
const planetPrefixes = [
  'Aegis', 'Nova', 'Iron', 'Valiant', 'Solar', 'Crimson', 'Freedom', 'Storm', 'Azure',
  'Victory', 'Vanguard', 'Liberty', 'Dawn', 'Aurora', 'Helios', 'Titan', 'Ember', 'Orchid',
  'Glacier', 'Raptor', 'Eagle', 'Citadel', 'Meridian', 'Sovereign', 'Promethean', 'Atlas'
];
const planetSuffixes = [
  'Prime', 'I', 'II', 'III', 'IV', 'V', 'VI', 'IX', 'X', 'Minor', 'Major', 'Reach',
  'Frontier', 'Expanse', 'Hold', 'Colony', 'Terminal', 'Bastion', 'Crossing', 'Fortress'
];

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

const random = seededRandom(2847);
const planets = Array.from({ length: 2847 }, (_, index) => {
  const type = planetTypes[Math.floor(random() * planetTypes.length)];
  const sector = sectors[Math.floor(random() * sectors.length)];
  const distance = Math.floor(38 + random() * 12840);
  const gravityBase = type === 'Gas Giant' ? 1.4 : type === 'Ice Giant' ? 0.8 : type === 'Dwarf' ? 0.3 : 0.7;
  const gravity = gravityBase + random() * 1.7;
  const temperatureBase = type === 'Volcanic' ? 280 : type === 'Ice Giant' ? -205 : type === 'Oceanic' ? 12 : type === 'Gas Giant' ? -95 : type === 'Dwarf' ? -120 : 20;
  const temperature = Math.round(temperatureBase + (random() - 0.5) * 180);
  const status = random() > 0.18 ? 'Confirmed' : 'Candidate';

  return {
    id: `NX-${String(index + 1).padStart(4, '0')}`,
    name: index < planetNames.length
      ? planetNames[index]
      : `${planetPrefixes[Math.floor(random() * planetPrefixes.length)]} ${planetSuffixes[Math.floor(random() * planetSuffixes.length)]} ${String(index - planetNames.length + 1).padStart(3, '0')}`,
    type,
    sector,
    distance,
    temperature,
    gravity,
    status
  };
});

const planetList = document.querySelector('#planet-list');
const planetSearch = document.querySelector('#planet-search');
const planetFilter = document.querySelector('#planet-filter');
const planetSort = document.querySelector('#planet-sort');
const planetPageSize = document.querySelector('#planet-page-size');
const planetPage = document.querySelector('#planet-page');
let pageSize = planetPageSize ? Number(planetPageSize.value) : 10;
if (!Number.isFinite(pageSize) || pageSize <= 0) pageSize = 10;
let currentPlanetPage = 0;

const confirmedCount = document.querySelector('#confirmed-count');
const habitableCount = document.querySelector('#habitable-count');
if (confirmedCount) confirmedCount.textContent = planets.filter((planet) => planet.status === 'Confirmed').length.toLocaleString();
if (habitableCount) habitableCount.textContent = planets.filter((planet) => planet.type === 'Terrestrial' || planet.type === 'Oceanic').length.toLocaleString();

let currentSortField = '';
let currentSortDirection = 'asc';

const headerButtons = document.querySelectorAll('[data-sort-field]');
headerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const field = button.dataset.sortField;

    if (field === currentSortField) {
      currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      currentSortField = field;
      currentSortDirection = 'asc';
    }

    const numericFields = ['distance', 'temperature', 'gravity'];
    const sortValue = numericFields.includes(field) || ['name', 'type', 'sector', 'status'].includes(field)
      ? `${field}-${currentSortDirection}`
      : `catalog`;

    planetSort.value = sortValue;
    updateHeaderSortIndicators();
    currentPlanetPage = 0;
    renderPlanets();
  });
});

function getFilteredPlanets() {
  const query = planetSearch.value.trim().toLowerCase();
  const type = planetFilter.value;
  const filtered = planets.filter((planet) => {
    const matchesType = type === 'All' || planet.type === type;
    const matchesSearch = !query
      || planet.id.toLowerCase().includes(query)
      || planet.name.toLowerCase().includes(query)
      || planet.sector.toLowerCase().includes(query);
    return matchesType && matchesSearch;
  });

  const sort = planetSort.value;
  const sorters = {
    'catalog': (a, b) => a.id.localeCompare(b.id),
    'distance-desc': (a, b) => b.distance - a.distance,
    'distance-asc': (a, b) => a.distance - b.distance,
    'temperature-desc': (a, b) => b.temperature - a.temperature,
    'temperature-asc': (a, b) => a.temperature - b.temperature,
    'gravity-desc': (a, b) => b.gravity - a.gravity,
    'gravity-asc': (a, b) => a.gravity - b.gravity,
    'name-asc': (a, b) => a.name.localeCompare(b.name),
    'name-desc': (a, b) => b.name.localeCompare(a.name),
    'type-asc': (a, b) => a.type.localeCompare(b.type),
    'type-desc': (a, b) => b.type.localeCompare(a.type),
    'sector-asc': (a, b) => a.sector.localeCompare(b.sector),
    'sector-desc': (a, b) => b.sector.localeCompare(a.sector),
    'status-asc': (a, b) => a.status.localeCompare(b.status),
    'status-desc': (a, b) => b.status.localeCompare(a.status)
  };

  return filtered.sort(sorters[sort] || sorters.catalog);
}

function renderPlanets() {
  const filtered = getFilteredPlanets();
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  currentPlanetPage = Math.min(currentPlanetPage, pageCount - 1);
  const start = currentPlanetPage * pageSize;
  const pagePlanets = filtered.slice(start, start + pageSize);

  planetList.innerHTML = pagePlanets.map((planet) => `
    <div class="planet-row" role="row">
      <span><strong>${planet.name}</strong> · ${planet.id}</span>
      <span class="class-tag">${planet.type}</span>
      <span>${planet.sector} Sector</span>
      <span>${planet.distance.toLocaleString()} LY</span>
      <span>${planet.temperature > 0 ? '+' : ''}${planet.temperature} °C</span>
      <span>${planet.gravity.toFixed(2)} g</span>
      <span class="${planet.status.toLowerCase()}">${planet.status}</span>
    </div>
  `).join('');

  planetPage.textContent = `${String(currentPlanetPage + 1).padStart(2, '0')} / ${String(pageCount).padStart(3, '0')}`;
  document.querySelector('#planet-count').textContent = filtered.length.toLocaleString();
}

planetSearch.addEventListener('input', () => {
  currentPlanetPage = 0;
  renderPlanets();
});
planetFilter.addEventListener('change', () => {
  currentPlanetPage = 0;
  renderPlanets();
});
planetSort.addEventListener('change', () => {
  currentPlanetPage = 0;
  const [field, direction] = planetSort.value.split('-');
  if (direction === 'asc' || direction === 'desc') {
    currentSortField = field;
    currentSortDirection = direction;
  } else {
    currentSortField = '';
  }
  updateHeaderSortIndicators();
  renderPlanets();
});
document.querySelector('#planet-prev').addEventListener('click', () => {
  if (currentPlanetPage > 0) {
    currentPlanetPage--;
    renderPlanets();
  }
});
document.querySelector('#planet-next').addEventListener('click', () => {
  const pageCount = Math.ceil(getFilteredPlanets().length / pageSize);
  if (currentPlanetPage < pageCount - 1) {
    currentPlanetPage++;
    renderPlanets();
  }
});
planetPageSize?.addEventListener('change', () => {
  pageSize = Number(planetPageSize.value);
  if (!Number.isFinite(pageSize) || pageSize <= 0) pageSize = 10;
  currentPlanetPage = 0;
  renderPlanets();
});

function updateHeaderSortIndicators() {
  headerButtons.forEach((button) => {
    const active = button.dataset.sortField === currentSortField;
    button.classList.toggle('active', active);
    button.querySelector('.sort-indicator').textContent = active
      ? (currentSortDirection === 'asc' ? '▲' : '▼')
      : '';
  });
}

updateHeaderSortIndicators();
renderPlanets();

const telemetryPause = document.querySelector('#telemetry-pause');
const telemetryRefresh = document.querySelector('#telemetry-refresh');
const telemetryDistance = document.querySelector('#telemetry-distance');
const telemetryTemperature = document.querySelector('#telemetry-temperature');
const telemetryPeriod = document.querySelector('#telemetry-period');
const telemetrySignal = document.querySelector('#telemetry-signal');
const orbitalVelocity = document.querySelector('#orbital-velocity');
const orbitalInclination = document.querySelector('#orbital-inclination');
const orbitalPhase = document.querySelector('#orbital-phase');
let telemetryPaused = false;
let telemetryTick = 0;

telemetryPause?.addEventListener('click', () => {
  telemetryPaused = !telemetryPaused;
  telemetryPause.setAttribute('aria-pressed', String(telemetryPaused));
  telemetryPause.textContent = telemetryPaused ? 'Resume' : 'Pause';
});

telemetryRefresh?.addEventListener('click', () => {
  telemetryRefresh.textContent = 'Scanning...';
  telemetryRefresh.disabled = true;
  setTimeout(() => {
    telemetryTick += 7;
    updateTelemetry();
    telemetryRefresh.textContent = 'Scan complete';
    setTimeout(() => {
      telemetryRefresh.textContent = 'Refresh scan';
      telemetryRefresh.disabled = false;
    }, 900);
  }, 650);
});

function updateTelemetry() {
  if (telemetryPaused) return;
  const signal = 93.7 + Math.random() * 1.4;
  const temperature = -42 + Math.floor(Math.random() * 3);
  const velocity = 28.1 + Math.random() * 0.6;
  const inclination = 3.12 + Math.random() * 0.12;
  const phase = (62.7 + telemetryTick * 0.13 + Math.random() * 0.4) % 100;

  if (telemetrySignal) telemetrySignal.textContent = signal.toFixed(1);
  if (telemetryTemperature) telemetryTemperature.textContent = temperature;
  if (telemetryDistance) telemetryDistance.textContent = (1214 + Math.floor(Math.random() * 3)).toLocaleString();
  if (telemetryPeriod) telemetryPeriod.textContent = `${392 + (telemetryTick % 3)}`;
  if (orbitalVelocity) orbitalVelocity.textContent = `${velocity.toFixed(1)} km/s`;
  if (orbitalInclination) orbitalInclination.textContent = `${inclination.toFixed(2)}°`;
  if (orbitalPhase) orbitalPhase.textContent = `${phase.toFixed(1)}%`;
}

setInterval(() => {
  telemetryTick++;
  updateTelemetry();
}, 1800);

const spectrumExpand = document.querySelector('#spectrum-expand');
const spectrumCard = document.querySelector('.spectrum-card');
spectrumExpand?.addEventListener('click', () => {
  const expanded = spectrumCard.classList.toggle('expanded');
  spectrumExpand.textContent = expanded ? '×' : '↗';
  spectrumExpand.setAttribute('aria-label', expanded ? 'Close spectral analysis' : 'Expand spectral analysis');
  setTimeout(drawSpectrum, 50);
});

const classificationRescan = document.querySelector('#classification-rescan');
const classificationTypes = ['TERRESTRIAL', 'OCEANIC', 'VOLCANIC', 'CARBON WORLD'];
classificationRescan?.addEventListener('click', () => {
  const score = 82 + Math.floor(Math.random() * 15);
  const type = classificationTypes[Math.floor(Math.random() * classificationTypes.length)];
  document.querySelector('#classification-score').textContent = score;
  document.querySelector('#classification-type').textContent = type;
  document.querySelector('#classification-detail').textContent = ['Atmosphere detected', 'Water signature detected', 'Thermal anomaly detected', 'Chemical band resolved'][Math.floor(Math.random() * 4)];
});

const feedClear = document.querySelector('#feed-clear');
const discoveryFeed = document.querySelector('#discovery-feed');
const originalFeed = discoveryFeed?.innerHTML;
feedClear?.addEventListener('click', () => {
  if (discoveryFeed.childElementCount) {
    discoveryFeed.innerHTML = '<li><time>NOW</time><p>Discovery feed <b>cleared</b></p></li>';
    feedClear.textContent = '↺';
  } else {
    discoveryFeed.innerHTML = originalFeed;
    feedClear.textContent = '•••';
  }
});

const planetStage = document.querySelector('.planet-stage');
const telemetryTitle = document.querySelector('.hero-content h1');
const planetTargets = [
  ['EXO', 'PLANET', 'CYGNUS'],
  ['TWIN', 'WORLD', 'KEPLER'],
  ['RED', 'GIANT', 'AQUILA']
];
let targetIndex = 0;
planetStage?.addEventListener('click', () => {
  targetIndex = (targetIndex + 1) % planetTargets.length;
  const [first, middle, last] = planetTargets[targetIndex];
  telemetryTitle.innerHTML = `${first}<br><em>${middle}</em><br>${last}`;
  telemetryTick = 0;
  updateTelemetry();
});

const signalToggle = document.querySelector('#signal-toggle');
const carrierLock = document.querySelector('#carrier-lock');
const carrierFrequency = document.querySelector('#carrier-frequency');
const signalRx = document.querySelector('#signal-rx');
const signalRange = document.querySelector('#signal-range');
const signalNoise = document.querySelector('#signal-noise');
let signalActive = false;
let signalTimer;

signalToggle?.addEventListener('click', () => {
  signalActive = !signalActive;
  signalToggle.setAttribute('aria-pressed', String(signalActive));
  signalToggle.textContent = signalActive ? 'Stop sweep' : 'Begin sweep';

  clearInterval(signalTimer);
  if (!signalActive) {
    carrierLock.textContent = '—';
    signalRx.textContent = 'Standby';
    return;
  }

  signalRx.textContent = 'Scanning';
  signalTimer = setInterval(() => {
    const locked = Math.random() > 0.68;
    carrierLock.textContent = locked ? 'ACQUIRED' : 'SEARCHING';
    carrierFrequency.textContent = `${(1418 + Math.random() * 5).toFixed(3)} MHz`;
    signalRange.textContent = `${(8.4 + Math.random() * 9).toFixed(1)} AU`;
    signalNoise.textContent = `${-76 + Math.floor(Math.random() * 12)} dBm`;
  }, 900);
});

const systemsRun = document.querySelector('#systems-run');
const systemsPanel = document.querySelector('.systems-panel');
const diagnosticList = document.querySelector('#diagnostic-list');
systemsRun?.addEventListener('click', () => {
  systemsRun.disabled = true;
  systemsRun.textContent = 'Running...';
  systemsPanel.classList.add('diagnostic-running');

  const checks = ['Propulsion bus synchronized', 'Life-support scrubbers verified', 'Shield harmonics calibrated'];
  let checkIndex = 0;

  const checkTimer = setInterval(() => {
    if (checkIndex >= checks.length) {
      clearInterval(checkTimer);
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      systemsPanel.classList.remove('diagnostic-running');
      const item = document.createElement('li');
      item.innerHTML = `<span>${time}</span> Full vessel diagnostic complete`;
      diagnosticList.prepend(item);
      systemsRun.textContent = 'Diagnostic complete';
      setTimeout(() => {
        systemsRun.textContent = 'Run diagnostics';
        systemsRun.disabled = false;
      }, 1000);
      return;
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const item = document.createElement('li');
    item.innerHTML = `<span>${time}</span> ${checks[checkIndex]}`;
    diagnosticList.prepend(item);
    checkIndex++;
  }, 650);
});

const powerInputs = {
  propulsion: document.querySelector('#power-propulsion'),
  life: document.querySelector('#power-life'),
  shield: document.querySelector('#power-shield')
};

function updatePowerAllocation(changedKey) {
  const values = Object.fromEntries(Object.entries(powerInputs).map(([key, input]) => [key, Number(input.value)]));
  document.querySelector(`#power-${changedKey}-value`).textContent = `${values[changedKey]}%`;

  const total = values.propulsion + values.life + values.shield;
  const powerStatus = document.querySelector('#power-status');
  powerStatus.textContent = total === 100 ? 'STABLE' : total < 100 ? 'RESERVE' : 'OVERLOAD';
  powerStatus.style.color = total === 100 ? 'var(--cyan)' : 'var(--orange)';

  document.querySelector('#propulsion-score').textContent = Math.round(60 + values.propulsion * .9);
  document.querySelector('#life-score').textContent = Math.round(68 + values.life);
  document.querySelector('#shield-score').textContent = Math.round(61 + values.shield * 1.2);

  document.querySelector('#propulsion-readout').textContent = `Core output ${values.propulsion}%`;
  document.querySelector('#life-readout').textContent = `O₂ reserve ${values.life}%`;
  document.querySelector('#shield-readout').textContent = `Field integrity ${values.shield}%`;

  document.querySelector('[data-system="propulsion"]').classList.toggle('warning', total > 100 || values.propulsion < 20);
  document.querySelector('[data-system="life"]').classList.toggle('warning', total > 100 || values.life < 20);
  document.querySelector('[data-system="shield"]').classList.toggle('warning', total > 100 || values.shield < 20);
}

Object.entries(powerInputs).forEach(([key, input]) => {
  input?.addEventListener('input', () => updatePowerAllocation(key));
  if (input) {
    document.querySelector(`#power-${key}-value`).textContent = `${input.value}%`;
  }
});

const mapNodes = document.querySelectorAll('.sector-node');
const mapSelection = document.querySelector('#map-selection');
const deployButton = document.querySelector('#deploy-button');
let selectedWorld = null;

mapNodes.forEach((node) => {
  node.addEventListener('click', () => {
    mapNodes.forEach((item) => item.classList.remove('selected'));
    node.classList.add('selected');
    selectedWorld = node.dataset;

    mapSelection.innerHTML = `<small>Selected world</small><strong>${selectedWorld.name}</strong><span>${selectedWorld.sector} · ${selectedWorld.status}</span><span>Threat level — ${selectedWorld.difficulty}</span>`;
    deployButton.disabled = false;
    deployButton.textContent = `Deploy to ${selectedWorld.name}`;
  });
});

deployButton?.addEventListener('click', () => {
  if (!selectedWorld) return;
  deployButton.disabled = true;
  deployButton.textContent = 'Preparing drop...';
  setTimeout(() => {
    deployButton.textContent = 'Deployment authorized';
    setTimeout(() => {
      deployButton.textContent = `Deploy to ${selectedWorld.name}`;
      deployButton.disabled = false;
    }, 1500);
  }, 900);
});

const privacyOpen = document.querySelector('#privacy-open');
const privacyDialog = document.querySelector('#privacy-dialog');
const privacyClose = document.querySelector('#privacy-close');

privacyOpen?.addEventListener('click', () => privacyDialog.showModal());
privacyClose?.addEventListener('click', () => privacyDialog.close());
privacyDialog?.addEventListener('click', (event) => {
  if (event.target === privacyDialog) privacyDialog.close();
});

// Static fictional data: never persist personal or tracking information.
console.info('NEXUS uses local fictional data only. No cookies or external analytics are used.');

const galaxyMap = document.querySelector('#galaxy-map');
const mapZoomIn = document.querySelector('#map-zoom-in');
const mapZoomOut = document.querySelector('#map-zoom-out');
const mapZoomReset = document.querySelector('#map-zoom-reset');
const mapSvg = galaxyMap?.querySelector('.sector-lines');
let mapScale = 1;

function applyMapZoom() {
  if (mapSvg) {
    mapSvg.style.transform = `scale(${mapScale})`;
    mapSvg.style.transformOrigin = '50% 50%';
  }

  mapNodes.forEach((node) => {
    node.style.setProperty('--node-scale', mapScale);
  });
}

mapZoomIn?.addEventListener('click', () => {
  mapScale = Math.min(1.6, mapScale + 0.2);
  applyMapZoom();
});
mapZoomOut?.addEventListener('click', () => {
  mapScale = Math.max(0.8, mapScale - 0.2);
  applyMapZoom();
});
mapZoomReset?.addEventListener('click', () => {
  mapScale = 1;
  applyMapZoom();
});
