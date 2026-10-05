// Logros: definiciones + comprobación retroactiva desde el guardado.
export const ACHIEVEMENTS = [
  { id: 'primera_corona', name: 'Primera corona', desc: 'Completa cualquier nivel', icon: '👑' },
  { id: 'ruinas_listas', name: 'Ruinas exploradas', desc: 'Termina el Mundo 1', icon: '🏛️' },
  { id: 'volcan_listo', name: 'Volcán domado', desc: 'Termina el Mundo 2', icon: '🌋' },
  { id: 'glaciar_listo', name: 'Glaciar conquistado', desc: 'Termina el Mundo 3', icon: '🧊' },
  { id: 'selva_lista', name: 'Selva explorada', desc: 'Termina el Mundo 4', icon: '🌿' },
  { id: 'desierto_listo', name: 'Desierto domado', desc: 'Termina el Mundo 5', icon: '🏜️' },
  { id: 'estrellas_ruinas', name: 'Cielo estrellado', desc: '3★ en los 8 niveles de Ruinas', icon: '⭐' },
  { id: 'estrellas_volcan', name: 'Ascua perfecta', desc: '3★ en los 8 niveles del Volcán', icon: '🔥' },
  { id: 'estrellas_glaciar', name: 'Aurora perfecta', desc: '3★ en los 8 niveles del Glaciar', icon: '✨' },
  { id: 'estrellas_selva', name: 'Canopy perfecto', desc: '3★ en los 8 niveles de la Selva', icon: '🍃' },
  { id: 'estrellas_desierto', name: 'Oasis perfecto', desc: '3★ en los 8 niveles del Desierto', icon: '☀️' },
  { id: 'monedas_100', name: 'Hucha llena', desc: 'Gana 100 monedas en total', icon: '🪙' },
  { id: 'monedas_500', name: 'Tesoro rodante', desc: 'Gana 500 monedas en total', icon: '💰' },
  { id: 'sin_caer', name: 'Pies firmes', desc: 'Termina un nivel sin caerte', icon: '🛡️' },
  { id: 'perfecto', name: 'Triple estrella', desc: 'Consigue 3★ en un nivel', icon: '🌟' },
  { id: 'tiempos_5', name: 'Veloz', desc: 'Bate la meta de tiempo en 5 niveles', icon: '⏱️' },
  { id: 'tiempos_12', name: 'Rayo', desc: 'Bate la meta de tiempo en 12 niveles', icon: '⚡' },
  { id: 'bolas_5', name: 'Colección', desc: 'Ten 5 bolas distintas', icon: '🎱' },
  { id: 'bolas_12', name: 'Armario lleno', desc: 'Ten 12 bolas distintas', icon: '👗' },
  { id: 'reto_diario', name: 'Retador', desc: 'Completa el Reto Diario una vez', icon: '📅' },
  { id: 'racha_3', name: 'Constante', desc: 'Racha diaria de 3 días', icon: '🔥' },
  { id: 'racha_7', name: 'Semana heroica', desc: 'Racha diaria de 7 días', icon: '🏆' },
  { id: 'explorador', name: 'Explorador', desc: 'Desbloquea 5 mundos', icon: '🗺️' },
  { id: 'maestro', name: 'Maestro Rodante', desc: 'Completa los 40 niveles', icon: '🎓' },
];

function levelDone(save, i) { return !!(save.levels[i] && save.levels[i].done); }
function allStars(save, from, n) {
  for (let i = from; i < from + n; i++) {
    const st = (save.levels[i] && save.levels[i].stars) || [];
    if (!(st[0] && st[1] && st[2])) return false;
  }
  return true;
}
function countTargets(save, LEVELS) {
  let n = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    const L = save.levels[i];
    if (L && L.done && L.best != null && L.best <= LEVELS[i].target) n++;
  }
  return n;
}

/** Devuelve ids recién desbloqueados (y marca save.achievements). */
export function evaluateAchievements(save, LEVELS, extra = {}) {
  if (!save.achievements) save.achievements = { unlocked: {} };
  const u = save.achievements.unlocked;
  const newly = [];
  const mark = (id) => { if (!u[id]) { u[id] = Date.now(); newly.push(id); } };

  const doneAny = Object.values(save.levels || {}).some((L) => L && L.done);
  if (doneAny) mark('primera_corona');
  if (levelDone(save, 7)) mark('ruinas_listas');
  if (levelDone(save, 15)) mark('volcan_listo');
  if (levelDone(save, 23)) mark('glaciar_listo');
  if (levelDone(save, 31)) mark('selva_lista');
  if (levelDone(save, 39)) mark('desierto_listo');
  if (allStars(save, 0, 8)) mark('estrellas_ruinas');
  if (allStars(save, 8, 8)) mark('estrellas_volcan');
  if (allStars(save, 16, 8)) mark('estrellas_glaciar');
  if (allStars(save, 24, 8)) mark('estrellas_selva');
  if (allStars(save, 32, 8)) mark('estrellas_desierto');

  const earned = save.stats?.earnedCoins || 0;
  if (earned >= 100) mark('monedas_100');
  if (earned >= 500) mark('monedas_500');
  if ((save.stats?.noDeathWins || 0) >= 1 || extra.noDeath) mark('sin_caer');
  if (Object.values(save.levels || {}).some((L) => L && L.stars && L.stars[0] && L.stars[1] && L.stars[2])) mark('perfecto');

  const tg = countTargets(save, LEVELS);
  if (tg >= 5) mark('tiempos_5');
  if (tg >= 12) mark('tiempos_12');

  const skins = (save.skins || []).length;
  if (skins >= 5) mark('bolas_5');
  if (skins >= 12) mark('bolas_12');

  if (save.daily?.lastWon) mark('reto_diario');
  if ((save.daily?.bestStreak || save.daily?.streak || 0) >= 3) mark('racha_3');
  if ((save.daily?.bestStreak || save.daily?.streak || 0) >= 7) mark('racha_7');

  if (levelDone(save, 31)) mark('explorador'); // mundos 1–5 desbloqueados
  let allDone = true;
  for (let i = 0; i < LEVELS.length; i++) if (!levelDone(save, i)) { allDone = false; break; }
  if (allDone && LEVELS.length >= 40) mark('maestro');

  return newly;
}

export function achievementById(id) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
