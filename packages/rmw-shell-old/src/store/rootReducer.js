import * as authTypes from './auth/types'

const rootReducer = (appReducer, initState, state, action) => {
  if (action.type === authTypes.USER_LOGOUT) {
    // eslint-disable-next-line no-empty-pattern
    const {} = state
    state = { ...initState }
  }

  return appReducer(state, action)
}

export default rootReducer
