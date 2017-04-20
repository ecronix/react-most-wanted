import * as types from './types';
import * as selectors from './selectors';
import Immutable from 'seamless-immutable';

const initialState=Immutable({
  isAuthorised: false,
  isMenuOpen: false
});

const auth = (state = initialState, action) => {

  switch (action.type) {

    //!!! DROP DOWN !!!
    case types.SIGN_IN_SUCCESS:
    case types.FETCH_SUCCESS:
    return {
      ...state,
      isMenuOpen: false,
      ...(selectors.getUser(action.user))
    };

    case types.SIGN_OUT_SUCCESS:
    return initialState;

    case types.AUTH_ERROR:
    return {...state, error: action.error};

    case types.SET_AUTH_MENU_OPEN:
    return {...state, isMenuOpen: action.open};

    default:
    return state;
  }
}

export default auth;
