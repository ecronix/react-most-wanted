import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState={
  isSignedIn: false,
  isMenuOpen: false
}

const auth = (state = Immutable(initialState), action) => {

  switch (action.type) {
    case types.SIGN_IN:
    const profile=action.auth;
    return {...state, isSignedIn: true, ...profile};

    case types.SIGN_OUT:
    return initialState;

    case types.SET_AUTH_MENU_OPEN:
    return {...state, isMenuOpen: action.open};

    default:
    return state;
  }
}

export default auth;
