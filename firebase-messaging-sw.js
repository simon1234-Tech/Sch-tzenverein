importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDchsz_qOTMpvT48cKBYLqUmX30Lw39iGA",
  authDomain: "kb-sv-vereinsapp.firebaseapp.com",
  projectId: "kb-sv-vereinsapp",
  storageBucket: "kb-sv-vereinsapp.appspot.com",
  messagingSenderId: "1015802588615",
  appId: "1:1015802588615:web:bcecb74526a2096d2ebde2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'logo.jpg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
