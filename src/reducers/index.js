import { responsiveStateReducer } from 'redux-responsive';
import { combineReducers } from 'redux';
import { responsiveDrawer } from 'material-ui-responsive-drawer';
import { routerReducer } from 'react-router-redux';
import theme from './theme';
import locale from './locale';

const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer: responsiveDrawer,
  router: routerReducer,
  theme,
  locale
})

export default reducers;
