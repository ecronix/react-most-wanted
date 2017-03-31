import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import App from './containers/App/App.js';
const history = createHistory()

//import App from './App';
import './index.css';

injectTapEventPlugin();

const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <ConnectedRouter history={history} >

        <Route
          path="/"
          component={App}
        />

      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root')
);
