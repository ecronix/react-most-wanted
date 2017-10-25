import { responsiveStateReducer } from 'redux-responsive'
import { combineReducers } from 'redux'
import responsiveDrawer from 'material-ui-responsive-drawer/lib/store/reducer'
import formReducer from 'redux-form/lib/reducer.js'
import persistentValues from './persistentValues/reducer'
import simpleValues from './simpleValues/reducer'
import dialogs from './dialogs/reducer'
import locale from './locale/reducer'
import theme from './theme/reducer'
import firekitReducers from 'firekit'
import filterReducer from 'material-ui-filter/lib/store/reducer'
import initState from './init'
import * as authTypes from './auth/types'

const appReducer = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer,
  form: formReducer,
  dialogs,
  persistentValues,
  simpleValues,
  locale,
  theme,
  ...firekitReducers,
  filters: filterReducer
})

const rootReducer = (state, action) => {
  if (action.type === authTypes.USER_LOGOUT) {
    state = initState
  }

  return appReducer(state, action)
}

export default rootReducer
