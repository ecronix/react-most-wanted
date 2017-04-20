import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setResponsive, setDrawerOpen } from 'material-ui-responsive-drawer';
import { updateTheme } from '../../store/theme/actions';
import { updateLocale } from '../../store/locale/actions';
import { signOutUser } from '../../store/auth/actions';
import { push } from 'react-router-redux';
import { DrawerContent } from '../../components/Drawer';
import * as authSelectors from '../../store/auth/selectors'

DrawerContent.propTypes = {
  responsiveDrawer: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  setResponsive: PropTypes.func.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  updateTheme: PropTypes.func.isRequired,
  updateLocale: PropTypes.func.isRequired,
  signOutUser: PropTypes.func.isRequired,
  isAuthorised: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { responsiveDrawer, theme, locale, router, auth } = state;

  return {
    responsiveDrawer,
    theme,
    locale,
    router,
    auth,
    isAuthorised: authSelectors.isAuthorised(auth)

  };
};

export default connect(
  mapStateToProps,
  {push, setResponsive, setDrawerOpen, updateTheme, updateLocale, signOutUser}
)(DrawerContent);
