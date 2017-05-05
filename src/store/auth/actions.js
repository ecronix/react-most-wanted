import * as auth from '../../utils/auth';
import * as types from './types';
import * as selectors from './selectors';
import { firebaseApp } from '../../utils/firebase';
import cuid  from 'cuid';


function fetchSuccess(user) {
  return {
    type: types.FETCH_SUCCESS,
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

export function signInSuccess(user) {
  return {
    type: types.SIGN_IN_SUCCESS,
    user
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

export const fetchUser = (props) => dispatch => {

  dispatch(setFetching(true));

  return auth.fetchUser(props)
  .then(user => dispatch(fetchSuccess(selectors.getUser(user))))
  .catch(error => dispatch(authError(error)));
}

export const signInWithProvider = (provider, onSuccess=null) => dispatch => {

  dispatch(setFetching(true));

  return auth.loginWithProvider(provider)
  .then((payload) => {

    dispatch(signInSuccess(selectors.getUser(payload.user)))

    if(onSuccess && onSuccess instanceof Function){
      onSuccess(selectors.getUser(payload.user));
    }

  })
  .catch((error) => {
    dispatch(authError(error))
  });
};

export const signOutUser = (user) => dispatch =>  {
  return auth.logoutUser(user)
  .then(() => dispatch(signOutSuccess()))
  .catch(error => dispatch(authError(error)));
};

export const deleteUser = (props) => dispatch =>  {
  return auth.deleteUser(props)
  .then(() => dispatch(signOutSuccess()))
  .catch(error => dispatch(authError(error)));
};


export const signInUser = (user) => dispatch =>  {

  dispatch(setFetching(true));

  return auth.loginUser(user)
  .then((result) => {
    dispatch(signInSuccess(selectors.getUser(result)))
  })
  .catch(error => dispatch(authError(error)));
}



export const updateUser = (user) =>  dispatch => {

  dispatch(setFetching(true));

  return auth.updateUserProfile(user)
  .then((payload) => {
    dispatch(signInSuccess(selectors.getUser(payload)))
  })
  .catch(error => dispatch(authError(error)));

}

export const updateUserPhoto = (dataURL, fileName=cuid()) => dispatch =>  {

  let storageRef=firebaseApp.storage().ref('photoURLS');
  let uploadTask = storageRef.child(`${fileName}`).putString(dataURL, 'data_url');

  uploadTask.on('state_changed',
  function(snapshot) {
    dispatch(setFetching(true));
  }, function(error) {
    dispatch(authError(error));
  }, function() {
    dispatch(updateUser({photoURL: uploadTask.snapshot.downloadURL}));
  });
}

export const signUpUser = (user) => dispatch => {

  dispatch(setFetching(true));

  return auth.registerUser(user)
  .then((payload) => {
    dispatch(signInSuccess(selectors.getUser(payload)));
    dispatch(updateUser(user));
  })
  .catch(error => dispatch(authError(error)));
};


export const reauthenticateUserWithCredential = (password, onSuccess) => dispatch => {

  return auth.reauthenticateWithCredential(password)
  .then(() => {
    if(onSuccess && onSuccess instanceof Function){
      onSuccess();
    }
  })
  .catch(error => dispatch(authError(error)));
};

export const reauthenticateUserWithPopup = (provider, onSuccess) => dispatch => {

  return auth.reauthenticateWithPopup(provider)
  .then(() => {
    if(onSuccess && onSuccess instanceof Function){
      onSuccess();
    }
  })
  .catch(error => dispatch(authError(error)));
};



export const reauthenticateUser = (auth, onSuccess) => dispatch => {

  if(auth &&  auth.providerData!==undefined && Array.isArray(auth.providerData) && auth.providerData[0].providerId!=='password'){
    dispatch(reauthenticateUserWithPopup(auth.providerData[0].providerId, onSuccess));
  }else{
    dispatch(setPasswordDialogOpen(true, onSuccess));
  }
};


export const resetPasswordEmail = (email, onSuccess) => dispatch => {
  return auth.resetPasswordEmail(email)
  .then(() => {
    if(onSuccess && onSuccess instanceof Function){
      onSuccess();
    }
  })
  .catch(error => dispatch(authError(error)));
};

export const sendEmailVerification = (props) => dispatch => {

  dispatch(setFetching(true));

  return auth.sendEmailVerification(props)
  .then(() => {
    dispatch(setIsVerficationEmailSend(true));
  })
  .catch(error => dispatch(authError(error)));

};

export const changePassword = (newPassword, onSuccess) => dispatch => {

  dispatch(setFetching(true));

  return auth.changePassword(newPassword)
  .then((payload) => {

    dispatch(setFetching(false));

    if(onSuccess && onSuccess instanceof Function){
      onSuccess(payload);
    }
  })
  .catch(error => dispatch(authError(error)));
}



export const linkUserWithPopup = (provider, onSuccess) => dispatch => {

  return auth.linkWithPopup(provider)
  .then(() => {

    dispatch(fetchUser());

    if(onSuccess && onSuccess instanceof Function){
      onSuccess();
    }
  })
  .catch(error => dispatch(authError(error)));
};

export const changeEmail = (newEmail, onSuccess) => dispatch => {

  dispatch(setFetching(true));

  return auth.changeEmail(newEmail)
  .then((payload) => {
    dispatch(fetchUser());
    if(onSuccess && onSuccess instanceof Function){
      onSuccess(payload);
    }
  })
  .catch(error => dispatch(authError(error)));
}
