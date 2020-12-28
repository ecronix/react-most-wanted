import * as types from './types'

export function updateTheme(theme) {
  return {
    type: types.UPDATE_THEME,
    theme
  }
}

export function switchNightMode(isNightModeOn) {
  return {
    type: types.SWITCH_NIGHT_MODE,
    isNightModeOn
  }
}
