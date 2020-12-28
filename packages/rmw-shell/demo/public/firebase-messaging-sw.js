importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyB31cMH9nJnERC1WCWA7lQHnY08voLs-Z0',
  authDomain: 'react-most-wanted-dev.firebaseapp.com',
  databaseURL: 'https://react-most-wanted-dev.firebaseio.com',
  projectId: 'react-most-wanted-dev',
  storageBucket: 'react-most-wanted-dev.appspot.com',
  messagingSenderId: '70650394824',
  appId: '1:70650394824:web:7cd3113c37741efc',
})

const messaging = firebase.messaging()
