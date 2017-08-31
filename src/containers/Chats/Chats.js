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
import { setPersistentValue } from '../../store/persistentValues/actions';
import ChatMessages from './ChatMessages';
import Scrollbar from '../../components/Scrollbar/Scrollbar';
import { filterSelectors } from 'material-ui-filter'

class Chats extends Component {

  componentDidMount(){
    const { watchList, path } =this.props;

    watchList(path);
  }

  handleItemClick = (val, key) => {
    const { usePreview, history, setPersistentValue, firebaseApp, auth } = this.props;

    if(val.unread>0){
      firebaseApp.database().ref(`user_chats/${auth.uid}/${key}/unread`).remove();
    }

    if(usePreview){
      setPersistentValue('current_chat_uid', key);
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
        onClick={()=>{this.handleItemClick(val, key)}}
        key={key}
        id={key}
        rightIcon={
          <div style={{width: 'auto',fontSize: 11,color: muiTheme.listItem.secondaryTextColor }}>
            <div style={{width: 'auto',color: val.unread>0?muiTheme.palette.primary1Color:undefined}} >
              {val.lastCreated?intl.formatTime(new Date(val.lastCreated), 'hh:mm'):undefined}
            </div>
            {val.unread>0 &&
              <div style={{textAlign: 'right'}}>
                <Avatar
                  size={20}
                  backgroundColor={muiTheme.palette.primary1Color}
                  color={muiTheme.palette.primaryTextColor}
                  alt="unread">
                  <div style={{color: muiTheme.listItem.secondaryTextColor}} >
                    {val.unread}
                  </div>
                </Avatar>
              </div>
            }
          </div>
        }
        primaryText={val.unread>0?<div><b>{val.displayName}</b></div>:val.displayName}
        secondaryText={val.unread>0?<div><b>{val.lastMessage}</b></div>:val.lastMessage}
      />
      <Divider inset={true}/>
    </div>;
  }


  render(){
    const {
      intl,
      list,
      history,
      currentChatUid,
      usePreview
    } = this.props;

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
        <Scrollbar style={{ maxWidth: usePreview?300:undefined}}>
          <List style={{padding:0, height: '100%', width:'100%', maxWidth: usePreview?300:undefined}} >
            <ReactList
              style={{maxWidth: 300}}
              itemRenderer={this.renderItem}
              length={list?list.length:0}
              type='simple'
            />
          </List>
        </Scrollbar>

        <div style={{position: 'absolute', width: usePreview?300:'100%', height: '100%'}}>
          <FloatingActionButton
            onClick={()=>{history.push(`/chats/create`)}}
            style={{position: 'absolute', right: 20, bottom: 10, zIndex: 99}}
            secondary={true}>
            <FontIcon className="material-icons" >chat</FontIcon>
          </FloatingActionButton>
        </div>

        <div style={{marginLeft: 0, flexGrow: 1}}>
          {isDisplayingMessages &&
            <ChatMessages uid={currentChatUid} />
          }
        </div>
        <div
          style={{ float:"left", clear: "both" }}
        />
      </div>
    </Activity>
  );
}

}

Chats.propTypes = {
  list: PropTypes.array.isRequired,
  history: PropTypes.object,
  intl: intlShape,
};

const mapStateToProps = (state, ownPops) => {
  const { lists, auth, browser, persistentValues } = state;

  const path=`user_chats/${auth.uid}`;
  const usePreview=browser.greaterThan.small;
  const currentChatUid=persistentValues['current_chat_uid']?persistentValues['current_chat_uid']:undefined;

  const list=lists[path]?lists[path].sort(filterSelectors.dynamicSort('lastCreated', false, fieldValue => fieldValue.val)):[];

  return {
    auth,
    path,
    usePreview,
    currentChatUid,
    list,
  };
};


export default connect(
  mapStateToProps, { setPersistentValue }
)(injectIntl(withFirebase(withRouter(muiThemeable()(Chats)))));
