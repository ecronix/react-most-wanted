import { firebaseDb } from '../index';

class FirebaseList {
  constructor(actions, path = null) {
    this._actions = actions;
    this._path = path;
  }

  push(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this._path)
      .push(value, error => error ? reject(error) : resolve());
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
      .remove(error => error ? reject(error) : resolve());
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
      .set(value, error => error ? reject(error) : resolve());
    });
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
      .update(value, error => error ? reject(error) : resolve());
    });
  }

  subscribe(emit) {
    let ref = firebaseDb.ref(this._path);
    let initialized = false;

    ref.once('value', (snapshot) => {
      initialized = true;
      let list = {};

      snapshot.forEach(function(childSnapshot) {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();

        list[childKey]=childData;
      });

      emit(this._actions.onLoad(list));
    });

    ref.on('child_added', snapshot => {
      if (initialized) {
        emit(this._actions.onAdd(this.getPayload(snapshot)));
      }else{
       //Ignore
      }
    });

    ref.on('child_changed', snapshot => {
      emit(this._actions.onChange(this.getPayload(snapshot)));
    });

    ref.on('child_removed', snapshot => {
      emit(this._actions.onRemove(this.getPayload(snapshot)));
    });

    this._unsubscribe=()=>{ref.off()};
    this._emit=(action)=>{emit(action)};
  }

  unsubscribe(){
    if(this._unsubscribe){
      this._unsubscribe();
      this._emit(this._actions.onUnLoad());
    }
  }

  getPayload(snapshot) {
    return {data: snapshot.val(), key: snapshot.key };
  }
}

export default FirebaseList;
