// Patio de práctica: arena abierta y cerrada, sin tiempo ni fallos.
// No forma parte de LEVELS, así que no toca progreso, estrellas ni logros.
export const PRACTICE = {
  name: 'Patio de práctica', target: 9999, theme: 'sky', practice: true,
  hint: '¡Patio libre! Rueda por donde quieras, aquí no te puedes caer.',
  build(b) {
    const W = 40, Z0 = 5, Z1 = -37, CZ = (Z0 + Z1) / 2, D = Z0 - Z1;
    b.start(0, 0, 0);
    // suelo (con una zanja poco profunda y segura en z≈-28, lado izquierdo)
    b.plat(0, 0, -11, W, 32, { rock: false });
    b.plat(0, 0, -33, W, 8, { rock: false });
    b.plat(9, 0, -28, 22, 2, { rock: false });
    b.plat(-11, -0.7, -28, 18, 2, { rock: false, type: 'sand' });
    // barandas en todo el borde
    const wh = 1.6, wt = 0.8;
    b.plat(0, 1.0, Z0 + wt / 2, W + wt * 2, wt, { h: wh, rock: false, type: 'wood' });
    b.plat(0, 1.0, Z1 - wt / 2, W + wt * 2, wt, { h: wh, rock: false, type: 'wood' });
    b.plat(-W / 2 - wt / 2, 1.0, CZ, wt, D, { h: wh, rock: false, type: 'wood' });
    b.plat(W / 2 + wt / 2, 1.0, CZ, wt, D, { h: wh, rock: false, type: 'wood' });
    // zona 1: rampitas (izquierda delante)
    b.ramp(-12, 0, -4, -12, 1.2, -9, 4);
    b.plat(-12, 1.2, -11.5, 5, 5, { rock: false, type: 'marble' });
    b.ramp(-12, 1.2, -14, -12, 0, -19, 4);
    b.coin(-12, 1.2, -11.5); b.coin(-12, 0.6, -6.5); b.coin(-12, 0.6, -16.5);
    // zona 2: bumpers (derecha delante)
    [[10, -5], [14, -7.5], [10, -10], [14, -12.5]].forEach(([x, z]) => b.bumper(x, 0, z, { r: 0.75 }));
    b.coin(12, 0, -7.5); b.coin(12, 0, -11);
    // zona 3: cinta corta (empuja hacia atrás, en contra del avance)
    b.convey(0, 0.02, -20, 4, 8, { dir: [0, 0, 1], speed: 3 });
    b.coinRow(0, 0, -17.5, 0, 0, -22.5, 3);
    // zona 4: bloques que se mueven (derecha fondo)
    b.mover(8, 0.6, -33, 2.4, 2.4, { to: [8, 0, 0], period: 6 });
    b.mover(16, 0.6, -21, 2.4, 2.4, { to: [0, 0, -4], period: 5 });
    b.coin(12, 0.6, -33); b.coin(16, 0.6, -23);
    // zona 5: zanja para saltar (izquierda fondo) y monedas al otro lado
    b.coinRow(-17, 0, -32, -5, 0, -32, 4);
    b.coin(-11, -0.7, -28);
    // monedas sueltas para pasear
    [[-4, -3], [4, -3], [-6, -24], [6, -14], [0, -34], [-17, 2], [17, 2], [17, -35], [-17, -35]].forEach(([x, z]) => b.coin(x, 0, z));
  },
};
