import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleDrawerOpen } from 'material-ui-responsive-drawer';
import App from '../../components/App/App.js';

App.propTypes = {
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
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
