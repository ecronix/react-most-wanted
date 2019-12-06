import dialogs from './dialogs/reducer'
import filterReducer from 'material-ui-filter/lib/store/reducer'
import firekitReducers from 'firekit'
import { reducer as formReducer } from 'redux-form'
import initState from './init'
import locale from './locale/reducer'
import persistentValues from './persistentValues/reducer'
import rootReducer from './rootReducer'
import simpleValues from './simpleValues/reducer'
import themeSource from './themeSource/reducer'
import drawer from './drawer/reducer'
import { combineReducers } from 'redux'

export const appReducers = {
  ...firekitReducers,
  dialogs,
  filters: filterReducer,
  form: formReducer,
  locale,
  persistentValues,
  simpleValues,
  drawer,
  themeSource
}

const appReducer = combineReducers(appReducers)

export default (state, action) => rootReducer(appReducer, initState, state, action)
