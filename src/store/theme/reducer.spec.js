import { Reducer } from 'redux-testkit';
import reducer from './reducer'
import {updateTheme} from './actions';

const initialState='light';

describe('locale reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should not affect state', () => {
    Reducer(reducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });

  it('should handle UPDATE_THEME', () => {

    const theme='dark';
    Reducer(reducer).expect(updateTheme(theme)).toReturnState(theme)

  })

})
