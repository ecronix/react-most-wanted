import firebase from 'firebase';
import { firebaseAuth, firebaseDb } from './firebase';

const getProvider = (provider) => {

  if(provider.indexOf('facebook')>-1){
    return new firebase.auth.FacebookAuthProvider();
  }

  if(provider.indexOf('github')>-1){
    return new firebase.auth.GithubAuthProvider();
  }

  if(provider.indexOf('google')>-1){
    return new firebase.auth.GoogleAuthProvider();
  }

  if(provider.indexOf('twitter')>-1){
    return new firebase.auth.TwitterAuthProvider();
  }

  throw new Error('Provider is not supported!!!');
};


export const isAuthorised = () => {
  const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));
  const data = JSON.parse(localStorage.getItem(key));
  return data != null;
}

export const updateUserData = (user) => {

  if(user!==undefined && user!==null){
    firebaseDb.ref('users/' + user.uid).update({
      displayName: user.displayName,
      email: user.email,
      emailVerified : user.emailVerified,
      isAnonymous : user.isAnonymous,
      photoURL : user.photoURL,
      providerData : user.providerData
    });
  }

}


export const reauthenticateWithCredential = (password) => {
  const credential = firebase.auth.EmailAuthProvider.credential(
    firebaseAuth.currentUser.email,
    password
  );

  return firebaseAuth.currentUser.reauthenticateWithCredential(credential);
}

export const loginWithProvider = (p) => firebaseAuth.signInWithPopup(getProvider(p));
export const loginUser = (user) => firebaseAuth.signInWithEmailAndPassword(user.email, user.password);
export const registerUser = (user) => firebaseAuth.createUserWithEmailAndPassword(user.email, user.password);
export const reauthenticateWithPopup = (provider) => firebaseAuth.currentUser.reauthenticateWithPopup(getProvider(provider));
export const linkWithPopup = (provider) => firebaseAuth.currentUser.linkWithPopup(getProvider(provider));
export const logoutUser = () => firebaseAuth.signOut();
export const resetPasswordEmail = (email) => firebaseAuth.sendPasswordResetEmail(email);
export const changePassword = (newPassword) => firebaseAuth.currentUser.updatePassword(newPassword);

export const deleteUser = () => firebaseAuth.currentUser.delete();
export const sendEmailVerification = () => firebaseAuth.currentUser.sendEmailVerification();

export const fetchUser = () => new Promise((resolve, reject) => {
  const unsub = firebaseAuth.onAuthStateChanged((user) => {
    unsub();
    resolve(user);
  }, (error) => {
    reject(error);
  });
});

export const changeEmail = (newEmail) => new Promise((resolve, reject) => {
  firebaseAuth.currentUser.updateEmail(newEmail)
  .then(() => {
    updateUserData(firebaseAuth.currentUser);
    resolve(firebaseAuth.currentUser)}
  )
  .catch((error) => reject(error))
});

export const updateUserProfile = (user) => new Promise((resolve, reject) => {
  firebaseAuth.currentUser.updateProfile(user)
  .then(() => {
    updateUserData(firebaseAuth.currentUser);
    resolve(firebaseAuth.currentUser)}
  )
  .catch((error) => reject(error))
});
