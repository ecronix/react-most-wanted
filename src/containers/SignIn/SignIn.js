import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { signInWithProvider, signInUser, authError } from '../../store/auth/actions';
import { getValidationErrorMessage } from '../../store/auth/selectors';
import { push } from 'react-router-redux';
import { setDrawerOpen } from 'material-ui-responsive-drawer';
import { SignIn } from '../../components/SignIn'

SignIn.propTypes = {
  signInWithProvider: PropTypes.func.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  authError: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, router } = state;
  return {
    auth,
    router,
    getValidationErrorMessage: (fieldID)=>getValidationErrorMessage(auth, fieldID)
  };
};


export default connect(
  mapStateToProps,
  { signInWithProvider, signInUser, push, setDrawerOpen, authError }
)(injectIntl(muiThemeable()(SignIn)));
