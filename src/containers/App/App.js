import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { App } from '../../components/App';

App.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    auth
  };
};


export default connect(
  mapStateToProps
)(App);
