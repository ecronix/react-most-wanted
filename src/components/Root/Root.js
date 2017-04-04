import React from 'react';
import { Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {IntlProvider} from 'react-intl'
import { ConnectedRouter } from 'react-router-redux'
import App from '../App/App.js';

import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';

addLocaleData([...en, ...de]);

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
