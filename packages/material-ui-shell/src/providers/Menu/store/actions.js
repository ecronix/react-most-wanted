import * as types from './types'

export function setMiniMode (payload) {
  return {
    type: types.SET_MINI_MODE, 
    payload: payload
  }
}

export function setMenuOpen (payload) {
  return {
    type: types.SET_MENU_OPEN, 
    payload: payload
  }
}

export function setMobileMenuOpen (payload) {
  return {
    type: types.SET_MOBILE_MENU_OPEN, 
    payload: payload
  }
}

export function setMiniSwitchVisibility (payload) {
  return {
    type: types.SET_MINI_SWITCH_VISIBILITY,
    payload: payload
  }
}
