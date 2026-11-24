importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener("push", () => {
  if (self.navigator && "setAppBadge" in self.navigator) {
    self.navigator.setAppBadge(1).catch(() => {});
  }
});

const OFFLINE_CACHE = "kb-sv-offline-v4";
const OFFLINE_ASSETS = [
  "/Sch-tzenverein/",
  "/Sch-tzenverein/index.html",
  "/Sch-tzenverein/logo.png",
  "/Sch-tzenverein/maskottchen-boese.jpg",
  "/Sch-tzenverein/siegel.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(OFFLINE_CACHE).then((cache) => {
      return cache.addAll(OFFLINE_ASSETS).catch(() => {});
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("kb-sv-offline-") && key !== OFFLINE_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin && url.pathname.startsWith("/Sch-tzenverein/")) {
    const isHtml = event.request.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.endsWith("/");
    event.respondWith(
      fetch(isHtml ? new Request(event.request.url, { cache: "no-store" }) : event.request)
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
