import * as types from './types';
import * as selectors from './selectors';
import FirebaseAuth from '../../firebase/auth';

const firebaseAuth= new FirebaseAuth({
  onAuthStateChanged: onAuthStateChanged,
  onLogoutUser: signOutSuccess,
  onFetchChanged: setFetching,
  onAuthError: authError,
}, selectors.getUser);


export function initAuth(onSuccess) {
  return (dispatch, getState) => {
    firebaseAuth.subscribe(dispatch, getState, onSuccess);
  };
}

export function onAuthStateChanged(user) {
  return {
    type: types.AUTH_STATE_CHANGED,
    user
  };
}

export function setFetching(isFetching) {
  return {
    type: types.SET_FETCHING,
    payload: {isFetching}
  };
}

export function setIsEditing(isEditing) {
  return {
    type: types.SET_IS_EDITING,
    payload: {isEditing}
  };
}

export function signOutSuccess() {
  return {
    type: types.SIGN_OUT_SUCCESS
  };
}

export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    error
  };
}

export function setAuthMenuOpen(open) {
  return {
    type: types.SET_AUTH_MENU_OPEN,
    open
  };
}

export function setDeleteDialogOpen(open) {
  return {
    type: types.SET_DELETE_DIALOG_OPEN,
    open
  };
}

export function setPasswordDialogOpen(open, onSuccess=undefined) {
  return {
    type: types.SET_PASSWORD_DIALOG_OPEN,
    open,
    onSuccess
  };
}

export function setNewPhotoURL(newPhotoURL) {
  return {
    type: types.SET_NEW_PHOTO_URL,
    newPhotoURL
  };
}

export function setIsVerficationEmailSend(send) {
  return {
    type: types.SET_IS_VERIFICATION_EMAIL_SEND,
    send
  };
}

export const signInWithProvider = (provider, onSuccess) => dispatch => firebaseAuth.signInWithPopup(provider, ()=>{onSuccess()});
export const deleteUser = (props) => dispatch => firebaseAuth.deleteProfile(props);
export const signUpUser = (user) =>  dispatch => firebaseAuth.createUserWithEmailAndPassword(user);
export const signInUser = (user, onSuccess=null) =>  dispatch => firebaseAuth.signInWithEmailAndPassword(user, onSuccess);
export const signOutUser = () =>  dispatch => firebaseAuth.signOut();
export const updateUser = (user) =>  dispatch => firebaseAuth.updateProfile(user);
export const reauthenticateUserWithCredential = (password, onSuccess=null) =>  dispatch => firebaseAuth.reauthenticateWithCredential(password, onSuccess);
export const reauthenticateUserWithPopup = (provider, onSuccess=null) =>  dispatch => firebaseAuth.reauthenticateWithPopup(provider, onSuccess);
export const linkUserWithPopup = (provider, onSuccess=null) =>  dispatch => firebaseAuth.linkWithPopup(provider, onSuccess);
export const changePassword = (newPassword, onSuccess=null) =>  dispatch => firebaseAuth.updatePassword(newPassword, onSuccess);
export const changeEmail = (newEmail, onSuccess=null) =>  dispatch => firebaseAuth.updateEmail(newEmail, onSuccess);
export const resetPasswordEmail = (email, onSuccess=null) =>  dispatch => firebaseAuth.sendPasswordResetEmail(email, onSuccess);
export const sendEmailVerification = () =>  dispatch => firebaseAuth.sendEmailVerification(dispatch(setIsVerficationEmailSend(true)));
export const updateUserPhoto = (dataURL) =>  dispatch => firebaseAuth.updateUserPhoto(dataURL);


export const reauthenticateUser = (auth, onSuccess) => dispatch => {

  if(auth &&  auth.providerData!==undefined && Array.isArray(auth.providerData) && auth.providerData[0].providerId!=='password'){
    dispatch(reauthenticateUserWithPopup(auth.providerData[0].providerId, onSuccess));
  }else{
    dispatch(setPasswordDialogOpen(true, onSuccess));
  }
};
