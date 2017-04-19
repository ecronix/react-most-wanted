import reducer from './reducer'
import * as selectors from './selectors';


describe('auth selectors', () => {


  it('getUser should return only user data', () => {

    const inputUser={
      displayName: 'Name',
      email: 'Email',
      photoURL: 'img',
      uid: 'uid',
      test: 'test'
    }

    const expectedUser={
      name: 'Name',
      email: 'Email',
      img: 'img',
      uid: 'uid',
      isSignedIn: true
    }

    expect(
      selectors.getUser(inputUser)
    ).toEqual(expectedUser)
  });

  it('getUser should rspond to false input', () => {

    expect(
      selectors.getUser()
    ).toEqual({
      isSignedIn: false
    })
  });


  it('getValidationErrorMessage should return error message for fieldID', () => {

    const auth={
      error: {
        errorCode: 'auth/week-password',
        errorMessage: 'Expected Message',
      }
    }

    expect(
      selectors.getValidationErrorMessage(auth, 'password')
    ).toEqual('Expected Message')
  });

  it('getValidationErrorMessage should undefined if no fieldID found', () => {

    const auth={
      error: {
        errorCode: 'auth/week-password',
        errorMessage: 'Expected Message',
      }
    }

    expect(
      selectors.getValidationErrorMessage(auth, 'name')
    ).toEqual(undefined)
  });

  it('getValidationErrorMessage should undefined if no fieldID provided', () => {

    const auth={
      error: {
        errorCode: 'auth/week-password',
        errorMessage: 'Expected Message',
      }
    }

    expect(
      selectors.getValidationErrorMessage()
    ).toEqual(undefined)
  });


})
