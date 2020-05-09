const localStorageAuthKey = 'base-shell:auth'
export function saveAuthorisation(user) {
    if (typeof Storage !== 'undefined') {
        try {
            user.isAuthorised = true;
            localStorage.setItem(localStorageAuthKey, JSON.stringify(user))
        } catch (ex) {
            console.log(ex)
        }
    } else {
        // No web storage Support.
    }
}

export function logout() {
    if (typeof Storage !== 'undefined') {
        try {
            const auth = JSON.parse(localStorage.getItem(localStorageAuthKey))
            auth.isAuthorised = false;
            localStorage.setItem(localStorageAuthKey, JSON.stringify(auth))
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
            return auth.isAuthorised || false;
        } else {
            return false
        }
    } catch (ex) {
        return false
    }
}
