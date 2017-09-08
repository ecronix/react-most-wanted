import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ReactDOM  from 'react-dom';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {BottomNavigation} from 'material-ui/BottomNavigation';
import {withRouter} from 'react-router-dom';
import { withFirebase } from 'firekit';
import Chip from 'material-ui/Chip';

const pageStep=20;

class ChatMessages extends Component {

  constructor(props) {
    super(props);
    this.name = null;
    this.listEnd=null
  }


  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.listEnd);
    if(node){
      node.scrollIntoView({ behavior: "smooth" });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {uid: currentUid, unwatchList, path} =this.props;
    const {uid: nextUid} =nextProps;

    if(currentUid!==nextUid){

      unwatchList(path)
      this.initMessages(nextProps)
    }

  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  componentWillMount() {
    this.initMessages(this.props)
  }

  initMessages = (props) => {
    const {watchList, firebaseApp, path}=props;

    let messagesRef=firebaseApp.database().ref(path).orderByKey().limitToLast(pageStep);
    watchList(messagesRef);
  }

  componentDidMount() {
    this.scrollToBottom();
  }


  handleLoadMore = () => {
    const { watchList, unwatchList, firebaseApp, setSimpleValue, simpleValues, path } =this.props;

    const currentAmount=simpleValues['chat_messages_limit']?simpleValues['chat_messages_limit']:pageStep;
    const nextAmount=currentAmount+pageStep;

    unwatchList(path);
    setSimpleValue('chat_messages_limit', nextAmount);
    let messagesRef=firebaseApp.database().ref(path).orderByKey().limitToLast(nextAmount);
    watchList(messagesRef);

  }


  handleKeyDown = (event, onSucces) => {
    if(event.keyCode===13){
      onSucces();
    }
  }

  handleAddMessage = () => {
    const { auth, firebaseApp, path}=this.props;

    const message=this.name.getValue();

    const newTask={
      message: message,
      created: firebase.database.ServerValue.TIMESTAMP ,
      authorName: auth.displayName,
      authorUid: auth.uid,
      authorPhotoUrl: auth.photoURL,
    }

    this.name.input.value='';

    if(message.length>0){
      firebaseApp.database().ref(path).push(newTask);
    }



  }


  renderList(messages) {
    const { auth, intl, muiTheme, history} =this.props;

    let currentDate='';
    let currentAuthor='';

    if(messages===undefined){
      return <div></div>
    }

    return _.map(messages, (row, i) => {

      const values=row.val;
      const stringDate=new Date(values.created).toISOString().slice(0,10)
      let dataChanged=false;
      let authorChanged=false;
      const backgroundColor=values.authorUid===auth.uid?muiTheme.palette.primary2Color:muiTheme.palette.canvasColor;
      const color=muiTheme.chip.textColor;

      if(currentDate!==stringDate){
        currentDate=stringDate;
        dataChanged=true;
      }

      if(currentAuthor!==values.authorUid){
        currentAuthor=values.authorUid;
        authorChanged=true;
      }

      return <div key={i} style={{width: '100%'}}>

        <div style={{width: '100%'}}>
          {dataChanged &&
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 5}}>
              <Chip
                backgroundColor={muiTheme.palette.primary3Color}>
                {`${values.created?intl.formatRelative(new Date(values.created), {units: 'day'}):undefined}`}
              </Chip>
            </div>
          }

          <div style={{display: 'flex', width: '100%', justifyContent: values.authorUid===auth.uid?'flex-end':'flex-start'}}>
            <div style={{
              ...muiTheme.chip,
              margin: 1,
              marginTop: authorChanged===true?8:1,
              boxShadow: muiTheme.chip.shadow,
              borderRadius: authorChanged===true?(values.authorUid===auth.uid?'8px 0px 8px 8px':'0px 8px 8px 8px'):'8px 8px 8px 8px' ,
              backgroundColor:backgroundColor,
              color:color,
              fontFamily: muiTheme.fontFamily  }}>
              <div style={{
                display: 'flex',
                margin: 5,
                flexOrientation: 'row',
                justifyContent: 'space-between',
                width:'fit-content'  }}>
                <div style={{
                  maxWidth: 500,
                  width: 'fit-content',
                  fontSize: 16,
                  paddingLeft: 8,
                  margin: 'auto',
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'break-word',
                  fontFamily: muiTheme.fontFamily}}>
                  {values.authorUid!==auth.uid &&
                    <div
                      onClick={()=>{history.push(`/chats/edit/${values.authorUid}`)}}
                      style={{color: muiTheme.palette.accent1Color, fontSize: 12, marginLeft: 0, cursor: 'pointer'}}>
                      {values.authorName}
                    </div>
                  }
                  {values.message}
                </div>
                <div style={{
                  fontSize: 9,
                  color:values.authorUid!==auth.uid?muiTheme.palette.primary2Color:muiTheme.palette.canvasColor,
                  marginLeft: 8,
                  //marginRight: 3,
                  //marginLeft: 5,
                  alignSelf: 'flex-end',
                  fontFamily: muiTheme.fontFamily
                }}>
                {`${values.created?intl.formatTime(new Date(values.created)):undefined}`}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  });
}


render(){
  const {messages, muiTheme, intl} =this.props;

  return (


    <div style={{overflow: 'hidden', height: '100%', width: '100%', backgroundColor: muiTheme.chip.backgroundColor}}>
      <div id="scroller" style={{overflow: 'auto', height: '100%'}}>

        <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor, paddingBottom: 56}}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div  style={{height: '100%', maxWidth: 600, width: '100%', margin: 8}} ref={(field) => { this.list = field; }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 5}}>
                <Chip
                  onClick={this.handleLoadMore}
                  backgroundColor={muiTheme.palette.primary3Color}>
                  {intl.formatMessage({id:'load_more_label'})}
                </Chip>
              </div>

              {this.renderList(messages)}
            </div>
          </div>
          <div
            style={{ float:"left", clear: "both" }}
            ref={(el) => { this.listEnd = el; }}>

          </div>
        </div>

      </div>

      <div style={{position: 'relative', width: '100%'}}>
        <BottomNavigation
          style={{ position: 'absolute', bottom: 0, right: 0, left: 0, zIndex: 50}}>
          <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', padding: 15}}>
            <div style={{
              backgroundColor: muiTheme.chip.backgroundColor,
              flexGrow: 1,
              borderRadius: 8,
              paddingLeft: 8,
              paddingRight: 8,
            }}>
            <TextField
              id="public_task"
              underlineShow={false}
              fullWidth={true}
              hintText={intl.formatMessage({id:'write_message_hint'})}
              onKeyDown={(event)=>{this.handleKeyDown(event, this.handleAddMessage)}}
              ref={(field) => { this.name = field}}
              type="Text"
            />
          </div>
          <IconButton
            disabled={messages===undefined}
            onClick={this.handleAddMessage}>
            <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>send</FontIcon>
          </IconButton>
        </div>
      </BottomNavigation>
    </div>
  </div>

);

}

}

ChatMessages.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownPops) => {
  const { lists, auth, browser, simpleValues } = state;
  const { uid } = ownPops;

  const path=`public_chats`;

  let receiverDisplayName='';
  let receiverPhotoURL='';

  return {
    path,
    uid,
    receiverDisplayName,
    receiverPhotoURL,
    simpleValues,
    messages: lists[path],
    auth,
    browser
  };
};




export default connect(
  mapStateToProps, { setSimpleValue }
)(injectIntl(muiThemeable()(withRouter(withFirebase(ChatMessages)))));
