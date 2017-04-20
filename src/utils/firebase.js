import firebase from 'firebase';
import config from '../config';

export const firebaseApp = firebase.initializeApp(config.FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();

const FireBaseTools = {


/**
* Send an account email verification message for the currently logged in user
*
* @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
*/
sendEmailVerification: () => firebaseAuth.currentUser.sendEmailVerification().then(() => ({
  message: 'Email sent',
}), error => ({
  errorCode: error.code,
  errorMessage: error.message,
})),

/**
* Get the firebase database reference.
*
* @param path {!string|string}
* @returns {!firebase.database.Reference|firebase.database.Reference}
*/
getDatabaseReference: path => firebaseDb.ref(path),
};

export default FireBaseTools;
