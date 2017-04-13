import { Reducer } from 'redux-testkit';
import reducer from './reducer'
import {updateLocale} from './actions';

const initialState='en';

describe('locale reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should not affect state', () => {
    Reducer(reducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });

  it('should handle UPDATE_LOCALE', () => {

    const locale='de';
    Reducer(reducer).expect(updateLocale(locale)).toReturnState(locale)

  })

})
