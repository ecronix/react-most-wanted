import * as types from './types'

export function setIsMobileMenuOpen(payload) {
  return {
    type: types.SET_IS_MOBILE_MENU_OPEN,
    payload: payload
  }
}

