// Corona Rodante — juego de plataformas 3D con bola para el navegador del móvil
import * as THREE from 'three';
import { Ball, stepBall } from './physics.js?v=44';
import { Level } from './world.js?v=44';
import { LEVELS, WORLDS } from './levels.js?v=44';
import { Input } from './input.js?v=44';
import { Sfx } from './audio.js?v=44';
import { SKINS, skinMaterial, skinPreview } from './skins.js?v=44';
import { localDateStr, dailySpec, applyDailyWin } from './daily.js?v=44';
import { ACHIEVEMENTS, evaluateAchievements, achievementById } from './achievements.js?v=44';

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
const IS_TOUCH = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

// ---------------- Guardado ----------------
const SAVE_KEY = 'coronaRodante.v1';
const defSave = () => ({ coins: 0, skins: ['piedra'], skin: 'piedra', levels: {}, portraitOk: false, muted: false, tutorialSeen: false,
  opts: { music: true, sfx: true, shadows: true },
  daily: { streak: 0, bestStreak: 0, lastWon: '', best: {}, claimed: '' },
  achievements: { unlocked: {} },
  stats: { earnedCoins: 0, noDeathWins: 0 },
});
function loadSave() {
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (s && typeof s === 'object') {
      const d = defSave();
      return {
        ...d, ...s,
        opts: { ...d.opts, ...(s.opts || {}) },
        daily: { ...d.daily, ...(s.daily || {}) },
        achievements: { unlocked: { ...(s.achievements && s.achievements.unlocked) } },
        stats: { ...d.stats, ...(s.stats || {}) },
      };
    }
  } catch (e) { /* sin guardado */ }
  return defSave();
}
let save = loadSave();
function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* almacenamiento lleno o bloqueado */ } }
if (params.has('unlock')) for (let i = 0; i < LEVELS.length; i++) save.levels[i] = save.levels[i] || { done: true, stars: [true, false, false], best: 999 };
// Retrocompat: estimar monedas ganadas si no hay stats
if (!save.stats.earnedCoins) {
  let est = save.coins || 0;
  for (const id of save.skins || []) {
    const sk = SKINS.find((s) => s.id === id);
    if (sk && sk.price) est += sk.price;
  }
  save.stats.earnedCoins = est;
}

// ---------------- Render ----------------
const canvas = $('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
renderer.setPixelRatio(pixelRatio);
renderer.shadowMap.enabled = save.opts.shadows;
renderer.shadowMap.type = THREE.PCFShadowMap;
const scene = new THREE.Scene();
const FOG = 0xd4f0ff;
scene.fog = new THREE.Fog(FOG, 38, 120);
scene.background = new THREE.Color(FOG);
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 400);

// Cielo con degradado
{
  const geo = new THREE.SphereGeometry(300, 24, 16);
  const cols = []; const p = geo.attributes.position;
  const top = new THREE.Color(0x2fa8ff), mid = new THREE.Color(0x9fdcff), hor = new THREE.Color(0xe4f6ff), bot = new THREE.Color(0xffe7c4);
  const c = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i) / 300;
    if (y > 0.35) c.copy(mid).lerp(top, (y - 0.35) / 0.65); else if (y > 0) c.copy(hor).lerp(mid, y / 0.35); else c.copy(hor).lerp(bot, Math.min(1, -y * 2.5));
    cols.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  var sky = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false }));
  sky.renderOrder = -1; scene.add(sky);
  // sol
  const sc = document.createElement('canvas'); sc.width = sc.height = 128; const x = sc.getContext('2d');
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,255,240,1)'); g.addColorStop(0.25, 'rgba(255,250,200,0.9)'); g.addColorStop(1, 'rgba(255,240,180,0)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  var sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(sc), fog: false, depthWrite: false, transparent: true }));
  sun.scale.set(70, 70, 1); scene.add(sun);
}
const hemi = new THREE.HemisphereLight(0xeaf7ff, 0xffd9a0, 1.9); scene.add(hemi);
const sunLight = new THREE.DirectionalLight(0xfff4e0, 2.1);
sunLight.castShadow = true; sunLight.shadow.mapSize.set(1024, 1024);
Object.assign(sunLight.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 60 });
sunLight.shadow.bias = -0.0006; sunLight.shadow.normalBias = 0.03;
scene.add(sunLight); scene.add(sunLight.target);

const THEMES = {
  sky: {
    fog: 0xd4f0ff, hemiSky: 0xeaf7ff, hemiGround: 0xffd9a0, hemiI: 1.9,
    sun: 0xfff4e0, sunI: 2.1, skyTop: 0x2fa8ff, skyMid: 0x9fdcff, skyHor: 0xe4f6ff, skyBot: 0xffe7c4,
  },
  lava: {
    fog: 0x4a2010, hemiSky: 0xffb080, hemiGround: 0x3a1810, hemiI: 1.55,
    sun: 0xffc090, sunI: 1.85, skyTop: 0x1a0a08, skyMid: 0x5a2010, skyHor: 0xc45018, skyBot: 0xff6a20,
  },
  ice: {
    fog: 0x2e6a9e, hemiSky: 0x7aa8c8, hemiGround: 0x4a7898, hemiI: 1.25,
    sun: 0xffe0c8, sunI: 1.45, skyTop: 0x0a3a78, skyMid: 0x1e68a8, skyHor: 0x4a90c8, skyBot: 0x7ab0d0,
    fogNear: 22, fogFar: 85,
  },
  jungle: {
    fog: 0x6ab878, hemiSky: 0xb8e8a0, hemiGround: 0x4a7840, hemiI: 1.5,
    sun: 0xfff0c8, sunI: 1.7, skyTop: 0x3a8a50, skyMid: 0x7cbc68, skyHor: 0xb8d890, skyBot: 0xd8e8a8,
    fogNear: 30, fogFar: 110,
  },
  desert: {
    fog: 0x3a78b8, hemiSky: 0x98c8f0, hemiGround: 0x6a4820, hemiI: 1.35,
    sun: 0xffe8c0, sunI: 1.65, skyTop: 0x0a4aa0, skyMid: 0x2a78d0, skyHor: 0x68a8e0, skyBot: 0xa88850,
    fogNear: 45, fogFar: 140,
  },
  candy: {
    fog: 0xf0a0c8, hemiSky: 0xffd0e8, hemiGround: 0xc06890, hemiI: 1.55,
    sun: 0xfff0d8, sunI: 1.7, skyTop: 0xd060a0, skyMid: 0xf090c0, skyHor: 0xffc0e0, skyBot: 0xffe8f0,
    fogNear: 35, fogFar: 120,
  },
  reef: {
    fog: 0x1a7898, hemiSky: 0x60d0e8, hemiGround: 0x0a4860, hemiI: 1.4,
    sun: 0xc8f0ff, sunI: 1.55, skyTop: 0x045878, skyMid: 0x0a88a8, skyHor: 0x40c0d8, skyBot: 0x88e0f0,
    fogNear: 28, fogFar: 100,
  },
  castle: {
    fog: 0xd0b0f0, hemiSky: 0xffe8ff, hemiGround: 0xa080c0, hemiI: 1.55,
    sun: 0xfff0d0, sunI: 1.7, skyTop: 0x9060c8, skyMid: 0xc090e8, skyHor: 0xe8c0ff, skyBot: 0xffe8f8,
    fogNear: 35, fogFar: 120,
  },
  neon: {
    fog: 0x102048, hemiSky: 0x40c0ff, hemiGround: 0x081028, hemiI: 1.35,
    sun: 0xa0e8ff, sunI: 1.5, skyTop: 0x061030, skyMid: 0x0a2860, skyHor: 0x184898, skyBot: 0x2060a8,
    fogNear: 30, fogFar: 110,
  },
  space: {
    fog: 0x1a1048, hemiSky: 0xc0a0ff, hemiGround: 0x201040, hemiI: 1.4,
    sun: 0xffe8c0, sunI: 1.55, skyTop: 0x080828, skyMid: 0x281868, skyHor: 0x6030a0, skyBot: 0xa050c8,
    fogNear: 35, fogFar: 130,
  },
};
let currentTheme = 'sky';
function rebuildSky(th) {
  const t = THEMES[th] || THEMES.sky;
  const geo = sky.geometry; const cols = geo.attributes.color;
  const top = new THREE.Color(t.skyTop), mid = new THREE.Color(t.skyMid), hor = new THREE.Color(t.skyHor), bot = new THREE.Color(t.skyBot);
  const c = new THREE.Color(); const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / 300;
    if (y > 0.35) c.copy(mid).lerp(top, (y - 0.35) / 0.65); else if (y > 0) c.copy(hor).lerp(mid, y / 0.35); else c.copy(hor).lerp(bot, Math.min(1, -y * 2.5));
    cols.setXYZ(i, c.r, c.g, c.b);
  }
  cols.needsUpdate = true;
}
function applyTheme(th) {
  currentTheme = th;
  const t = THEMES[th] || THEMES.sky;
  scene.fog.color.set(t.fog); scene.background.set(t.fog);
  scene.fog.near = t.fogNear || 38; scene.fog.far = t.fogFar || 120;
  hemi.color.set(t.hemiSky); hemi.groundColor.set(t.hemiGround); hemi.intensity = t.hemiI;
  sunLight.color.set(t.sun); sunLight.intensity = t.sunI;
  rebuildSky(th);
  document.body.classList.toggle('theme-lava', th === 'lava');
  document.body.classList.toggle('theme-ice', th === 'ice');
  document.body.classList.toggle('theme-jungle', th === 'jungle');
  document.body.classList.toggle('theme-desert', th === 'desert');
  document.body.classList.toggle('theme-candy', th === 'candy');
  document.body.classList.toggle('theme-reef', th === 'reef');
  document.body.classList.toggle('theme-castle', th === 'castle');
  document.body.classList.toggle('theme-neon', th === 'neon');
  document.body.classList.toggle('theme-space', th === 'space');
}

// ---------------- Bola ----------------
const ball = new Ball();
const ballMesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 28, 18), skinMaterial(save.skin));
ballMesh.castShadow = true; scene.add(ballMesh);
function setSkin(id) { const old = ballMesh.material; ballMesh.material = skinMaterial(id); if (old.map) old.map.dispose(); old.dispose(); }

// ---------------- Partículas (una draw call) ----------------
class Particles {
  constructor(n = 320) {
    this.n = n; this.mesh = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.13, 0), new THREE.MeshBasicMaterial({ color: 0xffffff }), n);
    this.mesh.frustumCulled = false; this.p = [];
    const c = new THREE.Color(1, 1, 1); const m = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < n; i++) { this.p.push({ life: 0, max: 1, pos: new THREE.Vector3(), vel: new THREE.Vector3(), g: 10, s: 1, spin: 0 }); this.mesh.setMatrixAt(i, m); this.mesh.setColorAt(i, c); }
    this.i = 0; scene.add(this.mesh); this._m = new THREE.Matrix4(); this._q = new THREE.Quaternion(); this._s = new THREE.Vector3(); this._c = new THREE.Color(); this._e = new THREE.Euler();
  }
  burst(pos, count, color, o = {}) {
    const colors = Array.isArray(color) ? color : [color];
    for (let k = 0; k < count; k++) {
      const p = this.p[this.i]; this.i = (this.i + 1) % this.n;
      const a = Math.random() * Math.PI * 2, sp = (o.speed || 4) * (0.4 + Math.random() * 0.8);
      p.pos.copy(pos); if (o.spread) p.pos.add(new THREE.Vector3((Math.random() - 0.5) * o.spread, 0, (Math.random() - 0.5) * o.spread));
      p.vel.set(Math.cos(a) * sp, (o.up || 3) * (0.5 + Math.random()), Math.sin(a) * sp);
      p.life = p.max = (o.life || 0.7) * (0.6 + Math.random() * 0.6); p.g = o.g === undefined ? 12 : o.g; p.s = (o.size || 1) * (0.6 + Math.random() * 0.8); p.spin = Math.random() * 10;
      this.mesh.setColorAt((this.i + this.n - 1) % this.n, this._c.set(colors[k % colors.length]));
    }
    this.mesh.instanceColor.needsUpdate = true;
  }
  update(dt) {
    for (let i = 0; i < this.n; i++) {
      const p = this.p[i]; if (p.life <= 0) continue;
      p.life -= dt; p.vel.y -= p.g * dt; p.pos.addScaledVector(p.vel, dt); p.spin += dt * 6;
      const s = p.life > 0 ? p.s * Math.min(1, p.life / p.max * 2) : 0;
      this._m.compose(p.pos, this._q.setFromEuler(this._e.set(p.spin, p.spin * 0.7, 0)), this._s.set(s, s, s));
      this.mesh.setMatrixAt(i, this._m);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}
const fx = new Particles();

// ---------------- Sistemas ----------------
const input = new Input();
const sfx = new Sfx(); sfx.music = save.opts.music && !save.muted; sfx.sfx = save.opts.sfx && !save.muted;

const G = {
  state: 'title', level: null, levelIndex: 0, checkpoint: new THREE.Vector3(), coins: 0, time: 0, timerOn: false,
  deaths: 0, dead: false, deadT: 0, deadKind: '', winT: 0, shake: 0, lastGroundY: 0, cool: {}, t: 0, returnTo: 'title',
  dailyMode: false, dailySpec: null,
  camPos: new THREE.Vector3(0, 6, 10), camLook: new THREE.Vector3(), followY: 0, bot: null, hintT: 0, hintShowing: false, selectedWorld: 0,
};
const DT = 1 / 120;

// ---------------- UI ----------------
const screens = ['scr-title', 'scr-levels', 'scr-shop', 'scr-options', 'scr-pause', 'scr-win', 'scr-ending', 'scr-daily', 'scr-achievements'];
function showScreen(id) {
  for (const s of screens) $(s).classList.toggle('hidden', s !== id);
  if (id === 'scr-levels') renderLevels();
  if (id === 'scr-shop') renderShop();
  if (id === 'scr-options') renderOptions();
  if (id === 'scr-daily') renderDaily();
  if (id === 'scr-achievements') renderAchievements();
  updateWallet();
}
function updateWallet() { document.querySelectorAll('.wallet-n').forEach(e => e.textContent = save.coins); }
let toastTimer = 0;
function toast(text, secs = 2.2) { const t = $('toast'); t.textContent = text; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), secs * 1000); }
function flash(op = 0.6) { const f = $('flash'); f.style.transition = 'none'; f.style.opacity = op; requestAnimationFrame(() => { f.style.transition = 'opacity .45s'; f.style.opacity = 0; }); }
function setPlayingUI(on) {
  document.body.classList.toggle('playing', on);
  document.body.classList.toggle('joy', on);
  $('hud').classList.toggle('hidden', !on);
  input.enabled = on;
  if (!on) input.resetTouch();
}

function showTutorial(on) {
  const el = $('tutorial');
  if (!el) return;
  el.classList.toggle('hidden', !on);
  G.hintShowing = !!on;
}
function maybeShowTutorial() {
  if (save.tutorialSeen) { showTutorial(false); return; }
  showTutorial(true);
}
function dismissTutorial() {
  if (!G.hintShowing) return;
  showTutorial(false);
  save.tutorialSeen = true;
  persist();
}
function fmtTime(t) { const m = Math.floor(t / 60), s = Math.floor(t % 60); return `${m}:${String(s).padStart(2, '0')}`; }
function updateHUD() {
  if (!G.level) return;
  $('hud-coins').textContent = `${G.coins}/${G.level.coins.length}`;
  $('hud-time').textContent = fmtTime(G.time);
  $('btn-mute').textContent = save.muted ? '🔇' : '🔊';
}

function worldUnlocked(wi) {
  const w = WORLDS[wi];
  if (!w) return false;
  if (wi === 0) return true;
  const need = w.unlockIndex != null ? w.unlockIndex : (wi * 8 - 1);
  return !!(save.levels[need] && save.levels[need].done);
}
function globalIndex(wi, li) {
  let g = 0; for (let k = 0; k < wi; k++) g += WORLDS[k].levels.length; return g + li;
}
function worldStarCount(wi) {
  let got = 0, tot = 0;
  const w = WORLDS[wi]; if (!w) return { got: 0, tot: 0 };
  w.levels.forEach((_, li) => {
    const i = globalIndex(wi, li); tot += 3;
    const st = (save.levels[i] && save.levels[i].stars) || [];
    if (st[0]) got++; if (st[1]) got++; if (st[2]) got++;
  });
  return { got, tot };
}
function renderLevels() {
  const tabs = $('world-tabs'); tabs.innerHTML = '';
  WORLDS.forEach((w, wi) => {
    const unlocked = worldUnlocked(wi);
    const b = document.createElement('button');
    const thCls = (w.theme === 'lava' || w.theme === 'ice' || w.theme === 'jungle' || w.theme === 'desert' || w.theme === 'candy' || w.theme === 'reef' || w.theme === 'castle' || w.theme === 'neon' || w.theme === 'space') ? ' ' + w.theme : '';
    b.className = 'world-tab' + (wi === G.selectedWorld ? ' on' : '') + thCls + (unlocked ? '' : ' locked');
    const sc = worldStarCount(wi);
    b.innerHTML = unlocked
      ? `<span class="wt-name">${wi + 1}. ${w.name}</span><span class="wt-stars">${sc.got}/${sc.tot} ★</span>`
      : `<span class="wt-name">🔒 ${w.name}</span><span class="wt-stars">—</span>`;
    b.onclick = () => {
      sfx.play('click');
      if (!unlocked) { toast(wi === 1 ? 'Completa el Mundo 1 para desbloquear' : 'Completa el mundo anterior para desbloquear'); return; }
      G.selectedWorld = wi; renderLevels();
    };
    tabs.appendChild(b);
  });
  const w = WORLDS[G.selectedWorld] || WORLDS[0];
  $('levels-title').textContent = w.name;
  const grid = $('level-grid'); grid.innerHTML = '';
  w.levels.forEach((L, li) => {
    const i = globalIndex(G.selectedWorld, li);
    const prevDone = li === 0 ? (G.selectedWorld === 0 || worldUnlocked(G.selectedWorld)) : !!(save.levels[i - 1] && save.levels[i - 1].done);
    const unlocked = prevDone && worldUnlocked(G.selectedWorld);
    const st = (save.levels[i] && save.levels[i].stars) || [false, false, false];
    const b = document.createElement('button');
    const lth = (w.theme === 'lava' || w.theme === 'ice' || w.theme === 'jungle' || w.theme === 'desert' || w.theme === 'candy' || w.theme === 'reef' || w.theme === 'castle' || w.theme === 'neon' || w.theme === 'space') ? ' ' + w.theme : '';
    b.className = 'lvl' + (unlocked ? '' : ' locked') + lth;
    b.innerHTML = `<div class="n">${unlocked ? li + 1 : '🔒'}</div><div class="nm">${unlocked ? L.name : 'Bloqueado'}</div><div class="st">${st.map(s => `<span class="${s ? 'on' : ''}">★</span>`).join('')}</div>`;
    b.dataset.level = i;
    b.onclick = () => { if (!unlocked) { sfx.play('click'); toast('Termina el nivel anterior para desbloquear'); return; } sfx.play('click'); G.dailyMode = false; G.dailySpec = null; startLevel(i, true); };
    grid.appendChild(b);
  });
}
function skinUnlockReady(s) {
  if (!s.unlock) return true;
  if (s.unlock.startsWith('streak:')) return (save.daily?.bestStreak || 0) >= +s.unlock.slice(7);
  if (s.unlock.startsWith('achieve:')) return !!(save.achievements?.unlocked?.[s.unlock.slice(8)]);
  return false;
}
function skinUnlockLabel(s) {
  if (!s.unlock) return '';
  if (s.unlock.startsWith('streak:')) return `Racha ${s.unlock.slice(7)} días`;
  if (s.unlock.startsWith('achieve:')) {
    const a = achievementById(s.unlock.slice(8));
    return a ? `Logro: ${a.name}` : 'Logro';
  }
  return 'Bloqueada';
}
function grantUnlockSkins() {
  let added = false;
  for (const s of SKINS) {
    if (!s.unlock) continue;
    if (skinUnlockReady(s) && !save.skins.includes(s.id)) { save.skins.push(s.id); added = true; }
  }
  return added;
}
function renderShop() {
  grantUnlockSkins();
  const grid = $('skin-grid'); grid.innerHTML = '';
  for (const s of SKINS) {
    const owned = save.skins.includes(s.id), eq = save.skin === s.id;
    const locked = !owned && s.unlock && !skinUnlockReady(s);
    const d = document.createElement('div'); d.className = 'skin' + (eq ? ' equipped' : '') + (locked ? ' locked' : ''); d.dataset.skin = s.id;
    let btn;
    if (eq) btn = '<button class="btn small green" disabled>Equipada</button>';
    else if (owned) btn = '<button class="btn small blue">Usar</button>';
    else if (s.unlock) btn = locked
      ? `<div class="lock-note">🔒 ${skinUnlockLabel(s)}</div>`
      : '<button class="btn small green">¡Gratis!</button>';
    else btn = `<button class="btn small yellow" ${save.coins < s.price ? 'disabled' : ''}><span class="coin-ico"></span> ${s.price}</button>`;
    d.innerHTML = `<img alt="" src="${skinPreview(s.id)}"><div class="nm">${s.name}</div>${btn}`;
    const b = d.querySelector('button');
    if (b) b.onclick = () => {
      if (eq) return;
      if (!owned) {
        if (s.unlock) {
          if (!skinUnlockReady(s)) { toast('Aún no desbloqueada'); return; }
          save.skins.push(s.id); sfx.play('buy'); toast(`¡Nueva bola: ${s.name}!`);
        } else {
          if (save.coins < s.price) { toast('¡Te faltan monedas!'); return; }
          save.coins -= s.price; save.skins.push(s.id); sfx.play('buy'); toast(`¡Nueva bola: ${s.name}!`);
        }
        notifyAchievements();
      } else sfx.play('click');
      save.skin = s.id; setSkin(s.id); persist(); renderShop(); updateWallet();
    };
    grid.appendChild(d);
  }
}
function renderDaily() {
  const spec = dailySpec(localDateStr(), LEVELS.length);
  const base = LEVELS[spec.baseIndex];
  const best = save.daily?.best?.[spec.date];
  const done = save.daily?.claimed === spec.date;
  const streak = save.daily?.streak || 0;
  const twistNote = spec.twist === 1 ? 'Meta de tiempo un poco más fácil' : (spec.twist === 2 ? 'Meta de tiempo más exigente' : 'Sin modificadores extra');
  const target = spec.twist === 1 ? Math.round(base.target * 1.15) : (spec.twist === 2 ? Math.round(base.target * 0.88) : base.target);
  $('daily-body').innerHTML = `
    <div class="daily-card">
      <h3>📅 ${spec.date}</h3>
      <div class="daily-hint">Remix de <b>${base.name}</b> · ${WORLDS[base.worldIndex].name}</div>
      <div class="daily-meta">
        <div class="daily-pill">🔥 Racha ${streak}</div>
        <div class="daily-pill">⏱️ Mejor ${best != null ? fmtTime(best) : '—'}</div>
        <div class="daily-pill"><span class="coin-ico"></span> +${spec.reward}</div>
      </div>
      <div class="daily-hint">${twistNote} · meta ★ ${fmtTime(target)}</div>
      <button class="btn yellow big" id="btn-daily-go">${done ? '▶ Jugar de nuevo' : '▶ ¡Al reto!'}</button>
      ${done ? '<div class="daily-hint">Recompensa de hoy ya cobrada. ¡Mejora tu tiempo!</div>' : '<div class="daily-hint">Completa el nivel una vez hoy para ganar monedas y sumar racha.</div>'}
    </div>`;
  $('btn-daily-go').onclick = () => {
    sfx.play('click');
    G.dailyMode = true; G.dailySpec = { ...spec, target };
    startLevel(spec.baseIndex, true);
  };
}
function renderAchievements() {
  notifyAchievements();
  const grid = $('ach-grid'); if (!grid) return;
  grid.innerHTML = '';
  const total = ACHIEVEMENTS.length;
  let got = 0;
  for (const a of ACHIEVEMENTS) {
    const on = !!(save.achievements?.unlocked?.[a.id]);
    if (on) got++;
    const d = document.createElement('div');
    d.className = 'ach-card' + (on ? ' on' : '');
    d.innerHTML = `<div class="ico">${on ? a.icon : '🔒'}</div><div><div class="nm">${a.name}</div><div class="ds">${a.desc}</div><div class="st">${on ? '✓ Conseguido' : 'Sin desbloquear'}</div></div>`;
    grid.appendChild(d);
  }
  const head = document.createElement('div');
  head.className = 'ach-progress';
  head.textContent = `Progreso: ${got}/${total}`;
  grid.prepend(head);
}
function notifyAchievements(extra = {}) {
  const newly = evaluateAchievements(save, LEVELS, extra);
  if (grantUnlockSkins()) persist();
  for (const id of newly) {
    const a = achievementById(id);
    if (a) toast(`🏅 Logro: ${a.name}`, 3.2);
  }
  if (newly.length) persist();
  return newly;
}
function renderOptions() {
  $('tg-music').classList.toggle('on', save.opts.music);
  $('tg-sfx').classList.toggle('on', save.opts.sfx);
  $('tg-shadows').classList.toggle('on', save.opts.shadows);
}

// ---------------- Niveles ----------------
function loadLevel(i) {
  if (G.level) G.level.dispose();
  G.levelIndex = i; G.level = new Level(scene, LEVELS[i], i);
  applyTheme(LEVELS[i].theme || 'sky');
  resetRun();
}
function resetRun() {
  const L = G.level;
  L.time = 0; L.resetDynamic(); for (const c of L.coins) c.taken = false;
  for (const cp of L.checkpoints) { cp.active = false; cp.flagMat.color.set(0xb8c2cc); }
  G.checkpoint.copy(L.spawn); ball.reset(L.spawn); ball.quat.identity();
  G.coins = 0; G.time = 0; G.timerOn = false; G.deaths = 0; G.dead = false; G.winT = 0; G.lastGroundY = L.spawn.y;
  ballMesh.visible = true; ballMesh.scale.setScalar(1);
  if (L.crownObj) { L.crownObj.position.copy(L.crownPos); L.crownObj.scale.setScalar(1); }
  G.followY = ball.pos.y; snapCamera();
  const Ld = LEVELS[G.levelIndex];
  $('hud-level').textContent = G.dailyMode
    ? `📅 Reto · ${Ld.name}`
    : `${(Ld.localIndex != null ? Ld.localIndex : G.levelIndex) + 1} · ${Ld.name}`;
  updateHUD();
  if (G.bot) G.bot.i = 0;
}
async function startLevel(i, fromMenu) {
  sfx.init();
  if (!G.level || G.levelIndex !== i || fromMenu !== 'keep') loadLevel(i); else resetRun();
  G.state = 'play'; showScreen(null); setPlayingUI(true);
  sfx.musicOn = true;
  maybeShowTutorial();
  const delay = G.hintShowing ? 0 : 250;
  const hint = G.dailyMode ? (`Reto Diario: ${LEVELS[i].hint}`) : LEVELS[i].hint;
  if (!G.hintShowing) setTimeout(() => toast(hint, 3.5), delay);
  $('joy-hint').style.opacity = (save.tutorialSeen || (save.levels[0] && save.levels[0].done)) ? 0 : 0;
}
function pause() { if (G.state !== 'play') return; G.state = 'pause'; setPlayingUI(false); $('hud').classList.remove('hidden'); showScreen('scr-pause'); }
function resume() { G.state = 'play'; showScreen(null); setPlayingUI(true); }
function toTitle() {
  G.dailyMode = false; G.dailySpec = null;
  G.state = 'title'; setPlayingUI(false); showScreen('scr-title'); sfx.musicOn = true;
  updateTitleBadge();
  applyTheme('sky');
}

// ---------------- Lógica de juego ----------------
function cooldown(k, t) { if ((G.cool[k] || 0) > G.t) return false; G.cool[k] = G.t + t; return true; }
function handleEvents() {
  for (const e of ball.events) {
    switch (e.type) {
      case 'jump': if (cooldown('jump', 0.1)) { sfx.play('jump'); fx.burst(_v.copy(ball.pos).setY(ball.pos.y - 0.45), 6, 0xffffff, { speed: 2, up: 1, life: 0.35, size: 0.8 }); } break;
      case 'land': if (cooldown('land', 0.15)) { const s = Math.min(1, e.speed / 14); sfx.play('land', s); fx.burst(_v.copy(ball.pos).setY(ball.pos.y - 0.45), 6 + Math.floor(s * 10), [0xffffff, 0xf3e3c0], { speed: 2 + s * 3, up: 1.5, life: 0.45, size: 0.9 }); if (e.speed > 13) G.shake = Math.max(G.shake, 0.25); } break;
      case 'kill': if (!G.dead) die('spikes'); break;
      case 'hammer': if (cooldown('hammer', 0.4)) { sfx.play('hammer'); G.shake = 0.6; fx.burst(ball.pos, 16, [0xffd447, 0xffffff, 0xef4f5f], { speed: 6, up: 4, life: 0.6 }); } break;
      case 'spring': if (cooldown('spring', 0.25)) { sfx.play('spring'); if (e.c.owner) e.c.owner.hit = 1; fx.burst(ball.pos, 10, [0xffd23f, 0xffffff], { speed: 3, up: 5, life: 0.6 }); } break;
      case 'bumper': if (cooldown('bumper', 0.15)) { sfx.play('bumper'); if (e.c.owner) e.c.owner.hit = 1; G.shake = Math.max(G.shake, 0.2); fx.burst(ball.pos, 10, [0xff6fb7, 0xffffff], { speed: 5, up: 2, life: 0.4 }); } break;
      case 'touch': if (e.c.owner && e.c.owner.touch && e.c.owner.touch()) sfx.play(e.c.owner.type === 'crackIce' ? 'crumble' : 'crumble'); break;
    }
  }
  ball.events.length = 0;
}
const _v = new THREE.Vector3(), _v2 = new THREE.Vector3();
function die(kind) {
  G.dead = true; G.deadT = 0; G.deadKind = kind; G.deaths++;
  sfx.play('fall');
  if (kind === 'spikes') { ballMesh.visible = false; fx.burst(ball.pos, 26, [0xffffff, 0xff6b6b, 0xdde3ea], { speed: 6, up: 6, life: 0.8 }); G.shake = 0.5; ball.vel.set(0, 0, 0); }
}
function respawn() {
  G.dead = false; ball.reset(G.checkpoint); ballMesh.visible = true; ballMesh.scale.setScalar(0.01);
  G.level.resetDynamic(); G.lastGroundY = G.checkpoint.y; G.followY = ball.pos.y;
  sfx.play('respawn'); fx.burst(G.checkpoint, 18, [0xffffff, 0x9fe7ff, 0xffe066], { speed: 4, up: 3, life: 0.6, g: 4 });
  if (G.bot) G.bot.onRespawn();
}
function win() {
  G.state = 'won'; G.winT = 0; sfx.play('win'); flash(0.5);
  fx.burst(G.level.crownPos, 60, [0xffd23a, 0xff6fb7, 0x5fd3c8, 0x7ddc5a, 0x5aa8ff, 0xffffff], { speed: 7, up: 9, life: 1.6, g: 9, size: 1.3 });
  const L = LEVELS[G.levelIndex];
  const target = (G.dailyMode && G.dailySpec) ? G.dailySpec.target : L.target;
  const stars = [true, G.coins >= G.level.coins.length, G.time <= target];
  const prev = save.levels[G.levelIndex] || { done: false, stars: [false, false, false], best: 9999 };
  let newStars = 0; const merged = prev.stars.map((s, k) => { if (stars[k] && !s) newStars++; return s || stars[k]; });
  let earned = G.coins + newStars * 5;
  save.coins += earned;
  save.stats.earnedCoins = (save.stats.earnedCoins || 0) + earned;
  save.levels[G.levelIndex] = { done: true, stars: merged, best: Math.min(prev.best || 9999, G.time) };
  if (G.deaths === 0) save.stats.noDeathWins = (save.stats.noDeathWins || 0) + 1;
  let dailyReward = 0;
  if (G.dailyMode && G.dailySpec) {
    const r = applyDailyWin(save, G.dailySpec, G.time);
    dailyReward = r.reward;
    earned += dailyReward;
  }
  notifyAchievements({ noDeath: G.deaths === 0 });
  persist();
  G.lastWin = { stars, earned, newStars, dailyReward, target };
  setTimeout(() => showWin(stars, earned), 1300);
}
function showWin(stars, earned) {
  if (G.state !== 'won') return;
  const Ld = LEVELS[G.levelIndex];
  const w = WORLDS[Ld.worldIndex || 0];
  const isFinale = !G.dailyMode && G.levelIndex === LEVELS.length - 1;
  if (isFinale) {
    setPlayingUI(false); showEnding();
    return;
  }
  setPlayingUI(false); showScreen('scr-win');
  const L = LEVELS[G.levelIndex], sp = $('win-stars').children;
  const target = (G.lastWin && G.lastWin.target) || L.target;
  for (let k = 0; k < 3; k++) { sp[k].classList.remove('on'); if (stars[k]) setTimeout(() => { sp[k].classList.add('on'); sfx.play('star', 1 + k * 0.12); }, 300 + k * 350); }
  const dailyLine = (G.lastWin && G.lastWin.dailyReward) ? `<div class="ok">📅 Reto Diario +${G.lastWin.dailyReward} <span class="coin-ico" style="vertical-align:-4px"></span></div>` : (G.dailyMode ? '<div class="no">📅 Reto (recompensa ya cobrada hoy)</div>' : '');
  $('win-info').innerHTML = `<div class="ok">★ Corona conseguida</div>
    <div class="${stars[1] ? 'ok' : 'no'}">★ Monedas: ${G.coins}/${G.level.coins.length}</div>
    <div class="${stars[2] ? 'ok' : 'no'}">★ Tiempo: ${fmtTime(G.time)} (meta ${fmtTime(target)})</div>
    ${dailyLine}
    <div>+${earned} <span class="coin-ico" style="vertical-align:-4px"></span></div>`;
  $('btn-next').classList.toggle('hidden', G.dailyMode || G.levelIndex >= LEVELS.length - 1);
  if (!G.dailyMode && Ld.localIndex === w.levels.length - 1) toast(`¡Has completado ${w.name}! 👑`, 4);
}
function showEnding() {
  showScreen('scr-ending');
  const box = $('ending-confetti');
  if (box) {
    box.innerHTML = '';
    const cols = ['#ffd23a', '#ff6fb7', '#5fd3c8', '#7ddc5a', '#5aa8ff', '#b06bff', '#ffffff'];
    for (let i = 0; i < 48; i++) {
      const p = document.createElement('i');
      p.style.left = (Math.random() * 100) + '%';
      p.style.background = cols[i % cols.length];
      p.style.animationDelay = (Math.random() * 1.8) + 's';
      p.style.animationDuration = (2.2 + Math.random() * 2.5) + 's';
      box.appendChild(p);
    }
  }
  for (let k = 0; k < 3; k++) {
    fx.burst(ball.pos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 4, 1 + Math.random() * 2, -2 - Math.random() * 3)), 40,
      [0xffd23a, 0xff6fb7, 0x5fd3c8, 0x7ddc5a, 0x5aa8ff, 0xffffff], { speed: 8, up: 10, life: 1.8, g: 8, size: 1.4 });
  }
  sfx.play('win');
  notifyAchievements();
  grantUnlockSkins(); persist();
  updateTitleBadge();
}

function fixedStep(dt) {
  G.t += dt;
  const L = G.level; if (!L) return;
  L.savePrev(); L.update(dt);
  if (G.state === 'play') {
    if (G.dead) {
      G.deadT += dt;
      if (G.deadKind === 'fall') { ball.vel.y -= 25 * dt; ball.pos.addScaledVector(ball.vel, dt); }
      if (G.deadT > 0.85) respawn();
    } else {
      if (G.bot) G.bot.update(dt);
      const mv = input.move();
      if (input.consumeJump()) ball.pressJump();
      ball.jumpHeld = input.jumpHeld;
      if (G.hintShowing && (Math.abs(mv.x) + Math.abs(mv.z) > 0.12 || ball.sinceJumpPress < 0.5)) dismissTutorial();
      if (!G.timerOn && (Math.abs(mv.x) + Math.abs(mv.z) > 0.15 || ball.sinceJumpPress < 0.5)) G.timerOn = true;
      // gravedad / salto base (Cosmos: lowGrav)
      ball.gScale = 1; ball.jumpScale = 1;
      for (const e of L.entities) {
        if (e.type === 'lowGrav' && e.contains(ball.pos)) {
          ball.gScale = e.gScale; ball.jumpScale = e.jumpScale;
        }
      }
      stepBall(ball, L.colliders, mv, dt);
      // viento / imanes / cosmos
      for (const e of L.entities) {
        if ((e.type === 'wind' || e.type === 'magnet') && e.contains(ball.pos)) {
          ball.vel.x += e.force.x * dt; ball.vel.z += e.force.z * dt;
        }
        if (e.type === 'bubbleColumn' && e.contains(ball.pos)) {
          ball.vel.y += e.force * dt;
          if (ball.vel.y > 12) ball.vel.y = 12;
          ball.vel.x *= Math.exp(-1.2 * dt); ball.vel.z *= Math.exp(-1.2 * dt);
        }
        if (e.type === 'boostPad' && e.contains(ball.pos)) {
          ball.vel.z -= e.force * dt;
          if (ball.vel.z < -16) ball.vel.z = -16;
        }
        if (e.type === 'starBoost' && e.contains(ball.pos)) {
          ball.vel.z -= e.force * dt;
          if (ball.vel.z < -18) ball.vel.z = -18;
        }
        if ((e.type === 'gravWell' || e.type === 'blackHole') && e.contains(ball.pos)) {
          const dx = e.cx - ball.pos.x, dz = e.cz - ball.pos.z;
          const dist = Math.hypot(dx, dz) || 0.01;
          const pull = e.force * (1 - Math.min(1, dist / e.r));
          ball.vel.x += (dx / dist) * pull * dt;
          ball.vel.z += (dz / dist) * pull * dt;
        }
        if (e.type === 'teleport' && e.link && e.cool <= 0 && e.contains(ball.pos)) {
          const dest = e.link;
          ball.pos.set(dest.g.position.x, dest.g.position.y + 0.7, dest.g.position.z);
          ball.vel.set(0, 3.5, ball.vel.z * 0.25);
          e.cool = 1.2; dest.cool = 1.2;
          if (cooldown('teleport', 0.3)) sfx.play('spring');
        }
      }
      handleEvents();
      if (G.timerOn) G.time += dt;
      if (ball.sinceGround === 0) G.lastGroundY = ball.pos.y;
      // monedas
      for (const c of L.coins) {
        if (c.taken) continue;
        if (c.pos.distanceToSquared(ball.pos) < 1.0) {
          c.taken = true; G.coins++; sfx.play('coin');
          fx.burst(c.pos, 10, [0xffd23a, 0xfff2a0], { speed: 3, up: 3, life: 0.5, g: 6 });
        }
      }
      // puntos de control
      for (const cp of L.checkpoints) {
        if (cp.active) continue;
        const dx = cp.pos.x - ball.pos.x, dz = cp.pos.z - ball.pos.z;
        if (dx * dx + dz * dz < 1.9 * 1.9 && Math.abs(cp.pos.y - ball.pos.y) < 1.6) {
          cp.active = true; cp.flagMat.color.set(0x3fd14a); G.checkpoint.copy(cp.pos);
          sfx.play('check'); toast('¡Punto de control!', 1.4);
          fx.burst(_v.copy(cp.pos).add(_v2.set(1.3, 1.5, 0)), 16, [0x3fd14a, 0xffffff, 0xffe066], { speed: 3, up: 4, life: 0.7 });
        }
      }
      // corona
      if (L.crownPos && L.crownPos.distanceToSquared(ball.pos) < 1.6 * 1.6) win();
      // caída
      else if (ball.pos.y < G.lastGroundY - 7 || ball.pos.y < L.killY) die('fall');
    }
  } else if (G.state === 'won') {
    G.winT += dt;
    ball.vel.multiplyScalar(Math.exp(-6 * dt)); ball.pos.addScaledVector(ball.vel, dt);
  }
}

// ---------------- Cámara ----------------
function camParams() {
  const portrait = innerHeight > innerWidth * 1.05;
  return portrait ? { dist: 11.5, h: 8.2, look: 4.5, fov: 66 } : { dist: 8.4, h: 5.3, look: 3.2, fov: 55 };
}
function snapCamera() {
  const cp = camParams(); G.followY = ball.pos.y;
  G.camPos.set(ball.pos.x, ball.pos.y + cp.h, ball.pos.z + cp.dist);
  G.camLook.set(ball.pos.x, ball.pos.y + 0.6, ball.pos.z - cp.look);
}
function updateCamera(dt) {
  const cp = camParams();
  if (Math.abs(camera.fov - cp.fov) > 0.1) { camera.fov = cp.fov; camera.updateProjectionMatrix(); }
  if (G.state === 'title' || G.state === 'menu') {
    const L = G.level; const t = performance.now() / 1000 * 0.12;
    const c = L.spawn;
    camera.position.set(c.x + Math.sin(t) * 13, c.y + 7 + Math.sin(t * 0.7), c.z + 8 + Math.cos(t) * 9);
    camera.lookAt(c.x, c.y, c.z - 10);
    return;
  }
  const followDead = G.dead && G.deadKind === 'fall';
  if (!followDead) {
    // en el aire seguimos la altura con más calma para que la cámara no "bote"
    const ty = ball.sinceGround < 0.05 ? ball.pos.y : Math.min(ball.pos.y, Math.max(G.followY, G.lastGroundY));
    G.followY += (ty - G.followY) * (1 - Math.exp(-(ball.sinceGround < 0.05 ? 5 : 2.5) * dt));
    if (ball.pos.y < G.followY - 1.5) G.followY = ball.pos.y + 1.5;
    const k = 1 - Math.exp(-7 * dt), ky = 1 - Math.exp(-5 * dt);
    G.camPos.x += (ball.pos.x - G.camPos.x) * k;
    G.camPos.z += (ball.pos.z + cp.dist - G.camPos.z) * k;
    G.camPos.y += (G.followY + cp.h - G.camPos.y) * ky;
    G.camLook.x += (ball.pos.x - G.camLook.x) * k;
    G.camLook.z += (ball.pos.z - cp.look - G.camLook.z) * k;
    G.camLook.y += (G.followY + 0.6 - G.camLook.y) * ky;
  }
  camera.position.copy(G.camPos);
  if (G.shake > 0) {
    G.shake = Math.max(0, G.shake - dt * 1.8); const s = G.shake * G.shake * 0.5;
    camera.position.x += (Math.random() - 0.5) * s; camera.position.y += (Math.random() - 0.5) * s;
  }
  camera.lookAt(G.camLook);
}

// ---------------- Bucle ----------------
let last = performance.now(), acc = 0, frames = 0, ftAcc = 0;
G.paused = false;
function frame(now) {
  requestAnimationFrame(frame);
  let dt = (now - last) / 1000; last = now;
  if (dt > 0.1) dt = 0.1;
  if (G.manual) dt = 0; // modo pruebas: la simulación se avanza a mano
  if (G.state === 'play' || G.state === 'won' || G.state === 'title' || G.state === 'menu') {
    acc += dt; let n = 0;
    while (acc >= DT && n < 14) { fixedStep(DT); acc -= DT; n++; }
    if (n === 14) acc = 0;
  }
  render(dt);
  // calidad adaptativa: baja la resolución si va lento
  if (G.state === 'play' && !G.manual) {
    frames++; ftAcc += dt;
    if (frames >= 120) {
      const avg = ftAcc / frames; frames = 0; ftAcc = 0;
      if (avg > 0.024 && pixelRatio > 1) { pixelRatio = Math.max(1, pixelRatio - 0.25); renderer.setPixelRatio(pixelRatio); }
    }
  }
}
function render(dt) {
  const L = G.level;
  if (L) { L.updateCoins(L.time); if (L.crownObj) { L.crownObj.rotation.y += dt * 1.6; if (G.state === 'won') { L.crownObj.position.y += dt * 1.2; L.crownObj.scale.setScalar(1 + G.winT * 0.3); } else L.crownObj.position.y = L.crownPos.y + Math.sin(L.time * 2) * 0.15; } }
  ballMesh.position.copy(ball.pos); ballMesh.quaternion.copy(ball.quat);
  if (ballMesh.scale.x < 1) ballMesh.scale.setScalar(Math.min(1, ballMesh.scale.x + dt * 5));
  for (const cp of (L ? L.checkpoints : [])) { cp.flag.rotation.y = Math.sin(L.time * 3 + cp.pos.z) * 0.25; cp.ring.material.opacity = cp.active ? 0.85 : 0.45 + Math.sin(L.time * 4) * 0.15; }
  fx.update(dt);
  if (currentTheme === 'lava' && (G.state === 'play' || G.state === 'won') && Math.random() < dt * 8) {
    const bp = ball.pos;
    fx.burst(_v.set(bp.x + (Math.random() - 0.5) * 14, bp.y - 2 + Math.random() * 4, bp.z + (Math.random() - 0.5) * 18 - 4),
      1, [0xff6a1a, 0xffb020, 0xff3a0a], { speed: 0.8, up: 2.5, life: 1.4, g: -1.5, size: 0.7, spread: 2 });
  }
  if (currentTheme === 'ice' && (G.state === 'play' || G.state === 'won' || G.state === 'title') && Math.random() < dt * 10) {
    const bp = (G.state === 'title' && L) ? L.spawn : ball.pos;
    fx.burst(_v.set(bp.x + (Math.random() - 0.5) * 16, bp.y + 6 + Math.random() * 5, bp.z + (Math.random() - 0.5) * 20 - 2),
      1, [0xffffff, 0xe8f4ff, 0xd0e8ff], { speed: 0.4, up: -0.2, life: 2.2, g: 1.2, size: 0.55, spread: 1.5 });
  }
  updateCamera(dt);
  // luz y sombra siguen a la bola
  const focus = G.state === 'title' ? L.spawn : ball.pos;
  sunLight.position.set(focus.x + 6, focus.y + 20, focus.z + 4); sunLight.target.position.copy(focus);
  sky.position.copy(camera.position); sun.position.set(camera.position.x + 90, camera.position.y + 80, camera.position.z - 220);
  if (G.state === 'play' && G.timerOn) updateHUD();
  renderer.render(scene, camera);
}
function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  const portrait = innerHeight > innerWidth;
  $('rotate').classList.toggle('hidden', !(IS_TOUCH && portrait && !save.portraitOk));
}
addEventListener('resize', resize); addEventListener('orientationchange', () => setTimeout(resize, 200));

// ---------------- Botones ----------------
function on(id, fn) { $(id).addEventListener('click', (e) => { sfx.init(); fn(e); }); }
on('btn-play', () => {
  sfx.play('click');
  G.dailyMode = false; G.dailySpec = null;
  let i = 0; while (i < LEVELS.length - 1 && save.levels[i] && save.levels[i].done) i++;
  if (!save.levels[0] || !save.levels[0].done) startLevel(0, true);
  else {
    G.selectedWorld = LEVELS[i].worldIndex || 0;
    G.returnTo = 'scr-title'; showScreen('scr-levels');
  }
});
on('btn-daily', () => { sfx.play('click'); showScreen('scr-daily'); });
on('btn-achievements', () => { sfx.play('click'); notifyAchievements(); showScreen('scr-achievements'); });
on('btn-shop', () => { sfx.play('click'); showScreen('scr-shop'); });
on('btn-options', () => { sfx.play('click'); G.returnTo = 'scr-title'; showScreen('scr-options'); });
document.querySelectorAll('[data-back]').forEach(b => b.addEventListener('click', () => {
  sfx.play('click');
  const scr = b.closest('.screen').id;
  if (scr === 'scr-options' && G.returnTo === 'scr-pause') showScreen('scr-pause');
  else showScreen('scr-title');
}));
on('btn-pause', () => { sfx.play('click'); pause(); });
on('btn-mute', () => {
  save.muted = !save.muted; persist();
  sfx.setMusic(save.opts.music && !save.muted); sfx.setSfx(save.opts.sfx && !save.muted); updateHUD();
});
on('btn-resume', () => { sfx.play('click'); resume(); });
on('btn-restart', () => { sfx.play('click'); resetRun(); resume(); });
on('btn-levels', () => { sfx.play('click'); G.dailyMode = false; G.dailySpec = null; G.state = 'menu'; setPlayingUI(false); showScreen('scr-levels'); });
on('btn-pause-opts', () => { sfx.play('click'); G.returnTo = 'scr-pause'; showScreen('scr-options'); });
on('btn-next', () => { sfx.play('click'); G.dailyMode = false; G.dailySpec = null; startLevel(G.levelIndex + 1, true); });
on('btn-again', () => { sfx.play('click'); startLevel(G.levelIndex, 'keep'); });
on('btn-win-levels', () => { sfx.play('click'); G.dailyMode = false; G.dailySpec = null; G.state = 'menu'; showScreen('scr-levels'); });
on('btn-ending-menu', () => { sfx.play('click'); G.dailyMode = false; G.dailySpec = null; G.state = 'title'; setPlayingUI(false); updateTitleBadge(); showScreen('scr-title'); });
on('tg-music', () => { save.opts.music = !save.opts.music; sfx.setMusic(save.opts.music && !save.muted); persist(); renderOptions(); sfx.play('click'); });
on('tg-sfx', () => { save.opts.sfx = !save.opts.sfx; sfx.setSfx(save.opts.sfx && !save.muted); persist(); renderOptions(); sfx.play('click'); });
on('tg-shadows', () => {
  save.opts.shadows = !save.opts.shadows; persist(); renderOptions(); sfx.play('click');
  renderer.shadowMap.enabled = save.opts.shadows; scene.traverse(o => { if (o.material) o.material.needsUpdate = true; });
});
on('btn-portrait', () => { save.portraitOk = true; persist(); resize(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
// Primer toque: audio + pantalla completa (si se puede)
let firstTap = true;
document.addEventListener('pointerdown', () => {
  sfx.init();
  if (!firstTap) return; firstTap = false;
  if (IS_TOUCH && !params.has('nofs')) {
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) { try { const p = req.call(el, { navigationUI: 'hide' }); if (p && p.then) p.then(() => { if (screen.orientation && screen.orientation.lock) screen.orientation.lock('landscape').catch(() => {}); }).catch(() => {}); } catch (e) { /* no soportado */ } }
  }
}, { capture: true });
addEventListener('keydown', (e) => { if (e.code === 'Escape' || e.code === 'KeyP') { if (G.state === 'play') pause(); else if (G.state === 'pause') resume(); } });

// ---------------- Piloto automático (pruebas) ----------------
class Bot {
  constructor() { this.i = 0; this.hold = 0; }
  onRespawn() {
    const wps = G.level.waypoints; let best = 0, bd = 1e9;
    for (let k = 0; k < wps.length; k++) { const d = wps[k].pos.distanceTo(ball.pos); if (d < bd) { bd = d; best = k; } }
    this.i = best;
  }
  target(w) {
    if (w.follow) { const c = w.follow.c; return _bt.set(c.pos.x + (w.ox || 0), c.pos.y + 0.8, c.pos.z + (w.oz || 0)); }
    return w.pos;
  }
  update(dt) {
    const wps = G.level.waypoints; if (!wps.length) return;
    const grounded = ball.sinceGround < 0.02;
    let w = wps[this.i], tp = this.target(w);
    let dx = tp.x - ball.pos.x, dz = tp.z - ball.pos.z, d = Math.hypot(dx, dz);
    let hold = false;
    if (d < (w.flag === 'j' ? 0.75 : 1.1) && Math.abs(tp.y - ball.pos.y) < 1.6) {
      if (w.cond && !w.cond()) hold = true;
      else if (w.flag === 'j') { if (grounded) { input.jumpQueued = true; this.hold = 0.35; this.i = Math.min(this.i + 1, wps.length - 1); } }
      else this.i = Math.min(this.i + 1, wps.length - 1);
      if (!hold) { w = wps[this.i]; tp = this.target(w); dx = tp.x - ball.pos.x; dz = tp.z - ball.pos.z; d = Math.hypot(dx, dz); }
    }
    if (this.hold > 0) { this.hold -= dt; input.jumpHeld = true; } else input.jumpHeld = false;
    let speed = w.speed || 8;
    if (hold) speed = Math.min(2, d * 2);
    else if (!grounded) {
      // tiempo estimado hasta caer a la altura del objetivo
      const dy = ball.pos.y - tp.y, vy = ball.vel.y, g = 25;
      const disc = vy * vy + 2 * g * dy;
      const tl = disc > 0 ? (vy + Math.sqrt(disc)) / g : 0.2;
      speed = Math.min(8.2, d / Math.max(0.12, tl));
    } else if (w.flag === 't' || w.flag === 'w' || w.follow) speed = Math.min(speed, 1.5 + d * 1.5);
    const ux = d > 1e-4 ? dx / d : 0, uz = d > 1e-4 ? dz / d : 0;
    let ix = (ux * speed - ball.vel.x) * 0.7, iz = (uz * speed - ball.vel.z) * 0.7;
    const m = Math.hypot(ix, iz); if (m > 1) { ix /= m; iz /= m; }
    input.override = { x: ix, z: iz };
  }
}
const _bt = new THREE.Vector3();

// ---------------- API de depuración / pruebas ----------------
window.__game = {
  G, ball, input, LEVELS, WORLDS, get save() { return save; },
  state: () => ({ state: G.state, level: G.levelIndex, pos: ball.pos.toArray().map(v => +v.toFixed(2)), coins: G.coins, total: G.level ? G.level.coins.length : 0, time: +G.time.toFixed(2), deaths: G.deaths, dead: G.dead, grounded: ball.sinceGround < 0.02, savedCoins: save.coins }),
  start: (i) => startLevel(i, true),
  step(n, mv) { if (mv) input.override = mv; for (let k = 0; k < n; k++) fixedStep(DT); return this.state(); },
  manual(on) { G.manual = on; },
  bot(on) { G.bot = on ? new Bot() : null; if (!on) { input.override = null; input.jumpHeld = false; } },
  runBot(maxSec = 180) {
    G.bot = new Bot(); const steps = Math.round(maxSec / DT); let k = 0;
    for (; k < steps && G.state === 'play'; k++) fixedStep(DT);
    const r = { ...this.state(), simSeconds: +(k * DT).toFixed(1) };
    G.bot = null; input.override = null; input.jumpHeld = false; return r;
  },
  teleport(x, y, z) { ball.reset(new THREE.Vector3(x, y, z)); },
  resetSave() { localStorage.removeItem(SAVE_KEY); save = loadSave(); },
  dailySpec, localDateStr, evaluateAchievements,
  startDaily(dateStr) {
    const spec = dailySpec(dateStr || localDateStr(), LEVELS.length);
    const base = LEVELS[spec.baseIndex];
    const target = spec.twist === 1 ? Math.round(base.target * 1.15) : (spec.twist === 2 ? Math.round(base.target * 0.88) : base.target);
    G.dailyMode = true; G.dailySpec = { ...spec, target };
    this.start(spec.baseIndex);
    return { ...spec, target, name: base.name };
  },
};

// ---------------- Inicio ----------------
resize();
loadLevel(0);
G.state = 'title';
showScreen('scr-title');
function updateTitleBadge() {
  if ($('ver-badge')) $('ver-badge').textContent = 'v0.4';
  if (!$('title-world')) return;
  const marks = [7, 15, 23, 31, 39, 47, 55, 63, 71];
  const labels = [
    'Mundo 1 · Ruinas Flotantes',
    'Mundos · Ruinas y Volcán',
    'Mundos · Ruinas, Volcán y Glaciar',
    'Mundos · Ruinas → Selva',
    'Mundos · Ruinas → Desierto',
    'Mundos · Ruinas → Dulces',
    'Mundos · Ruinas → Arrecife',
    'Mundos · Ruinas → Castillo',
    'Mundos · Ruinas → Neón',
    'Mundos · Ruinas → Cosmos',
  ];
  let n = 0;
  for (let i = 0; i < marks.length; i++) if (save.levels[marks[i]] && save.levels[marks[i]].done) n = i + 1;
  $('title-world').textContent = labels[n];
}
updateTitleBadge();
notifyAchievements();
grantUnlockSkins(); persist();
$('loading').classList.add('hidden');
requestAnimationFrame((t) => { last = t; frame(t); });
