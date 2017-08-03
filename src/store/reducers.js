import { responsiveStateReducer } from 'redux-responsive';
import { combineReducers } from 'redux';
import { responsiveDrawer } from 'material-ui-responsive-drawer';
import { reducer as formReducer } from 'redux-form';
import persistantValues from './persistentValues/reducer';
import simpleValues from './simpleValues/reducer';
import dialogs from './dialogs/reducer';
import locale from './locale/reducer';
import theme from './theme/reducer';
import filters from './filters/reducer';
import firekitReducers from 'firekit';

const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer,
  form: formReducer,
  dialogs,
  persistantValues,
  simpleValues,
  filters,
  locale,
  theme,
  ...firekitReducers
})

export default reducers;
