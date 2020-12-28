const getPersistentValue = (state, name, defValue) => {
  const { [name]: persistentValue = defValue } = state.persistentValues
    ? state.persistentValues
    : {}

  return persistentValue
}

export default getPersistentValue
