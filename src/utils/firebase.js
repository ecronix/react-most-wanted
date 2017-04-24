import firebase from 'firebase';
//import gcloud from 'google-cloud';
import config from '../config';

//const gcloud = require('google-cloud')(config.FIREBASE_CONFIG);

export const firebaseApp = firebase.initializeApp(config.FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
//export const firebaseSt = firebaseApp.storage().ref();
