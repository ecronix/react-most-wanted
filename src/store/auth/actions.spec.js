
import { Reducer, Thunk } from 'redux-testkit';
import configureMockStore from 'redux-mock-store'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { FlushThunks } from 'redux-testkit';
import * as reducers from '../reducers';
import * as selectors from './selectors';
import * as actions from './actions';
import * as auth from '../../utils/auth';
import { initialState } from './reducer'
//jest.mock('../../utils/auth');

describe('auth actions', () => {



  it('empty test', async () => {

  });



})
