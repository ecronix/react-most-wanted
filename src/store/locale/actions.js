import * as types from './actionTypes';

export function updateLocale(locale) {
  return {
    type: types.UPDATE_LOCALE,
    locale
  };
}
