// Niveles por mundo. El camino avanza hacia -Z (lejos de la cámara).
// wp() = puntos de ruta para el piloto automático de pruebas ('j' = saltar aquí, 't' = giro).
const WORLD1_LEVELS = [
  {
    name: 'Primeros Pasos', target: 32,
    hint: 'Mueve el joystick para rodar. ¡Llega a la corona!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -9, 4, 12); b.coinRow(0, 0, -5, 0, 0, -13, 4);
      b.ramp(0, 0, -15, 0, 1.5, -21, 4);
      b.plat(0, 1.5, -24, 6, 6, { pillars: true }); b.checkpoint(0, 1.5, -24);
      b.plat(0, 1.5, -31.5, 5, 5); b.coin(0, 2.6, -28);
      b.plat(0, 1.5, -40, 3, 12, { type: 'wood' }); b.coinRow(0, 1.5, -36, 0, 1.5, -44, 3);
      b.plat(0, 1.5, -49, 6, 6);
      b.plat(7, 1.5, -49, 8, 3, { type: 'wood' }); b.coinRow(5, 1.5, -49, 9, 1.5, -49, 2);
      b.plat(14, 1.5, -49, 6, 6, { pillars: true }); b.checkpoint(14, 1.5, -49);
      b.ramp(14, 1.5, -52, 14, 0, -58, 4);
      b.plat(14, 0, -61.5, 4, 7); b.coin(14, 1.2, -65.8);
      b.plat(14, 0, -71.5, 8, 10, { pillars: true });
      b.crown(14, 0, -73);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 1.5, -22); b.wp(0, 1.5, -26.2, 'j'); b.wp(0, 1.5, -33);
      b.wp(0, 1.5, -49, 't'); b.wp(7, 1.5, -49); b.wp(14, 1.5, -49, 't'); b.wp(14, 1.5, -53); b.wp(14, 0, -58);
      b.wp(14, 0, -64.4, 'j'); b.wp(14, 0, -73);
    },
  },
  {
    name: 'Puentes Estrechos', target: 42,
    hint: 'Puentes finos: ¡ve con calma! Pulsa SALTAR para saltar huecos.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -8, 2, 10, { type: 'wood' }); b.coinRow(0, 0, -5, 0, 0, -11, 3);
      b.plat(0, 0, -15, 4, 4);
      b.plat(5, 0, -15, 6, 1.8, { type: 'wood' }); b.coinRow(4, 0, -15, 6, 0, -15, 2);
      b.plat(10, 0, -15, 4, 4);
      b.plat(10, 0, -23, 1.6, 12, { type: 'marble' }); b.coinRow(10, 0, -19, 10, 0, -27, 3);
      b.ramp(10, 0, -29, 10, 2, -36, 2.2, { type: 'marble' });
      b.plat(10, 2, -39, 6, 6, { pillars: true }); b.checkpoint(10, 2, -39);
      b.plat(10, 2, -46.5, 4, 5); b.coin(10, 3.2, -43);
      b.plat(5, 2, -46.5, 7, 1.6, { type: 'wood' });
      b.plat(0, 2, -46.5, 3, 3);
      b.plat(0, 2, -54, 1.4, 12, { type: 'marble' }); b.coinRow(0, 2, -50, 0, 2, -58, 3);
      b.plat(0, 2, -63, 6, 6, { pillars: true }); b.checkpoint(0, 2, -63);
      b.ramp(0, 2, -65, -4, 1, -72, 1.8, { type: 'wood' });
      b.plat(-4, 1, -74, 3.5, 4.5); b.coin(-4, 1, -74);
      b.ramp(-4, 1, -76, 0, 0, -83, 1.8, { type: 'wood' });
      b.plat(0, 0, -87, 8, 8, { pillars: true });
      b.crown(0, 0, -88);
      b.wp(0, 0, -2); b.wp(0, 0, -15, 't'); b.wp(5, 0, -15); b.wp(10, 0, -15, 't'); b.wp(10, 0, -29); b.wp(10, 2, -36);
      b.wp(10, 2, -41.4, 'j', 5); b.wp(10, 2, -46.5, 't'); b.wp(5, 2, -46.5); b.wp(0, 2, -46.5, 't'); b.wp(0, 2, -60);
      b.wp(0, 2, -64.5, 't'); b.wp(-4, 1, -73, 't'); b.wp(-4, 1, -75.5, 't'); b.wp(0, 0, -83); b.wp(0, 0, -88);
    },
  },
  {
    name: 'Piedras Hexagonales', target: 45,
    hint: 'Salta de piedra en piedra. ¡No caigas en los pinchos!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -7, 4, 8); b.coinRow(0, 0, -5, 0, 0, -9, 2);
      b.spikes(0, -2.5, -19.5, 9, 16);
      const s1 = [[0, -13.2], [1.6, -16.2], [-0.8, -19.2], [1.0, -22.2], [-0.4, -25.2]];
      s1.forEach(([x, z], i) => { b.hex(x, 0, z, 1.15); if (i % 2 === 0) b.coin(x, 0, z); });
      b.plat(0, 0, -30.5, 6, 5, { pillars: true }); b.checkpoint(0, 0, -30.5);
      const s2 = [[0, 0.5, -35.5], [-2, 1.0, -38.5], [0, 1.5, -41.5], [2, 2.0, -44.5], [0, 2.0, -47.5]];
      s2.forEach(([x, y, z], i) => { b.hex(x, y, z, 1.15); if (i % 2 === 1) b.coin(x, y, z); });
      b.plat(0, 2, -52, 6, 6, { pillars: true }); b.checkpoint(0, 2, -52);
      b.spikes(0, -0.5, -62.5, 8, 12);
      const s3 = [[-1, -58], [1, -61], [-1, -64], [1, -67]];
      s3.forEach(([x, z], i) => { b.hex(x, 2, z, 1.2); if (i % 2 === 1) b.coin(x, 2, z); });
      b.plat(0, 2, -72, 8, 8, { pillars: true });
      b.crown(0, 2, -73.5);
      b.wp(0, 0, -2); b.wp(0, 0, -10.2, 'j', 5);
      s1.forEach(([x, z]) => b.wp(x, 0, z, 'j', 4));
      b.wp(0, 0, -30.5); b.wp(0, 0, -32.2, 'j', 5);
      s2.forEach(([x, y, z]) => b.wp(x, y, z, 'j', 4));
      b.wp(0, 2, -52); b.wp(0, 2, -54.3, 'j', 4);
      s3.forEach(([x, z]) => b.wp(x, 2, z, 'j', 4));
      b.wp(0, 2, -73.5);
    },
  },
  {
    name: 'Martillos Oscilantes', target: 40,
    hint: '¡Martillos! Espera a que pasen y cruza rápido.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -10, 3.2, 14); b.coinRow(0, 0, -5, 0, 0, -15, 4);
      const h1 = b.hammer(0, 0, -8, { speed: 1.6, phase: 0 });
      const h2 = b.hammer(0, 0, -13, { speed: 1.6, phase: Math.PI * 0.6 });
      b.plat(0, 0, -20, 6, 6, { pillars: true }); b.checkpoint(0, 0, -20);
      b.ramp(0, 0, -23, 0, 2, -29, 3.2);
      b.plat(0, 2, -31, 4, 4);
      b.plat(0, 2, -41, 2.6, 16, { type: 'wood' }); b.coinRow(0, 2, -35, 0, 2, -47, 4);
      const h3 = b.hammer(0, 2, -36, { speed: 1.8, phase: 0 });
      const h4 = b.hammer(0, 2, -41, { speed: 1.8, phase: 2.1 });
      const h5 = b.hammer(0, 2, -46, { speed: 1.8, phase: 4.2 });
      b.plat(0, 2, -52, 6, 6, { pillars: true }); b.checkpoint(0, 2, -52);
      b.plat(6.5, 2, -52, 7, 2.6, { type: 'wood' }); b.coin(6.5, 2, -52);
      const h6 = b.hammer(6.5, 2, -52, { axis: 'x', speed: 1.5, phase: 1 });
      b.plat(13, 2, -52, 6, 6, { pillars: true });
      b.plat(13, 2, -60, 3, 10); b.coinRow(13, 2, -57, 13, 2, -63, 2);
      const h7 = b.hammer(13, 2, -60, { speed: 1.3, phase: 0.5, len: 4.6, amp: 75 });
      b.plat(13, 2, -69, 8, 8, { pillars: true });
      b.crown(13, 2, -70.5);
      const W = (h, lead) => ({ cond: () => h.safe(lead) });
      b.wp(0, 0, -3); b.wp(0, 0, -5.6, 'w', 0, W(h1, 0.25)); b.wp(0, 0, -10.6, 'w', 0, W(h2, 0.25)); b.wp(0, 0, -17); b.wp(0, 0, -21);
      b.wp(0, 2, -30); b.wp(0, 2, -33.5, 'w', 0, W(h3, 0.25)); b.wp(0, 2, -38.6, 'w', 0, W(h4, 0.25)); b.wp(0, 2, -43.6, 'w', 0, W(h5, 0.25));
      b.wp(0, 2, -52, 't'); b.wp(3.8, 2, -52, 'w', 0, W(h6, 0.25)); b.wp(13, 2, -52, 't'); b.wp(13, 2, -57.4, 'w', 0, W(h7, 0.2)); b.wp(13, 2, -70.5);
    },
  },
  {
    name: 'Suelo Frágil', target: 45,
    hint: 'Las baldosas naranjas se rompen. ¡No te pares!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -7, 4, 8);
      for (let i = 0; i < 6; i++) b.crumble(0, 0, -12 - i * 2, 2.2, 2);
      b.coinRow(0, 0, -13, 0, 0, -21, 3);
      b.plat(0, 0, -26, 6, 4, { pillars: true }); b.checkpoint(0, 0, -26);
      const m1 = b.mover(0, 0, -29.6, 3, 3, { to: [0, 0, -10.8], period: 6 });
      b.coinRow(0, 0.4, -32, 0, 0.4, -38, 3);
      b.plat(0, 0, -44, 6, 4, { pillars: true }); b.checkpoint(0, 0, -44);
      for (let zi = 0; zi < 4; zi++) for (let xi = -1; xi <= 1; xi++) b.crumble(xi * 2, 0, -47 - zi * 2, 2, 2);
      b.coin(-2, 0, -49); b.coin(2, 0, -51); b.coin(0, 0, -53);
      b.plat(0, 0, -55.5, 4, 3);
      const m2 = b.mover(0, 0, -59, 3, 3, { to: [0, 3, 0], period: 5 });
      b.plat(0, 3, -63.5, 6, 5, { pillars: true }); b.checkpoint(0, 3, -63.5);
      for (let i = 0; i < 4; i++) b.crumble(0, 3, -67 - i * 2, 2, 2);
      b.coinRow(0, 3, -67, 0, 3, -73, 2);
      b.plat(0, 3, -79, 8, 10, { pillars: true });
      b.crown(0, 3, -81);
      b.wp(0, 0, -2); b.wp(0, 0, -26.2, 'w', 0, { cond: () => m1.c.pos.z > -29.9 });
      b.wp(0, 0, -27.5, 'r', 0, { follow: m1 }); b.wp(0, 0, -29.6, 'r', 0, { follow: m1, cond: () => m1.c.pos.z < -40.2 });
      b.wp(0, 0, -44); b.wp(0, 0, -56.2, 'w', 0, { cond: () => m2.c.pos.y < -0.22 && m2.c.pos.y - m2.c.prevPos.y <= 0 });
      b.wp(0, 0, -59, 'r', 0, { follow: m2, cond: () => m2.c.pos.y > 2.6 });
      b.wp(0, 3, -63.5); b.wp(0, 3, -81);
    },
  },
  {
    name: 'El Molinete', target: 50,
    hint: 'El molinete gira: ¡salta sus brazos o síguelos!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -7.3, 4, 8.6);
      b.disc(0, 0, -18, 7);
      const t1 = b.turnstile(0, 0, -18, { len: 5.3, speed: 0.9, arms: 4 });
      [0, 1, 2, 3, 4, 5].forEach(k => { const a = k / 6 * Math.PI * 2; b.coin(Math.cos(a) * 3.6, 0, -18 + Math.sin(a) * 3.6); });
      b.plat(0, 0, -28.3, 4, 6.6, { pillars: true }); b.checkpoint(0, 0, -28.5);
      b.plat(0, 0, -38, 7, 12.6);
      [[-1.8, -34.5], [1.8, -36.5], [-1.5, -39.5], [2, -42], [-2.6, -42.5]].forEach(([x, z]) => b.bumper(x, 0, z, { r: 0.75 }));
      b.coin(0, 0, -35.5); b.coin(0.2, 0, -38.5); b.coin(-0.2, 0, -41.5);
      b.plat(0, 0, -47, 4, 6, { pillars: true }); b.checkpoint(0, 0, -47);
      b.plat(0, 0, -56, 3, 12, { type: 'wood' });
      b.plat(-3.2, 0, -56, 1.8, 1.8, { type: 'marble' });
      const t2 = b.turnstile(-3.2, 0, -56, { len: 4.2, speed: 1.6, arms: 2, h: 0.55 });
      b.coinRow(0, 0, -52, 0, 0, -60, 3);
      b.plat(0, 0, -65, 8, 6, { pillars: true }); b.checkpoint(0, 0, -65);
      b.ramp(0, 0, -68, 0, 1.5, -73.5, 4);
      b.plat(0, 1.5, -74, 4, 1.4, { rock: false });
      b.disc(0, 1.5, -80, 6.2);
      const t3 = b.turnstile(0, 1.5, -80, { len: 4.6, speed: -1.2, arms: 3 });
      b.coin(3, 1.5, -80); b.coin(-3, 1.5, -80);
      b.plat(0, 1.5, -89.5, 6, 7, { pillars: true });
      b.crown(0, 1.5, -90.5);
      void t1; void t2; void t3;
      b.wp(0, 0, -2); b.wp(0, 0, -10.5); b.wp(2.8, 0, -14.5); b.wp(2.8, 0, -21.5); b.wp(0, 0, -25.5); b.wp(0, 0, -29);
      b.wp(0, 0, -33); b.wp(0, 0, -38, 't'); b.wp(0.2, 0, -44.5); b.wp(0, 0, -47);
      b.wp(0, 0, -53.6, 'w', 0, { cond: () => { const a = ((t2.angle % Math.PI) + Math.PI) % Math.PI; return a > 0.35 && a < 0.6; } });
      b.wp(0, 0, -62); b.wp(0, 0, -65); b.wp(0, 1.5, -73.5); b.wp(2.6, 1.5, -77); b.wp(2.6, 1.5, -83); b.wp(0, 1.5, -90.5);
    },
  },
  {
    name: 'Saltos y Resortes', target: 55,
    hint: 'Los resortes amarillos te lanzan por los aires. ¡Boing!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -8, 4, 10); b.coinRow(0, 0, -5, 0, 0, -8, 2);
      b.spring(0, 0, -11, { power: 17 });
      b.coin(0, 4.2, -13.5);
      b.plat(0, 4, -17, 6, 6, { pillars: true }); b.checkpoint(0, 4, -17);
      const ma = b.mover(-1.8, 4, -22.2, 3.2, 3.2, { to: [3.6, 0, 0], period: 4.4 });
      const mb = b.mover(-1.8, 4, -26.6, 3.2, 3.2, { to: [3.6, 0, 0], period: 4.4 });
      const mc = b.mover(-1.8, 4, -31.0, 3.2, 3.2, { to: [3.6, 0, 0], period: 4.4 });
      b.coin(0, 4.6, -24.4); b.coin(0, 4.6, -28.8);
      b.plat(0, 4, -35.6, 6, 3.6, { pillars: true }); b.checkpoint(0, 4, -35.6);
      b.plat(0, 4, -44.4, 6.5, 14);
      [[-1, -41], [1.3, -45], [-1.1, -48.5]].forEach(([x, z]) => b.bumper(x, 4, z));
      b.coin(1.2, 4, -41.5); b.coin(-1.2, 4, -45); b.coin(1.2, 4, -48.5);
      b.plat(0, 4, -54.4, 4, 6);
      b.spring(0, 4, -56.2, { power: 17.5 });
      b.coin(0, 9.4, -57.6); b.coin(0, 9.7, -59.6);
      b.plat(0, 7, -64.5, 6, 9, { pillars: true }); b.checkpoint(0, 7, -66);
      const h1 = b.mover(0, 7, -71.4, 2.6, 2.6, { shape: 'hex', to: [0, -1.2, 0], period: 3 });
      const h2 = b.mover(1.8, 6.5, -75, 2.6, 2.6, { shape: 'hex', to: [0, -1.2, 0], period: 3, phase: 0.5 });
      b.coin(1.8, 6.5, -75);
      b.plat(0, 6, -81, 8, 7, { pillars: true });
      b.crown(0, 6, -82);
      void h1; void h2;
      b.wp(0, 0, -2); b.wp(0, 0, -11, '', 4); b.wp(0, 4, -16);
      b.wp(0, 4, -19.4, 'w', 0, { cond: () => Math.abs(ma.c.pos.x) < 0.4 });
      b.wp(0, 4, -20.2, 'j', 5);
      b.wp(0, 4, -22.2, 'r', 0, { follow: ma });
      b.wp(0, 4, -24.4, 'j', 6, { follow: ma, oz: -1.0 });
      b.wp(0, 4, -26.6, 'r', 0, { follow: mb });
      b.wp(0, 4, -28.8, 'j', 6, { follow: mb, oz: -1.0 });
      b.wp(0, 4, -31, 'r', 0, { follow: mc });
      b.wp(0, 4, -32.2, 'j', 6, { follow: mc, oz: -1.0 });
      b.wp(0, 4, -35.6); b.wp(1.4, 4, -38.5); b.wp(1.4, 4, -41.8, 't'); b.wp(-1.3, 4, -43.6, 't'); b.wp(-1.3, 4, -46, 't'); b.wp(1.3, 4, -47.6, 't'); b.wp(1.3, 4, -50, 't'); b.wp(0, 4, -52.5);
      b.wp(0, 4, -56.2, '', 4); b.wp(0, 7, -66); b.wp(0, 7, -68.4, 'j', 4); b.wp(0, 7, -71.4, 'j', 4, { follow: h1 }); b.wp(1.8, 6.5, -75, 'j', 4, { follow: h2 }); b.wp(0, 6, -82);
    },
  },
  {
    name: 'El Trono de la Corona', target: 80,
    hint: '¡El gran final! Usa todo lo que has aprendido.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -10, 2.8, 14, { type: 'marble' }); b.coinRow(0, 0, -5, 0, 0, -15, 3);
      const h1 = b.hammer(0, 0, -7, { speed: 1.7, phase: 0 });
      const h2 = b.hammer(0, 0, -13, { speed: 1.7, phase: 2.4 });
      b.plat(0, 0, -20, 6, 6, { pillars: true }); b.checkpoint(0, 0, -20);
      b.spikes(0, -2.5, -29, 9, 12);
      const st = [[0, -25.2], [1.5, -28.2], [-1, -31.2], [0.5, -34.2]];
      st.forEach(([x, z], i) => { b.hex(x, 0, z, 1.15); if (i % 2) b.coin(x, 0, z); });
      b.plat(0, 0, -38.5, 6, 5, { pillars: true }); b.checkpoint(0, 0, -38.5);
      b.plat(0, 0, -41.5, 4, 1.2, { rock: false });
      b.disc(0, 0, -48, 6);
      const t1 = b.turnstile(0, 0, -48, { len: 4.4, speed: 1.2, arms: 4 });
      b.coin(3, 0, -48); b.coin(-3, 0, -48);
      b.plat(0, 0, -56.6, 4, 6); 
      const m1 = b.mover(0, 0, -61.1, 3, 3, { to: [0, 0, -8.8], period: 5 });
      b.coinRow(0, 0.4, -63, 0, 0.4, -68, 2);
      b.plat(0, 0, -73.5, 6, 3.6, { pillars: true }); b.checkpoint(0, 0, -73.5);
      for (let i = 0; i < 3; i++) b.crumble(0, 0, -76.3 - i * 2, 2.2, 2);
      b.plat(0, 0, -83.8, 4, 5);
      b.spring(0, 0, -85, { power: 17 });
      b.coin(0, 4.5, -88.5);
      b.plat(0, 4, -92, 6, 6, { pillars: true }); b.checkpoint(0, 4, -92);
      b.plat(0, 4, -101, 3, 12, { type: 'marble' });
      const h3 = b.hammer(0, 4, -98, { speed: 1.9, phase: 1 });
      const h4 = b.hammer(0, 4, -104, { speed: 1.9, phase: 3.2 });
      b.coinRow(0, 4, -97, 0, 4, -105, 3);
      b.plat(0, 4, -112, 10, 10, { pillars: true, type: 'marble' });
      b.pillar(-3, 4, -116, 3.5); b.pillar(3, 4, -116, 3.5);
      b.crown(0, 4, -114);
      void t1;
      const W = (h, lead) => ({ cond: () => h.safe(lead) });
      b.wp(0, 0, -3); b.wp(0, 0, -4.6, 'w', 0, W(h1, 0.25)); b.wp(0, 0, -10.6, 'w', 0, W(h2, 0.25)); b.wp(0, 0, -20);
      b.wp(0, 0, -22.2, 'j', 5); st.forEach(([x, z]) => b.wp(x, 0, z, 'j', 4));
      b.wp(0, 0, -38.5); b.wp(0, 0, -41.5); b.wp(2.6, 0, -45); b.wp(2.6, 0, -51); b.wp(0, 0, -55);
      b.wp(0, 0, -58.2, 'w', 0, { cond: () => m1.c.pos.z > -61.4 });
      b.wp(0, 0, -59.8, 'r', 0, { follow: m1 }); b.wp(0, 0, -61.1, 'r', 0, { follow: m1, cond: () => m1.c.pos.z < -69.6 });
      b.wp(0, 0, -73.5); b.wp(0, 0, -85, '', 4); b.wp(0, 4, -92);
      b.wp(0, 4, -95.6, 'w', 0, W(h3, 0.25)); b.wp(0, 4, -101.6, 'w', 0, W(h4, 0.25)); b.wp(0, 4, -114);
    },
  },

];

const WORLD2_LEVELS = [
  {
    name: 'Orillas Ardientes', target: 35,
    hint: '¡Cuidado con la lava! Si caes, vuelves al punto de control.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -9, 4, 12); b.coinRow(0, 0, -4, 0, 0, -14, 4);
      b.plat(0, 0, -18, 5, 6, { pillars: true }); b.checkpoint(0, 0, -18);
      b.plat(0, 0, -26, 3.5, 10, { type: 'lavaWood' }); b.coinRow(0, 0, -22, 0, 0, -30, 3);
      b.plat(0, 0, -34, 6, 6, { pillars: true }); b.checkpoint(0, 0, -34);
      b.ramp(0, 0, -37, 0, 1.8, -44, 4);
      b.plat(0, 1.8, -48, 5, 6); b.coin(0, 1.8, -48);
      b.plat(0, 1.8, -56, 3.5, 10); b.coinRow(0, 1.8, -52, 0, 1.8, -60, 3);
      b.plat(0, 1.8, -64, 8, 8, { pillars: true });
      b.crown(0, 1.8, -65);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -18); b.wp(0, 0, -30); b.wp(0, 0, -34);
      b.wp(0, 1.8, -44); b.wp(0, 1.8, -56); b.wp(0, 1.8, -65);
    },
  },
  {
    name: 'Baldosas Hundidas', target: 42,
    hint: 'Las baldosas naranjas se hunden en la lava. ¡No te quedes quieto!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -7, 4, 8); b.coinRow(0, 0, -4, 0, 0, -10, 2);
      // solape con la plataforma anterior (termina ~-11)
      for (let i = 0; i < 6; i++) b.sink(0, 0, -12.2 - i * 1.85, 2.6, 2.1, { delay: 1.0 });
      b.plat(0, 0, -26, 5, 6, { pillars: true }); b.checkpoint(0, 0, -26); b.coin(0, 0, -26);
      for (let i = 0; i < 6; i++) b.sink(0, 0, -31.2 - i * 1.85, 2.6, 2.1, { delay: 1.0 });
      b.plat(0, 0, -45, 5, 6, { pillars: true }); b.checkpoint(0, 0, -45);
      for (let i = 0; i < 5; i++) b.sink(0, 0, -50.2 - i * 1.85, 2.6, 2.1, { delay: 1.0 });
      b.plat(0, 0, -63, 8, 8, { pillars: true });
      b.crown(0, 0, -64);
      b.wp(0, 0, -2); b.wp(0, 0, -10);
      for (let i = 0; i < 6; i++) b.wp(0, 0, -12.2 - i * 1.85, '', 8);
      b.wp(0, 0, -26);
      for (let i = 0; i < 6; i++) b.wp(0, 0, -31.2 - i * 1.85, '', 8);
      b.wp(0, 0, -45);
      for (let i = 0; i < 5; i++) b.wp(0, 0, -50.2 - i * 1.85, '', 8);
      b.wp(0, 0, -64);
    },
  },
  {
    name: 'Géiseres de Fuego', target: 48,
    hint: 'Los géiseres escupen lava. ¡Espera el momento y cruza!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      // un solo pasillo largo continuo
      b.plat(0, 0, -20, 4.5, 34); b.coinRow(0, 0, -5, 0, 0, -30, 5);
      const j1 = b.fireJet(0, 0, -14, { period: 3.4, phase: 0, h: 3.0 });
      const j2 = b.fireJet(0, 0, -24, { period: 3.4, phase: 0.5, h: 3.0 });
      b.plat(0, 0, -42, 6, 8, { pillars: true }); b.checkpoint(0, 0, -42);
      b.plat(0, 0, -60, 4.5, 28);
      const j3 = b.fireJet(0, 0, -52, { period: 3.2, phase: 0.2, h: 2.8 });
      const j4 = b.fireJet(0, 0, -62, { period: 3.2, phase: 0.7, h: 2.8 });
      b.coin(0, 0, -55); b.coin(0, 0, -65);
      b.plat(0, 0, -80, 8, 10, { pillars: true });
      b.crown(0, 0, -81);
      const W = (j, lead) => ({ cond: () => j.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -10);
      b.wp(0, 0, -11.5, 'w', 0, W(j1, 0.1)); b.wp(0, 0, -18, '', 7);
      b.wp(0, 0, -21.5, 'w', 0, W(j2, 0.1)); b.wp(0, 0, -32); b.wp(0, 0, -42);
      b.wp(0, 0, -49.5, 'w', 0, W(j3, 0.1)); b.wp(0, 0, -57, '', 7);
      b.wp(0, 0, -59.5, 'w', 0, W(j4, 0.1)); b.wp(0, 0, -70); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Puentes sobre Lava', target: 50,
    hint: 'Plataformas que se mueven sobre el magma. ¡Salta con calma!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      // suelo continuo + tramos móviles encima del hueco controlado
      b.plat(0, 0, -10, 4.5, 14); b.coinRow(0, 0, -5, 0, 0, -15, 3);
      b.plat(0, 0, -20, 5, 5, { pillars: true }); b.checkpoint(0, 0, -20);
      // hueco corto cubierto por movers laterales (como Saltos y Resortes)
      const m1 = b.mover(-2.0, 0, -25, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0 });
      const m2 = b.mover(-2.0, 0, -30, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5 });
      b.coin(0, 0.4, -25); b.coin(0, 0.4, -30);
      b.plat(0, 0, -36, 5, 6, { pillars: true }); b.checkpoint(0, 0, -36);
      const m3 = b.mover(-2.0, 0, -42, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0 });
      const m4 = b.mover(-2.0, 0, -47, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5 });
      b.coin(0, 0.4, -42); b.coin(0, 0.4, -47);
      b.plat(0, 0, -54, 5, 6, { pillars: true }); b.checkpoint(0, 0, -54);
      b.plat(0, 0, -62, 4, 12); b.coinRow(0, 0, -58, 0, 0, -66, 2);
      b.plat(0, 0, -72, 8, 8, { pillars: true });
      b.crown(0, 0, -73);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -20);
      b.wp(0, 0, -22.2, 'w', 0, { cond: () => Math.abs(m1.c.pos.x) < 0.4 });
      b.wp(0, 0, -23.0, 'j', 5);
      b.wp(0, 0, -25, 'r', 0, { follow: m1 });
      b.wp(0, 0, -27.5, 'j', 6, { follow: m1, oz: -1.0 });
      b.wp(0, 0, -30, 'r', 0, { follow: m2 });
      b.wp(0, 0, -32.5, 'j', 6, { follow: m2, oz: -1.0 });
      b.wp(0, 0, -36);
      b.wp(0, 0, -39.2, 'w', 0, { cond: () => Math.abs(m3.c.pos.x) < 0.4 });
      b.wp(0, 0, -40.0, 'j', 5);
      b.wp(0, 0, -42, 'r', 0, { follow: m3 });
      b.wp(0, 0, -44.5, 'j', 6, { follow: m3, oz: -1.0 });
      b.wp(0, 0, -47, 'r', 0, { follow: m4 });
      b.wp(0, 0, -49.5, 'j', 6, { follow: m4, oz: -1.0 });
      b.wp(0, 0, -54); b.wp(0, 0, -64); b.wp(0, 0, -73);
    },
  },
  {
    name: 'Rocas Rodantes', target: 45,
    hint: '¡Rocas gigantes! Pásalas por los lados con calma.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -45, 12, 84); // suelo continuo muy ancho
      b.coinRow(4.5, 0, -8, 4.5, 0, -30, 4);
      b.boulder(0, 0, -18, { to: [0, 0, -12], period: 6.5, r: 0.6 });
      b.checkpoint(0, 0, -36);
      b.coin(-4.5, 0, -46); b.coin(4.5, 0, -58);
      b.boulder(-3.5, 0, -50, { to: [7, 0, 0], period: 6.0, r: 0.6 });
      b.boulder(3.5, 0, -60, { to: [-7, 0, 0], period: 6.0, r: 0.6, phase: 0.5 });
      b.checkpoint(0, 0, -72);
      b.coin(4.5, 0, -80); b.coin(-4.5, 0, -84);
      b.plat(0, 0, -92, 8, 10, { pillars: true });
      b.crown(0, 0, -93);
      b.wp(0, 0, -2); b.wp(4.5, 0, -18, 't'); b.wp(4.5, 0, -30); b.wp(0, 0, -36);
      b.wp(-4.5, 0, -52, 't'); b.wp(4.5, 0, -62, 't'); b.wp(0, 0, -72);
      b.wp(4.5, 0, -82); b.wp(0, 0, -93);
    },
  },
  {
    name: 'Cintas Ardientes', target: 48,
    hint: '¡Las cintas empujan hacia atrás! Rema con fuerza.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      // todo el camino es cinta o plataforma, sin huecos
      b.plat(0, 0, -6, 4.5, 6);
      b.convey(0, 0, -15, 4.5, 14, { dir: [0, 0, 1], speed: 4.0 });
      b.coinRow(0, 0, -10, 0, 0, -20, 3);
      b.plat(0, 0, -25, 5, 6, { pillars: true }); b.checkpoint(0, 0, -25);
      b.convey(0, 0, -34, 4.5, 14, { dir: [0, 0, 1], speed: 4.0 });
      b.coin(0, 0, -30); b.coin(0, 0, -38);
      b.plat(0, 0, -44, 5, 6, { pillars: true }); b.checkpoint(0, 0, -44);
      b.convey(0, 0, -52, 4.5, 12, { dir: [0, 0, 1], speed: 4.0 });
      b.plat(0, 0, -61, 5, 6, { pillars: true }); b.checkpoint(0, 0, -61);
      b.convey(0, 0, -69, 4.5, 12, { dir: [0, 0, 1], speed: 4.0 });
      b.coin(0, 0, -69);
      b.plat(0, 0, -78, 8, 8, { pillars: true });
      b.crown(0, 0, -79);
      b.wp(0, 0, -2); b.wp(0, 0, -15); b.wp(0, 0, -25);
      b.wp(0, 0, -34); b.wp(0, 0, -44); b.wp(0, 0, -52);
      b.wp(0, 0, -61); b.wp(0, 0, -69); b.wp(0, 0, -79);
    },
  },
  {
    name: 'Cráteres Gemelos', target: 58,
    hint: 'Hundibles, géiseres y cintas juntos. ¡Concéntrate!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -7, 4.5, 8); b.coin(0, 0, -7);
      for (let i = 0; i < 5; i++) b.sink(0, 0, -12.2 - i * 1.85, 2.6, 2.1, { delay: 1.0 });
      b.plat(0, 0, -26, 5, 12);
      const j1 = b.fireJet(0, 0, -26, { period: 3.4, phase: 0.1, h: 3 });
      b.plat(0, 0, -36, 5, 6, { pillars: true }); b.checkpoint(0, 0, -36);
      b.convey(0, 0, -44, 4.5, 12, { dir: [0, 0, 1], speed: 4.0 });
      b.coin(0, 0, -44);
      b.plat(0, 0, -53, 5, 6, { pillars: true }); b.checkpoint(0, 0, -53);
      b.convey(0, 0, -61, 4.5, 12, { dir: [0, 0, 1], speed: 4.0 });
      b.coin(0, 0, -61);
      b.plat(0, 0, -70, 5, 6);
      for (let i = 0; i < 4; i++) b.sink(0, 0, -74.0 - i * 1.85, 2.6, 2.1, { delay: 1.0 });
      b.plat(0, 0, -85, 5, 10);
      const j2 = b.fireJet(0, 0, -85, { period: 3.2, phase: 0.3, h: 2.8 });
      b.plat(0, 0, -95, 8, 8, { pillars: true });
      b.crown(0, 0, -96);
      const W = (j, lead) => ({ cond: () => j.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -10);
      for (let i = 0; i < 5; i++) b.wp(0, 0, -12.2 - i * 1.85, '', 8);
      b.wp(0, 0, -23.5, 'w', 0, W(j1, 0.1)); b.wp(0, 0, -32); b.wp(0, 0, -36);
      b.wp(0, 0, -44); b.wp(0, 0, -53); b.wp(0, 0, -61); b.wp(0, 0, -70);
      for (let i = 0; i < 4; i++) b.wp(0, 0, -74.0 - i * 1.85, '', 8);
      b.wp(0, 0, -82.5, 'w', 0, W(j2, 0.1)); b.wp(0, 0, -90); b.wp(0, 0, -96);
    },
  },
  {
    name: 'Corona del Volcán', target: 75,
    hint: '¡La cima del volcán! Usa todo lo aprendido para la corona.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { pillars: true });
      b.plat(0, 0, -6, 4.5, 6);
      b.convey(0, 0, -14, 4.5, 12, { dir: [0, 0, 1], speed: 4.0 });
      b.coinRow(0, 0, -10, 0, 0, -18, 3);
      b.plat(0, 0, -23, 5, 6, { pillars: true }); b.checkpoint(0, 0, -23);
      b.plat(0, 0, -40, 4.5, 28); b.coinRow(0, 0, -28, 0, 0, -48, 3);
      const j1 = b.fireJet(0, 0, -32, { period: 3.4, phase: 0, h: 3 });
      const j2 = b.fireJet(0, 0, -44, { period: 3.4, phase: 0.5, h: 3 });
      b.plat(0, 0, -58, 5, 6, { pillars: true }); b.checkpoint(0, 0, -58);
      for (let i = 0; i < 5; i++) b.sink(0, 0, -62.2 - i * 1.85, 2.6, 2.1, { delay: 1.0 });
      b.plat(0, 0, -74, 5, 8, { pillars: true }); b.checkpoint(0, 0, -74);
      const m1 = b.mover(-2.0, 0, -80, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0 });
      const m2 = b.mover(-2.0, 0, -85, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5 });
      b.coin(0, 0.4, -80); b.coin(0, 0.4, -85);
      b.plat(0, 0, -91, 5, 6, { pillars: true }); b.checkpoint(0, 0, -91);
      b.plat(0, 0, -102, 12, 16);
      b.coin(4.5, 0, -100); b.coin(-4.5, 0, -108);
      b.boulder(0, 0, -104, { to: [0, 0, -8], period: 6.0, r: 0.55 });
      b.plat(0, 0, -114, 5, 6);
      b.spring(0, 0, -115.5, { power: 16.5 });
      b.coin(0, 3.8, -118.5);
      b.plat(0, 3.5, -123, 5, 6, { pillars: true }); b.checkpoint(0, 3.5, -123);
      b.convey(0, 3.5, -131, 4.5, 12, { dir: [0, 0, 1], speed: 4.0 });
      b.plat(0, 3.5, -140, 5, 6);
      for (let i = 0; i < 3; i++) b.sink(0, 3.5, -144.0 - i * 1.85, 2.6, 2.1, { delay: 1.0 });
      b.plat(0, 3.5, -154, 10, 10, { pillars: true });
      b.pillar(-3.2, 3.5, -157, 3.2); b.pillar(3.2, 3.5, -157, 3.2);
      b.crown(0, 3.5, -156);
      const W = (j, lead) => ({ cond: () => j.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -23);
      b.wp(0, 0, -29.5, 'w', 0, W(j1, 0.1)); b.wp(0, 0, -37, '', 7);
      b.wp(0, 0, -41.5, 'w', 0, W(j2, 0.1)); b.wp(0, 0, -52); b.wp(0, 0, -58);
      for (let i = 0; i < 5; i++) b.wp(0, 0, -62.2 - i * 1.85, '', 8);
      b.wp(0, 0, -74);
      b.wp(0, 0, -77.2, 'w', 0, { cond: () => Math.abs(m1.c.pos.x) < 0.4 });
      b.wp(0, 0, -78.0, 'j', 5);
      b.wp(0, 0, -80, 'r', 0, { follow: m1 });
      b.wp(0, 0, -82.5, 'j', 6, { follow: m1, oz: -1.0 });
      b.wp(0, 0, -85, 'r', 0, { follow: m2 });
      b.wp(0, 0, -87.5, 'j', 6, { follow: m2, oz: -1.0 });
      b.wp(0, 0, -91); b.wp(4.5, 0, -104, 't'); b.wp(0, 0, -114);
      b.wp(0, 0, -115.5, '', 4); b.wp(0, 3.5, -123);
      b.wp(0, 3.5, -131); b.wp(0, 3.5, -140);
      for (let i = 0; i < 3; i++) b.wp(0, 3.5, -144.0 - i * 1.85, '', 8);
      b.wp(0, 3.5, -156);
    },
  },
];



const WORLD3_LEVELS = [
  {
    name: 'Primera Nevada', target: 36,
    hint: '¡El hielo resbala! Usa la nieve blanca para frenar.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'snow', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'ice' }); b.coinRow(0, 0, -5, 0, 0, -14, 4);
      b.plat(0, 0, -20, 5.5, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -20);
      b.plat(0, 0, -28, 3.8, 12, { type: 'ice' }); b.coinRow(0, 0, -24, 0, 0, -32, 3);
      b.plat(0, 0, -36, 5.5, 6, { type: 'snow' }); // zona de freno
      b.plat(0, 0, -44, 4, 14, { type: 'ice' }); b.coin(0, 0, -44);
      b.plat(0, 0, -54, 6, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -54);
      b.ramp(0, 0, -58, 0, 1.5, -66, 4, { type: 'ice' });
      b.plat(0, 1.5, -70, 5.5, 8, { type: 'snow' }); b.coin(0, 1.5, -70);
      b.plat(0, 1.5, -78, 8, 8, { type: 'snow', pillars: true });
      b.crown(0, 1.5, -79);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -20); b.wp(0, 0, -32); b.wp(0, 0, -36);
      b.wp(0, 0, -48); b.wp(0, 0, -54); b.wp(0, 1.5, -66); b.wp(0, 1.5, -79);
    },
  },
  {
    name: 'Viento Helado', target: 45,
    hint: 'Los ventiladores empujan. ¡Mira las flechas azules!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'snow', pillars: true });
      // pasillo continuo: hielo + nieve lateral solapada
      b.plat(0, 0, -14, 5.5, 22, { type: 'ice' });
      b.plat(-3.6, 0, -14, 2.8, 22, { type: 'snow' });
      b.plat(3.6, 0, -14, 2.8, 22, { type: 'snow' });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      b.wind(0, 0, -14, 5, 16, { dir: [1, 0, 0], force: 3.5 });
      b.plat(0, 0, -28, 7, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -28);
      b.plat(0, 0, -42, 5.5, 22, { type: 'ice' });
      b.plat(-3.6, 0, -42, 2.8, 22, { type: 'snow' });
      b.plat(3.6, 0, -42, 2.8, 22, { type: 'snow' });
      b.wind(0, 0, -42, 5, 16, { dir: [-1, 0, 0], force: 3.5 });
      b.coin(0, 0, -36); b.coin(0, 0, -48);
      b.plat(0, 0, -56, 7, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -56);
      b.plat(0, 0, -68, 6, 16, { type: 'ice' });
      b.wind(0, 0, -66, 5, 10, { dir: [0, 0, -1], force: 2.5 });
      b.coin(0, 0, -68);
      b.plat(0, 0, -80, 8, 8, { type: 'snow', pillars: true });
      b.crown(0, 0, -81);
      b.wp(0, 0, -2); b.wp(-1.8, 0, -14); b.wp(0, 0, -24); b.wp(0, 0, -28);
      b.wp(1.8, 0, -42); b.wp(0, 0, -52); b.wp(0, 0, -56);
      b.wp(0, 0, -68); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Cintas de Hielo', target: 48,
    hint: 'Cintas heladas empujan atrás. ¡Frena en la nieve!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'snow', pillars: true });
      b.plat(0, 0, -6, 4.5, 6, { type: 'snow' });
      b.iceConvey(0, 0, -15, 4.5, 14, { dir: [0, 0, 1], speed: 3.0 });
      b.coinRow(0, 0, -10, 0, 0, -20, 3);
      b.plat(0, 0, -25, 5.5, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -25);
      b.iceConvey(0, 0, -34, 4.5, 14, { dir: [0, 0, 1], speed: 3.0 });
      b.coin(0, 0, -30); b.coin(0, 0, -38);
      b.plat(0, 0, -44, 5.5, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -44);
      b.iceConvey(0, 0, -52, 4.5, 12, { dir: [0, 0, 1], speed: 3.2 });
      b.plat(0, 0, -61, 5.5, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -61);
      b.iceConvey(0, 0, -69, 4.5, 12, { dir: [0, 0, 1], speed: 3.2 });
      b.coin(0, 0, -69);
      b.plat(0, 0, -78, 8, 8, { type: 'snow', pillars: true });
      b.crown(0, 0, -79);
      b.wp(0, 0, -2); b.wp(0, 0, -15); b.wp(0, 0, -25);
      b.wp(0, 0, -34); b.wp(0, 0, -44); b.wp(0, 0, -52);
      b.wp(0, 0, -61); b.wp(0, 0, -69); b.wp(0, 0, -79);
    },
  },
  {
    name: 'Hielo Quebradizo', target: 48,
    hint: 'El hielo agrietado se rompe. ¡Pasa rápido!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'snow', pillars: true });
      b.plat(0, 0, -7, 4.5, 8, { type: 'snow' }); b.coin(0, 0, -7);
      for (let i = 0; i < 5; i++) b.crackIce(0, 0, -12.2 - i * 1.85, 2.6, 2.1, { delay: 0.85 });
      b.plat(0, 0, -25, 5.5, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -25); b.coin(0, 0, -25);
      for (let i = 0; i < 5; i++) b.crackIce(0, 0, -30.2 - i * 1.85, 2.6, 2.1, { delay: 0.85 });
      b.plat(0, 0, -43, 5.5, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -43);
      b.plat(0, 0, -50, 4, 8, { type: 'ice' });
      for (let i = 0; i < 4; i++) b.crackIce(0, 0, -56.2 - i * 1.85, 2.6, 2.1, { delay: 0.85 });
      b.plat(0, 0, -68, 8, 8, { type: 'snow', pillars: true });
      b.crown(0, 0, -69);
      b.wp(0, 0, -2); b.wp(0, 0, -10);
      for (let i = 0; i < 5; i++) b.wp(0, 0, -12.2 - i * 1.85, '', 8);
      b.wp(0, 0, -25);
      for (let i = 0; i < 5; i++) b.wp(0, 0, -30.2 - i * 1.85, '', 8);
      b.wp(0, 0, -43); b.wp(0, 0, -50);
      for (let i = 0; i < 4; i++) b.wp(0, 0, -56.2 - i * 1.85, '', 8);
      b.wp(0, 0, -69);
    },
  },
  {
    name: 'Bloques Deslizantes', target: 52,
    hint: 'Bloques de hielo que se mueven. ¡Salta a tiempo!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'snow', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'ice' }); b.coinRow(0, 0, -5, 0, 0, -15, 3);
      b.plat(0, 0, -20, 5.5, 6, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -20);
      const m1 = b.icePush(-2.0, 0, -25, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0 });
      const m2 = b.icePush(-2.0, 0, -30, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5 });
      b.coin(0, 0.4, -25); b.coin(0, 0.4, -30);
      b.plat(0, 0, -36, 5.5, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -36);
      const m3 = b.icePush(-2.0, 0, -42, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0 });
      const m4 = b.icePush(-2.0, 0, -47, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5 });
      b.coin(0, 0.4, -42); b.coin(0, 0.4, -47);
      b.plat(0, 0, -54, 5.5, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -54);
      b.plat(0, 0, -62, 4.5, 12, { type: 'ice' }); b.coinRow(0, 0, -58, 0, 0, -66, 2);
      b.plat(0, 0, -72, 8, 8, { type: 'snow', pillars: true });
      b.crown(0, 0, -73);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -20);
      b.wp(0, 0, -22.2, 'w', 0, { cond: () => Math.abs(m1.c.pos.x) < 0.4 });
      b.wp(0, 0, -23.0, 'j', 5);
      b.wp(0, 0, -25, 'r', 0, { follow: m1 });
      b.wp(0, 0, -27.5, 'j', 6, { follow: m1, oz: -1.0 });
      b.wp(0, 0, -30, 'r', 0, { follow: m2 });
      b.wp(0, 0, -32.5, 'j', 6, { follow: m2, oz: -1.0 });
      b.wp(0, 0, -36);
      b.wp(0, 0, -39.2, 'w', 0, { cond: () => Math.abs(m3.c.pos.x) < 0.4 });
      b.wp(0, 0, -40.0, 'j', 5);
      b.wp(0, 0, -42, 'r', 0, { follow: m3 });
      b.wp(0, 0, -44.5, 'j', 6, { follow: m3, oz: -1.0 });
      b.wp(0, 0, -47, 'r', 0, { follow: m4 });
      b.wp(0, 0, -49.5, 'j', 6, { follow: m4, oz: -1.0 });
      b.wp(0, 0, -54); b.wp(0, 0, -64); b.wp(0, 0, -73);
    },
  },
  {
    name: 'Montículos Blandos', target: 48,
    hint: 'Los montículos de nieve te lanzan. ¡Boing helado!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'snow', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'ice' }); b.coinRow(0, 0, -4, 0, 0, -12, 3);
      b.snowBump(0, 0, -14, { power: 14 });
      b.coin(0, 3.8, -17);
      b.plat(0, 3.5, -22, 5.5, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 3.5, -22);
      b.plat(0, 3.5, -30, 4.5, 14, { type: 'ice' });
      b.snowBump(0, 3.5, -34, { power: 14 });
      b.coin(0, 7.0, -37);
      b.plat(0, 6.8, -42, 5.5, 8, { type: 'snow', pillars: true }); b.checkpoint(0, 6.8, -42);
      b.plat(0, 6.8, -50, 4.5, 14, { type: 'ice' }); b.coin(0, 6.8, -48);
      b.snowBump(0, 6.8, -54, { power: 13 });
      b.plat(0, 9.5, -62, 8, 8, { type: 'snow', pillars: true });
      b.crown(0, 9.5, -63);
      b.wp(0, 0, -2); b.wp(0, 0, -14, '', 4); b.wp(0, 3.5, -22);
      b.wp(0, 3.5, -34, '', 4); b.wp(0, 6.8, -42);
      b.wp(0, 6.8, -54, '', 4); b.wp(0, 9.5, -63);
    },
  },
  {
    name: 'Carámbanos', target: 55,
    hint: '¡Cuidado con la sombra! Los carámbanos caen.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 10, { type: 'snow', pillars: true });
      b.plat(0, 0, -8, 5, 10, { type: 'snow' });
      b.plat(0, 0, -16, 4.5, 12, { type: 'ice' }); b.coin(0, 0, -14);
      const i1 = b.icicle(0, 0, -16, { period: 4.2, phase: 0 });
      b.plat(0, 0, -26, 5, 10, { type: 'snow' }); b.coin(0, 0, -26);
      b.plat(0, 0, -34, 4.5, 12, { type: 'ice' });
      const i2 = b.icicle(0, 0, -34, { period: 4.2, phase: 0.5 });
      b.plat(0, 0, -44, 6, 10, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -44);
      b.plat(0, 0, -52, 4.5, 12, { type: 'ice' }); b.coin(0, 0, -52);
      const i3 = b.icicle(0, 0, -52, { period: 4.0, phase: 0.2 });
      b.plat(0, 0, -62, 5, 10, { type: 'snow' });
      b.plat(0, 0, -70, 4.5, 12, { type: 'ice' }); b.coin(0, 0, -70);
      const i4 = b.icicle(0, 0, -70, { period: 4.0, phase: 0.55 });
      b.plat(0, 0, -80, 6, 10, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -80);
      b.plat(0, 0, -88, 4.5, 12, { type: 'ice' }); b.coin(0, 0, -88);
      const i5 = b.icicle(0, 0, -88, { period: 3.8, phase: 0.25 });
      b.plat(0, 0, -98, 8, 10, { type: 'snow', pillars: true });
      b.crown(0, 0, -99);
      const C = (j, t) => ({ cond: () => j.canCross(t) });
      b.wp(0, 0, -2); b.wp(0, 0, -8);
      b.wp(0, 0, -10, 'w', 0, C(i1, 1.4)); b.wp(0, 0, -22, '', 9); b.wp(0, 0, -26);
      b.wp(0, 0, -28, 'w', 0, C(i2, 1.4)); b.wp(0, 0, -40, '', 9); b.wp(0, 0, -44);
      b.wp(0, 0, -46, 'w', 0, C(i3, 1.4)); b.wp(0, 0, -58, '', 9); b.wp(0, 0, -62);
      b.wp(0, 0, -64, 'w', 0, C(i4, 1.4)); b.wp(0, 0, -76, '', 9); b.wp(0, 0, -80);
      b.wp(0, 0, -82, 'w', 0, C(i5, 1.4)); b.wp(0, 0, -94, '', 9); b.wp(0, 0, -99);
    },
  },
  {
    name: 'Corona del Glaciar', target: 80,
    hint: '¡La cima helada! Usa todo lo aprendido para la corona.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 10, { type: 'snow', pillars: true });
      b.plat(0, 0, -8, 4.5, 10, { type: 'snow' });
      b.iceConvey(0, 0, -16, 4.5, 12, { dir: [0, 0, 1], speed: 3.0 });
      b.coinRow(0, 0, -12, 0, 0, -20, 3);
      b.plat(0, 0, -26, 6, 10, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -26);
      b.plat(0, 0, -36, 5.5, 16, { type: 'ice' });
      b.plat(-3.6, 0, -36, 2.8, 16, { type: 'snow' });
      b.plat(3.6, 0, -36, 2.8, 16, { type: 'snow' });
      b.wind(0, 0, -36, 5, 12, { dir: [1, 0, 0], force: 3.2 });
      b.coin(0, 0, -32); b.coin(0, 0, -40);
      b.plat(0, 0, -48, 6, 10, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -48);
      for (let i = 0; i < 4; i++) b.crackIce(0, 0, -52.5 - i * 1.7, 2.8, 2.0, { delay: 0.85 });
      b.plat(0, 0, -63, 6, 10, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -63);
      const m1 = b.icePush(-2.0, 0, -70, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0 });
      const m2 = b.icePush(-2.0, 0, -75, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5 });
      b.coin(0, 0.4, -70); b.coin(0, 0.4, -75);
      b.plat(0, 0, -82, 6, 10, { type: 'snow', pillars: true }); b.checkpoint(0, 0, -82);
      b.plat(0, 0, -90, 5, 10, { type: 'snow' });
      b.plat(0, 0, -98, 4.5, 12, { type: 'ice' });
      const ic1 = b.icicle(0, 0, -98, { period: 4.2, phase: 0.1 });
      b.coin(0, 0, -98);
      b.plat(0, 0, -108, 5, 10, { type: 'snow' });
      b.plat(0, 0, -116, 4.5, 12, { type: 'ice' });
      const ic2 = b.icicle(0, 0, -116, { period: 4.2, phase: 0.55 });
      b.coin(0, 0, -116);
      b.plat(0, 0, -126, 5.5, 10, { type: 'snow' });
      b.snowBump(0, 0, -128, { power: 14 });
      b.coin(0, 3.8, -131);
      b.plat(0, 3.5, -136, 5.5, 10, { type: 'snow', pillars: true }); b.checkpoint(0, 3.5, -136);
      b.plat(0, 3.5, -146, 4.5, 14, { type: 'ice' });
      b.iceConvey(0, 3.5, -156, 4.5, 12, { dir: [0, 0, 1], speed: 3.0 });
      // solape con la cinta: primer crack en -161
      for (let i = 0; i < 3; i++) b.crackIce(0, 3.5, -161.0 - i * 1.7, 2.8, 2.0, { delay: 0.85 });
      b.plat(0, 3.5, -170, 10, 10, { type: 'snow', pillars: true });
      b.pillar(-3.2, 3.5, -173, 3.2); b.pillar(3.2, 3.5, -173, 3.2);
      b.crown(0, 3.5, -172);
      const C = (j, t) => ({ cond: () => j.canCross(t) });
      b.wp(0, 0, -2); b.wp(0, 0, -16); b.wp(0, 0, -26);
      b.wp(-1.5, 0, -36); b.wp(0, 0, -44); b.wp(0, 0, -48);
      for (let i = 0; i < 4; i++) b.wp(0, 0, -52.5 - i * 1.7, '', 8);
      b.wp(0, 0, -63);
      b.wp(0, 0, -67.2, 'w', 0, { cond: () => Math.abs(m1.c.pos.x) < 0.4 });
      b.wp(0, 0, -68.0, 'j', 5);
      b.wp(0, 0, -70, 'r', 0, { follow: m1 });
      b.wp(0, 0, -72.5, 'j', 6, { follow: m1, oz: -1.0 });
      b.wp(0, 0, -75, 'r', 0, { follow: m2 });
      b.wp(0, 0, -77.5, 'j', 6, { follow: m2, oz: -1.0 });
      b.wp(0, 0, -82); b.wp(0, 0, -90);
      b.wp(0, 0, -92, 'w', 0, C(ic1, 1.4)); b.wp(0, 0, -104, '', 9); b.wp(0, 0, -108);
      b.wp(0, 0, -110, 'w', 0, C(ic2, 1.4)); b.wp(0, 0, -122, '', 9); b.wp(0, 0, -126);
      b.wp(0, 0, -128, '', 4); b.wp(0, 3.5, -136);
      b.wp(0, 3.5, -146); b.wp(0, 3.5, -156);
      for (let i = 0; i < 3; i++) b.wp(0, 3.5, -161.0 - i * 1.7, '', 8);
      b.wp(0, 3.5, -172);
    },
  },
];


const W4B = [
  {
    name: 'Sendero Verde', target: 44,
    hint: '¡Selva densa! Barro, troncos y monedas arriesgadas.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.2, 8, { type: 'jungle', pillars: true });
      b.plat(0, 0, -42, 4.4, 76, { type: 'jungle' });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      b.mudPad(0, 0, -16, 4.4, 10);
      b.rollingLog(0, 0, -26, { to: [3.2, 0, 0], period: 2.9 });
      b.coin(1.7, 0, -26);
      b.checkpoint(0, 0, -38);
      b.mudPad(0, 0, -48, 4.4, 10);
      b.rollingLog(0, 0, -58, { to: [-3.2, 0, 0], period: 2.7, phase: 0.4 });
      b.coin(-1.7, 0, -58);
      b.plat(0, 0, -78, 5.6, 10, { type: 'jungle', pillars: true });
      b.crown(0, 0, -79);
      b.wp(0, 0, -2); b.wp(0, 0, -16);
      b.wp(-1.6, 0, -26, 't'); b.wp(0, 0, -38);
      b.wp(0, 0, -48); b.wp(1.6, 0, -58, 't'); b.wp(0, 0, -70); b.wp(0, 0, -79);
    },
  },
  {
    name: 'Troncos Rodantes', target: 52,
    hint: '¡Cuidado con los troncos que ruedan!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'jungle', pillars: true });
      b.plat(0, 0, -45, 12, 84, { type: 'jungle' }); // suelo continuo ancho
      b.coinRow(4.5, 0, -8, 4.5, 0, -30, 4);
      b.rollingLog(0, 0, -18, { to: [0, 0, -12], period: 6.04, len: 3.2 });
      b.checkpoint(0, 0, -36);
      b.coin(-4.5, 0, -46); b.coin(4.5, 0, -58);
      b.rollingLog(-3.5, 0, -50, { to: [7, 0, 0], period: 5.58, len: 3.0 });
      b.rollingLog(3.5, 0, -60, { to: [-7, 0, 0], period: 5.58, phase: 0.5, len: 3.0 });
      b.coin(4.5, 0, -80); b.coin(-4.5, 0, -84);
      b.plat(0, 0, -92, 8, 10, { type: 'jungle', pillars: true });
      b.crown(0, 0, -93);
      b.wp(0, 0, -2); b.wp(4.5, 0, -18, 't'); b.wp(4.5, 0, -30); b.wp(0, 0, -36);
      b.wp(-4.5, 0, -52, 't'); b.wp(4.5, 0, -62, 't'); b.wp(0, 0, -72);
      b.wp(4.5, 0, -82); b.wp(0, 0, -93);
    },
  },
  {
    name: 'Lianas Colgantes', target: 58,
    hint: 'Salta a las plataformas que se balancean.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.2, 6, { type: 'jungle', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'jungle' }); b.coinRow(0, 0, -5, 0, 0, -15, 3);
      b.plat(0, 0, -20, 4.6, 5, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -20);
      const v1 = b.mover(-2.0, 0, -25, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.68, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      const v2 = b.mover(-2.0, 0, -30, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.68, phase: 0.5, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      b.coin(0, 0.4, -25); b.coin(0, 0.4, -30);
      b.plat(0, 0, -36, 4.6, 6, { type: 'jungle', pillars: true }); const v3 = b.mover(-2.0, 0, -42, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.68, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      const v4 = b.mover(-2.0, 0, -47, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.68, phase: 0.5, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      b.coin(0, 0.4, -42); b.coin(0, 0.4, -47);
      b.plat(0, 0, -54, 5.8, 6, { type: 'jungle', pillars: true }); b.plat(0, 0, -62, 4, 12, { type: 'jungle' }); b.coinRow(0, 0, -58, 0, 0, -66, 2);
      b.plat(0, 0, -72, 5.8, 8, { type: 'jungle', pillars: true });
      b.crown(0, 0, -73);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -20);
      b.wp(0, 0, -22.2, 'w', 0, { cond: () => Math.abs(v1.c.pos.x) < 0.4 });
      b.wp(0, 0, -23.0, 'j', 5);
      b.wp(0, 0, -25, 'r', 0, { follow: v1 });
      b.wp(0, 0, -27.5, 'j', 6, { follow: v1, oz: -1.0 });
      b.wp(0, 0, -30, 'r', 0, { follow: v2 });
      b.wp(0, 0, -32.5, 'j', 6, { follow: v2, oz: -1.0 });
      b.wp(0, 0, -36);
      b.wp(0, 0, -39.2, 'w', 0, { cond: () => Math.abs(v3.c.pos.x) < 0.4 });
      b.wp(0, 0, -40.0, 'j', 5);
      b.wp(0, 0, -42, 'r', 0, { follow: v3 });
      b.wp(0, 0, -44.5, 'j', 6, { follow: v3, oz: -1.0 });
      b.wp(0, 0, -47, 'r', 0, { follow: v4 });
      b.wp(0, 0, -49.5, 'j', 6, { follow: v4, oz: -1.0 });
      b.wp(0, 0, -54); b.wp(0, 0, -64); b.wp(0, 0, -73);
    },
  },
  {
    name: 'Troncos Giratorios', target: 56,
    hint: 'Las plataformas giran. ¡Mantén el equilibrio!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.2, 6, { type: 'jungle', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'jungle' }); b.coinRow(0, 0, -5, 0, 0, -15, 3);
      b.plat(0, 0, -20, 4.6, 5, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -20);
      const r1 = b.mover(-2.0, 0, -25, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.68, spin: 0.55, color: 0x8a5a2a, side: 0xd4b078, h: 0.55 });
      const r2 = b.mover(-2.0, 0, -30, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.68, phase: 0.5, spin: -0.55, color: 0x8a5a2a, side: 0xd4b078, h: 0.55 });
      b.coin(0, 0.4, -25); b.coin(0, 0.4, -30);
      b.plat(0, 0, -36, 4.6, 6, { type: 'jungle', pillars: true }); const r3 = b.mover(-2.0, 0, -42, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.68, spin: 0.6, color: 0x8a5a2a, side: 0xd4b078, h: 0.55 });
      const r4 = b.mover(-2.0, 0, -47, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.68, phase: 0.5, spin: -0.6, color: 0x8a5a2a, side: 0xd4b078, h: 0.55 });
      b.coin(0, 0.4, -42); b.coin(0, 0.4, -47);
      b.plat(0, 0, -54, 5.8, 6, { type: 'jungle', pillars: true }); b.plat(0, 0, -62, 4, 12, { type: 'jungle' });
      b.plat(0, 0, -72, 5.8, 8, { type: 'jungle', pillars: true });
      b.crown(0, 0, -73);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -20);
      b.wp(0, 0, -22.2, 'w', 0, { cond: () => Math.abs(r1.c.pos.x) < 0.4 });
      b.wp(0, 0, -23.0, 'j', 5);
      b.wp(0, 0, -25, 'r', 0, { follow: r1 });
      b.wp(0, 0, -27.5, 'j', 6, { follow: r1, oz: -1.0 });
      b.wp(0, 0, -30, 'r', 0, { follow: r2 });
      b.wp(0, 0, -32.5, 'j', 6, { follow: r2, oz: -1.0 });
      b.wp(0, 0, -36);
      b.wp(0, 0, -39.2, 'w', 0, { cond: () => Math.abs(r3.c.pos.x) < 0.4 });
      b.wp(0, 0, -40.0, 'j', 5);
      b.wp(0, 0, -42, 'r', 0, { follow: r3 });
      b.wp(0, 0, -44.5, 'j', 6, { follow: r3, oz: -1.0 });
      b.wp(0, 0, -47, 'r', 0, { follow: r4 });
      b.wp(0, 0, -49.5, 'j', 6, { follow: r4, oz: -1.0 });
      b.wp(0, 0, -54); b.wp(0, 0, -64); b.wp(0, 0, -73);
    },
  },
  {
    name: 'Hojas Rebotadoras', target: 54,
    hint: 'Las hojas grandes te lanzan. ¡Boing verde!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.2, 8, { type: 'jungle', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'jungle' }); b.coinRow(0, 0, -4, 0, 0, -12, 3);
      b.leafTramp(0, 0, -14, { power: 14 });
      b.coin(0, 3.8, -17);
      b.plat(0, 3.5, -22, 4.6, 8, { type: 'jungle', pillars: true }); b.checkpoint(0, 3.5, -22);
      b.plat(0, 3.5, -30, 4.5, 14, { type: 'jungle' });
      b.leafTramp(0, 3.5, -34, { power: 14 });
      b.coin(0, 7.0, -37);
      b.plat(0, 6.8, -42, 4.6, 8, { type: 'jungle', pillars: true }); b.plat(0, 6.8, -50, 4.5, 14, { type: 'jungle' });
      b.leafTramp(0, 6.8, -54, { power: 13 });
      b.plat(0, 9.5, -62, 5.8, 8, { type: 'jungle', pillars: true });
      b.crown(0, 9.5, -63);
      b.wp(0, 0, -2); b.wp(0, 0, -14, '', 4); b.wp(0, 3.5, -22);
      b.wp(0, 3.5, -34, '', 4); b.wp(0, 6.8, -42);
      b.wp(0, 6.8, -54, '', 4); b.wp(0, 9.5, -63);
    },
  },
  {
    name: 'Barro y Troncos', target: 58,
    hint: 'Barro + troncos. ¡Pasa con calma!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'jungle', pillars: true });
      b.mudPad(0, 0, -10, 5, 12); b.coin(0, 0, -10);
      b.plat(0, 0, -20, 6, 8, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -20);
      b.plat(0, 0, -40, 10, 36, { type: 'jungle' });
      b.rollingLog(0, 0, -30, { to: [5, 0, 0], period: 5.12, len: 3.0 });
      b.coin(4, 0, -34);
      b.rollingLog(0, 0, -44, { to: [-5, 0, 0], period: 4.84, len: 3.0, phase: 0.4 });
      b.plat(0, 0, -56, 5.5, 8, { type: 'jungle', pillars: true }); b.mudPad(0, 0, -66, 4.5, 10);
      b.plat(0, 0, -76, 8, 8, { type: 'jungle', pillars: true });
      b.crown(0, 0, -77);
      b.wp(0, 0, -2); b.wp(0, 0, -10); b.wp(0, 0, -20);
      b.wp(-3.5, 0, -30, 't'); b.wp(3.5, 0, -44, 't'); b.wp(0, 0, -56);
      b.wp(0, 0, -66); b.wp(0, 0, -77);
    },
  },
  {
    name: 'Canopy Salvaje', target: 64,
    hint: 'Lianas, hojas y barro juntos.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.2, 8, { type: 'jungle', pillars: true });
      b.plat(0, 0, -10, 4.6, 12, { type: 'jungle' });
      // barro en el centro; laterales sólidos para no atascarse
      b.plat(-3.2, 0, -18, 2.2, 10, { type: 'jungle' });
      b.plat(3.2, 0, -18, 2.2, 10, { type: 'jungle' });
      b.mudPad(0, 0, -18, 4, 10); b.coin(0, 0, -18);
      b.plat(0, 0, -26, 4.6, 6, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -26);
      const v1 = b.mover(-1.8, 0, -31.2, 3.2, 3.2, { to: [3.6, 0, 0], period: 4.05, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      const v2 = b.mover(-1.8, 0, -35.6, 3.2, 3.2, { to: [3.6, 0, 0], period: 4.05, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      b.plat(0, 0, -41, 4.6, 4, { type: 'jungle', pillars: true }); b.plat(0, 0, -48, 4.5, 12, { type: 'jungle' });
      b.leafTramp(0, 0, -52, { power: 13 });
      b.plat(0, 3.2, -60, 5.8, 8, { type: 'jungle', pillars: true }); b.plat(0, 3.2, -70, 4.6, 12, { type: 'jungle' }); b.coin(0, 3.2, -70);
      b.plat(0, 3.2, -82, 5.8, 10, { type: 'jungle', pillars: true });
      b.crown(0, 3.2, -83);
      b.wp(0, 0, -2); b.wp(3.0, 0, -18); b.wp(0, 0, -26);
      b.wp(0, 0, -28.4, 'w', 0, { cond: () => Math.abs(v1.c.pos.x) < 0.4 });
      b.wp(0, 0, -29.2, 'j', 5);
      b.wp(0, 0, -31.2, 'r', 0, { follow: v1 });
      b.wp(0, 0, -33.4, 'j', 6, { follow: v1, oz: -1.0 });
      b.wp(0, 0, -35.6, 'r', 0, { follow: v2 });
      b.wp(0, 0, -37.5, 'j', 6, { follow: v2, oz: -1.0 });
      b.wp(0, 0, -41); b.wp(0, 0, -52, '', 4); b.wp(0, 3.2, -60);
      b.wp(0, 3.2, -70); b.wp(0, 3.2, -83);
    },
  },
  {
    name: 'Corona de la Selva', target: 88,
    hint: '¡La corona entre lianas! Usa todo lo aprendido.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'jungle', pillars: true });
      b.plat(0, 0, -8, 5, 8, { type: 'jungle' });
      b.mudPad(0, 0, -16, 4.5, 10); b.coin(0, 0, -16);
      b.plat(0, 0, -26, 5.5, 8, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -26);
      b.plat(0, 0, -42, 10, 28, { type: 'jungle' });
      b.rollingLog(0, 0, -34, { to: [5, 0, 0], period: 5.12, len: 3.0 });
      b.rollingLog(0, 0, -44, { to: [-5, 0, 0], period: 5.12, phase: 0.5, len: 3.0 });
      b.coin(0, 0, -38);
      b.plat(0, 0, -58, 6, 6, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -58);
      const v1 = b.vineSwing(0, 0, -63.2, { w: 3.2, d: 3.2, amp: 3.6, period: 4.09 });
      const v2 = b.vineSwing(0, 0, -67.6, { w: 3.2, d: 3.2, amp: 3.6, period: 4.09 });
      b.plat(0, 0, -73, 6, 4, { type: 'jungle', pillars: true }); b.plat(0, 0, -80, 4.5, 12, { type: 'jungle' });
      b.leafTramp(0, 0, -84, { power: 14 });
      b.plat(0, 3.5, -92, 5.5, 8, { type: 'jungle', pillars: true }); b.plat(0, 3.5, -104, 7, 20, { type: 'jungle' });
      b.rotLog(0, 3.65, -102, { w: 5.5, d: 2.8, speed: 0.35 });
      b.plat(0, 3.5, -118, 10, 10, { type: 'jungle', pillars: true });
      b.pillar(-3.2, 3.5, -121, 3); b.pillar(3.2, 3.5, -121, 3);
      b.crown(0, 3.5, -120);
      b.wp(0, 0, -2); b.wp(0, 0, -16); b.wp(0, 0, -26);
      b.wp(-3.5, 0, -34, 't'); b.wp(3.5, 0, -44, 't'); b.wp(0, 0, -58);
      b.wp(0, 0, -60.4, 'w', 0, { cond: () => Math.abs(v1.c.pos.x) < 0.4 });
      b.wp(0, 0, -61.2, 'j', 5);
      b.wp(0, 0, -63.2, 'r', 0, { follow: v1 });
      b.wp(0, 0, -65.4, 'j', 6, { follow: v1, oz: -1.0 });
      b.wp(0, 0, -67.6, 'r', 0, { follow: v2 });
      b.wp(0, 0, -69.5, 'j', 6, { follow: v2, oz: -1.0 });
      b.wp(0, 0, -73); b.wp(0, 0, -84, '', 4); b.wp(0, 3.5, -92);
      b.wp(0, 3.5, -102); b.wp(0, 3.5, -120);
    },
  },
];

const W5B = [
  {
    name: 'Dunas Suaves', target: 46,
    hint: 'Remolinos en contra y arenas movedizas.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.2, 8, { type: 'sand', pillars: true });
      b.plat(0, 0, -42, 4.3, 76, { type: 'sand' });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      b.sandWhirl(0, 0, -18, 4.3, 12, { dir: [0, 0, 1], force: 3.4 });
      b.quicksand(0, 0, -30, 3.6, 3.6);
      b.coin(0, 0, -30);
      b.checkpoint(0, 0, -40);
      b.sandWhirl(0, 0, -52, 4.3, 12, { dir: [0, 0, 1], force: 3.6 });
      b.quicksand(0, 0, -64, 3.6, 3.6);
      b.coin(0, 0, -64);
      b.plat(0, 0, -80, 5.6, 10, { type: 'sand', pillars: true });
      b.crown(0, 0, -81);
      b.wp(0, 0, -2); b.wp(0, 0, -18); b.wp(1.4, 0, -30, 't'); b.wp(0, 0, -40);
      b.wp(0, 0, -52); b.wp(-1.4, 0, -64, 't'); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Remolinos de Arena', target: 54,
    hint: 'Los remolinos empujan. ¡Mira las flechas!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.1, 8, { type: 'sand', pillars: true });
      b.plat(0, 0, -14, 4.5, 22, { type: 'sand' });
      b.plat(-3.6, 0, -14, 2.8, 22, { type: 'sand' });
      b.plat(3.6, 0, -14, 2.8, 22, { type: 'sand' });
      b.sandWhirl(0, 0, -14, 5, 16, { dir: [1, 0, 0], force: 3.5 });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      b.plat(0, 0, -28, 4.5, 8, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -28);
      b.plat(0, 0, -42, 4.5, 22, { type: 'sand' });
      b.plat(-3.6, 0, -42, 2.8, 22, { type: 'sand' });
      b.plat(3.6, 0, -42, 2.8, 22, { type: 'sand' });
      b.sandWhirl(0, 0, -42, 5, 16, { dir: [-1, 0, 0], force: 3.5 });
      b.coin(0, 0, -36); b.coin(0, 0, -48);
      b.plat(0, 0, -56, 5.7, 8, { type: 'sand', pillars: true }); b.plat(0, 0, -68, 4.5, 14, { type: 'sand' });
      b.sandWhirl(0, 0, -66, 5, 10, { dir: [0, 0, 1], force: 2.8 });
      b.plat(0, 0, -80, 5.7, 8, { type: 'sand', pillars: true });
      b.crown(0, 0, -81);
      b.wp(0, 0, -2); b.wp(-1.8, 0, -14); b.wp(0, 0, -24); b.wp(0, 0, -28);
      b.wp(1.8, 0, -42); b.wp(0, 0, -52); b.wp(0, 0, -56);
      b.wp(0, 0, -68); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Bloques de Pirámide', target: 58,
    hint: 'Bloques deslizantes de piedra. ¡Salta a tiempo!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.1, 8, { type: 'sand', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'sand' }); b.coinRow(0, 0, -5, 0, 0, -15, 3);
      b.plat(0, 0, -20, 4.5, 6, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -20);
      const m1 = b.pyramidBlock(-2.0, 0, -25, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.52 });
      const m2 = b.pyramidBlock(-2.0, 0, -30, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.52, phase: 0.5 });
      b.coin(0, 0.4, -25); b.coin(0, 0.4, -30);
      b.plat(0, 0, -36, 4.5, 8, { type: 'sand', pillars: true }); const m3 = b.pyramidBlock(-2.0, 0, -42, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.52 });
      const m4 = b.pyramidBlock(-2.0, 0, -47, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.52, phase: 0.5 });
      b.coin(0, 0.4, -42); b.coin(0, 0.4, -47);
      b.plat(0, 0, -54, 5.7, 8, { type: 'sand', pillars: true }); b.plat(0, 0, -62, 4.5, 12, { type: 'sand' });
      b.plat(0, 0, -72, 5.7, 8, { type: 'sand', pillars: true });
      b.crown(0, 0, -73);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -20);
      b.wp(0, 0, -22.2, 'w', 0, { cond: () => Math.abs(m1.c.pos.x) < 0.4 });
      b.wp(0, 0, -23.0, 'j', 5);
      b.wp(0, 0, -25, 'r', 0, { follow: m1 });
      b.wp(0, 0, -27.5, 'j', 6, { follow: m1, oz: -1.0 });
      b.wp(0, 0, -30, 'r', 0, { follow: m2 });
      b.wp(0, 0, -32.5, 'j', 6, { follow: m2, oz: -1.0 });
      b.wp(0, 0, -36);
      b.wp(0, 0, -39.2, 'w', 0, { cond: () => Math.abs(m3.c.pos.x) < 0.4 });
      b.wp(0, 0, -40.0, 'j', 5);
      b.wp(0, 0, -42, 'r', 0, { follow: m3 });
      b.wp(0, 0, -44.5, 'j', 6, { follow: m3, oz: -1.0 });
      b.wp(0, 0, -47, 'r', 0, { follow: m4 });
      b.wp(0, 0, -49.5, 'j', 6, { follow: m4, oz: -1.0 });
      b.wp(0, 0, -54); b.wp(0, 0, -64); b.wp(0, 0, -73);
    },
  },
  {
    name: 'Escarabajos', target: 58,
    hint: 'Escarabajos que empujan. ¡Esquívalos!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'sand', pillars: true });
      b.plat(0, 0, -45, 12, 84, { type: 'sand' });
      b.coinRow(4.5, 0, -8, 4.5, 0, -30, 4);
      b.scarab(0, 0, -18, { to: [0, 0, -12], period: 6.04 });
      b.checkpoint(0, 0, -36);
      b.coin(-4.5, 0, -46); b.coin(4.5, 0, -58);
      b.scarab(-3.5, 0, -50, { to: [7, 0, 0], period: 5.58 });
      b.scarab(3.5, 0, -60, { to: [-7, 0, 0], period: 5.58, phase: 0.5 });
      b.coin(4.5, 0, -80); b.coin(-4.5, 0, -84);
      b.plat(0, 0, -92, 8, 10, { type: 'sand', pillars: true });
      b.crown(0, 0, -93);
      b.wp(0, 0, -2); b.wp(4.5, 0, -18, 't'); b.wp(4.5, 0, -30); b.wp(0, 0, -36);
      b.wp(-4.5, 0, -52, 't'); b.wp(4.5, 0, -62, 't'); b.wp(0, 0, -72);
      b.wp(4.5, 0, -82); b.wp(0, 0, -93);
    },
  },
  {
    name: 'Arenisca Frágil', target: 56,
    hint: 'La arenisca se rompe. ¡Pasa rápido!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.1, 8, { type: 'sand', pillars: true });
      b.plat(0, 0, -7, 4.5, 8, { type: 'sand' }); b.coin(0, 0, -7);
      for (let i = 0; i < 5; i++) b.sandstone(0, 0, -12.2 - i * 1.85, 2.6, 2.1, { delay: 0.85 });
      b.plat(0, 0, -25, 4.5, 8, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -25); b.coin(0, 0, -25);
      for (let i = 0; i < 5; i++) b.sandstone(0, 0, -30.2 - i * 1.85, 2.6, 2.1, { delay: 0.85 });
      b.plat(0, 0, -43, 4.5, 8, { type: 'sand', pillars: true }); b.plat(0, 0, -50, 4, 8, { type: 'sand' });
      for (let i = 0; i < 4; i++) b.sandstone(0, 0, -56.2 - i * 1.85, 2.6, 2.1, { delay: 0.85 });
      b.plat(0, 0, -68, 5.7, 8, { type: 'sand', pillars: true });
      b.crown(0, 0, -69);
      b.wp(0, 0, -2); b.wp(0, 0, -10);
      for (let i = 0; i < 5; i++) b.wp(0, 0, -12.2 - i * 1.85, '', 8);
      b.wp(0, 0, -25);
      for (let i = 0; i < 5; i++) b.wp(0, 0, -30.2 - i * 1.85, '', 8);
      b.wp(0, 0, -43); b.wp(0, 0, -50);
      for (let i = 0; i < 4; i++) b.wp(0, 0, -56.2 - i * 1.85, '', 8);
      b.wp(0, 0, -69);
    },
  },
  {
    name: 'Oasis Peligroso', target: 60,
    hint: 'Arena, remolinos y escarabajos.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.1, 6, { type: 'sand', pillars: true });
      b.plat(0, 0, -40, 4.5, 76, { type: 'sand' });
      b.quicksand(0, 0.02, -14, 4, 10); b.coin(0, 0, -14);
      b.checkpoint(0, 0, -28);
      b.sandWhirl(0, 0, -40, 5, 14, { dir: [1, 0, 0], force: 3.0 });
      b.scarab(0, 0, -44, { to: [5, 0, 0], period: 4.4 });
      b.coin(4, 0, -40);
      for (let i = 0; i < 4; i++) b.sandstone(0, 0, -64.0 - i * 1.85, 2.6, 2.1, { delay: 0.85 });
      b.plat(0, 0, -78, 5.7, 10, { type: 'sand', pillars: true });
      b.crown(0, 0, -79);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -28);
      b.wp(-2.0, 0, -40); b.wp(-2.0, 0, -44, 't'); b.wp(0, 0, -58);
      for (let i = 0; i < 4; i++) b.wp(0, 0, -64.0 - i * 1.85, '', 8);
      b.wp(0, 0, -79);
    },
  },
  {
    name: 'Templo del Escarabajo', target: 66,
    hint: 'Pirámides y escarabajos protegen el camino.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'sand', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'sand' }); b.coinRow(0, 0, -5, 0, 0, -15, 2);
      b.plat(0, 0, -20, 5, 5, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -20);
      const m1 = b.pyramidBlock(-2.0, 0, -25, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.72 });
      const m2 = b.pyramidBlock(-2.0, 0, -30, 3.4, 3.4, { to: [4.0, 0, 0], period: 3.72, phase: 0.5 });
      b.coin(0, 0.4, -25); b.coin(0, 0.4, -30);
      b.plat(0, 0, -36, 5, 6, { type: 'sand', pillars: true }); b.plat(0, 0, -65, 12, 54, { type: 'sand' }); // continuo hasta la corona
      b.scarab(0, 0, -46, { to: [5, 0, 0], period: 4.65 });
      b.scarab(0, 0, -56, { to: [-5, 0, 0], period: 4.65, phase: 0.45 });
      b.quicksand(0, 0.02, -78, 4, 10);
      b.plat(0, 0, -92, 8, 10, { type: 'sand', pillars: true });
      b.crown(0, 0, -93);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -20);
      b.wp(0, 0, -22.2, 'w', 0, { cond: () => Math.abs(m1.c.pos.x) < 0.4 });
      b.wp(0, 0, -23.0, 'j', 5);
      b.wp(0, 0, -25, 'r', 0, { follow: m1 });
      b.wp(0, 0, -27.5, 'j', 6, { follow: m1, oz: -1.0 });
      b.wp(0, 0, -30, 'r', 0, { follow: m2 });
      b.wp(0, 0, -32.5, 'j', 6, { follow: m2, oz: -1.0 });
      b.wp(0, 0, -36);
      b.wp(-3.5, 0, -46, 't'); b.wp(3.5, 0, -56, 't'); b.wp(0, 0, -68);
      b.wp(0, 0, -78); b.wp(0, 0, -93);
    },
  },
  {
    name: 'Corona del Desierto', target: 92,
    hint: '¡La gran pirámide! Combina todos los peligros.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'sand', pillars: true });
      b.plat(0, 0, -70, 12, 136, { type: 'sand' }); // suelo continuo enorme
      b.quicksand(0, 0.02, -14, 4, 10); b.coin(0, 0, -14);
      b.checkpoint(0, 0, -26);
      b.sandWhirl(0, 0, -38, 5, 14, { dir: [1, 0, 0], force: 3.0 });
      b.coin(-2, 0, -38);
      b.checkpoint(0, 0, -50);
      for (let i = 0; i < 4; i++) b.sandstone(0, 0, -56.0 - i * 1.7, 2.8, 2.0, { delay: 0.85 });
      // bloques sobre el suelo (no hace falta saltar al vacío)
      b.pyramidBlock(-2.0, 0.15, -76, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.19 });
      b.pyramidBlock(-2.0, 0.15, -82, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.19, phase: 0.5 });
      b.coin(0, 0.5, -76); b.coin(0, 0.5, -82);
      b.scarab(0, 0, -100, { to: [5, 0, 0], period: 4.65 });
      b.scarab(0, 0, -110, { to: [-5, 0, 0], period: 4.65, phase: 0.5 });
      b.quicksand(0, 0.02, -128, 4, 10);
      b.plat(0, 0, -140, 10, 10, { type: 'sand', pillars: true });
      b.pillar(-3.2, 0, -143, 3.5); b.pillar(3.2, 0, -143, 3.5);
      b.crown(0, 0, -142);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -26);
      b.wp(-2.0, 0, -38); b.wp(0, 0, -50);
      for (let i = 0; i < 4; i++) b.wp(0, 0, -56.0 - i * 1.7, '', 8);
      b.wp(0, 0, -68); b.wp(-2.0, 0, -76, 't'); b.wp(2.0, 0, -82, 't');
      b.wp(0, 0, -92); b.wp(-3.5, 0, -100, 't'); b.wp(3.5, 0, -110, 't');
      b.wp(0, 0, -120); b.wp(0, 0, -128); b.wp(0, 0, -142);
    },
  },
];





const W6B = [
  {
    name: 'Pasillo Pastel', target: 48,
    hint: 'Prensas tempranas y cinta de chocolate en contra.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.2, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -42, 4.2, 76, { type: 'candy' });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      b.jellyPad(0, 0, -14, { power: 12 });
      const p1 = b.candyCrusher(0, 0, -24, { period: 2.9 });
      b.checkpoint(0, 0, -38);
      b.chocConvey(0, 0, -50, 4.2, 12, { dir: [0, 0, 1], speed: 3.6 });
      b.coin(0, 0, -50);
      const p2 = b.candyCrusher(0, 0, -64, { period: 2.8, phase: 0.45 });
      b.plat(0, 0, -80, 5.6, 10, { type: 'candy', pillars: true });
      b.crown(0, 0, -81);
      const W = (p, lead) => ({ cond: () => p.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -14);
      b.wp(0, 0, -21.5, 'w', 0, W(p1, 0.1)); b.wp(0, 0, -30, '', 7); b.wp(0, 0, -38);
      b.wp(0, 0, -50); b.wp(0, 0, -61.5, 'w', 0, W(p2, 0.1)); b.wp(0, 0, -72, '', 7); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Gelatina Saltarina', target: 56,
    hint: 'La gelatina te lanza. ¡Boing rosa!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -10, 4.4, 14, { type: 'candy' }); b.coinRow(0, 0, -4, 0, 0, -12, 3);
      b.jellyPad(0, 0, -14, { power: 14 });
      b.coin(0, 3.8, -17);
      b.plat(0, 3.5, -22, 4.4, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 3.5, -22);
      b.plat(0, 3.5, -30, 4.4, 14, { type: 'candy' });
      b.jellyPad(0, 3.5, -34, { power: 14 });
      b.coin(0, 7.0, -37);
      b.plat(0, 6.8, -42, 4.4, 8, { type: 'candy', pillars: true }); b.plat(0, 6.8, -50, 4.4, 14, { type: 'candy' });
      b.jellyPad(0, 6.8, -54, { power: 13 });
      b.plat(0, 9.5, -62, 5.6, 8, { type: 'candy', pillars: true });
      b.crown(0, 9.5, -63);
      b.wp(0, 0, -2); b.wp(0, 0, -14, '', 4); b.wp(0, 3.5, -22);
      b.wp(0, 3.5, -34, '', 4); b.wp(0, 6.8, -42);
      b.wp(0, 6.8, -54, '', 4); b.wp(0, 9.5, -63);
    },
  },
  {
    name: 'Prensas Dulces', target: 58,
    hint: '¡Las prensas bajan! Pasa cuando están arriba.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'candy', pillars: true });
      b.plat(0, 0, -20, 5, 34, { type: 'candy' }); b.coinRow(0, 0, -5, 0, 0, -28, 4);
      const c1 = b.candyCrusher(0, 0, -14, { period: 3.16, w: 2.0, d: 2.0 });
      const c2 = b.candyCrusher(0, 0, -24, { period: 3.16, phase: 0.5, w: 2.0, d: 2.0 });
      b.plat(0, 0, -42, 6, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -42);
      b.plat(0, 0, -60, 5, 28, { type: 'candy' });
      const c3 = b.candyCrusher(0, 0, -52, { period: 2.98, phase: 0.2, w: 2.0, d: 2.0 });
      const c4 = b.candyCrusher(0, 0, -62, { period: 2.98, phase: 0.7, w: 2.0, d: 2.0 });
      b.coin(0, 0, -55); b.coin(0, 0, -65);
      b.plat(0, 0, -80, 8, 10, { type: 'candy', pillars: true });
      b.crown(0, 0, -81);
      const W = (c, lead) => ({ cond: () => c.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -10);
      b.wp(0, 0, -11.5, 'w', 0, W(c1, 0.1)); b.wp(0, 0, -18, '', 7);
      b.wp(0, 0, -21.5, 'w', 0, W(c2, 0.1)); b.wp(0, 0, -32); b.wp(0, 0, -42);
      b.wp(0, 0, -49.5, 'w', 0, W(c3, 0.1)); b.wp(0, 0, -57, '', 7);
      b.wp(0, 0, -59.5, 'w', 0, W(c4, 0.1)); b.wp(0, 0, -70); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Piruletas Giratorias', target: 58,
    hint: 'Brazos de piruleta. ¡Esquívalos o wait!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -40, 12, 72, { type: 'candy' }); // suelo continuo
      b.plat(0, 0, -20, 8, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -20);
      const t1 = b.lolliArm(0, 0, -32, { len: 3.2, speed: 0.7, arms: 3 });
      b.coin(4.5, 0, -32); b.coin(-4.5, 0, -32);
      b.plat(0, 0, -46, 8, 8, { type: 'candy', pillars: true }); const t2 = b.lolliArm(0, 0, -58, { len: 3.2, speed: 0.75, arms: 3 });
      b.coin(4.5, 0, -58);
      b.plat(0, 0, -72, 8, 10, { type: 'candy', pillars: true });
      b.crown(0, 0, -73);
      void t1; void t2;
      b.wp(0, 0, -2); b.wp(0, 0, -12); b.wp(0, 0, -20);
      b.wp(4.5, 0, -28); b.wp(4.5, 0, -32, 't'); b.wp(4.5, 0, -38); b.wp(0, 0, -46);
      b.wp(-4.5, 0, -52); b.wp(-4.5, 0, -58, 't'); b.wp(-4.5, 0, -64); b.wp(0, 0, -73);
    },
  },
  {
    name: 'Río de Chocolate', target: 60,
    hint: '¡El chocolate empuja hacia atrás! Rema fuerte.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { type: 'candy', pillars: true });
      b.plat(0, 0, -6, 4.4, 6, { type: 'candy' });
      b.chocConvey(0, 0, -15, 4.5, 14, { dir: [0, 0, 1], speed: 3.96 });
      b.coinRow(0, 0, -10, 0, 0, -20, 3);
      b.plat(0, 0, -25, 4.4, 6, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -25);
      b.chocConvey(0, 0, -34, 4.5, 14, { dir: [0, 0, 1], speed: 3.96 });
      b.coin(0, 0, -30); b.coin(0, 0, -38);
      b.plat(0, 0, -44, 4.4, 6, { type: 'candy', pillars: true }); b.chocConvey(0, 0, -52, 4.5, 12, { dir: [0, 0, 1], speed: 4.18 });
      b.plat(0, 0, -61, 5.6, 6, { type: 'candy', pillars: true }); b.chocConvey(0, 0, -69, 4.5, 12, { dir: [0, 0, 1], speed: 4.18 });
      b.coin(0, 0, -69);
      b.plat(0, 0, -78, 5.6, 8, { type: 'candy', pillars: true });
      b.crown(0, 0, -79);
      b.wp(0, 0, -2); b.wp(0, 0, -15); b.wp(0, 0, -25);
      b.wp(0, 0, -34); b.wp(0, 0, -44); b.wp(0, 0, -52);
      b.wp(0, 0, -61); b.wp(0, 0, -69); b.wp(0, 0, -79);
    },
  },
  {
    name: 'Donuts Lanzadores', target: 56,
    hint: 'Salta en el donut para salir volando.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -10, 4.4, 14, { type: 'candy' }); b.coinRow(0, 0, -4, 0, 0, -12, 3);
      b.donutRing(0, 0, -14, { power: 14 });
      b.coin(0, 3.8, -17);
      b.plat(0, 3.5, -22, 4.4, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 3.5, -22);
      b.plat(0, 3.5, -30, 4.4, 14, { type: 'candy' });
      b.donutRing(0, 3.5, -34, { power: 14 });
      b.coin(0, 7.0, -37);
      b.plat(0, 6.8, -42, 4.4, 8, { type: 'candy', pillars: true }); b.plat(0, 6.8, -50, 4.4, 14, { type: 'candy' });
      b.donutRing(0, 6.8, -54, { power: 13 });
      b.plat(0, 9.5, -62, 5.6, 8, { type: 'candy', pillars: true });
      b.crown(0, 9.5, -63);
      b.wp(0, 0, -2); b.wp(0, 0, -14, '', 4); b.wp(0, 3.5, -22);
      b.wp(0, 3.5, -34, '', 4); b.wp(0, 6.8, -42);
      b.wp(0, 6.8, -54, '', 4); b.wp(0, 9.5, -63);
    },
  },
  {
    name: 'Mezcla Azucarada', target: 68,
    hint: 'Chicle, gelatina y prensas juntos.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -9, 4.4, 12, { type: 'candy' });
      // chicle con laterales sólidos (no atascar bot)
      b.plat(-3.2, 0, -20, 2.2, 12, { type: 'candy' });
      b.plat(3.2, 0, -20, 2.2, 12, { type: 'candy' });
      b.gumPad(0, 0, -20, 4.0, 12); b.coin(0, 0, -20);
      b.plat(0, 0, -30, 4.4, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -30);
      b.plat(0, 0, -38, 4.4, 12, { type: 'candy' });
      b.jellyPad(0, 0, -42, { power: 14 });
      b.plat(0, 3.5, -50, 4.4, 8, { type: 'candy', pillars: true }); b.plat(0, 3.5, -64, 4.4, 24, { type: 'candy' });
      const c1 = b.candyCrusher(0, 3.5, -60, { period: 2.89, w: 2.0, d: 2.0 , phase: 0.70});
      b.coin(0, 3.5, -66);
      b.plat(0, 3.5, -80, 5.6, 8, { type: 'candy', pillars: true });
      b.crown(0, 3.5, -81);
      const W = (c, lead) => ({ cond: () => c.safe(lead) });
      b.wp(0, 0, -2); b.wp(3.0, 0, -20); b.wp(0, 0, -30);
      b.wp(0, 0, -42, '', 4); b.wp(0, 3.5, -50);
      b.wp(0, 3.5, -57.5, 'w', 0, W(c1, 0.1)); b.wp(0, 3.5, -66, '', 7); b.wp(0, 3.5, -81);
    },
  },
  {
    name: 'Corona de Caramelo', target: 95,
    hint: '¡La gran fábrica! Combina todos los dulces.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -9, 5, 12, { type: 'candy' });
      b.plat(-3.2, 0, -20, 2.2, 12, { type: 'candy' });
      b.plat(3.2, 0, -20, 2.2, 12, { type: 'candy' });
      b.gumPad(0, 0, -20, 4.0, 12); b.coin(0, 0, -20);
      b.plat(0, 0, -30, 6, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -30);
      b.chocConvey(0, 0, -40, 4.5, 14, { dir: [0, 0, 1], speed: 3.71 });
      b.plat(0, 0, -50, 6, 6, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -50);
      b.plat(0, 0, -58, 4.5, 12, { type: 'candy' });
      b.donutRing(0, 0, -62, { power: 14 });
      b.plat(0, 3.5, -70, 6, 6, { type: 'candy', pillars: true }); b.plat(0, 3.5, -82, 5, 20, { type: 'candy' });
      const c1 = b.candyCrusher(0, 3.5, -78, { period: 3.16, w: 2.0, d: 2.0 });
      b.plat(0, 3.5, -94, 12, 16, { type: 'candy' });
      const t1 = b.lolliArm(0, 3.5, -94, { len: 3.2, speed: 0.7, arms: 3 });
      b.plat(0, 3.5, -106, 6, 6, { type: 'candy' });
      b.jellyPad(0, 3.5, -110, { power: 14 });
      b.plat(0, 6.8, -118, 10, 10, { type: 'candy', pillars: true });
      b.pillar(-3.2, 6.8, -121, 3); b.pillar(3.2, 6.8, -121, 3);
      b.crown(0, 6.8, -120);
      void t1;
      const W = (c, lead) => ({ cond: () => c.safe(lead) });
      b.wp(0, 0, -2); b.wp(3.0, 0, -20); b.wp(0, 0, -30);
      b.wp(0, 0, -40); b.wp(0, 0, -50);
      b.wp(0, 0, -62, '', 4); b.wp(0, 3.5, -70);
      b.wp(0, 3.5, -75.5, 'w', 0, W(c1, 0.1)); b.wp(0, 3.5, -84, '', 7);
      b.wp(4.2, 3.5, -90); b.wp(4.2, 3.5, -94, 't'); b.wp(4.2, 3.5, -100); b.wp(0, 3.5, -106);
      b.wp(0, 3.5, -110, '', 4); b.wp(0, 6.8, -120);
    },
  },
];

const W7B = [
  {
    name: 'Arrecife Suave', target: 50,
    hint: 'Corrientes en contra y erizos al borde.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.2, 8, { type: 'coral', pillars: true });
      b.plat(0, 0, -42, 4.2, 76, { type: 'coral' });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      b.waterCurrent(0, 0, -16, 4.2, 12, { dir: [0, 0, 1], force: 3.5 });
      b.urchin(1.9, 0, -22); b.urchin(-1.9, 0, -28);
      b.checkpoint(0, 0, -38);
      b.waterCurrent(0, 0, -50, 4.2, 12, { dir: [0, 0, 1], force: 3.7 });
      b.urchin(-1.9, 0, -54); b.urchin(1.9, 0, -60);
      b.coin(0, 0, -56);
      b.plat(0, 0, -80, 5.6, 10, { type: 'coral', pillars: true });
      b.crown(0, 0, -81);
      b.wp(0, 0, -2); b.wp(-1.0, 0, -16); b.wp(0, 0, -28); b.wp(0, 0, -38);
      b.wp(1.0, 0, -50); b.wp(0, 0, -60); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Columnas de Burbujas', target: 58,
    hint: 'Las burbujas te levantan. ¡Flota hacia arriba!',
    build(b) {
      // huecos con columnas de burbujas (sin suelo debajo para poder flotar)
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'coral', pillars: true });
      b.plat(0, 0, -8, 4.3, 8, { type: 'coral' });
      b.bubbleColumn(0, 0, -14, 4.5, 4.5, { force: 24 });
      b.coin(0, 2.5, -14);
      b.plat(0, 3.5, -22, 4.3, 8, { type: 'coral', pillars: true }); b.checkpoint(0, 3.5, -22);
      b.plat(0, 3.5, -28, 4.3, 6, { type: 'coral' });
      b.bubbleColumn(0, 3.5, -34, 4.5, 4.5, { force: 24 });
      b.coin(0, 6.0, -34);
      b.plat(0, 6.8, -42, 4.3, 8, { type: 'coral', pillars: true }); b.plat(0, 6.8, -48, 4.3, 6, { type: 'coral' });
      b.bubbleColumn(0, 6.8, -54, 4.5, 4.5, { force: 22 });
      b.plat(0, 9.5, -62, 5.5, 8, { type: 'coral', pillars: true });
      b.crown(0, 9.5, -63);
      const Hi = (y) => { const oy = b.oy || 0; return { cond: () => (window.__game && window.__game.ball.pos.y > y + oy) }; };
      b.wp(0, 0, -2); b.wp(0, 0, -10);
      b.wp(0, 3.2, -14, 'w', 0, Hi(3.0)); b.wp(0, 3.5, -22);
      b.wp(0, 3.5, -30); b.wp(0, 6.5, -34, 'w', 0, Hi(6.3)); b.wp(0, 6.8, -42);
      b.wp(0, 6.8, -50); b.wp(0, 9.2, -54, 'w', 0, Hi(9.0)); b.wp(0, 9.5, -63);
    },
  },
  {
    name: 'Medusas Rebotonas', target: 58,
    hint: '¡Medusas! Empujan si las tocas.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'coral', pillars: true });
      b.plat(0, 0, -45, 12, 84, { type: 'coral' });
      b.coinRow(4.5, 0, -8, 4.5, 0, -30, 4);
      b.jellyFish(0, 0, -18, { to: [0, 0, -12], period: 6.04 });
      b.checkpoint(0, 0, -36);
      b.coin(-4.5, 0, -46); b.coin(4.5, 0, -58);
      b.jellyFish(-3.5, 0, -50, { to: [7, 0, 0], period: 5.58 });
      b.jellyFish(3.5, 0, -60, { to: [-7, 0, 0], period: 5.58, phase: 0.5 });
      b.coin(4.5, 0, -80); b.coin(-4.5, 0, -84);
      b.plat(0, 0, -92, 8, 10, { type: 'coral', pillars: true });
      b.crown(0, 0, -93);
      b.wp(0, 0, -2); b.wp(4.5, 0, -18, 't'); b.wp(4.5, 0, -30); b.wp(0, 0, -36);
      b.wp(-4.5, 0, -52, 't'); b.wp(4.5, 0, -62, 't'); b.wp(0, 0, -72);
      b.wp(4.5, 0, -82); b.wp(0, 0, -93);
    },
  },
  {
    name: 'Almejas Abiertas', target: 60,
    hint: 'Salta a la almeja cuando esté abierta.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { type: 'coral', pillars: true });
      b.plat(0, 0, -40, 4.3, 76, { type: 'coral' });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      const a1 = b.clam(0, 0, -18, { period: 2.95 });
      b.checkpoint(0, 0, -28);
      const a2 = b.clam(-2.0, 0, -40, { period: 2.79, phase: 0.59 });
      const a3 = b.clam(2.0, 0, -50, { period: 2.79, phase: 0.06 });
      b.coin(0, 0, -44);
      const a4 = b.clam(0, 0, -70, { period: 2.62 , phase: 0.40});
      b.plat(0, 0, -84, 5.5, 10, { type: 'coral', pillars: true });
      b.crown(0, 0, -85);
      const O = (a) => ({ cond: () => a.open(0.15) });
      b.wp(0, 0, -2); b.wp(0, 0, -14);
      b.wp(0, 0, -16.5, 'w', 0, O(a1)); b.wp(0, 0, -22); b.wp(0, 0, -28);
      b.wp(-2.0, 0, -38.5, 'w', 0, O(a2)); b.wp(-2.0, 0, -44);
      b.wp(2.0, 0, -48.5, 'w', 0, O(a3)); b.wp(2.0, 0, -54);
      b.wp(0, 0, -60);
      b.wp(0, 0, -68.5, 'w', 0, O(a4)); b.wp(0, 0, -76); b.wp(0, 0, -85);
    },
  },
  {
    name: 'Anclas Oscilantes', target: 58,
    hint: 'Anclas que se balancean. ¡Pasa con timing!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { type: 'coral', pillars: true });
      b.plat(0, 0, -12, 3.4, 18, { type: 'coral' }); b.coinRow(0, 0, -5, 0, 0, -16, 3);
      const h1 = b.swingingAnchor(0, 0, -8, { speed: 1.6, phase: 0, len: 4.2 });
      const h2 = b.swingingAnchor(0, 0, -13, { speed: 1.6, phase: Math.PI * 0.6, len: 4.2 });
      b.plat(0, 0, -22, 4.3, 6, { type: 'coral', pillars: true }); b.checkpoint(0, 0, -22);
      b.plat(0, 0, -38, 3.4, 24, { type: 'coral' });
      const h3 = b.swingingAnchor(0, 0, -32, { speed: 1.7, phase: 0, len: 4.2 });
      const h4 = b.swingingAnchor(0, 0, -38, { speed: 1.7, phase: 2.1, len: 4.2 });
      b.coin(0, 0, -35);
      b.plat(0, 0, -52, 5.5, 6, { type: 'coral', pillars: true }); b.plat(0, 0, -64, 4.3, 20, { type: 'coral' });
      b.plat(0, 0, -78, 5.5, 10, { type: 'coral', pillars: true });
      b.crown(0, 0, -79);
      const W = (h, lead) => ({ cond: () => h.safe(lead) });
      b.wp(0, 0, -2);
      b.wp(0, 0, -5.5, 'w', 0, W(h1, 0.25)); b.wp(0, 0, -10.5, 'w', 0, W(h2, 0.25));
      b.wp(0, 0, -18); b.wp(0, 0, -22);
      b.wp(0, 0, -29.5, 'w', 0, W(h3, 0.25)); b.wp(0, 0, -35.5, 'w', 0, W(h4, 0.25));
      b.wp(0, 0, -46); b.wp(0, 0, -52);
      b.wp(0, 0, -64); b.wp(0, 0, -79);
    },
  },
  {
    name: 'Erizos Punzantes', target: 56,
    hint: 'Erizos de mar. ¡Pasa por los lados!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'coral', pillars: true });
      b.plat(0, 0, -48, 12, 92, { type: 'coral' }); // continuo hasta el final
      b.coinRow(4.2, 0, -8, 4.2, 0, -28, 4);
      b.urchin(0, 0, -16, { r: 0.55 }); b.urchin(0, 0, -26, { r: 0.55 });
      b.checkpoint(0, 0, -36);
      b.urchin(0, 0, -48, { r: 0.55 }); b.urchin(0, 0, -58, { r: 0.55 });
      b.coin(4.2, 0, -52);
      b.urchin(0, 0, -76, { r: 0.55 });
      b.plat(0, 0, -92, 8, 10, { type: 'coral', pillars: true });
      b.crown(0, 0, -93);
      b.wp(0, 0, -2); b.wp(4.2, 0, -16, 't'); b.wp(4.2, 0, -26, 't'); b.wp(0, 0, -36);
      b.wp(4.2, 0, -48, 't'); b.wp(4.2, 0, -58, 't'); b.wp(0, 0, -68);
      b.wp(4.2, 0, -76, 't'); b.wp(0, 0, -93);
    },
  },
  {
    name: 'Corriente Profunda', target: 70,
    hint: 'Burbujas, corrientes y medusas.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'coral', pillars: true });
      b.plat(0, 0, -12, 6, 16, { type: 'coral' });
      b.plat(0, 0, -28, 10, 20, { type: 'coral' });
      b.plat(-4.0, 0, -28, 2.5, 20, { type: 'coral' });
      b.plat(4.0, 0, -28, 2.5, 20, { type: 'coral' });
      b.waterCurrent(0, 0, -28, 5, 14, { dir: [1, 0, 0], force: 2.8 });
      b.jellyFish(0, 0, -30, { to: [4, 0, 0], period: 4.65 });
      b.plat(0, 0, -42, 6, 6, { type: 'coral', pillars: true }); b.checkpoint(0, 0, -42);
      b.plat(0, 0, -48, 4.5, 6, { type: 'coral' });
      b.bubbleColumn(0, 0, -54, 4.5, 4.5, { force: 20, power: 15 });
      b.plat(0, 3.5, -62, 5.5, 8, { type: 'coral', pillars: true }); b.plat(0, 3.5, -72, 10, 14, { type: 'coral' });
      b.urchin(0, 3.5, -72, { r: 0.55 });
      b.plat(0, 3.5, -84, 8, 8, { type: 'coral', pillars: true });
      b.crown(0, 3.5, -85);
      const Hi = (y) => { const oy = b.oy || 0; return { cond: () => (window.__game && window.__game.ball.pos.y > y + oy) }; };
      b.wp(0, 0, -2); b.wp(0, 0, -12); b.wp(-2.2, 0, -28); b.wp(-2.2, 0, -34, 't');
      b.wp(0, 0, -42); b.wp(0, 0, -48); b.wp(0, 3.2, -54, 'w', 0, Hi(3.0)); b.wp(0, 3.5, -62);
      b.wp(4.5, 3.5, -72, 't'); b.wp(0, 3.5, -85);
    },
  },
  {
    name: 'Corona del Arrecife', target: 98,
    hint: '¡El gran arrecife! Usa todo lo aprendido.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'coral', pillars: true });
      b.plat(0, 0, -12, 6, 16, { type: 'coral' });
      b.plat(0, 0, -28, 10, 20, { type: 'coral' });
      b.plat(-4.0, 0, -28, 2.5, 20, { type: 'coral' });
      b.plat(4.0, 0, -28, 2.5, 20, { type: 'coral' });
      b.waterCurrent(0, 0, -28, 5, 14, { dir: [1, 0, 0], force: 2.6 });
      b.plat(0, 0, -42, 6, 6, { type: 'coral', pillars: true }); b.checkpoint(0, 0, -42);
      b.plat(0, 0, -48, 4.5, 6, { type: 'coral' });
      b.bubbleColumn(0, 0, -54, 4.5, 4.5, { force: 20, power: 15 });
      b.plat(0, 3.5, -62, 6, 6, { type: 'coral', pillars: true }); b.checkpoint(0, 3.5, -62);
      b.plat(0, 3.5, -90, 10, 52, { type: 'coral' });
      const a1 = b.clam(0, 3.5, -70, { period: 3.35 });
      const a2 = b.clam(0, 3.5, -80, { period: 3.35, phase: 0.4 });
      b.urchin(0, 3.5, -100, { r: 0.55 });
      // pasillo continuo bajo el ancla hasta la corona
      b.plat(0, 3.5, -118, 4, 28, { type: 'coral' });
      const h1 = b.swingingAnchor(0, 3.5, -116, { speed: 1.5, len: 4.2 });
      b.plat(0, 3.5, -136, 10, 10, { type: 'coral', pillars: true });
      b.pillar(-3.2, 3.5, -139, 3); b.pillar(3.2, 3.5, -139, 3);
      b.crown(0, 3.5, -138);
      const Hi = (y) => { const oy = b.oy || 0; return { cond: () => (window.__game && window.__game.ball.pos.y > y + oy) }; };
      const O = (a) => ({ cond: () => a.open(0.15) });
      const Wh = (h, lead) => ({ cond: () => h.safe(lead) });
      b.wp(0, 0, -2); b.wp(-2.2, 0, -28); b.wp(0, 0, -42);
      b.wp(0, 0, -48); b.wp(0, 3.2, -54, 'w', 0, Hi(3.0)); b.wp(0, 3.5, -62);
      b.wp(0, 3.5, -67.5, 'w', 0, O(a1)); b.wp(0, 3.5, -74, '', 7);
      b.wp(0, 3.5, -77.5, 'w', 0, O(a2)); b.wp(0, 3.5, -86, '', 7); b.wp(0, 3.5, -90);
      b.wp(4.2, 3.5, -100, 't'); b.wp(0, 3.5, -110);
      b.wp(0, 3.5, -113, 'w', 0, Wh(h1, 0.25)); b.wp(0, 3.5, -124, '', 7); b.wp(0, 3.5, -138);
    },
  },
];

const W8B = [
  {
    name: 'Patio Encantado', target: 52,
    hint: 'Hachas tempranas y puente levadizo.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.2, 8, { type: 'castle', pillars: true });
      b.plat(0, 0, -42, 4.2, 76, { type: 'castle' });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      const h1 = b.pendulumAxe(0, 0, -16, { speed: 1.65, len: 4.0 });
      const h2 = b.pendulumAxe(0, 0, -24, { speed: 1.65, phase: 2.0, len: 4.0 });
      b.checkpoint(0, 0, -38);
      b.drawbridge(0, 0, -50, { period: 3.4, d: 4.5 });
      b.coin(0, 0, -50);
      const h3 = b.pendulumAxe(0, 0, -64, { speed: 1.7, phase: 1.1, len: 4.0 });
      b.plat(0, 0, -80, 5.6, 10, { type: 'castle', pillars: true });
      b.crown(0, 0, -81);
      const W = (h, lead) => ({ cond: () => h.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -12);
      b.wp(0, 0, -13.5, 'w', 0, W(h1, 0.25)); b.wp(0, 0, -21.5, 'w', 0, W(h2, 0.25));
      b.wp(0, 0, -30); b.wp(0, 0, -38); b.wp(0, 0, -50);
      b.wp(0, 0, -61.5, 'w', 0, W(h3, 0.25)); b.wp(0, 0, -72); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Hachas Pendulares', target: 58,
    hint: 'Hachas de cuento. ¡Espera y cruza!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { type: 'castle', pillars: true });
      b.plat(0, 0, -12, 3.4, 18, { type: 'castle' }); b.coinRow(0, 0, -5, 0, 0, -16, 3);
      const h1 = b.pendulumAxe(0, 0, -8, { speed: 1.6, phase: 0, len: 4.2 });
      const h2 = b.pendulumAxe(0, 0, -13, { speed: 1.6, phase: Math.PI * 0.6, len: 4.2 });
      b.plat(0, 0, -22, 4.2, 6, { type: 'castle', pillars: true }); b.checkpoint(0, 0, -22);
      b.plat(0, 0, -38, 3.4, 24, { type: 'castle' });
      const h3 = b.pendulumAxe(0, 0, -32, { speed: 1.7, phase: 0, len: 4.2 });
      const h4 = b.pendulumAxe(0, 0, -38, { speed: 1.7, phase: 2.1, len: 4.2 });
      b.coin(0, 0, -35);
      b.plat(0, 0, -52, 5.5, 6, { type: 'castle', pillars: true }); b.plat(0, 0, -64, 4.2, 20, { type: 'castle' });
      b.plat(0, 0, -78, 5.5, 10, { type: 'castle', pillars: true });
      b.crown(0, 0, -79);
      const W = (h, lead) => ({ cond: () => h.safe(lead) });
      b.wp(0, 0, -2);
      b.wp(0, 0, -5.5, 'w', 0, W(h1, 0.25)); b.wp(0, 0, -10.5, 'w', 0, W(h2, 0.25));
      b.wp(0, 0, -18); b.wp(0, 0, -22);
      b.wp(0, 0, -29.5, 'w', 0, W(h3, 0.25)); b.wp(0, 0, -35.5, 'w', 0, W(h4, 0.25));
      b.wp(0, 0, -46); b.wp(0, 0, -52); b.wp(0, 0, -64); b.wp(0, 0, -79);
    },
  },
  {
    name: 'Baldosas Mágicas', target: 60,
    hint: 'Las baldosas aparecen y desaparecen. ¡Cruza cuando brillen!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'castle', pillars: true });
      b.plat(0, 0, -42, 4.2, 76, { type: 'castle' });
      // baldosas que parpadean ENCIMA del camino (reto de monedas / ritmo)
      b.blinkPlat(0, 0.55, -18, 3.5, 3.5, { period: 2.0, onFrac: 0.5 });
      b.blinkPlat(0, 0.55, -28, 3.5, 3.5, { period: 2.0, phase: 0.84, onFrac: 0.5 });
      b.coin(0, 1.2, -18); b.coin(0, 1.2, -28);
      b.checkpoint(0, 0, -36);
      b.blinkPlat(0, 0.55, -48, 3.5, 3.5, { period: 2.0, onFrac: 0.5 , phase: 0.05});
      b.blinkPlat(0, 0.55, -58, 3.5, 3.5, { period: 2.0, phase: 0.18, onFrac: 0.5 });
      b.coin(0, 1.2, -48);
      b.plat(0, 0, -84, 5.5, 10, { type: 'castle', pillars: true });
      b.crown(0, 0, -85);
      b.wp(0, 0, -2); b.wp(0, 0, -20); b.wp(0, 0, -36);
      b.wp(0, 0, -52); b.wp(0, 0, -66); b.wp(0, 0, -85);
    },
  },
  {
    name: 'Puente Levadizo', target: 60,
    hint: 'El puente baja: ¡pasa cuando esté horizontal!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { type: 'castle', pillars: true });
      b.plat(0, 0, -10, 4.2, 12, { type: 'castle' });
      b.plat(0, 0, -18, 4.2, 5, { type: 'castle', pillars: true }); b.checkpoint(0, 0, -18);
      const d1 = b.drawbridge(0, 0, -20, { period: 3.04, d: 6 });
      b.plat(0, 0, -30, 4.2, 6, { type: 'castle', pillars: true }); const d2 = b.drawbridge(0, 0, -32, { period: 2.88, phase: 0.69, d: 6 });
      b.plat(0, 0, -42, 4.2, 6, { type: 'castle', pillars: true }); b.plat(0, 0, -54, 4.2, 16, { type: 'castle' }); b.coinRow(0, 0, -48, 0, 0, -58, 3);
      b.plat(0, 0, -66, 5.5, 8, { type: 'castle', pillars: true });
      b.crown(0, 0, -67);
      const O = (d) => ({ cond: () => d.open(0.15) });
      b.wp(0, 0, -2); b.wp(0, 0, -12); b.wp(0, 0, -18);
      b.wp(0, 0, -19.5, 'w', 0, O(d1)); b.wp(0, 0, -26, '', 7); b.wp(0, 0, -30);
      b.wp(0, 0, -31.5, 'w', 0, O(d2)); b.wp(0, 0, -38, '', 7); b.wp(0, 0, -42);
      b.wp(0, 0, -54); b.wp(0, 0, -67);
    },
  },
  {
    name: 'Engranajes Reales', target: 60,
    hint: 'Engranajes giratorios. ¡Pasa por el borde!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'castle', pillars: true });
      b.plat(0, 0, -40, 12, 72, { type: 'castle' });
      b.plat(0, 0, -18, 8, 8, { type: 'castle', pillars: true }); b.checkpoint(0, 0, -18);
      const g1 = b.gearWall(0, 0, -30, { len: 3.2, speed: 0.7, arms: 3 });
      b.coin(4.5, 0, -30);
      b.plat(0, 0, -44, 8, 8, { type: 'castle', pillars: true }); const g2 = b.gearWall(0, 0, -56, { len: 3.2, speed: 0.75, arms: 3 });
      b.coin(-4.5, 0, -56);
      b.plat(0, 0, -70, 8, 10, { type: 'castle', pillars: true });
      b.crown(0, 0, -71);
      void g1; void g2;
      b.wp(0, 0, -2); b.wp(0, 0, -12); b.wp(0, 0, -18);
      b.wp(4.5, 0, -26); b.wp(4.5, 0, -30, 't'); b.wp(4.5, 0, -36); b.wp(0, 0, -44);
      b.wp(-4.5, 0, -50); b.wp(-4.5, 0, -56, 't'); b.wp(-4.5, 0, -62); b.wp(0, 0, -71);
    },
  },
  {
    name: 'Fantasmas Empujones', target: 60,
    hint: 'Fantasmas amistosos… pero empujan. ¡Esquívalos!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'castle', pillars: true });
      b.plat(0, 0, -45, 12, 84, { type: 'castle' });
      b.coinRow(4.5, 0, -8, 4.5, 0, -28, 4);
      b.ghostPusher(0, 0, -18, { to: [0, 0, -10], period: 5.4 });
      b.checkpoint(0, 0, -36);
      b.ghostPusher(-3.5, 0, -50, { to: [7, 0, 0], period: 4.95 });
      b.ghostPusher(3.5, 0, -60, { to: [-7, 0, 0], period: 4.95, phase: 0.5 });
      b.coin(-4.5, 0, -46); b.coin(4.5, 0, -58);
      b.plat(0, 0, -90, 8, 10, { type: 'castle', pillars: true });
      b.crown(0, 0, -91);
      b.wp(0, 0, -2); b.wp(4.5, 0, -18, 't'); b.wp(4.5, 0, -28); b.wp(0, 0, -36);
      b.wp(-4.5, 0, -52, 't'); b.wp(4.5, 0, -62, 't'); b.wp(0, 0, -72);
      b.wp(0, 0, -91);
    },
  },
  {
    name: 'Pasadizos Secretos', target: 66,
    hint: 'Busca el arco dorado: ¡atajo con monedas!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'castle', pillars: true });
      b.plat(0, 0, -42, 4.2, 76, { type: 'castle' });
      b.secretDoor(0, 0, -14, { side: 1, len: 14, coins: 4 });
      b.checkpoint(0, 0, -28);
      const h1 = b.pendulumAxe(0, 0, -40, { speed: 1.55, len: 4.0 });
      b.coin(0, 0, -48);
      // baldosa mágica opcional; carril continuo ya cubre
      b.blinkPlat(0, 0.4, -64, 3.2, 3.2, { period: 2.0, onFrac: 0.6 , phase: 0.70});
      b.plat(0, 0, -84, 5.5, 10, { type: 'castle', pillars: true });
      b.crown(0, 0, -85);
      const W = (h, lead) => ({ cond: () => h.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -20); b.wp(0, 0, -28);
      b.wp(0, 0, -37.5, 'w', 0, W(h1, 0.25)); b.wp(0, 0, -48); b.wp(0, 0, -56);
      b.wp(0, 0, -70); b.wp(0, 0, -85);
    },
  },
  {
    name: 'Corona del Castillo', target: 100,
    hint: '¡La corona real! Usa todo lo aprendido.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'castle', pillars: true });
      // piso continuo hasta la corona (sin huecos)
      b.plat(0, 0, -70, 12, 140, { type: 'castle' });
      b.secretDoor(0, 0, -14, { side: -1, len: 12, coins: 3 });
      b.checkpoint(0, 0, -28);
      b.drawbridge(0, 0, -40, { period: 3.78, d: 5 });
      b.checkpoint(0, 0, -52);
      b.gearWall(0, 0, -64, { len: 3.0, speed: 0.6, arms: 3 });
      const h1 = b.pendulumAxe(0, 0, -78, { speed: 1.45, len: 4.0 });
      b.ghostPusher(6.0, 0, -102, { to: [0, 0, -6], period: 4.95 });
      b.plat(0, 0, -120, 10, 12, { type: 'castle', pillars: true });
      b.pillar(-3.2, 0, -123, 3); b.pillar(3.2, 0, -123, 3);
      b.crown(0, 0, -122);
      const W = (h, lead) => ({ cond: () => h.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -28); b.wp(0, 0, -52);
      b.wp(5.2, 0, -60); b.wp(5.2, 0, -64, 't'); b.wp(5.2, 0, -72);
      b.wp(0, 0, -76, 'w', 0, W(h1, 0.25)); b.wp(0, 0, -90);
      b.wp(-2.0, 0, -102); b.wp(0, 0, -122);
    },
  },
];

const W9B = [
  {
    name: 'Avenida Neón', target: 54,
    hint: 'Láseres tempranos, turbo y cinta en contra.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.2, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -42, 4.1, 76, { type: 'neon' });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      const l1 = b.laserGate(0, 0, -16, { period: 2.5 });
      const l2 = b.laserGate(0, 0, -26, { period: 2.5, phase: 0.45 });
      b.checkpoint(0, 0, -38);
      b.boostPad(0, 0, -48, { force: 13 });
      const l3 = b.laserGate(0, 0, -58, { period: 2.4, phase: 0.2 });
      b.coin(0, 0, -58);
      b.neonConvey(0, 0, -70, 4.1, 12, { dir: [0, 0, 1], speed: 3.6 });
      b.plat(0, 0, -86, 5.6, 10, { type: 'neon', pillars: true });
      b.crown(0, 0, -87);
      const W = (l, lead) => ({ cond: () => l.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -12);
      b.wp(0, 0, -13.5, 'w', 0, W(l1, 0.1)); b.wp(0, 0, -20, '', 7);
      b.wp(0, 0, -23.5, 'w', 0, W(l2, 0.1)); b.wp(0, 0, -32); b.wp(0, 0, -38);
      b.wp(0, 0, -48); b.wp(0, 0, -55.5, 'w', 0, W(l3, 0.1)); b.wp(0, 0, -64, '', 7);
      b.wp(0, 0, -70); b.wp(0, 0, -87);
    },
  },
  {
    name: 'Teletransportes', target: 58,
    hint: 'Pisa el pad cian y apareces en el rosa.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -10, 4.1, 12, { type: 'neon' });
      const t1 = b.teleportPad(0, 0, -14, { color: 0x40f8ff });
      // hueco; destino alto
      b.plat(0, 3.5, -28, 4.1, 8, { type: 'neon', pillars: true }); b.checkpoint(0, 3.5, -28);
      const t2 = b.teleportPad(0, 3.5, -28, { color: 0xff40c8 });
      b.linkTeleports(t1, t2);
      b.plat(0, 3.5, -40, 4.1, 14, { type: 'neon' });
      const t3 = b.teleportPad(0, 3.5, -44, { color: 0x40f8ff });
      b.plat(0, 7.0, -58, 5.5, 8, { type: 'neon', pillars: true }); const t4 = b.teleportPad(0, 7.0, -58, { color: 0xff40c8 });
      b.linkTeleports(t3, t4);
      b.coin(0, 3.5, -36); b.coin(0, 7.0, -64);
      b.plat(0, 7.0, -70, 4.1, 14, { type: 'neon' });
      b.plat(0, 7.0, -82, 5.5, 8, { type: 'neon', pillars: true });
      b.crown(0, 7.0, -83);
      const Hi = (y) => { const oy = b.oy || 0; return { cond: () => (window.__game && window.__game.ball.pos.y > y + oy) }; };
      // ir hacia el destino: al cruzar el pad, el teleporte te sube
      b.wp(0, 0, -2); b.wp(0, 0, -12);
      b.wp(0, 3.5, -28, 'w', 0, Hi(2.8));
      b.wp(0, 3.5, -40);
      b.wp(0, 7.0, -58, 'w', 0, Hi(6.2));
      b.wp(0, 7.0, -70); b.wp(0, 7.0, -83);
    },
  },
  {
    name: 'Láseres Temporizados', target: 62,
    hint: 'Láseres rosa. Cruza cuando se apaguen.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { type: 'neon', pillars: true });
      b.plat(0, 0, -20, 4.1, 34, { type: 'neon' }); b.coinRow(0, 0, -5, 0, 0, -28, 4);
      const l1 = b.laserGate(0, 0, -14, { period: 2.18 });
      const l2 = b.laserGate(0, 0, -24, { period: 2.18, phase: 0.84 });
      b.plat(0, 0, -42, 4.1, 8, { type: 'neon', pillars: true }); b.checkpoint(0, 0, -42);
      b.plat(0, 0, -60, 4.1, 28, { type: 'neon' });
      const l3 = b.laserGate(0, 0, -52, { period: 2.03, phase: 0.71 });
      const l4 = b.laserGate(0, 0, -62, { period: 2.03, phase: 0.38 });
      b.coin(0, 0, -55); b.coin(0, 0, -65);
      b.plat(0, 0, -80, 5.5, 10, { type: 'neon', pillars: true });
      b.crown(0, 0, -81);
      const W = (l, lead) => ({ cond: () => l.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -10);
      b.wp(0, 0, -11.5, 'w', 0, W(l1, 0.1)); b.wp(0, 0, -18, '', 7);
      b.wp(0, 0, -21.5, 'w', 0, W(l2, 0.1)); b.wp(0, 0, -32); b.wp(0, 0, -42);
      b.wp(0, 0, -49.5, 'w', 0, W(l3, 0.1)); b.wp(0, 0, -57, '', 7);
      b.wp(0, 0, -59.5, 'w', 0, W(l4, 0.1)); b.wp(0, 0, -70); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Imán Urbano', target: 58,
    hint: 'Los imanes te jalan de lado. Compensa la trayectoria.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -14, 4.1, 22, { type: 'neon' });
      b.plat(-3.8, 0, -14, 2.6, 22, { type: 'neon' });
      b.plat(3.8, 0, -14, 2.6, 22, { type: 'neon' });
      b.magnetZone(0, 0, -14, 5, 16, { dir: [1, 0, 0], force: 3.5 });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      b.plat(0, 0, -28, 4.1, 8, { type: 'neon', pillars: true }); b.checkpoint(0, 0, -28);
      b.plat(0, 0, -42, 4.1, 22, { type: 'neon' });
      b.plat(-3.8, 0, -42, 2.6, 22, { type: 'neon' });
      b.plat(3.8, 0, -42, 2.6, 22, { type: 'neon' });
      b.magnetZone(0, 0, -42, 5, 16, { dir: [-1, 0, 0], force: 3.5 });
      b.coin(0, 0, -36); b.coin(0, 0, -48);
      b.plat(0, 0, -56, 5.5, 8, { type: 'neon', pillars: true }); b.plat(0, 0, -68, 4.1, 14, { type: 'neon' });
      b.plat(0, 0, -80, 5.5, 8, { type: 'neon', pillars: true });
      b.crown(0, 0, -81);
      b.wp(0, 0, -2); b.wp(-1.8, 0, -14); b.wp(0, 0, -24); b.wp(0, 0, -28);
      b.wp(1.8, 0, -42); b.wp(0, 0, -52); b.wp(0, 0, -56);
      b.wp(0, 0, -68); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Turbos Neón', target: 58,
    hint: 'Pads amarillos = turbo hacia adelante. ¡Sujétate!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -48, 4.1, 88, { type: 'neon' });
      b.boostPad(0, 0, -14, { force: 16 });
      b.coin(0, 0, -22);
      b.checkpoint(0, 0, -32);
      b.boostPad(0, 0, -42, { force: 16 });
      b.coin(0, 0, -52);
      b.boostPad(0, 0, -72, { force: 14 });
      b.plat(0, 0, -90, 5.5, 10, { type: 'neon', pillars: true });
      b.crown(0, 0, -91);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -32);
      b.wp(0, 0, -42); b.wp(0, 0, -62);
      b.wp(0, 0, -72); b.wp(0, 0, -91);
    },
  },
  {
    name: 'Ascensores', target: 62,
    hint: 'Plataformas elevadoras. Los resortes te suben.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -12, 4.1, 16, { type: 'neon' });
      b.elevator(4.5, 0, -16, 2.6, 2.6, { to: [0, 3.5, 0], period: 3.12 });
      b.spring(0, 0, -18, { power: 16 });
      b.plat(0, 3.5, -26, 4.1, 8, { type: 'neon', pillars: true }); b.checkpoint(0, 3.5, -26);
      b.plat(0, 3.5, -36, 4.1, 12, { type: 'neon' });
      b.elevator(4.5, 3.5, -38, 2.6, 2.6, { to: [0, 3.5, 0], period: 3.12, phase: 0.5 });
      b.spring(0, 3.5, -40, { power: 16 });
      b.plat(0, 7.0, -48, 4.1, 8, { type: 'neon', pillars: true }); b.plat(0, 7.0, -60, 4.1, 16, { type: 'neon' }); b.coin(0, 7.0, -56);
      b.plat(0, 7.0, -74, 5.5, 10, { type: 'neon', pillars: true });
      b.crown(0, 7.0, -75);
      b.wp(0, 0, -2); b.wp(0, 0, -18, '', 4); b.wp(0, 3.5, -26);
      b.wp(0, 3.5, -40, '', 4); b.wp(0, 7.0, -48);
      b.wp(0, 7.0, -60); b.wp(0, 7.0, -75);
    },
  },
  {
    name: 'Cintas Opuestas', target: 68,
    hint: 'Cintas neón empujan hacia atrás. ¡Rema!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { type: 'neon', pillars: true });
      b.plat(0, 0, -6, 4.1, 6, { type: 'neon' });
      b.neonConvey(0, 0, -15, 4.5, 14, { dir: [0, 0, 1], speed: 3.91 });
      b.coinRow(0, 0, -10, 0, 0, -20, 3);
      b.plat(0, 0, -25, 4.1, 6, { type: 'neon', pillars: true }); b.checkpoint(0, 0, -25);
      b.neonConvey(0, 0, -34, 4.5, 14, { dir: [0, 0, 1], speed: 3.91 });
      b.coin(0, 0, -30); b.coin(0, 0, -38);
      b.plat(0, 0, -44, 4.1, 6, { type: 'neon', pillars: true }); b.plat(0, 0, -58, 4.1, 22, { type: 'neon' });
      b.boostPad(0, 0, -58, { force: 14 });
      b.plat(0, 0, -74, 5.5, 10, { type: 'neon', pillars: true });
      b.crown(0, 0, -75);
      b.wp(0, 0, -2); b.wp(0, 0, -15); b.wp(0, 0, -25);
      b.wp(0, 0, -34); b.wp(0, 0, -44);
      b.wp(0, 0, -58); b.wp(0, 0, -75);
    }
  },
  {
    name: 'Corona Neón', target: 105,
    hint: '¡La corona de la ciudad! Turbo, láseres y teleports.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -50, 4.1, 100, { type: 'neon' });
      b.neonConvey(0, 0, -16, 4.5, 12, { dir: [0, 0, 1], speed: 3.45 });
      b.checkpoint(0, 0, -28);
      b.boostPad(0, 0, -36, { force: 12 });
      const l1 = b.laserGate(0, 0, -48, { period: 2.5 });
      b.checkpoint(0, 0, -58);
      const ta = b.teleportPad(-4.8, 0, -66, { color: 0x40f8ff });
      b.plat(-4.8, 3.2, -66, 4, 6, { type: 'neon' });
      const tb = b.teleportPad(-4.8, 3.2, -66, { color: 0xff40c8 });
      b.linkTeleports(ta, tb);
      b.coin(-4.8, 3.2, -64); b.coin(-4.8, 3.2, -68);
      b.plat(-3.5, 0, -80, 2.8, 18, { type: 'neon' });
      b.plat(3.5, 0, -80, 2.8, 18, { type: 'neon' });
      b.magnetZone(0, 0, -80, 5, 14, { dir: [1, 0, 0], force: 2.8 });
      b.spring(0, 0, -98, { power: 16 });
      b.elevator(4.5, 0, -98, 2.6, 2.6, { to: [0, 3.5, 0], period: 3.51 });
      b.plat(0, 3.5, -106, 5.5, 10, { type: 'neon', pillars: true });
      b.pillar(-3.2, 3.5, -109, 3); b.pillar(3.2, 3.5, -109, 3);
      b.crown(0, 3.5, -108);
      const W = (l, lead) => ({ cond: () => l.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -16); b.wp(0, 0, -28); b.wp(0, 0, -36);
      b.wp(0, 0, -45.5, 'w', 0, W(l1, 0.1)); b.wp(0, 0, -54, '', 7); b.wp(0, 0, -58);
      b.wp(-1.5, 0, -80); b.wp(0, 0, -92);
      b.wp(0, 0, -98, '', 4); b.wp(0, 3.5, -106); b.wp(0, 3.5, -108);
    },
  },
];


const W10B = [
  {
    name: 'Órbita Suave', target: 56,
    hint: 'Meteoros tempranos, baja gravedad y agujero al borde.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5.2, 8, { type: 'space', pillars: true });
      b.plat(0, 0, -45, 4.0, 82, { type: 'space' });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      const m1 = b.meteor(0, 0, -16, { period: 3.0 });
      const m2 = b.meteor(0, 0, -26, { period: 3.0, phase: 0.45 });
      b.lowGravZone(0, 0, -36, 4.0, 10, { gScale: 0.42, jumpScale: 1.4 });
      b.checkpoint(0, 0, -44);
      const m3 = b.meteor(0, 0, -56, { period: 2.9, phase: 0.2 });
      b.coin(0, 0, -56);
      b.starBoost(0, 0, -68, { force: 13 });
      b.blackHole(5.0, 0, -76, { r: 3.6, force: 9.5 });
      b.plat(0, 0, -92, 5.6, 10, { type: 'space', pillars: true });
      b.crown(0, 0, -93);
      const W = (m, lead) => ({ cond: () => m.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -12);
      b.wp(0, 0, -13.5, 'w', 0, W(m1, 0.15)); b.wp(0, 0, -20, '', 7);
      b.wp(0, 0, -23.5, 'w', 0, W(m2, 0.15)); b.wp(0, 0, -34); b.wp(0, 0, -44);
      b.wp(0, 0, -53.5, 'w', 0, W(m3, 0.15)); b.wp(0, 0, -64, '', 7);
      b.wp(0, 0, -68); b.wp(-1.2, 0, -76); b.wp(0, 0, -93);
    },
  },
  {
    name: 'Gravedad Baja', target: 60,
    hint: 'Zonas de baja gravedad: saltos más altos y flotantes.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'space', pillars: true });
      // piso ancho continuo — la baja gravedad no te tira al vacío
      b.plat(0, 0, -50, 4, 92, { type: 'space' });
      b.lowGravZone(0, 0, -18, 6, 16, { gScale: 0.45, jumpScale: 1.4 });
      b.coin(0, 0, -14); b.coin(0, 0, -22);
      b.checkpoint(0, 0, -36);
      b.lowGravZone(0, 0, -54, 6, 16, { gScale: 0.45, jumpScale: 1.4 });
      b.coin(0, 0, -50); b.coin(0, 0, -58);
      b.plat(0, 0, -88, 5.5, 10, { type: 'space', pillars: true });
      b.crown(0, 0, -89);
      b.wp(0, 0, -2); b.wp(0, 0, -18); b.wp(0, 0, -36);
      b.wp(0, 0, -54); b.wp(0, 0, -70); b.wp(0, 0, -89);
    },
  },
  {
    name: 'Pozos de Gravedad', target: 62,
    hint: 'Los planetas te atraen. Compensa la órbita.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'space', pillars: true });
      b.plat(0, 0, -50, 4, 92, { type: 'space' });
      b.gravWell(-5.5, 0, -22, { r: 5.0, force: 6.5, color: 0xff9060 });
      b.coin(0, 0, -18); b.coin(0, 0, -26);
      b.checkpoint(0, 0, -36);
      b.gravWell(5.5, 0, -52, { r: 5.0, force: 6.5, color: 0x60c0ff });
      b.coin(0, 0, -48); b.coin(0, 0, -56);
      b.plat(0, 0, -88, 5.5, 10, { type: 'space', pillars: true });
      b.crown(0, 0, -89);
      b.wp(0, 0, -2); b.wp(1.5, 0, -22); b.wp(0, 0, -36);
      b.wp(-1.5, 0, -52); b.wp(0, 0, -68); b.wp(0, 0, -89);
    },
  },
  {
    name: 'Asteroides en Órbita', target: 64,
    hint: 'Asteroides orbitan a los lados. Sigue el camino central.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'space', pillars: true });
      b.plat(0, 0, -50, 4, 92, { type: 'space' });
      b.orbitPlat(0, 0.85, -28, 2.8, 2.8, { radius: 5.0, speed: 0.7, phase: 0 });
      b.coin(5.0, 0.85, -28);
      b.checkpoint(0, 0, -40);
      b.orbitPlat(0, 0.85, -58, 2.8, 2.8, { radius: 5.0, speed: 0.75, phase: 1.5 });
      b.coin(-5.0, 0.85, -58);
      b.plat(0, 0, -88, 5.5, 10, { type: 'space', pillars: true });
      b.crown(0, 0, -89);
      b.wp(0, 0, -2); b.wp(0, 0, -20); b.wp(0, 0, -40);
      b.wp(0, 0, -58); b.wp(0, 0, -70); b.wp(0, 0, -89);
    },
  },
  {
    name: 'Lluvia de Meteoros', target: 62,
    hint: '¡Ojo a las sombras naranjas! Espera y cruza.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { type: 'space', pillars: true });
      b.plat(0, 0, -20, 4, 34, { type: 'space' }); b.coinRow(0, 0, -5, 0, 0, -28, 4);
      const m1 = b.meteor(0, 0, -14, { period: 2.55, phase: 0.17 });
      const m2 = b.meteor(0, 0, -24, { period: 2.55, phase: 0.84 });
      b.plat(0, 0, -42, 4, 8, { type: 'space', pillars: true }); b.checkpoint(0, 0, -42);
      b.plat(0, 0, -60, 4, 28, { type: 'space' });
      const m3 = b.meteor(0, 0, -52, { period: 2.4, phase: 0.71 });
      const m4 = b.meteor(0, 0, -62, { period: 2.4, phase: 0.38 });
      b.coin(0, 0, -55); b.coin(0, 0, -65);
      b.plat(0, 0, -80, 5.5, 10, { type: 'space', pillars: true });
      b.crown(0, 0, -81);
      const W = (m, lead) => ({ cond: () => m.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -10);
      b.wp(0, 0, -11.5, 'w', 0, W(m1, 0.15)); b.wp(0, 0, -18, '', 7);
      b.wp(0, 0, -21.5, 'w', 0, W(m2, 0.15)); b.wp(0, 0, -32); b.wp(0, 0, -42);
      b.wp(0, 0, -49.5, 'w', 0, W(m3, 0.15)); b.wp(0, 0, -57, '', 7);
      b.wp(0, 0, -59.5, 'w', 0, W(m4, 0.15)); b.wp(0, 0, -70); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Agujeros Negros', target: 64,
    hint: 'Atractores al borde. Mantente al centro del camino.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'space', pillars: true });
      b.plat(0, 0, -50, 4, 92, { type: 'space' });
      b.blackHole(-6.5, 0, -22, { r: 4.0, force: 9 });
      b.coin(0, 0, -18); b.coin(0, 0, -26);
      b.checkpoint(0, 0, -36);
      b.blackHole(6.5, 0, -54, { r: 4.0, force: 9 });
      b.coin(0, 0, -50); b.coin(0, 0, -58);
      b.plat(0, 0, -88, 5.5, 10, { type: 'space', pillars: true });
      b.crown(0, 0, -89);
      b.wp(0, 0, -2); b.wp(0, 0, -22); b.wp(0, 0, -36);
      b.wp(0, 0, -54); b.wp(0, 0, -68); b.wp(0, 0, -89);
    },
  },
  {
    name: 'Anillos Estelares', target: 60,
    hint: 'Atraviesa los anillos dorados para un turbo cósmico.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 5, 8, { type: 'space', pillars: true });
      b.plat(0, 0, -48, 4, 88, { type: 'space' });
      b.starBoost(0, 0, -14, { force: 15 });
      b.coin(0, 0, -22);
      b.checkpoint(0, 0, -32);
      b.starBoost(0, 0, -42, { force: 15 });
      b.coin(0, 0, -52);
      b.starBoost(0, 0, -72, { force: 14 });
      b.plat(0, 0, -90, 5.5, 10, { type: 'space', pillars: true });
      b.crown(0, 0, -91);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -32);
      b.wp(0, 0, -42); b.wp(0, 0, -62);
      b.wp(0, 0, -72); b.wp(0, 0, -91);
    },
  },
  {
    name: 'Corona del Cosmos', target: 110,
    hint: '¡El gran final! Un recuerdo de cada mundo.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'space', pillars: true });
      b.plat(0, 0, -110, 12, 220, { type: 'space' });
      // W1 martillo
      b.hammer(0, 0, -16, { speed: 1.35, len: 4.0 });
      b.checkpoint(0, 0, -28);
      // W2 géiser
      const j1 = b.fireJet(0, 0, -40, { period: 2.88, h: 2.5 });
      b.checkpoint(0, 0, -50);
      // W3 carámbano
      const ic = b.icicle(0, 0, -60, { period: 3.06 });
      // W4 hoja (rebote suave, sin hueco)
      b.leafTramp(0, 0, -78, { power: 11 });
      b.coin(0, 2.2, -78);
      // W5 escarabajo lateral
      b.scarab(5.8, 0, -90, { to: [0, 0, -8], period: 4.5 });
      // W6 cinta chocolate en contra
      b.chocConvey(0, 0, -108, 4.5, 12, { dir: [0, 0, 1], speed: 2.99 });
      // W7 burbujas laterales (decor)
      b.bubbleColumn(5.5, 0, -128, 3, 6, { force: 10 });
      // W8 hacha
      const ax = b.pendulumAxe(0, 0, -140, { speed: 1.35, len: 3.8 });
      // W9 láser
      const lz = b.laserGate(0, 0, -162, { period: 2.7 });
      // W10 anillo + lowGrav + corona especial
      b.starBoost(0, 0, -180, { force: 12 });
      b.lowGravZone(0, 0, -190, 6, 12, { gScale: 0.5, jumpScale: 1.3 });
      b.plat(0, 0, -210, 12, 14, { type: 'space', pillars: true });
      b.pillar(-3.5, 0, -214, 3); b.pillar(3.5, 0, -214, 3);
      b.cosmosCrown(0, 0, -212);
      const Wj = (j, lead) => ({ cond: () => j.safe(lead) });
      const Wi = (i, lead) => ({ cond: () => i.safe(lead) });
      const Wh = (h, lead) => ({ cond: () => h.safe(lead) });
      const Wl = (l, lead) => ({ cond: () => l.safe(lead) });
      b.wp(0, 0, -2);
      b.wp(2.8, 0, -14, 't'); b.wp(2.8, 0, -20); b.wp(0, 0, -28);
      b.wp(0, 0, -37.5, 'w', 0, Wj(j1, 0.1)); b.wp(0, 0, -46, '', 7); b.wp(0, 0, -50);
      b.wp(0, 0, -57.5, 'w', 0, Wi(ic, 0.15)); b.wp(0, 0, -66, '', 7); b.wp(0, 0, -70);
      b.wp(0, 0, -78); b.wp(-1.5, 0, -90); b.wp(0, 0, -96);
      b.wp(0, 0, -108); b.wp(0, 0, -120); b.wp(0, 0, -128);
      b.wp(0, 0, -137, 'w', 0, Wh(ax, 0.25)); b.wp(0, 0, -152);
      b.wp(0, 0, -159.5, 'w', 0, Wl(lz, 0.1)); b.wp(0, 0, -170, '', 7); b.wp(0, 0, -172);
      b.wp(0, 0, -180); b.wp(0, 0, -190); b.wp(0, 0, -212);
    },
  },
];



// ---------------------------------------------------------------------------
// v0.4.2 — Niveles largos por secciones (Mundos 4–10).
// Cada nivel encadena 3–5 secciones ya probadas (base del mundo, plantillas de
// saltos/plataformas sobre el vacío/vigas estrechas y tramos de mundos previos).
// Las secciones se desplazan en Y/Z; la corona de cada sección intermedia se
// convierte en el empalme (con checkpoint en 1–2 empalmes, tras lo más duro).
// ---------------------------------------------------------------------------
const COSMETIC_TYPES = new Set(['stone', 'basalt', 'snow', 'jungle', 'sand', 'candy', 'coral', 'castle', 'neon', 'space']);
function composeSections(b, secs, o = {}) {
  const n = secs.length;
  const cps = o.cps || (n <= 2 ? [0] : (n === 3 ? [0, 1] : (n === 4 ? [1, 2] : [1, n - 2])));
  const haste = o.haste || 1;
  let dy = 0, dz = 0;
  for (let k = 0; k < n; k++) {
    const first = k === 0, last = k === n - 1;
    const sec = secs[k];
    const src = sec.build.toString();
    if ((dy !== 0 || dz !== 0) && /pos\.[yz]/.test(src) && !/b\.oy/.test(src)) throw new Error('Sección con condición absoluta en Y/Z fuera de posición: ' + (sec.name || k));
    let end = null;
    const S = (x, y, z) => [x, y + dy, z + dz];
    const fixOpts = (r) => {
      if (haste === 1) return r;
      return r.map((a) => {
        if (a && typeof a === 'object' && !Array.isArray(a) && typeof a.period === 'number' && a.period >= 2.1) {
          return { ...a, period: +Math.max(2.1, a.period * haste).toFixed(2) };
        }
        return a;
      });
    };
    const P = new Proxy(b, {
      get(t, key) {
        if (key === 'oy') return dy;
        if (key === 'oz') return dz;
        const f = t[key];
        if (typeof f !== 'function') return f;
        switch (key) {
          case 'start': return first ? (x, y, z) => t.start(...S(x, y, z)) : () => {};
          case 'crown': case 'cosmosCrown':
            return (x, y, z, ...r) => { end = S(x, y, z); if (last) return f.call(t, ...S(x, y, z), ...r); };
          case 'checkpoint': return () => {};
          case 'hint': case 'finish': case 'linkTeleports': return f.bind(t);
          case 'ramp': case 'coinRow':
            return (x1, y1, z1, x2, y2, z2, ...r) => f.call(t, ...S(x1, y1, z1), ...S(x2, y2, z2), ...r);
          case 'plat':
            return (x, y, z, w, d, op = {}) => {
              if (op && op.type && COSMETIC_TYPES.has(op.type)) { op = { ...op }; delete op.type; }
              return f.call(t, ...S(x, y, z), w, d, op);
            };
          case 'wp':
            return (x, y, z, ...r) => f.call(t, ...S(x, y, z), ...r);
          default:
            if (typeof key === 'string' && key.startsWith('_')) return f.bind(t);
            return (x, y, z, ...r) => f.call(t, ...S(x, y, z), ...fixOpts(r));
        }
      },
    });
    sec.build(P);
    if (!end) throw new Error('Sección sin corona: ' + (sec.name || k));
    if (!last) {
      if (cps.includes(k)) b.checkpoint(end[0], end[1], end[2]);
      dy = end[1]; dz = end[2] - 3.5;
    }
  }
}
function chain(base, secs, o = {}) {
  return {
    name: base.name, target: o.target || base.target, hint: o.hint || base.hint,
    build(b) { composeSections(b, secs, o); },
  };
}

// ---- Plantillas de sección (se tiñen con el tema del mundo) ----
// Piedras sobre el vacío: saltos cortos y visibles.
function tHex(o = {}) {
  const n = o.n || 5, r = o.r || 1.1, step = o.step || 3.0;
  const xs = o.xs || [0, 1.4, -0.8, 1.0, -0.6, 1.2, -1.0, 0.6];
  return { name: 'tHex', build(b) {
    b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { pillars: true });
    b.plat(0, 0, -7, 3.4, 8);
    const st = []; let z = -13.2;
    for (let i = 0; i < n; i++) { st.push([xs[i % xs.length], z]); z -= step; }
    st.forEach(([x, zz], i) => { b.hex(x, 0, zz, r); if (i % 2 === 0) b.coin(x, 0, zz); });
    const lastZ = st[st.length - 1][1];
    const endZ = lastZ - 5.3;
    b.plat(0, 0, endZ, 6, 5, { pillars: true });
    b.crown(0, 0, endZ);
    b.wp(0, 0, -2); b.wp(0, 0, -10.2, 'j', 5);
    st.forEach(([x, zz]) => b.wp(x, 0, zz, 'j', 4));
    b.wp(0, 0, endZ);
  } };
}
// Plataformas laterales móviles sobre el vacío (patrón del Volcán).
function tMovers(o = {}) {
  const pairs = o.pairs || 2, period = o.period || 4.0;
  return { name: 'tMovers', build(b) {
    b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { pillars: true });
    b.plat(0, 0, -7, 3.6, 8);
    let z0 = -14; const ms = [];
    for (let p = 0; p < pairs; p++) {
      b.plat(0, 0, z0, 4.5, 6, { pillars: true });
      const m1 = b.mover(-2.0, 0, z0 - 5, 3.4, 3.4, { to: [4.0, 0, 0], period });
      const m2 = b.mover(-2.0, 0, z0 - 10, 3.4, 3.4, { to: [4.0, 0, 0], period, phase: 0.5 });
      b.coin(0, 0.4, z0 - 5); b.coin(0, 0.4, z0 - 10);
      ms.push([z0, m1, m2]); z0 -= 16;
    }
    b.plat(0, 0, z0, 6, 6, { pillars: true });
    b.crown(0, 0, z0);
    b.wp(0, 0, -2); b.wp(0, 0, -10);
    for (const [z, m1, m2] of ms) {
      b.wp(0, 0, z);
      b.wp(0, 0, z - 2.2 + 0.0, 'w', 0, { cond: () => Math.abs(m1.c.pos.x) < 0.4 });
      b.wp(0, 0, z - 3.0, 'j', 5);
      b.wp(0, 0, z - 5, 'r', 0, { follow: m1 });
      b.wp(0, 0, z - 7.5, 'j', 6, { follow: m1, oz: -1.0 });
      b.wp(0, 0, z - 10, 'r', 0, { follow: m2 });
      b.wp(0, 0, z - 12.5, 'j', 6, { follow: m2, oz: -1.0 });
    }
    b.wp(0, 0, z0);
  } };
}
// Viga estrecha en zigzag (sin barandas).
function tZig(o = {}) {
  const w = o.w || 2.6, segs = o.segs || 4, len = o.len || 9, dx = o.dx || 3.2;
  return { name: 'tZig', build(b) {
    b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { pillars: true });
    let x = 0, z = -3; const pts = [[0, -2]];
    for (let s = 0; s < segs; s++) {
      // tramo recto
      b.plat(x, 0, z - len / 2, w, len + w * 0.5);
      if (s % 2 === 1) b.coin(x, 0, z - len / 2);
      z -= len;
      pts.push([x, z + w * 0.3, 't']);
      // tramo lateral
      const nx = s % 2 === 0 ? (x === 0 ? dx : -x) : (x === 0 ? -dx : -x);
      const tx = s === segs - 1 ? 0 : nx;
      b.plat((x + tx) / 2, 0, z, Math.abs(tx - x) + w, w);
      pts.push([tx, z, 't']);
      x = tx;
    }
    b.plat(0, 0, z - 4, 6, 6, { pillars: true });
    b.crown(0, 0, z - 4);
    pts.forEach(([px, pz, f]) => b.wp(px, 0, pz, f || ''));
    b.wp(0, 0, z - 4);
  } };
}
// Pasarela estrecha con peligros temporizados agrupados. Entre peligros hay
// espacio para detenerse (justo), pero cruzar de corrido castiga la prisa.
function tGaunt(o = {}) {
  const w = o.w || 2.4, gap = o.gap || 5.0, groups = o.groups || [['jet', 'jet']];
  const per = { jet: 2.8, crush: 3.0, clam: 3.4, laser: 2.7, axe: 1.6 };
  return { name: 'tGaunt', build(b) {
    b.start(0, 0, 0); b.plat(0, 0, 0, 5, 6, { pillars: true });
    let z = -3; const plan = [];
    groups.forEach((g, gi) => {
      const zs = z - 5; const hs = [];
      g.forEach((k, j) => {
        const hz = zs - j * gap;
        const p = (o.periods && o.periods[k]) || per[k];
        const pp = +(p * (1 + 0.21 * j)).toFixed(2), ph = (0.37 * (gi + 1) + 0.29 * j) % 1;
        let h;
        if (k === 'jet') h = b.fireJet(0, 0, hz, { period: pp, phase: ph, h: 2.6, r: 0.95 });
        else if (k === 'crush') h = b.candyCrusher(0, 0, hz, { period: pp, phase: ph, w: w + 0.4, d: 2.2 });
        else if (k === 'clam') h = b.clam(0, 0, hz, { period: pp, phase: ph, w: w + 0.6, d: 2.6 });
        else if (k === 'laser') h = b.laserGate(0, 0, hz, { period: pp, phase: ph, w: w + 1.2 });
        else h = b.pendulumAxe(0, 0, hz, { speed: +(1.55 + 0.17 * j).toFixed(2), phase: ph * 6.28, len: 3.8 });
        hs.push([k, hz, h]);
        if (j === 0) b.coin(0, 0, hz + 2.5);
      });
      plan.push(hs); z = hs[hs.length - 1][1] - 3.5;
    });
    b.plat(0, 0, (-3 + z) / 2 - 0.5, w, Math.abs(z + 3) + 3);
    b.plat(0, 0, z - 3.5, 6, 6, { pillars: true });
    b.crown(0, 0, z - 3.5);
    b.wp(0, 0, -2);
    for (const hs of plan) {
      const [k, hz, h] = hs[0];
      const back = k === 'axe' ? 3.0 : 2.5;
      const l1 = k === 'axe' ? 0.25 : 0.05, l2 = k === 'axe' ? 0.5 : (k === 'laser' ? 0.6 : 0.75);
      b.wp(0, 0, hz + back, 'w', 0, { cond: () => h.safe(l1) && h.safe(l2) });
      b.wp(0, 0, hs[hs.length - 1][1] - 2.8, '', 7.5);
    }
    b.wp(0, 0, z - 3.5);
  } };
}


const WORLD4_LEVELS = [
  chain(W4B[0], [W4B[0], tHex({ n: 5, r: 1.1 }), WORLD2_LEVELS[1], tZig({ w: 2.8, segs: 3 }), WORLD3_LEVELS[0]], { target: 75, cps: [1, 3] }),
  chain(W4B[1], [W4B[1], tZig({ w: 2.8, segs: 3 }), WORLD2_LEVELS[2], tGaunt({ w: 2.6, groups: [['jet', 'jet']] })], { target: 65, cps: [1, 2] }),
  chain(W4B[2], [W4B[2], tMovers({ pairs: 1, period: 4.0 }), WORLD2_LEVELS[4], tHex({ n: 5, r: 1.1 })], { target: 70, cps: [1, 2] }),
  chain(W4B[3], [W4B[3], tHex({ n: 5, r: 1.1 }), WORLD2_LEVELS[0]], { target: 80, cps: [0, 1] }),
  chain(W4B[4], [W4B[4], tZig({ w: 2.8, segs: 3 }), WORLD2_LEVELS[0], tGaunt({ w: 2.6, groups: [['jet', 'jet']] })], { target: 60, cps: [1, 2] }),
  chain(W4B[5], [W4B[5], tMovers({ pairs: 1, period: 4.0 }), WORLD2_LEVELS[1], tHex({ n: 5, r: 1.1 }), WORLD3_LEVELS[0]], { target: 75, cps: [1, 3] }),
  chain(W4B[6], [W4B[6], tHex({ n: 5, r: 1.1 }), WORLD2_LEVELS[2], tZig({ w: 2.8, segs: 3 })], { target: 70, cps: [1, 2] }),
  chain(W4B[7], [W4B[7], tZig({ w: 2.8, segs: 3 }), WORLD2_LEVELS[4], tMovers({ pairs: 1, period: 4.0 }), tGaunt({ w: 2.6, groups: [['jet', 'jet']] })], { target: 90, cps: [1, 3] }),
];
const WORLD5_LEVELS = [
  chain(W5B[0], [W5B[0], tHex({ n: 6, r: 1.1 }), W4B[1], tZig({ w: 2.7, segs: 3 }), WORLD3_LEVELS[5]], { target: 90, cps: [1, 3], haste: 0.97 }),
  chain(W5B[1], [W5B[1], tZig({ w: 2.7, segs: 3 }), W4B[5], tMovers({ pairs: 1, period: 3.8 }), tGaunt({ w: 2.5, groups: [['jet', 'jet']] })], { target: 80, cps: [1, 3], haste: 0.97 }),
  chain(W5B[2], [W5B[2], tMovers({ pairs: 1, period: 3.8 }), W4B[3], tHex({ n: 6, r: 1.1 })], { target: 70, cps: [1, 2], haste: 0.97 }),
  chain(W5B[3], [W5B[3], tHex({ n: 6, r: 1.1 }), W4B[6], tGaunt({ w: 2.5, groups: [['jet', 'jet']] })], { target: 80, cps: [1, 2], haste: 0.97 }),
  chain(W5B[4], [W5B[4], tZig({ w: 2.7, segs: 3 }), W4B[2], tMovers({ pairs: 1, period: 3.8 }), W4B[0]], { target: 80, cps: [1, 3], haste: 0.97 }),
  chain(W5B[5], [W5B[5], tMovers({ pairs: 1, period: 3.8 }), W4B[1], tHex({ n: 6, r: 1.1 }), tGaunt({ w: 2.5, groups: [['jet', 'jet']] })], { target: 80, cps: [1, 3], haste: 0.97 }),
  chain(W5B[6], [W5B[6], tHex({ n: 6, r: 1.1 }), W4B[5], tZig({ w: 2.7, segs: 3 })], { target: 70, cps: [1, 2], haste: 0.97 }),
  chain(W5B[7], [W5B[7], tZig({ w: 2.7, segs: 3 }), W4B[3], tMovers({ pairs: 1, period: 3.8 }), tGaunt({ w: 2.5, groups: [['jet', 'jet'], ['jet', 'jet']] })], { target: 125, cps: [1, 3], haste: 0.97 }),
];
const WORLD6_LEVELS = [
  chain(W6B[0], [W6B[0], tHex({ n: 6, r: 1.05, step: 3.1 }), W5B[1], tZig({ w: 2.6, segs: 4 }), tGaunt({ w: 2.5, groups: [['crush', 'crush']] })], { target: 85, cps: [1, 3], haste: 0.95 }),
  chain(W6B[1], [W6B[1], tZig({ w: 2.6, segs: 4 }), W5B[3], tMovers({ pairs: 2, period: 3.7 })], { target: 80, cps: [1, 2], haste: 0.95 }),
  chain(W6B[2], [W6B[2], tMovers({ pairs: 2, period: 3.7 }), W5B[4], tGaunt({ w: 2.5, groups: [['crush', 'jet']] })], { target: 85, cps: [1, 2], haste: 0.95 }),
  chain(W6B[3], [W6B[3], tHex({ n: 6, r: 1.05, step: 3.1 }), W5B[5], tZig({ w: 2.6, segs: 4 }), W4B[6]], { target: 90, cps: [1, 3], haste: 0.95 }),
  chain(W6B[4], [W6B[4], tZig({ w: 2.6, segs: 4 }), W5B[6], tGaunt({ w: 2.5, groups: [['crush', 'crush']] })], { target: 100, cps: [1, 2], haste: 0.95 }),
  chain(W6B[5], [W6B[5], tMovers({ pairs: 2, period: 3.7 }), W4B[6], tGaunt({ w: 2.5, groups: [['jet', 'crush']] })], { target: 80, cps: [1, 2], haste: 0.95 }),
  chain(W6B[6], [W6B[6], tHex({ n: 6, r: 1.05, step: 3.1 }), W4B[4], tGaunt({ w: 2.5, groups: [['crush', 'jet']] })], { target: 80, cps: [1, 2], haste: 0.95 }),
  chain(W6B[7], [W6B[7], tZig({ w: 2.6, segs: 4 }), WORLD3_LEVELS[4], tMovers({ pairs: 2, period: 3.7 }), tGaunt({ w: 2.5, groups: [['crush', 'jet'], ['crush', 'crush']] })], { target: 130, cps: [1, 3], haste: 0.95 }),
];
const WORLD7_LEVELS = W7B;
const WORLD8_LEVELS = W8B;
const WORLD9_LEVELS = W9B;
const WORLD10_LEVELS = W10B;


export const WORLDS = [
  { id: 'ruinas', name: 'Ruinas Flotantes', theme: 'sky', levels: WORLD1_LEVELS },
  { id: 'volcan', name: 'Volcán Ardiente', theme: 'lava', unlockIndex: 7, levels: WORLD2_LEVELS },
  { id: 'glaciar', name: 'Glaciar Resbaloso', theme: 'ice', unlockIndex: 15, levels: WORLD3_LEVELS },
  { id: 'selva', name: 'Selva Esmeralda', theme: 'jungle', unlockIndex: 23, levels: WORLD4_LEVELS },
  { id: 'desierto', name: 'Desierto Dorado', theme: 'desert', unlockIndex: 31, levels: WORLD5_LEVELS },
  { id: 'dulces', name: 'Fábrica de Dulces', theme: 'candy', unlockIndex: 39, levels: WORLD6_LEVELS },
  { id: 'arrecife', name: 'Arrecife Profundo', theme: 'reef', unlockIndex: 47, levels: WORLD7_LEVELS },
  { id: 'castillo', name: 'Castillo Encantado', theme: 'castle', unlockIndex: 55, levels: WORLD8_LEVELS },
  { id: 'neon', name: 'Ciudad Neón', theme: 'neon', unlockIndex: 63, levels: WORLD9_LEVELS },
  { id: 'cosmos', name: 'Cosmos', theme: 'space', unlockIndex: 71, levels: WORLD10_LEVELS },
];



// Lista plana — compatible con partidas guardadas
export const LEVELS = WORLDS.flatMap((w, wi) => w.levels.map((L, li) => ({
  ...L, world: w.id, worldIndex: wi, theme: w.theme, localIndex: li,
})));
