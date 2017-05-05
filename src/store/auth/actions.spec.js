
import { Reducer, Thunk } from 'redux-testkit';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { FlushThunks } from 'redux-testkit';
import * as reducers from '../reducers';
import * as selectors from './selectors';
import * as actions from './actions';
import * as types from './types';
import { initialState } from './reducer';
jest.mock('../../utils/auth')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('auth actions', () => {


  it('empty test', () => {
    expect(1).toBe(1)
  })




  // TODO: Revrite the tests for firebase-auth
  /*

  it('should handle signInWithProvider success', () => {

  const store = mockStore(initialState)
  const spy=jest.fn();
  const success = ()=>{spy()}

  return store.dispatch(actions.signInWithProvider(true, success)).then(()=>{
  const resultActions = store.getActions()
  expect(resultActions.length).toBe(2);
  expect(resultActions[0].type).toEqual(types.SET_FETCHING);
  expect(resultActions[1].type).toEqual(types.SIGN_IN_SUCCESS);
  expect(spy).toBeCalled();
})

})

it('should handle signInWithProvider error', () => {

const store = mockStore(initialState)
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.signInWithProvider(false, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.AUTH_ERROR);
expect(spy).not.toBeCalled();
})

})

it('should handle signOutUser success', () => {

const store = mockStore(initialState)

return store.dispatch(actions.signOutUser(true)).then(()=>{
const resultActions = store.getActions()

expect(resultActions.length).toBe(1);
expect(resultActions[0].type).toEqual(types.SIGN_OUT_SUCCESS);
})

})

it('should handle signOutUser error', () => {

const store = mockStore(initialState)

return store.dispatch(actions.signOutUser(false)).then(()=>{
const resultActions = store.getActions()

expect(resultActions.length).toBe(1);
expect(resultActions[0].type).toEqual(types.AUTH_ERROR);
})

})

it('should handle deleteUser success', () => {

const store = mockStore(initialState)

return store.dispatch(actions.deleteUser(true)).then(()=>{
const resultActions = store.getActions()

expect(resultActions).toHaveLength(1);
expect(resultActions[0].type).toEqual(types.SIGN_OUT_SUCCESS);
})

})

it('should handle deleteUser error', () => {

const store = mockStore(initialState)

return store.dispatch(actions.deleteUser(false)).then(()=>{
const resultActions = store.getActions()

expect(resultActions).toHaveLength(1);
expect(resultActions[0].type).toEqual(types.AUTH_ERROR);
})

})

it('should handle signInUser success', () => {

const store = mockStore(initialState)

return store.dispatch(actions.signInUser(true)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.SIGN_IN_SUCCESS);
})

})

it('should handle signInUser error', () => {

const store = mockStore(initialState)

return store.dispatch(actions.signInUser(false)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.AUTH_ERROR);
})

})

it('should handle updateUser succes', () => {

const store = mockStore(initialState)

return store.dispatch(actions.updateUser(true)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.SIGN_IN_SUCCESS);
})

})

it('should handle updateUser error', () => {

const store = mockStore(initialState)

return store.dispatch(actions.updateUser(false)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.AUTH_ERROR);
})

})

it('should handle signUpUser success', () => {

const store = mockStore(initialState)

return store.dispatch(actions.signUpUser(true)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(3);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.SIGN_IN_SUCCESS);
expect(resultActions[2].type).toEqual(types.SET_FETCHING);
})

})

it('should handle signUpUser error', () => {

const store = mockStore(initialState)

return store.dispatch(actions.signUpUser(false)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.AUTH_ERROR);
})

})


it('should handle reauthenticateUserWithCredential success', () => {

const store = mockStore(initialState)
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.reauthenticateUserWithCredential(true, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(0);
expect(spy).toBeCalled();
})

})

it('should handle reauthenticateUserWithCredential error', () => {

const store = mockStore(initialState)
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.reauthenticateUserWithCredential(false, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(1);
expect(resultActions[0].type).toEqual(types.AUTH_ERROR);
expect(spy).not.toBeCalled();
})

})

it('should handle reauthenticateUserWithPopup success', () => {

const store = mockStore(initialState)
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.reauthenticateUserWithPopup(true, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(0);
expect(spy).toBeCalled();
})

})

it('should handle reauthenticateUserWithPopup error', () => {

const store = mockStore(initialState)
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.reauthenticateUserWithPopup(false, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(1);
expect(resultActions[0].type).toEqual(types.AUTH_ERROR);
expect(spy).not.toBeCalled();
})

})


it('should handle reauthenticateUser with provider', () => {

const store = mockStore(initialState)
const auth={providerData:[{providerId: 'google.com'}]}

store.dispatch(actions.reauthenticateUser(auth));

const resultActions = store.getActions();

expect(resultActions).toEqual([])

})

it('should handle reauthenticateUser with password', () => {

const store = mockStore(initialState)

store.dispatch(actions.reauthenticateUser({}));

const resultActions = store.getActions();
expect(resultActions.length).toBe(1);
expect(resultActions[0].type).toEqual(types.SET_PASSWORD_DIALOG_OPEN)

})

it('should handle resetPasswordEmail success', () => {

const store = mockStore(initialState);
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.resetPasswordEmail(true, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(0);
expect(spy).toBeCalled();
})

})

it('should handle resetPasswordEmail error', () => {

const store = mockStore(initialState);
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.resetPasswordEmail(false, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(1);
expect(resultActions[0].type).toEqual(types.AUTH_ERROR);
expect(spy).not.toBeCalled();
})

})

it('should handle sendEmailVerification success', () => {

const store = mockStore(initialState)

return store.dispatch(actions.sendEmailVerification(true)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.SET_IS_VERIFICATION_EMAIL_SEND);
})

})

it('should handle sendEmailVerification error', () => {

const store = mockStore(initialState)

return store.dispatch(actions.sendEmailVerification(false)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.AUTH_ERROR);
})

})


it('should handle changePassword success', () => {

const store = mockStore(initialState)
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.changePassword(true, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.SET_FETCHING);
expect(spy).toBeCalled();
})

})

it('should handle changePassword error', () => {

const store = mockStore(initialState)
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.changePassword(false, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.AUTH_ERROR);
expect(spy).not.toBeCalled();
})

})


it('should handle linkUserWithPopup success', () => {

const store = mockStore(initialState)
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.linkUserWithPopup(true, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(1);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(spy).toBeCalled();
})

})

it('should handle linkUserWithPopup error', () => {

const store = mockStore(initialState)
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.linkUserWithPopup(false, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(1);
expect(resultActions[0].type).toEqual(types.AUTH_ERROR);
expect(spy).not.toBeCalled();
})

})

it('should handle changeEmail success', () => {

const store = mockStore(initialState)
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.changeEmail(true, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.SET_FETCHING);
expect(spy).toBeCalled();
})

})

it('should handle changeEmail error', () => {

const store = mockStore(initialState)
const spy=jest.fn();
const success = ()=>{spy()}

return store.dispatch(actions.changeEmail(false, success)).then(()=>{
const resultActions = store.getActions()
expect(resultActions.length).toBe(2);
expect(resultActions[0].type).toEqual(types.SET_FETCHING);
expect(resultActions[1].type).toEqual(types.AUTH_ERROR);
expect(spy).not.toBeCalled();
})

})

*/

})
