// Mundo 1: Ruinas Flotantes. El camino avanza hacia -Z (lejos de la cámara).
// wp() = puntos de ruta para el piloto automático de pruebas ('j' = saltar aquí, 't' = giro).
export const LEVELS = [
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
