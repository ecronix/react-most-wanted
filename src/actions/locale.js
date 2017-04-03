export const UPDATE_LOCALE = 'UPDATE_LOCALE';

export function updateLocale(locale) {
  return {
    type: UPDATE_LOCALE,
    locale
  };
}
