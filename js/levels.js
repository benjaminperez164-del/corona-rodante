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
];
