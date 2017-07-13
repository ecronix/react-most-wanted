import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl } from 'react-intl';
import {Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {Avatar} from '../../containers/Avatar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import { ImageCropDialog } from '../../containers/ImageCropDialog';
import IconButton from 'material-ui/IconButton';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'firekit';
import {GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon} from '../../components/Icons';
import muiThemeable from 'material-ui/styles/muiThemeable';
import config from '../../config';

class Form extends Component {


  getProviderIcon = (provider) => {

    const { muiTheme } =this.props;

    const color=muiTheme.palette.primary2Color;

    switch (provider.PROVIDER_ID) {
      case 'google.com':
      return <GoogleIcon color={color}/>

      case 'facebook.com':
      return <FacebookIcon color={color}/>

      case 'twitter.com':
      return <TwitterIcon color={color}/>

      case 'github.com':
      return <GitHubIcon color={color}/>

      default:
      return undefined;
    }
  }


  handleEmailVerificationsSend = () => {
    const { firebaseApp }=this.props;
    firebaseApp.auth().currentUser.sendEmailVerification().then(()=>{
      alert('Verification E-Mail send');
    })
  }


  handlePhotoUploadSuccess = (snapshot) => {
    const { setDialogIsOpen, change}=this.props;
    change('photoURL', snapshot.downloadURL);
    setDialogIsOpen('new_company_photo', undefined);
  }

  handleUserDeletion = () => {
    const { change, submit }=this.props;
    change('delete_user', true);
    submit('my_account')
  }

  render() {
    const {
      handleSubmit,
      intl,
      initialized,
      setDialogIsOpen,
      dialogs,
      auth,
      muiTheme,
      isLinkedWithProvider,
      linkUserWithPopup
    } = this.props;
    const uid=auth.uid;
    const showPasswords=isLinkedWithProvider('password');

    return (
      <form onSubmit={handleSubmit} style={{
        height: '100%',
        alignItems: 'strech',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>

      <div style={{margin: 15, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <div>
          <Field
            name="photoURL"
            size={150}
            component={Avatar}
            icon={<FontIcon className="material-icons" >person</FontIcon>}
            ref="photoURL"
            withRef
          />
        </div>


        <div>
          <FlatButton
            onTouchTap={()=>{
              setDialogIsOpen('new_company_photo', true)
            }}
            disabled={uid===undefined || !initialized}
            containerElement='label'
            primary={true}
            icon={
              <FontIcon
                className="material-icons">
                photo_camera
              </FontIcon>
            }
          />
        </div>

        <div>
          {config.firebase_providers.map((p, i)=>{
            if(p.PROVIDER_ID!=='email' && p.PROVIDER_ID!=='password' && p.PROVIDER_ID!=='phone'){
              return <IconButton
                key={i}
                disabled={isLinkedWithProvider(p)}
                onTouchTap={()=>{linkUserWithPopup(p)}}
                tooltip={intl.formatMessage({id: `link_with_${p.PROVIDER_ID}`})}>
                {this.getProviderIcon(p)}
              </IconButton>
            }else{
              return <div key={i}></div>
            }
          })}
        </div>
      </div>

      <div>
        <div>
          <Field
            name="displayName"
            disabled={!initialized}
            component={TextField}
            fullWidth={true}
            hintText={intl.formatMessage({id: 'name_hint'})}
            floatingLabelText={intl.formatMessage({id: 'name_label'})}
            ref="displayName"
            withRef
          />
        </div>

        <div style={{display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap'}}>
          <div>
            <Field
              name="email"
              disabled={!initialized}
              component={TextField}
              hintText={intl.formatMessage({id: 'email'})}
              floatingLabelText={intl.formatMessage({id: 'email'})}
              ref="email"
              withRef
            />
          </div>

          <div>
            <IconButton
              onTouchTap={auth.emailVerified===true?undefined:this.handleEmailVerificationsSend}
              tooltip={intl.formatMessage({id: auth.emailVerified===true?'email_verified':'email_not_verified'})}>
              <FontIcon
                color={auth.emailVerified===true?muiTheme.palette.primary1Color:muiTheme.palette.accent1Color}
                style={{'paddingLeft': 10}}
                className="material-icons">
                {auth.emailVerified===true?'verified_user':'error'}
              </FontIcon>
            </IconButton>
          </div>
        </div>

        {showPasswords &&
        <div>
          <div>
            <Field
              name="old_password"
              disabled={!initialized}
              type="Password"
              component={TextField}
              fullWidth={true}
              hintText={intl.formatMessage({id: 'password'})}
              floatingLabelText={intl.formatMessage({id: 'password'})}
              ref="old_password"
              withRef
            />
          </div>

          <div>
            <Field
              name="new_password"
              disabled={!initialized}
              type="Password"
              component={TextField}
              fullWidth={true}
              hintText={intl.formatMessage({id: 'password'})}
              floatingLabelText={intl.formatMessage({id: 'password'})}
              ref="new_password"
              withRef
            />
          </div>

          <div>
            <Field
              name="new_password_confirmation"
              disabled={!initialized}
              type="Password"
              component={TextField}
              fullWidth={true}
              hintText={intl.formatMessage({id: 'confirm_password'})}
              floatingLabelText={intl.formatMessage({id: 'confirm_password'})}
              ref="new_password_confirmation"
              withRef
            />
          </div>
        </div>
      }

      <div>
        <RaisedButton
          label={intl.formatMessage({id: 'save'})}
          type="submit"
          primary={true}
          fullWidth={true}
          disabled={!initialized}
          icon={
            <FontIcon
              className="material-icons">
              save
            </FontIcon>
          }
        />
      </div>


    </div>

    <ImageCropDialog
      path={`users/${uid}`}
      fileName={`photoURL`}
      onUploadSuccess={(s)=>{this.handlePhotoUploadSuccess(s) }}
      open={dialogs.new_company_photo!==undefined}
      src={dialogs.new_company_photo}
      handleClose={()=>{setDialogIsOpen('new_company_photo',undefined)}}
      title={intl.formatMessage({id: 'change_photo'})}
    />

  </form>
);
}
}


Form=reduxForm({form: 'my_account'})(Form);
const selector = formValueSelector('my_account')

const mapStateToProps = state => {
  const { intl, vehicleTypes, users, dialogs, auth } = state;

  return {
    intl,
    vehicleTypes,
    users,
    dialogs,
    auth,
    photoURL: selector(state, 'photoURL'),
    old_password: selector(state, 'old_password'),
  };
};

export default connect(
  mapStateToProps, { setDialogIsOpen }
)(injectIntl(withRouter(muiThemeable()(withFirebase(Form)))));
