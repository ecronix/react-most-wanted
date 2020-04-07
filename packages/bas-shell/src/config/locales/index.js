import en_messages from './en'
import ru_messages from './ru'
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/dist/locale-data/en'
import '@formatjs/intl-relativetimeformat/dist/locale-data/ru'
import areIntlLocalesSupported from 'intl-locales-supported'
import intl from 'intl'

// START: Intl polyfill
// Required for working on Safari
// Code from here: https://formatjs.io/guides/runtime-environments/
let localesMyAppSupports = [
  /* list locales here */
]

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors with need with the polyfill's.
    let IntlPolyfill = intl
    Intl.NumberFormat = IntlPolyfill.NumberFormat
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = intl
}
// END: Intl polyfill

const locales = [
  {
    locale: 'en',
    messages: en_messages
  },
  {
    locale: 'ru',
    messages: ru_messages
  },
]

export function getLocaleMessages(l, ls) {
  if (ls) {
    for (let i = 0; i < ls.length; i++) {
      if (ls[i]['locale'] === l) {
        return ls[i]['messages']
      }
    }
  }

  return en_messages // Default locale
}

export default locales

