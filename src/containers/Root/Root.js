import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Root } from '../../components/Root';
import {getLocaleMessages} from '../../locales';
import {getThemeSource} from '../../themes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { initAuth } from '../../store/auth/actions';
import { initConnection, unsubscribeConnection } from '../../store/connection/actions';
import { initMessaging } from '../../store/messaging/actions';

Root.propTypes = {
  history: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  source: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
  initAuth: PropTypes.func.isRequired,
  initConnection: PropTypes.func.isRequired,
  initMessaging: PropTypes.func.isRequired,
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
  mapStateToProps, {initAuth, initConnection, unsubscribeConnection, initMessaging}
)(Root);
