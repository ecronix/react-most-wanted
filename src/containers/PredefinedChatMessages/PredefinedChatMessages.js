import React, {Component} from 'react';
import { connect } from 'react-redux';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../containers/Activity';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withFirebase } from 'firekit';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import isGranted  from '../../utils/auth';
import PropTypes from 'prop-types';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {BottomNavigation} from 'material-ui/BottomNavigation';
import Dialog from 'material-ui/Dialog';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ReactList from 'react-list';


const path=`predefined_chat_messages`;

class PredefinedChatMessages extends Component {

  componentWillMount(){
    const { watchList } = this.props;
    watchList(path);
  }




  handleClose = () => {
    const { setSimpleValue } = this.props;
    setSimpleValue('delete_predefined_chat_message', undefined);
  }

  handleDelete = (key) => {
    const { firebaseApp, delete_predefined_chat_message } = this.props;

    if(key) {
      firebaseApp.database().ref(`${path}/${delete_predefined_chat_message}`).remove().then(() => {
        this.handleClose();
      });
    }
  }

  handleKeyDown = (event, onSucces) => {
    if(event.keyCode===13){
      onSucces();
    }
  }

  handleAddMessage = () => {
    const { firebaseApp } = this.props;
    console.log(this);
    const message = this.refs["predefinedChatMessage"].refs.component.input.value;
    this.refs["predefinedChatMessage"].refs.component.input.value = '';

    if(message.length>0){
      firebaseApp.database().ref(path).push({message});
    }
  }


  renderItem = (i, k) => {
    const { list, setSimpleValue } =this.props;

    const key = list[i].key;
    const message = list[i].val.message;

    return (
      <div key={key}>
        <ListItem
          key={key}
          primaryText={message}
          rightIconButton={
            <IconButton
              onClick={() => setSimpleValue('delete_predefined_chat_message', key)}>
              <FontIcon className="material-icons" color={'red'}>{'delete'}</FontIcon>
            </IconButton>
          }
          id={key}
        />

        <Divider/>
      </div>
    );
  }


  render(){
    const {
      intl,
      list,
      muiTheme,
      delete_predefined_chat_message
    } = this.props;

    const actions = [
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'delete'})}
        secondary={true}
        onClick={this.handleDelete}
      />,
    ];

    return (
      <Activity
        isLoading={list===undefined}
        containerStyle={{overflow:'hidden'}}
        title={intl.formatMessage({id: 'predefined_messages'})}>

        <div id="scroller" style={{overflow: 'auto', height: '100%'}}>
          <div style={{width: '100%', overflow: 'auto', backgroundColor: muiTheme.palette.convasColor, paddingBottom: 56}}>
            <List style={{height: '100%'}} ref={(field) => { this.list = field; }}>
              <ReactList
                itemRenderer={this.renderItem}
                length={list?list.length:0}
                type='simple'
              />
            </List>
            <div style={{ float: "left", clear: "both" }}
              ref={(el) => { this.listEnd = el; }}
            />
          </div>


          {list &&
            <BottomNavigation style={{width: '100%', position: 'absolute', bottom: 0, right: 0, left: 0, zIndex: 50}}>
              <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                <TextField
                  id="predefinedChatMessage"
                  fullWidth={true}
                  onKeyDown={(event)=>{this.handleKeyDown(event, this.handleAddMessage)}}
                  ref='predefinedChatMessage'
                  type="Text"
                />

                <IconButton
                  onClick={this.handleAddMessage}>
                  <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>send</FontIcon>
                </IconButton>
              </div>
            </BottomNavigation>
          }

          <Dialog
            title={intl.formatMessage({id: 'delete_predefined_chat_message_title'})}
            actions={actions}
            modal={false}
            open={delete_predefined_chat_message!==undefined}
            onRequestClose={this.handleClose}>
            {intl.formatMessage({id: 'delete_predefined_chat_message_message'})}
          </Dialog>


        </div>
      </Activity>

    );

  }

}

PredefinedChatMessages.propTypes = {
  list: PropTypes.array.isRequired,
  history: PropTypes.object,
  intl: intlShape.isRequired,
  isGranted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { lists, simpleValues, browser } = state;

  const delete_predefined_chat_message = simpleValues.delete_predefined_chat_message;

  return {
    browser,
    delete_predefined_chat_message,
    list: lists[path],
    isGranted: grant=>isGranted(state, grant)
  };
};


export default connect(
  mapStateToProps, { setSimpleValue }
)(injectIntl(muiThemeable()(withRouter(withFirebase(PredefinedChatMessages)))));
