// get the default user data
const defaultUserData = (user) => {
  if (user != null) {
    return {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      uid: user.uid,
      providerData: user.providerData,
      isAuthenticated: true,
    };
  } else {
    return {
      isAuthenticated: false,
    };
  }
};

const isAuthGranted = (auth, grant) => {
  const { grants = [], isAdmin = false } = auth || {};

  if (isAdmin) {
    return true;
  }

  if (!grants) {
    return false;
  }

  return !!grants[grant];
};

const isAnyAuthGranted = (auth, grantsToCheck = []) => {
  const { grants = [], isAdmin = false } = auth || {};

  if (isAdmin) {
    return true;
  }

  if (!grants) {
    return false;
  }
  if (!grantsToCheck) {
    return false;
  }

  let granted = false;

  for (let i = 0; i < grantsToCheck.length; i++) {
    const grant = grantsToCheck[i];

    if (isAuthGranted(auth, grant)) {
      granted = true;
    }
  }

  return granted;
};

export { defaultUserData, isAuthGranted, isAnyAuthGranted };
