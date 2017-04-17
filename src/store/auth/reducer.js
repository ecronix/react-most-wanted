import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initalState={
  isSignedIn: false,
  isMenuOpen: false
}

const auth = (state = Immutable(initalState), action) => {

  switch (action.type) {
    case types.SIGN_IN:
    const profile=action.auth;
    return {...state, isSignedIn: true, ...profile};

    case types.SIGN_OUT:
    return initalState;

    case types.SET_AUTH_MENU_OPEN:
    return {...state, isMenuOpen: action.open};

    default:
    return state;
  }
}

export default auth;
