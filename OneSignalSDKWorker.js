importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener("push", () => {
  if (self.navigator && "setAppBadge" in self.navigator) {
    self.navigator.setAppBadge(1).catch(() => {});
  }
});

const OFFLINE_CACHE = "kb-sv-offline-v1";
const OFFLINE_ASSETS = [
  "/Sch-tzenverein/",
  "/Sch-tzenverein/index.html",
  "/Sch-tzenverein/maskottchen.png",
  "/Sch-tzenverein/siegel.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(OFFLINE_CACHE).then((cache) => {
      return cache.addAll(OFFLINE_ASSETS).catch(() => {});
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("kb-sv-offline-") && key !== OFFLINE_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin && url.pathname.startsWith("/Sch-tzenverein/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(OFFLINE_CACHE).then((cache) => {
            cache.put(event.request, copy);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            return cached || caches.match("/Sch-tzenverein/index.html");
          });
        })
    );
  }
});
