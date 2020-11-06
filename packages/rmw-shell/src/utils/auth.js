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
    }
  } else {
    return {
      isAuthenticated: false,
    }
  }
}

const isGranted = (auth, grant) => {
  const { grants = [], isAdmin = false } = auth || {}

  if (isAdmin) {
    return true
  }

  return grants && !!grants[grant]
}

export { defaultUserData, isGranted }
