const localStorageAuthKey = 'bas-shell:isAuthorised'

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
      const auth = JSON.parse(localStorage.getItem(localStorageAuthKey))
      return auth;
    } else {
      return false
    }
  } catch (ex) {
    return false
  }
}
