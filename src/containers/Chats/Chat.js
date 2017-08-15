import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl, intlShape } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { Activity } from '../../containers/Activity';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'firekit';
import ChatMessages from './ChatMessages';


class Chat extends Component {

  componentDidMount(){
    const { watchList, chatsPath } = this.props;
    watchList(chatsPath)
  }

render(){
  const {messages, muiTheme, history, receiverDisplayName, receiverPhotoURL, uid} =this.props;

  return (
    <Activity
      isLoading={messages===undefined}
      containerStyle={{
        overflow:'hidden',
        backgroundColor: muiTheme.chip.backgroundColor
      }}
      onBackClick={()=>{history.push('/chats')}}
      pageTitle={receiverDisplayName}
      title={<div style={{display: 'flex', flexOrientation: 'row', flexWrap: 'wrap', alignItems:'center' }}>
        <Avatar
          src={receiverPhotoURL}
          alt="person"
          icon={
            <FontIcon
              className="material-icons">
              person
            </FontIcon>
          }
        />
        <div style={{paddingLeft: 8}}>
          {`${receiverDisplayName}`}
        </div>
      </div>}>

      <ChatMessages uid={uid}/>

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
  const { lists, auth } = state;
  const { match } = ownPops;
  const uid=match.params.uid;

  const path=`user_chat_messages/${auth.uid}/${uid}`;
  const chatsPath=`user_chats/${auth.uid}`;
  const chats=lists[chatsPath]?lists[chatsPath]:[];

  let receiverDisplayName='';
  let receiverPhotoURL='';

  chats.map(chat=>{
    if(chat.key===uid){
      receiverDisplayName=chat.val.displayName;
      receiverPhotoURL=chat.val.photoURL;
    }
    return chat;
  })

  return {
    uid,
    receiverDisplayName,
    receiverPhotoURL,
    chatsPath,
    auth,
    messages: lists[path],
  };
};


export default connect(
  mapStateToProps, { setSimpleValue }
)(injectIntl(muiThemeable()(withRouter(withFirebase(Chat)))));
