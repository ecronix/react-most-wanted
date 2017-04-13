import * as types from './actionTypes';

export function updateTheme(theme) {
  return {
    type: types.UPDATE_THEME,
    theme
  };
}
