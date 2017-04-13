import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const auth = (state = Immutable(null), action) => {

  switch (action.type) {
    case types.UPDATE_AUTH:
    return action.auth;

    default:
    return state;
  }
}

export default auth;
