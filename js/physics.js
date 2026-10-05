// Física ligera: esfera contra cajas orientadas (OBB) y cilindros.
// Pensada para ser indulgente: sin trabarse en bordes, coyote time y buffer de salto.
import * as THREE from 'three';

const _v = new THREE.Vector3(), _l = new THREE.Vector3(), _c = new THREE.Vector3(), _n = new THREE.Vector3();
const _w = new THREE.Vector3(), _pv = new THREE.Vector3(), _q = new THREE.Quaternion();

export const PHYS = {
  g: 25, radius: 0.5,
  accelGround: 30, accelAir: 11, maxSpeed: 8.2,
  frictionIdle: 4.5, frictionMove: 1.0, airDrag: 0.25,
  jumpV: 9.0, coyote: 0.13, buffer: 0.14, slopeGravity: 0.45,
};

export class Collider {
  constructor(type, opts) {
    this.type = type;              // 'box' | 'cyl'
    this.pos = new THREE.Vector3();
    this.quat = new THREE.Quaternion();
    this.inv = new THREE.Quaternion();
    this.half = opts.half ? opts.half.clone() : new THREE.Vector3(0.5, 0.5, 0.5);
    this.r = opts.r || 1; this.h = opts.h || 0.5; // cilindro: radio y media altura
    this.kind = opts.kind || 'solid'; // solid | kill | bumper | spring | hammer
    this.owner = opts.owner || null;
    this.active = true;
    this.kinematic = !!opts.kinematic;
    this.restitution = opts.restitution || 0;
    this.prevPos = new THREE.Vector3(); this.prevQuat = new THREE.Quaternion();
    this.bound = 1;
    if (opts.pos) this.pos.copy(opts.pos);
    if (opts.quat) this.quat.copy(opts.quat);
    this.commit(true);
  }
  computeBound() {
    this.bound = this.type === 'box' ? this.half.length() : Math.hypot(this.r, this.h);
  }
  // Guardar transform anterior (para arrastrar la bola en plataformas móviles)
  savePrev() { this.prevPos.copy(this.pos); this.prevQuat.copy(this.quat); }
  commit(reset) {
    this.inv.copy(this.quat).invert();
    this.computeBound();
    if (reset) this.savePrev();
  }
  // Desplazamiento que sufrió un punto p pegado al collider en el último paso
  pointDelta(p, out) {
    _q.copy(this.prevQuat).invert();
    out.copy(p).sub(this.prevPos).applyQuaternion(_q).applyQuaternion(this.quat).add(this.pos).sub(p);
    return out;
  }
  // Devuelve profundidad (>0 si hay contacto) y escribe normal en outN
  sphere(center, radius, outN) {
    _l.copy(center).sub(this.pos).applyQuaternion(this.inv);
    if (this.type === 'box') {
      const hx = this.half.x, hy = this.half.y, hz = this.half.z;
      _c.set(THREE.MathUtils.clamp(_l.x, -hx, hx), THREE.MathUtils.clamp(_l.y, -hy, hy), THREE.MathUtils.clamp(_l.z, -hz, hz));
      _v.copy(_l).sub(_c);
      let d2 = _v.lengthSq();
      if (d2 > radius * radius) return 0;
      if (d2 > 1e-10) {
        const d = Math.sqrt(d2);
        outN.copy(_v).multiplyScalar(1 / d).applyQuaternion(this.quat);
        return radius - d;
      }
      // Centro dentro de la caja: salir por la cara más cercana (preferimos arriba)
      const dx = hx - Math.abs(_l.x), dy = hy - Math.abs(_l.y), dz = hz - Math.abs(_l.z);
      if (dy <= dx + 0.3 && dy <= dz + 0.3 && _l.y > -hy * 0.2) { outN.set(0, 1, 0).applyQuaternion(this.quat); return dy + radius; }
      if (dx < dz) { outN.set(Math.sign(_l.x) || 1, 0, 0).applyQuaternion(this.quat); return dx + radius; }
      outN.set(0, 0, Math.sign(_l.z) || 1).applyQuaternion(this.quat); return dz + radius;
    } else {
      const R = this.r, H = this.h;
      const rl = Math.hypot(_l.x, _l.z);
      const k = rl > R ? R / rl : 1;
      _c.set(_l.x * k, THREE.MathUtils.clamp(_l.y, -H, H), _l.z * k);
      _v.copy(_l).sub(_c);
      const d2 = _v.lengthSq();
      if (d2 > radius * radius) return 0;
      if (d2 > 1e-10) {
        const d = Math.sqrt(d2);
        outN.copy(_v).multiplyScalar(1 / d).applyQuaternion(this.quat);
        return radius - d;
      }
      const dr = R - rl, dy = H - Math.abs(_l.y);
      if (dy <= dr + 0.3 && _l.y > 0) { outN.set(0, 1, 0).applyQuaternion(this.quat); return dy + radius; }
      if (dr < dy) { outN.set(_l.x / (rl || 1), 0, _l.z / (rl || 1)).applyQuaternion(this.quat); return dr + radius; }
      outN.set(0, Math.sign(_l.y) || 1, 0).applyQuaternion(this.quat); return dy + radius;
    }
  }
}

export class Ball {
  constructor() {
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.ground = null; this.groundN = new THREE.Vector3(0, 1, 0);
    this.groundVel = new THREE.Vector3();
    this.sinceGround = 99; this.sinceJumpPress = 99; this.jumpHeld = false;
    this.airTime = 0; this.lastImpact = 0; this.jumped = false;
    this.events = []; // eventos para el juego (aterrizaje, golpe, muelle...)
    this.quat = new THREE.Quaternion();
  }
  reset(p) {
    this.pos.copy(p); this.vel.set(0, 0, 0); this.ground = null; this.sinceGround = 99;
    this.sinceJumpPress = 99; this.groundVel.set(0, 0, 0); this.airTime = 0; this.jumped = false;
  }
  pressJump() { this.sinceJumpPress = 0; this.jumpHeld = true; }
  releaseJump() { this.jumpHeld = false; }
}

// Un paso fijo de simulación. input = {x, z} en [-1,1] (mundo), colliders = lista
export function stepBall(ball, colliders, input, dt) {
  const P = PHYS, r = P.radius;
  // 1) Arrastre por plataforma móvil sobre la que estamos
  ball.groundVel.set(0, 0, 0);
  if (ball.ground && ball.ground.kinematic && ball.ground.active) {
    _c.copy(ball.pos).addScaledVector(ball.groundN, -r);
    ball.ground.pointDelta(_c, _pv);
    ball.pos.add(_pv);
    ball.groundVel.copy(_pv).multiplyScalar(1 / dt);
  }
  const grounded = ball.sinceGround < 0.001;
  // 1b) Cinta transportadora
  if (grounded && ball.ground && ball.ground.convey) {
    const cv = ball.ground.convey;
    const k = Math.min(1, 5 * dt);
    ball.vel.x += (cv.x - ball.vel.x) * k;
    ball.vel.z += (cv.z - ball.vel.z) * k;
  }
  // 1c) Barro / arenas movedizas: ralentizan
  if (grounded && ball.ground && (ball.ground.mud || ball.ground.quicksand)) {
    // frena pero deja avanzar a niños (y al bot)
    const drag = ball.ground.quicksand ? 3.2 : 2.6;
    const f = Math.exp(-drag * dt);
    ball.vel.x *= f; ball.vel.z *= f;
    // techo de velocidad más bajo sobre arena movediza / barro
    const max = ball.ground.quicksand ? 5.5 : 6.5;
    const sp = Math.hypot(ball.vel.x, ball.vel.z);
    if (sp > max) { ball.vel.x *= max / sp; ball.vel.z *= max / sp; }
  }
  // 2) Control
  let ix = input.x, iz = input.z;
  const mag = Math.hypot(ix, iz);
  if (mag > 1) { ix /= mag; iz /= mag; }
  const onIce = grounded && ball.ground && ball.ground.ice;
  const acc = grounded ? (onIce ? P.accelGround * 0.55 : P.accelGround) : P.accelAir;
  if (mag > 0.01) {
    // aceleración, limitada para no superar la velocidad máxima en la dirección deseada
    const dx = ix / Math.max(mag, 1e-6), dz = iz / Math.max(mag, 1e-6);
    const along = ball.vel.x * dx + ball.vel.z * dz;
    const target = P.maxSpeed * Math.min(1, mag);
    // giro más ágil: si vamos en contra, acelera más
    const boost = along < 0 ? 1.6 : 1;
    if (along < target) {
      const a = Math.min(acc * boost * Math.min(1, mag) * dt, target - along + acc * dt * 0.2);
      ball.vel.x += dx * a; ball.vel.z += dz * a;
    }
    // amortiguar la componente lateral para que responda bien
    const latX = ball.vel.x - dx * along, latZ = ball.vel.z - dz * along;
    const lk = grounded ? (onIce ? 0.7 : 3.0) : 1.0;
    ball.vel.x -= latX * Math.min(1, lk * dt); ball.vel.z -= latZ * Math.min(1, lk * dt);
  }
  // 3) Gravedad (reducida en pendientes para no resbalar de más)
  if (grounded) {
    const n = ball.groundN;
    // gravedad normal completa (mantiene pegado) + tangencial reducida
    const gn = -P.g * n.y; // componente normal de g (vector g=(0,-g,0))
    _w.set(0, -P.g, 0).addScaledVector(n, -gn); // tangencial
    ball.vel.addScaledVector(n, gn * dt).addScaledVector(_w, P.slopeGravity * dt);
    // hielo: poca fricción (la bola sigue deslizando)
    const ice = !!(ball.ground && ball.ground.ice);
    const frMul = ice ? 0.08 : 1;
    const fr = (mag > 0.01 ? P.frictionMove : P.frictionIdle) * frMul;
    const f = Math.exp(-fr * dt);
    // fricción solo en el plano del suelo
    const vn = ball.vel.dot(n);
    _w.copy(n).multiplyScalar(vn);
    ball.vel.sub(_w).multiplyScalar(f).add(_w);
  } else {
    ball.vel.y -= P.g * dt;
    const f = Math.exp(-P.airDrag * dt);
    ball.vel.x *= f; ball.vel.z *= f;
    // salto variable: soltar pronto corta la subida
    if (ball.jumped && !ball.jumpHeld && ball.vel.y > 2) ball.vel.y -= P.g * 1.2 * dt;
  }
  // 4) Salto con coyote time + buffer
  ball.sinceJumpPress += dt;
  if (ball.sinceJumpPress < P.buffer && ball.sinceGround < P.coyote) {
    const keep = Math.max(0, ball.vel.y);
    ball.vel.add(ball.groundVel); // conservar el impulso de la plataforma
    ball.vel.y = Math.max(P.jumpV, keep * 0.5 + P.jumpV * 0.9);
    ball.sinceJumpPress = 99; ball.sinceGround = 99; ball.ground = null; ball.jumped = true;
    ball.events.push({ type: 'jump' });
  }
  // 5) Integrar
  const preVy = ball.vel.y;
  ball.pos.addScaledVector(ball.vel, dt);
  // 6) Colisiones
  let newGround = null, bestY = 0.55;
  const groundN = _n.set(0, 1, 0);
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < colliders.length; i++) {
      const c = colliders[i];
      if (!c.active) continue;
      const dx = ball.pos.x - c.pos.x, dy = ball.pos.y - c.pos.y, dz = ball.pos.z - c.pos.z;
      const br = c.bound + r;
      if (dx * dx + dy * dy + dz * dz > br * br) continue;
      const depth = c.sphere(ball.pos, r, _v);
      if (depth <= 0) continue;
      const n = _v;
      if (c.kind === 'kill') { ball.events.push({ type: 'kill', c }); continue; }
      ball.pos.addScaledVector(n, depth);
      // velocidad del collider en el punto de contacto (relativa al marco del suelo actual)
      _pv.set(0, 0, 0);
      if (c.kinematic) {
        _c.copy(ball.pos).addScaledVector(n, -r);
        c.pointDelta(_c, _pv).multiplyScalar(1 / dt);
        if (c === ball.ground) _pv.set(0, 0, 0); else _pv.sub(ball.groundVel);
      }
      const rvx = ball.vel.x - _pv.x, rvy = ball.vel.y - _pv.y, rvz = ball.vel.z - _pv.z;
      const vn = rvx * n.x + rvy * n.y + rvz * n.z;
      if (c.kind === 'bumper' && n.y < 0.7) {
        const hx = n.x, hz = n.z, hl = Math.hypot(hx, hz) || 1;
        ball.vel.x = hx / hl * 10.5; ball.vel.z = hz / hl * 10.5; ball.vel.y = Math.max(ball.vel.y, 3.5);
        ball.events.push({ type: 'bumper', c }); continue;
      }
      if (c.kind === 'spring' && (n.y > 0.6 || (n.y > -0.2 && ball.pos.y > c.pos.y - 0.05))) {
        // también se activa al tocarlo de lado: nunca te quedas atascado contra él
        ball.vel.y = c.owner && c.owner.power ? c.owner.power : 17; ball.jumped = false;
        ball.events.push({ type: 'spring', c }); ball.sinceGround = 99; continue;
      }
      if (c.kind === 'hammer') {
        // golpe divertido: empuje fuerte en la dirección del movimiento del martillo
        const s = Math.hypot(_pv.x, _pv.z);
        let kx = n.x, kz = n.z;
        if (s > 0.5) { kx = _pv.x / s; kz = _pv.z / s; }
        const kl = Math.hypot(kx, kz) || 1;
        ball.vel.x = kx / kl * 13; ball.vel.z = kz / kl * 13 + ball.vel.z * 0.2; ball.vel.y = 6.5;
        ball.events.push({ type: 'hammer', c }); continue;
      }
      if (vn < 0) {
        const e = (n.y < 0.5 && vn < -6) ? Math.max(c.restitution, 0.25) : c.restitution;
        ball.vel.x -= n.x * vn * (1 + e); ball.vel.y -= n.y * vn * (1 + e); ball.vel.z -= n.z * vn * (1 + e);
        if (-vn > ball.lastImpact) ball.lastImpact = -vn;
      }
      if (n.y > bestY) { bestY = n.y; newGround = c; groundN.copy(n); }
    }
  }
  // 7) Estado de suelo y cambio de marco de referencia
  if (newGround) {
    if (ball.sinceGround > 0.08 && preVy < -3) ball.events.push({ type: 'land', speed: -preVy });
    if (newGround !== ball.ground) {
      // pasar de absoluto/otro marco al nuevo suelo
      if (newGround.kinematic) {
        _c.copy(ball.pos).addScaledVector(groundN, -r);
        newGround.pointDelta(_c, _pv).multiplyScalar(1 / dt);
        ball.vel.add(ball.groundVel).sub(_pv);
      } else ball.vel.add(ball.groundVel);
      ball.events.push({ type: 'touch', c: newGround });
    }
    ball.ground = newGround; ball.groundN.copy(groundN); ball.sinceGround = 0; ball.airTime = 0; ball.jumped = false;
  } else {
    if (ball.ground) { ball.vel.add(ball.groundVel); ball.ground = null; }
    ball.sinceGround += dt; ball.airTime += dt;
  }
  // 8) Rotación visual de rodado
  const sp = Math.hypot(ball.vel.x, ball.vel.z);
  if (sp > 0.01) {
    _w.set(ball.vel.z, 0, -ball.vel.x).normalize();
    _q.setFromAxisAngle(_w, sp * dt / r);
    ball.quat.premultiply(_q);
  }
}
