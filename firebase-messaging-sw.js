// Firebase SDKs im Service Worker laden
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Firebase Konfiguration initialisieren
firebase.initializeApp({
  apiKey: "AIzaSyDchsz_qOTMpvT48cKBYLqUmX30Lw39iGA",
  authDomain: "kb-sv-vereinsapp.firebaseapp.com",
  projectId: "kb-sv-vereinsapp",
  storageBucket: "kb-sv-vereinsapp.appspot.com",
  messagingSenderId: "1015802588615",
  appId: "1:1015802588615:web:bcecb74526a2096d2ebde2"
});

const messaging = firebase.messaging();

// Hintergrund-Nachrichten empfangen und Benachrichtigung anzeigen
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Empfangene Hintergrund-Nachricht:', payload);
  
  const notificationTitle = payload.notification.title || 'KB & SV Gaschurn-Partenen';
  const notificationOptions = {
    body: payload.notification.body || 'Neue Nachricht in der Vereins-App',
    icon: 'logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
