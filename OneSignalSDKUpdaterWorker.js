importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener("push", () => {
  if (self.navigator && "setAppBadge" in self.navigator) {
    self.navigator.setAppBadge(1).catch(() => {});
  }
});


