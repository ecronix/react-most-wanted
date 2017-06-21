import firebase from 'firebase';

const config= {
  firebase_config: {
    apiKey: "AIzaSyBQAmNJ2DbRyw8PqdmNWlePYtMP0hUcjpY",
    authDomain: "react-most-wanted-3b1b2.firebaseapp.com",
    databaseURL: "https://react-most-wanted-3b1b2.firebaseio.com",
    projectId: "react-most-wanted-3b1b2",
    storageBucket: "react-most-wanted-3b1b2.appspot.com",
    messagingSenderId: "258373383650"
  },
  firebase_providers: [
    firebase.auth.GoogleAuthProvider,
    firebase.auth.FacebookAuthProvider,
    firebase.auth.TwitterAuthProvider,
    firebase.auth.GithubAuthProvider,
    firebase.auth.EmailAuthProvider,
    firebase.auth.PhoneAuthProvider
  ],
  initial_state: {
    theme: 'dark',
    locale: 'en'
  },
  drawer_width: 256
}

export default config;
