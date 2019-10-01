const version = "v1.0.1";
const urlsToCache = [`/`, `/icon-144x144.png`, `/blue-bird.js`];
const staticCacheName = "blue-bird-" + version;

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith("blue-bird-"))
          .filter(cacheName => cacheName !== staticCacheName)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match("/");
      })
  );
});
