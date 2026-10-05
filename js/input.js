// Entrada: joystick flotante + botón SALTAR + teclado (WASD / flechas + Espacio)
export class Input {
  constructor() {
    this.joy = { x: 0, y: 0, id: null, ox: 0, oy: 0 };
    this.keys = {};
    this.jumpQueued = false; this.jumpHeld = false; this.jumpReleased = false;
    this.enabled = false;
    this.override = null; // para pruebas automáticas
    this.onFirstGesture = null;
    this._bind();
  }
  _bind() {
    const zone = document.getElementById('joy-zone');
    const base = document.getElementById('joy-base'), knob = document.getElementById('joy-knob');
    this.joyEls = { zone, base, knob };
    const R = 60;
    const start = (e) => {
      if (!this.enabled) return;
      for (const t of e.changedTouches) {
        if (this.joy.id !== null) break;
        this.joy.id = t.identifier; this.joy.ox = t.clientX; this.joy.oy = t.clientY; this.joy.x = this.joy.y = 0;
        base.style.left = t.clientX + 'px'; base.style.top = t.clientY + 'px'; base.classList.add('on');
        knob.style.transform = 'translate(-50%,-50%)';
      }
      e.preventDefault();
    };
    const move = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier !== this.joy.id) continue;
        let dx = t.clientX - this.joy.ox, dy = t.clientY - this.joy.oy;
        const d = Math.hypot(dx, dy);
        if (d > R) {
          // joystick flotante: la base sigue al dedo si se aleja mucho
          const k = (d - R) / d; this.joy.ox += dx * k; this.joy.oy += dy * k;
          base.style.left = this.joy.ox + 'px'; base.style.top = this.joy.oy + 'px';
          dx = t.clientX - this.joy.ox; dy = t.clientY - this.joy.oy;
        }
        this.joy.x = dx / R; this.joy.y = dy / R;
        knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      }
      e.preventDefault();
    };
    const end = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier !== this.joy.id) continue;
        this.joy.id = null; this.joy.x = this.joy.y = 0; base.classList.remove('on');
      }
    };
    zone.addEventListener('touchstart', start, { passive: false });
    zone.addEventListener('touchmove', move, { passive: false });
    zone.addEventListener('touchend', end); zone.addEventListener('touchcancel', end);
    // ratón (para escritorio, arrastrar en la zona izquierda)
    let mdown = false;
    zone.addEventListener('mousedown', (e) => { if (!this.enabled) return; mdown = true; start({ changedTouches: [{ identifier: 'm', clientX: e.clientX, clientY: e.clientY }], preventDefault() {} }); });
    window.addEventListener('mousemove', (e) => { if (mdown) move({ changedTouches: [{ identifier: 'm', clientX: e.clientX, clientY: e.clientY }], preventDefault() {} }); });
    window.addEventListener('mouseup', () => { if (mdown) { mdown = false; end({ changedTouches: [{ identifier: 'm' }] }); } });

    const jb = document.getElementById('btn-jump');
    const jdown = (e) => { e.preventDefault(); this.jumpQueued = true; this.jumpHeld = true; jb.classList.add('down'); };
    const jup = (e) => { e.preventDefault(); this.jumpHeld = false; this.jumpReleased = true; jb.classList.remove('down'); };
    jb.addEventListener('touchstart', jdown, { passive: false }); jb.addEventListener('touchend', jup, { passive: false }); jb.addEventListener('touchcancel', jup);
    jb.addEventListener('mousedown', jdown); jb.addEventListener('mouseup', jup); jb.addEventListener('mouseleave', (e) => { if (this.jumpHeld) jup(e); });

    window.addEventListener('keydown', (e) => {
      if (e.repeat) { if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault(); return; }
      this.keys[e.code] = true;
      if (e.code === 'Space') { this.jumpQueued = true; this.jumpHeld = true; e.preventDefault(); }
      if (e.code.startsWith('Arrow')) e.preventDefault();
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      if (e.code === 'Space') { this.jumpHeld = false; this.jumpReleased = true; }
    });
    window.addEventListener('blur', () => { this.keys = {}; this.jumpHeld = false; });
  }
  // Vector de movimiento en el mundo (x derecha, z hacia la cámara)
  move() {
    if (this.override) return { x: this.override.x || 0, z: this.override.z || 0 };
    let x = 0, z = 0;
    const k = this.keys;
    if (k.KeyA || k.ArrowLeft) x -= 1; if (k.KeyD || k.ArrowRight) x += 1;
    if (k.KeyW || k.ArrowUp) z -= 1; if (k.KeyS || k.ArrowDown) z += 1;
    x += this.joy.x; z += this.joy.y;
    const m = Math.hypot(x, z); if (m > 1) { x /= m; z /= m; }
    return { x, z };
  }
  consumeJump() { const j = this.jumpQueued; this.jumpQueued = false; return j; }
  consumeRelease() { const j = this.jumpReleased; this.jumpReleased = false; return j; }
  resetTouch() { this.joy.id = null; this.joy.x = this.joy.y = 0; this.jumpHeld = false; this.jumpQueued = false; this.joyEls.base.classList.remove('on'); }
}
