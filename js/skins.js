// Pieles de bola: texturas generadas en canvas (originales), para ver bien el rodado
import * as THREE from 'three';

export const SKINS = [
  { id: 'piedra', name: 'Piedra', price: 0 },
  { id: 'madera', name: 'Madera', price: 30 },
  { id: 'sandia', name: 'Sandía', price: 60 },
  { id: 'futbol', name: 'Fútbol', price: 90 },
  { id: 'metal', name: 'Metal', price: 120 },
  { id: 'arcoiris', name: 'Arcoíris', price: 160 },
  { id: 'neon', name: 'Neón', price: 200 },
  { id: 'lava', name: 'Lava', price: 260 },
  { id: 'dorada', name: 'Dorada', price: 400 },
];

const cache = {};
function canvas(w = 256, h = 128) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
function r(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

export function skinCanvas(id) {
  if (cache[id]) return cache[id];
  const [c, x] = canvas(); const rnd = r(42);
  const W = c.width, H = c.height;
  switch (id) {
    case 'piedra': {
      x.fillStyle = '#b9b2a6'; x.fillRect(0, 0, W, H);
      for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(${rnd() < 0.5 ? '90,84,78' : '235,230,220'},${0.25 + rnd() * 0.3})`; x.beginPath(); x.arc(rnd() * W, rnd() * H, 1 + rnd() * 5, 0, 7); x.fill(); }
      x.strokeStyle = 'rgba(80,72,64,0.55)'; x.lineWidth = 3;
      for (let i = 0; i < 6; i++) { x.beginPath(); let px = rnd() * W, py = rnd() * H; x.moveTo(px, py); for (let k = 0; k < 4; k++) { px += (rnd() - 0.5) * 50; py += (rnd() - 0.5) * 30; x.lineTo(px, py); } x.stroke(); }
      x.fillStyle = '#ffffff'; x.fillRect(0, H * 0.47, W, H * 0.06); // franja para ver el giro
      break;
    }
    case 'madera': {
      x.fillStyle = '#c98a4b'; x.fillRect(0, 0, W, H);
      for (let i = 0; i < 18; i++) { x.strokeStyle = i % 2 ? 'rgba(120,70,30,0.5)' : 'rgba(240,190,120,0.4)'; x.lineWidth = 2 + rnd() * 4; x.beginPath(); const y0 = i * H / 18; x.moveTo(0, y0); for (let k = 0; k <= 8; k++) x.lineTo(k * W / 8, y0 + Math.sin(k + i) * 4); x.stroke(); }
      x.fillStyle = '#7a4520'; x.beginPath(); x.ellipse(W * 0.3, H * 0.5, 14, 9, 0, 0, 7); x.fill();
      break;
    }
    case 'sandia': {
      x.fillStyle = '#4fbf3a'; x.fillRect(0, 0, W, H);
      x.fillStyle = '#1f7a22';
      for (let i = 0; i < 10; i++) { x.beginPath(); const x0 = i * W / 10; x.moveTo(x0, 0); for (let k = 0; k <= 10; k++) x.lineTo(x0 + Math.sin(k * 1.3 + i) * 5 + 6, k * H / 10); for (let k = 10; k >= 0; k--) x.lineTo(x0 + Math.sin(k * 1.3 + i) * 5 - 6, k * H / 10); x.fill(); }
      break;
    }
    case 'futbol': {
      x.fillStyle = '#ffffff'; x.fillRect(0, 0, W, H); x.fillStyle = '#222';
      const pts = [[0.1, 0.5], [0.35, 0.5], [0.6, 0.5], [0.85, 0.5], [0.22, 0.12], [0.47, 0.12], [0.72, 0.12], [0.97, 0.12], [0.22, 0.88], [0.47, 0.88], [0.72, 0.88], [0.97, 0.88]];
      for (const [px, py] of pts) { x.beginPath(); for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2 - Math.PI / 2; x.lineTo(px * W + Math.cos(a) * 14, py * H + Math.sin(a) * 12); } x.fill(); }
      break;
    }
    case 'metal': {
      const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#f4f7fb'); g.addColorStop(0.5, '#9aa6b4'); g.addColorStop(1, '#e3e9f0');
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      x.fillStyle = '#5c6b7c'; for (let i = 0; i < 8; i++) { x.beginPath(); x.arc(i * W / 8 + 16, H * 0.5, 5, 0, 7); x.fill(); }
      x.fillStyle = 'rgba(70,80,95,0.6)'; x.fillRect(0, H * 0.42, W, 3); x.fillRect(0, H * 0.58, W, 3);
      break;
    }
    case 'arcoiris': {
      const cols = ['#ff4d4d', '#ff9f1c', '#ffe14d', '#5ce65c', '#3db8ff', '#8a5cff'];
      cols.forEach((cc, i) => { x.fillStyle = cc; x.fillRect(0, i * H / 6, W, H / 6 + 1); });
      break;
    }
    case 'neon': {
      x.fillStyle = '#1a1035'; x.fillRect(0, 0, W, H);
      x.strokeStyle = '#33f5ff'; x.lineWidth = 6; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(0, (i + 0.5) * H / 4); x.lineTo(W, (i + 0.5) * H / 4); x.stroke(); }
      x.strokeStyle = '#ff3df2'; x.lineWidth = 6; for (let i = 0; i < 8; i++) { x.beginPath(); x.moveTo(i * W / 8, 0); x.lineTo(i * W / 8, H); x.stroke(); }
      break;
    }
    case 'lava': {
      x.fillStyle = '#ff7a1a'; x.fillRect(0, 0, W, H);
      for (let i = 0; i < 40; i++) { x.fillStyle = rnd() < 0.5 ? '#ffd23f' : '#ff4d1a'; x.beginPath(); x.arc(rnd() * W, rnd() * H, 4 + rnd() * 10, 0, 7); x.fill(); }
      x.strokeStyle = '#4a1a0a'; x.lineWidth = 5;
      for (let i = 0; i < 9; i++) { x.beginPath(); let px = rnd() * W, py = rnd() * H; x.moveTo(px, py); for (let k = 0; k < 5; k++) { px += (rnd() - 0.5) * 60; py += (rnd() - 0.5) * 40; x.lineTo(px, py); } x.stroke(); }
      break;
    }
    case 'dorada': {
      const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#fff3b0'); g.addColorStop(0.5, '#ffbf1f'); g.addColorStop(1, '#ffe27a');
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      x.fillStyle = '#fff'; for (let i = 0; i < 6; i++) { const px = i * W / 6 + 20, py = H * (i % 2 ? 0.3 : 0.7); x.beginPath(); for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, rr = k % 2 ? 4 : 10; x.lineTo(px + Math.cos(a) * rr, py + Math.sin(a) * rr); } x.fill(); }
      break;
    }
  }
  cache[id] = c; return c;
}

export function skinMaterial(id) {
  const tex = new THREE.CanvasTexture(skinCanvas(id)); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  if (id === 'metal') return new THREE.MeshPhongMaterial({ map: tex, shininess: 90, specular: 0xffffff });
  if (id === 'dorada') return new THREE.MeshPhongMaterial({ map: tex, shininess: 70, specular: 0xfff0a0, emissive: 0x332200 });
  if (id === 'neon') return new THREE.MeshLambertMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.9 });
  if (id === 'lava') return new THREE.MeshLambertMaterial({ map: tex, emissive: 0xff5500, emissiveMap: tex, emissiveIntensity: 0.6 });
  return new THREE.MeshLambertMaterial({ map: tex });
}

// Vista previa redonda para la tienda (dataURL)
export function skinPreview(id) {
  const src = skinCanvas(id); const [c, x] = canvas(96, 96);
  x.save(); x.beginPath(); x.arc(48, 48, 44, 0, 7); x.clip();
  x.drawImage(src, 40, 0, 128, 128, 0, 0, 96, 96);
  const g = x.createRadialGradient(34, 30, 4, 48, 48, 50); g.addColorStop(0, 'rgba(255,255,255,0.55)'); g.addColorStop(0.5, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,0.35)');
  x.fillStyle = g; x.fillRect(0, 0, 96, 96); x.restore();
  return c.toDataURL();
}
