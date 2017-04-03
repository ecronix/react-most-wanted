import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleDrawerOpen, setResponsive } from 'material-ui-responsive-drawer';
import { push } from 'react-router-redux';
import {DrawerContent} from '../../components/Drawer';

DrawerContent.propTypes = {
  toggleDrawerOpen: PropTypes.func.isRequired,
  responsiveDrawer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { responsiveDrawer } = state;
  return {
    responsiveDrawer
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    toggleDrawerOpen: () => {
      dispatch(toggleDrawerOpen());
    },
    push: (path)=>{
      dispatch(push(path))
    },
    setResponsive: (responsive) => {
      dispatch(setResponsive(responsive));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerContent);
