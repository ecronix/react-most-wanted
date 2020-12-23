import * as types from './types'

export default function reducer(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_MINI_MODE:
      return { ...state, miniMode: payload }
    case types.SET_MENU_OPEN:
      return { ...state, menuOpen: payload }
    case types.SET_MOBILE_MENU_OPEN:
      return { ...state, mobileMenuOpen: payload }
    case types.SET_MINI_SWITCH_VISIBILITY:
      return { ...state, miniSwitchVisibility: payload }
    default:
      return state
  }
}