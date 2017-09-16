import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM  from 'react-dom';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl, intlShape } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'firekit';
import Chip from 'material-ui/Chip';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ReactList from 'react-list';
import { getGeolocation } from '../../utils/googleMaps';
import googleMapsLogo from '../../utils/resources/google-maps-logo.png'
import Scrollbar from '../../components/Scrollbar/Scrollbar';
import Image from 'material-ui-image'


const pageStep=20;

class ChatMessages extends Component {

  constructor(props) {
    super(props);
    this.name = null;
    this.listEnd=null;
  }


  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.listEnd);
    if(node){
      node.scrollIntoView({ behavior: "smooth" });
    }

  }

  componentWillReceiveProps(nextProps) {
    const {uid: currentUid, destroyPath, path, auth} =this.props;
    const {uid: nextUid, auth: nextAuth} =nextProps;

    if(currentUid!==nextUid || auth.uid!==nextAuth.uid){
      destroyPath(path);
      this.initMessages(nextProps);
    }

  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.initMessages(this.props);
    this.scrollToBottom();
  }

  initMessages = (props) => {
    const {watchList, firebaseApp, path}=props;

    let messagesRef=firebaseApp.database().ref(path).orderByKey().limitToLast(pageStep);
    watchList(messagesRef);
    watchList('predefined_chat_messages');

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

  handleAddMessage = (type, message) => {
    const { auth, firebaseApp, path } = this.props

    const newMessage = {
      created: firebase.database.ServerValue.TIMESTAMP,
      authorName: auth.displayName,
      authorUid: auth.uid,
      authorPhotoUrl: auth.photoURL,
    }

    if (type === 'image') {
      newMessage.image = message
    } else if (type === 'location') {
      newMessage.location = message
    } else {
      if(message.startsWith('http') || message.startsWith('https')) {
        newMessage.link = message
      } else {
        newMessage.message = message
      }
    }

    this.name.input.value = ''
    this.name.state.hasValue = false

    if (message.length > 0) {
      firebaseApp.database().ref(path).push(newMessage)
    }
  }


  renderList(messages) {
    const { auth, intl, muiTheme} = this.props;

    let currentDate='';
    let currentAuthor='';

    if(messages===undefined){
      return <div></div>
    }

    return messages.map((row, i) => {
      const values=row.val
      //const key=row.key

      if (values.created == null) {
        return undefined
      }

      const stringDate=new Date(values.created).toISOString().slice(0,10)
      let dataChanged=false
      let authorChanged=false
      const backgroundColor=values.authorUid===auth.uid?muiTheme.palette.primary2Color:muiTheme.palette.canvasColor
      const color=muiTheme.chip.textColor
      const type = values.message?'text':(values.link?"link":(values.location?'location':(values.image?'image':undefined)))

      if(currentDate!==stringDate){
        currentDate=stringDate;
        dataChanged=true;
      }

      if(currentAuthor!==values.authorUid){
        currentAuthor=values.authorUid;
        authorChanged=true;
      }

      return <div key={i} style={{width: '100%'}}>

        <div >
          {dataChanged &&
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 10,
              paddingBottom:10
            }}>
            <div>
              <Chip
                backgroundColor={muiTheme.palette.primary3Color}>
                {`${values.created?intl.formatRelative(new Date(values.created), {units: 'day'}):undefined}`}
              </Chip>
            </div>
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
            fontFamily: muiTheme.fontFamily}}>
            <div style={{
              display: 'flex',
              margin: 5,
              flexOrientation: 'row',
              justifyContent: 'space-between',
              width:'fit-content'}}>
              <div style={{
                maxWidth: 500,
                width: 'fit-content',
                fontSize: 16,
                paddingLeft: 8,
                margin: 'auto',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                fontFamily: muiTheme.fontFamily}}>
                {
                  type === 'location' &&
                  <div style={{padding: 7}}>
                    <div style={{padding: 3}}>
                      {intl.formatMessage({id:'my_location'})}
                    </div>
                    <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
                      <a target="_blank" href={values.location} style={{width: '100%', height: '100%'}}>
                        <img src={googleMapsLogo} alt='' height={50} width={50}/>
                      </a>
                    </div>
                  </div>
                }
                {
                  type === 'link' &&
                  <a target="_blank" href={values.link}>{values.link}</a>
                }
                {
                  type === 'image' && values.image != null &&

                  <Image
                    style={{width: 'auto', height: 'auto'}}
                    imageStyle={{maxWidth: '100%', padding: 7}}
                    onLoad={this.scrollToBottom}
                    src={values.image}
                    color={backgroundColor}
                  />
                }
                {
                  type === 'text' &&
                  values.message
                }
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

renderItem = (i, k) => {
  const { predefinedMessages, muiTheme, setSimpleValue } = this.props;

  const key = predefinedMessages[i].key;
  const message = predefinedMessages[i].val.message;

  return <div key={key}>
    <ListItem
      rightIconButton={
        <IconButton
          onClick={() => {
            setSimpleValue('chatMessageMenuOpen', false)
            this.handleAddMessage("text", message)
          }}>
          <FontIcon className="material-icons" color={muiTheme.palette.text1Color}>send</FontIcon>
        </IconButton>
      }
      onClick={()=>{
        setSimpleValue('chatMessageMenuOpen', false);
        this.name.input.value = message;
        this.name.state.hasValue = true;
        this.name.state.isFocused = true;
        this.name.focus();
      }}
      key={key}
      id={key}
      primaryText={message}
    />
    <Divider/>
  </div>;
}

uploadSelectedFile = (file, handleAddMessage) => {
  const { firebaseApp, intl } = this.props

  if(file == null) {
    return
  }

  if(((file.size/1024)/1024).toFixed(4) > 20) { //file larger than 10mb
    alert(intl.formatMessage({id: 'max_file_size'}))
    return
  }

  let reader = new FileReader()

  let key=firebaseApp.database().ref(`/user_chat_messages/`).push().key


  reader.onload = function(fileData) {
    let uploadTask = firebaseApp.storage().ref(`/user_chats/${key}`).putString(fileData.target.result, 'data_url')

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
    }, error => {
      console.log(error)
    }, ()=>{
      handleAddMessage('image', uploadTask.snapshot.downloadURL)
    })
  }

  reader.readAsDataURL(file)
}



render(){

  const {
    messages,
    muiTheme,
    intl,
    setSimpleValue,
    chatMessageMenuOpen,
    predefinedMessages,
    uid,
    firebaseApp,
    auth
  } = this.props

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: muiTheme.chip.backgroundColor,
      }}
      onClick={() => {
        firebaseApp.database().ref(`user_chats/${auth.uid}/${uid}/unread`).remove();
      }}>

      <Scrollbar
        style={{
          backgroundColor: muiTheme.palette.convasColor,
          width: '100%',
        }}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div  style={{maxWidth: 600, margin: 8, width: '100%'}} >
            <div style={{display: 'flex', justifyContent:'center'}}>
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
      </Scrollbar>


      <div style={{
        display:'block',
        alignItems: 'row',
        justifyContent: 'center',
        height: chatMessageMenuOpen?300:56,
        backgroundColor: muiTheme.palette.canvasColor
      }}>
      <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <IconButton
          onClick={() => {
            if(chatMessageMenuOpen === true) {
              setSimpleValue('chatMessageMenuOpen', false);
            } else {
              setSimpleValue('chatMessageMenuOpen', true);
            }
          }}>
          <FontIcon className="material-icons" color={muiTheme.palette.borderColor}>{chatMessageMenuOpen===true?'keyboard_arrow_down':'keyboard_arrow_up'}</FontIcon>
        </IconButton>

        <div style={{
          backgroundColor: muiTheme.chip.backgroundColor,
          flexGrow: 1,
          borderRadius: 8,
          paddingLeft: 8,
          paddingRight: 8,
        }}>
        <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
          <TextField
            id="message"
            style={{height:42, lineHeight: undefined}}
            underlineShow={false}
            fullWidth={true}
            hintText={intl.formatMessage({id:'write_message_hint'})}
            onKeyDown={(event)=>{this.handleKeyDown(event, () => this.handleAddMessage("text", this.name.getValue()))}}
            ref={(field) => { this.name = field}}
            type="Text"
          />
          <div style={{position: 'absolute', right: 25, top: -3, width: 20, height: 0}}>
            <IconButton
              onClick={() =>
                getGeolocation((pos) => {
                  if(!pos) {
                    return;
                  } else if(!pos.coords) {
                    return;
                  }

                  const lat = pos.coords.latitude;
                  const long = pos.coords.longitude;
                  this.handleAddMessage("location", `https://www.google.com/maps/place/${lat}+${long}/@${lat},${long}`);
                },
                (error) => console.log(error))
              }>
              <FontIcon className="material-icons" color={muiTheme.palette.borderColor}>my_location</FontIcon>
            </IconButton>
          </div>


          <input
            style={{display: 'none'}}
            type='file'
            onChange={(e) => this.uploadSelectedFile(e.target.files[0], this.handleAddMessage)}
            ref={(input) => {this.fileInput = input}}
          />

          <div style={{position: 'absolute', right: 55, top: -3, width: 20, height: 0}}>
            <IconButton
              containerElement='label'
              onClick={() => this.fileInput.click()}>
              <FontIcon className="material-icons" color={muiTheme.palette.borderColor}>photo</FontIcon>
            </IconButton>
          </div>
        </div>
      </div>
      <IconButton
        disabled={messages===undefined}
        onClick={() => this.handleAddMessage("text", this.name.getValue())}>
        <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>send</FontIcon>
      </IconButton>
    </div>
    {
      chatMessageMenuOpen &&
      <Scrollbar style={{height: 200, backgroundColor: muiTheme.chip.backgroundColor}}>
        <div style={{padding: 10, paddingRight: 0,}}>
          <ReactList
            itemRenderer={this.renderItem}
            length={predefinedMessages?predefinedMessages.length:0}
            type='simple'
          />
        </div>
      </Scrollbar>
    }
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

  const path=`user_chat_messages/${auth.uid}/${uid}`
  const chatMessageMenuOpen = simpleValues['chatMessageMenuOpen']===true
  const imageDialogOpen = simpleValues.chatOpenImageDialog;

  return {
    imageDialogOpen,
    simpleValues,
    path,
    uid,
    chatMessageMenuOpen,
    messages: lists[path],
    predefinedMessages: lists['predefined_chat_messages'],
    auth,
    browser
  };
};



export default connect(
  mapStateToProps, { setSimpleValue }
)(injectIntl(muiThemeable()(withRouter(withFirebase(ChatMessages)))));
