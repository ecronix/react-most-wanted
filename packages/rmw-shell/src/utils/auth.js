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
  try {
    if (typeof Storage !== 'undefined') {
      const key = Object.keys(localStorage).find(e => e.match(/persist:root/))
      const data = JSON.parse(localStorage.getItem(key))
      const auth = JSON.parse(data.auth)

      return auth && auth.isAuthorised
    } else {
      return false
    }
  } catch (ex) {
    return false
  }
}
