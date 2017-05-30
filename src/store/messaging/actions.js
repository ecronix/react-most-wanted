import FirebaseMessaging from '../../firebase/messaging';
import * as types from './types';

const firebaseMessaging= new FirebaseMessaging({
  onTokenChanged: onTokenChanged,
  onPermissionChanged: onPermissionChanged,
});

export function onTokenChanged(token) {
  return {
    type: types.ON_TOKEN_CHANGED,
    payload: {token}
  };
}

export function onPermissionChanged(hasPermission) {
  return {
    type: types.ON_PERMISSION_CHANGED,
    payload: {hasPermission}
  };
}


export function initMessaging() {

  return (dispatch, getState) => {
    firebaseMessaging.subscribe(dispatch);
  };

}
