import FireBaseTools from '../../utils/firebase';
import * as types from './types';

export function signInWithProvider(provider, onSuccess=null) {

  return dispatch => {
    FireBaseTools.loginWithProvider(provider)
    .then((payload) => {
      if (payload.errorCode) {
        dispatch(authError(payload))
      } else {
        dispatch(signInSuccess(payload.user))

        if(onSuccess && onSuccess instanceof Function){
          onSuccess(payload.user);
        }
      }
    })
    .catch(error => dispatch(authError(error)));
  };

}

export function signOutUser(user) {

  return dispatch => {
    FireBaseTools.logoutUser(user)
    .then(result => dispatch(signOutSuccess(result)))
    .catch(error => dispatch(authError(error)));
  };

}

export function signInUser(user) {

  return dispatch => {
    FireBaseTools.loginUser(user)
    .then((payload) => {
      if (payload.errorCode) {
        dispatch(authError(payload))
      } else {
        dispatch(signInSuccess(payload))
      }
    })
    .catch(error => dispatch(authError(error)));
  };

}

export function signUpUser(user) {

  return dispatch => {
    FireBaseTools.registerUser(user)
    .then((payload) => {
      if (payload.errorCode) {
        dispatch(authError(payload))
      } else {
        dispatch(signInSuccess(payload))
      }
    })
    .catch(error => dispatch(authError(error)));
  };

}

export function updateUser(user) {

  return dispatch => {
    FireBaseTools.updateUserProfile(user)
    .then((payload) => {
      if (payload.errorCode) {
        dispatch(authError(payload))
      } else {
        dispatch(signInSuccess(payload))
      }
    })
    .catch(error => dispatch(authError(error)));
  };

}

export function fetchUser() {

  return dispatch => {
    FireBaseTools.fetchUser()
    .then(result => dispatch(fetchSuccess(result)))
    .catch(error => dispatch(authError(error)));
  };

}

export function signInSuccess(user) {
  return {
    type: types.SIGN_IN_SUCCESS,
    user
  };
}



export function signOutSuccess(payload) {
  return {
    type: types.SIGN_OUT_SUCCESS,
    payload
  };
}

function fetchSuccess(user) {
  return {
    type: types.FETCH_SUCCESS,
    user
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

// TODO:
/*
export function changePassword(newPassword) {
  const request = FireBaseTools.changePassword(newPassword);
  return {
    type: CHANGE_FIREBASE_USER_PASSWORD,
    payload: request,
  };
}

export function resetPasswordEmail(email) {
  const request = FireBaseTools.resetPasswordEmail(email);
  return {
    type: FIREBASE_PASSWORD_RESET_EMAIL,
    payload: request,
  };
}

 */
