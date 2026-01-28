const CACHE_NAME = "student-hub-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ⚠️ PAS de cache HTML (évite les bugs)
self.addEventListener("fetch", event => {
  if (event.request.destination === "document") return;
});

