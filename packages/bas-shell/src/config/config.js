import locales from './locales'
import parseLanguages from '../utils/localeTools'
const config = {
  initial_state: {
    // themeSource: {
    //   isNightModeOn: true,
    //   source: 'light',
    // },
    locale: parseLanguages(['en'], 'en'),
  },
}

export default config
