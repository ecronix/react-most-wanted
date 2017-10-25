import config from '../config'

const isAuthorised = () => {
  try {
    const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/))
    const data = JSON.parse(localStorage.getItem(key))
    return data != null
  } catch (ex) {
    return false
  }
}

export const initState = {
  auth: { isAuthorised: isAuthorised() },
  ...config.initial_state
}

export default initState
