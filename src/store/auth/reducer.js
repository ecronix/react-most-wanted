import * as types from './types';
import Immutable from 'seamless-immutable';

export const initialState=Immutable({
  isAuthorised: false,
  isMenuOpen: false,
  isFetching: false,
  isEditing: false,
  isPasswordDialogOpen: false,
  isDeleteDialogOpen: false,
  isVerificationEmailSend: false,
  newPhotoURL: null,
});

const auth = (state = initialState, action) => {

  switch (action.type) {

    //!!! DROP DOWN !!!
    case types.SIGN_IN_SUCCESS:
    case types.AUTH_STATE_CHANGED:
    return {
      ...state,
      ...initialState,
      isAuthorised: true,
      error: undefined,
      ...(action.user)
    };

    case types.SIGN_OUT_SUCCESS:
    return initialState;

    case types.SET_FETCHING:
    case types.SET_IS_EDITING:
    return {...state, error: undefined,  ...action.payload};

    case types.AUTH_ERROR:
    return {...state, isFetching: false, error: action.error};

    case types.SET_AUTH_MENU_OPEN:
    return {...state, isMenuOpen: action.open};

    case types.SET_NEW_PHOTO_URL:
    return {...state, newPhotoURL: action.newPhotoURL};

    case types.SET_PASSWORD_DIALOG_OPEN:
    return {...state, isPasswordDialogOpen: action.open, onPasswordDialogSuccess: action.onSuccess};

    case types.SET_DELETE_DIALOG_OPEN:
    return {...state, isDeleteDialogOpen: action.open};

    case types.SET_IS_VERIFICATION_EMAIL_SEND:
    return {...state, isVerificationEmailSend: action.send, isFetching: false};

    default:
    return state;
  }
}

export default auth;
