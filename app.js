/* Sprachwerk – Sprachen lernen. Alles lokal, keine Server, kein Login. */
(() => {
"use strict";

const STORE_KEY = "sprachwerk-v1";
const LEVELS = ["A1", "A2", "B1", "B2"];
const INTERVALS = [0, 1, 2, 4, 8, 16, 35, 80]; // Tage je Fach (Box)
const MAX_BOX = INTERVALS.length - 1;
const MAX_REVIEWS = 20;
const MAX_QUICK = 8;

// ---------- Helpers ----------
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const pad = (n) => String(n).padStart(2, "0");
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (n, from = new Date()) => { const d = new Date(from); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + n); return dayKey(d); };
const today = () => dayKey();
const lvlIdx = (l) => LEVELS.indexOf(l);

const ICON_SPEAK = '<svg viewBox="0 0 24 24"><path d="M4 9.5v5a1 1 0 0 0 1 1h3l4.3 3.6a.8.8 0 0 0 1.3-.6V5.5a.8.8 0 0 0-1.3-.6L8 8.5H5a1 1 0 0 0-1 1zm12.4-2.7a1 1 0 0 1 1.4.1 7.7 7.7 0 0 1 0 10.2 1 1 0 1 1-1.5-1.3 5.7 5.7 0 0 0 0-7.6 1 1 0 0 1 .1-1.4zm-2.3 2.4a1 1 0 0 1 1.4.2 4 4 0 0 1 0 5.2 1 1 0 0 1-1.6-1.2 2 2 0 0 0 0-2.8 1 1 0 0 1 .2-1.4z"/></svg>';

// ---------- State ----------
const DEFAULT = {
  v: 1,
  lang: "en",
  onboarded: false,
  passed: -1,              // höchste bestandene Stufe im Test (-1 = keine)
  test: null,
  settings: { accent: "us", rate: 0.9, newPerDay: 7, goal: 50, sound: true, autoplay: true },
  words: {},               // id -> { b, due, seen, wrong, learned }
  custom: [],              // eigene Wörter
  packsOff: [],
  days: {},                // "YYYY-MM-DD" -> xp
};
let S = load();

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      return { ...DEFAULT, ...d, settings: { ...DEFAULT.settings, ...(d.settings || {}) } };
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

// ---------- Vokabeln ----------
let WORDS = [], WMAP = {};
function buildWords() {
  WORDS = [];
  L().packs.forEach((p) => p.words.forEach((w, i) => {
    WORDS.push({ id: p.id + ":" + w[0], pack: p.id, level: p.level, i, en: w[0], de: w[1], ex: w[2] || "", exde: w[3] || "" });
  }));
  S.custom.forEach((c) => WORDS.push({ id: "custom:" + c.id, pack: "custom", level: "A1", en: c.en, de: c.de, ex: c.ex || "", exde: c.exde || "" }));
  WMAP = Object.fromEntries(WORDS.map((w) => [w.id, w]));
}
buildWords();

const packList = () => {
  const list = L().packs.slice();
  if (S.custom.length) list.push({ id: "custom", title: "Eigene Wörter", level: "A1", emoji: "✍️", words: S.custom });
  return list;
};
const packWords = (pid) => WORDS.filter((w) => w.pack === pid);
const isQuick = (w) => w.pack !== "custom" && lvlIdx(w.level) <= S.passed;
const st = (id) => S.words[id];

function dueReviews() {
  const t = today();
  return WORDS.filter((w) => { const s = st(w.id); return s && s.due <= t; })
    .sort((a, b) => st(a.id).due.localeCompare(st(b.id).due));
}
function learnedToday() {
  const t = today();
  return Object.values(S.words).filter((s) => s.learned === t && !s.quick).length;
}
function newCandidates() {
  const off = new Set(S.packsOff);
  const packs = packList().filter((p) => !off.has(p.id));
  // Eigene Wörter zuerst, dann Themen in Stufen-Reihenfolge ab der eigenen Stufe
  const order = packs.slice().sort((a, b) => {
    if (a.id === "custom") return -1;
    if (b.id === "custom") return 1;
    return lvlIdx(a.level) - lvlIdx(b.level);
  });
  const real = [], quick = [];
  order.forEach((p) => packWords(p.id).forEach((w) => {
    if (st(w.id)) return;
    (isQuick(w) ? quick : real).push(w);
  }));
  return { real, quick };
}
function todayPlan() {
  const due = dueReviews().slice(0, MAX_REVIEWS);
  const { real, quick } = newCandidates();
  const nNew = Math.max(0, S.settings.newPerDay - learnedToday());
  return { due, fresh: real.slice(0, nNew), quick: quick.slice(0, MAX_QUICK) };
}

// ---------- Statistik ----------
const xpToday = () => S.days[today()] || 0;
function addXp(n) { const t = today(); S.days[t] = (S.days[t] || 0) + n; }
function streak() {
  let n = 0; let d = new Date();
  if (!S.days[dayKey(d)]) d.setDate(d.getDate() - 1); // heute noch offen → ab gestern zählen
  while (S.days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
const learnedCount = () => Object.keys(S.words).filter((k) => WMAP[k]).length;
const solidCount = () => Object.entries(S.words).filter(([k, s]) => WMAP[k] && s.b >= 4).length;

// ---------- Sprachausgabe ----------
let voices = [];
function loadVoices() { voices = window.speechSynthesis ? speechSynthesis.getVoices() : []; }
if (window.speechSynthesis) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function bestVoice(code) {
  const c = code.toLowerCase();
  const list = voices.filter((v) => v.lang.replace("_", "-").toLowerCase() === c);
  const fallback = voices.filter((v) => v.lang.toLowerCase().startsWith(c.slice(0, 2)));
  const pool = list.length ? list : fallback;
  const prefer = ["Samantha", "Daniel", "Karen", "Serena", "Alex", "Google US English", "Google UK English Female"];
  for (const p of prefer) { const v = pool.find((x) => x.name.includes(p)); if (v) return v; }
  return pool.find((v) => v.localService) || pool[0] || null;
}
function speak(text, slow = false) {
  if (!window.speechSynthesis || !text) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/…/g, ""));
  const code = L().voices[S.settings.accent] || "en-US";
  u.lang = code;
  const v = bestVoice(code); if (v) u.voice = v;
  u.rate = slow ? 0.6 : S.settings.rate;
  speechSynthesis.speak(u);
}

// ---------- Töne ----------
let actx;
function beep(ok) {
  if (!S.settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = ok ? [660, 990] : [300, 220];
    notes.forEach((f, i) => {
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

function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(() => (t.hidden = true), 2200);
}
function setTabbar(show) {
  tabbar.hidden = !show;
  document.body.classList.toggle("in-session", !show);
  tabbar.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
}
tabbar.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-tab]"); if (!b) return;
  tab = b.dataset.tab; render(); window.scrollTo(0, 0);
});
const speakBtn = (text, cls = "speak") => `<button class="${cls}" data-say="${esc(text)}" aria-label="Vorlesen">${ICON_SPEAK}</button>`;
document.addEventListener("click", (e) => {
  const s = e.target.closest("[data-say]");
  if (s) { e.stopPropagation(); speak(s.dataset.say, s.dataset.slow === "1"); }
}, true);

function render() {
  if (!S.onboarded) return renderWelcome();
  setTabbar(true);
  ({ home: renderHome, packs: renderPacks, words: renderWords, more: renderMore })[tab]();
}

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
  const total = LEVELS.length * 5;
  const pct = Math.round((T.answered / total) * 100);
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
      const passed = T.score[T.b] >= 3;
      if (!passed || T.b === LEVELS.length - 1) return finishTest();
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
      ? "Stark! Du hast alle Stufen geschafft. Die App wiederholt die Grundlagen im Schnelldurchlauf und legt den Fokus auf die schweren Themen."
      : `Die Stufen bis ${shown} sitzen. Diese Wörter fragt die App nur kurz ab (Schnellcheck) – was du kannst, wird übersprungen. Neue Wörter kommen ab Stufe ${startAt}.`;
  setTabbar(false);
  app.innerHTML = `
  <div class="onb center fadein">
    <div class="muted" style="font-weight:700">Dein Stand ungefähr</div>
    <div class="lvl-result pop">${passed < 0 ? "Start" : shown}</div>
    <div class="scale">${LEVELS.map((l, i) => `<div class="${i <= passed ? "on" : ""}">${l}</div>`).join("")}</div>
    <p>${text}</p>
    <p class="small muted">${correct} von ${T.answered} richtig. A1 = Anfänger, A2 = Grundkenntnisse, B1 = Alltag klappt, B2 = selbstständig.</p>
    <button class="btn" id="t-done" style="margin-top:22px">${wasOnboarded ? "Fertig" : "Zur ersten Lektion"}</button>
  </div>`;
  T = null;
  $("#t-done").onclick = () => { tab = "home"; render(); };
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
  const total = plan.due.length + plan.fresh.length + plan.quick.length;
  const lvl = S.passed < 0 ? "A1" : LEVELS[Math.min(S.passed + 1, 3)];
  const hour = new Date().getHours();
  const greet = hour < 11 ? "Guten Morgen" : hour < 18 ? "Hallo" : "Guten Abend";
  const st_ = streak();

  app.innerHTML = `
  <div class="fadein">
    <div class="top">
      <div class="brand"><div class="mark">S</div><h1>Sprachwerk</h1></div>
      <span class="chip">${L().flag} ${esc(L().name)} · ${lvl}</span>
    </div>

    ${total ? `
    <div class="hero">
      <h2>${greet}!</h2>
      <p>Deine Lektion für heute ist bereit.</p>
      <div class="counts">
        ${plan.due.length ? `<span>🔁 ${plan.due.length} Wiederholung${plan.due.length > 1 ? "en" : ""}</span>` : ""}
        ${plan.fresh.length ? `<span>✨ ${plan.fresh.length} neue Wörter</span>` : ""}
        ${plan.quick.length ? `<span>⚡ ${plan.quick.length} Schnellcheck</span>` : ""}
      </div>
      <button class="btn" id="start">Lektion starten</button>
    </div>` : `
    <div class="hero">
      <h2>Alles erledigt 🎉</h2>
      <p>Für heute ist nichts mehr fällig. Wer mag, übt freiwillig weiter.</p>
      <button class="btn" id="extra" ${learnedCount() < 4 ? "disabled" : ""}>Freies Üben</button>
    </div>`}

    <div class="stats">
      <div class="stat streak"><b>${st_}</b><span>${st_ === 1 ? "Tag" : "Tage"} in Folge 🔥</span></div>
      <div class="stat"><b>${learnedCount()}</b><span>Wörter gelernt</span></div>
      <div class="stat"><b>${solidCount()}</b><span>sitzen sicher</span></div>
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
}

// ---------- Lektion ----------
let Q = null; // aktuelle Sitzung

function exerciseFor(w) {
  const s = st(w.id) || { b: 1 };
  const words = w.en.split(" ").length;
  const canBuild = buildSource(w);
  if (s.b <= 1) return pick(["mc_en", "listen"]);
  if (s.b === 2) return pick(["mc_de", "listen", "mc_en"]);
  const pool = ["type", "type", "mc_de"];
  if (canBuild) pool.push("build", "build");
  if (words >= 3) return canBuild ? "build" : "mc_de";
  return pick(pool);
}
function buildSource(w) {
  // Wörter-Puzzle: kurze Phrase selbst oder Beispielsatz
  const n = w.en.split(" ").length;
  if (n >= 3 && n <= 9) return { en: w.en, de: w.de };
  if (w.ex) { const m = w.ex.split(" ").length; if (m >= 3 && m <= 9) return { en: w.ex, de: w.exde }; }
  return null;
}

function startSession(mode) {
  let tasks = [];
  if (mode === "plan") {
    const plan = todayPlan();
    const A = [], B = [];
    plan.fresh.forEach((w) => { A.push({ id: w.id, t: "intro" }, { id: w.id, t: "mc_en", g: true }); B.push({ id: w.id, t: pick(["mc_de", "listen"]) }); });
    plan.quick.forEach((w) => B.push({ id: w.id, t: pick(["mc_de", "mc_en"]), g: true, quick: true }));
    plan.due.forEach((w) => B.push({ id: w.id, t: exerciseFor(w), g: true }));
    // Neue Wörter in Zweiergruppen, dazwischen Wiederholungen
    const mixed = shuffle(B);
    for (let i = 0; i < A.length; i += 4) { tasks.push(...A.slice(i, i + 4)); tasks.push(...mixed.splice(0, 3)); }
    tasks.push(...mixed);
  } else {
    const known = shuffle(WORDS.filter((w) => st(w.id))).slice(0, 12);
    tasks = known.map((w) => ({ id: w.id, t: exerciseFor(w), free: true }));
  }
  if (!tasks.length) { toast("Gerade nichts zu üben"); return; }
  Q = { mode, tasks, pos: 0, xp: 0, right: 0, wrongIds: new Set(), graded: new Set(), requeued: new Set(), start: Date.now(), newIds: new Set(tasks.filter((t) => t.t === "intro").map((t) => t.id)) };
  renderTask();
}

function sessionTop() {
  const pct = Math.round((Q.pos / Q.tasks.length) * 100);
  return `<div class="s-top">
    <button class="s-close" id="s-x" aria-label="Beenden">×</button>
    <div class="s-progress"><i style="width:${Math.max(3, pct)}%"></i></div>
    <span class="s-xp">⚡${Q.xp}</span>
  </div>`;
}
function bindClose() {
  $("#s-x").onclick = () => {
    if (Q.pos === 0 || confirm("Lektion beenden? Dein Fortschritt bis hier bleibt gespeichert.")) { save(); Q = null; render(); }
  };
}

function distractors(w, field, n = 3) {
  const same = shuffle(WORDS.filter((x) => x.pack === w.pack && x.id !== w.id));
  const other = shuffle(WORDS.filter((x) => x.pack !== w.pack && x.id !== w.id));
  const seen = new Set([w[field].toLowerCase()]);
  const out = [];
  const isPhrase = w.en.split(" ").length >= 3;
  for (const x of [...same, ...other]) {
    if ((x.en.split(" ").length >= 3) !== isPhrase && out.length < n && same.length > 6) continue;
    const v = x[field]; if (seen.has(v.toLowerCase())) continue;
    seen.add(v.toLowerCase()); out.push(v); if (out.length >= n) break;
  }
  return out;
}

function renderTask() {
  setTabbar(false);
  window.scrollTo(0, 0);
  if (Q.pos >= Q.tasks.length) return renderResult();
  const task = Q.tasks[Q.pos];
  const w = WMAP[task.id];
  if (!w) { Q.pos++; return renderTask(); }
  ({ intro: tIntro, mc_en: tMc, mc_de: tMc, listen: tMc, type: tType, build: tBuild })[task.t](task, w);
}

function tIntro(task, w) {
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <span class="new-badge">NEUES WORT</span>
    <div class="card intro-card pop">
      <div class="en">${esc(w.en)}</div>
      <div class="de">${esc(w.de)}</div>
      ${speakBtn(w.en)}
      ${w.ex ? `<div class="example"><div class="t"><b>${esc(w.ex)}</b><span>${esc(w.exde)}</span></div>${speakBtn(w.ex)}</div>` : ""}
    </div>
  </div>
  <div class="s-foot"><div class="inner"><button class="btn" id="next">Verstanden</button></div></div>`;
  bindClose();
  if (S.settings.autoplay) setTimeout(() => speak(w.en), 250);
  const s = S.words[w.id] || (S.words[w.id] = { b: 0, due: today(), seen: 0, wrong: 0 });
  if (!s.learned) s.learned = today();
  save();
  $("#next").onclick = () => { Q.pos++; renderTask(); };
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
    ${task.quick ? `<span class="new-badge" style="background:var(--accent-soft);color:var(--accent)">⚡ SCHNELLCHECK</span>` : ""}
    ${head}
    <div class="options">${opts.map((o, k) => `<button class="opt" data-v="${esc(o)}"><span class="k">${k + 1}</span>${esc(o)}</button>`).join("")}</div>
  </div>
  <div class="s-foot" id="foot"><div class="inner"><button class="btn" id="check" disabled>Prüfen</button></div></div>`;
  bindClose();
  if ((listen || enToDe) && S.settings.autoplay) setTimeout(() => speak(w.en), 250);
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
    feedback(task, w, ok, ok ? null : `${w.en} = ${w.de}`);
  };
  keyNav();
}

function norm(s) {
  return s.toLowerCase().replace(/[’`´]/g, "'").replace(/[.,!?;:…"()]/g, " ").replace(/\s+/g, " ").trim();
}
function variants(en) {
  const base = norm(en);
  const out = new Set([base]);
  base.split(" / ").forEach((x) => out.add(x.trim()));
  [...out].forEach((x) => {
    if (x.startsWith("to ")) out.add(x.slice(3));
    out.add(x.replace(/'m /g, " am ").replace(/'re /g, " are ").replace(/'s /g, " is ").replace(/n't/g, " not").replace(/\s+/g, " "));
  });
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
  let a = norm(input).replace(/^(a|an|the) /, "");
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
  </div>
  <div class="s-foot" id="foot"><div class="inner"><button class="btn" id="check" disabled>Prüfen</button></div></div>`;
  bindClose();
  const inp = $("#ans");
  setTimeout(() => inp.focus(), 50);
  inp.oninput = () => ($("#check").disabled = !inp.value.trim());
  const go = (val) => {
    inp.disabled = true; $("#dunno").remove();
    const r = val == null ? "no" : checkTyped(val, w.en);
    feedback(task, w, r !== "no", r === "typo" ? `Fast! Richtig geschrieben: ${w.en}` : r === "no" ? `Richtig: ${w.en}` : null, r === "typo");
  };
  inp.onkeydown = (e) => { if (e.key === "Enter" && inp.value.trim()) { e.preventDefault(); go(inp.value); } };
  $("#check").onclick = () => go(inp.value);
  $("#dunno").onclick = () => go(null);
}

function tBuild(task, w) {
  const src = buildSource(w) || { en: w.en, de: w.de };
  const tokens = src.en.split(" ");
  let bank = shuffle(tokens.map((t, i) => ({ t, i })));
  if (bank.every((b, k) => b.i === k) && bank.length > 1) bank = bank.reverse();
  const placed = [];
  app.innerHTML = `<div class="s-body fadein">${sessionTop()}
    <div class="prompt-label">Bilde den Satz</div>
    <div class="prompt"><div class="big" style="font-size:24px">${esc(src.de)}</div></div>
    <div class="build-area" id="area"></div>
    <div class="bank" id="bank">${bank.map((b, k) => `<button class="tile" data-k="${k}">${esc(b.t)}</button>`).join("")}</div>
  </div>
  <div class="s-foot" id="foot"><div class="inner"><button class="btn" id="check" disabled>Prüfen</button></div></div>`;
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
    const ok = norm(built) === norm(src.en);
    area.style.pointerEvents = "none"; $("#bank").style.pointerEvents = "none";
    feedback(task, w, ok, ok ? null : `Richtig: ${src.en}`, false, src.en);
  };
}

function keyNav() {
  document.onkeydown = (e) => {
    if (!Q) { document.onkeydown = null; return; }
    const n = parseInt(e.key, 10);
    const opts = app.querySelectorAll(".opt:not([disabled])");
    if (n >= 1 && n <= opts.length) opts[n - 1].click();
    if (e.key === "Enter") { const c = $("#check"); const nx = $("#next"); if (nx) nx.click(); else if (c && !c.disabled) c.click(); }
  };
}

const PRAISE = ["Richtig!", "Super!", "Genau!", "Stark!", "Sehr gut!", "Perfekt!"];
function feedback(task, w, ok, msg, typo = false, sayText = null) {
  grade(task, w, ok);
  beep(ok); if (!ok) haptic();
  const foot = $("#foot");
  foot.className = "s-foot " + (ok ? "good" : "bad");
  const say = sayText || (w.ex && task.t !== "build" ? w.en : w.en);
  foot.innerHTML = `<div class="inner fadein">
    <div class="fb">
      <h3>${ok ? (typo ? "✓ Fast perfekt" : "✓ " + pick(PRAISE)) : "✗ Nicht ganz"}</h3>
      ${msg ? `<p class="sol">${esc(msg)}</p>` : ""}
      ${w.ex && task.t !== "build" ? `<p>${esc(w.ex)} <span class="muted">– ${esc(w.exde)}</span></p>` : ""}
    </div>
    <button class="btn ${ok ? "good" : "bad"}" id="next">Weiter</button>
  </div>`;
  if (S.settings.autoplay && (task.t === "type" || task.t === "build" || task.t === "mc_de")) setTimeout(() => speak(say), 200);
  if (!ok) app.querySelector(".s-body")?.classList.add("shake");
  $("#next").onclick = () => { Q.pos++; renderTask(); };
  keyNav();
}

function grade(task, w, ok) {
  if (ok) { Q.right++; const pts = Q.wrongIds.has(w.id) ? 5 : 10; Q.xp += pts; addXp(pts); }
  else {
    Q.wrongIds.add(w.id);
    // Falsch beantwortete Wörter kommen am Ende noch einmal
    if (!Q.requeued.has(w.id)) {
      Q.requeued.add(w.id);
      if (task.quick) Q.tasks.push({ id: w.id, t: "intro" });
      Q.tasks.push({ id: w.id, t: "mc_en" });
    }
  }
  if (task.free) { if (!ok) setBox(w.id, 1); save(); return; }
  const s = S.words[w.id] || (S.words[w.id] = { b: 0, due: today(), seen: 0, wrong: 0 });
  s.seen = (s.seen || 0) + 1;
  if (!ok) s.wrong = (s.wrong || 0) + 1;
  if (task.g && !Q.graded.has(w.id)) {
    Q.graded.add(w.id);
    if (task.quick) {
      if (!s.learned) s.learned = today();
      s.quick = true;
      setBox(w.id, ok ? 4 : 1);
    } else if (Q.newIds.has(w.id)) {
      setBox(w.id, 1);
    } else {
      setBox(w.id, ok ? Math.min(MAX_BOX, (s.b || 0) + 1) : 1);
    }
  } else if (!ok && !Q.newIds.has(w.id)) {
    setBox(w.id, 1);
  }
  save();
}
function setBox(id, b) {
  const s = S.words[id] || (S.words[id] = { b: 0, due: today(), seen: 0, wrong: 0 });
  s.b = b; s.due = addDays(INTERVALS[b]);
}

function renderResult() {
  document.onkeydown = null;
  const total = Q.tasks.filter((t) => t.t !== "intro").length;
  const acc = total ? Math.round((Q.right / total) * 100) : 100;
  const mins = Math.max(1, Math.round((Date.now() - Q.start) / 60000));
  const goalHit = xpToday() >= S.settings.goal;
  const emoji = acc >= 90 ? "🏆" : acc >= 70 ? "💪" : "🌱";
  app.innerHTML = `<div class="result fadein">
    <div class="big-emoji pop">${emoji}</div>
    <h2>Lektion geschafft!</h2>
    <p class="muted">${goalHit ? "Tagesziel erreicht – stark." : "Jeder Tag zählt. Bis morgen!"}</p>
    <div class="result-grid">
      <div class="stat"><b style="color:var(--gold)">+${Q.xp}</b><span>XP</span></div>
      <div class="stat"><b>${acc}%</b><span>richtig</span></div>
      <div class="stat"><b>${mins}</b><span>Min.</span></div>
    </div>
    ${Q.newIds.size ? `<p>✨ ${Q.newIds.size} neue Wörter gelernt</p>` : ""}
    <p class="small muted">🔥 ${streak()} ${streak() === 1 ? "Tag" : "Tage"} in Folge</p>
    <button class="btn" id="done" style="margin-top:20px">Weiter</button>
  </div>`;
  Q = null; save();
  $("#done").onclick = () => { tab = "home"; render(); };
}

// ---------- Themen ----------
function renderPacks() {
  const off = new Set(S.packsOff);
  app.innerHTML = `<div class="fadein">
    <h1 class="page-title">Themen</h1>
    <p class="sub">Schalte Themen ab, die dich gerade nicht interessieren. Tippe auf ein Thema für die Wortliste.</p>
    <div class="stack">
      ${packList().map((p) => {
        const ws = packWords(p.id);
        const done = ws.filter((w) => st(w.id)).length;
        const pct = ws.length ? Math.round((done / ws.length) * 100) : 0;
        const quick = p.id !== "custom" && lvlIdx(p.level) <= S.passed;
        return `<div class="card pack ${off.has(p.id) ? "off" : ""}">
          <div class="em">${p.emoji}</div>
          <div class="info" data-open="${p.id}">
            <h3>${esc(p.title)}</h3>
            <div class="meta"><span class="tag">${p.level}</span><span>${done}/${ws.length} Wörter</span>${quick ? "<span>⚡ Schnellcheck</span>" : ""}</div>
            <div class="bar"><i style="width:${pct}%"></i></div>
          </div>
          <label class="toggle"><input type="checkbox" data-pack="${p.id}" ${off.has(p.id) ? "" : "checked"}><span></span></label>
        </div>`;
      }).join("")}
    </div>
  </div>`;
  app.querySelectorAll("[data-pack]").forEach((c) => (c.onchange = () => {
    const id = c.dataset.pack;
    S.packsOff = c.checked ? S.packsOff.filter((x) => x !== id) : [...S.packsOff, id];
    save(); renderPacks();
  }));
  app.querySelectorAll("[data-open]").forEach((d) => (d.onclick = () => openPack(d.dataset.open)));
}
function openPack(pid) {
  const p = packList().find((x) => x.id === pid);
  sheet(`<h2>${p.emoji} ${esc(p.title)}</h2>${wordListHtml(packWords(pid))}`);
}
function wordListHtml(list) {
  if (!list.length) return `<p class="muted center" style="padding:20px">Keine Wörter gefunden.</p>`;
  return `<ul class="wl">${list.map((w) => {
    const s = st(w.id); const b = s ? s.b : 0;
    return `<li>${speakBtn(w.en)}<div class="w"><b>${esc(w.en)}</b><span>${esc(w.de)}</span></div>
      <div class="dots" title="Lernstand">${[1, 2, 3, 4, 5].map((k) => `<i class="${b >= k ? "on" : ""}"></i>`).join("")}</div>
      ${w.pack === "custom" ? `<button class="small muted" data-del="${esc(w.id)}" aria-label="Löschen" style="padding:6px">✕</button>` : ""}</li>`;
  }).join("")}</ul>`;
}

// ---------- Wörter ----------
let wq = "", wfilter = "all";
function renderWords() {
  app.innerHTML = `<div class="fadein">
    <div class="top" style="margin-bottom:6px"><h1 class="page-title">Wörter</h1><button class="btn small" id="add" style="width:auto">+ Eigenes</button></div>
    <p class="sub">${learnedCount()} gelernt · ${solidCount()} sitzen sicher</p>
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
    $("#list").innerHTML = wordListHtml(list.slice(0, 300));
  };
  draw();
  $("#q").oninput = (e) => { wq = e.target.value; draw(); };
  app.querySelectorAll("[data-f]").forEach((b) => (b.onclick = () => { wfilter = b.dataset.f; renderWords(); }));
  $("#add").onclick = addWordSheet;
  $("#list").onclick = (e) => {
    const d = e.target.closest("[data-del]"); if (!d) return;
    if (!confirm("Dieses eigene Wort löschen?")) return;
    const cid = d.dataset.del.slice(7);
    S.custom = S.custom.filter((c) => c.id !== cid); delete S.words[d.dataset.del];
    save(); buildWords(); draw();
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
    save(); buildWords(); closeSheet(); toast("Gespeichert – kommt in der nächsten Lektion dran"); render();
  };
}

// ---------- Mehr / Einstellungen ----------
function renderMore() {
  const s = S.settings;
  const seg = (key, opts) => `<div class="seg">${opts.map(([v, l]) => `<button data-set="${key}" data-v="${v}" class="${String(s[key]) === String(v) ? "on" : ""}">${l}</button>`).join("")}</div>`;
  const step = (key, min, max, d) => `<div class="stepper"><button data-step="${key}" data-d="${-d}" data-min="${min}" data-max="${max}">−</button><b>${s[key]}</b><button data-step="${key}" data-d="${d}" data-min="${min}" data-max="${max}">+</button></div>`;
  app.innerHTML = `<div class="fadein">
    <h1 class="page-title">Mehr</h1>
    <p class="sub">Einstellungen, Test und Datensicherung</p>

    <div class="section-h"><h3>Lernen</h3></div>
    <ul class="set">
      <li><span>Neue Wörter pro Tag</span>${step("newPerDay", 3, 20, 1)}</li>
      <li><span>Tagesziel (XP)</span>${step("goal", 20, 200, 10)}</li>
      <li class="tap" id="retest"><span>Einstufungstest wiederholen<small>Aktuell: ${S.passed < 0 ? "Start bei A1" : "bis " + LEVELS[S.passed] + " sicher"}</small></span></li>
    </ul>

    <div class="section-h"><h3>Aussprache</h3></div>
    <ul class="set">
      <li><span>Akzent</span>${seg("accent", [["us", "🇺🇸 US"], ["uk", "🇬🇧 UK"]])}</li>
      <li><span>Sprechtempo</span>${seg("rate", [["0.75", "Langsam"], ["0.9", "Normal"], ["1", "Schnell"]])}</li>
      <li><span>Automatisch vorlesen</span>${seg("autoplay", [["true", "An"], ["false", "Aus"]])}</li>
      <li class="tap" id="voicetest"><span>Stimme testen</span></li>
    </ul>

    <div class="section-h"><h3>Allgemein</h3></div>
    <ul class="set">
      <li><span>Töne</span>${seg("sound", [["true", "An"], ["false", "Aus"]])}</li>
      <li class="tap" id="export"><span>Sicherung erstellen<small>Datei mit deinem Lernstand, z. B. in „Dateien“ speichern</small></span></li>
      <li class="tap" id="import"><span>Sicherung laden</span></li>
      <li class="tap danger" id="reset"><span>Alles zurücksetzen</span></li>
    </ul>
    <input type="file" id="file" accept="application/json,.json" hidden>

    <p class="small muted center" style="margin-top:22px">Sprachwerk · alles bleibt auf diesem Gerät, kein Konto, keine Werbung.<br>Tipp: In Safari über „Teilen → Zum Home-Bildschirm“ als App speichern.</p>
  </div>`;
  app.querySelectorAll("[data-set]").forEach((b) => (b.onclick = () => {
    const k = b.dataset.set; let v = b.dataset.v;
    if (v === "true" || v === "false") v = v === "true"; else if (!isNaN(+v) && k !== "accent") v = +v;
    S.settings[k] = v; save(); renderMore();
    if (k === "accent" || k === "rate") speak("Hello! This is how I sound.");
  }));
  app.querySelectorAll("[data-step]").forEach((b) => (b.onclick = () => {
    const k = b.dataset.step; S.settings[k] = Math.max(+b.dataset.min, Math.min(+b.dataset.max, S.settings[k] + +b.dataset.d)); save(); renderMore();
  }));
  $("#voicetest").onclick = () => speak("Hello! Nice to meet you. Let's learn English together.");
  $("#retest").onclick = startTest;
  $("#export").onclick = exportData;
  $("#import").onclick = () => $("#file").click();
  $("#file").onchange = importData;
  $("#reset").onclick = () => {
    if (!confirm("Wirklich alles löschen? Dein Lernstand ist dann weg.")) return;
    if (!confirm("Ganz sicher? Das kann nicht rückgängig gemacht werden.")) return;
    S = JSON.parse(JSON.stringify(DEFAULT)); save(); buildWords(); tab = "home"; render();
  };
}
async function exportData() {
  const blob = new Blob([JSON.stringify(S, null, 1)], { type: "application/json" });
  const name = `sprachwerk-sicherung-${today()}.json`;
  const file = new File([blob], name, { type: "application/json" });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: name }); return; }
  } catch (e) { if (e.name === "AbortError") return; }
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
      S = { ...DEFAULT, ...d, settings: { ...DEFAULT.settings, ...(d.settings || {}) } };
      save(); buildWords(); toast("Sicherung geladen"); tab = "home"; render();
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
  bg.querySelector(".sheet").addEventListener("click", (e) => {
    const d = e.target.closest("[data-del]"); if (!d) return;
    if (!confirm("Dieses eigene Wort löschen?")) return;
    const cid = d.dataset.del.slice(7);
    S.custom = S.custom.filter((c) => c.id !== cid); delete S.words[d.dataset.del];
    save(); buildWords(); closeSheet(); render();
  });
}
function closeSheet() { $("#sheet")?.remove(); }

// ---------- Start ----------
if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
document.addEventListener("visibilitychange", () => { if (!document.hidden && !Q && !T) render(); });
render();
window.__sw = { get S() { return S; }, WORDS: () => WORDS, todayPlan };
})();
