import { firebaseDb } from './index';

class FirebaseConnection {

  constructor(actions) {
    this._actions = actions;
  }

  subscribe(emit) {

    let ref = firebaseDb.ref(".info/connected");

      ref.on("value", snapshot => {
        emit(this._actions.onConnectionStateChange(snapshot.val()));
      });

    this._unsubscribe = () => {ref.off()};
  }

  unsubscribe() {
    this._unsubscribe();
  }

}

export default FirebaseConnection;
