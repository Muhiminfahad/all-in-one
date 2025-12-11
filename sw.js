const CACHE_NAME = 'cabinet-partB-cache-v4';
const ASSETS = [
  '/all-in-one/',
  '/all-in-one/index.html',
  '/all-in-one/board_hardware_worker.html',
  '/all-in-one/manifest.json',
  '/all-in-one/icons/icon-192.png',
  '/all-in-one/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k === CACHE_NAME ? null : caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
