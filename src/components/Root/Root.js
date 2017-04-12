import React from 'react';
import { Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IntlProvider } from 'react-intl'
import { ConnectedRouter } from 'react-router-redux'
import {App} from '../../containers/App';

const Root = (props) => {

  const {
    history,
    locale,
    muiTheme,
    messages
  }=props;

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <IntlProvider locale={locale} messages={messages}>
        <ConnectedRouter history={history} >

          <Route
            path="/"
            component={App}
          />

        </ConnectedRouter>
      </IntlProvider>
    </MuiThemeProvider>
  );
}

export default Root;
