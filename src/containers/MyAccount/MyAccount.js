import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import * as authActions from '../../store/auth/actions';
import { getValidationErrorMessage, isLinkedWithProvider } from '../../store/auth/selectors';
import { Activity } from '../../components/Activity';
import { PasswordDialog } from '../../containers/PasswordDialog';
import { ImageCropDialog } from '../../containers/ImageCropDialog';
import { ChangePasswordDialog } from '../../containers/ChangePasswordDialog';
import { DeleteAccountDialog } from '../../containers/DeleteAccountDialog';
import Snackbar from 'material-ui/Snackbar';
import {GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon} from '../../components/Icons';
import IconButton from 'material-ui/IconButton';
import config from '../../config';
import FlatButton from 'material-ui/FlatButton';

const styles={
  paper:{
    display: 'block',
    minHeight: 300,
    margin:15,
    padding: 15
  },
  header:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 80,
  },
  button: {
    marginBottom:10,
    //align: 'left'
  },
  avatar: {
    float: 'right',
    overflow: 'none',
    alignSelf: 'center',
    marginTop:-100,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%',
    opacity: '0'
  },
  buttons_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}

export class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.email = null;
    this.name = null;
    this.photoURL = null;
    this.password = null;
    this.confirm_password = null;
    this.tempPath = null;
    this.cropper = null;

  }

  hanldePhotoULRChange = (e) => {
    const {setNewPhotoURL}=this.props;

    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setNewPhotoURL(reader.result);
    };
    reader.readAsDataURL(files[0]);
  }



  hanleUpdateSubmit = () => {
    const {updateUser} =this.props;

    updateUser({displayName: this.name.getValue()});
  }

  handleKeyDown = (event, onSucces) => {

    if(event.keyCode===13){
      onSucces();
    }
  }


  handlePasswordChange = () => {
    const { auth, reauthenticateUser, setIsEditing} =this.props;

    reauthenticateUser(auth, ()=>{setIsEditing('change_password')});

  }

  handleEmailChangeSubmit = () => {
    const {changeEmail, reauthenticateUser, auth,} =this.props;

    const email=this.email.getValue();
    reauthenticateUser(auth, ()=>{changeEmail(email, this.handlePasswordChangeSuccess)})
  }

  handleDeleteAccount = () => {
    const {setDeleteDialogOpen} =this.props;

    setDeleteDialogOpen(true);
  }

  getProviderIcon = (provider) => {

    const {muiTheme, intl, auth, linkUserWithPopup} =this.props;

    const color=muiTheme.palette.primary2Color;

    return <IconButton
      key={provider}
      disabled={isLinkedWithProvider(auth, provider)}
      onTouchTap={()=>{linkUserWithPopup(provider)}}
      tooltip={intl.formatMessage({id: `link_with_${provider}`})}>
      {provider==='google'&&<GoogleIcon color={color}/>}
      {provider==='facebook'&&<FacebookIcon color={color}/>}
      {provider==='twitter'&&<TwitterIcon color={color}/>}
      {provider==='github'&&<GitHubIcon color={color}/>}
    </IconButton>
  }

  render(){
    const {intl, getValidationErrorMessage, auth, authError, muiTheme, sendEmailVerification, setIsEditing } =this.props;

    const isSnackbarOpen=auth.error !==undefined
    && auth.error.message
    && auth.error.code!==undefined
    && auth.error.code.indexOf('email')<0
    && auth.error.code.indexOf('password')<0
    && auth.error.code.indexOf('confirm_password')<0;

    return (
      <Activity
        title={intl.formatMessage({id: 'my_account'})}>

        <div style={styles.container}>

          <Paper  zDepth={2} style={styles.paper}>
            <div style={styles.header}>

              <Avatar
                style={styles.avatar}
                size={150}
                icon={auth.photoURL===null?<FontIcon className="material-icons" >account_circle</FontIcon>:undefined}
                src={auth.photoURL}
              />

              { auth.isEditing &&
                <FlatButton
                  containerElement='label'
                  primary={true}
                  style={styles.button}
                  //fullWidth={true}
                  icon={
                    <FontIcon
                      className="material-icons">
                      photo_camera
                    </FontIcon>
                  }>

                  <input
                    ref={(field) => { this.photoURL = field; }}
                    type="file"
                    accept="image/*"
                    style={{display:'none'}}
                    onChange={this.hanldePhotoULRChange}
                  />
                </FlatButton>
              }

              { !auth.isEditing &&
                <div style={styles.buttons_container}>
                  {config.providers.map((p)=>{
                    return this.getProviderIcon(p);
                  })}

                </div>
              }

              { auth.isEditing && <div>
                <TextField
                  id="name"
                  ref={(field) => { this.name = field; }}
                  //underlineShow={false}
                  defaultValue={auth.displayName}
                  onKeyDown={(e)=>{this.handleKeyDown(e, this.hanleUpdateSubmit)}}
                  errorText={getValidationErrorMessage('name')}
                  floatingLabelText={intl.formatMessage({id: 'name'})}
                  type="Text"
                  fullWidth={true}
                /> <br/>
                <TextField
                  id="email"
                  ref={(field) => { this.email = field; }}
                  defaultValue={auth.email}
                  onKeyDown={(e)=>{this.handleKeyDown(e, this.handleEmailChangeSubmit)}}
                  errorText={getValidationErrorMessage('email')}
                  floatingLabelText={intl.formatMessage({id: 'email'})}
                  hintText={intl.formatMessage({id: 'password'})}
                  type="Email"
                  fullWidth={true}
                />
              </div>
            }

            { !auth.isEditing && <div>
              <h3>{auth.displayName}</h3>
              <span>
                {auth.email}
                <IconButton
                  onTouchTap={auth.emailVerified===true?undefined:()=>{sendEmailVerification()}}
                  tooltip={intl.formatMessage({id: auth.emailVerified===true?'email_verified':'email_not_verified'})}>
                  <FontIcon
                    color={auth.emailVerified===true?muiTheme.palette.primary1Color:muiTheme.palette.accent1Color}
                    style={{'paddingLeft': 10}}
                    className="material-icons">
                    {auth.emailVerified===true?'verified_user':'error'}
                  </FontIcon>
                </IconButton>
              </span>
            </div>
          }


        </div>

        <div style={{marginBottom: 20}}>

        </div>

        <RaisedButton
          label={intl.formatMessage({id: auth.isEditing?'cancel':'edit'})}
          primary={true}
          disabled={auth.isFetching}
          style={styles.button}
          fullWidth={true}
          onTouchTap={()=>{setIsEditing(!auth.isEditing)}}
          icon={
            <FontIcon
              className="material-icons">
              {auth.isEditing?'cancel':'edit'}
            </FontIcon>
          }
        />
        <br/>
        <RaisedButton
          label={intl.formatMessage({id: 'change_password'})}
          disabled={auth.isFetching}
          primary={true}
          fullWidth={true}
          style={styles.button}
          onTouchTap={this.handlePasswordChange}
          icon={
            <FontIcon
              className="material-icons">
              lock
            </FontIcon>
          }
        /> <br/>
        <RaisedButton
          label={intl.formatMessage({id: 'delete_account'})}
          disabled={auth.isFetching}
          secondary={true}
          fullWidth={true}
          onTouchTap={this.handleDeleteAccount}
          icon={
            <FontIcon
              className="material-icons">
              delete
            </FontIcon>
          }
        />

      </Paper>

    </div>

    <PasswordDialog />
    <DeleteAccountDialog />
    <ImageCropDialog
      open={auth.newPhotoURL!==null}
      title={intl.formatMessage({id: 'change_photo'})}
    />

    <ChangePasswordDialog
      open={auth.isEditing==='change_password'}
      title={intl.formatMessage({id: 'change_password'})}
    />

    <Snackbar
      bodyStyle={{height:'100%'}}
      open={isSnackbarOpen}
      message={isSnackbarOpen?auth.error.message:''}
      action="OK"
      autoHideDuration={5000}
      onRequestClose={()=>{authError(undefined)}}
      onActionTouchTap={()=>{authError(undefined)}}
    />

  </Activity>
);

}

}

MyAccount.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  authError: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  setNewPhotoURL: PropTypes.func.isRequired,
  updateUserPhoto: PropTypes.func.isRequired,
  linkUserWithPopup: PropTypes.func.isRequired,
  getValidationErrorMessage: PropTypes.func.isRequired,
  setDeleteDialogOpen: PropTypes.func.isRequired,
  reauthenticateUser: PropTypes.func.isRequired,
  sendEmailVerification: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  const { auth, router } = state;
  return {
    auth,
    router,
    getValidationErrorMessage: (fieldID)=>getValidationErrorMessage(auth, fieldID)
  };
};

export const MyAccountTest = injectIntl(muiThemeable()(MyAccount));

export default connect(
  mapStateToProps,
  {
    ...authActions
  }
)(injectIntl(muiThemeable()(MyAccount)));
