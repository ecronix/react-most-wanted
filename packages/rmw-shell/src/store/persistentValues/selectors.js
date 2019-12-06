const getPersistentValue = (state, name, defValue) => {
  const { [name]: persistentValue = defValue } = state.simpleValues ? state.simpleValues : {}

  return persistentValue
}

export default getPersistentValue
