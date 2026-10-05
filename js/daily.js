// Reto Diario: nivel del día (semilla por fecha local), siempre un nivel existente.
export function localDateStr(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function mulberry32(a) {
  return function () {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/** Especificación del reto para una fecha. baseIndex ∈ [0, levelCount). */
export function dailySpec(dateStr, levelCount = 24) {
  const h = hashStr('corona-reto:' + dateStr);
  const rng = mulberry32(h);
  const baseIndex = Math.floor(rng() * levelCount) % levelCount;
  const twist = Math.floor(rng() * 3); // 0: normal, 1: meta más justa, 2: meta exigente (solo estrellas)
  const reward = 35 + Math.floor(rng() * 4) * 15; // 35–80
  return { date: dateStr, baseIndex, twist, reward, seed: h };
}

export function yesterdayStr(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() - 1);
  return localDateStr(dt);
}

/** Actualiza racha / mejor tiempo / recompensa al completar el reto. */
export function applyDailyWin(save, spec, time) {
  const d = save.daily || (save.daily = { streak: 0, bestStreak: 0, lastWon: '', best: {}, claimed: '' });
  const firstToday = d.lastWon !== spec.date;
  if (firstToday) {
    if (d.lastWon === yesterdayStr(spec.date)) d.streak = (d.streak || 0) + 1;
    else d.streak = 1;
    d.bestStreak = Math.max(d.bestStreak || 0, d.streak);
    d.lastWon = spec.date;
  }
  const prevBest = d.best[spec.date];
  if (prevBest == null || time < prevBest) d.best[spec.date] = +time.toFixed(2);
  let reward = 0;
  if (d.claimed !== spec.date) {
    reward = spec.reward;
    d.claimed = spec.date;
    save.coins = (save.coins || 0) + reward;
  }
  return { reward, firstToday, streak: d.streak, best: d.best[spec.date] };
}
