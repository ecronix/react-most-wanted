import * as types from './types'

export default function reducer(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_IS_MOBILE_MENU_OPEN:
      return { ...state, isMobileMenuOpen: payload }
    default:
      return state
  }
}