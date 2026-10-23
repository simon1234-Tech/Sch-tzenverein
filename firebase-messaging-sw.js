try {
  importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging-compat.js');

  firebase.initializeApp({
    apiKey: "AIzaSyDchsz_qOTMpvT48cKBYLqUmX30Lw39iGA",
    authDomain: "kb-sv-vereinsapp.firebaseapp.com",
    projectId: "kb-sv-vereinsapp",
    storageBucket: "kb-sv-vereinsapp.appspot.com",
    messagingSenderId: "1015802588615",
    appId: "1:1015802588615:web:bcecb74526a2096d2ebde2"
  });

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification?.title || 'Vereins-App';
    const notificationOptions = {
      body: payload.notification?.body || 'Neue Nachricht eingetroffen.',
      icon: 'logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (error) {
  console.error('[Service Worker] Initialisierungsfehler:', error);
}
