// Offline-Cache. Bei Änderungen die Versionsnummer hochzählen.
const CACHE = "sprachwerk-v17";
const FILES = ["./", "index.html", "styles.css", "app.js", "data/en.js", "data/en-grammar.js", "data/en-dialogs.js", "data/en-packs.js", "data/en-reading.js", "data/en-mistakes.js", "data/en-sounds.js", "data/en-writing.js", "manifest.json", "fonts/bricolage.woff2", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Netz zuerst (damit Updates sofort ankommen), offline aus dem Cache
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-cache" }).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
