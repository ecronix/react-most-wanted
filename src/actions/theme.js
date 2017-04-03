export const UPDATE_THEME = 'UPDATE_THEME';

export function updateTheme(theme) {
  return {
    type: UPDATE_THEME,
    theme
  };
}
