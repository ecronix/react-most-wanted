import { responsiveStateReducer } from 'redux-responsive';
import { combineReducers } from 'redux';
import { responsiveDrawer } from 'material-ui-responsive-drawer';
import { routerReducer } from 'react-router-redux';
import getListReducers from '../utils/firebase-list-reducers';
import auth from './auth/reducer';
import connection from './connection/reducer';
import messaging from './messaging/reducer';
import locale from './locale/reducer';
import theme from './theme/reducer';

const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer: responsiveDrawer,
  router: routerReducer,
  auth,
  connection,
  messaging,
  locale,
  theme,
  tasks: getListReducers('public_tasks'),
  users: getListReducers('users')
})

export default reducers;
