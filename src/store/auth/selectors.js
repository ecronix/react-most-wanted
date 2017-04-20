export const getUser = (firebaseUser) => {

  if(firebaseUser){

    const {
      displayName,
      email,
      emailVerified,
      photoURL,
      isAnonymous,
      uid,
      providerData
    } = firebaseUser;


    return {
      isAuthorised: true,
      displayName,
      email,
      emailVerified,
      photoURL,
      isAnonymous,
      uid,
      providerData
    }
  }

  return {
    isAuthorised: false
  };

}

export const getValidationErrorMessage = (auth, fieldID) => {

  if(auth && auth.error && auth.error.code && auth.error.code.indexOf(fieldID)>0){
    return auth.error.message;
  }

  return undefined;
}

export const isAuthorised = (auth) => {
  return auth && auth.isAuthorised;
}
