import React, {Component} from 'react';
import { connect } from 'react-redux';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../containers/Activity';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withFirebase } from 'firekit';
import { withRouter } from 'react-router-dom';
import ReactList from 'react-list';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';

class Chats extends Component {

  componentDidMount(){
    const {watchList, path} =this.props;

    watchList(path);
  }

  renderItem = (i, k) => {
    const { list, history, intl } = this.props;

    const key=list[i].key;
    const val=list[i].val;

    return <div key={key}>
      <ListItem
        leftAvatar={
          <Avatar
            alt="person"
            src={val.photoURL}
            icon={<FontIcon className="material-icons">person</FontIcon>}
          />
        }
        onTouchTap={()=>{history.push(`/chats/edit/${key}`)}}
        key={key}
        id={key}
        primaryText={val.displayName}
        secondaryText={`${val.lastMessage} ${val.lastCreated?intl.formatRelative(new Date(val.lastCreated)):undefined}` }
      />
      <Divider inset={true}/>
    </div>;
  }

  render(){
    const { intl, list, history } =this.props;


    return (
      <Activity
        isLoading={list===undefined}
        title={intl.formatMessage({id: 'chats'})}>

        <div >
          <List style={{height: '100%'}} ref={(field) => { this.list = field; }}>
            <ReactList
              itemRenderer={this.renderItem}
              length={list?list.length:0}
              type='simple'
            />
          </List>
          <div
            style={{ float:"left", clear: "both" }}
          />
          <FloatingActionButton
            onTouchTap={()=>{history.push(`/chats/create`)}}
            style={{position: 'fixed', bottom:15, right: 20, zIndex: 99}}
            secondary={true}>
            <FontIcon className="material-icons" >chat</FontIcon>
          </FloatingActionButton>
        </div>

      </Activity>

    );

  }

}

Chats.propTypes = {
  list: PropTypes.array,
  history: PropTypes.object,
  intl: intlShape,
};

const mapStateToProps = (state, ownPops) => {
  const { lists, auth } = state;

  const path=`/user_chats/${auth.uid}`

  return {
    path,
    list: lists[path],
  };
};


export default connect(
  mapStateToProps
)(injectIntl(withFirebase(withRouter(Chats))));
