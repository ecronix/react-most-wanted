//import { PropTypes } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  DrawerHeader  from '../../components/Drawer/DrawerHeader';
import { updateAuth } from '../../actions/auth';
import {injectIntl, intlShape} from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';

DrawerHeader.propTypes = {
  auth: PropTypes.object,
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  updateAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, theme, locale} = state;

  return {
    auth,
    theme,
    locale
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    updateAuth: (auth)=>{
      dispatch(updateAuth(auth))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(muiThemeable()(DrawerHeader)));
