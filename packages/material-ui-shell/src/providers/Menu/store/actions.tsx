import * as types from './types'

/**
 * @description This is used in Context Provider
 * Action creator for setting the state of whether the authentication menu is open.
 *
 * This action is dispatched to update the `isAuthMenuOpen` state in the global menu store.
 *
 * @param {boolean} payload - The new value indicating whether the authentication menu should be open (`true`) or closed (`false`).
 * @returns The action object to be dispatched with the `type` and `payload`.
 *
 * @example
 * dispatch(setIsAuthMenuOpen(true));
 */
export function setIsAuthMenuOpen(payload: boolean) {
  return {
    type: types.SET_IS_AUTH_MENU_OPEN,
    payload: payload,
  }
}

/**
 * @description This is used in Context Provider
 * Action creator for setting the state of whether the menu is in mini (collapsed) mode.
 *
 * This action is dispatched to update the `isMiniMode` state in the global menu store.
 *
 * @param {boolean} payload - The new value indicating whether the menu should be in mini mode (`true`) or not (`false`).
 * @returns The action object to be dispatched with the `type` and `payload`.
 *
 * @example
 * dispatch(setIsMiniMode(false));
 */
export function setIsMiniMode(payload: boolean) {
  return {
    type: types.SET_IS_MINI_MODE,
    payload: payload,
  }
}

/**
 * @description This is used in Context Provider
 * Action creator for setting the state of whether the menu is open.
 *
 * This action is dispatched to update the `isMenuOpen` state in the global menu store.
 *
 * @param {boolean} payload - The new value indicating whether the menu should be open (`true`) or closed (`false`).
 * @returns  The action object to be dispatched with the `type` and `payload`.
 *
 * @example
 * dispatch(setIsMenuOpen(true));
 */
export function setIsMenuOpen(payload: boolean) {
  return {
    type: types.SET_IS_MENU_OPEN,
    payload: payload,
  }
}

/**
 * @description This is used in Context Provider
 * Action creator for setting the state of whether the mobile version of the menu is open.
 *
 * This action is dispatched to update the `isMobileMenuOpen` state in the global menu store.
 *
 * @param {boolean} payload - The new value indicating whether the mobile menu should be open (`true`) or closed (`false`).
 * @returns  The action object to be dispatched with the `type` and `payload`.
 *
 * @example
 * dispatch(setIsMobileMenuOpen(true));
 */
export function setIsMobileMenuOpen(payload: boolean) {
  return {
    type: types.SET_IS_MOBILE_MENU_OPEN,
    payload: payload,
  }
}

/**
 * @description This is used in Context Provider
 * Action creator for setting the state of whether the mini switch (for switching between menu modes) is visible.
 *
 * This action is dispatched to update the `isMiniSwitchVisibility` state in the global menu store.
 *
 * @param {boolean} payload - The new value indicating whether the mini switch should be visible (`true`) or not (`false`).
 * @returns  The action object to be dispatched with the `type` and `payload`.
 *
 * @example
 * dispatch(setIsMiniSwitchVisibility(false));
 */
export function setIsMiniSwitchVisibility(payload: boolean) {
  return {
    type: types.SET_IS_MINI_SWITCH_VISIBILITY,
    payload: payload,
  }
}
