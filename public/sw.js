// FastCV PK Service Worker v5 — Network First (always fresh CSS/JS)
const CACHE_NAME = "fastcvpk-cache-v5";
const STATIC_ASSETS = [
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/logo.png",
  "/manifest.json"
];

// Install: cache only static assets, skip waiting immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch(() => {})
  );
});

// Activate: delete ALL old caches immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log("[SW] Deleting old cache:", name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: NETWORK FIRST for everything — ensures fresh CSS/JS always
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Network-first: try network, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache static assets only
        if (
          networkResponse.ok &&
          STATIC_ASSETS.some((asset) => url.pathname === asset)
        ) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() => {
        // Only fallback to cache if network fails
        return caches.match(event.request);
      })
  );
});
