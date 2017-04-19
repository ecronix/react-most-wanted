import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DrawerHeader }  from '../../components/Drawer';
import { setAuthMenuOpen } from '../../store/auth/actions';
import { fetchUser } from '../../store/firebase/actions';

DrawerHeader.propTypes = {
  auth: PropTypes.object,
  setAuthMenuOpen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, theme, locale} = state;

  return {
    auth,
    theme,
    locale
  };
};

export default connect(
  mapStateToProps,
  { setAuthMenuOpen, fetchUser }
)(DrawerHeader);
