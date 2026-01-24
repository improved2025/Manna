const CACHE_NAME = "manna-cache-v6";

const OFFLINE_URL = "/offline";

const ASSETS_TO_CACHE = [
  "/",
  "/welcome",
  "/landing",
  "/help",
  "/surrender",
  "/offline",
  "/manifest.webmanifest",

  // icons
  "/icons/manna-icon-v2.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Install: cache core pages
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: network first, fallback to cache, then offline
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => {
          return cached || caches.match(OFFLINE_URL);
        })
      )
  );
});
