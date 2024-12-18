//import areIntlLocalesSupported from 'intl-locales-supported'
//import intl from 'intl'
import { defineMessages } from "react-intl";

/*
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
*/

const getUsersPreferredLanguages = () => {
  if (navigator.languages !== undefined) {
    return navigator.languages;
  } else if (navigator.language !== undefined) {
    return [navigator.language];
  } else {
    return undefined;
  }
};

/**
 * Determines the best matching language based on user preferences and accepted languages.
 *
 * This function attempts to find a match between the user's preferred languages and a list
 * of accepted languages. If no match is found and a default language is provided, it returns
 * the default language. Otherwise, it returns `undefined`.
 *
 * @param acceptedLangs - An array of language codes (e.g., ['en', 'fr', 'de']) that are supported by the application.
 * @param defaultLang - (Optional) A default language code to fall back to if no match is found.
 *                      Defaults to an empty string.
 *
 * @returns A string representing the matched language or the default language if no match is found.
 * If no match is found and no default language is provided, it returns `undefined`.
 *
 * @example
 * const acceptedLangs = ['en', 'fr', 'de'];
 * const defaultLang = 'en';
 *
 * const preferredLang = parseLanguages(acceptedLangs, defaultLang);
 */
const parseLanguages = (acceptedLangs: string[], defaultLang: string = "") => {
  const userPref = getUsersPreferredLanguages();

  const match = userPref
    ? userPref.find((lang) => acceptedLangs.includes(lang))
    : undefined;

  if (match === undefined && defaultLang !== "") {
    return defaultLang;
  }

  return match;
};

/**
 * Asynchronously retrieves localized messages for a specified locale.
 *
 * This function searches through a list of locale objects to find a matching locale.
 * If a match is found, it dynamically imports and resolves the corresponding
 * messages using the `defineMessages` function from react-intl. If no match is found or the list
 * of locales is not provided, it returns an empty object.
 *
 * @param {string} l - The locale string to search for (e.g., 'en', 'fr').
 * @param ls - An array of locale objects, where each object contains:
 *   - `locale`: The locale identifier as a string.
 *   - `messages`: The path or reference to the locale's message definitions.
 *
 * @returns A promise that resolves to the localized messages for the given locale.
 * If the locale is not found, the promise resolves to an empty object.
 *
 * @example
 * const { locale }: LocaleContextType = useLocale();
 *
 * getLocaleMessages(locale, locales).then((messages) => {
 *   console.log(messages);
 * });
 *
 * @see {defineMessages} - Method from react-intl
 */
const getLocaleMessages = async (
  l: string,
  ls: { locale: string; messages: any }[]
) => {
  if (ls) {
    for (let i = 0; i < ls.length; i++) {
      if (ls[i]["locale"] === l) {
        const { default: messages } = await defineMessages(ls[i].messages);

        return messages;
      }
    }
  }

  return {};
};

// TODO possibly unused - unused in base-shell
const formatMessage = (messages = [], id: any) => {
  return messages[id] || id;
};

export {
  // formatMessage,
  getLocaleMessages,
  //loadLocalePolyfill
  parseLanguages,
};
