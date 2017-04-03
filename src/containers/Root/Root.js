import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrentTheme } from '../../actions/theming';
import { Root } from '../../components/Root';

Root.propTypes = {
  theming: PropTypes.object.isRequired,
  setCurrentTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { theming } = state;
  return {
    theming
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    setCurrentTheme: (theme) => {
      dispatch(setCurrentTheme(theme));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
