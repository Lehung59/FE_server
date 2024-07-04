// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBTotN9vQoBZlxQY2UG1TuGEZ7rpkWZt70",
  authDomain: "be-for-gr-180e7.firebaseapp.com",
  projectId: "be-for-gr-180e7",
  storageBucket: "be-for-gr-180e7.appspot.com",
  messagingSenderId: "483915681179",
  appId: "1:483915681179:web:bcc760df56ee3c5044a53e",
  measurementId: "G-0FG12P4QPH"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,

    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });