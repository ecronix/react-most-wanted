import React, {Component} from 'react';
import { connect } from 'react-redux';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../containers/Activity';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { withFirebase } from 'firekit';
import { withRouter } from 'react-router-dom';
import ReactList from 'react-list';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import { setPeristentValue } from '../../store/persistentValues/actions';
import ChatMessages from './ChatMessages';

class Chats extends Component {

  componentDidMount(){
    const {watchList, path} =this.props;

    watchList(path);
  }

  handleItemClick = (val, key) => {
    const { usePreview, history, setPeristentValue } = this.props;

    if(usePreview){
      setPeristentValue('current_chat_uid', key);
    }else{
      history.push(`/chats/edit/${key}`);
    }
  }

  renderItem = (i, k) => {
    const { list, intl, currentChatUid, usePreview, muiTheme } = this.props;

    const key=list[i].key;
    const val=list[i].val;
    const isPreviewed=usePreview && currentChatUid===key;

    return <div key={i}>
      <ListItem
        leftAvatar={
          <Avatar
            alt="person"
            src={val.photoURL}
            icon={<FontIcon className="material-icons">person</FontIcon>}
          />
        }
        style={isPreviewed?{backgroundColor: muiTheme.toolbar.separatorColor}:undefined}
        onTouchTap={()=>{this.handleItemClick(val, key)}}
        key={key}
        id={key}
        rightIcon={
          <div style={{fontSize: 11,color: muiTheme.listItem.secondaryTextColor }}>
            {val.lastCreated?intl.formatTime(new Date(val.lastCreated)):undefined}
          </div>
        }
        primaryText={val.displayName}
        secondaryText={`${val.lastMessage}`}
      />
      <Divider inset={true}/>
    </div>;
  }

  render(){
    const { intl, list, history, currentChatUid, usePreview } =this.props;

    const isDisplayingMessages=usePreview && currentChatUid;

    return (
      <Activity
        isLoading={list===undefined}
        title={intl.formatMessage({id: 'chats'})}>

        <div style={{
          height: '100%',
          width: '100%',
          alignItems: 'strech',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          flexDirection: 'row'
        }}>
        <List style={{padding:0, height: '100%', width:'100%', overflowY: 'auto', maxWidth: usePreview?300:undefined}} >
          <ReactList
            style={{maxWidth: 300}}
            itemRenderer={this.renderItem}
            length={list?list.length:0}
            type='simple'
          />
        </List>
        <div style={{marginLeft: 3, flexGrow: 1}}>
          {isDisplayingMessages &&
            <ChatMessages uid={currentChatUid} />
          }
        </div>
        <div
          style={{ float:"left", clear: "both" }}
        />
          <FloatingActionButton
            onTouchTap={()=>{history.push(`/chats/create`)}}
            style={{position: 'fixed', bottom:isDisplayingMessages?60:15, right: 20, zIndex: 99}}
            secondary={true}>
            <FontIcon className="material-icons" >chat</FontIcon>
          </FloatingActionButton>
      </div>

    </Activity>

  );

}

}

Chats.propTypes = {
  list: PropTypes.array.isRequired,
  history: PropTypes.object,
  intl: intlShape,
  isGranted: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownPops) => {
  const { lists, auth, browser, persistantValues } = state;

  const path=`/user_chats/${auth.uid}`;
  const usePreview=browser.greaterThan.small;
  const currentChatUid=persistantValues['current_chat_uid']?persistantValues['current_chat_uid']:undefined;

  return {
    path,
    usePreview,
    currentChatUid,
    list: lists[path],
  };
};


export default connect(
  mapStateToProps, { setPeristentValue }
)(injectIntl(withFirebase(withRouter(muiThemeable()(Chats)))));
