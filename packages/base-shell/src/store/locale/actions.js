import * as types from './types'

export function updateLocale(locale) {
  return {
    type: types.UPDATE_LOCALE,
    locale
  }
}
