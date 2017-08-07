import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { Activity } from '../../containers/Activity';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'firekit';
import ChatMessages from './ChatMessages';

class Chat extends Component {

  render(){
    const { muiTheme, intl } =this.props;

    return (
      <Activity
        containerStyle={{overflow:'hidden', backgroundColor: muiTheme.chip.backgroundColor}}
        title={intl.formatMessage({id: 'public_chats'})}>

        <ChatMessages />

      </Activity>
    );

  }

}

Chat.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownPops) => {
  const { auth } = state;
  const { match } = ownPops;
  const uid=match.params.uid;

  return {
    uid,
    auth
  };
};


export default connect(
  mapStateToProps, { setSimpleValue }
)(injectIntl(muiThemeable()(withRouter(withFirebase(Chat)))));
