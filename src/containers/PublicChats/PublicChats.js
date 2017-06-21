import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ReactDOM  from 'react-dom';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../containers/Activity';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import {BottomNavigation} from 'material-ui/BottomNavigation';
import {withRouter} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { withFirebase } from 'firekit';

class PublicChats extends Component {

  constructor(props) {
    super(props);
    this.name = null;
    this.listEnd=null
  }


  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.listEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate(prevProps, prevState) {

    this.scrollToBottom();

  }

  componentDidMount() {
    const {watchList, firebaseApp}=this.props;

    let messagesRef=firebaseApp.database().ref('public_chats').orderByKey().limitToLast(30);
    watchList(messagesRef)
    this.scrollToBottom();
  }

  handleKeyDown = (event, onSucces) => {
    if(event.keyCode===13){
      onSucces();
    }
  }

  handleAddTask = () => {
    const { auth, firebaseApp}=this.props;

    const message=this.name.getValue();

    const newTask={
      message: message,
      created: firebase.database.ServerValue.TIMESTAMP ,
      userName: auth.displayName,
      userPhotoURL: auth.photoURL,
      userId: auth.uid
    }

    this.name.input.value='';

    if(message.length>0){
      firebaseApp.database().ref('public_chats').push(newTask);
    }



  }

  handleUpdateTask = (key, task) => {
    const { firebaseApp }=this.props;
    firebaseApp.database().ref(`public_chats/${key}`).update(task);
  }


  userAvatar = (key, task) => {
    const {auth} =this.props;

    return <Avatar
      src={task.userPhotoURL}
      onTouchTap={auth.uid===task.userId?()=>{this.handleUpdateTask(key,{...task, completed: !task.completed})}:undefined}
      alt="person"
      icon={
        <FontIcon className="material-icons">
          person
        </FontIcon>
      }

    />
  }

  renderList(messages) {
    const { auth, intl, browser, setDialogIsOpen} =this.props;

    if(messages===undefined){
      return <div></div>
    }

    return _.map(messages, (row, i) => {

      const task=row.val;
      const key=row.key;

      return <div key={key}>

        <ListItem
          key={key}
          primaryText={task.message}
          secondaryText={`${task.userName} ${task.created?intl.formatRelative(new Date(task.created)):undefined}`}
          leftAvatar={this.userAvatar(key, task)}
          rightIconButton={
            task.userId===auth.uid?
            <IconButton
              style={{display:browser.lessThan.medium?'none':undefined}}
              onTouchTap={()=>{setDialogIsOpen('delete_message', key);}}>
              <FontIcon className="material-icons" color={'red'}>{'delete'}</FontIcon>
            </IconButton>:undefined
          }
          id={key}
        />


        <Divider inset={true}/>
      </div>
    });
  }

  handleClose = () => {
    const { setDialogIsOpen }=this.props;
    setDialogIsOpen('delete_message', undefined);
  }

  handleDelete = (key) => {
    const {firebaseApp, dialogs, unwatchList, watchList} =this.props;

    unwatchList('public_chats');

    firebaseApp.database().ref(`public_chats/${dialogs.delete_message}`).remove();

    let messagesRef=firebaseApp.database().ref('public_chats').orderByKey().limitToLast(30);
    watchList(messagesRef)

    this.handleClose();
  }

  render(){
    const {intl, messages, muiTheme, dialogs} =this.props;


    const actions = [
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'delete'})}
        secondary={true}
        onTouchTap={this.handleDelete}
      />,
    ];


    return (
      <Activity
        isLoading={messages===undefined}
        containerStyle={{overflow:'hidden'}}
        title={intl.formatMessage({id: 'public_chats'})}>

        <div style={{overflow: 'hidden', height: '100%'}}>
          <div id="scroller" style={{overflow: 'auto', height: '100%'}}>

            <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor, paddingBottom: 56}}>
              <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
                {this.renderList(messages)}
              </List>
              <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.listEnd = el; }}
              />
            </div>


            <div>
              <BottomNavigation
                style={{width: '100%', position: 'absolute', bottom: 0, right: 0, left: 0, zIndex: 50}}>
                <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                  <TextField
                    id="public_task"
                    fullWidth={true}
                    onKeyDown={(event)=>{this.handleKeyDown(event, this.handleAddTask)}}
                    ref={(field) => { this.name = field; this.name && this.name.focus(); }}
                    type="Text"
                  />
                  <IconButton
                    disabled={messages===undefined}
                    onTouchTap={this.handleAddTask}>
                    <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>send</FontIcon>
                  </IconButton>
                </div>
              </BottomNavigation>
            </div>
            <Dialog
              title={intl.formatMessage({id: 'delete_message_title'})}
              actions={actions}
              modal={false}
              open={dialogs.delete_message!==undefined}
              onRequestClose={this.handleClose}>
              {intl.formatMessage({id: 'delete_message_message'})}
            </Dialog>

          </div>
        </div>

      </Activity>
    );

  }

}

PublicChats.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { lists, auth, browser, dialogs } = state;

  return {
    messages: lists.public_chats,
    auth,
    browser,
    dialogs
  };
};




export default connect(
  mapStateToProps,
  { setDialogIsOpen }
)(injectIntl(muiThemeable()(withRouter(withFirebase(PublicChats)))));
