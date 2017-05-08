import React, { Component } from 'react';
import { Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IntlProvider } from 'react-intl'
import { ConnectedRouter } from 'react-router-redux'
import {App} from '../../containers/App';

class Root extends Component {

  componentWillMount () {
    const { initAuth, initConnection }= this.props;
    initAuth();
    initConnection();

  }

  componentWillUnmount() {
    const { unsubscribeConnection }= this.props;
    unsubscribeConnection();
  }

  render() {
    const { history, locale, muiTheme, messages}= this.props;
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

}

export default Root;
