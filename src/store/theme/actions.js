import * as types from './types'

export function updateTheme (theme) {
  return {
    type: types.UPDATE_THEME,
    theme
  }
}
