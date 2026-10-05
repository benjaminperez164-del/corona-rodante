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


const WORLD4_LEVELS = [
  {
    name: 'Sendero Verde', target: 38,
    hint: '¡Bienvenido a la selva! El barro te frena.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'jungle', pillars: true });
      b.plat(0, 0, -8, 5, 10, { type: 'jungle' }); b.coinRow(0, 0, -4, 0, 0, -12, 3);
      b.mudPad(0, 0, -18, 5, 10); b.coin(0, 0, -18);
      b.plat(0, 0, -28, 5.5, 10, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -28);
      b.plat(0, 0, -36, 4.5, 10, { type: 'jungle' });
      b.mudPad(0, 0, -46, 4.5, 10);
      b.plat(0, 0, -56, 5.5, 10, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -56);
      b.plat(0, 0, -64, 4.5, 10, { type: 'jungle' }); b.coin(0, 0, -64);
      b.plat(0, 0, -74, 8, 10, { type: 'jungle', pillars: true });
      b.crown(0, 0, -75);
      b.wp(0, 0, -2); b.wp(0, 0, -12); b.wp(0, 0, -18); b.wp(0, 0, -28);
      b.wp(0, 0, -36); b.wp(0, 0, -46); b.wp(0, 0, -56); b.wp(0, 0, -64); b.wp(0, 0, -75);
    },
  },
  {
    name: 'Troncos Rodantes', target: 45,
    hint: '¡Cuidado con los troncos que ruedan!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'jungle', pillars: true });
      b.plat(0, 0, -45, 12, 84, { type: 'jungle' }); // suelo continuo ancho
      b.coinRow(4.5, 0, -8, 4.5, 0, -30, 4);
      b.rollingLog(0, 0, -18, { to: [0, 0, -12], period: 6.5, len: 3.2 });
      b.checkpoint(0, 0, -36);
      b.coin(-4.5, 0, -46); b.coin(4.5, 0, -58);
      b.rollingLog(-3.5, 0, -50, { to: [7, 0, 0], period: 6.0, len: 3.0 });
      b.rollingLog(3.5, 0, -60, { to: [-7, 0, 0], period: 6.0, phase: 0.5, len: 3.0 });
      b.checkpoint(0, 0, -72);
      b.coin(4.5, 0, -80); b.coin(-4.5, 0, -84);
      b.plat(0, 0, -92, 8, 10, { type: 'jungle', pillars: true });
      b.crown(0, 0, -93);
      b.wp(0, 0, -2); b.wp(4.5, 0, -18, 't'); b.wp(4.5, 0, -30); b.wp(0, 0, -36);
      b.wp(-4.5, 0, -52, 't'); b.wp(4.5, 0, -62, 't'); b.wp(0, 0, -72);
      b.wp(4.5, 0, -82); b.wp(0, 0, -93);
    },
  },




  {
    name: 'Lianas Colgantes', target: 52,
    hint: 'Salta a las plataformas que se balancean.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'jungle', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'jungle' }); b.coinRow(0, 0, -5, 0, 0, -15, 3);
      b.plat(0, 0, -20, 5, 5, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -20);
      const v1 = b.mover(-2.0, 0, -25, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      const v2 = b.mover(-2.0, 0, -30, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      b.coin(0, 0.4, -25); b.coin(0, 0.4, -30);
      b.plat(0, 0, -36, 5, 6, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -36);
      const v3 = b.mover(-2.0, 0, -42, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      const v4 = b.mover(-2.0, 0, -47, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      b.coin(0, 0.4, -42); b.coin(0, 0.4, -47);
      b.plat(0, 0, -54, 5, 6, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -54);
      b.plat(0, 0, -62, 4, 12, { type: 'jungle' }); b.coinRow(0, 0, -58, 0, 0, -66, 2);
      b.plat(0, 0, -72, 8, 8, { type: 'jungle', pillars: true });
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
    name: 'Troncos Giratorios', target: 50,
    hint: 'Las plataformas giran. ¡Mantén el equilibrio!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'jungle', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'jungle' }); b.coinRow(0, 0, -5, 0, 0, -15, 3);
      b.plat(0, 0, -20, 5, 5, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -20);
      const r1 = b.mover(-2.0, 0, -25, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, spin: 0.55, color: 0x8a5a2a, side: 0xd4b078, h: 0.55 });
      const r2 = b.mover(-2.0, 0, -30, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5, spin: -0.55, color: 0x8a5a2a, side: 0xd4b078, h: 0.55 });
      b.coin(0, 0.4, -25); b.coin(0, 0.4, -30);
      b.plat(0, 0, -36, 5, 6, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -36);
      const r3 = b.mover(-2.0, 0, -42, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, spin: 0.6, color: 0x8a5a2a, side: 0xd4b078, h: 0.55 });
      const r4 = b.mover(-2.0, 0, -47, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5, spin: -0.6, color: 0x8a5a2a, side: 0xd4b078, h: 0.55 });
      b.coin(0, 0.4, -42); b.coin(0, 0.4, -47);
      b.plat(0, 0, -54, 5, 6, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -54);
      b.plat(0, 0, -62, 4, 12, { type: 'jungle' });
      b.plat(0, 0, -72, 8, 8, { type: 'jungle', pillars: true });
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
    name: 'Hojas Rebotadoras', target: 48,
    hint: 'Las hojas grandes te lanzan. ¡Boing verde!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'jungle', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'jungle' }); b.coinRow(0, 0, -4, 0, 0, -12, 3);
      b.leafTramp(0, 0, -14, { power: 14 });
      b.coin(0, 3.8, -17);
      b.plat(0, 3.5, -22, 5.5, 8, { type: 'jungle', pillars: true }); b.checkpoint(0, 3.5, -22);
      b.plat(0, 3.5, -30, 4.5, 14, { type: 'jungle' });
      b.leafTramp(0, 3.5, -34, { power: 14 });
      b.coin(0, 7.0, -37);
      b.plat(0, 6.8, -42, 5.5, 8, { type: 'jungle', pillars: true }); b.checkpoint(0, 6.8, -42);
      b.plat(0, 6.8, -50, 4.5, 14, { type: 'jungle' });
      b.leafTramp(0, 6.8, -54, { power: 13 });
      b.plat(0, 9.5, -62, 8, 8, { type: 'jungle', pillars: true });
      b.crown(0, 9.5, -63);
      b.wp(0, 0, -2); b.wp(0, 0, -14, '', 4); b.wp(0, 3.5, -22);
      b.wp(0, 3.5, -34, '', 4); b.wp(0, 6.8, -42);
      b.wp(0, 6.8, -54, '', 4); b.wp(0, 9.5, -63);
    },
  },
  {
    name: 'Barro y Troncos', target: 52,
    hint: 'Barro + troncos. ¡Pasa con calma!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'jungle', pillars: true });
      b.mudPad(0, 0, -10, 5, 12); b.coin(0, 0, -10);
      b.plat(0, 0, -20, 6, 8, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -20);
      b.plat(0, 0, -40, 10, 36, { type: 'jungle' });
      b.rollingLog(0, 0, -30, { to: [5, 0, 0], period: 5.5, len: 3.0 });
      b.coin(4, 0, -34);
      b.rollingLog(0, 0, -44, { to: [-5, 0, 0], period: 5.2, len: 3.0, phase: 0.4 });
      b.plat(0, 0, -56, 5.5, 8, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -56);
      b.mudPad(0, 0, -66, 4.5, 10);
      b.plat(0, 0, -76, 8, 8, { type: 'jungle', pillars: true });
      b.crown(0, 0, -77);
      b.wp(0, 0, -2); b.wp(0, 0, -10); b.wp(0, 0, -20);
      b.wp(-3.5, 0, -30, 't'); b.wp(3.5, 0, -44, 't'); b.wp(0, 0, -56);
      b.wp(0, 0, -66); b.wp(0, 0, -77);
    },
  },



  {
    name: 'Canopy Salvaje', target: 58,
    hint: 'Lianas, hojas y barro juntos.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'jungle', pillars: true });
      b.plat(0, 0, -10, 5, 12, { type: 'jungle' });
      // barro en el centro; laterales sólidos para no atascarse
      b.plat(-3.2, 0, -18, 2.2, 10, { type: 'jungle' });
      b.plat(3.2, 0, -18, 2.2, 10, { type: 'jungle' });
      b.mudPad(0, 0, -18, 4, 10); b.coin(0, 0, -18);
      b.plat(0, 0, -26, 6, 6, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -26);
      const v1 = b.mover(-1.8, 0, -31.2, 3.2, 3.2, { to: [3.6, 0, 0], period: 4.4, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      const v2 = b.mover(-1.8, 0, -35.6, 3.2, 3.2, { to: [3.6, 0, 0], period: 4.4, color: 0x5ecf4a, side: 0x2e8a30, h: 0.5 });
      b.plat(0, 0, -41, 6, 4, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -41);
      b.plat(0, 0, -48, 4.5, 12, { type: 'jungle' });
      b.leafTramp(0, 0, -52, { power: 13 });
      b.plat(0, 3.2, -60, 6, 8, { type: 'jungle', pillars: true }); b.checkpoint(0, 3.2, -60);
      b.plat(0, 3.2, -70, 5, 12, { type: 'jungle' }); b.coin(0, 3.2, -70);
      b.plat(0, 3.2, -82, 8, 10, { type: 'jungle', pillars: true });
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
    name: 'Corona de la Selva', target: 75,
    hint: '¡La corona entre lianas! Usa todo lo aprendido.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'jungle', pillars: true });
      b.plat(0, 0, -8, 5, 8, { type: 'jungle' });
      b.mudPad(0, 0, -16, 4.5, 10); b.coin(0, 0, -16);
      b.plat(0, 0, -26, 5.5, 8, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -26);
      b.plat(0, 0, -42, 10, 28, { type: 'jungle' });
      b.rollingLog(0, 0, -34, { to: [5, 0, 0], period: 5.5, len: 3.0 });
      b.rollingLog(0, 0, -44, { to: [-5, 0, 0], period: 5.5, phase: 0.5, len: 3.0 });
      b.coin(0, 0, -38);
      b.plat(0, 0, -58, 6, 6, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -58);
      const v1 = b.vineSwing(0, 0, -63.2, { w: 3.2, d: 3.2, amp: 3.6, period: 4.4 });
      const v2 = b.vineSwing(0, 0, -67.6, { w: 3.2, d: 3.2, amp: 3.6, period: 4.4 });
      b.plat(0, 0, -73, 6, 4, { type: 'jungle', pillars: true }); b.checkpoint(0, 0, -73);
      b.plat(0, 0, -80, 4.5, 12, { type: 'jungle' });
      b.leafTramp(0, 0, -84, { power: 14 });
      b.plat(0, 3.5, -92, 5.5, 8, { type: 'jungle', pillars: true }); b.checkpoint(0, 3.5, -92);
      b.plat(0, 3.5, -104, 7, 20, { type: 'jungle' });
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

const WORLD5_LEVELS = [
  {
    name: 'Dunas Suaves', target: 38,
    hint: 'La arena movediza te frena. ¡No te quedes quieto!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'sand', pillars: true });
      b.plat(0, 0, -8, 5, 10, { type: 'sand' }); b.coinRow(0, 0, -4, 0, 0, -12, 3);
      b.quicksand(0, 0, -18, 5, 10); b.coin(0, 0, -18);
      b.plat(0, 0, -28, 5.5, 10, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -28);
      b.plat(0, 0, -36, 4.5, 10, { type: 'sand' });
      b.quicksand(0, 0, -46, 4.5, 10);
      b.plat(0, 0, -56, 5.5, 10, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -56);
      b.plat(0, 0, -64, 4.5, 10, { type: 'sand' }); b.coin(0, 0, -64);
      b.plat(0, 0, -74, 8, 10, { type: 'sand', pillars: true });
      b.crown(0, 0, -75);
      b.wp(0, 0, -2); b.wp(0, 0, -12); b.wp(0, 0, -18); b.wp(0, 0, -28);
      b.wp(0, 0, -36); b.wp(0, 0, -46); b.wp(0, 0, -56); b.wp(0, 0, -64); b.wp(0, 0, -75);
    },
  },
  {
    name: 'Remolinos de Arena', target: 45,
    hint: 'Los remolinos empujan. ¡Mira las flechas!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'sand', pillars: true });
      b.plat(0, 0, -14, 5.5, 22, { type: 'sand' });
      b.plat(-3.6, 0, -14, 2.8, 22, { type: 'sand' });
      b.plat(3.6, 0, -14, 2.8, 22, { type: 'sand' });
      b.sandWhirl(0, 0, -14, 5, 16, { dir: [1, 0, 0], force: 3.5 });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      b.plat(0, 0, -28, 7, 8, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -28);
      b.plat(0, 0, -42, 5.5, 22, { type: 'sand' });
      b.plat(-3.6, 0, -42, 2.8, 22, { type: 'sand' });
      b.plat(3.6, 0, -42, 2.8, 22, { type: 'sand' });
      b.sandWhirl(0, 0, -42, 5, 16, { dir: [-1, 0, 0], force: 3.5 });
      b.coin(0, 0, -36); b.coin(0, 0, -48);
      b.plat(0, 0, -56, 7, 8, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -56);
      b.plat(0, 0, -68, 6, 14, { type: 'sand' });
      b.sandWhirl(0, 0, -66, 5, 10, { dir: [0, 0, 1], force: 2.8 });
      b.plat(0, 0, -80, 8, 8, { type: 'sand', pillars: true });
      b.crown(0, 0, -81);
      b.wp(0, 0, -2); b.wp(-1.8, 0, -14); b.wp(0, 0, -24); b.wp(0, 0, -28);
      b.wp(1.8, 0, -42); b.wp(0, 0, -52); b.wp(0, 0, -56);
      b.wp(0, 0, -68); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Bloques de Pirámide', target: 52,
    hint: 'Bloques deslizantes de piedra. ¡Salta a tiempo!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'sand', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'sand' }); b.coinRow(0, 0, -5, 0, 0, -15, 3);
      b.plat(0, 0, -20, 5.5, 6, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -20);
      const m1 = b.pyramidBlock(-2.0, 0, -25, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0 });
      const m2 = b.pyramidBlock(-2.0, 0, -30, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5 });
      b.coin(0, 0.4, -25); b.coin(0, 0.4, -30);
      b.plat(0, 0, -36, 5.5, 8, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -36);
      const m3 = b.pyramidBlock(-2.0, 0, -42, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0 });
      const m4 = b.pyramidBlock(-2.0, 0, -47, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5 });
      b.coin(0, 0.4, -42); b.coin(0, 0.4, -47);
      b.plat(0, 0, -54, 5.5, 8, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -54);
      b.plat(0, 0, -62, 4.5, 12, { type: 'sand' });
      b.plat(0, 0, -72, 8, 8, { type: 'sand', pillars: true });
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
    name: 'Escarabajos', target: 50,
    hint: 'Escarabajos que empujan. ¡Esquívalos!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'sand', pillars: true });
      b.plat(0, 0, -45, 12, 84, { type: 'sand' });
      b.coinRow(4.5, 0, -8, 4.5, 0, -30, 4);
      b.scarab(0, 0, -18, { to: [0, 0, -12], period: 6.5 });
      b.checkpoint(0, 0, -36);
      b.coin(-4.5, 0, -46); b.coin(4.5, 0, -58);
      b.scarab(-3.5, 0, -50, { to: [7, 0, 0], period: 6.0 });
      b.scarab(3.5, 0, -60, { to: [-7, 0, 0], period: 6.0, phase: 0.5 });
      b.checkpoint(0, 0, -72);
      b.coin(4.5, 0, -80); b.coin(-4.5, 0, -84);
      b.plat(0, 0, -92, 8, 10, { type: 'sand', pillars: true });
      b.crown(0, 0, -93);
      b.wp(0, 0, -2); b.wp(4.5, 0, -18, 't'); b.wp(4.5, 0, -30); b.wp(0, 0, -36);
      b.wp(-4.5, 0, -52, 't'); b.wp(4.5, 0, -62, 't'); b.wp(0, 0, -72);
      b.wp(4.5, 0, -82); b.wp(0, 0, -93);
    },
  },
  {
    name: 'Arenisca Frágil', target: 48,
    hint: 'La arenisca se rompe. ¡Pasa rápido!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'sand', pillars: true });
      b.plat(0, 0, -7, 4.5, 8, { type: 'sand' }); b.coin(0, 0, -7);
      for (let i = 0; i < 5; i++) b.sandstone(0, 0, -12.2 - i * 1.85, 2.6, 2.1, { delay: 0.85 });
      b.plat(0, 0, -25, 5.5, 8, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -25); b.coin(0, 0, -25);
      for (let i = 0; i < 5; i++) b.sandstone(0, 0, -30.2 - i * 1.85, 2.6, 2.1, { delay: 0.85 });
      b.plat(0, 0, -43, 5.5, 8, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -43);
      b.plat(0, 0, -50, 4, 8, { type: 'sand' });
      for (let i = 0; i < 4; i++) b.sandstone(0, 0, -56.2 - i * 1.85, 2.6, 2.1, { delay: 0.85 });
      b.plat(0, 0, -68, 8, 8, { type: 'sand', pillars: true });
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
    name: 'Oasis Peligroso', target: 55,
    hint: 'Arena, remolinos y escarabajos.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'sand', pillars: true });
      b.plat(0, 0, -40, 12, 76, { type: 'sand' });
      b.quicksand(0, 0.02, -14, 4, 10); b.coin(0, 0, -14);
      b.checkpoint(0, 0, -28);
      b.sandWhirl(0, 0, -40, 5, 14, { dir: [1, 0, 0], force: 3.0 });
      b.scarab(0, 0, -44, { to: [5, 0, 0], period: 5.0 });
      b.coin(4, 0, -40);
      b.checkpoint(0, 0, -58);
      for (let i = 0; i < 4; i++) b.sandstone(0, 0, -64.0 - i * 1.85, 2.6, 2.1, { delay: 0.85 });
      b.plat(0, 0, -78, 8, 10, { type: 'sand', pillars: true });
      b.crown(0, 0, -79);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -28);
      b.wp(-2.0, 0, -40); b.wp(-2.0, 0, -44, 't'); b.wp(0, 0, -58);
      for (let i = 0; i < 4; i++) b.wp(0, 0, -64.0 - i * 1.85, '', 8);
      b.wp(0, 0, -79);
    },
  },



  {
    name: 'Templo del Escarabajo', target: 58,
    hint: 'Pirámides y escarabajos protegen el camino.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'sand', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'sand' }); b.coinRow(0, 0, -5, 0, 0, -15, 2);
      b.plat(0, 0, -20, 5, 5, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -20);
      const m1 = b.pyramidBlock(-2.0, 0, -25, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0 });
      const m2 = b.pyramidBlock(-2.0, 0, -30, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.0, phase: 0.5 });
      b.coin(0, 0.4, -25); b.coin(0, 0.4, -30);
      b.plat(0, 0, -36, 5, 6, { type: 'sand', pillars: true }); b.checkpoint(0, 0, -36);
      b.plat(0, 0, -65, 12, 54, { type: 'sand' }); // continuo hasta la corona
      b.scarab(0, 0, -46, { to: [5, 0, 0], period: 5.0 });
      b.scarab(0, 0, -56, { to: [-5, 0, 0], period: 5.0, phase: 0.45 });
      b.checkpoint(0, 0, -68);
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
    name: 'Corona del Desierto', target: 80,
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
      b.checkpoint(0, 0, -68);
      // bloques sobre el suelo (no hace falta saltar al vacío)
      b.pyramidBlock(-2.0, 0.15, -76, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.5 });
      b.pyramidBlock(-2.0, 0.15, -82, 3.4, 3.4, { to: [4.0, 0, 0], period: 4.5, phase: 0.5 });
      b.coin(0, 0.5, -76); b.coin(0, 0.5, -82);
      b.checkpoint(0, 0, -92);
      b.scarab(0, 0, -100, { to: [5, 0, 0], period: 5.0 });
      b.scarab(0, 0, -110, { to: [-5, 0, 0], period: 5.0, phase: 0.5 });
      b.checkpoint(0, 0, -120);
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





const WORLD6_LEVELS = [
  {
    name: 'Pasillo Pastel', target: 38,
    hint: '¡Bienvenido a la fábrica! El chicle te frena.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -8, 5, 10, { type: 'candy' }); b.coinRow(0, 0, -4, 0, 0, -12, 3);
      b.gumPad(0, 0, -18, 5, 10); b.coin(0, 0, -18);
      b.plat(0, 0, -28, 5.5, 10, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -28);
      b.plat(0, 0, -36, 4.5, 10, { type: 'candy' });
      b.gumPad(0, 0, -46, 4.5, 10);
      b.plat(0, 0, -56, 5.5, 10, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -56);
      b.plat(0, 0, -64, 4.5, 10, { type: 'candy' }); b.coin(0, 0, -64);
      b.plat(0, 0, -74, 8, 10, { type: 'candy', pillars: true });
      b.crown(0, 0, -75);
      b.wp(0, 0, -2); b.wp(0, 0, -12); b.wp(0, 0, -18); b.wp(0, 0, -28);
      b.wp(0, 0, -36); b.wp(0, 0, -46); b.wp(0, 0, -56); b.wp(0, 0, -64); b.wp(0, 0, -75);
    },
  },
  {
    name: 'Gelatina Saltarina', target: 45,
    hint: 'La gelatina te lanza. ¡Boing rosa!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'candy' }); b.coinRow(0, 0, -4, 0, 0, -12, 3);
      b.jellyPad(0, 0, -14, { power: 14 });
      b.coin(0, 3.8, -17);
      b.plat(0, 3.5, -22, 5.5, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 3.5, -22);
      b.plat(0, 3.5, -30, 4.5, 14, { type: 'candy' });
      b.jellyPad(0, 3.5, -34, { power: 14 });
      b.coin(0, 7.0, -37);
      b.plat(0, 6.8, -42, 5.5, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 6.8, -42);
      b.plat(0, 6.8, -50, 4.5, 14, { type: 'candy' });
      b.jellyPad(0, 6.8, -54, { power: 13 });
      b.plat(0, 9.5, -62, 8, 8, { type: 'candy', pillars: true });
      b.crown(0, 9.5, -63);
      b.wp(0, 0, -2); b.wp(0, 0, -14, '', 4); b.wp(0, 3.5, -22);
      b.wp(0, 3.5, -34, '', 4); b.wp(0, 6.8, -42);
      b.wp(0, 6.8, -54, '', 4); b.wp(0, 9.5, -63);
    },
  },
  {
    name: 'Prensas Dulces', target: 50,
    hint: '¡Las prensas bajan! Pasa cuando están arriba.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'candy', pillars: true });
      b.plat(0, 0, -20, 5, 34, { type: 'candy' }); b.coinRow(0, 0, -5, 0, 0, -28, 4);
      const c1 = b.candyCrusher(0, 0, -14, { period: 3.4, w: 2.0, d: 2.0 });
      const c2 = b.candyCrusher(0, 0, -24, { period: 3.4, phase: 0.5, w: 2.0, d: 2.0 });
      b.plat(0, 0, -42, 6, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -42);
      b.plat(0, 0, -60, 5, 28, { type: 'candy' });
      const c3 = b.candyCrusher(0, 0, -52, { period: 3.2, phase: 0.2, w: 2.0, d: 2.0 });
      const c4 = b.candyCrusher(0, 0, -62, { period: 3.2, phase: 0.7, w: 2.0, d: 2.0 });
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
    name: 'Piruletas Giratorias', target: 50,
    hint: 'Brazos de piruleta. ¡Esquívalos o wait!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -40, 12, 72, { type: 'candy' }); // suelo continuo
      b.plat(0, 0, -20, 8, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -20);
      const t1 = b.lolliArm(0, 0, -32, { len: 3.2, speed: 0.7, arms: 3 });
      b.coin(4.5, 0, -32); b.coin(-4.5, 0, -32);
      b.plat(0, 0, -46, 8, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -46);
      const t2 = b.lolliArm(0, 0, -58, { len: 3.2, speed: 0.75, arms: 3 });
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
    name: 'Río de Chocolate', target: 52,
    hint: '¡El chocolate empuja hacia atrás! Rema fuerte.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'candy', pillars: true });
      b.plat(0, 0, -6, 4.5, 6, { type: 'candy' });
      b.chocConvey(0, 0, -15, 4.5, 14, { dir: [0, 0, 1], speed: 3.6 });
      b.coinRow(0, 0, -10, 0, 0, -20, 3);
      b.plat(0, 0, -25, 5, 6, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -25);
      b.chocConvey(0, 0, -34, 4.5, 14, { dir: [0, 0, 1], speed: 3.6 });
      b.coin(0, 0, -30); b.coin(0, 0, -38);
      b.plat(0, 0, -44, 5, 6, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -44);
      b.chocConvey(0, 0, -52, 4.5, 12, { dir: [0, 0, 1], speed: 3.8 });
      b.plat(0, 0, -61, 5, 6, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -61);
      b.chocConvey(0, 0, -69, 4.5, 12, { dir: [0, 0, 1], speed: 3.8 });
      b.coin(0, 0, -69);
      b.plat(0, 0, -78, 8, 8, { type: 'candy', pillars: true });
      b.crown(0, 0, -79);
      b.wp(0, 0, -2); b.wp(0, 0, -15); b.wp(0, 0, -25);
      b.wp(0, 0, -34); b.wp(0, 0, -44); b.wp(0, 0, -52);
      b.wp(0, 0, -61); b.wp(0, 0, -69); b.wp(0, 0, -79);
    },
  },
  {
    name: 'Donuts Lanzadores', target: 48,
    hint: 'Salta en el donut para salir volando.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -10, 4.5, 14, { type: 'candy' }); b.coinRow(0, 0, -4, 0, 0, -12, 3);
      b.donutRing(0, 0, -14, { power: 14 });
      b.coin(0, 3.8, -17);
      b.plat(0, 3.5, -22, 5.5, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 3.5, -22);
      b.plat(0, 3.5, -30, 4.5, 14, { type: 'candy' });
      b.donutRing(0, 3.5, -34, { power: 14 });
      b.coin(0, 7.0, -37);
      b.plat(0, 6.8, -42, 5.5, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 6.8, -42);
      b.plat(0, 6.8, -50, 4.5, 14, { type: 'candy' });
      b.donutRing(0, 6.8, -54, { power: 13 });
      b.plat(0, 9.5, -62, 8, 8, { type: 'candy', pillars: true });
      b.crown(0, 9.5, -63);
      b.wp(0, 0, -2); b.wp(0, 0, -14, '', 4); b.wp(0, 3.5, -22);
      b.wp(0, 3.5, -34, '', 4); b.wp(0, 6.8, -42);
      b.wp(0, 6.8, -54, '', 4); b.wp(0, 9.5, -63);
    },
  },
  {
    name: 'Mezcla Azucarada', target: 58,
    hint: 'Chicle, gelatina y prensas juntos.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -9, 5, 12, { type: 'candy' });
      // chicle con laterales sólidos (no atascar bot)
      b.plat(-3.2, 0, -20, 2.2, 12, { type: 'candy' });
      b.plat(3.2, 0, -20, 2.2, 12, { type: 'candy' });
      b.gumPad(0, 0, -20, 4.0, 12); b.coin(0, 0, -20);
      b.plat(0, 0, -30, 6, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -30);
      b.plat(0, 0, -38, 4.5, 12, { type: 'candy' });
      b.jellyPad(0, 0, -42, { power: 14 });
      b.plat(0, 3.5, -50, 5.5, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 3.5, -50);
      b.plat(0, 3.5, -64, 5, 24, { type: 'candy' });
      const c1 = b.candyCrusher(0, 3.5, -60, { period: 3.4, w: 2.0, d: 2.0 });
      b.coin(0, 3.5, -66);
      b.plat(0, 3.5, -80, 8, 8, { type: 'candy', pillars: true });
      b.crown(0, 3.5, -81);
      const W = (c, lead) => ({ cond: () => c.safe(lead) });
      b.wp(0, 0, -2); b.wp(3.0, 0, -20); b.wp(0, 0, -30);
      b.wp(0, 0, -42, '', 4); b.wp(0, 3.5, -50);
      b.wp(0, 3.5, -57.5, 'w', 0, W(c1, 0.1)); b.wp(0, 3.5, -66, '', 7); b.wp(0, 3.5, -81);
    },
  },
  {
    name: 'Corona de Caramelo', target: 80,
    hint: '¡La gran fábrica! Combina todos los dulces.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'candy', pillars: true });
      b.plat(0, 0, -9, 5, 12, { type: 'candy' });
      b.plat(-3.2, 0, -20, 2.2, 12, { type: 'candy' });
      b.plat(3.2, 0, -20, 2.2, 12, { type: 'candy' });
      b.gumPad(0, 0, -20, 4.0, 12); b.coin(0, 0, -20);
      b.plat(0, 0, -30, 6, 8, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -30);
      b.chocConvey(0, 0, -40, 4.5, 14, { dir: [0, 0, 1], speed: 3.4 });
      b.plat(0, 0, -50, 6, 6, { type: 'candy', pillars: true }); b.checkpoint(0, 0, -50);
      b.plat(0, 0, -58, 4.5, 12, { type: 'candy' });
      b.donutRing(0, 0, -62, { power: 14 });
      b.plat(0, 3.5, -70, 6, 6, { type: 'candy', pillars: true }); b.checkpoint(0, 3.5, -70);
      b.plat(0, 3.5, -82, 5, 20, { type: 'candy' });
      const c1 = b.candyCrusher(0, 3.5, -78, { period: 3.4, w: 2.0, d: 2.0 });
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

const WORLD7_LEVELS = [
  {
    name: 'Arrecife Suave', target: 38,
    hint: '¡Bajo el mar! Las corrientes empujan de lado.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'coral', pillars: true });
      b.plat(0, 0, -14, 5.5, 22, { type: 'coral' });
      b.plat(-3.6, 0, -14, 2.8, 22, { type: 'coral' });
      b.plat(3.6, 0, -14, 2.8, 22, { type: 'coral' });
      b.waterCurrent(0, 0, -14, 5, 16, { dir: [1, 0, 0], force: 3.5 });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      b.plat(0, 0, -28, 7, 8, { type: 'coral', pillars: true }); b.checkpoint(0, 0, -28);
      b.plat(0, 0, -42, 5.5, 22, { type: 'coral' });
      b.plat(-3.6, 0, -42, 2.8, 22, { type: 'coral' });
      b.plat(3.6, 0, -42, 2.8, 22, { type: 'coral' });
      b.waterCurrent(0, 0, -42, 5, 16, { dir: [-1, 0, 0], force: 3.5 });
      b.coin(0, 0, -36); b.coin(0, 0, -48);
      b.plat(0, 0, -56, 7, 8, { type: 'coral', pillars: true }); b.checkpoint(0, 0, -56);
      b.plat(0, 0, -68, 6, 14, { type: 'coral' });
      b.plat(0, 0, -80, 8, 8, { type: 'coral', pillars: true });
      b.crown(0, 0, -81);
      b.wp(0, 0, -2); b.wp(-1.8, 0, -14); b.wp(0, 0, -24); b.wp(0, 0, -28);
      b.wp(1.8, 0, -42); b.wp(0, 0, -52); b.wp(0, 0, -56);
      b.wp(0, 0, -68); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Columnas de Burbujas', target: 48,
    hint: 'Las burbujas te levantan. ¡Flota hacia arriba!',
    build(b) {
      // huecos con columnas de burbujas (sin suelo debajo para poder flotar)
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'coral', pillars: true });
      b.plat(0, 0, -8, 4.5, 8, { type: 'coral' });
      b.bubbleColumn(0, 0, -14, 4.5, 4.5, { force: 24 });
      b.coin(0, 2.5, -14);
      b.plat(0, 3.5, -22, 5.5, 8, { type: 'coral', pillars: true }); b.checkpoint(0, 3.5, -22);
      b.plat(0, 3.5, -28, 4.5, 6, { type: 'coral' });
      b.bubbleColumn(0, 3.5, -34, 4.5, 4.5, { force: 24 });
      b.coin(0, 6.0, -34);
      b.plat(0, 6.8, -42, 5.5, 8, { type: 'coral', pillars: true }); b.checkpoint(0, 6.8, -42);
      b.plat(0, 6.8, -48, 4.5, 6, { type: 'coral' });
      b.bubbleColumn(0, 6.8, -54, 4.5, 4.5, { force: 22 });
      b.plat(0, 9.5, -62, 8, 8, { type: 'coral', pillars: true });
      b.crown(0, 9.5, -63);
      const Hi = (y) => ({ cond: () => (window.__game && window.__game.ball.pos.y > y) });
      b.wp(0, 0, -2); b.wp(0, 0, -10);
      b.wp(0, 3.2, -14, 'w', 0, Hi(3.0)); b.wp(0, 3.5, -22);
      b.wp(0, 3.5, -30); b.wp(0, 6.5, -34, 'w', 0, Hi(6.3)); b.wp(0, 6.8, -42);
      b.wp(0, 6.8, -50); b.wp(0, 9.2, -54, 'w', 0, Hi(9.0)); b.wp(0, 9.5, -63);
    },
  },
  {
    name: 'Medusas Rebotonas', target: 50,
    hint: '¡Medusas! Empujan si las tocas.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'coral', pillars: true });
      b.plat(0, 0, -45, 12, 84, { type: 'coral' });
      b.coinRow(4.5, 0, -8, 4.5, 0, -30, 4);
      b.jellyFish(0, 0, -18, { to: [0, 0, -12], period: 6.5 });
      b.checkpoint(0, 0, -36);
      b.coin(-4.5, 0, -46); b.coin(4.5, 0, -58);
      b.jellyFish(-3.5, 0, -50, { to: [7, 0, 0], period: 6.0 });
      b.jellyFish(3.5, 0, -60, { to: [-7, 0, 0], period: 6.0, phase: 0.5 });
      b.checkpoint(0, 0, -72);
      b.coin(4.5, 0, -80); b.coin(-4.5, 0, -84);
      b.plat(0, 0, -92, 8, 10, { type: 'coral', pillars: true });
      b.crown(0, 0, -93);
      b.wp(0, 0, -2); b.wp(4.5, 0, -18, 't'); b.wp(4.5, 0, -30); b.wp(0, 0, -36);
      b.wp(-4.5, 0, -52, 't'); b.wp(4.5, 0, -62, 't'); b.wp(0, 0, -72);
      b.wp(4.5, 0, -82); b.wp(0, 0, -93);
    },
  },
  {
    name: 'Almejas Abiertas', target: 52,
    hint: 'Salta a la almeja cuando esté abierta.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'coral', pillars: true });
      b.plat(0, 0, -40, 8, 76, { type: 'coral' });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      const a1 = b.clam(0, 0, -18, { period: 3.6 });
      b.checkpoint(0, 0, -28);
      const a2 = b.clam(-2.0, 0, -40, { period: 3.4, phase: 0.25 });
      const a3 = b.clam(2.0, 0, -50, { period: 3.4, phase: 0.55 });
      b.coin(0, 0, -44);
      b.checkpoint(0, 0, -60);
      const a4 = b.clam(0, 0, -70, { period: 3.2 });
      b.plat(0, 0, -84, 8, 10, { type: 'coral', pillars: true });
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
    name: 'Anclas Oscilantes', target: 50,
    hint: 'Anclas que se balancean. ¡Pasa con timing!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'coral', pillars: true });
      b.plat(0, 0, -12, 3.4, 18, { type: 'coral' }); b.coinRow(0, 0, -5, 0, 0, -16, 3);
      const h1 = b.swingingAnchor(0, 0, -8, { speed: 1.6, phase: 0, len: 4.2 });
      const h2 = b.swingingAnchor(0, 0, -13, { speed: 1.6, phase: Math.PI * 0.6, len: 4.2 });
      b.plat(0, 0, -22, 6, 6, { type: 'coral', pillars: true }); b.checkpoint(0, 0, -22);
      b.plat(0, 0, -38, 3.4, 24, { type: 'coral' });
      const h3 = b.swingingAnchor(0, 0, -32, { speed: 1.7, phase: 0, len: 4.2 });
      const h4 = b.swingingAnchor(0, 0, -38, { speed: 1.7, phase: 2.1, len: 4.2 });
      b.coin(0, 0, -35);
      b.plat(0, 0, -52, 6, 6, { type: 'coral', pillars: true }); b.checkpoint(0, 0, -52);
      b.plat(0, 0, -64, 5, 20, { type: 'coral' });
      b.plat(0, 0, -78, 8, 10, { type: 'coral', pillars: true });
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
    name: 'Erizos Punzantes', target: 48,
    hint: 'Erizos de mar. ¡Pasa por los lados!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'coral', pillars: true });
      b.plat(0, 0, -48, 12, 92, { type: 'coral' }); // continuo hasta el final
      b.coinRow(4.2, 0, -8, 4.2, 0, -28, 4);
      b.urchin(0, 0, -16, { r: 0.55 }); b.urchin(0, 0, -26, { r: 0.55 });
      b.checkpoint(0, 0, -36);
      b.urchin(0, 0, -48, { r: 0.55 }); b.urchin(0, 0, -58, { r: 0.55 });
      b.coin(4.2, 0, -52);
      b.checkpoint(0, 0, -68);
      b.urchin(0, 0, -76, { r: 0.55 });
      b.plat(0, 0, -92, 8, 10, { type: 'coral', pillars: true });
      b.crown(0, 0, -93);
      b.wp(0, 0, -2); b.wp(4.2, 0, -16, 't'); b.wp(4.2, 0, -26, 't'); b.wp(0, 0, -36);
      b.wp(4.2, 0, -48, 't'); b.wp(4.2, 0, -58, 't'); b.wp(0, 0, -68);
      b.wp(4.2, 0, -76, 't'); b.wp(0, 0, -93);
    },
  },
  {
    name: 'Corriente Profunda', target: 58,
    hint: 'Burbujas, corrientes y medusas.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'coral', pillars: true });
      b.plat(0, 0, -12, 6, 16, { type: 'coral' });
      b.plat(0, 0, -28, 10, 20, { type: 'coral' });
      b.plat(-4.0, 0, -28, 2.5, 20, { type: 'coral' });
      b.plat(4.0, 0, -28, 2.5, 20, { type: 'coral' });
      b.waterCurrent(0, 0, -28, 5, 14, { dir: [1, 0, 0], force: 2.8 });
      b.jellyFish(0, 0, -30, { to: [4, 0, 0], period: 5.0 });
      b.plat(0, 0, -42, 6, 6, { type: 'coral', pillars: true }); b.checkpoint(0, 0, -42);
      b.plat(0, 0, -48, 4.5, 6, { type: 'coral' });
      b.bubbleColumn(0, 0, -54, 4.5, 4.5, { force: 20, power: 15 });
      b.plat(0, 3.5, -62, 5.5, 8, { type: 'coral', pillars: true }); b.checkpoint(0, 3.5, -62);
      b.plat(0, 3.5, -72, 10, 14, { type: 'coral' });
      b.urchin(0, 3.5, -72, { r: 0.55 });
      b.plat(0, 3.5, -84, 8, 8, { type: 'coral', pillars: true });
      b.crown(0, 3.5, -85);
      const Hi = (y) => ({ cond: () => (window.__game && window.__game.ball.pos.y > y) });
      b.wp(0, 0, -2); b.wp(0, 0, -12); b.wp(-2.2, 0, -28); b.wp(-2.2, 0, -34, 't');
      b.wp(0, 0, -42); b.wp(0, 0, -48); b.wp(0, 3.2, -54, 'w', 0, Hi(3.0)); b.wp(0, 3.5, -62);
      b.wp(4.5, 3.5, -72, 't'); b.wp(0, 3.5, -85);
    },
  },
  {
    name: 'Corona del Arrecife', target: 80,
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
      const a1 = b.clam(0, 3.5, -70, { period: 3.6 });
      const a2 = b.clam(0, 3.5, -80, { period: 3.6, phase: 0.4 });
      b.checkpoint(0, 3.5, -90);
      b.urchin(0, 3.5, -100, { r: 0.55 });
      // pasillo continuo bajo el ancla hasta la corona
      b.plat(0, 3.5, -118, 4, 28, { type: 'coral' });
      const h1 = b.swingingAnchor(0, 3.5, -116, { speed: 1.5, len: 4.2 });
      b.plat(0, 3.5, -136, 10, 10, { type: 'coral', pillars: true });
      b.pillar(-3.2, 3.5, -139, 3); b.pillar(3.2, 3.5, -139, 3);
      b.crown(0, 3.5, -138);
      const Hi = (y) => ({ cond: () => (window.__game && window.__game.ball.pos.y > y) });
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

const WORLD8_LEVELS = [
  {
    name: 'Patio Encantado', target: 38,
    hint: '¡Un castillo de cuento! Sigue las banderas doradas.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'castle', pillars: true });
      b.plat(0, 0, -40, 6, 72, { type: 'castle' });
      b.coinRow(0, 0, -6, 0, 0, -24, 4);
      b.checkpoint(0, 0, -28);
      b.coin(0, 0, -40); b.coin(0, 0, -52);
      b.checkpoint(0, 0, -56);
      b.plat(0, 0, -80, 8, 10, { type: 'castle', pillars: true });
      b.crown(0, 0, -81);
      b.wp(0, 0, -2); b.wp(0, 0, -20); b.wp(0, 0, -28);
      b.wp(0, 0, -44); b.wp(0, 0, -56); b.wp(0, 0, -70); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Hachas Pendulares', target: 48,
    hint: 'Hachas de cuento. ¡Espera y cruza!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'castle', pillars: true });
      b.plat(0, 0, -12, 3.4, 18, { type: 'castle' }); b.coinRow(0, 0, -5, 0, 0, -16, 3);
      const h1 = b.pendulumAxe(0, 0, -8, { speed: 1.6, phase: 0, len: 4.2 });
      const h2 = b.pendulumAxe(0, 0, -13, { speed: 1.6, phase: Math.PI * 0.6, len: 4.2 });
      b.plat(0, 0, -22, 6, 6, { type: 'castle', pillars: true }); b.checkpoint(0, 0, -22);
      b.plat(0, 0, -38, 3.4, 24, { type: 'castle' });
      const h3 = b.pendulumAxe(0, 0, -32, { speed: 1.7, phase: 0, len: 4.2 });
      const h4 = b.pendulumAxe(0, 0, -38, { speed: 1.7, phase: 2.1, len: 4.2 });
      b.coin(0, 0, -35);
      b.plat(0, 0, -52, 6, 6, { type: 'castle', pillars: true }); b.checkpoint(0, 0, -52);
      b.plat(0, 0, -64, 5, 20, { type: 'castle' });
      b.plat(0, 0, -78, 8, 10, { type: 'castle', pillars: true });
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
    name: 'Baldosas Mágicas', target: 50,
    hint: 'Las baldosas aparecen y desaparecen. ¡Cruza cuando brillen!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'castle', pillars: true });
      b.plat(0, 0, -42, 6, 76, { type: 'castle' });
      // baldosas que parpadean ENCIMA del camino (reto de monedas / ritmo)
      b.blinkPlat(0, 0.55, -18, 3.5, 3.5, { period: 2.4, onFrac: 0.5 });
      b.blinkPlat(0, 0.55, -28, 3.5, 3.5, { period: 2.4, phase: 0.5, onFrac: 0.5 });
      b.coin(0, 1.2, -18); b.coin(0, 1.2, -28);
      b.checkpoint(0, 0, -36);
      b.blinkPlat(0, 0.55, -48, 3.5, 3.5, { period: 2.2, onFrac: 0.5 });
      b.blinkPlat(0, 0.55, -58, 3.5, 3.5, { period: 2.2, phase: 0.5, onFrac: 0.5 });
      b.coin(0, 1.2, -48);
      b.checkpoint(0, 0, -66);
      b.plat(0, 0, -84, 8, 10, { type: 'castle', pillars: true });
      b.crown(0, 0, -85);
      b.wp(0, 0, -2); b.wp(0, 0, -20); b.wp(0, 0, -36);
      b.wp(0, 0, -52); b.wp(0, 0, -66); b.wp(0, 0, -85);
    },
  },
  {
    name: 'Puente Levadizo', target: 50,
    hint: 'El puente baja: ¡pasa cuando esté horizontal!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'castle', pillars: true });
      b.plat(0, 0, -10, 4.5, 12, { type: 'castle' });
      b.plat(0, 0, -18, 5, 5, { type: 'castle', pillars: true }); b.checkpoint(0, 0, -18);
      const d1 = b.drawbridge(0, 0, -20, { period: 3.8, d: 6 });
      b.plat(0, 0, -30, 5, 6, { type: 'castle', pillars: true }); b.checkpoint(0, 0, -30);
      const d2 = b.drawbridge(0, 0, -32, { period: 3.6, phase: 0.35, d: 6 });
      b.plat(0, 0, -42, 5, 6, { type: 'castle', pillars: true }); b.checkpoint(0, 0, -42);
      b.plat(0, 0, -54, 5, 16, { type: 'castle' }); b.coinRow(0, 0, -48, 0, 0, -58, 3);
      b.plat(0, 0, -66, 8, 8, { type: 'castle', pillars: true });
      b.crown(0, 0, -67);
      const O = (d) => ({ cond: () => d.open(0.15) });
      b.wp(0, 0, -2); b.wp(0, 0, -12); b.wp(0, 0, -18);
      b.wp(0, 0, -19.5, 'w', 0, O(d1)); b.wp(0, 0, -26, '', 7); b.wp(0, 0, -30);
      b.wp(0, 0, -31.5, 'w', 0, O(d2)); b.wp(0, 0, -38, '', 7); b.wp(0, 0, -42);
      b.wp(0, 0, -54); b.wp(0, 0, -67);
    },
  },
  {
    name: 'Engranajes Reales', target: 50,
    hint: 'Engranajes giratorios. ¡Pasa por el borde!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'castle', pillars: true });
      b.plat(0, 0, -40, 12, 72, { type: 'castle' });
      b.plat(0, 0, -18, 8, 8, { type: 'castle', pillars: true }); b.checkpoint(0, 0, -18);
      const g1 = b.gearWall(0, 0, -30, { len: 3.2, speed: 0.7, arms: 3 });
      b.coin(4.5, 0, -30);
      b.plat(0, 0, -44, 8, 8, { type: 'castle', pillars: true }); b.checkpoint(0, 0, -44);
      const g2 = b.gearWall(0, 0, -56, { len: 3.2, speed: 0.75, arms: 3 });
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
    name: 'Fantasmas Empujones', target: 50,
    hint: 'Fantasmas amistosos… pero empujan. ¡Esquívalos!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'castle', pillars: true });
      b.plat(0, 0, -45, 12, 84, { type: 'castle' });
      b.coinRow(4.5, 0, -8, 4.5, 0, -28, 4);
      b.ghostPusher(0, 0, -18, { to: [0, 0, -10], period: 6.0 });
      b.checkpoint(0, 0, -36);
      b.ghostPusher(-3.5, 0, -50, { to: [7, 0, 0], period: 5.5 });
      b.ghostPusher(3.5, 0, -60, { to: [-7, 0, 0], period: 5.5, phase: 0.5 });
      b.coin(-4.5, 0, -46); b.coin(4.5, 0, -58);
      b.checkpoint(0, 0, -72);
      b.plat(0, 0, -90, 8, 10, { type: 'castle', pillars: true });
      b.crown(0, 0, -91);
      b.wp(0, 0, -2); b.wp(4.5, 0, -18, 't'); b.wp(4.5, 0, -28); b.wp(0, 0, -36);
      b.wp(-4.5, 0, -52, 't'); b.wp(4.5, 0, -62, 't'); b.wp(0, 0, -72);
      b.wp(0, 0, -91);
    },
  },
  {
    name: 'Pasadizos Secretos', target: 55,
    hint: 'Busca el arco dorado: ¡atajo con monedas!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'castle', pillars: true });
      b.plat(0, 0, -42, 6, 76, { type: 'castle' });
      b.secretDoor(0, 0, -14, { side: 1, len: 14, coins: 4 });
      b.checkpoint(0, 0, -28);
      const h1 = b.pendulumAxe(0, 0, -40, { speed: 1.55, len: 4.0 });
      b.coin(0, 0, -48);
      b.checkpoint(0, 0, -56);
      // baldosa mágica opcional; carril continuo ya cubre
      b.blinkPlat(0, 0.4, -64, 3.2, 3.2, { period: 2.5, onFrac: 0.6 });
      b.plat(0, 0, -84, 8, 10, { type: 'castle', pillars: true });
      b.crown(0, 0, -85);
      const W = (h, lead) => ({ cond: () => h.safe(lead) });
      b.wp(0, 0, -2); b.wp(0, 0, -20); b.wp(0, 0, -28);
      b.wp(0, 0, -37.5, 'w', 0, W(h1, 0.25)); b.wp(0, 0, -48); b.wp(0, 0, -56);
      b.wp(0, 0, -70); b.wp(0, 0, -85);
    },
  },
  {
    name: 'Corona del Castillo', target: 80,
    hint: '¡La corona real! Usa todo lo aprendido.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'castle', pillars: true });
      // piso continuo hasta la corona (sin huecos)
      b.plat(0, 0, -70, 12, 140, { type: 'castle' });
      b.secretDoor(0, 0, -14, { side: -1, len: 12, coins: 3 });
      b.checkpoint(0, 0, -28);
      b.drawbridge(0, 0, -40, { period: 4.2, d: 5 });
      b.checkpoint(0, 0, -52);
      b.gearWall(0, 0, -64, { len: 3.0, speed: 0.6, arms: 3 });
      const h1 = b.pendulumAxe(0, 0, -78, { speed: 1.45, len: 4.0 });
      b.checkpoint(0, 0, -90);
      b.ghostPusher(6.0, 0, -102, { to: [0, 0, -6], period: 5.5 });
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

const WORLD9_LEVELS = [
  {
    name: 'Avenida Neón', target: 38,
    hint: '¡Bienvenido a la ciudad de neón! Sigue las luces.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -40, 6, 72, { type: 'neon' });
      b.coinRow(0, 0, -6, 0, 0, -24, 4);
      b.checkpoint(0, 0, -28);
      b.coin(0, 0, -40); b.coin(0, 0, -52);
      b.checkpoint(0, 0, -56);
      b.plat(0, 0, -80, 8, 10, { type: 'neon', pillars: true });
      b.crown(0, 0, -81);
      b.wp(0, 0, -2); b.wp(0, 0, -20); b.wp(0, 0, -28);
      b.wp(0, 0, -44); b.wp(0, 0, -56); b.wp(0, 0, -70); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Teletransportes', target: 45,
    hint: 'Pisa el pad cian y apareces en el rosa.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -10, 5, 12, { type: 'neon' });
      const t1 = b.teleportPad(0, 0, -14, { color: 0x40f8ff });
      // hueco; destino alto
      b.plat(0, 3.5, -28, 6, 8, { type: 'neon', pillars: true }); b.checkpoint(0, 3.5, -28);
      const t2 = b.teleportPad(0, 3.5, -28, { color: 0xff40c8 });
      b.linkTeleports(t1, t2);
      b.plat(0, 3.5, -40, 5, 14, { type: 'neon' });
      const t3 = b.teleportPad(0, 3.5, -44, { color: 0x40f8ff });
      b.plat(0, 7.0, -58, 6, 8, { type: 'neon', pillars: true }); b.checkpoint(0, 7.0, -58);
      const t4 = b.teleportPad(0, 7.0, -58, { color: 0xff40c8 });
      b.linkTeleports(t3, t4);
      b.coin(0, 3.5, -36); b.coin(0, 7.0, -64);
      b.plat(0, 7.0, -70, 5, 14, { type: 'neon' });
      b.plat(0, 7.0, -82, 8, 8, { type: 'neon', pillars: true });
      b.crown(0, 7.0, -83);
      const Hi = (y) => ({ cond: () => (window.__game && window.__game.ball.pos.y > y) });
      // ir hacia el destino: al cruzar el pad, el teleporte te sube
      b.wp(0, 0, -2); b.wp(0, 0, -12);
      b.wp(0, 3.5, -28, 'w', 0, Hi(2.8));
      b.wp(0, 3.5, -40);
      b.wp(0, 7.0, -58, 'w', 0, Hi(6.2));
      b.wp(0, 7.0, -70); b.wp(0, 7.0, -83);
    },
  },
  {
    name: 'Láseres Temporizados', target: 50,
    hint: 'Láseres rosa. Cruza cuando se apaguen.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'neon', pillars: true });
      b.plat(0, 0, -20, 5, 34, { type: 'neon' }); b.coinRow(0, 0, -5, 0, 0, -28, 4);
      const l1 = b.laserGate(0, 0, -14, { period: 2.8 });
      const l2 = b.laserGate(0, 0, -24, { period: 2.8, phase: 0.5 });
      b.plat(0, 0, -42, 6, 8, { type: 'neon', pillars: true }); b.checkpoint(0, 0, -42);
      b.plat(0, 0, -60, 5, 28, { type: 'neon' });
      const l3 = b.laserGate(0, 0, -52, { period: 2.6, phase: 0.2 });
      const l4 = b.laserGate(0, 0, -62, { period: 2.6, phase: 0.7 });
      b.coin(0, 0, -55); b.coin(0, 0, -65);
      b.plat(0, 0, -80, 8, 10, { type: 'neon', pillars: true });
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
    name: 'Imán Urbano', target: 48,
    hint: 'Los imanes te jalan de lado. Compensa la trayectoria.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -14, 8, 22, { type: 'neon' });
      b.plat(-3.8, 0, -14, 2.6, 22, { type: 'neon' });
      b.plat(3.8, 0, -14, 2.6, 22, { type: 'neon' });
      b.magnetZone(0, 0, -14, 5, 16, { dir: [1, 0, 0], force: 3.5 });
      b.coinRow(0, 0, -6, 0, 0, -18, 3);
      b.plat(0, 0, -28, 7, 8, { type: 'neon', pillars: true }); b.checkpoint(0, 0, -28);
      b.plat(0, 0, -42, 8, 22, { type: 'neon' });
      b.plat(-3.8, 0, -42, 2.6, 22, { type: 'neon' });
      b.plat(3.8, 0, -42, 2.6, 22, { type: 'neon' });
      b.magnetZone(0, 0, -42, 5, 16, { dir: [-1, 0, 0], force: 3.5 });
      b.coin(0, 0, -36); b.coin(0, 0, -48);
      b.plat(0, 0, -56, 7, 8, { type: 'neon', pillars: true }); b.checkpoint(0, 0, -56);
      b.plat(0, 0, -68, 6, 14, { type: 'neon' });
      b.plat(0, 0, -80, 8, 8, { type: 'neon', pillars: true });
      b.crown(0, 0, -81);
      b.wp(0, 0, -2); b.wp(-1.8, 0, -14); b.wp(0, 0, -24); b.wp(0, 0, -28);
      b.wp(1.8, 0, -42); b.wp(0, 0, -52); b.wp(0, 0, -56);
      b.wp(0, 0, -68); b.wp(0, 0, -81);
    },
  },
  {
    name: 'Turbos Neón', target: 48,
    hint: 'Pads amarillos = turbo hacia adelante. ¡Sujétate!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -48, 6, 88, { type: 'neon' });
      b.boostPad(0, 0, -14, { force: 16 });
      b.coin(0, 0, -22);
      b.checkpoint(0, 0, -32);
      b.boostPad(0, 0, -42, { force: 16 });
      b.coin(0, 0, -52);
      b.checkpoint(0, 0, -62);
      b.boostPad(0, 0, -72, { force: 14 });
      b.plat(0, 0, -90, 8, 10, { type: 'neon', pillars: true });
      b.crown(0, 0, -91);
      b.wp(0, 0, -2); b.wp(0, 0, -14); b.wp(0, 0, -32);
      b.wp(0, 0, -42); b.wp(0, 0, -62);
      b.wp(0, 0, -72); b.wp(0, 0, -91);
    },
  },
  {
    name: 'Ascensores', target: 52,
    hint: 'Plataformas elevadoras. Los resortes te suben.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -12, 5, 16, { type: 'neon' });
      b.elevator(4.5, 0, -16, 2.6, 2.6, { to: [0, 3.5, 0], period: 4.0 });
      b.spring(0, 0, -18, { power: 16 });
      b.plat(0, 3.5, -26, 6, 8, { type: 'neon', pillars: true }); b.checkpoint(0, 3.5, -26);
      b.plat(0, 3.5, -36, 5, 12, { type: 'neon' });
      b.elevator(4.5, 3.5, -38, 2.6, 2.6, { to: [0, 3.5, 0], period: 4.0, phase: 0.5 });
      b.spring(0, 3.5, -40, { power: 16 });
      b.plat(0, 7.0, -48, 6, 8, { type: 'neon', pillars: true }); b.checkpoint(0, 7.0, -48);
      b.plat(0, 7.0, -60, 6, 16, { type: 'neon' }); b.coin(0, 7.0, -56);
      b.plat(0, 7.0, -74, 8, 10, { type: 'neon', pillars: true });
      b.crown(0, 7.0, -75);
      b.wp(0, 0, -2); b.wp(0, 0, -18, '', 4); b.wp(0, 3.5, -26);
      b.wp(0, 3.5, -40, '', 4); b.wp(0, 7.0, -48);
      b.wp(0, 7.0, -60); b.wp(0, 7.0, -75);
    },
  },
  {
    name: 'Cintas Opuestas', target: 55,
    hint: 'Cintas neón empujan hacia atrás. ¡Rema!',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 6, { type: 'neon', pillars: true });
      b.plat(0, 0, -6, 4.5, 6, { type: 'neon' });
      b.neonConvey(0, 0, -15, 4.5, 14, { dir: [0, 0, 1], speed: 3.4 });
      b.coinRow(0, 0, -10, 0, 0, -20, 3);
      b.plat(0, 0, -25, 5, 6, { type: 'neon', pillars: true }); b.checkpoint(0, 0, -25);
      b.neonConvey(0, 0, -34, 4.5, 14, { dir: [0, 0, 1], speed: 3.4 });
      b.coin(0, 0, -30); b.coin(0, 0, -38);
      b.plat(0, 0, -44, 5, 6, { type: 'neon', pillars: true }); b.checkpoint(0, 0, -44);
      b.plat(0, 0, -58, 5, 22, { type: 'neon' });
      b.boostPad(0, 0, -58, { force: 14 });
      b.plat(0, 0, -74, 8, 10, { type: 'neon', pillars: true });
      b.crown(0, 0, -75);
      b.wp(0, 0, -2); b.wp(0, 0, -15); b.wp(0, 0, -25);
      b.wp(0, 0, -34); b.wp(0, 0, -44);
      b.wp(0, 0, -58); b.wp(0, 0, -75);
    }
  },
  {
    name: 'Corona Neón', target: 80,
    hint: '¡La corona de la ciudad! Turbo, láseres y teleports.',
    build(b) {
      b.start(0, 0, 0); b.plat(0, 0, 0, 6, 8, { type: 'neon', pillars: true });
      b.plat(0, 0, -50, 8, 100, { type: 'neon' });
      b.neonConvey(0, 0, -16, 4.5, 12, { dir: [0, 0, 1], speed: 3.0 });
      b.checkpoint(0, 0, -28);
      b.boostPad(0, 0, -36, { force: 12 });
      const l1 = b.laserGate(0, 0, -48, { period: 3.2 });
      b.checkpoint(0, 0, -58);
      const ta = b.teleportPad(-4.8, 0, -66, { color: 0x40f8ff });
      b.plat(-4.8, 3.2, -66, 4, 6, { type: 'neon' });
      const tb = b.teleportPad(-4.8, 3.2, -66, { color: 0xff40c8 });
      b.linkTeleports(ta, tb);
      b.coin(-4.8, 3.2, -64); b.coin(-4.8, 3.2, -68);
      b.plat(-3.5, 0, -80, 2.8, 18, { type: 'neon' });
      b.plat(3.5, 0, -80, 2.8, 18, { type: 'neon' });
      b.magnetZone(0, 0, -80, 5, 14, { dir: [1, 0, 0], force: 2.8 });
      b.checkpoint(0, 0, -92);
      b.spring(0, 0, -98, { power: 16 });
      b.elevator(4.5, 0, -98, 2.6, 2.6, { to: [0, 3.5, 0], period: 4.5 });
      b.plat(0, 3.5, -106, 10, 10, { type: 'neon', pillars: true });
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


// Futuro: W10 Cosmos
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
];



// Lista plana (índices 0-7 Mundo 1, 8-15 Mundo 2) — compatible con partidas guardadas
export const LEVELS = WORLDS.flatMap((w, wi) => w.levels.map((L, li) => ({
  ...L, world: w.id, worldIndex: wi, theme: w.theme, localIndex: li,
})));
