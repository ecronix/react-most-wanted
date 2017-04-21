import * as types from './types';
import Immutable from 'seamless-immutable';

const initialState=Immutable({
  isAuthorised: false,
  isMenuOpen: false,
  isFetching: false
});

const auth = (state = initialState, action) => {

  switch (action.type) {

    //!!! DROP DOWN !!!
    case types.SIGN_IN_SUCCESS:
    case types.FETCH_SUCCESS:
    return {
      ...state,
      isMenuOpen: false,
      isFetching: false,
      error: undefined,
      ...(action.user)
    };

    case types.SIGN_OUT_SUCCESS:
    return initialState;

    case types.SET_FETCHING:
    return {...state, error: undefined,  isFetching: action.isFetching};

    case types.AUTH_ERROR:
    return {...state, isFetching: false, error: action.error};

    case types.SET_AUTH_MENU_OPEN:
    return {...state, isMenuOpen: action.open};

    default:
    return state;
  }
}

export default auth;
