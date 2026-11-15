// Firebase SDKs im Service Worker laden (kompatibel zur App-Version 10.14.1)
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

// Firebase Konfiguration initialisieren (exakter Abgleich mit index.html)
const firebaseConfig = {
  apiKey: "AIzaSyDchsz_qOTMpvT48cKBYLqUmX30Lw39iGA",
  authDomain: "kb-sv-vereinsapp.firebaseapp.com",
  projectId: "kb-sv-vereinsapp",
  storageBucket: "kb-sv-vereinsapp.firebasestorage.app",
  messagingSenderId: "1015802588615",
  appId: "1:1015802588615:web:bcecb74526a2096d2ebde2"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Hintergrund-Nachrichten empfangen und Benachrichtigung mit Vereinslogo anzeigen
messaging.onBackgroundMessage((payload) => {
  const notif = (payload && payload.notification) ? payload.notification : {};
  const data = (payload && payload.data) ? payload.data : {};

  const notificationTitle = notif.title || data.title || 'KB & SV Gaschurn-Partenen';
  const notificationOptions = {
    body: notif.body || data.body || 'Neue Nachricht in der Vereins-App',
    icon: 'logo.png',
    badge: 'logo.png',
    data: { url: data.url || './' }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification && event.notification.data && event.notification.data.url) || './';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
