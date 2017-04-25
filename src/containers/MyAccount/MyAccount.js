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
import {
  authError,
  updateUser,
  changePassword,
  changeEmail,
  setNewPhotoURL,
  updateUserPhoto,
  linkUserWithPopup,
  setDeleteDialogOpen,
  reauthenticateUser,
  sendEmailVerification
} from '../../store/auth/actions';
import { getValidationErrorMessage, isLinkedWithProvider } from '../../store/auth/selectors';
import { Activity } from '../../components/Activity';
import { PasswordDialog } from '../../containers/PasswordDialog';
import { DeleteAccountDialog } from '../../containers/DeleteAccountDialog';
import Snackbar from 'material-ui/Snackbar';
import {GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon} from '../../components/Icons';
import IconButton from 'material-ui/IconButton';
import {Cropper} from 'react-image-cropper';
import config from '../../config';


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
    paddingTop: 50,
  },
  button: {
    marginBottom:10,
    //align: 'left'
  },
  avatar: {
    float: 'right',
    overflow: 'none',
    alignSelf: 'center',
    marginTop:-60,
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
      setNewPhotoURL(reader.result)
    };
    reader.readAsDataURL(files[0]);
  }



  hanleUpdateSubmit = () => {
    const {updateUser} =this.props;

    updateUser({displayName: this.name.getValue()});
  }

  hanleUpdatePhotoSubmit = () => {
    const { auth, updateUserPhoto} =this.props;

    updateUserPhoto(this.cropper.crop(), auth.uid);
  }

  handlePasswordChangeSuccess = () => {
    const {authError} =this.props;
    authError({
      code: 'success',
      message: 'Password changed successfully'
    })
  }

  handlePasswordChangeSubmit = () => {
    const { auth, reauthenticateUser, changePassword, authError} =this.props;

    const password=this.password.getValue();

    if(password.localeCompare(this.confirm_password.getValue())===0){
      reauthenticateUser(auth, ()=>{changePassword(password, this.handlePasswordChangeSuccess)});
    }else{
      authError({
        code: 'auth/invalid-confirm_password',
        message: 'Passwords doesn`t match'
      })
    }
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
    const {intl, getValidationErrorMessage, auth, authError, muiTheme, sendEmailVerification } =this.props;

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
                size={80}
                icon={auth.photoURL===null?<FontIcon className="material-icons" >account_circle</FontIcon>:undefined}
                src={auth.photoURL}
              />

              <h3>{auth.displayName}</h3>


            </div>

            <div style={styles.buttons_container}>
              {config.providers.map((p)=>{
                return this.getProviderIcon(p);
              })}

            </div>

            <div style={{marginBottom: 20}}>

              <TextField
                id="name"
                ref={(field) => { this.name = field; }}
                defaultValue={auth.displayName}
                errorText={getValidationErrorMessage('name')}
                floatingLabelText={intl.formatMessage({id: 'name'})}
                hintText={intl.formatMessage({id: 'name'})}
                type="Text"
                fullWidth={true}
              />
            </div>

            <RaisedButton
              label={intl.formatMessage({id: 'save'})}
              primary={true}
              disabled={auth.isFetching}
              style={styles.button}
              fullWidth={true}
              onTouchTap={this.hanleUpdateSubmit}
              icon={
                <FontIcon
                  className="material-icons">
                  save
                </FontIcon>
              }
            />
            <br/>
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
          <Paper  zDepth={2} style={styles.paper}>
            <div style={styles.header}>

              <h3>{intl.formatMessage({id: 'change_photo'})}</h3>
            </div>

            <Cropper
              ref={(field) => { this.cropper = field; }}
              src={auth.newPhotoURL}
              style={{height: '100%', maxwidth: 150, margin: 15}}
              // Cropper.js options
              aspectRatio={9 / 9}
              guides={false}
              //crop={this._crop.bind(this)}
            /><br />

            <RaisedButton
              containerElement='label'
              primary={true}
              style={styles.button}
              fullWidth={true}
              icon={
                <FontIcon
                  className="material-icons">
                  image
                </FontIcon>
              }
              label={intl.formatMessage({id: 'select_file'})}>
              <input
                ref={(field) => { this.photoURL = field; }}
                type="file"
                accept="image/*"
                style={{display:'none'}}
                onChange={this.hanldePhotoULRChange}
              />
            </RaisedButton>
            <br />

            <RaisedButton
              label={intl.formatMessage({id: 'save'})}
              primary={true}
              disabled={auth.isFetching || auth.newPhotoURL===null}
              fullWidth={true}
              onTouchTap={this.hanleUpdatePhotoSubmit}
              icon={
                <FontIcon
                  className="material-icons">
                  save
                </FontIcon>
              }
            />

          </Paper>

          <Paper  zDepth={2} style={styles.paper}>
            <div style={{...(styles.header), flexDirection: 'row'}}>

              <h3>{intl.formatMessage({id: 'email'})}</h3>
              <IconButton
                tooltip={intl.formatMessage({id: auth.emailVerified===true?'email_verified':'email_not_verified'})}
                secondary={true}
                >
                  <FontIcon
                    secondary={true}
                    color={auth.emailVerified===true?muiTheme.palette.primary1Color:muiTheme.palette.accent1Color}
                    style={{'paddingLeft': 10}}
                    className="material-icons">
                    {auth.emailVerified===true?'verified_user':'error'}
                  </FontIcon>
                </IconButton>

              </div>
              <div style={{marginBottom: 20}}>
                <TextField
                  id="email"
                  ref={(field) => { this.email = field; }}
                  defaultValue={auth.email}
                  errorText={getValidationErrorMessage('email')}
                  floatingLabelText={intl.formatMessage({id: 'email'})}
                  hintText={intl.formatMessage({id: 'password'})}
                  type="Email"
                  fullWidth={true}
                /><br />
              </div>

              <RaisedButton
                label={intl.formatMessage({id: 'change_email'})}
                disabled={auth.isFetching}
                primary={true}
                style={styles.button}
                fullWidth={true}
                onTouchTap={this.handleEmailChangeSubmit}
                icon={
                  <FontIcon
                    className="material-icons">
                    lock
                  </FontIcon>
                }
              />
              <br />
              {auth && auth.emailVerified===false &&
                <RaisedButton
                  label={intl.formatMessage({id: auth.isVerificationEmailSend===true?'send_verification_email_again':'send_verification_email'})}
                  disabled={auth.isFetching}
                  secondary={true}
                  fullWidth={true}
                  onTouchTap={()=>{sendEmailVerification()}}
                  icon={
                    <FontIcon
                      className="material-icons">
                      send
                    </FontIcon>
                  }
                />
              }

            </Paper>

            <Paper  zDepth={2} style={styles.paper}>
              <div style={styles.header}>

                <h3>{intl.formatMessage({id: 'change_password'})}</h3>

              </div>
              <div style={{marginBottom: 20}}>
                <TextField
                  id="password"
                  ref={(field) => { this.password = field; }}
                  errorText={getValidationErrorMessage('password')}
                  floatingLabelText={intl.formatMessage({id: 'password'})}
                  hintText={intl.formatMessage({id: 'password'})}
                  type="Password"
                  fullWidth={true}
                /><br />
                <TextField
                  id="confirm_password"
                  ref={(field) => { this.confirm_password = field; }}
                  errorText={getValidationErrorMessage('confirm_password')}
                  floatingLabelText={intl.formatMessage({id: 'confirm_password'})}
                  hintText={intl.formatMessage({id: 'confirm_password'})}
                  type="Password"
                  fullWidth={true}
                />
              </div>

              <RaisedButton
                label={intl.formatMessage({id: 'change_password'})}
                disabled={auth.isFetching}
                primary={true}
                fullWidth={true}
                onTouchTap={this.handlePasswordChangeSubmit}
                icon={
                  <FontIcon
                    className="material-icons">
                    lock
                  </FontIcon>
                }
              />
              <br />
            </Paper>

          </div>

          <PasswordDialog />
          <DeleteAccountDialog />

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
      authError,
      updateUser,
      changePassword,
      changeEmail,
      setNewPhotoURL,
      updateUserPhoto,
      linkUserWithPopup,
      setDeleteDialogOpen,
      reauthenticateUser,
      sendEmailVerification
    }
  )(injectIntl(muiThemeable()(MyAccount)));
