import firebase from 'firebase';
import { firebaseAuth, firebaseDb, firebaseApp } from './index';


export const isAuthorised = () => {

  try{
    const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));
    const data = JSON.parse(localStorage.getItem(key));
    return data != null;
  }catch(ex){
    return false;
  }


}

const  getProvider = (provider) => {

  if(provider.indexOf('facebook')>-1){
    return new firebase.auth.FacebookAuthProvider();
  }

  if(provider.indexOf('github')>-1){
    return new firebase.auth.GithubAuthProvider();
  }

  if(provider.indexOf('google')>-1){
    return new firebase.auth.GoogleAuthProvider();
  }

  if(provider.indexOf('twitter')>-1){
    return new firebase.auth.TwitterAuthProvider();
  }

  if(provider.indexOf('phone')>-1){
    return new firebase.auth.PhoneAuthProvider();
  }

  throw new Error('Provider is not supported!!!');

};


class FirebaseAuth {
  constructor(actions, userSelector) {
    this._actions = actions;
    this._userSelector = userSelector;
  }

  handleError = (error) => {
    this._emit(this._actions.onAuthError(error));
  }

  getUser = (rawUserData) => {

    if(this._userSelector!==undefined && this._userSelector instanceof Function){
      return this._userSelector(rawUserData);
    }else{
      return rawUserData;
    }
  }

  onAuthStateChanged = (user) => {
    return this._actions.onAuthStateChanged(this.getUser(user));
  }

  getCurrentMessagingToken = () => {
    return this._getState().messaging.token;
  }

  updateToken = (user, status) => {

    const token=this._getState().messaging.token;

    if(token){
      firebaseDb.ref(`users/${user.uid}/notificationTokens/${this.getCurrentMessagingToken()}`).set(status);
    }

  }

  updateUserData = (user) => {

    if(user!==undefined && user!==null){

      firebaseDb.ref('users/' + user.uid).update(this.getUser(user));
      this.updateToken(user, true);

    }

  }

  deleteUserData = (user) => {
    if(user!==undefined && user!==null){
      firebaseDb.ref('users/' + user.uid).remove();
    }
  }

  updateProfile(user) {
    return new Promise((resolve, reject) => {
      this._emit(this._actions.onFetchChanged(true));
      firebaseAuth.currentUser.updateProfile(user)
      .then(() => {
        this.updateUserData(firebaseAuth.currentUser);
        this._emit(this.onAuthStateChanged(firebaseAuth.currentUser));
        resolve(firebaseAuth.currentUser);
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }

  signInWithEmailAndPassword(user, onSuccess=null) {
    return new Promise((resolve, reject) => {
      this._emit(this._actions.onFetchChanged(true));
      firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((user) => {

        this._emit(this.onAuthStateChanged(user));

        if(onSuccess && onSuccess instanceof Function){

          onSuccess(user);
        }

        resolve(user);
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }

  signInWithPopup(provider, onSuccess=null) {
    return new Promise((resolve, reject) => {
      this._emit(this._actions.onFetchChanged(true));
      firebaseAuth.signInWithPopup(getProvider(provider))
      .then((payload) => {

        this._emit(this.onAuthStateChanged(payload.user));

        //Because signin with popu is also used as registratiorn for new users
        //we need to update the user data after each signin with popup
        this.updateProfile(this.getUser(payload.user));

        if(onSuccess && onSuccess instanceof Function){
          onSuccess(payload.user);
        }

        resolve(payload);
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }



  reauthenticateWithCredential(password , onSuccess=null) {
    return new Promise((resolve, reject) => {

      const credential = firebase.auth.EmailAuthProvider.credential(
        firebaseAuth.currentUser.email,
        password
      );

      this._emit(this._actions.onFetchChanged(true));
      firebaseAuth.currentUser.reauthenticateWithCredential(credential)
      .then(() => {

        if(onSuccess && onSuccess instanceof Function){
          onSuccess();
        }

        resolve();
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }

  reauthenticateWithPopup(provider , onSuccess=null) {
    return new Promise((resolve, reject) => {

      this._emit(this._actions.onFetchChanged(true));
      firebaseAuth.currentUser.reauthenticateWithPopup(getProvider(provider))
      .then(() => {

        if(onSuccess && onSuccess instanceof Function){
          onSuccess();
        }

        resolve();
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }

  updatePassword(newPassword , onSuccess=null) {
    return new Promise((resolve, reject) => {

      this._emit(this._actions.onFetchChanged(true));
      firebaseAuth.currentUser.updatePassword(newPassword)
      .then(() => {

        this._emit(this._actions.onFetchChanged(false));

        if(onSuccess && onSuccess instanceof Function){
          onSuccess();
        }

        resolve();
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }

  updateEmail(newEmail, onSuccess=null) {
    return new Promise((resolve, reject) => {

      this._emit(this._actions.onFetchChanged(true));
      firebaseAuth.currentUser.updateEmail(newEmail)
      .then(() => {

        this._emit(this.onAuthStateChanged(firebaseAuth.currentUser));

        if(onSuccess && onSuccess instanceof Function){
          onSuccess(firebaseAuth.currentUser);
        }

        resolve(firebaseAuth.currentUser);
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }

  sendPasswordResetEmail(newEmail, onSuccess=null) {
    return new Promise((resolve, reject) => {

      this._emit(this._actions.onFetchChanged(true));
      firebaseAuth.sendPasswordResetEmail(newEmail)
      .then(() => {

        if(onSuccess && onSuccess instanceof Function){
          onSuccess(firebaseAuth.currentUser);
        }

        resolve();
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }

  sendEmailVerification(onSuccess=null) {
    return new Promise((resolve, reject) => {

      this._emit(this._actions.onFetchChanged(true));
      firebaseAuth.currentUser.sendEmailVerification()
      .then(() => {

        this._emit(this._actions.onFetchChanged(false));

        if(onSuccess && onSuccess instanceof Function){
          onSuccess(firebaseAuth.currentUser);
        }

        resolve();
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }


  createUserWithEmailAndPassword(user) {
    return new Promise((resolve, reject) => {
      this._emit(this._actions.onFetchChanged(true));
      firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.updateProfile(user);
        resolve(user);
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }

  linkWithPopup(provider, onSuccess=null) {
    return new Promise((resolve, reject) => {
      this._emit(this._actions.onFetchChanged(true));
      firebaseAuth.currentUser.linkWithPopup(getProvider(provider))
      .then((payload) => {

        this._emit(this._actions.onFetchChanged(false));

        if(onSuccess && onSuccess instanceof Function){
          onSuccess(this.getUser(payload.user));
        }

        resolve(payload);
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }


  updateUserPhoto(dataURL){

    return new Promise((resolve, reject) => {

      this._emit(this._actions.onFetchChanged(true));
      let storageRef=firebaseApp.storage().ref(`users/${firebaseAuth.currentUser.uid}`);

      storageRef.child(`photoURL`).putString(dataURL, 'data_url')
      .then((snapshot)=>{
        this.updateProfile({photoURL: snapshot.downloadURL});
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });

  }

  signOut() {
    return new Promise((resolve, reject) => {

      //we save to the database the user absence
      //we also have to save to the database
      //whly we habe access to it
      this.handleAbsence(firebaseAuth.currentUser);
      this.updateToken(firebaseAuth.currentUser, false);

      firebaseAuth.signOut()
      .then(() => {
        resolve();
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }

  deleteProfile(user) {
    return new Promise((resolve, reject) => {

      this._emit(this._actions.onFetchChanged(true));

      //we need to delete the user data first
      //othervise we would not have access to the database
      //if we delete the user first
      this.deleteUserData(firebaseAuth.currentUser);

      firebaseAuth.currentUser.delete()
      .then(() => {
        this._emit(this._actions.onLogoutUser());
        resolve();
      })
      .catch((error) => {this.handleError(error); reject(error)});
    });
  }

  handlePresence = (user) => {
    let myConnectionsRef = firebase.database().ref(`users/${user.uid}/connections`);
    let lastOnlineRef = firebase.database().ref(`users/${user.uid}/lastOnline`);
    lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);

    var con = myConnectionsRef.push(true);
    con.onDisconnect().remove();

    this.updateToken(firebaseAuth.currentUser, true);

  }

  handleAbsence = (user) => {
    let myConnectionsRef = firebase.database().ref(`users/${user.uid}/connections`);
    let lastOnlineRef = firebase.database().ref(`users/${user.uid}/lastOnline`);

    myConnectionsRef.remove();
    lastOnlineRef.set(firebase.database.ServerValue.TIMESTAMP);

  }

  subscribe(emit, getState, onSuccess=undefined) {

    this._emit=emit;
    this._getState=getState;

    firebaseAuth.onAuthStateChanged((user) => {
      if(user){
        emit(this.onAuthStateChanged(user));
        this.updateUserData(user);
        this.handlePresence(user);
      }else{
        emit(this._actions.onLogoutUser());
      }

      if(onSuccess && onSuccess instanceof Function){
        onSuccess();
      }

    }, (error) => {
      emit(this._actions.onAuthError(error));
    });

  }



}

export default FirebaseAuth;
