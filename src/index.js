import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import createHistory from 'history/createBrowserHistory'
import { Root } from './containers/Root';
import {addLocalizationData} from './locales';

const history = createHistory()
const store = configureStore(history);

injectTapEventPlugin();
addLocalizationData();

ReactDOM.render(
  <Provider store={store}>
    <Root history={history}/>
  </Provider>
  , document.getElementById('root')
);
