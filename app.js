/* Sprachwerk – Sprachen lernen. Alles lokal, keine Server, kein Login. */
(() => {
"use strict";

const STORE_KEY = "sprachwerk-v1";
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const LEVEL_NAMES = { A1: "Einstieg", A2: "Grundlagen", B1: "Alltag sicher", B2: "Selbstständig", C1: "Kompetent", C2: "Meisterhaft" };
const INTERVALS = [0, 1, 2, 4, 8, 16, 35, 80]; // Tage je Fach
const MAX_BOX = INTERVALS.length - 1;
const MAX_REVIEWS = 20;
const MAX_QUICK = 8;
const MAX_GRAMMAR_REVIEWS = 3;
const TEST_PASS = 0.8;
const CORE = 30;
const LESSON_DRILLS = 12; // Übungen je Grammatik-Runde (zufällig aus allen) // Kernwörter je Einheit (reichen für den Einheitentest)

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
  dialogs: {},   // Einheit-ID -> { done, best }
  packs: {},     // Themenpaket-ID -> true (neue Wörter im Tagesplan)
  reading: {},   // Einheit-ID -> { done, best } (Lesetexte)
  sounds: {},    // Aussprache-Lektion -> { done, best }
  writing: {},   // Schreibaufgabe -> { draft, checks, done, score, date }
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
const DLG = () => (window.SW_DIALOGS || {})[S.lang] || {};
const dlgList = (uid) => { const x = DLG()[uid]; return !x ? [] : Array.isArray(x) ? x : [x]; };
const dlgGet = (did) => { const [u, n] = String(did).split(":"); return dlgList(u)[+n || 0]; };
const dlgDone = (did) => !!(S.dialogs[did] && S.dialogs[did].done);
const WR = () => (window.SW_WRITING || {})[S.lang] || [];
const SND = () => (window.SW_SOUNDS || {})[S.lang] || [];
const sndGet = (id) => SND().find((x) => x.id === id);
const MK = () => (window.SW_MISTAKES || {})[S.lang] || [];
const RD = () => (window.SW_READING || {})[S.lang] || {};
const rdCount = () => Object.keys(RD()).length;
const dlgCount = () => Object.keys(DLG()).reduce((a, u) => a + dlgList(u).length, 0);

// ---------- Inhalte ----------
let WORDS = [], WMAP = {}, UNITS = [], GMAP = {}, PACKS = [], PACKW = {};
function buildContent() {
  UNITS = L().units;
  GMAP = Object.fromEntries([...G(), ...MK().map((g) => ({ ...g, mk: true }))].map((g) => [g.id, g]));
  WORDS = [];
  UNITS.forEach((u, ui) => u.words.forEach((w, wi) => {
    WORDS.push({ id: u.id + ":" + w[0], unit: u.id, ui, core: wi < CORE, level: u.level, en: w[0], de: w[1], ex: w[2] || "", exde: w[3] || "" });
  }));
  S.custom.forEach((c) => WORDS.push({ id: "custom:" + c.id, unit: "custom", ui: -1, level: "A1", en: c.en, de: c.de, ex: c.ex || "", exde: c.exde || "" }));
  // Themenpakete: neue Wörter bekommen eigene IDs, Verweise ("englisch") nutzen das vorhandene Wort (gemeinsamer Lernstand)
  PACKS = (window.SW_PACKS || {})[S.lang] || [];
  const byEn = {};
  WORDS.forEach((w) => { const k = w.en.toLowerCase(); if (w.unit !== "custom" && !byEn[k]) byEn[k] = w.id; });
  PACKS.forEach((p, pi) => p.words.forEach((w) => {
    if (typeof w === "string") return;
    const id = "pack:" + p.id + ":" + w[0];
    WORDS.push({ id, unit: "pack:" + p.id, ui: 1000 + pi * 10, level: "B1", core: false, pack: p.id, en: w[0], de: w[1], ex: w[2] || "", exde: w[3] || "" });
    if (!byEn[w[0].toLowerCase()]) byEn[w[0].toLowerCase()] = id;
  }));
  PACKW = {};
  PACKS.forEach((p) => { PACKW[p.id] = [...new Set(p.words.map((w) => byEn[(typeof w === "string" ? w : w[0]).toLowerCase()]).filter(Boolean))]; });
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
  if (!S.dialogs) { S.dialogs = {}; changed = true; }
  for (const k of Object.keys(S.dialogs)) if (!k.includes(":")) { S.dialogs[k + ":0"] = S.dialogs[k]; delete S.dialogs[k]; changed = true; }
  if (!S.packs) { S.packs = {}; changed = true; }
  if (!S.reading) { S.reading = {}; changed = true; }
  if (!S.sounds) { S.sounds = {}; changed = true; }
  if (!S.writing) { S.writing = {}; changed = true; }
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
  const coreTotal = ws.filter((w) => w.core).length;
  const coreSeen = ws.filter((w) => w.core && st(w.id)).length;
  const g = S.gram[u.grammar];
  return { ws, seen, total: ws.length, coreSeen, coreTotal, grammarDone: !!(g && g.done), done: unitDone(i), quick: isQuickLevel(u.level) };
}
function testReady(i) {
  const p = unitProgress(i);
  return p.quick || p.done || (p.grammarDone && p.coreSeen >= p.coreTotal);
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
  return Object.values(S.words).filter((s) => s.learned === t && !s.quick && !s.pk).length; // Paket-Lektionen zählen nicht zum Tageslimit
}
function newCandidates() {
  const custom = WORDS.filter((w) => w.unit === "custom" && !st(w.id));
  const core = [], extra = [], quick = [];
  for (let i = 0; i < UNITS.length; i++) {
    if (!unitUnlocked(i)) continue;
    const ws = unitWords(UNITS[i].id).filter((w) => !st(w.id));
    if (isQuickLevel(UNITS[i].level)) { quick.push(...ws.filter((w) => w.core)); extra.push(...ws.filter((w) => !w.core)); }
    else { core.push(...ws.filter((w) => w.core)); extra.push(...ws.filter((w) => !w.core)); }
  }
  return { custom, core, extra, quick };
}
const packOn = (pid) => !!(S.packs && S.packs[pid]);
const packStats = (pid) => { const ids = PACKW[pid] || []; return { total: ids.length, seen: ids.filter((id) => st(id)).length, solid: ids.filter((id) => st(id) && st(id).b >= 4).length }; };
function packCandidates() {
  // abwechselnd aus allen eingeschalteten Paketen
  const lists = PACKS.filter((p) => packOn(p.id)).map((p) => PACKW[p.id].filter((id) => !st(id)));
  const out = [], seen = new Set();
  for (let k = 0; lists.some((l) => k < l.length); k++) lists.forEach((l) => { if (l[k] && !seen.has(l[k])) { seen.add(l[k]); out.push(WMAP[l[k]]); } });
  return out;
}
function todayPlan() {
  const due = dueWords().slice(0, MAX_REVIEWS);
  const gram = dueGrammar().slice(0, MAX_GRAMMAR_REVIEWS);
  const { custom, core, extra, quick } = newCandidates();
  const nNew = Math.max(0, S.settings.newPerDay - learnedToday());
  // ca. 70 % Kernwörter der aktuellen Einheit, Rest Zusatzwörter
  const nExtra = core.length ? Math.min(extra.length, Math.floor(nNew * 0.3)) : nNew;
  const fresh = custom.slice(0, nNew);
  fresh.push(...core.slice(0, Math.max(0, nNew - fresh.length - nExtra)));
  fresh.push(...extra.slice(0, Math.max(0, nNew - fresh.length)));
  if (fresh.length < nNew) fresh.push(...core.slice(fresh.filter((w) => w.core).length, fresh.filter((w) => w.core).length + nNew - fresh.length));
  // eingeschaltete Themenpakete: ca. 30 % der neuen Wörter (mind. 1)
  const pk = packCandidates().filter((w) => !fresh.includes(w));
  if (pk.length && nNew > 0) {
    const nPack = Math.min(pk.length, Math.max(1, Math.round(nNew * 0.3)));
    const keep = fresh.slice(0, Math.max(0, Math.min(fresh.length, nNew - nPack)));
    fresh.length = 0; fresh.push(...keep, ...pk.slice(0, nNew - keep.length));
  }
  return { due, gram, fresh, quick: quick.slice(0, MAX_QUICK) };
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
function twoVoices() {
  const code = voiceCode().toLowerCase();
  const pool = voices.filter((v) => v.lang.replace("_", "-").toLowerCase() === code);
  const all = pool.length ? pool : voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  const a = bestVoice(voiceCode());
  const male = ["Daniel", "Alex", "Fred", "Arthur", "Aaron", "Tom", "Google UK English Male", "Rishi"];
  const female = ["Samantha", "Karen", "Serena", "Moira", "Tessa", "Martha", "Google US English", "Google UK English Female"];
  const aMale = a && male.some((m) => a.name.includes(m));
  const want = aMale ? female : male;
  let b = all.find((v) => v !== a && want.some((m) => v.name.includes(m))) || all.find((v) => v !== a && v.localService) || null;
  return [a, b];
}
let SEQ = null;
function stopSeq() { if (SEQ) { SEQ.stop = true; SEQ = null; } if (window.speechSynthesis) speechSynthesis.cancel(); }
function speakLines(lines, people, onLine, onEnd, slow = false) {
  if (!window.speechSynthesis) return;
  stopSeq();
  const seq = SEQ = { stop: false };
  const [va, vb] = twoVoices();
  const next = (i) => {
    if (seq.stop) return;
    if (i >= lines.length) { SEQ = null; onLine && onLine(-1); onEnd && onEnd(); return; }
    const [who, en] = lines[i];
    const second = people.indexOf(who) === 1;
    const u = new SpeechSynthesisUtterance(en);
    u.lang = voiceCode();
    const v = second ? (vb || va) : va; if (v) u.voice = v;
    u.pitch = second && !vb ? 0.75 : 1;
    u.rate = slow ? 0.65 : S.settings.rate;
    u.onend = () => setTimeout(() => next(i + 1), 350);
    u.onerror = () => { if (!seq.stop) next(i + 1); };
    onLine && onLine(i);
    speechSynthesis.speak(u);
  };
  next(0);
}
function speak(text, slow = false) {
  SEQ && (SEQ.stop = true); SEQ = null;
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
  if (view && view.type === "dialog") return renderDialog(view.id);
  if (view && view.type === "glist") return renderGrammarList();
  if (view && view.type === "plist") return renderPackList();
  if (view && view.type === "mlist") return renderMistakeList();
  if (view && view.type === "slist") return renderSoundList();
  if (view && view.type === "wlist") return renderWriteList();
  if (view && view.type === "write") return renderWrite(view.id);
  if (view && view.type === "sound") return renderSound(view.id);
  if (view && view.type === "read") return renderReading(view.id);
  if (view && view.type === "pack") return renderPack(view.id);
  setTabbar(true);
  ({ home: renderHome, path: renderPath, words: renderWords, more: renderMore })[tab]();
}
function openUnit(uid) { view = { type: "unit", id: uid }; render(); window.scrollTo(0, 0); }
function openGrammar(gid, from) { view = { type: "grammar", id: gid, from }; render(); window.scrollTo(0, 0); }
function back() {
  stopSeq();
  view = view && view.type === "pack" ? { type: "plist" } : view && view.type === "sound" ? { type: "slist" } : view && view.type === "write" ? { type: "wlist" } : view && view.from === "mlist" ? { type: "mlist" } : view && view.from === "glist" ? { type: "glist" } : view && view.from ? { type: "unit", id: view.from } : null;
  render(); window.scrollTo(0, 0);
}
function openReading(uid, from) { view = { type: "read", id: uid, from }; render(); window.scrollTo(0, 0); }
function openDialog(did, from) { view = { type: "dialog", id: did, from }; render(); window.scrollTo(0, 0); }

// ---------- Onboarding ----------
function renderWelcome() {
  setTabbar(false);
  app.innerHTML = `
  <div class="onb fadein">
    <div class="flag">${L().flag}</div>
    <h1>Willkommen bei Sprachwerk</h1>
    <p>Wir starten mit ${esc(L().name)}. Mach zuerst den kurzen Einstufungstest – dann weiß die App, wo du stehst, und du langweilst dich nicht mit Sachen, die du schon kannst.</p>
    <div class="card stack" style="margin:26px 0">
      <div>⏱️ <b>ca. 4–7 Minuten</b>, bis zu 30 Fragen</div>
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
  // je Stufe 5 zufällige Fragen aus dem Pool → bei Wiederholung andere Fragen
  T = { blocks: LEVELS.map((l) => shuffle(all.filter((q) => q.lvl === l)).slice(0, 5)), b: 0, i: 0, score: LEVELS.map(() => 0), answered: 0 };
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
    <p class="small muted">${correct} von ${T.answered} richtig. A1 = Anfänger, A2 = Grundkenntnisse, B1 = Alltag klappt, B2 = selbstständig, C1 = kompetent, C2 = meisterhaft.</p>
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
  const stepWords = cp.coreSeen >= cp.coreTotal
    ? `<div class="step done"><i>✓</i><div><b>Kernwörter</b><span>alle ${cp.coreTotal} gelernt · ${cp.seen}/${cp.total} insgesamt</span></div></div>`
    : `<div class="step ${cp.grammarDone ? "now" : ""}"><i>2</i><div><b>Kernwörter</b><span>${cp.coreSeen} von ${cp.coreTotal} – kommen in der Tageslektion</span></div></div>`;
  const dls = dlgList(cu.id);
  const dDoneN = dls.filter((d, k) => dlgDone(cu.id + ":" + k)).length;
  const nextK = dls.findIndex((d, k) => !dlgDone(cu.id + ":" + k));
  const rdx = RD()[cu.id], rdDone = !!(S.reading[cu.id] && S.reading[cu.id].done);
  const stepRead = !rdx ? "" : rdDone
    ? `<div class="step done"><i>✓</i><div><b>Lesetext</b><span>„${esc(rdx.title)}“ · ${S.reading[cu.id].best} %</span></div><button class="link small" data-read="${cu.id}">Ansehen</button></div>`
    : `<div class="step ${cp.grammarDone ? "now" : ""}"><i>📖</i><div><b>Lesetext</b><span>„${esc(rdx.title)}“ · freiwillig</span></div><button class="btn small ghost" data-read="${cu.id}" style="width:auto">Lesen</button></div>`;
  const stepDialog = !dls.length ? "" : nextK < 0
    ? `<div class="step done"><i>✓</i><div><b>Dialoge</b><span>alle ${dls.length} gehört</span></div><button class="link small" data-unit="${cu.id}">Ansehen</button></div>`
    : `<div class="step ${cp.grammarDone ? "now" : ""}"><i>🎧</i><div><b>Dialoge hören</b><span>${dDoneN}/${dls.length} · „${esc(dls[nextK].title)}“ · freiwillig</span></div><button class="btn small ghost" data-dialog="${cu.id}:${nextK}" style="width:auto">Hören</button></div>`;
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
      <div class="steps">${stepGrammar}${stepWords}${stepRead}${stepDialog}${stepTest}</div>
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
  app.querySelectorAll("[data-dialog]").forEach((b) => (b.onclick = () => openDialog(b.dataset.dialog)));
  app.querySelectorAll("[data-read]").forEach((b) => (b.onclick = () => openReading(b.dataset.read)));
  const ut = $("#unit-test"); if (ut) ut.onclick = () => startSession("test", { unit: cu.id });
}

// ---------- Lernpfad ----------
function renderPath() {
  const ci = currentUnitIndex();
  let html = `<div class="fadein"><h1 class="page-title">Lernpfad</h1>
    <p class="sub">${unitsDoneCount()} von ${UNITS.length} Einheiten geschafft. Jede Einheit: Grammatik, Wörter, Test.</p>
    <button class="card gcard" id="glist" style="margin-bottom:6px">
      <div><b>📐 Alle Grammatik-Lektionen</b><span>${G().length} Lektionen · ${Object.values(S.gram).filter((g) => g.done).length} gelernt</span></div>
      <span class="chev">›</span>
    </button>
    ${MK().length ? `<button class="card gcard" id="mlist" style="margin-bottom:6px">
      <div><b>⚠️ Fehlertrainer „Typisch deutsch“</b><span>${MK().length} Lektionen · ${MK().filter((g) => S.gram[g.id] && S.gram[g.id].done).length} gelernt</span></div>
      <span class="chev">›</span>
    </button>` : ""}
    ${WR().length ? `<button class="card gcard" id="wlist" style="margin-bottom:6px">
      <div><b>✍️ Schreibwerkstatt</b><span>${WR().length} Aufgaben · ${WR().filter((x) => S.writing[x.id] && S.writing[x.id].done).length} geschrieben</span></div>
      <span class="chev">›</span>
    </button>` : ""}
    ${SND().length ? `<button class="card gcard" id="slist" style="margin-bottom:6px">
      <div><b>🗣️ Aussprache-Trainer</b><span>${SND().length} Lektionen · ${SND().filter((x) => S.sounds[x.id] && S.sounds[x.id].done).length} geübt</span></div>
      <span class="chev">›</span>
    </button>` : ""}
    ${PACKS.length ? `<button class="card gcard" id="plist" style="margin-bottom:6px">
      <div><b>🎒 Themenpakete</b><span>${PACKS.length} Pakete · ${PACKS.filter((p) => packOn(p.id)).length} eingeschaltet</span></div>
      <span class="chev">›</span>
    </button>` : ""}`;
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
      const pctW = p.coreTotal ? Math.round((p.coreSeen / p.coreTotal) * 100) : 0;
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
  $("#glist").onclick = () => { view = { type: "glist" }; render(); window.scrollTo(0, 0); };
  const wl = $("#wlist"); if (wl) wl.onclick = () => { view = { type: "wlist" }; render(); window.scrollTo(0, 0); };
  const sl = $("#slist"); if (sl) sl.onclick = () => { view = { type: "slist" }; render(); window.scrollTo(0, 0); };
  const ml = $("#mlist"); if (ml) ml.onclick = () => { view = { type: "mlist" }; render(); window.scrollTo(0, 0); };
  const pl = $("#plist"); if (pl) pl.onclick = () => { view = { type: "plist" }; render(); window.scrollTo(0, 0); };
}

// ---------- Schreibwerkstatt ----------
const wordCount = (t) => (t.trim().match(/[A-Za-z0-9'’-]+/g) || []).length;
function renderWriteList() {
  setTabbar(false);
  let html = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button></div>
    <h1 class="page-title">Schreibwerkstatt</h1>
    <p class="sub">Echte Alltagstexte selbst schreiben. Danach vergleichst du mit einer Musterlösung und hakst eine Checkliste ab.</p>`;
  LEVELS.forEach((lv) => {
    const list = WR().filter((x) => x.level === lv);
    if (!list.length) return;
    html += `<div class="level-h"><span class="tag big">${lv}</span><b>${LEVEL_NAMES[lv]}</b><span class="small muted">${list.filter((x) => S.writing[x.id] && S.writing[x.id].done).length}/${list.length}</span></div><div class="stack">`;
    list.forEach((x) => { const r = S.writing[x.id]; html += `<button class="card gcard" data-w="${x.id}">
      <div><b>${esc(x.title)}</b><span>${esc(x.kind)} · ${x.words[0]}–${x.words[1]} Wörter</span></div>
      <span class="pill ${r && r.done ? "ok" : ""}">${r && r.done ? "✓ " + r.score + " %" : r && r.draft ? "Entwurf" : "Schreiben"}</span></button>`; });
    html += `</div>`;
  });
  app.innerHTML = html + `<p class="small muted" style="margin-top:14px">Ohne KI-Korrektur: Die Checkliste erkennt manche Punkte automatisch (vorab abgehakt), den Rest prüfst du selbst anhand der Musterlösung.</p></div>`;
  $("#back").onclick = () => { view = null; tab = "path"; render(); };
  app.querySelectorAll("[data-w]").forEach((b) => (b.onclick = () => { view = { type: "write", id: b.dataset.w }; render(); window.scrollTo(0, 0); }));
}
let wReveal = {}, wDe = false;
function renderWrite(id) {
  setTabbar(false);
  const x = WR().find((y) => y.id === id);
  const r = S.writing[id] || (S.writing[id] = { draft: "", checks: null, done: false, score: 0 });
  const shown = wReveal[id] || r.done;
  const text = r.draft || "";
  const auto = x.check.map(([, re]) => { if (!re) return false; try { return new RegExp(re, "im").test(text); } catch (e) { return false; } });
  const checks = r.checks && r.checks.length === x.check.length ? r.checks : auto;
  app.innerHTML = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button><span class="tag">${x.level}</span></div>
    <div class="small muted" style="font-weight:800;margin-top:6px;letter-spacing:.05em">✍️ ${esc(x.kind.toUpperCase())}</div>
    <h1 class="page-title">${esc(x.title)}</h1>
    <div class="card note">${esc(x.task)}<br><span class="small muted">Umfang: ${x.words[0]}–${x.words[1]} Wörter</span></div>
    <div class="section-h"><h3>🧩 Bausteine</h3></div>
    <div class="stack">${x.hints.map(([en, de]) => `<div class="example card"><div class="t"><b>${esc(en)}</b><span>${esc(de)}</span></div>${speakBtn(en)}</div>`).join("")}</div>
    <div class="section-h"><h3>📝 Dein Text</h3><span class="small muted" id="w-count"></span></div>
    <textarea id="w-text" class="wtext" placeholder="Schreib hier auf Englisch …" autocapitalize="sentences" spellcheck="true">${esc(text)}</textarea>
    <div class="dlg-ctrl" style="margin-top:10px"><button class="btn ghost" id="w-say">🔊 Meinen Text vorlesen</button></div>
    ${!shown ? `<button class="btn" id="w-show" style="margin-top:16px">Fertig – mit Musterlösung vergleichen</button>
      <p class="small muted center">Tipp: Erst selbst schreiben, dann vergleichen. Dein Entwurf wird automatisch gespeichert.</p>` : `
    <div class="section-h"><h3>✅ Checkliste</h3><span class="small muted">${checks.filter(Boolean).length}/${x.check.length}</span></div>
    <ul class="set wcheck">${x.check.map(([t, re], i) => `<li class="tap" data-c="${i}"><span class="cb ${checks[i] ? "on" : ""}">${checks[i] ? "✓" : ""}</span><span>${esc(t)}${re && auto[i] ? `<small>automatisch erkannt</small>` : ""}</span></li>`).join("")}</ul>
    <div class="section-h"><h3>💡 Musterlösung</h3>${speakBtn(x.model)}</div>
    <div class="card model">${esc(wDe ? x.modelDe : x.model).replace(/\n/g, "<br>")}</div>
    <div class="seg" style="margin:10px 0 0"><button id="w-de" class="${wDe ? "on" : ""}">${wDe ? "Deutsch an" : "Deutsch zeigen"}</button></div>
    <p class="small muted" style="margin-top:10px">Vergleiche: Welche Bausteine hast du benutzt? Was würdest du übernehmen? Du kannst deinen Text oben weiter verbessern.</p>
    <button class="btn" id="w-done" style="margin-top:12px">${r.done ? "Aktualisieren" : "Abschließen"}</button>`}
  </div>`;
  const ta = $("#w-text"), cnt = $("#w-count");
  const upd = () => { const n = wordCount(ta.value); cnt.textContent = `${n} Wörter`; cnt.style.color = n >= x.words[0] && n <= x.words[1] ? "var(--good)" : ""; };
  upd();
  let tm = null;
  ta.oninput = () => { upd(); clearTimeout(tm); tm = setTimeout(() => { r.draft = ta.value; save(); }, 400); };
  ta.onblur = () => { r.draft = ta.value; save(); };
  $("#back").onclick = () => { r.draft = ta.value; save(); back(); };
  $("#w-say").onclick = () => { if (ta.value.trim()) speak(ta.value); else toast("Noch kein Text"); };
  const sh = $("#w-show");
  if (sh) sh.onclick = () => {
    r.draft = ta.value;
    if (wordCount(ta.value) < Math.ceil(x.words[0] / 2) && !confirm("Dein Text ist noch sehr kurz. Trotzdem die Musterlösung ansehen?")) return;
    r.checks = null; save(); wReveal[id] = true; renderWrite(id);
  };
  app.querySelectorAll("[data-c]").forEach((li) => (li.onclick = () => { r.draft = ta.value; const c = checks.slice(); c[+li.dataset.c] = !c[+li.dataset.c]; r.checks = c; save(); const y = window.scrollY; renderWrite(id); window.scrollTo(0, y); }));
  const de = $("#w-de"); if (de) de.onclick = () => { r.draft = ta.value; save(); wDe = !wDe; const y = window.scrollY; renderWrite(id); window.scrollTo(0, y); };
  const dn = $("#w-done");
  if (dn) dn.onclick = () => {
    r.draft = ta.value; r.checks = checks;
    const first = !r.done;
    r.score = Math.round((checks.filter(Boolean).length / x.check.length) * 100);
    r.done = true; r.date = today();
    if (first) addXp(20);
    save(); toast(first ? `Geschafft – ${r.score} % der Checkliste · +20 XP` : "Aktualisiert");
    view = { type: "wlist" }; render(); window.scrollTo(0, 0);
  };
}

// ---------- Aussprache-Trainer ----------
function renderSoundList() {
  setTabbar(false);
  app.innerHTML = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button></div>
    <h1 class="page-title">Aussprache</h1>
    <p class="sub">Die Laute, die Deutschen im Englischen am schwersten fallen. Erst hören und unterscheiden, dann nachsprechen.</p>
    <div class="stack">${SND().map((x) => { const r = S.sounds[x.id]; return `<button class="card gcard" data-snd="${x.id}">
      <div><b>${x.emoji} ${esc(x.title)}</b><span>${esc(x.sum)}</span></div>
      <span class="pill ${r && r.done ? "ok" : ""}">${r && r.done ? "✓ " + r.best + " %" : "Üben"}</span>
    </button>`; }).join("")}</div>
    <p class="small muted" style="margin-top:14px">Hinweis: Die Spracherkennung prüft nur, ob dein Wort verstanden wurde – nicht, wie schön es klingt. Hören und Unterscheiden ist deshalb der wichtigste Teil.</p>
  </div>`;
  $("#back").onclick = () => { view = null; tab = "path"; render(); };
  app.querySelectorAll("[data-snd]").forEach((b) => (b.onclick = () => { view = { type: "sound", id: b.dataset.snd }; render(); window.scrollTo(0, 0); }));
}
function renderSound(id) {
  setTabbar(false);
  const x = sndGet(id), r = S.sounds[id];
  app.innerHTML = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button></div>
    <div class="small muted" style="font-weight:800;margin-top:6px;letter-spacing:.05em">🗣️ AUSSPRACHE</div>
    <h1 class="page-title">${x.emoji} ${esc(x.title)}</h1>
    <p class="sub">${esc(x.sum)}</p>
    <div class="stack">${x.tip.map(([h, t]) => `<div class="card rule"><h3>${esc(h)}</h3><p>${t}</p></div>`).join("")}</div>
    ${x.pairs ? `<div class="section-h"><h3>Wortpaare zum Anhören</h3></div>
    <p class="small muted" style="margin:-4px 2px 8px">Tippe auf ein Wort und achte auf den Unterschied.</p>
    <div class="pairs">${x.pairs.map(([a, ad, b, bd]) => `<div class="pair card"><button data-say="${esc(a)}"><b>${esc(a)}</b><span>${esc(ad)}</span></button><i>↔</i><button data-say="${esc(b)}"><b>${esc(b)}</b><span>${esc(bd)}</span></button></div>`).join("")}</div>` : ""}
    ${x.stress ? `<div class="section-h"><h3>Beispiele</h3></div>
    <div class="pairs">${x.stress.slice(0, 6).map(([w, syl, k, de]) => `<button class="card stress-ex" data-say="${esc(w)}"><b>${syl.map((y, i) => (i === k ? `<u>${esc(y.toUpperCase())}</u>` : esc(y))).join("·")}</b><span>${esc(de)}</span></button>`).join("")}</div>` : ""}
    ${x.twister ? `<div class="section-h"><h3>Zungenbrecher</h3></div>
    <div class="example card"><div class="t"><b>${esc(x.twister[0])}</b><span>${esc(x.twister[1])}</span></div>${speakBtn(x.twister[0])}</div>` : ""}
    <div style="margin-top:22px" class="stack">
      <button class="btn" id="s-go">${r && r.done ? "Nochmal üben" : "Übungen starten"}</button>
      <p class="small muted center">${r && r.done ? `Beste Runde: ${r.best} %` : x.stress ? "Hören und die betonte Silbe erkennen" : "Hören, unterscheiden und nachsprechen"}</p>
    </div>
  </div>`;
  $("#back").onclick = back;
  $("#s-go").onclick = () => startSession("sound", { sid: id });
}
function soundTasks(x) {
  if (x.stress) return shuffle(x.stress.map((_, k) => ({ snd: x.id, k, t: "stress" }))).slice(0, 10);
  const listen = shuffle(x.pairs.map((_, k) => ({ snd: x.id, k, t: "pair", pick: Math.random() < 0.5 ? 0 : 1 }))).slice(0, 7);
  const say = speakingAllowed() ? shuffle(x.say).slice(0, 4).map((w) => ({ snd: x.id, t: "ssay", en: w[0], de: w[1] })) : [];
  const out = [];
  listen.forEach((t, i) => { out.push(t); if (i % 2 === 1 && say.length) out.push(say.shift()); });
  return out.concat(say);
}
function tPair(task) {
  const x = sndGet(task.snd);
  const [a, ad, b, bd] = x.pairs[task.k];
  const word = task.pick ? b : a;
  const right = word + " – " + (task.pick ? bd : ad);
  const opts = shuffle([a + " – " + ad, b + " – " + bd]);
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <div class="prompt-label">🗣️ ${esc(x.title)} · Welches Wort hörst du?</div>
    <div class="dlg-ctrl" style="margin:18px 0 22px"><button class="btn" id="play">🔊 Anhören</button><button class="btn ghost" id="slow" style="width:auto">🐢</button></div>
    ${optionsHtml(opts)}
  </div>${footCheck}`;
  bindClose();
  setTimeout(() => speak(word), 250);
  $("#play").onclick = () => speak(word);
  $("#slow").onclick = () => speak(word, true);
  bindOptions(right, (ok) => {
    award(ok, "snd:" + task.snd + task.k, false);
    footFeedback(ok, ok ? "✓ " + pick(PRAISE) : "✗ Das war das andere Wort",
      `<p class="sol">Gehört: ${esc(right)}</p><p class="muted">Tippe zum Vergleich: <button class="link" data-say="${esc(a)}">${esc(a)}</button> · <button class="link" data-say="${esc(b)}">${esc(b)}</button></p>`);
    $("#rep").onclick = () => { S.reports.push({ date: today(), text: `Aussprache ${task.snd}: ${a}/${b}` }); save(); toast("Gemeldet – danke!"); };
  });
}
function tStress(task) {
  const x = sndGet(task.snd);
  const [w, syl, k, de] = x.stress[task.k];
  const variant = (i) => syl.map((y, j) => (j === i ? y.toUpperCase() : y)).join("-");
  const right = variant(k);
  const opts = shuffle(syl.map((_, i) => variant(i))).slice(0, 4);
  if (!opts.includes(right)) opts[0] = right;
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <div class="prompt-label">🎯 Wortbetonung · Welche Silbe ist betont?</div>
    <div class="prompt">${speakBtn(w)}<div class="big">${esc(w)}</div></div>
    <div class="gde">${esc(de)}</div>
    ${optionsHtml(shuffle(opts))}
  </div>${footCheck}`;
  bindClose();
  setTimeout(() => speak(w), 250);
  bindOptions(right, (ok) => {
    award(ok, "snd:" + task.snd + task.k, false);
    footFeedback(ok, ok ? "✓ " + pick(PRAISE) : "✗ Nicht ganz", `<p class="sol">${esc(right)}</p>`);
    $("#rep").onclick = () => { S.reports.push({ date: today(), text: `Betonung: ${w}` }); save(); toast("Gemeldet – danke!"); };
    setTimeout(() => speak(w), 200);
  });
}
function tSSay(task) {
  speakUI({ en: task.en, de: task.de, label: "Sprich deutlich nach", strict: true }, task, (ok, heard) => {
    award(ok, "snd:" + task.en, false);
    footFeedback(ok, ok ? "✓ Gut verstanden!" : "✗ Nicht erkannt", `<p class="sol">${esc(task.en)}</p>${heard ? `<p class="muted">Erkannt: „${esc(heard)}“</p>` : ""}`);
    $("#rep").onclick = () => { S.reports.push({ date: today(), text: `Aussprache sprechen: ${task.en}` }); save(); toast("Gemeldet – danke!"); };
    if (!ok) addSelfOk(() => { Q.right++; Q.xp += 10; addXp(10); });
  });
}

// ---------- Fehlertrainer ----------
function renderMistakeList() {
  setTabbar(false);
  app.innerHTML = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button></div>
    <h1 class="page-title">Fehlertrainer</h1>
    <p class="sub">Falsche Freunde und Fehler, die Deutsche im Englischen besonders oft machen. Gelernte Lektionen kommen automatisch in deine Wiederholung.</p>
    <div class="stack">${MK().map((g) => { const gs = S.gram[g.id]; return `<button class="card gcard" data-mk="${g.id}">
      <div><b>${esc(g.title)}</b><span>${esc(g.sum)} · ${g.drills.length} Übungen</span></div>
      <span class="pill ${gs && gs.done ? "ok" : ""}">${gs && gs.done ? "✓ " + (gs.best || 0) + " %" : "Lernen"}</span>
    </button>`; }).join("")}</div>
  </div>`;
  $("#back").onclick = () => { view = null; tab = "path"; render(); };
  app.querySelectorAll("[data-mk]").forEach((b) => (b.onclick = () => openGrammar(b.dataset.mk, "mlist")));
}

// ---------- Themenpakete ----------
function renderPackList() {
  setTabbar(false);
  app.innerHTML = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button></div>
    <h1 class="page-title">Themenpakete</h1>
    <p class="sub">Extra-Wortschatz unabhängig vom Lernpfad. Eingeschaltete Pakete bringen jeden Tag ein paar neue Wörter in die Tageslektion.</p>
    <div class="stack">${PACKS.map((p) => { const s = packStats(p.id); return `<button class="card gcard" data-pack="${p.id}">
      <div><b>${p.emoji} ${esc(p.title)}</b><span>${esc(p.desc)} · ${s.seen}/${s.total} gelernt</span></div>
      <span class="pill ${packOn(p.id) ? "ok" : ""}">${packOn(p.id) ? "✓ An" : "Aus"}</span>
    </button>`; }).join("")}</div>
  </div>`;
  $("#back").onclick = back;
  app.querySelectorAll("[data-pack]").forEach((b) => (b.onclick = () => { view = { type: "pack", id: b.dataset.pack }; render(); window.scrollTo(0, 0); }));
}
function renderPack(pid) {
  setTabbar(false);
  const p = PACKS.find((x) => x.id === pid);
  const s = packStats(pid), on = packOn(pid);
  const ws = (PACKW[pid] || []).map((id) => WMAP[id]);
  const left = s.total - s.seen;
  app.innerHTML = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button></div>
    <div class="unit-hero">
      <div class="em big">${p.emoji}</div>
      <div><div class="small muted">Themenpaket · ${s.total} Wörter</div><h1 class="page-title" style="margin:2px 0 0">${esc(p.title)}</h1></div>
    </div>
    <p class="sub">${esc(p.desc)}</p>
    <div class="card">
      <div class="bar" style="margin-bottom:8px"><i style="width:${s.total ? Math.round((s.seen / s.total) * 100) : 0}%"></i></div>
      <p class="small muted" style="margin:0 0 12px">${s.seen} von ${s.total} gelernt · ${s.solid} sitzen sicher</p>
      <button class="btn" id="p-go">${left ? `Jetzt ${Math.min(7, left)} neue Wörter lernen` : "Wörter wiederholen"}</button>
    </div>
    <ul class="set" style="margin-top:14px">
      <li><span>Im Tagesplan<small>${on ? "Neue Wörter aus diesem Paket kommen in die Tageslektion" : "Nur lernen, wenn du hier auf den Knopf tippst"}</small></span>
        <div class="seg"><button id="p-on" class="${on ? "on" : ""}">An</button><button id="p-off" class="${on ? "" : "on"}">Aus</button></div></li>
    </ul>
    <p class="small muted" style="margin:8px 2px 0">Schon gelernte Wörter werden immer wiederholt, auch wenn das Paket aus ist.</p>
    <div class="section-h"><h3>📚 Wörter</h3><span class="small muted">${s.seen}/${s.total}</span></div>
    ${wordListHtml(ws)}
  </div>`;
  $("#back").onclick = back;
  $("#p-go").onclick = () => startSession("pack", { pid });
  $("#p-on").onclick = () => { S.packs[pid] = true; save(); toast("Paket ist jetzt im Tagesplan"); renderPack(pid); };
  $("#p-off").onclick = () => { delete S.packs[pid]; save(); renderPack(pid); };
}

function renderGrammarList() {
  setTabbar(false);
  const where = {};
  UNITS.forEach((u, i) => { where[u.grammar] = i + 1; (u.extra || []).forEach((g) => (where[g] = i + 1)); });
  let html = `<div class="fadein"><div class="subtop"><button class="back" id="back">‹ Zurück</button></div>
    <h1 class="page-title">Grammatik</h1><p class="sub">Alle Lektionen nach Stufe. Du kannst jede jederzeit lernen und üben.</p>`;
  LEVELS.forEach((lv) => {
    const list = G().filter((g) => g.level === lv);
    if (!list.length) return;
    html += `<div class="level-h"><span class="tag big">${lv}</span><b>${LEVEL_NAMES[lv]}</b><span class="small muted">${list.filter((g) => S.gram[g.id] && S.gram[g.id].done).length}/${list.length}</span></div><div class="stack">`;
    list.forEach((g) => {
      const gs = S.gram[g.id];
      html += `<button class="card gcard" data-g="${g.id}"><div><b>${esc(g.title)}</b><span>${esc(g.sum)}${where[g.id] ? ` · Einheit ${where[g.id]}` : ""}</span></div>
        <span class="pill ${gs && gs.done ? "ok" : ""}">${gs && gs.done ? "✓ " + (gs.best || 0) + " %" : "Lernen"}</span></button>`;
    });
    html += `</div>`;
  });
  app.innerHTML = html + `</div>`;
  $("#back").onclick = () => { view = null; tab = "path"; render(); };
  app.querySelectorAll("[data-g]").forEach((b) => (b.onclick = () => openGrammar(b.dataset.g, "glist")));
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
    ${(u.extra || []).filter((x) => GMAP[x]).map((x) => { const eg = GMAP[x], es = S.gram[x]; return `<button class="card gcard" data-xg="${x}" style="margin-top:10px">
      <div><b>➕ ${esc(eg.title)}</b><span>Zusatz · ${esc(eg.sum)}</span></div>
      <span class="pill ${es && es.done ? "ok" : ""}">${es && es.done ? "✓ gelernt" : "Lernen"}</span></button>`; }).join("")}

    ${RD()[u.id] ? `<div class="section-h"><h3>📖 Lesetext</h3></div>
    <button class="card gcard" id="rd-open">
      <div><b>${esc(RD()[u.id].title)}</b><span>${esc(RD()[u.id].kind)} · Lesen, Wörter antippen, Fragen</span></div>
      <span class="pill ${S.reading[u.id] && S.reading[u.id].done ? "ok" : ""}">${S.reading[u.id] && S.reading[u.id].done ? "✓ " + S.reading[u.id].best + " %" : "Lesen"}</span>
    </button>` : ""}

    ${dlgList(u.id).length ? `<div class="section-h"><h3>🎧 Dialoge</h3><span class="small muted">${dlgList(u.id).filter((d, k) => dlgDone(u.id + ":" + k)).length}/${dlgList(u.id).length}</span></div>
    <div class="stack">${dlgList(u.id).map((d, k) => { const did = u.id + ":" + k, r = S.dialogs[did]; return `<button class="card gcard" data-did="${did}">
      <div><b>${esc(d.title)}</b><span>${d.lines.length} Zeilen · Hören, mitlesen, Fragen</span></div>
      <span class="pill ${r && r.done ? "ok" : ""}">${r && r.done ? "✓ " + r.best + " %" : "Hören"}</span>
    </button>`; }).join("")}</div>` : ""}

    <div class="section-h"><h3>📚 Kernwörter</h3><span class="small muted">${p.coreSeen}/${p.coreTotal} gelernt</span></div>
    ${wordListHtml(p.ws.filter((w) => w.core))}
    ${p.total > p.coreTotal ? `<div class="section-h"><h3>➕ Zusatzwörter</h3><span class="small muted">${p.seen - p.coreSeen}/${p.total - p.coreTotal}</span></div>
    <p class="small muted" style="margin:-4px 2px 8px">Kommen nach und nach in der Tageslektion dazu – für den Test nicht nötig.</p>
    ${wordListHtml(p.ws.filter((w) => !w.core))}` : ""}

    <div class="section-h"><h3>🏁 Einheitentest</h3></div>
    <div class="card">
      <p style="margin:0 0 12px">10 Aufgaben aus Wörtern und Grammatik dieser Einheit. Ab 80 % ist die Einheit geschafft${p.quick ? "" : " und die nächste wird freigeschaltet"}.</p>
      ${testReady(i) && open ? `<button class="btn" id="u-test">${p.done ? "Test wiederholen" : "Test starten"}</button>`
        : `<button class="btn" disabled>Test starten</button><p class="small muted center" style="margin:8px 0 0">${!open ? "Einheit noch gesperrt" : !p.grammarDone ? "Erst die Grammatik lernen" : `Erst die ${p.coreTotal} Kernwörter lernen (${p.coreSeen} geschafft)`}</p>`}
      ${!p.done && p.quick ? `<p class="small muted" style="margin:10px 0 0">Tipp: Diese Stufe kannst du laut Einstufungstest schon. Mit dem Test hakst du die Einheit direkt ab.</p>` : ""}
    </div>
  </div>`;
  $("#back").onclick = back;
  $("#g-open").onclick = () => openGrammar(g.id, u.id);
  app.querySelectorAll("[data-xg]").forEach((b) => (b.onclick = () => openGrammar(b.dataset.xg, u.id)));
  app.querySelectorAll("[data-did]").forEach((b) => (b.onclick = () => openDialog(b.dataset.did, u.id)));
  const ro = $("#rd-open"); if (ro) ro.onclick = () => openReading(u.id, u.id);
  const t = $("#u-test"); if (t) t.onclick = () => startSession("test", { unit: u.id });
}

let dlgHide = false, dlgTrans = false;
function renderDialog(did) {
  setTabbar(false);
  if (!String(did).includes(":")) did = did + ":0";
  const uid = did.split(":")[0];
  const d = dlgGet(did);
  const u = unitById(uid);
  const rec = S.dialogs[did];
  app.innerHTML = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button><span class="tag">${u.level}</span></div>
    <div class="small muted" style="font-weight:800;margin-top:6px;letter-spacing:.05em">🎧 DIALOG · ${esc(u.title)}</div>
    <h1 class="page-title">${esc(d.title)}</h1>
    <p class="sub">Erst nur zuhören, dann mitlesen. Tippe auf eine Zeile, um sie nochmal zu hören.</p>
    <div class="dlg-ctrl">
      <button class="btn" id="play">▶ Abspielen</button>
      <button class="btn ghost" id="slow" style="width:auto">🐢</button>
    </div>
    <div class="seg" style="margin:12px 0 14px">
      <button id="t-hide" class="${dlgHide ? "on" : ""}">${dlgHide ? "🙈 Text verborgen" : "Text verbergen"}</button>
      <button id="t-trans" class="${dlgTrans ? "on" : ""}">Übersetzung</button>
    </div>
    <div class="chat ${dlgHide ? "hide" : ""}">
      ${d.lines.map(([who, en, de], i) => `<button class="bubble ${d.people.indexOf(who) === 1 ? "r" : ""}" data-line="${i}">
        <small>${esc(who)}</small><b>${esc(en)}</b>${dlgTrans ? `<span>${esc(de)}</span>` : ""}</button>`).join("")}
    </div>
    <div class="stack" style="margin-top:20px">
      <button class="btn" id="d-go">Fragen beantworten (${d.questions.length + 3})</button>
      <p class="small muted center">${rec && rec.done ? `Bestes Ergebnis: ${rec.best} %` : "Verständnisfragen, Diktat und ein Satz zum Übersetzen"}</p>
    </div>
  </div>`;
  const mark = (i) => app.querySelectorAll(".bubble").forEach((b) => b.classList.toggle("live", +b.dataset.line === i));
  const play = (slow) => speakLines(d.lines, d.people, mark, null, slow);
  $("#back").onclick = back;
  $("#play").onclick = () => play(false);
  $("#slow").onclick = () => play(true);
  $("#t-hide").onclick = () => { dlgHide = !dlgHide; stopSeq(); renderDialog(did); };
  $("#t-trans").onclick = () => { dlgTrans = !dlgTrans; stopSeq(); renderDialog(did); };
  app.querySelectorAll(".bubble").forEach((b) => (b.onclick = () => { const l = d.lines[+b.dataset.line]; speakLines([l], d.people, mark); }));
  $("#d-go").onclick = () => { stopSeq(); startSession("dialog", { did, uid }); };
}

// ---------- Lesetexte ----------
let rdTrans = false, LEX = null;
function lexicon() {
  if (LEX && LEX.__n === WORDS.length) return LEX;
  LEX = { __n: WORDS.length };
  Object.entries((window.SW_COMMON || {})[S.lang] || {}).forEach(([k, v]) => { LEX[k] = { en: k, de: v, common: true }; });
  WORDS.forEach((w) => { const k = w.en.toLowerCase(); if (!LEX[k]) LEX[k] = w; if (k.startsWith("to ") && !LEX[k.slice(3)]) LEX[k.slice(3)] = w; });
  return LEX;
}
function lookupAt(r, toks, i) {
  // längster Treffer ab dem angetippten Wort: erst Glossar des Textes, dann Wortschatz
  const gl = Object.fromEntries(Object.entries(r.gl || {}).map(([k, v]) => [k.toLowerCase(), v]));
  const lx = lexicon();
  for (let n = 4; n >= 1; n--) {
    if (i + n > toks.length) continue;
    const ph = toks.slice(i, i + n).join(" ").toLowerCase();
    if (gl[ph]) return { en: toks.slice(i, i + n).join(" "), de: gl[ph], w: lx[ph] && !lx[ph].common ? lx[ph] : null };
    if (lx[ph]) return { en: lx[ph].en, de: lx[ph].de, w: lx[ph].common ? null : lx[ph] };
  }
  const t = toks[i].toLowerCase().replace(/'s$/, "");
  const cands = [t, t.replace(/s$/, ""), t.replace(/es$/, ""), t.replace(/ies$/, "y"), t.replace(/ed$/, ""), t.replace(/d$/, ""), t.replace(/ing$/, ""), t.replace(/ing$/, "e"), t.replace(/ly$/, "")];
  for (const c of cands) { if (gl[c]) return { en: toks[i], de: gl[c], w: lx[c] && !lx[c].common ? lx[c] : null }; if (lx[c]) return { en: lx[c].en, de: lx[c].de, w: lx[c].common ? null : lx[c] }; }
  return null;
}
function renderReading(uid) {
  setTabbar(false);
  const r = RD()[uid], u = unitById(uid), rec = S.reading[uid];
  let k = 0;
  const paraHtml = (p, pi) => {
    const html = p[0].split(/(\s+)/).map((tok) => {
      if (/^\s+$/.test(tok) || !/[A-Za-z]/.test(tok)) return esc(tok);
      const m = tok.match(/^([^A-Za-z0-9]*)(.*?)([^A-Za-z0-9]*)$/);
      return `${esc(m[1])}<span class="tw" data-i="${k++}">${esc(m[2])}</span>${esc(m[3])}`;
    }).join("");
    return `<div class="rd-p" data-p="${pi}"><p>${html}</p>${rdTrans ? `<p class="rd-de">${esc(p[1])}</p>` : ""}</div>`;
  };
  app.innerHTML = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button><span class="tag">${u.level}</span></div>
    <div class="small muted" style="font-weight:800;margin-top:6px;letter-spacing:.05em">📖 ${esc(r.kind.toUpperCase())} · ${esc(u.title)}</div>
    <h1 class="page-title">${esc(r.title)}</h1>
    <p class="sub">Tippe auf ein Wort für die Übersetzung. Versuch erst, den Text ohne Hilfe zu verstehen.</p>
    <div class="dlg-ctrl">
      <button class="btn" id="play">▶ Vorlesen</button>
      <button class="btn ghost" id="slow" style="width:auto">🐢</button>
    </div>
    <div class="seg" style="margin:12px 0 14px"><button id="t-trans" class="${rdTrans ? "on" : ""}">${rdTrans ? "Übersetzung an" : "Übersetzung zeigen"}</button></div>
    <div class="card rd">${r.paras.map(paraHtml).join("")}</div>
    <div class="stack" style="margin-top:20px">
      <button class="btn" id="r-go">Fragen beantworten (${r.questions.length})</button>
      <p class="small muted center">${rec && rec.done ? `Bestes Ergebnis: ${rec.best} %` : "Verständnisfragen zum Text"}</p>
    </div>
  </div>`;
  const toks = r.paras.flatMap((p) => p[0].split(/\s+/).filter((t) => /[A-Za-z]/.test(t)).map((t) => t.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "")));
  const lines = r.paras.map((p) => ["", p[0], p[1]]);
  const mark = (i) => app.querySelectorAll(".rd-p").forEach((b) => b.classList.toggle("live", +b.dataset.p === i));
  $("#back").onclick = back;
  $("#play").onclick = () => speakLines(lines, [""], mark);
  $("#slow").onclick = () => speakLines(lines, [""], mark, null, true);
  $("#t-trans").onclick = () => { rdTrans = !rdTrans; stopSeq(); renderReading(uid); };
  $("#r-go").onclick = () => { stopSeq(); startSession("read", { uid }); };
  app.querySelector(".rd").onclick = (e) => {
    const t = e.target.closest(".tw"); if (!t) return;
    app.querySelectorAll(".tw.on").forEach((x) => x.classList.remove("on")); t.classList.add("on");
    const hit = lookupAt(r, toks, +t.dataset.i);
    const word = hit ? hit.en : toks[+t.dataset.i];
    speak(word);
    const known = hit && hit.w && st(hit.w.id);
    sheet(`<h2 style="margin-bottom:4px">${esc(word)}</h2>
      <p style="font-size:19px;margin:0 0 14px">${hit ? esc(hit.de) : '<span class="muted">Nicht im Wörterbuch. Tipp: „Übersetzung zeigen“.</span>'}</p>
      <div class="stack">
        <button class="btn ghost" id="lx-say">🔊 Anhören</button>
        ${hit && !known && !(hit.w && hit.w.unit === "custom") && !(lexicon()[word.toLowerCase()] || {}).common ? `<button class="btn" id="lx-add">＋ Zu meinen Wörtern</button>` : known ? `<p class="small muted center">Schon in deinem Lernstand ✓</p>` : ""}
      </div>`);
    $("#lx-say").onclick = () => speak(word);
    const a = $("#lx-add");
    if (a) a.onclick = () => {
      if (hit.w) { const s2 = S.words[hit.w.id] || (S.words[hit.w.id] = { b: 0, due: today(), seen: 0, wrong: 0 }); s2.due = today(); }
      else { S.custom.push({ id: Date.now().toString(36), en: hit.en, de: hit.de, ex: "", exde: "" }); buildContent(); LEX = null; }
      save(); closeSheet(); toast("Gemerkt – kommt in der Wiederholung dran");
    };
  };
}

function renderGrammar(gid) {
  setTabbar(false);
  const g = GMAP[gid];
  const gs = S.gram[gid];
  app.innerHTML = `<div class="fadein">
    <div class="subtop"><button class="back" id="back">‹ Zurück</button><span class="tag">${g.level}</span></div>
    <div class="small muted" style="font-weight:800;margin-top:6px;letter-spacing:.05em">${g.mk ? "⚠️ FEHLERTRAINER" : "📐 GRAMMATIK"}</div>
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
      <button class="btn" id="g-go">${gs && gs.done ? "Nochmal üben" : "Übungen starten"} (${Math.min(LESSON_DRILLS, g.drills.length)})</button>
      <p class="small muted center" style="margin-top:-4px">${g.drills.length} Übungen insgesamt – jede Runde eine andere Auswahl</p>
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
  if (s.b >= 3 && w.ex && w.ex.split(" ").length <= 12) { const r = Math.random(); if (r < 0.15) return "dict"; if (r < 0.3) return "tsent"; }
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
  } else if (mode === "pack") {
    const ids = PACKW[opt.pid] || [];
    const fresh = ids.filter((id) => !st(id)).slice(0, 7).map((id) => WMAP[id]);
    const old = shuffle(ids.filter((id) => st(id))).slice(0, fresh.length ? 5 : 12).map((id) => WMAP[id]);
    const A = [], B = [];
    fresh.forEach((w) => { A.push({ id: w.id, t: "intro" }, { id: w.id, t: "mc_en", g: true }); B.push({ id: w.id, t: pick(["mc_de", "listen"]) }); });
    old.forEach((w) => B.push({ id: w.id, t: exerciseFor(w), g: true }));
    const mixed = shuffle(B);
    for (let i = 0; i < A.length; i += 4) { tasks.push(...A.slice(i, i + 4)); tasks.push(...mixed.splice(0, 3)); }
    tasks.push(...mixed);
  } else if (mode === "sound") {
    tasks = soundTasks(sndGet(opt.sid));
  } else if (mode === "read") {
    tasks = shuffle(RD()[opt.uid].questions.map((q, k) => ({ rq: opt.uid, k, t: "rq" })));
  } else if (mode === "free") {
    tasks = shuffle(WORDS.filter((w) => st(w.id))).slice(0, 10).map((w) => ({ id: w.id, t: exerciseFor(w), free: true }));
    shuffle(Object.keys(S.gram).filter((id) => S.gram[id].done && GMAP[id])).slice(0, 2)
      .forEach((id) => tasks.push(...grammarTasks(GMAP[id], 2, { free: true })));
    tasks = shuffle(tasks);
  } else if (mode === "grammar") {
    const g = GMAP[opt.gid];
    tasks = grammarTasks(g, Math.min(LESSON_DRILLS, g.drills.length), { lesson: true });
  } else if (mode === "dialog") {
    const d = dlgGet(opt.did);
    tasks = shuffle(d.questions.map((q, k) => ({ dq: opt.did, k, t: "dq" })));
    const lines = shuffle(d.lines.filter((l) => l[1].split(" ").length <= 12));
    lines.slice(0, 2).forEach((l) => tasks.push({ t: "dict", en: l[1], de: l[2], dlg: true }));
    if (lines[2]) tasks.push({ t: "tsent", en: lines[2][1], de: lines[2][2], dlg: true });
  } else if (mode === "test") {
    const u = unitById(opt.unit);
    const ws = shuffle(unitWords(u.id).filter((w) => w.core || st(w.id))).slice(0, 6);
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
      stopRec(); stopSeq(); save(); Q = null; render();
    }
  };
}

const deParts = (w) => w.de.toLowerCase().split(/\s*\/\s*|\s*\(|\)/).map((x) => x.replace(/^(der|die|das|sich) /, "").trim()).filter(Boolean);
function sameMeaning(a, b) { const pa = deParts(a); return deParts(b).some((x) => pa.includes(x)); }
function synonyms(w) { return WORDS.filter((x) => x.id !== w.id && sameMeaning(x, w)); }
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
      if (sameMeaning(x, w)) continue;
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
  stopRec(); stopSeq();
  if (Q.pos >= Q.tasks.length) return renderResult();
  const task = Q.tasks[Q.pos];
  if (task.dq) return tDQ(task);
  if (task.rq) return tRQ(task);
  if (task.snd) return ({ pair: tPair, stress: tStress, ssay: tSSay })[task.t](task);
  if (task.dlg) return tSentence(task, { en: task.en, de: task.de }, (ok) => sFeedback(task, ok));
  if (task.gid) {
    const g = GMAP[task.gid];
    if (!g) { Q.pos++; return renderTask(); }
    if (task.t === "gspeak" && !speakingAllowed()) task.t = "gbuild";
    return ({ gap: tGap, right: tRight, gbuild: tGBuild, gspeak: tGSpeak })[task.t](task, g, g.drills[task.k]);
  }
  const w = WMAP[task.id];
  if (!w) { Q.pos++; return renderTask(); }
  if (task.t === "speak" && !speakingAllowed()) task.t = "mc_de";
  if ((task.t === "dict" || task.t === "tsent") && !w.ex) task.t = "mc_de";
  if (task.t === "dict" || task.t === "tsent") return tSentence(task, { en: w.ex, de: w.exde }, (ok, typo) => feedback(task, w, ok, ok ? (typo ? `Fast! Genau: ${w.ex}` : null) : `Richtig: ${w.ex}`, { soft: true, hideEx: true, say: w.ex, selfOk: !ok && task.t === "tsent" }));
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
  if (!s.learned) { s.learned = today(); if (Q && Q.mode === "pack") s.pk = true; }
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
    let r = val == null ? "no" : checkTyped(val, w.en);
    if (r === "no" && val != null) { const syn = synonyms(w).find((x) => checkTyped(val, x.en) === "ok"); if (syn) { r = "ok"; return feedback(task, w, true, `Auch richtig! Gesucht war hier: ${w.en}`); } }
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

// ----- Dialog & Sätze -----
function tDQ(task) {
  const d = dlgGet(task.dq);
  const [q, right, wrongs] = d.questions[task.k];
  const opts = shuffle([right, ...wrongs]);
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <div class="prompt-label">🎧 ${esc(d.title)} · Hörverständnis</div>
    <div class="prompt"><div class="big" style="font-size:25px">${esc(q)}</div></div>
    <div class="dlg-ctrl" style="margin-bottom:16px"><button class="btn ghost small" id="re">▶ Gespräch nochmal hören</button></div>
    ${optionsHtml(opts)}
  </div>${footCheck}`;
  bindClose();
  $("#re").onclick = () => speakLines(d.lines, d.people);
  bindOptions(right, (ok) => { stopSeq(); sFeedback(task, ok, ok ? null : `Richtig: ${right}`); });
}
function tRQ(task) {
  const r = RD()[task.rq];
  const [q, right, wrongs] = r.questions[task.k];
  const opts = shuffle([right, ...wrongs]);
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <div class="prompt-label">📖 ${esc(r.title)} · Leseverständnis</div>
    <div class="prompt"><div class="big" style="font-size:25px">${esc(q)}</div></div>
    <details class="card rd-peek" style="margin-bottom:16px"><summary class="small muted">Text nochmal lesen</summary>${r.paras.map((p) => `<p>${esc(p[0])}</p>`).join("")}</details>
    ${optionsHtml(opts)}
  </div>${footCheck}`;
  bindClose();
  bindOptions(right, (ok) => sFeedback(task, ok, ok ? null : `Richtig: ${right}`));
}
function sentenceCheck(input, target) {
  const a = expand(norm(input)), b = expand(norm(target));
  if (a === b) return "ok";
  const d = lev(a, b);
  return d <= Math.max(2, Math.round(b.length * 0.08)) ? "typo" : "no";
}
function tSentence(task, item, onDone) {
  const dict = task.t === "dict";
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <div class="prompt-label">${dict ? "✍️ Diktat · Hör zu und schreib mit" : "🔁 Übersetze den Satz"}</div>
    ${dict ? `<div class="listen-big">${speakBtn(item.en)}<button class="speak slow" data-say="${esc(item.en)}" data-slow="1" aria-label="Langsam">🐢</button></div>`
           : `<div class="prompt"><div class="big" style="font-size:24px">${esc(item.de)}</div></div>`}
    <textarea class="answer-input" id="ans" rows="3" autocomplete="off" autocorrect="off" autocapitalize="sentences" spellcheck="false" placeholder="${dict ? "Was hörst du?" : "Auf Englisch …"}"></textarea>
    <button class="skip" id="dunno">Weiß ich nicht</button>
  </div>${footCheck}`;
  bindClose();
  if (dict) setTimeout(() => speak(item.en), 300);
  const inp = $("#ans");
  inp.oninput = () => ($("#check").disabled = !inp.value.trim());
  inp.onkeydown = (e) => { if (e.key === "Enter" && !e.shiftKey && inp.value.trim()) { e.preventDefault(); $("#check").click(); } };
  const go = (val) => {
    inp.disabled = true; $("#dunno")?.remove();
    const r = val == null ? "no" : sentenceCheck(val, item.en);
    task.typed = val;
    onDone(r !== "no", r === "typo");
  };
  $("#check").onclick = () => go(inp.value);
  $("#dunno").onclick = () => go(null);
}
function sFeedback(task, ok, msg) {
  award(ok, "s:" + (task.dq || task.rq || task.en), false);
  let body = "";
  if (task.en) body += `<p class="sol">${ok ? "" : "Richtig: "}${esc(task.en)}</p><p class="muted">${esc(task.de)}</p>`;
  else if (msg) body += `<p class="sol">${esc(msg)}</p>`;
  footFeedback(ok, ok ? "✓ " + pick(PRAISE) : "✗ Nicht ganz", body);
  $("#rep").onclick = () => { S.reports.push({ date: today(), text: task.rq ? `Lesetext ${task.rq}: ${RD()[task.rq].questions[task.k][0]}` : `Dialog ${task.dq || ""}: ${task.en || dlgGet(task.dq).questions[task.k][0]}` }); save(); toast("Gemeldet – danke!"); };
  if (!ok && task.t === "tsent" && task.typed) addSelfOk(() => { Q.right++; Q.xp += 10; addXp(10); });
  if (task.en && S.settings.autoplay) setTimeout(() => speak(task.en), 200);
}
function addSelfOk(onOk) {
  const nx = $("#next");
  const b = document.createElement("button");
  b.className = "skip"; b.id = "selfok"; b.textContent = "✓ Meine Version stimmt auch";
  nx.after(b);
  b.onclick = () => { onOk(); toast("Als richtig gewertet"); Q.pos++; renderTask(); };
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
function silentReplacement(task) { if (task.snd) { const x = sndGet(task.snd); return { snd: task.snd, t: "pair", k: Math.floor(Math.random() * x.pairs.length), pick: Math.random() < 0.5 ? 0 : 1 }; } return task.gid ? { ...task, t: "gbuild" } : { ...task, t: "mc_de" }; }
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
      const ok = alts.some((a) => (item.strict ? strictMatch(a, item.en) : speechMatch(a, item.en)));
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
function strictMatch(said, target) { const a = norm(said), b = norm(target); return a === b || a.split(" ").includes(b) || (b.includes(" ") && a.includes(b)); }
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
  const title = ok ? (o.typo ? "✓ Fast perfekt" : "✓ " + pick(PRAISE)) : o.soft ? "🙂 Nicht ganz – vergleiche mal" : "✗ Nicht ganz";
  footFeedback(ok || !!o.soft, title, body);
  $("#rep").onclick = () => report(task, w);
  if (o.selfOk && task.typed) addSelfOk(() => { Q.right++; Q.xp += 10; addXp(10); });
  if (S.settings.autoplay && ["type", "build", "mc_de", "speak", "dict", "tsent"].includes(task.t)) setTimeout(() => speak(o.say || w.en), 200);
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
  if (Q.mode === "dialog") {
    const prev = S.dialogs[Q.opt.did];
    S.dialogs[Q.opt.did] = { done: true, best: Math.max(acc, (prev && prev.best) || 0) };
    title = "Dialog geschafft!";
    sub = `„${dlgGet(Q.opt.did).title}“ – ${acc} % richtig.`;
  }
  if (Q.mode === "sound") {
    const prev = S.sounds[Q.opt.sid];
    S.sounds[Q.opt.sid] = { done: true, best: Math.max(acc, (prev && prev.best) || 0) };
    title = "Gut geübt!";
    sub = `„${sndGet(Q.opt.sid).title}“ – ${acc} % richtig.`;
  }
  if (Q.mode === "read") {
    const prev = S.reading[Q.opt.uid];
    S.reading[Q.opt.uid] = { done: true, best: Math.max(acc, (prev && prev.best) || 0) };
    title = "Text verstanden!";
    sub = `„${RD()[Q.opt.uid].title}“ – ${acc} % richtig.`;
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
  $("#done").onclick = () => { if (mode === "dialog" && opt.uid) { view = { type: "unit", id: opt.uid }; } else if (mode === "pack") { view = { type: "pack", id: opt.pid }; } else if (mode === "read") { view = { type: "unit", id: opt.uid }; } else if (mode === "sound") { view = { type: "sound", id: opt.sid }; } else if (mode === "grammar" && GMAP[opt.gid] && GMAP[opt.gid].mk) { view = { type: "mlist" }; } else if (mode !== "plan" && mode !== "free") view = null; tab = "home"; render(); window.scrollTo(0, 0); };
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

    <p class="small muted center" style="margin-top:22px">Sprachwerk · ${UNITS.length} Einheiten · ${G().length} Grammatik-Lektionen · ${dlgCount()} Dialoge · ${rdCount()} Lesetexte · ${WORDS.length} Wörter<br>Alles bleibt auf diesem Gerät, kein Konto, keine Werbung.<br>Tipp: In Safari über „Teilen → Zum Home-Bildschirm“ als App speichern.</p>
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
window.__sw = { get S() { return S; }, WORDS: () => WORDS, todayPlan, currentUnitIndex, lookupAt, RD };
})();
