import { Reducer, Thunk } from 'redux-testkit';
import reducer from './reducer'
import * as selectors from './selectors';
import * as actions from './actions';
import Immutable from 'seamless-immutable';

const initialState=Immutable({
  isSignedIn: false,
  isMenuOpen: false
});

describe('auth reducer', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should not affect state', () => {
    Reducer(reducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });


  it('should handle SET_AUTH_MENU_OPEN', () => {
    Reducer(reducer).expect(actions.setAuthMenuOpen(true)).toReturnState({isSignedIn: false, isMenuOpen: true})
  })

  it('should handle SIGN_OUT_SUCCESS', () => {
    Reducer(reducer).expect(actions.signOutSuccess()).toReturnState(initialState)
  })

  it('should handle AUTH_ERROR', () => {

    const error={
      errorCode: 'code',
      errorMessage: 'message'
    }

    Reducer(reducer).expect(actions.authError(error)).toReturnState({...initialState, error})
  })


  it('should handle SIGN_IN_SUCCESS', () => {

    const user={
      name: 'Name',
      email: 'Email'
    }

    Reducer(reducer).expect(actions.signInSuccess(user)).toReturnState({
      isMenuOpen: false,
      isSignedIn: true,
      ...(selectors.getUser(user))
    })
  })



})
