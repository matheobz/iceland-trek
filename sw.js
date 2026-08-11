// désert·à·mer — service worker
// Stratégie : on cache le "shell" (l'app elle-même) pour qu'elle s'ouvre sans réseau.
// Les données météo (Open-Meteo) ne sont jamais mises en cache ici : elles ont besoin
// de réseau, et le repli hors-ligne est géré côté app via la dernière météo enregistrée.

const CACHE = "desert-a-mer-v7";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./favicon-32.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Ne jamais intercepter les appels météo : toujours réseau direct.
  if (url.hostname.includes("open-meteo.com")) return;
  // Shell : cache d'abord, réseau en repli.
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).catch(() => caches.match("./index.html")))
  );
});
