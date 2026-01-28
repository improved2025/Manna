const CACHE_NAME = "manna-cache-v9";
const OFFLINE_URL = "/offline";

// Cache the offline page for sure (never fail the whole install because of one asset)
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
      } catch (e) {
        // If even this fails, offline cannot work — but don't crash install.
        // We'll still activate and try runtime caching.
      }
    })()
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Clean old caches
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)));

      // Enable navigation preload (where supported)
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }

      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const isNavigation = event.request.mode === "navigate";

  if (isNavigation) {
    event.respondWith(
      (async () => {
        try {
          // Use preload if available
          const preload = await event.preloadResponse;
          if (preload) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, preload.clone());
            return preload;
          }

          // Try network
          const network = await fetch(event.request);

          // Cache successful navigations
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, network.clone());

          return network;
        } catch (err) {
          // If offline, try cached page first
          const cached = await caches.match(event.request);
          if (cached) return cached;

          // Final fallback: offline page
          const offline = await caches.match(OFFLINE_URL);
          return offline || new Response("Offline", { status: 503 });
        }
      })()
    );
    return;
  }

  // Non-navigation: cache-first, then network
  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;

      try {
        const network = await fetch(event.request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, network.clone());
        return network;
      } catch {
        return new Response("", { status: 504 });
      }
    })()
  );
});

// -----------------------------
// PUSH NOTIFICATIONS (MANNA)
// -----------------------------
self.addEventListener("push", (event) => {
  // Locked copy
  const title = "MANNA";
  const body = "Today’s manna is ready.";

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag: "manna-daily",     // collapse duplicates
      renotify: false,        // no repeated buzzing
      data: { url: "/today" } // where to open
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/today";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
