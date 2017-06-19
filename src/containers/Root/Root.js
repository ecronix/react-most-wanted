import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getLocaleMessages} from '../../locales';
import {getThemeSource} from '../../themes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { initAuth } from '../../store/auth/actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IntlProvider } from 'react-intl'
import {Routes} from '../../components/Routes';
import {  withFirebase } from 'firekit';

class Root extends Component {

  componentWillMount () {
    const { initAuth, initConnection, watchPath,initMessaging }= this.props;
    initAuth();

    watchPath('public_tasks_count');
    initMessaging();

    //Set connection listener with delay
    setTimeout(function(){ initConnection();}, 3000);
  }

  componentWillUnmount() {
    const { unsubscribeConnection, unwatchAllLists, unwatchAllPaths }= this.props;
    unsubscribeConnection();
    unwatchAllLists();
    unwatchAllPaths();
  }

  render() {
    const { locale, muiTheme, messages}= this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <IntlProvider locale={locale} messages={messages}>
            <Routes />
        </IntlProvider>
      </MuiThemeProvider>
    );
  }

}

Root.propTypes = {
  locale: PropTypes.string.isRequired,
  source: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
  initAuth: PropTypes.func.isRequired,
  initConnection: PropTypes.func.isRequired,
  unsubscribeConnection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { theme, locale } = state;

  const source=getThemeSource(theme);
  const messages=getLocaleMessages(locale);
  const muiTheme=getMuiTheme(source);

  return {
    locale,
    source,
    messages,
    muiTheme
  };
};


export default connect(
  mapStateToProps, {initAuth}
)(withFirebase(Root));
