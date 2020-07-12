
 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/7.16.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.16.0/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 const  config= {
   apiKey: "AIzaSyCIydTBNl3xrZjElCsbJUNGpwqfke8xBa4",
   authDomain: "se-uni.firebaseapp.com",
   databaseURL: "https://se-uni.firebaseio.com",
   projectId: "se-uni",
   storageBucket: "se-uni.appspot.com",
   messagingSenderId: "761340183257",
   appId: "1:761340183257:web:2d8cb7d4670f4d4854f4c8"
 }
 firebase.initializeApp(config);
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]



// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
// [END background_handler]
