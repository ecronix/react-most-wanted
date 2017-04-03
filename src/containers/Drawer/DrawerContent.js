import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setResponsive } from 'material-ui-responsive-drawer';
import { setCurrentTheme } from '../../actions/theming';
import { push } from 'react-router-redux';
import {DrawerContent} from '../../components/Drawer';

DrawerContent.propTypes = {
  responsiveDrawer: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  setResponsive: PropTypes.func.isRequired,
  setCurrentTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { responsiveDrawer, theming } = state;
  return {
    responsiveDrawer,
    theming
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    push: (path)=>{
      dispatch(push(path))
    },
    setResponsive: (responsive) => {
      dispatch(setResponsive(responsive));
    },
    setCurrentTheme: (theme) => {
      dispatch(setCurrentTheme(theme));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerContent);
