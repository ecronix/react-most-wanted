export const getUser = (firebaseUser) => {

  if(firebaseUser){
    return {
      isSignedIn: true,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      img: firebaseUser.photoURL,
      uid: firebaseUser.uid
    }
  }

  return {
    isSignedIn: false
  };

}

export const getValidationErrorMessage = (auth, fieldID) => {

  if(auth && auth.error && auth.error.errorCode && auth.error.errorCode.indexOf(fieldID)>0){
    return auth.error.errorMessage;
  }

  return undefined;
}
