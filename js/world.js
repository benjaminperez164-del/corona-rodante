// Construcción de niveles: geometría estática fusionada (pocas draw calls),
// entidades dinámicas (martillos, molinetes, plataformas móviles...) y colliders.
import * as THREE from 'three';
import { Collider } from './physics.js?v=7';

export const PAL = {
  grass: 0x7ddc5a, grassSide: 0xf0d9a8, stoneBottom: 0xc9a777,
  wood: 0xe0a35f, woodSide: 0xb4733f,
  marble: 0xfaf4ea, marbleSide: 0xe2d6c3,
  hex: 0x5fd3c8, hexSide: 0x3aa7a0,
  crumble: 0xffb35c, crumbleSide: 0xe08a3a,
  mover: 0x5aa8ff, moverSide: 0x3b7fd6,
  rock: 0xc99b6a, rockDark: 0xa87b52,
  spikeBase: 0xff6b6b, spike: 0xdde3ea,
  pillar: 0xfff7ea, gold: 0xffc93c,
  hammerHead: 0xef4f5f, hammerBand: 0xffd447, hammerArm: 0x9a6a3e,
  turn: 0xa66bff, bumper: 0xff6fb7, spring: 0xffd23f, cloud: 0xffffff,
  // Volcán Ardiente
  basalt: 0x4a3f3a, basaltSide: 0x2e2622, basaltBottom: 0x1a1512,
  basaltTop: 0x5c4a42, magma: 0xff6a1a, magmaDeep: 0xc4220a,
  ash: 0x6a5a52, ember: 0xff8c2a, scorched: 0x3a2a22,
  lavaCrumb: 0xff7a28, lavaCrumbSide: 0xb83a10,
  convey: 0xff9a3a, conveySide: 0xc45a12,
  lavaMover: 0xff7040, lavaMoverSide: 0xc04020,
  // Glaciar Resbaloso — contraste: hielo cian brillante vs nieve mate
  ice: 0x7ad4f5, iceSide: 0x2a7aaa, iceBottom: 0x1a5a80,
  iceTop: 0x6ad8f8, snow: 0xd4e6f4, snowSide: 0x4a6e8e, snowBottom: 0x2e4e6e,
  crystal: 0x6ad8ff, packIce: 0x5ec0e8, crackIce: 0xb8e8f8,
  windFan: 0x3aa0e0, icicle: 0xc8f0ff, snowBounce: 0xf0f6fc,
};

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _v = new THREE.Vector3(), _s = new THREE.Vector3(1, 1, 1);
const _col = new THREE.Color(), _col2 = new THREE.Color(), _col3 = new THREE.Color();

// Acumula geometrías en un único buffer con colores por vértice según la normal
class MergeBuilder {
  constructor() { this.pos = []; this.nor = []; this.col = []; }
  add(geo, matrix, top, side, bottom) {
    const g = geo.index ? geo.toNonIndexed() : geo;
    g.applyMatrix4(matrix);
    g.computeVertexNormals();
    const p = g.attributes.position.array, n = g.attributes.normal.array;
    _col.set(top); _col2.set(side); _col3.set(bottom === undefined ? side : bottom);
    for (let i = 0; i < p.length; i += 3) {
      this.pos.push(p[i], p[i + 1], p[i + 2]);
      this.nor.push(n[i], n[i + 1], n[i + 2]);
      const ny = n[i + 1];
      const c = ny > 0.5 ? _col : (ny < -0.5 ? _col3 : _col2);
      // leve variación para que no sea plano
      const k = 0.97 + ((i * 7919) % 13) / 13 * 0.06;
      this.col.push(c.r * k, c.g * k, c.b * k);
    }
    g.dispose(); if (g !== geo) geo.dispose();
  }
  build(material) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(this.nor, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
    geo.computeBoundingSphere();
    return new THREE.Mesh(geo, material);
  }
}

function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

const STYLE = {
  stone: [PAL.grass, PAL.grassSide, PAL.stoneBottom],
  wood: [PAL.wood, PAL.woodSide, PAL.woodSide],
  marble: [PAL.marble, PAL.marbleSide, PAL.marbleSide],
  gold: [PAL.gold, 0xe8a92a, 0xe8a92a],
  basalt: [PAL.basaltTop, PAL.basaltSide, PAL.basaltBottom],
  scorched: [PAL.ash, PAL.scorched, PAL.basaltBottom],
  lavaWood: [PAL.convey, PAL.conveySide, PAL.basaltBottom],
  ice: [PAL.iceTop, PAL.iceSide, PAL.iceBottom],
  snow: [PAL.snow, PAL.snowSide, PAL.snowBottom],
  packIce: [PAL.packIce, PAL.iceSide, PAL.iceBottom],
};

let glowTex = null;
function getGlowTex() {
  if (glowTex) return glowTex;
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d'); const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,240,170,1)'); g.addColorStop(0.35, 'rgba(255,215,90,0.55)'); g.addColorStop(1, 'rgba(255,200,60,0)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  glowTex = new THREE.CanvasTexture(c); glowTex.colorSpace = THREE.SRGBColorSpace; return glowTex;
}

export class Level {
  constructor(scene, def, index) {
    this.scene = scene; this.def = def; this.index = index;
    this.theme = def.theme || 'sky';
    this.group = new THREE.Group(); scene.add(this.group);
    this.colliders = []; this.entities = []; this.coins = []; this.checkpoints = []; this.waypoints = [];
    this.spawn = new THREE.Vector3(0, 1, 0); this.crownPos = null; this.time = 0;
    this.merge = new MergeBuilder(); this.decor = new MergeBuilder();
    this.mat = new THREE.MeshLambertMaterial({ vertexColors: true });
    this.minY = 0; this.bounds = new THREE.Box3();
    this.rand = rng(index * 97 + 13);
    this.defaultPlat = this.theme === 'lava' ? 'basalt' : (this.theme === 'ice' ? 'ice' : 'stone');
    def.build(this);
    this.finish();
  }
  // ---------- API de construcción ----------
  start(x, y, z) { this.spawn.set(x, y + 0.55, z); }
  _boxCollider(pos, quat, half, opts = {}) {
    const c = new Collider('box', { pos, quat, half, ...opts });
    this.colliders.push(c); this.bounds.expandByPoint(pos); return c;
  }
  _staticBox(pos, quat, half, style, opts = {}) {
    const c = this._boxCollider(pos, quat, half, opts);
    _m.compose(pos, quat, _s);
    const [t, s, b] = Array.isArray(style) ? style : STYLE[style] || STYLE.stone;
    this.merge.add(new THREE.BoxGeometry(half.x * 2, half.y * 2, half.z * 2), _m, t, s, b);
    return c;
  }
  plat(x, y, z, w, d, o = {}) {
    const h = o.h || 1, type = o.type || this.defaultPlat;
    const c = this._staticBox(new THREE.Vector3(x, y - h / 2, z), new THREE.Quaternion(), new THREE.Vector3(w / 2, h / 2, d / 2), type);
    if (type === 'ice' || type === 'packIce' || o.ice) c.ice = true;
    if (type === 'wood') this._planks(x, y, z, w, d);
    if (type === 'ice' || type === 'packIce') this._iceShine(x, y, z, w, d);
    if (type === 'snow') this._snowRim(x, y, z, w, d);
    if (o.rock !== false && type !== 'wood' && type !== 'ice' && type !== 'packIce' && type !== 'snow' && w * d >= 6) this._rockUnder(x, y - h, z, w, d);
    if (o.pillars) this._cornerPillars(x, y, z, w, d);
    if (y < this.minY) this.minY = y;
    return c;
  }
  _iceShine(x, y, z, w, d) {
    // brillo cian + borde oscuro para que el hielo se distinga de la nieve
    _m.compose(_v.set(x, y + 0.025, z), _q.identity(), _s);
    this.decor.add(new THREE.BoxGeometry(Math.max(0.5, w * 0.55), 0.03, Math.max(0.35, d * 0.22)), _m, 0xd8f8ff, 0xa0e8ff);
    // remate perimetral (lados visibles)
    const rw = w * 0.98, rd = d * 0.98, t = 0.08;
    for (const [px, pz, ww, dd] of [
      [x, z - rd / 2, rw, t], [x, z + rd / 2, rw, t],
      [x - rw / 2, z, t, rd], [x + rw / 2, z, t, rd],
    ]) {
      _m.compose(_v.set(px, y + 0.015, pz), _q.identity(), _s);
      this.decor.add(new THREE.BoxGeometry(ww, 0.04, dd), _m, PAL.iceSide, PAL.iceBottom);
    }
  }
  _snowRim(x, y, z, w, d) {
    // borde mate azul-gris para plataformas de nieve (agarre)
    const rw = w * 0.98, rd = d * 0.98, t = 0.1;
    for (const [px, pz, ww, dd] of [
      [x, z - rd / 2, rw, t], [x, z + rd / 2, rw, t],
      [x - rw / 2, z, t, rd], [x + rw / 2, z, t, rd],
    ]) {
      _m.compose(_v.set(px, y + 0.012, pz), _q.identity(), _s);
      this.decor.add(new THREE.BoxGeometry(ww, 0.035, dd), _m, PAL.snowSide, PAL.snowBottom);
    }
  }
  _planks(x, y, z, w, d) {
    // líneas de tablones (decorativas, apenas sobresalen)
    const along = d > w; const n = Math.floor((along ? d : w) / 0.8);
    for (let i = 1; i < n; i++) {
      const t = -((along ? d : w) / 2) + i * ((along ? d : w) / n);
      _m.compose(_v.set(along ? x : x + t, y + 0.005, along ? z + t : z), _q.identity(), _s);
      this.decor.add(new THREE.BoxGeometry(along ? w * 0.98 : 0.06, 0.01, along ? 0.06 : d * 0.98), _m, PAL.woodSide, PAL.woodSide);
    }
  }
  _rockUnder(x, y, z, w, d) {
    const r = Math.min(Math.max(w, d) * 0.5, Math.min(w, d) * 0.75 + 0.5);
    const hgt = 1.5 + r * 0.9 + this.rand() * 1.2;
    const geo = new THREE.ConeGeometry(r, hgt, 7, 1);
    _q.setFromEuler(_e.set(Math.PI, this.rand() * 6, 0));
    _m.compose(_v.set(x, y - hgt / 2 + 0.02, z), _q, _s.set(w / (2 * r) * 0.95, 1, d / (2 * r) * 0.95));
    const rk = this.theme === 'lava' ? PAL.basaltSide : (this.theme === 'ice' ? PAL.iceSide : PAL.rock);
    const rkd = this.theme === 'lava' ? PAL.basaltBottom : (this.theme === 'ice' ? PAL.iceBottom : PAL.rockDark);
    this.decor.add(geo, _m, rk, rk, rkd);
    _s.set(1, 1, 1);
  }
  _cornerPillars(x, y, z, w, d) {
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const h = 0.8 + this.rand() * 2.2;
      this.pillar(x + sx * (w / 2 - 0.5), y, z + sz * (d / 2 - 0.5), h);
    }
  }
  pillar(x, y, z, h = 2, r = 0.38) {
    const c = new Collider('cyl', { pos: new THREE.Vector3(x, y + h / 2, z), r, h: h / 2 });
    this.colliders.push(c);
    _m.compose(_v.set(x, y + h / 2, z), _q.identity(), _s);
    const pc = this.theme === 'lava' ? PAL.basaltTop : (this.theme === 'ice' ? PAL.iceTop : PAL.pillar);
    const pb = this.theme === 'lava' ? PAL.basaltSide : (this.theme === 'ice' ? PAL.iceSide : PAL.marbleSide);
    this.merge.add(new THREE.CylinderGeometry(r * 0.9, r, h, 8), _m, pc, pc);
    _m.compose(_v.set(x, y + 0.12, z), _q.identity(), _s);
    this.merge.add(new THREE.BoxGeometry(r * 2.6, 0.24, r * 2.6), _m, pb, pb);
  }
  ramp(x1, y1, z1, x2, y2, z2, w, o = {}) {
    const p1 = new THREE.Vector3(x1, y1, z1), p2 = new THREE.Vector3(x2, y2, z2);
    const L = p1.distanceTo(p2), dir = p2.clone().sub(p1).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const xa = new THREE.Vector3().crossVectors(up, dir).normalize();
    const ya = new THREE.Vector3().crossVectors(dir, xa).normalize();
    const quat = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(xa, ya, dir));
    const h = o.h || 1;
    const mid = p1.clone().add(p2).multiplyScalar(0.5).addScaledVector(ya, -h / 2);
    const rc = this._staticBox(mid, quat, new THREE.Vector3(w / 2, h / 2, L / 2 + 0.05), o.type || this.defaultPlat);
    const rt = o.type || this.defaultPlat;
    if (rt === 'ice' || rt === 'packIce' || o.ice) rc.ice = true;
  }
  hex(x, y, z, r = 1.1, o = {}) {
    const h = o.h || 0.8;
    const c = new Collider('cyl', { pos: new THREE.Vector3(x, y - h / 2, z), r: r * 0.93, h: h / 2 });
    this.colliders.push(c); this.bounds.expandByPoint(c.pos);
    _m.compose(_v.set(x, y - h / 2, z), _q.setFromEuler(_e.set(0, Math.PI / 6, 0)), _s);
    const hxTop = this.theme === 'lava' ? PAL.ember : (this.theme === 'ice' ? PAL.crystal : PAL.hex);
    const hxSide = this.theme === 'lava' ? PAL.magmaDeep : (this.theme === 'ice' ? PAL.iceSide : PAL.hexSide);
    this.merge.add(new THREE.CylinderGeometry(r, r, h, 6), _m, hxTop, hxSide);
    _m.compose(_v.set(x, y - h - 0.6, z), _q.setFromEuler(_e.set(Math.PI, 0.3, 0)), _s);
    this.decor.add(new THREE.ConeGeometry(r * 0.8, 1.2, 6), _m, PAL.rock, PAL.rock);
    return c;
  }
  spikes(x, y, z, w, d) {
    // base roja + pinchos. Tocar = volver al checkpoint
    this._staticBox(new THREE.Vector3(x, y - 0.5, z), new THREE.Quaternion(), new THREE.Vector3(w / 2, 0.5, d / 2), [PAL.spikeBase, 0xd94f4f, 0xc04040]);
    this._boxCollider(new THREE.Vector3(x, y + 0.35, z), new THREE.Quaternion(), new THREE.Vector3(w / 2, 0.35, d / 2), { kind: 'kill' });
    const nx = Math.max(1, Math.round(w / 0.9)), nz = Math.max(1, Math.round(d / 0.9));
    for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) {
      _m.compose(_v.set(x - w / 2 + (i + 0.5) * w / nx, y + 0.35, z - d / 2 + (j + 0.5) * d / nz), _q.identity(), _s);
      this.merge.add(new THREE.ConeGeometry(0.28, 0.7, 4), _m, PAL.spike, PAL.spike);
    }
    this._rockUnder(x, y - 1, z, w, d);
  }
  coin(x, y, z) { this.coins.push({ pos: new THREE.Vector3(x, y + 0.85, z), taken: false }); }
  coinRow(x1, y1, z1, x2, y2, z2, n) {
    for (let i = 0; i < n; i++) { const t = n === 1 ? 0.5 : i / (n - 1); this.coin(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, z1 + (z2 - z1) * t); }
  }
  checkpoint(x, y, z) {
    const g = new THREE.Group(); g.position.set(x, y, z);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.4, 6), new THREE.MeshLambertMaterial({ color: 0xffffff }));
    pole.position.set(1.3, 1.2, 0); pole.castShadow = true; g.add(pole);
    const flagMat = new THREE.MeshLambertMaterial({ color: 0xb8c2cc, side: THREE.DoubleSide });
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.55), flagMat); flag.position.set(1.75, 2.05, 0); g.add(flag);
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.0, 1.25, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.03; g.add(ring);
    this.group.add(g);
    this.checkpoints.push({ pos: new THREE.Vector3(x, y + 0.55, z), active: false, group: g, flag, flagMat, ring });
  }
  crown(x, y, z) {
    this.crownPos = new THREE.Vector3(x, y + 1.1, z);
    const g = new THREE.Group(); g.position.copy(this.crownPos);
    const gold = new THREE.MeshLambertMaterial({ color: 0xffd23a, emissive: 0xff9d00, emissiveIntensity: 0.45 });
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.5, 0.35, 10, 1, true), gold); g.add(band);
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2; const sp = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.45, 5), gold);
      sp.position.set(Math.cos(a) * 0.5, 0.38, Math.sin(a) * 0.5); g.add(sp);
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.08), new THREE.MeshLambertMaterial({ color: [0xff4d6d, 0x4dd2ff, 0x7cff6b, 0xff4d6d, 0xb06bff][i], emissive: 0x330022 }));
      gem.position.set(Math.cos(a) * 0.56, 0.02, Math.sin(a) * 0.56); g.add(gem);
    }
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTex(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    glow.scale.set(3.2, 3.2, 1); g.add(glow);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 30, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff1a0, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
    beam.position.y = 15; g.add(beam);
    // pedestal
    this.plat(x, y + 0.25, z, 2.2, 2.2, { type: 'gold', h: 0.25, rock: false });
    this.group.add(g); this.crownObj = g;
  }
  wp(x, y, z, flag = '', speed = 0, extra = {}) { this.waypoints.push({ pos: new THREE.Vector3(x, y + 0.5, z), flag, speed, ...extra }); }
  disc(x, y, z, r, o = {}) {
    const h = o.h || 1;
    const c = new Collider('cyl', { pos: new THREE.Vector3(x, y - h / 2, z), r, h: h / 2 });
    this.colliders.push(c); this.bounds.expandByPoint(c.pos);
    _m.compose(_v.set(x, y - h / 2, z), _q.identity(), _s);
    const [t, sd, bt] = STYLE[o.type || this.defaultPlat];
    this.merge.add(new THREE.CylinderGeometry(r, r, h, 24), _m, t, sd, bt);
    // anillo decorativo de baldosas
    _m.compose(_v.set(x, y + 0.004, z), _q.identity(), _s);
    this.decor.add(new THREE.RingGeometry(r * 0.55, r * 0.6, 24).rotateX(-Math.PI / 2), _m, 0x9be86f, 0x9be86f);
    this._rockUnder(x, y - h, z, r * 2, r * 2);
    if (y < this.minY) this.minY = y;
    return c;
  }
  hint(t) { this.hintText = t; }

  // ---------- entidades dinámicas ----------
  _dynMesh(geo, color, opts = {}) {
    const m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color, ...opts }));
    m.castShadow = true; m.receiveShadow = true; this.group.add(m); return m;
  }
  mover(x, y, z, w, d, o = {}) {
    const h = o.h || 0.6, shape = o.shape || 'box';
    let geo, c;
    const base = new THREE.Vector3(x, y - h / 2, z);
    if (shape === 'hex') {
      geo = new THREE.CylinderGeometry(w / 2, w / 2, h, 6); geo.rotateY(Math.PI / 6);
      c = new Collider('cyl', { pos: base, r: w / 2 * 0.93, h: h / 2, kinematic: true });
    } else {
      geo = new THREE.BoxGeometry(w, h, d);
      c = new Collider('box', { pos: base, half: new THREE.Vector3(w / 2, h / 2, d / 2), kinematic: true });
    }
    const mc = o.color || (this.theme === 'lava' ? PAL.lavaMover : (this.theme === 'ice' ? PAL.iceTop : PAL.mover));
    const ms = o.side || (this.theme === 'lava' ? PAL.lavaMoverSide : (this.theme === 'ice' ? PAL.iceSide : PAL.moverSide));
    colorGeo(geo, mc, ms);
    const mesh = new THREE.Mesh(geo, this.mat); mesh.castShadow = mesh.receiveShadow = true; this.group.add(mesh);
    if (this.theme === 'ice') c.ice = true;
    this.colliders.push(c); this.bounds.expandByPoint(base);
    const to = new THREE.Vector3(...(o.to || [0, 0, 0]));
    const e = { type: 'mover', c, mesh, base, to, period: o.period || 4, phase: o.phase || 0, spin: o.spin || 0,
      update(t) {
        const k = 0.5 - 0.5 * Math.cos((t / this.period + this.phase) * Math.PI * 2);
        c.pos.copy(base).addScaledVector(to, k);
        if (this.spin) c.quat.setFromAxisAngle(_v.set(0, 1, 0), t * this.spin);
        c.commit(); mesh.position.copy(c.pos); mesh.quaternion.copy(c.quat);
      } };
    e.update(0); c.savePrev(); this.entities.push(e); return e;
  }
  hammer(x, y, z, o = {}) {
    // martillo pendular; axis = eje de giro ('z' -> oscila en X, cruzando un camino que va en Z)
    const len = o.len || 4.2, amp = (o.amp || 68) * Math.PI / 180, speed = o.speed || 1.6, phase = o.phase || 0;
    const axis = o.axis === 'x' ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1);
    const pivot = new THREE.Vector3(x, y + len + 0.75, z);
    // soporte (estático): dos postes a los lados y travesaño por encima del camino
    const across = o.axis === 'x' ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0);
    const span = len * Math.sin(amp) + 1.2;
    const bottom = y - 2.5;
    for (const s of [-1, 1]) {
      const p = pivot.clone().addScaledVector(across, s * span); p.y = (bottom + pivot.y + 0.4) / 2;
      _m.compose(p, _q.identity(), _s);
      this.decor.add(new THREE.BoxGeometry(0.45, pivot.y + 0.4 - bottom, 0.45), _m, PAL.marble, PAL.marbleSide);
      _m.compose(_v.copy(p).setY(bottom), _q.setFromEuler(_e.set(Math.PI, 0, 0)), _s);
      this.decor.add(new THREE.ConeGeometry(0.5, 1.4, 6), _m, PAL.rock, PAL.rock);
    }
    _m.compose(_v.copy(pivot).setY(pivot.y + 0.25), _q.setFromUnitVectors(new THREE.Vector3(1, 0, 0), across), _s);
    this.decor.add(new THREE.BoxGeometry(span * 2 + 0.6, 0.4, 0.45), _m, PAL.marble, PAL.marbleSide);
    const g = new THREE.Group(); g.position.copy(pivot); this.group.add(g);
    const armM = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, len, 6), new THREE.MeshLambertMaterial({ color: PAL.hammerArm }));
    armM.position.y = -len / 2; armM.castShadow = true; g.add(armM);
    const headGeo = o.axis === 'x' ? new THREE.CylinderGeometry(0.6, 0.6, 1.7, 10) : new THREE.CylinderGeometry(0.6, 0.6, 1.7, 10);
    // cabeza orientada en la dirección del golpe
    if (o.axis === 'x') headGeo.rotateX(Math.PI / 2); else headGeo.rotateZ(Math.PI / 2);
    const head = new THREE.Mesh(headGeo, new THREE.MeshLambertMaterial({ color: PAL.hammerHead })); head.position.y = -len; head.castShadow = true; g.add(head);
    for (const s of [-1, 1]) {
      const bg = new THREE.CylinderGeometry(0.63, 0.63, 0.16, 10);
      if (o.axis === 'x') bg.rotateX(Math.PI / 2); else bg.rotateZ(Math.PI / 2);
      const b = new THREE.Mesh(bg, new THREE.MeshLambertMaterial({ color: PAL.hammerBand })); b.position.copy(head.position);
      if (o.axis === 'x') b.position.z += s * 0.6; else b.position.x += s * 0.6; g.add(b);
    }
    const halfHead = o.axis === 'x' ? new THREE.Vector3(0.6, 0.6, 0.85) : new THREE.Vector3(0.85, 0.6, 0.6);
    const c = new Collider('box', { half: halfHead, kind: 'hammer', kinematic: true });
    const ca = new Collider('box', { half: new THREE.Vector3(0.12, len / 2 - 0.5, 0.12), kind: 'hammer', kinematic: true });
    this.colliders.push(c, ca);
    const e = { type: 'hammer', c, g, ph: 0,
      safe(lead = 0) { const p = this.ph + lead * speed; const sn = Math.sin(p), cs = Math.cos(p); return Math.abs(sn) > 0.3 && sn * cs > 0; },
      update(t) {
        this.ph = t * speed + phase;
        const a = amp * Math.sin(this.ph);
        g.quaternion.setFromAxisAngle(axis, a);
        c.quat.copy(g.quaternion); c.pos.set(0, -len, 0).applyQuaternion(g.quaternion).add(pivot); c.commit();
        ca.quat.copy(g.quaternion); ca.pos.set(0, -len / 2 + 0.3, 0).applyQuaternion(g.quaternion).add(pivot); ca.commit();
      } };
    e.update(0); c.savePrev(); ca.savePrev(); this.entities.push(e); return e;
  }
  turnstile(x, y, z, o = {}) {
    const arms = o.arms || 4, len = o.len || 4.5, speed = o.speed || 1.1, hh = o.h || 0.7;
    const hub = new Collider('cyl', { pos: new THREE.Vector3(x, y + 0.8, z), r: 0.6, h: 0.8 });
    this.colliders.push(hub);
    _m.compose(_v.set(x, y + 0.8, z), _q.identity(), _s);
    this.merge.add(new THREE.CylinderGeometry(0.6, 0.7, 1.6, 10), _m, PAL.gold, PAL.turn);
    const g = new THREE.Group(); g.position.set(x, y, z); this.group.add(g);
    const cols = [];
    const mat = new THREE.MeshLambertMaterial({ color: PAL.turn });
    const capMat = new THREE.MeshLambertMaterial({ color: PAL.gold });
    for (let i = 0; i < arms; i++) {
      const a = i / arms * Math.PI * 2;
      const arm = new THREE.Mesh(new THREE.BoxGeometry(len, hh, 0.45), mat);
      arm.position.set(Math.cos(a) * (len / 2 + 0.5), hh / 2 + 0.05, -Math.sin(a) * (len / 2 + 0.5)); arm.rotation.y = a; arm.castShadow = true; g.add(arm);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.3, hh + 0.1, 0.55), capMat); cap.position.set(len / 2, 0, 0); arm.add(cap);
      const c = new Collider('box', { half: new THREE.Vector3(len / 2, hh / 2, 0.24), kinematic: true, restitution: 0.3 });
      c.local = arm.position.clone(); c.localA = a; cols.push(c); this.colliders.push(c);
    }
    const e = { type: 'turn', g, cols,
      angle: 0,
      update(t) {
        const r = t * speed; g.rotation.y = r; this.angle = r;
        for (const c of cols) {
          c.quat.setFromAxisAngle(_v.set(0, 1, 0), r + c.localA);
          c.pos.copy(c.local).applyAxisAngle(_v, r).add(g.position); c.commit();
        }
      } };
    e.update(0); cols.forEach(c => c.savePrev()); this.entities.push(e); return e;
  }
  crumble(x, y, z, w = 2, d = 2) {
    const h = 0.5;
    const geo = new THREE.BoxGeometry(w * 0.96, h, d * 0.96); colorGeo(geo, PAL.crumble, PAL.crumbleSide);
    const mesh = new THREE.Mesh(geo, this.mat); mesh.castShadow = mesh.receiveShadow = true; this.group.add(mesh);
    // grietas
    const crack = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.7, 0.06), new THREE.MeshBasicMaterial({ color: 0xa8571c }));
    crack.rotation.set(-Math.PI / 2, 0, 0.6); crack.position.y = h / 2 + 0.01; mesh.add(crack);
    const crack2 = crack.clone(); crack2.rotation.z = -0.9; crack2.scale.x = 0.6; mesh.add(crack2);
    const base = new THREE.Vector3(x, y - h / 2, z);
    const c = new Collider('box', { pos: base, half: new THREE.Vector3(w / 2, h / 2, d / 2), kinematic: true });
    this.colliders.push(c); this.bounds.expandByPoint(base);
    const e = { type: 'crumble', c, mesh, base, state: 'idle', t: 0,
      touch() { if (this.state === 'idle') { this.state = 'shake'; this.t = 0; return true; } return false; },
      reset() { this.state = 'idle'; this.t = 0; c.active = true; mesh.visible = true; c.pos.copy(base); c.commit(true); mesh.position.copy(base); mesh.material = mesh.material; },
      update(t, dt) {
        this.t += dt;
        if (this.state === 'shake') {
          mesh.position.set(base.x + (Math.random() - 0.5) * 0.08, base.y, base.z + (Math.random() - 0.5) * 0.08);
          if (this.t > 0.6) { this.state = 'fall'; this.t = 0; this.vy = 0; }
        } else if (this.state === 'fall') {
          this.vy -= 20 * dt; c.pos.y += this.vy * dt; c.commit(); mesh.position.copy(c.pos);
          mesh.rotation.x += dt * 1.5;
          if (this.t > 0.12) c.active = false;
          if (this.t > 1.2) { this.state = 'gone'; this.t = 0; mesh.visible = false; }
        } else if (this.state === 'gone') {
          if (this.t > 3.0) { this.reset(); mesh.rotation.x = 0; mesh.scale.setScalar(0.01); this.state = 'grow'; this.t = 0; }
        } else if (this.state === 'grow') {
          mesh.scale.setScalar(Math.min(1, this.t * 3)); if (this.t > 0.34) { mesh.scale.setScalar(1); this.state = 'idle'; }
        }
      } };
    c.owner = e; e.reset(); this.entities.push(e); return e;
  }
  bumper(x, y, z, o = {}) {
    const r = o.r || 0.8;
    const g = new THREE.Group(); g.position.set(x, y, z); this.group.add(g);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.1, 0.9, 14), new THREE.MeshLambertMaterial({ color: PAL.bumper, emissive: 0x551133 }));
    body.position.y = 0.45; body.castShadow = true; g.add(body);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.75, r, 0.2, 14), new THREE.MeshLambertMaterial({ color: 0xffffff })); top.position.y = 1.0; g.add(top);
    const c = new Collider('cyl', { pos: new THREE.Vector3(x, y + 0.55, z), r, h: 0.55, kind: 'bumper' });
    this.colliders.push(c);
    const e = { type: 'bumper', c, g, hit: 0, update(t, dt) { this.hit = Math.max(0, this.hit - dt * 4); const s = 1 + Math.sin(this.hit * 12) * this.hit * 0.25; g.scale.set(s, 1 / s, s); } };
    c.owner = e; this.entities.push(e); return e;
  }
  spring(x, y, z, o = {}) {
    const g = new THREE.Group(); g.position.set(x, y, z); this.group.add(g);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, 0.2, 12), new THREE.MeshLambertMaterial({ color: 0x8892a0 })); base.position.y = 0.1; g.add(base);
    const coil = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.07, 6, 12), new THREE.MeshLambertMaterial({ color: 0xcfd6de }));
    coil.rotation.x = Math.PI / 2; coil.position.y = 0.3; g.add(coil);
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.18, 12), new THREE.MeshLambertMaterial({ color: PAL.spring, emissive: 0x443300 }));
    pad.position.y = 0.45; pad.castShadow = true; g.add(pad);
    const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.35, 3), new THREE.MeshBasicMaterial({ color: 0xff8c1a }));
    arrow.position.y = 0.6; g.add(arrow);
    const c = new Collider('cyl', { pos: new THREE.Vector3(x, y + 0.27, z), r: 0.75, h: 0.27, kind: 'spring' });
    this.colliders.push(c);
    const e = { type: 'spring', c, g, pad, power: o.power || 17, hit: 0,
      update(t, dt) { this.hit = Math.max(0, this.hit - dt * 3); pad.position.y = 0.45 + Math.sin(this.hit * 9) * this.hit * 0.35; arrow.rotation.y += dt * 2; } };
    c.owner = e; this.entities.push(e); return e;
  }


  // ---------- obstáculos Mundo 2 (lava) ----------
  sink(x, y, z, w = 2.4, d = 2.4, o = {}) {
    // Plataforma que se hunde en la lava al pisarla
    const h = o.h || 0.55;
    const geo = new THREE.BoxGeometry(w * 0.96, h, d * 0.96);
    colorGeo(geo, PAL.lavaCrumb, PAL.lavaCrumbSide);
    const mesh = new THREE.Mesh(geo, this.mat); mesh.castShadow = mesh.receiveShadow = true; this.group.add(mesh);
    const glow = new THREE.Mesh(new THREE.BoxGeometry(w * 0.7, 0.04, d * 0.7), new THREE.MeshBasicMaterial({ color: 0xff6a1a, transparent: true, opacity: 0.55 }));
    glow.position.y = h / 2 + 0.01; mesh.add(glow);
    const base = new THREE.Vector3(x, y - h / 2, z);
    const c = new Collider('box', { pos: base, half: new THREE.Vector3(w / 2, h / 2, d / 2), kinematic: true });
    this.colliders.push(c); this.bounds.expandByPoint(base);
    const delay = o.delay || 0.85, sinkSpeed = o.speed || 2.8;
    const e = { type: 'sink', c, mesh, base, state: 'idle', t: 0,
      touch() { if (this.state === 'idle') { this.state = 'warn'; this.t = 0; return true; } return false; },
      reset() { this.state = 'idle'; this.t = 0; c.active = true; mesh.visible = true; c.pos.copy(base); c.commit(true); mesh.position.copy(base); mesh.rotation.set(0, 0, 0); mesh.scale.setScalar(1); glow.material.opacity = 0.55; },
      update(t, dt) {
        this.t += dt;
        if (this.state === 'warn') {
          mesh.position.set(base.x + (Math.random() - 0.5) * 0.06, base.y, base.z + (Math.random() - 0.5) * 0.06);
          glow.material.opacity = 0.55 + Math.sin(this.t * 20) * 0.35;
          if (this.t > delay) { this.state = 'sink'; this.t = 0; }
        } else if (this.state === 'sink') {
          c.pos.y -= sinkSpeed * dt; c.commit(); mesh.position.copy(c.pos);
          if (this.t > 0.15) c.active = false;
          if (c.pos.y < base.y - 4) { this.state = 'gone'; this.t = 0; mesh.visible = false; }
        } else if (this.state === 'gone') {
          if (this.t > 2.8) { this.reset(); mesh.scale.setScalar(0.01); this.state = 'grow'; this.t = 0; }
        } else if (this.state === 'grow') {
          mesh.scale.setScalar(Math.min(1, this.t * 3)); if (this.t > 0.34) { mesh.scale.setScalar(1); this.state = 'idle'; }
        }
      } };
    c.owner = e; e.reset(); this.entities.push(e); return e;
  }
  fireJet(x, y, z, o = {}) {
    // Pilar/géiser de lava que sube y baja a ritmo
    const period = o.period || 2.8, phase = o.phase || 0, hMax = o.h || 3.2, r = o.r || 0.55;
    const g = new THREE.Group(); g.position.set(x, y, z); this.group.add(g);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.4, r * 1.6, 0.25, 10), new THREE.MeshLambertMaterial({ color: PAL.basaltSide }));
    base.position.y = 0.12; g.add(base);
    const jetMat = new THREE.MeshLambertMaterial({ color: 0xff5510, emissive: 0xff3300, emissiveIntensity: 0.85 });
    const jet = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.7, r, 1, 10), jetMat);
    jet.position.y = 0.5; g.add(jet);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(r * 0.85, 0.55, 8), new THREE.MeshLambertMaterial({ color: 0xffe066, emissive: 0xff8800, emissiveIntensity: 0.7 }));
    tip.position.y = 1.1; g.add(tip);
    const c = new Collider('cyl', { pos: new THREE.Vector3(x, y + 0.5, z), r: r * 0.85, h: 0.5, kind: 'kill', kinematic: true });
    this.colliders.push(c);
    const e = { type: 'fireJet', c, g, jet, tip, period, phase, hMax, r,
      safe(lead = 0) {
        let u = ((this._u || 0) + lead / this.period) % 1;
        if (u < 0) u += 1;
        // solo seguro cuando está abajo del todo
        return u < 0.30 || u > 0.90;
      },
      update(t) {
        const u = ((t / this.period + this.phase) % 1 + 1) % 1; this._u = u;
        // 0-0.35 down, 0.35-0.45 rising, 0.45-0.7 up, 0.7-0.85 falling
        let h = 0.15;
        if (u < 0.35) h = 0.15;
        else if (u < 0.45) h = 0.15 + (u - 0.35) / 0.1 * this.hMax;
        else if (u < 0.7) h = this.hMax;
        else if (u < 0.85) h = this.hMax * (1 - (u - 0.7) / 0.15);
        else h = 0.15;
        jet.scale.y = Math.max(0.08, h);
        jet.position.y = h / 2;
        tip.position.y = h + 0.15;
        tip.visible = h > 0.4;
        c.pos.set(x, y + h / 2, z); c.h = Math.max(0.08, h / 2); c.r = this.r * 0.85; c.active = h > 0.55; c.commit();
        jetMat.emissiveIntensity = 0.5 + Math.sin(t * 10) * 0.25;
      } };
    e.update(0); c.savePrev(); this.entities.push(e); return e;
  }
  boulder(x, y, z, o = {}) {
    // Roca rodante que va y vuelve; empuja la bola
    const r = o.r || 0.85, to = new THREE.Vector3(...(o.to || [0, 0, -10]));
    const period = o.period || 5, phase = o.phase || 0;
    const base = new THREE.Vector3(x, y + r, z);
    const geo = new THREE.IcosahedronGeometry(r, 1);
    colorGeo(geo, PAL.basaltTop, PAL.basaltSide);
    const mesh = new THREE.Mesh(geo, this.mat); mesh.castShadow = true; this.group.add(mesh);
    const c = new Collider('cyl', { pos: base.clone(), r: r * 0.92, h: r * 0.92, kinematic: true, restitution: 0.4 });
    this.colliders.push(c);
    const e = { type: 'boulder', c, mesh, base, to, period, phase, r,
      update(t) {
        const k = 0.5 - 0.5 * Math.cos((t / this.period + this.phase) * Math.PI * 2);
        c.pos.copy(base).addScaledVector(to, k);
        c.commit(); mesh.position.copy(c.pos);
        const dist = to.length() * Math.sin((t / this.period + this.phase) * Math.PI * 2) * Math.PI / this.period;
        mesh.rotation.x = (c.pos.z - base.z) / r; mesh.rotation.z = -(c.pos.x - base.x) / r;
        void dist;
      } };
    e.update(0); c.savePrev(); this.entities.push(e); return e;
  }
  convey(x, y, z, w, d, o = {}) {
    // Cinta transportadora: empuja la bola en dirección dir
    const h = o.h || 0.45;
    const dir = o.dir || [0, 0, -1];
    const speed = o.speed || 5.5;
    const len = Math.hypot(dir[0], dir[2]) || 1;
    const vx = dir[0] / len * speed, vz = dir[2] / len * speed;
    const geo = new THREE.BoxGeometry(w, h, d);
    colorGeo(geo, PAL.convey, PAL.conveySide);
    const mesh = new THREE.Mesh(geo, this.mat); mesh.castShadow = mesh.receiveShadow = true; this.group.add(mesh);
    // flechas decorativas
    const arrows = new THREE.Group(); mesh.add(arrows);
    const nArr = Math.max(1, Math.floor(Math.max(w, d) / 1.6));
    for (let i = 0; i < nArr; i++) {
      const a = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.4, 3), new THREE.MeshBasicMaterial({ color: 0xffe08a }));
      a.rotation.x = Math.PI / 2;
      const t = (i + 0.5) / nArr - 0.5;
      if (Math.abs(dir[2]) >= Math.abs(dir[0])) a.position.set(0, h / 2 + 0.02, t * d * 0.7);
      else { a.rotation.z = -Math.PI / 2; a.position.set(t * w * 0.7, h / 2 + 0.02, 0); }
      arrows.add(a);
    }
    const base = new THREE.Vector3(x, y - h / 2, z);
    mesh.position.copy(base);
    const c = new Collider('box', { pos: base, half: new THREE.Vector3(w / 2, h / 2, d / 2) });
    c.convey = { x: vx, z: vz };
    this.colliders.push(c); this.bounds.expandByPoint(base);
    const e = { type: 'convey', c, mesh, arrows, update(t) { arrows.position.z = Math.sin(t * 3) * 0.05; } };
    this.entities.push(e); return e;
  }


  // ---------- obstáculos Mundo 3 (hielo) ----------
  wind(x, y, z, w, d, o = {}) {
    // Zona de viento: empuja la bola; partículas visibles indican la dirección
    const dir = o.dir || [1, 0, 0];
    const len = Math.hypot(dir[0], dir[2]) || 1;
    const force = o.force || 14;
    const fx = dir[0] / len * force, fz = dir[2] / len * force;
    const g = new THREE.Group(); g.position.set(x, y, z); this.group.add(g);
    // ventilador decorativo
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.3, 10), new THREE.MeshLambertMaterial({ color: 0x8ab4d0 }));
    base.position.set(-Math.sign(fx || 1) * (w / 2 - 0.4), 0.4, -Math.sign(fz || 0) * (d / 2 - 0.4));
    if (Math.abs(fx) >= Math.abs(fz)) base.position.set(-Math.sign(fx) * (w / 2 + 0.2), 0.5, 0);
    else base.position.set(0, 0.5, -Math.sign(fz) * (d / 2 + 0.2));
    g.add(base);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8), new THREE.MeshLambertMaterial({ color: PAL.windFan }));
    hub.position.copy(base.position); hub.position.y += 0.6; g.add(hub);
    const blades = new THREE.Group(); blades.position.copy(hub.position);
    for (let i = 0; i < 3; i++) {
      const bl = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.35), new THREE.MeshLambertMaterial({ color: 0xd0f0ff, transparent: true, opacity: 0.85 }));
      bl.rotation.y = i * Math.PI * 2 / 3; blades.add(bl);
    }
    g.add(blades);
    // zona invisible (AABB) + flechas de partículas (sprites simples)
    const arrows = [];
    for (let i = 0; i < 6; i++) {
      const a = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.45, 4), new THREE.MeshBasicMaterial({ color: 0xa0e0ff, transparent: true, opacity: 0.55 }));
      if (Math.abs(fx) >= Math.abs(fz)) { a.rotation.z = -Math.PI / 2 * Math.sign(fx); a.position.set((i / 5 - 0.5) * w * 0.7, 0.9, (Math.random() - 0.5) * d * 0.5); }
      else { a.rotation.x = Math.PI / 2 * Math.sign(fz); a.position.set((Math.random() - 0.5) * w * 0.5, 0.9, (i / 5 - 0.5) * d * 0.7); }
      g.add(a); arrows.push(a);
    }
    const half = new THREE.Vector3(w / 2, 2.2, d / 2);
    const e = { type: 'wind', g, blades, arrows, force: { x: fx, z: fz },
      min: new THREE.Vector3(x - half.x, y - 0.2, z - half.z),
      max: new THREE.Vector3(x + half.x, y + 3.5, z + half.z),
      contains(p) { return p.x >= this.min.x && p.x <= this.max.x && p.y >= this.min.y && p.y <= this.max.y && p.z >= this.min.z && p.z <= this.max.z; },
      update(t) {
        blades.rotation.y = t * 8;
        for (let i = 0; i < arrows.length; i++) {
          const a = arrows[i];
          const u = (t * 1.5 + i * 0.2) % 1;
          a.material.opacity = 0.25 + u * 0.5;
          if (Math.abs(fx) >= Math.abs(fz)) a.position.x = (u - 0.5) * w * 0.85 * Math.sign(fx || 1);
          else a.position.z = (u - 0.5) * d * 0.85 * Math.sign(fz || 1);
        }
      } };
    this.entities.push(e); this.bounds.expandByPoint(new THREE.Vector3(x, y, z)); return e;
  }
  crackIce(x, y, z, w = 2.6, d = 2.6, o = {}) {
    // Hielo que se rompe al pisarlo (como baldosa hundible, tema hielo)
    const h = o.h || 0.45;
    const geo = new THREE.BoxGeometry(w * 0.96, h, d * 0.96); colorGeo(geo, PAL.crackIce, PAL.iceSide);
    const mesh = new THREE.Mesh(geo, this.mat); mesh.castShadow = mesh.receiveShadow = true; this.group.add(mesh);
    const crack = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.6, 0.05), new THREE.MeshBasicMaterial({ color: 0x4a90b8 }));
    crack.rotation.set(-Math.PI / 2, 0, 0.5); crack.position.y = h / 2 + 0.01; mesh.add(crack);
    const crack2 = crack.clone(); crack2.rotation.z = -0.8; crack2.scale.x = 0.7; mesh.add(crack2);
    const base = new THREE.Vector3(x, y - h / 2, z);
    const c = new Collider('box', { pos: base, half: new THREE.Vector3(w / 2, h / 2, d / 2), kinematic: true });
    c.ice = true;
    this.colliders.push(c); this.bounds.expandByPoint(base);
    const delay = o.delay || 0.7;
    const e = { type: 'crackIce', c, mesh, base, state: 'idle', t: 0,
      touch() { if (this.state === 'idle') { this.state = 'warn'; this.t = 0; return true; } return false; },
      reset() { this.state = 'idle'; this.t = 0; c.active = true; mesh.visible = true; c.pos.copy(base); c.commit(true); mesh.position.copy(base); mesh.rotation.set(0, 0, 0); mesh.scale.setScalar(1); },
      update(t, dt) {
        this.t += dt;
        if (this.state === 'warn') {
          mesh.position.set(base.x + (Math.random() - 0.5) * 0.05, base.y, base.z + (Math.random() - 0.5) * 0.05);
          if (this.t > delay) { this.state = 'fall'; this.t = 0; this.vy = 0; }
        } else if (this.state === 'fall') {
          this.vy -= 18 * dt; c.pos.y += this.vy * dt; c.commit(); mesh.position.copy(c.pos);
          mesh.rotation.x += dt * 2; mesh.rotation.z += dt;
          if (this.t > 0.1) c.active = false;
          if (this.t > 1.0) { this.state = 'gone'; this.t = 0; mesh.visible = false; }
        } else if (this.state === 'gone') {
          if (this.t > 2.5) { this.reset(); mesh.scale.setScalar(0.01); this.state = 'grow'; this.t = 0; }
        } else if (this.state === 'grow') {
          mesh.scale.setScalar(Math.min(1, this.t * 3)); if (this.t > 0.34) { mesh.scale.setScalar(1); this.state = 'idle'; }
        }
      } };
    c.owner = e; e.reset(); this.entities.push(e); return e;
  }
  snowBump(x, y, z, o = {}) {
    // Montículo de nieve elástico
    const r = o.r || 1.1, power = o.power || 12;
    const g = new THREE.Group(); g.position.set(x, y, z); this.group.add(g);
    const mound = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: PAL.snowBounce }));
    mound.scale.set(1.15, 0.7, 1.15); mound.position.y = 0.05; mound.castShadow = true; g.add(mound);
    const c = new Collider('cyl', { pos: new THREE.Vector3(x, y + r * 0.25, z), r: r * 0.95, h: r * 0.35, kind: 'spring' });
    this.colliders.push(c);
    const e = { type: 'snowBump', c, g, mound, power, hit: 0,
      update(t, dt) { this.hit = Math.max(0, this.hit - dt * 3); const s = 1 + Math.sin(this.hit * 10) * this.hit * 0.2; mound.scale.set(1.15 * s, 0.7 / s, 1.15 * s); } };
    c.owner = e; this.entities.push(e); return e;
  }
  icePush(x, y, z, w, d, o = {}) {
    // Bloque de hielo que empuja (mover cinemático)
    const e = this.mover(x, y, z, w, d, { ...o, color: PAL.iceTop, side: PAL.iceSide, h: o.h || 0.7 });
    e.c.ice = true; return e;
  }
  icicle(x, y, z, o = {}) {
    // Carámbano que cae a ritmo; sombra de aviso en el suelo
    const period = o.period || 3.6, phase = o.phase || 0, dropH = o.dropH || 5.5;
    const g = new THREE.Group(); g.position.set(x, y + dropH, z); this.group.add(g);
    const ice = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.4, 6), new THREE.MeshLambertMaterial({ color: PAL.icicle, transparent: true, opacity: 0.92, emissive: 0x88ccff, emissiveIntensity: 0.15 }));
    ice.rotation.x = Math.PI; ice.castShadow = true; g.add(ice);
    // sombra de aviso en el suelo
    const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.5, 16), new THREE.MeshBasicMaterial({ color: 0x224466, transparent: true, opacity: 0.25 }));
    shadow.rotation.x = -Math.PI / 2; shadow.position.set(x, y + 0.04, z); this.group.add(shadow);
    const c = new Collider('cyl', { pos: new THREE.Vector3(x, y + dropH, z), r: 0.32, h: 0.6, kind: 'kill', kinematic: true });
    this.colliders.push(c);
    const e = { type: 'icicle', c, g, ice, shadow, period, phase, dropH, homeY: y + dropH, groundY: y,
      safe(lead = 0) {
        let u = ((this._u || 0) + lead / this.period) % 1; if (u < 0) u += 1;
        return u < 0.42 || u > 0.75; // arriba o ya reset
      },
      // ¿Hay tiempo para cruzar antes de que caiga?
      canCross(travel = 1.2) {
        const u = this._u || 0, fallAt = 0.50;
        if (u >= 0.42 && u < 0.75) return false;
        const left = u < fallAt ? (fallAt - u) * this.period : (1 - u + fallAt) * this.period;
        return left >= travel;
      },
      update(t) {
        const u = ((t / this.period + this.phase) % 1 + 1) % 1; this._u = u;
        // 0-0.50 hang + sombra, 0.50-0.62 cae, 0.62-0.75 impacto, 0.75-1 sube
        let py = this.homeY, active = false, sop = 0.15;
        if (u < 0.50) { py = this.homeY; sop = 0.15 + u / 0.50 * 0.5; }
        else if (u < 0.62) {
          const k = (u - 0.50) / 0.12;
          py = this.homeY + (this.groundY + 0.7 - this.homeY) * k * k;
          active = true; sop = 0.65;
        } else if (u < 0.75) { py = this.groundY + 0.7; active = true; sop = 0.35; }
        else { py = this.homeY; sop = 0.12; }
        g.position.y = py; ice.visible = u < 0.75 || u > 0.88;
        shadow.material.opacity = sop;
        const sc = 0.45 + sop * 0.8; shadow.scale.set(sc, sc, sc);
        c.pos.set(x, py, z); c.active = active; c.commit();
      } };
    e.update(0); c.savePrev(); this.entities.push(e); return e;
  }
  iceConvey(x, y, z, w, d, o = {}) {
    const e = this.convey(x, y, z, w, d, o);
    // recolorear a hielo y marcar fricción de hielo
    e.c.ice = true;
    e.mesh.geometry.dispose();
    const h = o.h || 0.45;
    const geo = new THREE.BoxGeometry(w, h, d); colorGeo(geo, PAL.iceTop, PAL.iceSide);
    e.mesh.geometry = geo;
    return e;
  }

  // ---------- finalizar ----------
  finish() {
    const mesh = this.merge.build(this.mat); mesh.castShadow = true; mesh.receiveShadow = true; this.group.add(mesh);
    this._decorScenery();
    const dmesh = this.decor.build(this.mat); dmesh.receiveShadow = true; this.group.add(dmesh);
    this.staticMesh = mesh;
    // monedas: una sola draw call
    const cg = new THREE.CylinderGeometry(0.36, 0.36, 0.1, 14); cg.rotateX(Math.PI / 2);
    this.coinMesh = new THREE.InstancedMesh(cg, new THREE.MeshLambertMaterial({ color: 0xffd23a, emissive: 0xffa000, emissiveIntensity: 0.5 }), Math.max(1, this.coins.length));
    this.coinMesh.castShadow = true; this.group.add(this.coinMesh);
    this.coinMesh.count = this.coins.length;
    this.killY = this.minY - (this.theme === 'lava' ? 6 : (this.theme === 'ice' ? 10 : 14));
    if (this.theme === 'lava') this._lavaSea();
    if (this.theme === 'ice') this._snowFloor();
    this.updateCoins(0);
  }
  _lavaSea() {
    const b = this.bounds.clone(); b.expandByScalar(30);
    const w = Math.max(80, b.max.x - b.min.x + 40), d = Math.max(100, b.max.z - b.min.z + 50);
    const y = this.minY - 3.2;
    const geo = new THREE.PlaneGeometry(w, d, 1, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0xff3a0a, transparent: true, opacity: 0.92 });
    const sea = new THREE.Mesh(geo, mat);
    sea.rotation.x = -Math.PI / 2; sea.position.set((b.min.x + b.max.x) / 2, y, (b.min.z + b.max.z) / 2);
    this.group.add(sea); this.lavaSea = sea;
    // brillo / capa superior
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.98, d * 0.98), new THREE.MeshBasicMaterial({
      color: 0xffb020, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    glow.rotation.x = -Math.PI / 2; glow.position.set(sea.position.x, y + 0.08, sea.position.z);
    this.group.add(glow); this.lavaGlow = glow;
    // islas de escoria flotantes en la lava (decor)
    for (let i = 0; i < 10; i++) {
      const x = sea.position.x + (this.rand() - 0.5) * w * 0.7;
      const z = sea.position.z + (this.rand() - 0.5) * d * 0.7;
      _m.compose(_v.set(x, y + 0.15, z), _q.identity(), _s);
      this.decor.add(new THREE.CylinderGeometry(0.8 + this.rand(), 1.1 + this.rand(), 0.35, 6), _m, PAL.basalt, PAL.basaltSide);
    }
  }
  _snowFloor() {
    const b = this.bounds.clone(); b.expandByScalar(28);
    const w = Math.max(70, b.max.x - b.min.x + 40), d = Math.max(90, b.max.z - b.min.z + 40);
    const y = this.minY - 4.5;
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshLambertMaterial({ color: 0x7ab0d0 }));
    sea.rotation.x = -Math.PI / 2; sea.position.set((b.min.x + b.max.x) / 2, y, (b.min.z + b.max.z) / 2);
    this.group.add(sea); this.snowFloor = sea;
  }
  _decorScenery() {
    const b = this.bounds.clone(); b.expandByScalar(4);
    const cx = (b.min.x + b.max.x) / 2, cz = (b.min.z + b.max.z) / 2, sz = Math.max(b.max.z - b.min.z, 30);
    const lava = this.theme === 'lava', ice = this.theme === 'ice';
    for (let i = 0; i < 16; i++) {
      const side = i % 2 ? 1 : -1;
      const x = cx + side * (18 + this.rand() * 26), z = b.min.z + this.rand() * sz, y = -6 + this.rand() * 14;
      const r = 1.5 + this.rand() * 3;
      _m.compose(_v.set(x, y, z), _q.identity(), _s);
      if (lava) {
        this.decor.add(new THREE.CylinderGeometry(r, r * 0.85, 0.9, 7), _m, PAL.basaltTop, PAL.basaltSide);
        _m.compose(_v.set(x, y - 0.4 - r * 0.9, z), _q.setFromEuler(_e.set(Math.PI, 0, 0)), _s);
        this.decor.add(new THREE.ConeGeometry(r * 0.95, r * 1.6, 7), _m, PAL.basaltSide, PAL.basaltSide, PAL.basaltBottom);
        if (this.rand() < 0.45) {
          const h = 2 + this.rand() * 5;
          _m.compose(_v.set(x + 0.2, y + 0.4 + h / 2, z), _q.identity(), _s);
          this.decor.add(new THREE.ConeGeometry(0.55, h, 6), _m, PAL.basalt, PAL.basaltSide);
        }
      } else if (ice) {
        this.decor.add(new THREE.CylinderGeometry(r, r * 0.9, 0.7, 7), _m, PAL.snow, PAL.iceSide);
        _m.compose(_v.set(x, y - 0.3 - r * 0.8, z), _q.setFromEuler(_e.set(Math.PI, 0, 0)), _s);
        this.decor.add(new THREE.ConeGeometry(r * 0.9, r * 1.3, 7), _m, PAL.iceSide, PAL.iceSide, PAL.iceBottom);
        if (this.rand() < 0.5) {
          const h = 1.5 + this.rand() * 4;
          _m.compose(_v.set(x + 0.2, y + 0.3 + h / 2, z), _q.identity(), _s);
          this.decor.add(new THREE.ConeGeometry(0.4, h, 5), _m, PAL.icicle, PAL.iceSide);
        }
      } else {
        this.decor.add(new THREE.CylinderGeometry(r, r * 0.9, 0.8, 7), _m, PAL.grass, PAL.grassSide);
        _m.compose(_v.set(x, y - 0.4 - r * 0.7, z), _q.setFromEuler(_e.set(Math.PI, 0, 0)), _s);
        this.decor.add(new THREE.ConeGeometry(r * 0.9, r * 1.4, 7), _m, PAL.rock, PAL.rock, PAL.rockDark);
        if (this.rand() < 0.6) {
          const h = 1 + this.rand() * 3;
          _m.compose(_v.set(x + 0.3, y + 0.4 + h / 2, z), _q.identity(), _s);
          this.decor.add(new THREE.CylinderGeometry(0.35, 0.4, h, 8), _m, PAL.pillar, PAL.pillar);
        }
      }
    }
    if (!lava && !ice) {
      for (let i = 0; i < 14; i++) {
        const x = cx + (this.rand() - 0.5) * 90, z = b.min.z + this.rand() * sz, y = -16 + this.rand() * 8;
        for (let k = 0; k < 3; k++) {
          const r = 1.6 + this.rand() * 1.8;
          _m.compose(_v.set(x + k * 1.8 - 1.8, y + (k === 1 ? 0.6 : 0), z + this.rand()), _q.identity(), _s.set(1.3, 0.7, 1));
          this.decor.add(new THREE.IcosahedronGeometry(r, 0), _m, PAL.cloud, 0xf3f8ff, 0xdfe9f5);
        }
        _s.set(1, 1, 1);
      }
    } else if (ice) {
      for (let i = 0; i < 12; i++) {
        const x = cx + (this.rand() - 0.5) * 80, z = b.min.z + this.rand() * sz, y = 6 + this.rand() * 16;
        const r = 1.2 + this.rand() * 2;
        _m.compose(_v.set(x, y, z), _q.identity(), _s.set(1.5, 0.7, 1.2));
        this.decor.add(new THREE.IcosahedronGeometry(r, 0), _m, 0xffffff, 0xe8f4ff, 0xd0e8f8);
        _s.set(1, 1, 1);
      }
    } else {
      // humo / ceniza lejana
      for (let i = 0; i < 12; i++) {
        const x = cx + (this.rand() - 0.5) * 80, z = b.min.z + this.rand() * sz, y = 8 + this.rand() * 18;
        const r = 1.4 + this.rand() * 2.2;
        _m.compose(_v.set(x, y, z), _q.identity(), _s.set(1.4, 0.8, 1.2));
        this.decor.add(new THREE.IcosahedronGeometry(r, 0), _m, 0x5a4a42, 0x3a3028, 0x2a2018);
        _s.set(1, 1, 1);
      }
    }
  }
  updateCoins(t) {
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
    for (let i = 0; i < this.coins.length; i++) {
      const c = this.coins[i];
      const sc = c.taken ? 0 : 1;
      s.set(sc, sc, sc); q.setFromAxisAngle(_v.set(0, 1, 0), t * 2.5 + i * 0.5);
      p.copy(c.pos); p.y += Math.sin(t * 3 + i) * 0.08;
      m.compose(p, q, s); this.coinMesh.setMatrixAt(i, m);
    }
    this.coinMesh.instanceMatrix.needsUpdate = true;
  }
  savePrev() { for (const c of this.colliders) if (c.kinematic) c.savePrev(); }
  update(dt) {
    this.time += dt;
    for (const e of this.entities) e.update(this.time, dt);
    if (this.lavaGlow) this.lavaGlow.material.opacity = 0.28 + Math.sin(this.time * 2.2) * 0.12;
    if (this.lavaSea) this.lavaSea.material.color.setRGB(1, 0.18 + Math.sin(this.time * 1.5) * 0.06, 0.04);
  }
  resetDynamic() {
    for (const e of this.entities) {
      if (e.type === 'crumble' || e.type === 'sink' || e.type === 'crackIce') { e.reset(); if (e.mesh) { e.mesh.rotation.x = 0; e.mesh.scale.setScalar(1); } }
    }
  }
  dispose() {
    this.scene.remove(this.group);
    this.group.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material && o.material !== this.mat) o.material.dispose(); });
    this.mat.dispose();
  }
}

function colorGeo(geo, top, side) {
  const g = geo; const n = g.attributes.normal.array; const cols = new Float32Array(n.length);
  const a = new THREE.Color(top), b = new THREE.Color(side);
  for (let i = 0; i < n.length; i += 3) { const c = n[i + 1] > 0.5 ? a : b; cols[i] = c.r; cols[i + 1] = c.g; cols[i + 2] = c.b; }
  g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
}
