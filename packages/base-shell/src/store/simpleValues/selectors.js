const getSimpleValue = (state, name, defValue) => {
  const { [name]: simpleValue = defValue } = state.simpleValues ? state.simpleValues : {}

  return simpleValue
}

export default getSimpleValue
