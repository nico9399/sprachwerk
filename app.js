/* Sprachwerk – Sprachen lernen. Alles lokal, keine Server, kein Login. */
(() => {
"use strict";

const STORE_KEY = "sprachwerk-v1";
const LEVELS = ["A1", "A2", "B1", "B2"];
const LEVEL_NAMES = { A1: "Einstieg", A2: "Grundlagen", B1: "Alltag sicher", B2: "Selbstständig" };
const INTERVALS = [0, 1, 2, 4, 8, 16, 35, 80]; // Tage je Fach
const MAX_BOX = INTERVALS.length - 1;
const MAX_REVIEWS = 20;
const MAX_QUICK = 8;
const MAX_GRAMMAR_REVIEWS = 3;
const TEST_PASS = 0.8;

// ---------- Helpers ----------
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const pad = (n) => String(n).padStart(2, "0");
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (n) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + n); return dayKey(d); };
const today = () => dayKey();
const lvlIdx = (l) => LEVELS.indexOf(l);
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

const ICON_SPEAK = '<svg viewBox="0 0 24 24"><path d="M4 9.5v5a1 1 0 0 0 1 1h3l4.3 3.6a.8.8 0 0 0 1.3-.6V5.5a.8.8 0 0 0-1.3-.6L8 8.5H5a1 1 0 0 0-1 1zm12.4-2.7a1 1 0 0 1 1.4.1 7.7 7.7 0 0 1 0 10.2 1 1 0 1 1-1.5-1.3 5.7 5.7 0 0 0 0-7.6 1 1 0 0 1 .1-1.4zm-2.3 2.4a1 1 0 0 1 1.4.2 4 4 0 0 1 0 5.2 1 1 0 0 1-1.6-1.2 2 2 0 0 0 0-2.8 1 1 0 0 1 .2-1.4z"/></svg>';
const ICON_MIC = '<svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zm-7 9a1 1 0 0 1 2 0 5 5 0 0 0 10 0 1 1 0 1 1 2 0 7 7 0 0 1-6 6.9V21a1 1 0 1 1-2 0v-2.1A7 7 0 0 1 5 12z"/></svg>';

// ---------- State ----------
const DEFAULT = {
  v: 2,
  lang: "en",
  onboarded: false,
  passed: -1,
  test: null,
  settings: { accent: "us", rate: 0.9, newPerDay: 7, goal: 50, sound: true, autoplay: true, speak: true },
  words: {},     // Wort-ID -> { b, due, seen, wrong, learned, quick }
  gram: {},      // Grammatik-ID -> { done, b, due, seen, wrong, best }
  units: {},     // Einheit-ID -> { done, score, date }
  custom: [],
  days: {},
  reports: [],
  speakSnooze: 0,
};
let S = load();

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      return { ...JSON.parse(JSON.stringify(DEFAULT)), ...d, settings: { ...DEFAULT.settings, ...(d.settings || {}) } };
    }
  } catch (e) { console.warn(e); }
  return JSON.parse(JSON.stringify(DEFAULT));
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); }
  catch (e) { toast("Speichern fehlgeschlagen"); }
}
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

const L = () => window.SW_LANGS[S.lang];
const G = () => window.SW_GRAMMAR[S.lang];

// ---------- Inhalte ----------
let WORDS = [], WMAP = {}, UNITS = [], GMAP = {};
function buildContent() {
  UNITS = L().units;
  GMAP = Object.fromEntries(G().map((g) => [g.id, g]));
  WORDS = [];
  UNITS.forEach((u, ui) => u.words.forEach((w) => {
    WORDS.push({ id: u.id + ":" + w[0], unit: u.id, ui, level: u.level, en: w[0], de: w[1], ex: w[2] || "", exde: w[3] || "" });
  }));
  S.custom.forEach((c) => WORDS.push({ id: "custom:" + c.id, unit: "custom", ui: -1, level: "A1", en: c.en, de: c.de, ex: c.ex || "", exde: c.exde || "" }));
  WMAP = Object.fromEntries(WORDS.map((w) => [w.id, w]));
}
buildContent();
migrate();

function migrate() {
  // v1 → v2: alte Themen-IDs auf neue Einheiten umschreiben (über das englische Wort)
  let changed = false;
  const byEn = {};
  WORDS.forEach((w) => { if (w.unit !== "custom" && !byEn[w.en]) byEn[w.en] = w.id; });
  for (const k of Object.keys(S.words)) {
    if (WMAP[k]) continue;
    const en = k.slice(k.indexOf(":") + 1);
    const nk = byEn[en];
    if (nk && !S.words[nk]) S.words[nk] = S.words[k];
    delete S.words[k]; changed = true;
  }
  if (S.packsOff) { delete S.packsOff; changed = true; }
  if (S.v !== 2) { S.v = 2; changed = true; }
  if (changed) save();
}

const st = (id) => S.words[id];
const unitWords = (uid) => WORDS.filter((w) => w.unit === uid);
const unitById = (uid) => UNITS.find((u) => u.id === uid);
const isQuickLevel = (level) => lvlIdx(level) <= S.passed;

// ---------- Lernpfad ----------
function unitDone(i) { return !!(S.units[UNITS[i].id] && S.units[UNITS[i].id].done); }
function unitUnlocked(i) {
  const u = UNITS[i];
  if (i === 0 || unitDone(i)) return true;
  if (isQuickLevel(u.level)) return true;
  if (unitDone(i - 1)) return true;
  if (lvlIdx(u.level) === S.passed + 1 && UNITS[i - 1].level !== u.level) return true;
  for (let k = i + 1; k < UNITS.length; k++) if (unitDone(k)) return true;
  return false;
}
function currentUnitIndex() {
  for (let i = 0; i < UNITS.length; i++) if (!unitDone(i) && unitUnlocked(i) && !isQuickLevel(UNITS[i].level)) return i;
  for (let i = 0; i < UNITS.length; i++) if (!unitDone(i)) return i;
  return UNITS.length - 1;
}
function unitProgress(i) {
  const u = UNITS[i];
  const ws = unitWords(u.id);
  const seen = ws.filter((w) => st(w.id)).length;
  const g = S.gram[u.grammar];
  return { ws, seen, total: ws.length, grammarDone: !!(g && g.done), done: unitDone(i), quick: isQuickLevel(u.level) };
}
function testReady(i) {
  const p = unitProgress(i);
  return p.quick || p.done || (p.grammarDone && p.seen >= p.total);
}

// ---------- Tagesplan ----------
function dueWords() {
  const t = today();
  return WORDS.filter((w) => { const s = st(w.id); return s && s.due <= t; })
    .sort((a, b) => st(a.id).due.localeCompare(st(b.id).due));
}
function dueGrammar() {
  const t = today();
  return Object.entries(S.gram).filter(([id, g]) => GMAP[id] && g.done && g.due <= t)
    .sort((a, b) => a[1].due.localeCompare(b[1].due)).map(([id]) => GMAP[id]);
}
function learnedToday() {
  const t = today();
  return Object.values(S.words).filter((s) => s.learned === t && !s.quick).length;
}
function newCandidates() {
  const before = [], after = [], quick = [];
  WORDS.filter((w) => w.unit === "custom" && !st(w.id)).forEach((w) => before.push(w));
  const cur = currentUnitIndex();
  for (let i = 0; i < UNITS.length; i++) {
    if (!unitUnlocked(i)) continue;
    const ws = unitWords(UNITS[i].id).filter((w) => !st(w.id));
    if (isQuickLevel(UNITS[i].level)) quick.push(...ws);
    else if (i < cur) before.push(...ws);
    else after.push(...ws);
  }
  return { real: before.concat(after), quick };
}
function todayPlan() {
  const due = dueWords().slice(0, MAX_REVIEWS);
  const gram = dueGrammar().slice(0, MAX_GRAMMAR_REVIEWS);
  const { real, quick } = newCandidates();
  const nNew = Math.max(0, S.settings.newPerDay - learnedToday());
  return { due, gram, fresh: real.slice(0, nNew), quick: quick.slice(0, MAX_QUICK) };
}

// ---------- Statistik ----------
const xpToday = () => S.days[today()] || 0;
function addXp(n) { const t = today(); S.days[t] = (S.days[t] || 0) + n; }
function streak() {
  let n = 0; const d = new Date();
  if (!S.days[dayKey(d)]) d.setDate(d.getDate() - 1);
  while (S.days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
const learnedCount = () => Object.keys(S.words).filter((k) => WMAP[k]).length;
const solidCount = () => Object.entries(S.words).filter(([k, s]) => WMAP[k] && s.b >= 4).length;
const unitsDoneCount = () => UNITS.filter((u, i) => unitDone(i)).length;

// ---------- Sprachausgabe ----------
let voices = [];
function loadVoices() { voices = window.speechSynthesis ? speechSynthesis.getVoices() : []; }
if (window.speechSynthesis) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
const voiceCode = () => L().voices[S.settings.accent] || "en-US";
function bestVoice(code) {
  const c = code.toLowerCase();
  const list = voices.filter((v) => v.lang.replace("_", "-").toLowerCase() === c);
  const pool = list.length ? list : voices.filter((v) => v.lang.toLowerCase().startsWith(c.slice(0, 2)));
  const prefer = ["Samantha", "Daniel", "Karen", "Serena", "Alex", "Google US English", "Google UK English Female"];
  for (const p of prefer) { const v = pool.find((x) => x.name.includes(p)); if (v) return v; }
  return pool.find((v) => v.localService) || pool[0] || null;
}
function speak(text, slow = false) {
  if (!window.speechSynthesis || !text) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/…/g, ""));
  u.lang = voiceCode();
  const v = bestVoice(u.lang); if (v) u.voice = v;
  u.rate = slow ? 0.6 : S.settings.rate;
  speechSynthesis.speak(u);
}

// ---------- Spracherkennung ----------
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const speakingAllowed = () => !!SR && S.settings.speak && Date.now() > (S.speakSnooze || 0);

// ---------- Töne ----------
let actx;
function beep(ok) {
  if (!S.settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    (ok ? [660, 990] : [300, 220]).forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = ok ? "sine" : "triangle"; o.frequency.value = f;
      const t = actx.currentTime + i * 0.09;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + 0.18);
    });
  } catch (e) {}
}
function haptic() { if (navigator.vibrate) navigator.vibrate(30); }

// ---------- UI-Grundlagen ----------
const app = $("#app");
const tabbar = $("#tabbar");
let tab = "home";
let view = null; // Unterseite: { type: "unit"|"grammar", id, from }

function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(() => (t.hidden = true), 2400);
}
function setTabbar(show) {
  tabbar.hidden = !show;
  document.body.classList.toggle("in-session", !show);
  tabbar.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
}
tabbar.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-tab]"); if (!b) return;
  tab = b.dataset.tab; view = null; render(); window.scrollTo(0, 0);
});
const speakBtn = (text, cls = "speak") => `<button class="${cls}" data-say="${esc(text)}" aria-label="Vorlesen">${ICON_SPEAK}</button>`;
document.addEventListener("click", (e) => {
  const s = e.target.closest("[data-say]");
  if (s) { e.stopPropagation(); speak(s.dataset.say, s.dataset.slow === "1"); }
}, true);

function render() {
  document.onkeydown = null;
  if (!S.onboarded) return renderWelcome();
  if (view && view.type === "unit") return renderUnit(view.id);
  if (view && view.type === "grammar") return renderGrammar(view.id);
  setTabbar(true);
  ({ home: renderHome, path: renderPath, words: renderWords, more: renderMore })[tab]();
}
function openUnit(uid) { view = { type: "unit", id: uid }; render(); window.scrollTo(0, 0); }
function openGrammar(gid, from) { view = { type: "grammar", id: gid, from }; render(); window.scrollTo(0, 0); }
function back() { view = view && view.from ? { type: "unit", id: view.from } : null; render(); window.scrollTo(0, 0); }

// ---------- Onboarding ----------
function renderWelcome() {
  setTabbar(false);
  app.innerHTML = `
  <div class="onb fadein">
    <div class="flag">${L().flag}</div>
    <h1>Willkommen bei Sprachwerk</h1>
    <p>Wir starten mit ${esc(L().name)}. Mach zuerst den kurzen Einstufungstest – dann weiß die App, wo du stehst, und du langweilst dich nicht mit Sachen, die du schon kannst.</p>
    <div class="card stack" style="margin:26px 0">
      <div>⏱️ <b>ca. 3–5 Minuten</b>, bis zu 20 Fragen</div>
      <div>🎯 Wortschatz und Grammatik, von leicht bis schwer</div>
      <div>🤷 Ehrlich „Weiß ich nicht“ drücken statt raten – dann wird das Ergebnis genauer</div>
    </div>
    <div class="stack">
      <button class="btn" id="go-test">Einstufungstest starten</button>
      <button class="btn ghost" id="go-zero">Ohne Test bei null anfangen</button>
    </div>
  </div>`;
  $("#go-test").onclick = startTest;
  $("#go-zero").onclick = () => { S.passed = -1; S.onboarded = true; save(); toast("Los geht's mit Stufe A1"); render(); };
}

// ---------- Einstufungstest ----------
let T = null;
function startTest() {
  const all = L().placement;
  T = { blocks: LEVELS.map((l) => shuffle(all.filter((q) => q.lvl === l))), b: 0, i: 0, score: LEVELS.map(() => 0), answered: 0 };
  renderTestQ();
}
function renderTestQ() {
  setTabbar(false);
  const q = T.blocks[T.b][T.i];
  const pct = Math.round((T.answered / (LEVELS.length * 5)) * 100);
  const opts = shuffle(q.o.map((o, i) => ({ o, i })));
  app.innerHTML = `
  <div class="fadein">
    <div class="s-top">
      <button class="s-close" id="t-x" aria-label="Abbrechen">×</button>
      <div class="s-progress"><i style="width:${Math.max(4, pct)}%"></i></div>
      <span class="chip lvl">${q.lvl}</span>
    </div>
    <div class="prompt-label">Einstufungstest · Frage ${T.answered + 1}</div>
    <div class="prompt"><div class="big">${esc(q.q)}</div></div>
    <div class="options">
      ${opts.map((x, k) => `<button class="opt" data-i="${x.i}"><span class="k">${k + 1}</span>${esc(x.o)}</button>`).join("")}
    </div>
    <button class="skip" id="t-skip">Weiß ich nicht</button>
  </div>`;
  $("#t-x").onclick = () => { if (confirm("Test abbrechen?")) { T = null; render(); } };
  const answer = (i) => {
    if (i === q.a) T.score[T.b]++;
    T.answered++; T.i++;
    if (T.i >= T.blocks[T.b].length) {
      if (T.score[T.b] < 3 || T.b === LEVELS.length - 1) return finishTest();
      T.b++; T.i = 0;
    }
    renderTestQ();
  };
  app.querySelectorAll(".opt").forEach((b) => (b.onclick = () => answer(+b.dataset.i)));
  $("#t-skip").onclick = () => answer(-1);
}
function finishTest() {
  let passed = -1;
  for (let b = 0; b < LEVELS.length; b++) { if (T.score[b] >= 3) passed = b; else break; }
  const correct = T.score.reduce((a, b) => a + b, 0);
  S.passed = passed;
  S.test = { date: today(), level: passed, correct, total: T.answered };
  const wasOnboarded = S.onboarded;
  S.onboarded = true;
  save();
  const shown = passed < 0 ? "A1" : LEVELS[passed];
  const startAt = LEVELS[Math.min(passed + 1, LEVELS.length - 1)];
  const text = passed < 0
    ? "Du fängst ganz vorne an – perfekt, so baust du ein sauberes Fundament auf. Die Grundlagen kommen schnell zurück."
    : passed >= LEVELS.length - 1
      ? "Stark! Du hast alle Stufen geschafft. Alle Einheiten sind offen – die App fragt Bekanntes im Schnelldurchlauf ab."
      : `Die Stufen bis ${shown} sitzen. Diese Einheiten sind offen und werden nur kurz abgefragt (Schnellcheck). Dein Lernpfad startet bei ${startAt}.`;
  setTabbar(false);
  app.innerHTML = `
  <div class="onb center fadein">
    <div class="muted" style="font-weight:700">Dein Stand ungefähr</div>
    <div class="lvl-result pop">${passed < 0 ? "Start" : shown}</div>
    <div class="scale">${LEVELS.map((l, i) => `<div class="${i <= passed ? "on" : ""}">${l}</div>`).join("")}</div>
    <p>${text}</p>
    <p class="small muted">${correct} von ${T.answered} richtig. A1 = Anfänger, A2 = Grundkenntnisse, B1 = Alltag klappt, B2 = selbstständig.</p>
    <button class="btn" id="t-done" style="margin-top:22px">${wasOnboarded ? "Fertig" : "Zum Lernpfad"}</button>
  </div>`;
  T = null;
  $("#t-done").onclick = () => { tab = "home"; view = null; render(); };
}

// ---------- Home ----------
function renderHome() {
  const plan = todayPlan();
  const xp = xpToday(), goal = S.settings.goal;
  const pct = Math.min(1, xp / goal);
  const C = 2 * Math.PI * 27;
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const v = S.days[dayKey(d)] || 0;
    days.push({ l: d.toLocaleDateString("de-DE", { weekday: "short" }).slice(0, 2), cls: v >= goal ? "on" : v > 0 ? "part" : "", today: i === 0 });
  }
  const total = plan.due.length + plan.fresh.length + plan.quick.length + plan.gram.length;
  const ci = currentUnitIndex();
  const cu = UNITS[ci];
  const cp = unitProgress(ci);
  const cg = GMAP[cu.grammar];
  const hour = new Date().getHours();
  const greet = hour < 11 ? "Guten Morgen" : hour < 18 ? "Hallo" : "Guten Abend";
  const stk = streak();
  const ready = testReady(ci);

  const stepGrammar = cp.grammarDone
    ? `<div class="step done"><i>✓</i><div><b>Grammatik</b><span>${esc(cg.title)}</span></div><button class="link small" data-gram="${cg.id}">Ansehen</button></div>`
    : `<div class="step now"><i>1</i><div><b>Grammatik lernen</b><span>${esc(cg.title)}</span></div><button class="btn small" data-gram="${cg.id}" style="width:auto">Los</button></div>`;
  const stepWords = cp.seen >= cp.total
    ? `<div class="step done"><i>✓</i><div><b>Wörter</b><span>alle ${cp.total} gelernt</span></div></div>`
    : `<div class="step ${cp.grammarDone ? "now" : ""}"><i>2</i><div><b>Wörter</b><span>${cp.seen} von ${cp.total} – kommen in der Tageslektion</span></div></div>`;
  const stepTest = `<div class="step ${ready ? "now" : ""}"><i>3</i><div><b>Einheitentest</b><span>${ready ? "Bereit! 80 % zum Bestehen" : "nach Grammatik & Wörtern"}</span></div>${ready ? `<button class="btn small" id="unit-test" style="width:auto">Start</button>` : ""}</div>`;

  app.innerHTML = `
  <div class="fadein">
    <div class="top">
      <div class="brand"><div class="mark">S</div><h1>Sprachwerk</h1></div>
      <span class="chip">${L().flag} ${esc(L().name)} · ${cu.level}</span>
    </div>

    ${total ? `
    <div class="hero">
      <h2>${greet}!</h2>
      <p>Deine Tageslektion ist bereit.</p>
      <div class="counts">
        ${plan.due.length ? `<span>🔁 ${plural(plan.due.length, "Wiederholung", "Wiederholungen")}</span>` : ""}
        ${plan.gram.length ? `<span>📐 ${plan.gram.length}× Grammatik</span>` : ""}
        ${plan.fresh.length ? `<span>✨ ${plural(plan.fresh.length, "neues Wort", "neue Wörter")}</span>` : ""}
        ${plan.quick.length ? `<span>⚡ ${plan.quick.length} Schnellcheck</span>` : ""}
      </div>
      <button class="btn" id="start">Lektion starten</button>
    </div>` : `
    <div class="hero">
      <h2>Alles erledigt 🎉</h2>
      <p>${cp.grammarDone ? "Für heute ist nichts mehr fällig. Wer mag, übt freiwillig weiter." : "Die Wörter sind erledigt – mach mit der Grammatik der Einheit weiter."}</p>
      <button class="btn" id="extra" ${learnedCount() < 4 ? "disabled" : ""}>Freies Üben</button>
    </div>`}

    <div class="section-h"><h3>Dein Lernpfad</h3><button class="link small" id="all-units">Alle Einheiten</button></div>
    <div class="card unit-now">
      <button class="unit-head" data-unit="${cu.id}">
        <div class="em">${cu.emoji}</div>
        <div class="info"><div class="small muted">Einheit ${ci + 1} von ${UNITS.length} · <span class="tag">${cu.level}</span></div><h3>${esc(cu.title)}</h3></div>
        <span class="chev">›</span>
      </button>
      <div class="steps">${stepGrammar}${stepWords}${stepTest}</div>
    </div>

    <div class="stats">
      <div class="stat streak"><b>${stk}</b><span>${stk === 1 ? "Tag" : "Tage"} in Folge 🔥</span></div>
      <div class="stat"><b>${learnedCount()}</b><span>Wörter gelernt</span></div>
      <div class="stat"><b>${unitsDoneCount()}</b><span>Einheiten fertig</span></div>
    </div>

    <div class="section-h"><h3>Tagesziel</h3><span class="small muted">${xp} / ${goal} XP</span></div>
    <div class="card">
      <div class="goal">
        <svg class="ring" viewBox="0 0 64 64"><circle class="bg" cx="32" cy="32" r="27"/><circle class="fg" cx="32" cy="32" r="27" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/></svg>
        <div>
          <h3>${pct >= 1 ? "Ziel erreicht! 💪" : `Noch ${goal - xp} XP`}</h3>
          <div class="small muted">10 XP pro richtiger Antwort</div>
        </div>
      </div>
      <div class="week">${days.map((d) => `<div><i class="${d.cls} ${d.today ? "today" : ""}"></i>${d.l}</div>`).join("")}</div>
    </div>

    ${total && learnedCount() >= 4 ? `<div style="margin-top:12px"><button class="btn ghost" id="extra">Freies Üben (ohne Plan)</button></div>` : ""}
  </div>`;
  const s = $("#start"); if (s) s.onclick = () => startSession("plan");
  const x = $("#extra"); if (x) x.onclick = () => startSession("free");
  $("#all-units").onclick = () => { tab = "path"; render(); window.scrollTo(0, 0); };
  app.querySelectorAll("[data-gram]").forEach((b) => (b.onclick = () => openGrammar(b.dataset.gram)));
  app.querySelectorAll("[data-unit]").forEach((b) => (b.onclick = () => openUnit(b.dataset.unit)));
  const ut = $("#unit-test"); if (ut) ut.onclick = () => startSession("test", { unit: cu.id });
}

// ---------- Lernpfad ----------
function renderPath() {
  const ci = currentUnitIndex();
  let html = `<div class="fadein"><h1 class="page-title">Lernpfad</h1>
    <p class="sub">${unitsDoneCount()} von ${UNITS.length} Einheiten geschafft. Jede Einheit: Grammatik, Wörter, Test.</p>`;
  LEVELS.forEach((lv) => {
    const list = UNITS.map((u, i) => ({ u, i })).filter((x) => x.u.level === lv);
    if (!list.length) return;
    const doneN = list.filter((x) => unitDone(x.i)).length;
    html += `<div class="level-h"><span class="tag big">${lv}</span><b>${LEVEL_NAMES[lv]}</b><span class="small muted">${doneN}/${list.length}</span></div><div class="path">`;
    list.forEach(({ u, i }) => {
      const p = unitProgress(i);
      const open = unitUnlocked(i);
      const state = p.done ? "done" : i === ci ? "now" : !open ? "locked" : p.quick ? "quick" : "open";
      const icon = { done: "✓", now: u.emoji, locked: "🔒", quick: "⚡", open: u.emoji }[state];
      const pctW = p.total ? Math.round((p.seen / p.total) * 100) : 0;
      html += `<button class="node ${state}" data-unit="${u.id}">
        <span class="dot">${icon}</span>
        <span class="node-t"><b>${i + 1}. ${esc(u.title)}</b><small>${esc(GMAP[u.grammar].title)}</small>
          <span class="bar"><i style="width:${p.done ? 100 : pctW}%"></i></span></span>
      </button>`;
    });
    html += `</div>`;
  });
  html += `</div>`;
  app.innerHTML = html;
  app.querySelectorAll("[data-unit]").forEach((b) => (b.onclick = () => openUnit(b.dataset.unit)));
}

function renderUnit(uid) {
  setTabbar(false);
  const i = UNITS.findIndex((u) => u.id === uid);
  const u = UNITS[i];
  const p = unitProgress(i);
  const g = GMAP[u.grammar];
  const open = unitUnlocked(i);
  const rec = S.units[u.id];
  app.innerHTML = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button></div>
    <div class="unit-hero">
      <div class="em big">${u.emoji}</div>
      <div><div class="small muted">Einheit ${i + 1} · <span class="tag">${u.level}</span>${p.quick ? " · ⚡ Schnellcheck" : ""}</div><h1 class="page-title" style="margin:2px 0 0">${esc(u.title)}</h1></div>
    </div>
    ${!open ? `<div class="card note">🔒 Diese Einheit ist noch gesperrt. Schließ zuerst die vorige Einheit ab. Die Grammatik kannst du dir trotzdem schon ansehen.</div>` : ""}
    ${p.done ? `<div class="card note good">✓ Bestanden mit ${rec.score} % am ${new Date(rec.date).toLocaleDateString("de-DE")}</div>` : ""}

    <div class="section-h"><h3>📐 Grammatik</h3></div>
    <button class="card gcard" id="g-open">
      <div><b>${esc(g.title)}</b><span>${esc(g.sum)}</span></div>
      <span class="pill ${p.grammarDone ? "ok" : ""}">${p.grammarDone ? "✓ gelernt" : "Lernen"}</span>
    </button>

    <div class="section-h"><h3>📚 Wörter</h3><span class="small muted">${p.seen}/${p.total} gelernt</span></div>
    ${wordListHtml(p.ws)}

    <div class="section-h"><h3>🏁 Einheitentest</h3></div>
    <div class="card">
      <p style="margin:0 0 12px">10 Aufgaben aus Wörtern und Grammatik dieser Einheit. Ab 80 % ist die Einheit geschafft${p.quick ? "" : " und die nächste wird freigeschaltet"}.</p>
      ${testReady(i) && open ? `<button class="btn" id="u-test">${p.done ? "Test wiederholen" : "Test starten"}</button>`
        : `<button class="btn" disabled>Test starten</button><p class="small muted center" style="margin:8px 0 0">${!open ? "Einheit noch gesperrt" : !p.grammarDone ? "Erst die Grammatik lernen" : "Erst alle Wörter lernen (kommen in der Tageslektion)"}</p>`}
      ${!p.done && p.quick ? `<p class="small muted" style="margin:10px 0 0">Tipp: Diese Stufe kannst du laut Einstufungstest schon. Mit dem Test hakst du die Einheit direkt ab.</p>` : ""}
    </div>
  </div>`;
  $("#back").onclick = back;
  $("#g-open").onclick = () => openGrammar(g.id, u.id);
  const t = $("#u-test"); if (t) t.onclick = () => startSession("test", { unit: u.id });
}

function renderGrammar(gid) {
  setTabbar(false);
  const g = GMAP[gid];
  const gs = S.gram[gid];
  app.innerHTML = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button><span class="tag">${g.level}</span></div>
    <div class="small muted" style="font-weight:800;margin-top:6px;letter-spacing:.05em">📐 GRAMMATIK</div>
    <h1 class="page-title">${esc(g.title)}</h1>
    <p class="sub">${esc(g.sum)}</p>
    <div class="stack">
      ${g.rules.map(([h, t]) => `<div class="card rule"><h3>${esc(h)}</h3><p>${t}</p></div>`).join("")}
    </div>
    <div class="section-h"><h3>Beispiele</h3></div>
    <div class="stack">
      ${g.ex.map(([en, de]) => `<div class="example card"><div class="t"><b>${esc(en)}</b><span>${esc(de)}</span></div>${speakBtn(en)}</div>`).join("")}
    </div>
    <div style="margin-top:22px" class="stack">
      <button class="btn" id="g-go">${gs && gs.done ? "Nochmal üben" : "Übungen starten"} (${g.drills.length})</button>
      <p class="small muted center">${gs && gs.done ? `Beste Runde: ${gs.best || 0} % · die Regel kommt regelmäßig in der Tageslektion` : "Danach kommt die Regel automatisch in deine Wiederholungen."}</p>
    </div>
  </div>`;
  $("#back").onclick = back;
  $("#g-go").onclick = () => startSession("grammar", { gid });
}

// ---------- Aufgaben ----------
function buildSource(w) {
  const n = w.en.split(" ").length;
  if (n >= 3 && n <= 9) return { en: w.en, de: w.de };
  if (w.ex) { const m = w.ex.split(" ").length; if (m >= 3 && m <= 9) return { en: w.ex, de: w.exde }; }
  return null;
}
function exerciseFor(w) {
  const s = st(w.id) || { b: 1 };
  const isPhrase = w.en.split(" ").length >= 3;
  const canBuild = !!buildSource(w);
  if (s.b >= 2 && speakingAllowed() && Math.random() < 0.18) return "speak";
  if (s.b <= 1) return pick(["mc_en", "listen"]);
  if (s.b === 2) return pick(["mc_de", "listen", "mc_en"]);
  if (isPhrase) return canBuild ? pick(["build", "mc_de"]) : "mc_de";
  const pool = ["type", "type", "mc_de"];
  if (canBuild) pool.push("build");
  return pick(pool);
}
function grammarTasks(g, n, extra = {}) {
  return shuffle(g.drills.map((d, k) => k)).slice(0, n).map((k) => {
    const d = g.drills[k];
    let t = d[0] === "c" ? "gap" : d[0] === "r" ? "right" : "gbuild";
    if (t === "gbuild" && speakingAllowed() && Math.random() < 0.3) t = "gspeak";
    return { gid: g.id, k, t, ...extra };
  });
}

let Q = null;
function startSession(mode, opt = {}) {
  let tasks = [];
  if (mode === "plan") {
    const plan = todayPlan();
    const A = [], B = [];
    plan.fresh.forEach((w) => { A.push({ id: w.id, t: "intro" }, { id: w.id, t: "mc_en", g: true }); B.push({ id: w.id, t: pick(["mc_de", "listen"]) }); });
    plan.quick.forEach((w) => B.push({ id: w.id, t: pick(["mc_de", "mc_en"]), g: true, quick: true }));
    plan.due.forEach((w) => B.push({ id: w.id, t: exerciseFor(w), g: true }));
    plan.gram.forEach((g) => grammarTasks(g, 2).forEach((t, k) => B.push({ ...t, gg: k === 0, review: true })));
    const mixed = shuffle(B);
    for (let i = 0; i < A.length; i += 4) { tasks.push(...A.slice(i, i + 4)); tasks.push(...mixed.splice(0, 3)); }
    tasks.push(...mixed);
  } else if (mode === "free") {
    tasks = shuffle(WORDS.filter((w) => st(w.id))).slice(0, 10).map((w) => ({ id: w.id, t: exerciseFor(w), free: true }));
    shuffle(Object.keys(S.gram).filter((id) => S.gram[id].done && GMAP[id])).slice(0, 2)
      .forEach((id) => tasks.push(...grammarTasks(GMAP[id], 2, { free: true })));
    tasks = shuffle(tasks);
  } else if (mode === "grammar") {
    const g = GMAP[opt.gid];
    tasks = grammarTasks(g, g.drills.length, { lesson: true });
  } else if (mode === "test") {
    const u = unitById(opt.unit);
    const ws = shuffle(unitWords(u.id)).slice(0, 6);
    ws.forEach((w) => tasks.push({ id: w.id, t: pick(w.en.split(" ").length >= 3 ? ["mc_de", "build"] : ["mc_de", "type", "listen"]), exam: true }));
    tasks.push(...grammarTasks(GMAP[u.grammar], 10 - ws.length, { exam: true }).map((t) => (t.t === "gspeak" ? { ...t, t: "gbuild" } : t)));
    tasks = shuffle(tasks);
  }
  if (!tasks.length) { toast("Gerade nichts zu üben"); return; }
  Q = { mode, opt, tasks, pos: 0, xp: 0, right: 0, graded: 0, firstWrong: 0, wrongIds: new Set(), gradedIds: new Set(), requeued: new Set(), start: Date.now(),
        newIds: new Set(tasks.filter((t) => t.t === "intro").map((t) => t.id)) };
  renderTask();
}

function sessionTop() {
  const pct = Math.round((Q.pos / Q.tasks.length) * 100);
  const right = Q.mode === "test" ? `🏁 ${Math.min(Q.pos + 1, Q.tasks.length)}/${Q.tasks.length}` : `⚡${Q.xp}`;
  return `<div class="s-top">
    <button class="s-close" id="s-x" aria-label="Beenden">×</button>
    <div class="s-progress"><i style="width:${Math.max(3, pct)}%"></i></div>
    <span class="s-xp">${right}</span>
  </div>`;
}
function bindClose() {
  $("#s-x").onclick = () => {
    if (Q.pos === 0 || confirm(Q.mode === "test" ? "Test abbrechen? Er zählt dann nicht." : "Beenden? Dein Fortschritt bis hier bleibt gespeichert.")) {
      stopRec(); save(); Q = null; render();
    }
  };
}

function distractors(w, field, n = 3) {
  const same = shuffle(WORDS.filter((x) => x.unit === w.unit && x.id !== w.id));
  const near = shuffle(WORDS.filter((x) => x.unit !== w.unit && Math.abs(x.ui - w.ui) <= 3));
  const other = shuffle(WORDS.filter((x) => x.unit !== w.unit));
  const seen = new Set([w[field].toLowerCase()]);
  const isPhrase = w.en.split(" ").length >= 3;
  const isVerb = w.en.startsWith("to ");
  const out = [];
  for (const strict of [true, false]) {
    for (const pool of [same, near, other]) for (const x of pool) {
      if (out.length >= n) break;
      if (strict && ((x.en.split(" ").length >= 3) !== isPhrase || x.en.startsWith("to ") !== isVerb)) continue;
      const v = x[field]; if (seen.has(v.toLowerCase())) continue;
      seen.add(v.toLowerCase()); out.push(v);
    }
  }
  return out;
}

function renderTask() {
  setTabbar(false);
  window.scrollTo(0, 0);
  stopRec();
  if (Q.pos >= Q.tasks.length) return renderResult();
  const task = Q.tasks[Q.pos];
  if (task.gid) {
    const g = GMAP[task.gid];
    if (!g) { Q.pos++; return renderTask(); }
    if (task.t === "gspeak" && !speakingAllowed()) task.t = "gbuild";
    return ({ gap: tGap, right: tRight, gbuild: tGBuild, gspeak: tGSpeak })[task.t](task, g, g.drills[task.k]);
  }
  const w = WMAP[task.id];
  if (!w) { Q.pos++; return renderTask(); }
  if (task.t === "speak" && !speakingAllowed()) task.t = "mc_de";
  ({ intro: tIntro, mc_en: tMc, mc_de: tMc, listen: tMc, type: tType, build: tBuild, speak: tSpeak })[task.t](task, w);
}

const footCheck = `<div class="s-foot" id="foot"><div class="inner"><button class="btn" id="check" disabled>Prüfen</button></div></div>`;

function tIntro(task, w) {
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <span class="new-badge">NEUES WORT</span>
    <div class="card intro-card pop">
      <div class="en">${esc(w.en)}</div>
      <div class="de">${esc(w.de)}</div>
      ${speakBtn(w.en)}
      ${w.ex ? `<div class="example"><div class="t"><b>${esc(w.ex)}</b><span>${esc(w.exde)}</span></div>${speakBtn(w.ex)}</div>` : ""}
    </div>
    <button class="skip" id="rep">⚑ Fehler melden</button>
  </div>
  <div class="s-foot"><div class="inner"><button class="btn" id="next">Verstanden</button></div></div>`;
  bindClose();
  if (S.settings.autoplay) setTimeout(() => speak(w.en), 250);
  const s = S.words[w.id] || (S.words[w.id] = { b: 0, due: today(), seen: 0, wrong: 0 });
  if (!s.learned) s.learned = today();
  save();
  $("#rep").onclick = () => report(task, w);
  $("#next").onclick = () => { Q.pos++; renderTask(); };
  keyNav();
}

function optionsHtml(opts) {
  return `<div class="options">${opts.map((o, k) => `<button class="opt" data-v="${esc(o)}"><span class="k">${k + 1}</span>${esc(o)}</button>`).join("")}</div>`;
}
function bindOptions(right, onDone) {
  let sel = null;
  app.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
    app.querySelectorAll(".opt").forEach((x) => x.classList.remove("sel"));
    b.classList.add("sel"); sel = b.dataset.v; $("#check").disabled = false;
  }));
  $("#check").onclick = () => {
    const ok = sel === right;
    app.querySelectorAll(".opt").forEach((b) => {
      b.disabled = true;
      if (b.dataset.v === right) b.classList.add("right");
      else if (b.dataset.v === sel) b.classList.add("wrong");
    });
    onDone(ok);
  };
  keyNav();
}

function tMc(task, w) {
  const enToDe = task.t === "mc_en" || task.t === "listen";
  const field = enToDe ? "de" : "en";
  const right = w[field];
  const opts = shuffle([right, ...distractors(w, field)]);
  const listen = task.t === "listen";
  const head = listen
    ? `<div class="prompt-label">Hör zu – was bedeutet das?</div>
       <div class="listen-big">${speakBtn(w.en)}<button class="speak slow" data-say="${esc(w.en)}" data-slow="1" aria-label="Langsam">🐢</button></div>`
    : enToDe
      ? `<div class="prompt-label">Was bedeutet das?</div><div class="prompt">${speakBtn(w.en)}<div class="big">${esc(w.en)}</div></div>`
      : `<div class="prompt-label">Wie sagt man das auf ${esc(L().name)}?</div><div class="prompt"><div class="big">${esc(w.de)}</div></div>`;
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    ${task.quick ? `<span class="new-badge blue">⚡ SCHNELLCHECK</span>` : ""}
    ${head}${optionsHtml(opts)}
  </div>${footCheck}`;
  bindClose();
  if ((listen || enToDe) && S.settings.autoplay) setTimeout(() => speak(w.en), 250);
  bindOptions(right, (ok) => feedback(task, w, ok, ok ? null : `${w.en} = ${w.de}`));
}

function norm(s) {
  return String(s).toLowerCase().replace(/[’`´]/g, "'").replace(/[.,!?;:…"()–]/g, " ").replace(/\s+/g, " ").trim();
}
function expand(s) {
  return s.replace(/\bi'm\b/g, "i am").replace(/'re\b/g, " are").replace(/\b(he|she|it|that|what|there|where)'s\b/g, "$1 is")
    .replace(/\bcan't\b/g, "can not").replace(/\bwon't\b/g, "will not").replace(/n't\b/g, " not").replace(/'ll\b/g, " will")
    .replace(/'ve\b/g, " have").replace(/'d\b/g, " would").replace(/\bcannot\b/g, "can not").replace(/\s+/g, " ").trim();
}
function variants(en) {
  const base = norm(en);
  const out = new Set([base]);
  base.split(" / ").forEach((x) => out.add(x.trim()));
  [...out].forEach((x) => { if (x.startsWith("to ")) out.add(x.slice(3)); out.add(expand(x)); });
  return [...out];
}
function lev(a, b) {
  const m = a.length, n = b.length; const d = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
function checkTyped(input, en) {
  const a = expand(norm(input)).replace(/^(a|an|the) /, "");
  const vs = variants(en).flatMap((v) => [v, v.replace(/^(a|an|the) /, "")]);
  const aNoTo = a.replace(/^to /, "");
  if (vs.includes(a) || vs.includes(aNoTo)) return "ok";
  const best = Math.min(...vs.map((v) => lev(aNoTo, v.replace(/^to /, ""))));
  const len = en.length;
  if ((len >= 4 && best <= 1) || (len >= 9 && best <= 2)) return "typo";
  return "no";
}

function tType(task, w) {
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <div class="prompt-label">Schreib es auf ${esc(L().name)}</div>
    <div class="prompt"><div class="big">${esc(w.de)}</div></div>
    <input class="answer-input" id="ans" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Deine Antwort …" enterkeyhint="done">
    <button class="skip" id="dunno">Weiß ich nicht</button>
  </div>${footCheck}`;
  bindClose();
  const inp = $("#ans");
  setTimeout(() => inp.focus(), 50);
  inp.oninput = () => ($("#check").disabled = !inp.value.trim());
  const go = (val) => {
    inp.disabled = true; $("#dunno").remove();
    const r = val == null ? "no" : checkTyped(val, w.en);
    feedback(task, w, r !== "no", r === "typo" ? `Fast! Richtig geschrieben: ${w.en}` : r === "no" ? `Richtig: ${w.en}` : null, { typo: r === "typo" });
  };
  inp.onkeydown = (e) => { if (e.key === "Enter" && inp.value.trim()) { e.preventDefault(); go(inp.value); } };
  $("#check").onclick = () => go(inp.value);
  $("#dunno").onclick = () => go(null);
}

function buildUI(src, label, onDone) {
  const tokens = src.en.split(" ");
  let bank = shuffle(tokens.map((t, i) => ({ t, i })));
  if (bank.length > 1 && bank.every((b, k) => b.i === k)) bank = bank.reverse();
  const placed = [];
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <div class="prompt-label">${label}</div>
    <div class="prompt"><div class="big" style="font-size:24px">${esc(src.de)}</div></div>
    <div class="build-area" id="area"></div>
    <div class="bank" id="bank">${bank.map((b, k) => `<button class="tile" data-k="${k}">${esc(b.t)}</button>`).join("")}</div>
  </div>${footCheck}`;
  bindClose();
  const area = $("#area");
  const upd = () => {
    area.innerHTML = placed.map((k, p) => `<button class="tile" data-p="${p}">${esc(bank[k].t)}</button>`).join("");
    $("#bank").querySelectorAll(".tile").forEach((b) => b.classList.toggle("used", placed.includes(+b.dataset.k)));
    $("#check").disabled = placed.length !== tokens.length;
  };
  $("#bank").onclick = (e) => { const b = e.target.closest(".tile"); if (!b || b.classList.contains("used")) return; placed.push(+b.dataset.k); upd(); };
  area.onclick = (e) => { const b = e.target.closest(".tile"); if (!b) return; placed.splice(+b.dataset.p, 1); upd(); };
  $("#check").onclick = () => {
    const built = placed.map((k) => bank[k].t).join(" ");
    area.style.pointerEvents = "none"; $("#bank").style.pointerEvents = "none";
    onDone(norm(built) === norm(src.en));
  };
}
function tBuild(task, w) {
  const src = buildSource(w) || { en: w.en, de: w.de };
  buildUI(src, "Bilde den Satz", (ok) => feedback(task, w, ok, ok ? null : `Richtig: ${src.en}`, { say: src.en, hideEx: true }));
}

// ----- Grammatik-Aufgaben -----
function tGap(task, g, d) {
  const [, sent, right, wrongs, de] = d;
  const opts = shuffle([right, ...wrongs]);
  const html = esc(sent).replace("___", '<span class="gap">?</span>');
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <div class="prompt-label">📐 ${esc(g.title)} · Setze ein</div>
    <div class="gsent">${html}</div>
    <div class="gde">${esc(de)}</div>
    ${optionsHtml(opts)}
  </div>${footCheck}`;
  bindClose();
  const full = sent.replace("___", right).replace(/^„.*?“ → /, "");
  bindOptions(right, (ok) => {
    const gp = $(".gap"); gp.textContent = right; gp.classList.add(ok ? "ok" : "no");
    gFeedback(task, g, ok, full);
  });
}
function tRight(task, g, d) {
  const [, good, bad, de] = d;
  const opts = shuffle([good, bad]);
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <div class="prompt-label">📐 ${esc(g.title)} · Welcher Satz ist richtig?</div>
    <div class="gde" style="margin-bottom:18px">„${esc(de)}“</div>
    ${optionsHtml(opts)}
  </div>${footCheck}`;
  bindClose();
  bindOptions(good, (ok) => gFeedback(task, g, ok, good));
}
function tGBuild(task, g, d) {
  const [, en, de] = d;
  buildUI({ en, de }, `📐 ${esc(g.title)} · Bilde den Satz`, (ok) => gFeedback(task, g, ok, en));
}
function tGSpeak(task, g, d) {
  const [, en, de] = d;
  speakUI({ en, de, label: `${g.title} · Sprich den Satz` }, task, (ok, heard) => gFeedback(task, g, ok, en, heard));
}

// ----- Sprechen -----
let REC = null;
function stopRec() { try { if (REC) { REC.onresult = REC.onerror = REC.onend = null; REC.abort(); } } catch (e) {} REC = null; }
function tSpeak(task, w) {
  speakUI({ en: w.en, de: w.de, label: "Sprich nach" }, task, (ok, heard) => feedback(task, w, ok, ok ? null : `So heißt es: ${w.en}`, { soft: true, heard }));
}
function silentReplacement(task) { return task.gid ? { ...task, t: "gbuild" } : { ...task, t: "mc_de" }; }
function speakUI(item, task, onDone) {
  let tries = 0;
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <div class="prompt-label">🎙️ ${esc(item.label)}</div>
    <div class="prompt">${speakBtn(item.en)}<div class="big">${esc(item.en)}</div></div>
    <div class="gde">${esc(item.de)}</div>
    <div class="mic-wrap">
      <button class="mic" id="mic" aria-label="Sprechen">${ICON_MIC}</button>
      <div class="mic-hint" id="mic-hint">Tippen und laut vorlesen</div>
    </div>
  </div>
  <div class="s-foot" id="foot"><div class="inner">
    <button class="btn ghost" id="no-speak">🤫 Kann gerade nicht sprechen</button>
  </div></div>`;
  bindClose();
  if (S.settings.autoplay) setTimeout(() => speak(item.en), 250);
  $("#no-speak").onclick = () => {
    stopRec();
    S.speakSnooze = Date.now() + 60 * 60 * 1000; save();
    toast("Sprechübungen für 1 Stunde pausiert");
    Q.tasks[Q.pos] = silentReplacement(task);
    renderTask();
  };
  const mic = $("#mic"), hint = $("#mic-hint");
  mic.onclick = () => {
    if (REC) { stopRec(); mic.classList.remove("live"); hint.textContent = "Tippen und laut vorlesen"; return; }
    if (window.speechSynthesis) speechSynthesis.cancel();
    let rec;
    try { rec = new SR(); } catch (e) { hint.textContent = "Spracherkennung nicht verfügbar"; return; }
    REC = rec;
    rec.lang = voiceCode(); rec.interimResults = false; rec.maxAlternatives = 5; rec.continuous = false;
    mic.classList.add("live"); hint.textContent = "Ich höre zu …";
    let got = false;
    rec.onresult = (e) => {
      got = true;
      const alts = [...e.results[0]].map((a) => a.transcript);
      const ok = alts.some((a) => speechMatch(a, item.en));
      stopRec(); mic.classList.remove("live");
      tries++;
      if (ok) { mic.disabled = true; $("#no-speak").remove(); onDone(true, alts[0]); }
      else if (tries < 2) { hint.innerHTML = `Verstanden: „${esc(alts[0])}“ – nochmal versuchen`; }
      else { mic.disabled = true; $("#no-speak").remove(); onDone(false, alts[0]); }
    };
    rec.onerror = (e) => {
      stopRec(); mic.classList.remove("live");
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        S.settings.speak = false; save();
        hint.textContent = "Kein Mikrofon-Zugriff – Sprechübungen sind jetzt aus (änderbar unter Mehr).";
        setTimeout(() => { if (Q) { Q.tasks[Q.pos] = silentReplacement(task); renderTask(); } }, 2200);
      } else hint.textContent = e.error === "no-speech" ? "Nichts gehört – nochmal tippen" : "Hat nicht geklappt – nochmal tippen";
    };
    rec.onend = () => { if (!got && REC) { stopRec(); mic.classList.remove("live"); hint.textContent = "Nichts gehört – nochmal tippen"; } };
    try { rec.start(); } catch (e) { stopRec(); mic.classList.remove("live"); hint.textContent = "Hat nicht geklappt – nochmal tippen"; }
  };
}
function speechMatch(said, target) {
  const a = expand(norm(said)).replace(/^to /, ""), b = expand(norm(target)).replace(/^to /, "");
  if (a === b || a.includes(b)) return true;
  return lev(a, b) <= Math.max(1, Math.floor(b.length * 0.2));
}

function keyNav() {
  document.onkeydown = (e) => {
    if (!Q) { document.onkeydown = null; return; }
    if (e.target.tagName === "INPUT") return;
    const n = parseInt(e.key, 10);
    const opts = app.querySelectorAll(".opt:not([disabled])");
    if (n >= 1 && n <= opts.length) opts[n - 1].click();
    if (e.key === "Enter") { const nx = $("#next"); const c = $("#check"); if (nx) nx.click(); else if (c && !c.disabled) c.click(); }
  };
}

// ----- Rückmeldung & Bewertung -----
const PRAISE = ["Richtig!", "Super!", "Genau!", "Stark!", "Sehr gut!", "Perfekt!"];
function footFeedback(ok, title, bodyHtml) {
  const foot = $("#foot");
  foot.className = "s-foot " + (ok ? "good" : "bad");
  foot.innerHTML = `<div class="inner fadein">
    <div class="fb"><h3>${title}</h3>${bodyHtml}</div>
    <button class="btn ${ok ? "good" : "bad"}" id="next">Weiter</button>
    <button class="skip" id="rep">⚑ Fehler melden</button>
  </div>`;
  if (!ok) app.querySelector(".s-body")?.classList.add("shake");
  beep(ok); if (!ok) haptic();
  $("#next").onclick = () => { Q.pos++; renderTask(); };
  keyNav();
}
function feedback(task, w, ok, msg, o = {}) {
  gradeWord(task, w, ok, o.soft);
  let body = "";
  if (o.heard) body += `<p class="muted">Erkannt: „${esc(o.heard)}“</p>`;
  if (msg) body += `<p class="sol">${esc(msg)}</p>`;
  if (w.ex && !o.hideEx) body += `<p>${esc(w.ex)} <span class="muted">– ${esc(w.exde)}</span></p>`;
  const title = ok ? (o.typo ? "✓ Fast perfekt" : "✓ " + pick(PRAISE)) : o.soft ? "🙂 Fast – hör nochmal genau hin" : "✗ Nicht ganz";
  footFeedback(ok || !!o.soft, title, body);
  $("#rep").onclick = () => report(task, w);
  if (S.settings.autoplay && ["type", "build", "mc_de", "speak"].includes(task.t)) setTimeout(() => speak(o.say || w.en), 200);
}
function gFeedback(task, g, ok, full, heard) {
  const soft = task.t === "gspeak";
  gradeGrammar(task, g, ok, soft);
  let body = "";
  if (heard) body += `<p class="muted">Erkannt: „${esc(heard)}“</p>`;
  body += `<p class="sol">${ok ? "" : "Richtig: "}${esc(full)}</p>`;
  footFeedback(ok || soft, ok ? "✓ " + pick(PRAISE) : soft ? "🙂 Fast – hör nochmal genau hin" : "✗ Nicht ganz", body);
  $("#rep").onclick = () => report(task, null, g);
  if (S.settings.autoplay) setTimeout(() => speak(full), 200);
}

function award(ok, id, retry) {
  if (!retry) Q.graded++;
  if (!ok) { if (!retry) Q.firstWrong++; return; }
  if (!retry) Q.right++;
  const pts = Q.wrongIds.has(id) ? 5 : 10;
  Q.xp += pts; addXp(pts);
}
function setBox(id, b) {
  const s = S.words[id] || (S.words[id] = { b: 0, due: today(), seen: 0, wrong: 0 });
  s.b = b; s.due = addDays(INTERVALS[b]);
}
function gradeWord(task, w, ok, soft) {
  award(ok, w.id, task.retry);
  if (soft && !ok) { save(); return; } // Sprechen: keine Strafe
  if (!ok) {
    Q.wrongIds.add(w.id);
    if (!task.exam && !Q.requeued.has(w.id)) {
      Q.requeued.add(w.id);
      if (task.quick) Q.tasks.push({ id: w.id, t: "intro", retry: true });
      Q.tasks.push({ id: w.id, t: "mc_en", retry: true, free: task.free });
    }
  }
  const s = S.words[w.id] || (S.words[w.id] = { b: 0, due: today(), seen: 0, wrong: 0 });
  s.seen = (s.seen || 0) + 1;
  if (!ok) s.wrong = (s.wrong || 0) + 1;
  if (task.free) { if (!ok) setBox(w.id, 1); save(); return; }
  if (task.exam) {
    if (!s.learned) { s.learned = today(); s.quick = true; setBox(w.id, ok ? 4 : 1); }
    else if (!ok) setBox(w.id, 1);
    save(); return;
  }
  if (task.g && !Q.gradedIds.has(w.id)) {
    Q.gradedIds.add(w.id);
    if (task.quick) { if (!s.learned) s.learned = today(); s.quick = true; setBox(w.id, ok ? 4 : 1); }
    else if (Q.newIds.has(w.id)) setBox(w.id, 1);
    else setBox(w.id, ok ? Math.min(MAX_BOX, (s.b || 0) + 1) : 1);
  } else if (!ok && !Q.newIds.has(w.id)) setBox(w.id, 1);
  save();
}
function gradeGrammar(task, g, ok, soft) {
  const key = "g:" + g.id;
  award(ok, key, task.retry);
  if (soft && !ok) { save(); return; }
  if (!ok) {
    Q.wrongIds.add(key);
    if ((task.lesson || task.review) && !task.retry && !Q.requeued.has(key + ":" + task.k)) {
      Q.requeued.add(key + ":" + task.k);
      Q.tasks.push({ ...task, t: task.t === "gspeak" ? "gbuild" : task.t, retry: true, gg: false });
    }
  }
  const gs = S.gram[g.id] || (S.gram[g.id] = { done: false, b: 0, due: today(), seen: 0, wrong: 0, best: 0 });
  gs.seen++; if (!ok) gs.wrong++;
  if (task.lesson || task.free) { save(); return; }
  if (task.exam) { if (!ok && gs.done) { gs.b = 1; gs.due = addDays(1); } save(); return; }
  if (task.gg && !Q.gradedIds.has(key)) {
    Q.gradedIds.add(key);
    gs.b = ok ? Math.min(MAX_BOX, (gs.b || 0) + 1) : 1; gs.due = addDays(INTERVALS[gs.b]);
  } else if (!ok) { gs.b = 1; gs.due = addDays(1); }
  save();
}

// ----- Fehler melden -----
function report(task, w, g) {
  let text;
  if (g) {
    const d = g.drills[task.k];
    text = `Grammatik „${g.title}“: ${d.slice(1).map((x) => Array.isArray(x) ? x.join(" / ") : x).join(" | ")}`;
  } else text = `Wort: ${w.en} = ${w.de}${w.ex ? ` | ${w.ex} = ${w.exde}` : ""}`;
  S.reports = S.reports || [];
  if (!S.reports.some((r) => r.text === text)) S.reports.push({ date: today(), text });
  save();
  toast("Gemeldet – danke! Liste unter Mehr → Gemeldete Fehler");
}

// ----- Ergebnis -----
function renderResult() {
  document.onkeydown = null;
  const total = Q.graded;
  const acc = total ? Math.round((Q.right / total) * 100) : 100;
  const mins = Math.max(1, Math.round((Date.now() - Q.start) / 60000));
  let title = "Lektion geschafft!";
  let sub = xpToday() >= S.settings.goal ? "Tagesziel erreicht – stark." : "Jeder Tag zählt. Bis morgen!";
  let emoji = acc >= 90 ? "🏆" : acc >= 70 ? "💪" : "🌱";
  let btn = `<button class="btn" id="done" style="margin-top:20px">Weiter</button>`;

  if (Q.mode === "grammar") {
    const g = GMAP[Q.opt.gid];
    const gs = S.gram[g.id] || (S.gram[g.id] = { done: false, b: 0, due: today(), seen: 0, wrong: 0, best: 0 });
    const wasDone = gs.done;
    gs.done = true; gs.best = Math.max(gs.best || 0, acc);
    if (!wasDone) { gs.b = acc >= 80 ? 2 : 1; gs.due = addDays(INTERVALS[gs.b]); }
    title = wasDone ? "Gut geübt!" : "Grammatik gelernt!";
    sub = `„${g.title}“ – ${acc} % beim ersten Versuch. Die Regel kommt jetzt regelmäßig in deinen Wiederholungen.`;
  }
  if (Q.mode === "test") {
    const u = unitById(Q.opt.unit);
    const pass = acc >= TEST_PASS * 100;
    if (pass) {
      const prev = S.units[u.id];
      S.units[u.id] = { done: true, score: Math.max(acc, (prev && prev.score) || 0), date: Date.now() };
      const gs = S.gram[u.grammar] || (S.gram[u.grammar] = { done: false, b: 0, due: today(), seen: 0, wrong: 0, best: 0 });
      if (!gs.done) { gs.done = true; gs.b = 3; gs.due = addDays(INTERVALS[3]); gs.best = Math.max(gs.best || 0, acc); }
    }
    const i = UNITS.findIndex((x) => x.id === u.id);
    const next = UNITS[i + 1];
    title = pass ? "Einheit geschafft! 🎉" : "Noch nicht ganz";
    emoji = pass ? "🏅" : "🔁";
    sub = pass
      ? (next ? `„${u.title}“ ist erledigt. Weiter geht's mit „${next.title}“.` : "Du hast den ganzen Lernpfad geschafft!")
      : `Du brauchst 80 %, hattest ${acc} %. Schau dir die Grammatik nochmal an und versuch es erneut.`;
    if (!pass) btn = `<div class="stack" style="margin-top:20px"><button class="btn" id="retry">Test wiederholen</button><button class="btn ghost" id="done">Später</button></div>`;
  }
  const mode = Q.mode, opt = Q.opt, newN = Q.newIds.size, xpGot = Q.xp;
  Q = null; save();
  app.innerHTML = `<div class="result fadein">
    <div class="big-emoji pop">${emoji}</div>
    <h2>${title}</h2>
    <p class="muted">${esc(sub)}</p>
    <div class="result-grid">
      <div class="stat"><b style="color:var(--gold)">+${xpGot}</b><span>XP</span></div>
      <div class="stat"><b>${acc}%</b><span>richtig</span></div>
      <div class="stat"><b>${mins}</b><span>Min.</span></div>
    </div>
    ${newN ? `<p>✨ ${plural(newN, "neues Wort", "neue Wörter")} gelernt</p>` : ""}
    <p class="small muted">🔥 ${streak()} ${streak() === 1 ? "Tag" : "Tage"} in Folge</p>
    ${btn}
  </div>`;
  $("#done").onclick = () => { if (mode === "test" || mode === "grammar") view = null; tab = "home"; render(); window.scrollTo(0, 0); };
  const r = $("#retry"); if (r) r.onclick = () => startSession(mode, opt);
}

// ---------- Wörter ----------
function wordListHtml(list) {
  if (!list.length) return `<p class="muted center" style="padding:20px">Keine Wörter gefunden.</p>`;
  return `<ul class="wl">${list.map((w) => {
    const s = st(w.id); const b = s ? s.b : 0;
    return `<li>${speakBtn(w.en)}<div class="w"><b>${esc(w.en)}</b><span>${esc(w.de)}</span></div>
      <div class="dots" title="Lernstand">${[1, 2, 3, 4, 5].map((k) => `<i class="${s && b >= k ? "on" : ""}"></i>`).join("")}</div>
      ${w.unit === "custom" ? `<button class="small muted" data-del="${esc(w.id)}" aria-label="Löschen" style="padding:6px">✕</button>` : ""}</li>`;
  }).join("")}</ul>`;
}
let wq = "", wfilter = "all";
function renderWords() {
  app.innerHTML = `<div class="fadein">
    <div class="top" style="margin-bottom:6px"><h1 class="page-title">Wörter</h1><button class="btn small" id="add" style="width:auto">+ Eigenes</button></div>
    <p class="sub">${learnedCount()} von ${WORDS.length} gelernt · ${solidCount()} sitzen sicher</p>
    <input class="search" id="q" type="search" placeholder="Suchen (Deutsch oder ${esc(L().name)})" value="${esc(wq)}">
    <div class="seg" style="margin-top:12px">
      ${[["all", "Alle"], ["learned", "Gelernt"], ["hard", "Schwierig"], ["new", "Neu"]].map(([k, l]) => `<button data-f="${k}" class="${wfilter === k ? "on" : ""}">${l}</button>`).join("")}
    </div>
    <div id="list"></div>
  </div>`;
  const draw = () => {
    const q = norm(wq);
    let list = WORDS.filter((w) => !q || norm(w.en).includes(q) || norm(w.de).includes(q));
    if (wfilter === "learned") list = list.filter((w) => st(w.id));
    if (wfilter === "new") list = list.filter((w) => !st(w.id));
    if (wfilter === "hard") list = list.filter((w) => st(w.id) && (st(w.id).wrong || 0) >= 2).sort((a, b) => st(b.id).wrong - st(a.id).wrong);
    $("#list").innerHTML = wordListHtml(list.slice(0, 400));
  };
  draw();
  $("#q").oninput = (e) => { wq = e.target.value; draw(); };
  app.querySelectorAll("[data-f]").forEach((b) => (b.onclick = () => { wfilter = b.dataset.f; renderWords(); }));
  $("#add").onclick = addWordSheet;
  $("#list").onclick = (e) => {
    const d = e.target.closest("[data-del]"); if (!d) return;
    if (!confirm("Dieses eigene Wort löschen?")) return;
    S.custom = S.custom.filter((c) => c.id !== d.dataset.del.slice(7)); delete S.words[d.dataset.del];
    save(); buildContent(); draw();
  };
}
function addWordSheet() {
  sheet(`<h2>Eigenes Wort</h2>
    <label class="field"><span>${esc(L().name)}</span><input id="n-en" placeholder="z. B. forklift" autocapitalize="off"></label>
    <label class="field"><span>Deutsch</span><input id="n-de" placeholder="z. B. der Gabelstapler"></label>
    <label class="field"><span>Beispielsatz (optional)</span><input id="n-ex" placeholder="z. B. He drives the forklift." autocapitalize="sentences"></label>
    <label class="field"><span>Beispiel auf Deutsch (optional)</span><input id="n-exde"></label>
    <button class="btn" id="n-save">Speichern</button>`);
  $("#n-save").onclick = () => {
    const en = $("#n-en").value.trim(), de = $("#n-de").value.trim();
    if (!en || !de) return toast("Bitte beide Felder ausfüllen");
    S.custom.push({ id: Date.now().toString(36), en, de, ex: $("#n-ex").value.trim(), exde: $("#n-exde").value.trim() });
    save(); buildContent(); closeSheet(); toast("Gespeichert – kommt in der nächsten Lektion dran"); render();
  };
}

// ---------- Mehr ----------
function renderMore() {
  const s = S.settings;
  const seg = (key, opts) => `<div class="seg">${opts.map(([v, l]) => `<button data-set="${key}" data-v="${v}" class="${String(s[key]) === String(v) ? "on" : ""}">${l}</button>`).join("")}</div>`;
  const step = (key, min, max, d) => `<div class="stepper"><button data-step="${key}" data-d="${-d}" data-min="${min}" data-max="${max}">−</button><b>${s[key]}</b><button data-step="${key}" data-d="${d}" data-min="${min}" data-max="${max}">+</button></div>`;
  const snoozed = Date.now() < (S.speakSnooze || 0);
  const nRep = (S.reports || []).length;
  app.innerHTML = `<div class="fadein">
    <h1 class="page-title">Mehr</h1>
    <p class="sub">Einstellungen, Test und Datensicherung</p>

    <div class="section-h"><h3>Lernen</h3></div>
    <ul class="set">
      <li><span>Neue Wörter pro Tag</span>${step("newPerDay", 3, 20, 1)}</li>
      <li><span>Tagesziel (XP)</span>${step("goal", 20, 200, 10)}</li>
      <li class="tap" id="retest"><span>Einstufungstest wiederholen<small>Aktuell: ${S.passed < 0 ? "Start bei A1" : "bis " + LEVELS[S.passed] + " sicher"}</small></span></li>
    </ul>

    <div class="section-h"><h3>Aussprache & Sprechen</h3></div>
    <ul class="set">
      <li><span>Akzent</span>${seg("accent", [["us", "🇺🇸 US"], ["uk", "🇬🇧 UK"]])}</li>
      <li><span>Sprechtempo</span>${seg("rate", [["0.75", "Langsam"], ["0.9", "Normal"], ["1", "Schnell"]])}</li>
      <li><span>Automatisch vorlesen</span>${seg("autoplay", [["true", "An"], ["false", "Aus"]])}</li>
      <li><span>Sprechübungen<small>${!SR ? "In diesem Browser nicht verfügbar" : snoozed ? "Gerade für 1 Stunde pausiert" : "Wörter und Sätze ins Mikrofon sprechen"}</small></span>${SR ? seg("speak", [["true", "An"], ["false", "Aus"]]) : ""}</li>
      ${snoozed ? `<li class="tap" id="unsnooze"><span>Pause jetzt beenden</span></li>` : ""}
      <li class="tap" id="voicetest"><span>Stimme testen</span></li>
    </ul>

    <div class="section-h"><h3>Allgemein</h3></div>
    <ul class="set">
      <li><span>Töne</span>${seg("sound", [["true", "An"], ["false", "Aus"]])}</li>
      <li class="tap" id="reports"><span>Gemeldete Fehler<small>${nRep ? `${nRep} gemeldet – zum Weitergeben an Claude` : "Noch nichts gemeldet"}</small></span></li>
      <li class="tap" id="export"><span>Sicherung erstellen<small>Datei mit deinem Lernstand, z. B. in „Dateien“ speichern</small></span></li>
      <li class="tap" id="import"><span>Sicherung laden</span></li>
      <li class="tap danger" id="reset"><span>Alles zurücksetzen</span></li>
    </ul>
    <input type="file" id="file" accept="application/json,.json" hidden>

    <p class="small muted center" style="margin-top:22px">Sprachwerk · ${UNITS.length} Einheiten · ${G().length} Grammatik-Lektionen · ${WORDS.length} Wörter<br>Alles bleibt auf diesem Gerät, kein Konto, keine Werbung.<br>Tipp: In Safari über „Teilen → Zum Home-Bildschirm“ als App speichern.</p>
  </div>`;
  app.querySelectorAll("[data-set]").forEach((b) => (b.onclick = () => {
    const k = b.dataset.set; let v = b.dataset.v;
    if (v === "true" || v === "false") v = v === "true"; else if (!isNaN(+v) && k !== "accent") v = +v;
    S.settings[k] = v; if (k === "speak" && v) S.speakSnooze = 0; save(); renderMore();
    if (k === "accent" || k === "rate") speak("Hello! This is how I sound.");
  }));
  app.querySelectorAll("[data-step]").forEach((b) => (b.onclick = () => {
    const k = b.dataset.step; S.settings[k] = Math.max(+b.dataset.min, Math.min(+b.dataset.max, S.settings[k] + +b.dataset.d)); save(); renderMore();
  }));
  const un = $("#unsnooze"); if (un) un.onclick = () => { S.speakSnooze = 0; save(); renderMore(); };
  $("#voicetest").onclick = () => speak("Hello! Nice to meet you. Let's learn English together.");
  $("#retest").onclick = startTest;
  $("#reports").onclick = reportsSheet;
  $("#export").onclick = exportData;
  $("#import").onclick = () => $("#file").click();
  $("#file").onchange = importData;
  $("#reset").onclick = () => {
    if (!confirm("Wirklich alles löschen? Dein Lernstand ist dann weg.")) return;
    if (!confirm("Ganz sicher? Das kann nicht rückgängig gemacht werden.")) return;
    S = JSON.parse(JSON.stringify(DEFAULT)); save(); buildContent(); tab = "home"; view = null; render();
  };
}
function reportsSheet() {
  const r = S.reports || [];
  sheet(`<h2>Gemeldete Fehler</h2>
    ${r.length ? `<ul class="wl">${r.map((x) => `<li><div class="w"><b class="small">${esc(x.text)}</b><span>${new Date(x.date).toLocaleDateString("de-DE")}</span></div></li>`).join("")}</ul>
    <div class="stack" style="margin-top:14px"><button class="btn" id="r-share">Liste teilen / kopieren</button><button class="btn ghost" id="r-clear">Liste leeren</button></div>
    <p class="small muted">Schick die Liste an Claude, dann werden die Einträge korrigiert.</p>`
    : `<p class="muted">Noch nichts gemeldet. Bei jeder Übung gibt es unten „⚑ Fehler melden“.</p>`}`);
  const sh = $("#r-share"); if (sh) sh.onclick = async () => {
    const text = "Sprachwerk – gemeldete Fehler:\n" + r.map((x) => "• " + x.text).join("\n");
    try { if (navigator.share) { await navigator.share({ text }); return; } } catch (e) { if (e.name === "AbortError") return; }
    try { await navigator.clipboard.writeText(text); toast("Kopiert"); } catch (e) { toast("Kopieren nicht möglich"); }
  };
  const cl = $("#r-clear"); if (cl) cl.onclick = () => { if (confirm("Liste leeren?")) { S.reports = []; save(); closeSheet(); renderMore(); } };
}
async function exportData() {
  const blob = new Blob([JSON.stringify(S, null, 1)], { type: "application/json" });
  const name = `sprachwerk-sicherung-${today()}.json`;
  const file = new File([blob], name, { type: "application/json" });
  try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: name }); return; } }
  catch (e) { if (e.name === "AbortError") return; }
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function importData(e) {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const d = JSON.parse(r.result);
      if (!d || typeof d.words !== "object") throw new Error();
      if (!confirm("Sicherung laden? Der aktuelle Lernstand wird ersetzt.")) return;
      S = { ...JSON.parse(JSON.stringify(DEFAULT)), ...d, settings: { ...DEFAULT.settings, ...(d.settings || {}) } };
      buildContent(); migrate(); save(); toast("Sicherung geladen"); tab = "home"; view = null; render();
    } catch { toast("Datei konnte nicht gelesen werden"); }
  };
  r.readAsText(f);
}

// ---------- Sheet ----------
function sheet(html) {
  closeSheet();
  const bg = document.createElement("div");
  bg.className = "sheet-bg"; bg.id = "sheet";
  bg.innerHTML = `<div class="sheet"><div class="grab"></div>${html}</div>`;
  bg.onclick = (e) => { if (e.target === bg) closeSheet(); };
  document.body.appendChild(bg);
}
function closeSheet() { $("#sheet")?.remove(); }

// ---------- Start ----------
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
document.addEventListener("visibilitychange", () => { if (!document.hidden && !Q && !T && !$("#sheet")) render(); });
render();
window.__sw = { get S() { return S; }, WORDS: () => WORDS, todayPlan, currentUnitIndex };
})();
