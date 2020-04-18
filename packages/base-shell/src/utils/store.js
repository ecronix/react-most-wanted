import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native

const _persistorConfig = {
  key: 'root',
  storage,
  blacklist: [
    'auth',
    'form',
    'connection',
    'initialization',
    'messaging',
    'simpleValues',
  ],
}
export default function configureStore({
  persistorConfig = {},
  reducers = null,
  initState = {},
  middlewares: _middlewares = [],
}) {
  let store

  const logger = createLogger({})

  let middlewares = [thunk, ..._middlewares]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger) // DEV middlewares
  }

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose

  const enhancer = composeEnhancers(applyMiddleware(...middlewares))

  console.log('config', { ..._persistorConfig, ...persistorConfig })

  const reducer = persistReducer(
    { ..._persistorConfig, ...persistorConfig },
    reducers
  )

  store = createStore(reducer, initState, enhancer)

  try {
    persistStore(store)
  } catch (e) {
    console.log(e)
  }

  return store
}
