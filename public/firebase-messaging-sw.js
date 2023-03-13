// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCQxy9QcFHmRHyx-uDgI26SPMy6pXX0Wms",
  authDomain: "question-answere.firebaseapp.com",
  projectId: "question-answere",
  storageBucket: "question-answere.appspot.com",
  messagingSenderId: "816587088072",
  appId: "1:816587088072:web:5e2354bb8ce90b263f45fd",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
