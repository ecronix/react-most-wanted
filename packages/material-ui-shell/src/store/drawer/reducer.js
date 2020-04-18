import * as types from './types'

const initialState = {
  mobileOpen: false,
  open: false,
  useMinified: false
}

export default function drawer(state = initialState, action) {
  switch (action.type) {
  case types.ON_DRAWER_OPEN_CHANGED:
    return { ...state, open: action.open, useMinified: true }
  case types.ON_DRAWER_MOBILE_OPEN_CHANGED:
    return { ...state, mobileOpen: action.mobileOpen }
  case types.ON_DRAWER_USE_MINIFIED_CHANGED:
    return { ...state, useMinified: action.useMinified, open: false }
  default:
    return state
  }
}
