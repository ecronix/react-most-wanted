import { responsiveStateReducer } from 'redux-responsive';
import { combineReducers } from 'redux';
import { responsiveDrawer } from 'material-ui-responsive-drawer';
import { routerReducer } from 'react-router-redux';
import theming from './theming';

const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer: responsiveDrawer,
  router: routerReducer,
  theming
})

export default reducers;
