import reducer from './reducer'
import * as selectors from './selectors';


describe('auth selectors', () => {


  it('getUser should return only user data', () => {

    const inputUser={
      displayName: 'Name',
      email: 'Email',
      emailVerified: false,
      isAnonymous: false,
      photoURL: 'img',
      uid: 'uid',
      providerData: null,
      test: 'test'
    }

    const expectedUser={
      displayName: 'Name',
      email: 'Email',
      emailVerified: false,
      isAnonymous: false,
      photoURL: 'img',
      uid: 'uid',
      providerData: null,
      isAuthorised: true
    }

    expect(
      selectors.getUser(inputUser)
    ).toEqual(expectedUser)
  });

  it('getUser should rspond to false input', () => {

    expect(
      selectors.getUser()
    ).toEqual({
      isAuthorised: false
    })
  });


  it('getValidationErrorMessage should return error message for fieldID', () => {

    const auth={
      error: {
        code: 'auth/week-password',
        message: 'Expected Message',
      }
    }

    expect(
      selectors.getValidationErrorMessage(auth, 'password')
    ).toEqual('Expected Message')
  });

  it('getValidationErrorMessage should undefined if no fieldID found', () => {

    const auth={
      error: {
        code: 'auth/week-password',
        message: 'Expected Message',
      }
    }

    expect(
      selectors.getValidationErrorMessage(auth, 'name')
    ).toEqual(undefined)
  });

  it('getValidationErrorMessage should undefined if no fieldID provided', () => {

    const auth={
      error: {
        code: 'auth/week-password',
        message: 'Expected Message',
      }
    }

    expect(
      selectors.getValidationErrorMessage()
    ).toEqual(undefined)
  });

  it('isAuthorised should return authorised state', () => {

    const auth={
      isAuthorised: false
    }

    expect(
      selectors.isAuthorised(auth)
    ).toEqual(false)
  });


})
