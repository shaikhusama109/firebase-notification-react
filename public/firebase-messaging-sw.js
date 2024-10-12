importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
importScripts("swEnv.js");
const firebaseConfig = {
  apiKey: swEnv.VITE_API_KEY,
  projectId: swEnv.VITE_PROJECT_ID,
  messagingSenderId: swEnv.VITE_MESSAGING_SENDER_ID,
  appId: swEnv.VITE_APP_ID,
  authDomain: swEnv.VITE_AUTH_DOMAIN,
  storageBucket: swEnv.VITE_STORAGE_BUCKET,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging(firebaseApp);

const backgrounMessaging = firebase.messaging(firebaseApp)
messaging.onBackgroundMessage(backgrounMessaging, function (payload) {

  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});