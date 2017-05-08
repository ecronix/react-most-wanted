import { responsiveStateReducer } from 'redux-responsive';
import { combineReducers } from 'redux';
import { responsiveDrawer } from 'material-ui-responsive-drawer';
import { routerReducer } from 'react-router-redux';
import auth from './auth/reducer';
import connection from './connection/reducer';
import locale from './locale/reducer';
import theme from './theme/reducer';
import tasks from './tasks/reducer';
import users from './users/reducer';

const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer: responsiveDrawer,
  router: routerReducer,
  auth,
  connection,
  locale,
  theme,
  tasks,
  users
})

export default reducers;
