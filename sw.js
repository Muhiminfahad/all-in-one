self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("cabinet-partB-cache-v1").then(cache => {
      return cache.addAll([
        "/all-in-one/",
        "/all-in-one/index.html",
        "/all-in-one/board_hardware_worker.html",
        "/all-in-one/manifest.json"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
