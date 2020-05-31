import filterReducer from 'material-ui-filter/lib/store/reducer'
import firekitReducers from 'firekit'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'

export const appReducers = {
  ...firekitReducers,
  form: formReducer,
  filterReducer,
}

export default appReducers
