import configureStore from '../utils/store'
import parseLanguages from '../utils/locale'

const persistorConfig = {
  key: 'root',
  blacklist: [
    'auth',
    'form',
    'connection',
    'initialization',
    'messaging',
    'simpleValues',
  ],
}

const initState = {
  locale: parseLanguages(['en', 'de', 'ru'], 'en'),
}

const config = {
  redux: {
    configureStore: () =>
      configureStore({ persistorConfig, reducers, initState }),
  },
}

export default config
