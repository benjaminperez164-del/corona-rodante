// Sonido con Web Audio: efectos sintetizados + música alegre en bucle
export class Sfx {
  constructor() { this.ctx = null; this.music = true; this.sfx = true; this.musicOn = false; }
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain(); this.master.gain.value = 0.8; this.master.connect(this.ctx.destination);
    this.sfxGain = this.ctx.createGain(); this.sfxGain.gain.value = this.sfx ? 0.5 : 0; this.sfxGain.connect(this.master);
    this.musGain = this.ctx.createGain(); this.musGain.gain.value = this.music ? 0.22 : 0; this.musGain.connect(this.master);
    const len = this.ctx.sampleRate * 0.5; this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    this.step = 0; this.nextT = this.ctx.currentTime + 0.1;
    setInterval(() => this._sched(), 30);
  }
  setMusic(on) { this.music = on; if (this.musGain) this.musGain.gain.setTargetAtTime(on ? 0.22 : 0, this.ctx.currentTime, 0.05); }
  setSfx(on) { this.sfx = on; if (this.sfxGain) this.sfxGain.gain.setTargetAtTime(on ? 0.5 : 0, this.ctx.currentTime, 0.02); }
  tone(f, dur, type = 'sine', vol = 0.5, slide = 0, delay = 0, dest) {
    if (!this.ctx) return; const t = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest || this.sfxGain); o.start(t); o.stop(t + dur + 0.05);
  }
  noise(dur, vol = 0.4, freq = 1200, delay = 0, dest, q = 1) {
    if (!this.ctx) return; const t = this.ctx.currentTime + delay;
    const s = this.ctx.createBufferSource(); s.buffer = this.noiseBuf;
    const f = this.ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
    const g = this.ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(dest || this.sfxGain); s.start(t); s.stop(t + dur + 0.05);
  }
  play(name, p = 1) {
    if (!this.ctx || !this.sfx) return;
    switch (name) {
      case 'coin': this.tone(988, 0.08, 'square', 0.18); this.tone(1319, 0.18, 'square', 0.18, 0, 0.07); break;
      case 'jump': this.tone(320, 0.18, 'sine', 0.35, 380); break;
      case 'land': this.noise(0.12, 0.25 * Math.min(1, p), 300); this.tone(110, 0.1, 'sine', 0.25 * Math.min(1, p), -40); break;
      case 'fall': this.tone(700, 0.6, 'triangle', 0.3, -560); break;
      case 'respawn': this.tone(440, 0.1, 'sine', 0.3, 200); this.tone(660, 0.15, 'sine', 0.3, 200, 0.1); break;
      case 'check': [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.18, 'triangle', 0.28, 0, i * 0.07)); break;
      case 'hammer': this.noise(0.25, 0.6, 500, 0, null, 0.7); this.tone(160, 0.25, 'square', 0.25, -90); break;
      case 'spring': this.tone(200, 0.35, 'sine', 0.4, 700); this.tone(300, 0.3, 'triangle', 0.2, 900, 0.03); break;
      case 'bumper': this.tone(520, 0.15, 'square', 0.22, 300); this.tone(780, 0.12, 'sine', 0.2, 0, 0.05); break;
      case 'crumble': this.noise(0.4, 0.3, 700, 0, null, 0.5); break;
      case 'click': this.tone(660, 0.06, 'square', 0.15); break;
      case 'buy': [784, 988, 1175, 1568].forEach((f, i) => this.tone(f, 0.12, 'square', 0.15, 0, i * 0.06)); break;
      case 'win': [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => this.tone(f, i === 6 ? 0.6 : 0.16, 'triangle', 0.3, 0, i * 0.11)); break;
      case 'star': this.tone(1047 * p, 0.25, 'triangle', 0.3); this.tone(1568 * p, 0.3, 'sine', 0.2, 0, 0.05); break;
    }
  }
  // ---- música: progresión I-V-vi-IV en Do mayor, 124 bpm ----
  _sched() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const spb = 60 / 124 / 4; // semicorcheas
    while (this.nextT < this.ctx.currentTime + 0.15) { if (this.musicOn) this._playStep(this.step, this.nextT); this.step++; this.nextT += spb; }
  }
  _playStep(s, t) {
    const chords = [[48, 52, 55], [43, 47, 50], [45, 48, 52], [41, 45, 48]];
    const bar = Math.floor(s / 16) % 4, st = s % 16, ch = chords[bar];
    const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
    const d = this.musGain;
    const note = (m, dur, type, vol) => {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain(); o.type = type; o.frequency.value = mtof(m);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(d); o.start(t); o.stop(t + dur + 0.02);
    };
    // bajo
    if (st % 4 === 0 || st % 4 === 3 && st !== 15) note(ch[0] - 12 + (st === 8 ? 12 : 0), 0.18, 'triangle', 0.5);
    // bombo
    if (st % 4 === 0) { const o = this.ctx.createOscillator(), g = this.ctx.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12); g.gain.setValueAtTime(0.6, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15); o.connect(g); g.connect(d); o.start(t); o.stop(t + 0.2); }
    // charles
    if (st % 4 === 2) { const s2 = this.ctx.createBufferSource(); s2.buffer = this.noiseBuf; const f = this.ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7000; const g = this.ctx.createGain(); g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05); s2.connect(f); f.connect(g); g.connect(d); s2.start(t); s2.stop(t + 0.06); }
    // arpegio/melodía
    const mel = [0, 2, 1, 2, 0, 2, 1, 3, 0, 2, 1, 2, 3, 2, 1, 2];
    const pent = [0, 2, 4, 7, 9];
    if (st % 2 === 0) {
      const idx = mel[st];
      const m = idx < 3 ? ch[idx] + 24 : ch[0] + 24 + pent[(bar + st) % 5];
      note(m, 0.14, 'square', 0.12);
    }
    if (bar === 3 && st === 14) note(ch[2] + 24, 0.3, 'triangle', 0.15);
  }
}
