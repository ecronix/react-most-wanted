export default function isGranted(state, grant) {
  const { auth, lists, paths } = state

  const userGrants = lists[`user_grants/${auth.uid}`]
  const isAdmin = paths[`admins/${auth.uid}`]

  if (auth.isAuthorised !== true) {
    return false
  }

  if (isAdmin === true) {
    return true
  }

  if (userGrants !== undefined) {
    for (let userGrant of userGrants) {
      if (userGrant.key === grant) {
        return userGrant.val === true
      }
    }
  }

  return false
}

export function isAnyGranted(state, grants) {
  if (grants !== undefined) {
    for (let grant of grants) {
      if (isGranted(state, grant) === true) {
        return true
      }
    }
  }

  return false
}

const localStorageAuthKey = 'rmw:isAuthorised'

export function saveAuthorisation(user) {
  if (typeof Storage !== 'undefined') {
    try {
      localStorage.setItem(localStorageAuthKey, Boolean(user))
    } catch (ex) {
      console.log(ex)
    }
  } else {
    // No web storage Support.
  }
}

export function isAuthorised() {
  if (typeof Storage !== 'undefined') {
    try {
      return localStorage.getItem(localStorageAuthKey)
    } catch (ex) {
      return false
    }
  } else {
    // No web storage Support.
  }
}
