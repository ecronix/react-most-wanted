import firebase from 'firebase';
import { firebaseAuth } from './firebase';


const getProvider = (provider) => {
  switch (provider) {
    case 'facebook':
    return new firebase.auth.FacebookAuthProvider();
    case 'github':
    return new firebase.auth.GithubAuthProvider();
    case 'google':
    return new firebase.auth.GoogleAuthProvider();
    case 'twitter':
    return new firebase.auth.TwitterAuthProvider();
    default:
    throw new Error('Provider is not supported!!!');
  }
};


export const isAuthorised = () => {
  const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));
  const data = JSON.parse(localStorage.getItem(key));
  return data != null;
}

export const loginWithProvider = (p) => firebaseAuth.signInWithPopup(getProvider(p));
export const registerUser = (user) => firebaseAuth.createUserWithEmailAndPassword(user.email, user.password);
export const loginUser = (user) => firebaseAuth.signInWithEmailAndPassword(user.email, user.password);
export const logoutUser = () => firebaseAuth.signOut();
export const resetPasswordEmail = (email) => firebaseAuth.sendPasswordResetEmail(email);
export const changePassword = (newPassword) => firebaseAuth.currentUser.updatePassword(newPassword);
export const sendEmailVerification = () => firebaseAuth.currentUser.sendEmailVerification();

export const updateUserProfile = (user) => firebaseAuth.currentUser.updateProfile(user)
.then(()=>(firebaseAuth.currentUser))
.catch(error=>error);

export const fetchUser = () => new Promise((resolve, reject) => {
  const unsub = firebaseAuth.onAuthStateChanged((user) => {
    unsub();
    resolve(user);
  }, (error) => {
    reject(error);
  });
});
