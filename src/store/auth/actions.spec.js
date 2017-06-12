
import { Reducer, Thunk } from 'redux-testkit';
import thunk from 'redux-thunk';
import { FlushThunks } from 'redux-testkit';
import * as reducers from '../reducers';
import * as selectors from './selectors';
import * as actions from './actions';
import * as types from './types';
import { initialState } from './reducer';

const middlewares = [thunk]

describe('auth actions', () => {

  it('empty test', () => {
    expect(1).toBe(1)
  })


})
