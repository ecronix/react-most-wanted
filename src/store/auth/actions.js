import * as types from './actionTypes';

export function signIn(auth) {
  return {
    type: types.SIGN_IN,
    auth
  };
}

export function signOut() {
  return {
    type: types.SIGN_OUT,
  };
}

export function setAuthMenuOpen(open) {
  return {
    type: types.SET_AUTH_MENU_OPEN,
    open
  };
}
