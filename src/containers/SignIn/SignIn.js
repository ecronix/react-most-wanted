import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { signIn } from '../../store/auth/actions';
import { push } from 'react-router-redux';
import { setDrawerOpen } from 'material-ui-responsive-drawer';
import {SignIn} from '../../components/SignIn'

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  auth: PropTypes.object,
  intl: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    signIn: (auth) => {
      dispatch(signIn(auth));
    },
    push: (path)=>{
      dispatch(push(path))
    },
    setDrawerOpen: (open)=>{
      dispatch(setDrawerOpen(open))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(muiThemeable()(SignIn)));
