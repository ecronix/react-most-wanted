import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Root } from '../../components/Root';

Root.propTypes = {
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { theme, locale } = state;
  return {
    theme,
    locale
  };
};


export default connect(
  mapStateToProps
)(Root);
