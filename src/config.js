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
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
}

export default config;
