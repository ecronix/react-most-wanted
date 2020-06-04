import filterReducer from 'material-ui-filter/lib/store/reducer'
import firekitReducers from 'firekit'
import { reducer as formReducer } from 'redux-form'

export const appReducers = {
  ...firekitReducers,
  form: formReducer,
  filterReducer,
}

export default appReducers
