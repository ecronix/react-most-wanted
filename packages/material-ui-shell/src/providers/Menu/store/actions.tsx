import * as types from './types'

export function setIsAuthMenuOpen(payload: boolean) {
  return {
    type: types.SET_IS_AUTH_MENU_OPEN,
    payload: payload,
  }
}

export function setIsMiniMode(payload: boolean) {
  return {
    type: types.SET_IS_MINI_MODE,
    payload: payload,
  }
}

export function setIsMenuOpen(payload: boolean) {
  return {
    type: types.SET_IS_MENU_OPEN,
    payload: payload,
  }
}

export function setIsMobileMenuOpen(payload: boolean) {
  return {
    type: types.SET_IS_MOBILE_MENU_OPEN,
    payload: payload,
  }
}

export function setIsMiniSwitchVisibility(payload: boolean) {
  return {
    type: types.SET_IS_MINI_SWITCH_VISIBILITY,
    payload: payload,
  }
}
