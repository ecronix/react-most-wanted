import * as types from './types'

export function setDrawerOpen(open) {
  return {
    type: types.ON_DRAWER_OPEN_CHANGED,
    open
  }
}

export function setDrawerMobileOpen(mobileOpen) {
  return {
    type: types.ON_DRAWER_MOBILE_OPEN_CHANGED,
    mobileOpen
  }
}

export function setDrawerUseMinified(useMinified) {
  return {
    type: types.ON_DRAWER_USE_MINIFIED_CHANGED,
    useMinified
  }
}

export default { setDrawerMobileOpen, setDrawerOpen, setDrawerUseMinified }
