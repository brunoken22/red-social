// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

// Tu configuración de Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDY0au5x6QgwjHw8UhpBEJDVC6-ASKAOFI",
  authDomain: "unired-55098.firebaseapp.com",
  projectId: "unired-55098",
  storageBucket: "unired-55098.firebasestorage.app",
  messagingSenderId: "1062171130331",
  appId: "1:1062171130331:web:f54f6222788d1627124ffe",
  measurementId: "G-0CW2WETLQ2",
});

// Inicializa el servicio de mensajería
const messaging = firebase.messaging();

// Muestra notificaciones cuando la app está en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Recibido mensaje en background: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || "/icon512_maskable.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener(
  "notificationclick",
  (event) => {
    event.notification.close();
    if (event.action === "archive") {
      // User selected the Archive action.
      archiveEmail();
    } else {
      // User selected (e.g., clicked in) the main body of notification.
      clients.openWindow("/perfil");
    }
  },
  false
);
