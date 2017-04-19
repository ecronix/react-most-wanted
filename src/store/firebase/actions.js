import FireBaseTools from '../../utils/firebase';
import {
  LOGIN_WITH_PROVIDER_FIREBASE,
  REGISTER_FIREBASE_USER,
  LOGIN_FIREBASE_USER,
  FETCH_FIREBASE_USER,
  UPDATE_FIREBASE_USER,
  CHANGE_FIREBASE_USER_PASSWORD,
  FIREBASE_PASSWORD_RESET_EMAIL,
  LOGOUT_FIREBASE_USER,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR
} from './types';


export function authenticate(provider) {
  return dispatch => {
    FireBaseTools.loginWithProvider(provider)
    .then(result => dispatch(signInSuccess(result)))
    .catch(error => dispatch(signInError(error)));
  };
}

export function signInSuccess(result) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user
  };
}

export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    payload: error
  };
}

export function loginWithProvider(provider) {
  const request = FireBaseTools.loginWithProvider(provider);
  return {
    type: LOGIN_WITH_PROVIDER_FIREBASE,
    payload: request,
  };
}

export function registerUser(user) {
  const request = FireBaseTools.registerUser(user);
  return {
    type: REGISTER_FIREBASE_USER,
    payload: request,
  };
}

export function loginUser(user) {
  const request = FireBaseTools.loginUser(user);
  return {
    type: LOGIN_FIREBASE_USER,
    payload: request,
  };
}

export function fetchUser() {
  const request = FireBaseTools.fetchUser();
  return {
    type: FETCH_FIREBASE_USER,
    payload: request,
  };
}

export function updateUser(user) {
  const request = FireBaseTools.updateUserProfile(user);
  return {
    type: UPDATE_FIREBASE_USER,
    payload: request,
  };
}

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

export function logoutUser(user) {
  const request = FireBaseTools.logoutUser(user);
  return {
    type: LOGOUT_FIREBASE_USER,
    payload: request,
  };
}
