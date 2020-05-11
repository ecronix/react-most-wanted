import areIntlLocalesSupported from 'intl-locales-supported'
import intl from 'intl'
import { defineMessages } from 'react-intl'

const loadLocalePolyfill = (locale) => {
  // START: Intl polyfill
  // Required for working on Safari
  // Code from here: https://formatjs.io/guides/runtime-environments/
  let localesMyAppSupports = [locale]

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
}

const getUsersPreferredLanguages = () => {
  if (navigator.languages !== undefined) {
    return navigator.languages
  } else if (navigator.language !== undefined) {
    return [navigator.language]
  } else {
    return undefined
  }
}

const parseLanguages = (acceptedLangs, defaultLang = false) => {
  const userPref = getUsersPreferredLanguages()

  const match = userPref
    ? userPref.find((lang) => acceptedLangs.includes(lang))
    : undefined

  if (match === undefined && defaultLang !== false) {
    return defaultLang
  }

  return match
}

const getLocaleMessages = async (l, ls) => {
  if (ls) {
    for (let i = 0; i < ls.length; i++) {
      if (ls[i]['locale'] === l) {
        const messages = await ls[i]['messages']
        return defineMessages(messages)
      }
    }
  }

  return {}
}

const formatMessage = (messages = [], id) => {
  return messages[id] || id
}

export { formatMessage, getLocaleMessages, loadLocalePolyfill }
export default parseLanguages
