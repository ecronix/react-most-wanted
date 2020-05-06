import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import { combineReducers } from 'redux'

const rootReducer = (appReducer, initState, state, action) => {
  if (action.type === 'auth@LOGOUT') {
    // eslint-disable-next-line no-empty-pattern
    const {} = state
    state = { ...initState }
  }

  return appReducer(state, action)
}

const _persistorConfig = {
  key: 'root',
  storage,
  blacklist: [],
}

export default function configureStore(props) {
  const {
    persistorConfig = {},
    reducers = null,
    initState = {},
    middlewares: _middlewares = [],
  } = props || {}
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

  const appReducer = combineReducers({ ...reducers })

  const _reducers = (state, action) =>
    rootReducer(appReducer, initState, state, action)

  const reducer = persistReducer(
    { ..._persistorConfig, ...persistorConfig },
    _reducers
  )

  store = createStore(reducer, initState, enhancer)

  try {
    persistStore(store)
  } catch (e) {
    console.log(e)
  }

  return store
}
