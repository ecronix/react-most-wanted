import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import configureStore from './store';
import { Root } from './containers/Root';
import { addLocalizationData } from './locales';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

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
