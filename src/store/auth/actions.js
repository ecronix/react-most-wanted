import * as types from './actionTypes';

export function updateAuth(auth) {
  return {
    type: types.UPDATE_AUTH,
    auth
  };
}
