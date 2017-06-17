import { responsiveStateReducer } from 'redux-responsive';
import { combineReducers } from 'redux';
import { responsiveDrawer } from 'material-ui-responsive-drawer';
import { reducer as formReducer } from 'redux-form'
import auth from './auth/reducer';
import dialogs from './dialogs/reducer';
import messaging from './messaging/reducer';
import locale from './locale/reducer';
import theme from './theme/reducer';
import {
  connectionReducer,
  listsReducer,
  pathsReducer,
  initializationReducer
} from 'firekit';


const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer,
  form: formReducer,
  auth,
  initialization: initializationReducer,
  connection: connectionReducer,
  lists: listsReducer,
  paths: pathsReducer,
  dialogs,
  messaging,
  locale,
  theme,
})

export default reducers;
