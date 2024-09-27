import * as types from './types'

export default function reducer(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_IS_AUTH_MENU_OPEN:
      return { ...state, isAuthMenuOpen: payload}
    case types.SET_IS_MINI_MODE:
      return { ...state, isMiniMode: payload }
    case types.SET_IS_MENU_OPEN:
      return { ...state, isMenuOpen: payload }
    case types.SET_IS_MOBILE_MENU_OPEN:
      return { ...state, isMobileMenuOpen: payload }
    case types.SET_IS_MINI_SWITCH_VISIBILITY:
      return { ...state, isMiniSwitchVisibility: payload }
    default:
      return state
  }
}