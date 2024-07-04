<template>
  <router-view></router-view>
</template>
<script setup>
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBTotN9vQoBZlxQY2UG1TuGEZ7rpkWZt70",
          authDomain: "be-for-gr-180e7.firebaseapp.com",
          projectId: "be-for-gr-180e7",
          storageBucket: "be-for-gr-180e7.appspot.com",
          messagingSenderId: "483915681179",
          appId: "1:483915681179:web:bcc760df56ee3c5044a53e",
          measurementId: "G-0FG12P4QPH"
};


const app = initializeApp(firebaseConfig);


// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

getToken(messaging, { vapidKey: 'BAffji7PkXTfbxfExeCdiORnNzDdfG-nYcSX-MKZ_t29PlmV87swAMV7MsN7n3tohTW6K2saSCXLS31wkR-A36o' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log("Token is:",currentToken);
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

</script>