export const SET_CURRENT_THEME = 'SET_CURRENT_THEME';

export function setCurrentTheme(theme) {
  return {
    type: SET_CURRENT_THEME,
    theme
  };
}
