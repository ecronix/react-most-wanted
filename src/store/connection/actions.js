import FirebaseConnection from '../../firebase/connection';
import * as types from './types';

const firebaseConnection= new FirebaseConnection({
  onConnectionStateChange: onConnectionStateChange
});

export function onConnectionStateChange(isConnected) {
  return {
    type: types.ON_CONNECTION_STATE_CHANGED,
    payload: {isConnected}
  };
}


export function initConnection() {
  return (dispatch, getState) => {
    firebaseConnection.subscribe(dispatch);
  };
}

export function unsubscribeConnection() {
  firebaseConnection.unsubscribe();
}
