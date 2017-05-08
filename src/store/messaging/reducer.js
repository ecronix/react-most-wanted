import * as types from './types';
import Immutable from 'seamless-immutable';

export const initialState=Immutable({
  hasPermission: false,
  token: undefined
});

export default function messaging(state = initialState, {payload, type}) {
  switch (type) {

    case types.ON_TOKEN_CHANGED:
    return {...state, hasPermission:true, ...payload};

    case types.ON_PERMISSION_CHANGED:
    return {...state, ...payload};

    default:
    return state;
  }
}
