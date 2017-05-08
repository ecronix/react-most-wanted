import * as types from './types';
import Immutable from 'seamless-immutable';

export const initialState=Immutable({
  isConnected: true
});

export default function connection(state = initialState, {payload, type}) {
  switch (type) {

    case types.ON_CONNECTION_STATE_CHANGED:
    return {...state, ...payload};

    default:
    return state;
  }
}
