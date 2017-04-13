import { Reducer } from 'redux-testkit';
import reducer from './reducer'
import {updateAuth} from './actions';

const initialState=null;

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should not affect state', () => {
    Reducer(reducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });

  it('should handle UPDATE_THEME', () => {

    const user={name: 'Name', email: 'Email'};
    Reducer(reducer).expect(updateAuth(user)).toReturnState(user)

  })

})
