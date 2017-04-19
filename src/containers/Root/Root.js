import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Root } from '../../components/Root';
import {getLocaleMessages} from '../../locales';
import {getThemeSource} from '../../themes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fetchUser } from '../../store/auth/actions';

Root.propTypes = {
  history: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  source: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
  fetchUser: PropTypes.func.isRequired,
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
  mapStateToProps, {fetchUser}
)(Root);
