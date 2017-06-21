import { responsiveStateReducer } from 'redux-responsive';
import { combineReducers } from 'redux';
import { responsiveDrawer } from 'material-ui-responsive-drawer';
import { reducer as formReducer } from 'redux-form'
import dialogs from './dialogs/reducer';
import locale from './locale/reducer';
import theme from './theme/reducer';
import firekitReducers from 'firekit';

const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer,
  form: formReducer,
  dialogs,
  locale,
  theme,
  ...firekitReducers
})

export default reducers;
