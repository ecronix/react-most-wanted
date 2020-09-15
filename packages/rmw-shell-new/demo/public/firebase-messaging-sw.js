importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js')
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyB31cMH9nJnERC1WCWA7lQHnY08voLs-Z0',
  authDomain: 'react-most-wanted-dev.firebaseapp.com',
  databaseURL: 'https://react-most-wanted-dev.firebaseio.com',
  projectId: 'react-most-wanted-dev',
  storageBucket: 'react-most-wanted-dev.appspot.com',
  messagingSenderId: '70650394824',
  appId: '1:70650394824:web:7cd3113c37741efc',
})
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
