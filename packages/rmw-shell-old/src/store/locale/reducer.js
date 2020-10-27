import * as types from './types'

const locale = (state = 'en', action) => {
  switch (action.type) {
  case types.UPDATE_LOCALE:
    return action.locale

  default:
    return state
  }
}

export default locale
