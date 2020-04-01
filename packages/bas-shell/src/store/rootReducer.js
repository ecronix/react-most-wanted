const rootReducer = (appReducer, initState, state, action) => {
  if (action.type === 'auth@LOGOUT') {
    // eslint-disable-next-line no-empty-pattern
    const {} = state
    state = { ...initState }
  }

  return appReducer(state, action)
}

export default rootReducer
