import React from 'react';
import { Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ConnectedRouter } from 'react-router-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from '../App/App.js';

const Root = (props) => {

  const { history , theming }=props;

  console.log(theming.source);

  return (
    <MuiThemeProvider muiTheme={getMuiTheme(theming.source)}>
      <ConnectedRouter history={history} >

        <Route
          path="/"
          component={App}
        />

      </ConnectedRouter>
    </MuiThemeProvider>
  );
}

export default Root;
