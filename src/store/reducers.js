import { responsiveStateReducer } from 'redux-responsive';
import { combineReducers } from 'redux';
import { responsiveDrawer } from 'material-ui-responsive-drawer';
import { routerReducer } from 'react-router-redux';
import auth from './auth/reducer';
import locale from './locale/reducer';
import theme from './theme/reducer';
import tasks from './tasks/reducer';

const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer: responsiveDrawer,
  router: routerReducer,
  auth,
  locale,
  theme,
  tasks
})

export default reducers;
