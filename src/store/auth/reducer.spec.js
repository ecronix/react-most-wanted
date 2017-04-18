import { Reducer } from 'redux-testkit';
import reducer from './reducer'
import {signIn, signOut, setAuthMenuOpen} from './actions';

const initialState={
  isSignedIn: false,
  isMenuOpen: false
}

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should not affect state', () => {
    Reducer(reducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });


  it('should handle SIGN_IN', () => {
    const user={name: 'Name', email: 'Email'};
    Reducer(reducer).expect(signIn(user)).toReturnState({...initialState, isSignedIn: true, ...user})
  })

  it('should handle SIGN_OUT', () => {
    Reducer(reducer).expect(signOut()).toReturnState(initialState)
  })

  it('should handle SET_AUTH_MENU_OPEN', () => {
    Reducer(reducer).expect(setAuthMenuOpen(true)).toReturnState({...initialState, isMenuOpen: true})
  })

})
