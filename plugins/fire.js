import * as firebase from "firebase";
import 'firebase/messaging'

const config = {
  apiKey: "AIzaSyCIydTBNl3xrZjElCsbJUNGpwqfke8xBa4",
  authDomain: "se-uni.firebaseapp.com",
  databaseURL: "https://se-uni.firebaseio.com",
  projectId: "se-uni",
  storageBucket: "se-uni.appspot.com",
  messagingSenderId: "761340183257",
  appId: "1:761340183257:web:2d8cb7d4670f4d4854f4c8"
};
const fire = {
  setup: () => {
    firebase.initializeApp(config)
    console.log(firebase)
    const messaging = firebase.messaging()
    messaging.usePublicVapidKey("BBPRSENJbGnhHS_PJeMHuUa9buQkFXhDXGch4fH44sXGmKGpeOFrWXcfZt4xDWWdSZ2spQdijqMk33TGNfmvK8A");
    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      // ...
    });

    navigator.serviceWorker.register('/firebase-messaging-sw.js').then(reg => {
      messaging.useServiceWorker(reg)
    }).catch(err => {
      console.log(err)
    })
     messaging.getToken().then(token => {
       if (!token) console.log("not")
       console.log('token:', token)

     })
    return messaging
  },
}
export default fire
// messaging.getToken().then((currentToken) => {
//   if (currentToken) {
//     sendTokenToServer(currentToken);
//     updateUIForPushEnabled(currentToken);
//   } else {
//     // Show permission request.
//     console.log('No Instance ID token available. Request permission to generate one.');
//     // Show permission UI.
//     updateUIForPushPermissionRequired();
//     setTokenSentToServer(false);
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
//   showToken('Error retrieving Instance ID token. ', err);
//   setTokenSentToServer(false);
// });
//   services: {
//     messaging: {
//       createServiceWorker: true,
//         actions: [
//         {
//           action: 'proposalUpdated',
//           url: '/'
//         }
//       ],
//         fcmPublicVapidKey: 'BBPRSENJbGnhHS_PJeMHuUa9buQkFXhDXGch4fH44sXGmKGpeOFrWXcfZt4xDWWdSZ2spQdijqMk33TGNfmvK8A' // OPTIONAL : Sets vapid key for FCM after initialization
//     }
//   }
// // options
// },

