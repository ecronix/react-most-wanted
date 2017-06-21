import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setResponsive, setDrawerOpen } from 'material-ui-responsive-drawer';
import { updateTheme } from '../../store/theme/actions';
import { updateLocale } from '../../store/locale/actions';
import { DrawerContent } from '../../components/Drawer';
import { setDialogIsOpen } from '../../store/dialogs/actions';

DrawerContent.propTypes = {
  responsiveDrawer: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  setResponsive: PropTypes.func.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  updateTheme: PropTypes.func.isRequired,
  updateLocale: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { responsiveDrawer, theme, locale, auth, dialogs, messaging } = state;

  return {
    responsiveDrawer,
    theme,
    locale,
    auth,
    dialogs,
    messaging
  };
};

export default connect(
  mapStateToProps,
  {setResponsive, setDrawerOpen, updateTheme, updateLocale, setDialogIsOpen}
)(DrawerContent);
