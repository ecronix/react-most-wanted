import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Activity } from '../../containers/Activity'
import { setSimpleValue } from '../../store/simpleValues/actions';
import MyAccountForm from '../../components/Forms/MyAccountForm';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import firebase from 'firebase';
import { withFirebase } from 'firekit-provider'
import FireForm from 'fireform'
import { GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon } from '../../components/Icons';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { change, submit, formValueSelector } from 'redux-form';
import { ResponsiveMenu } from 'material-ui-responsive-menu'


const path='/users/'
const form_name='my_account'

class MyAccount extends Component {

  getProviderIcon = (provider) => {
    const { muiTheme } = this.props
    const color = muiTheme.palette.primary2Color

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
      return undefined
    }
  }


  handleEmailVerificationsSend = () => {
    const { firebaseApp } = this.props;
    firebaseApp.auth().currentUser.sendEmailVerification().then(() => {
      alert('Verification E-Mail send');
    })
  }

  handlePhotoUploadSuccess = (snapshot) => {
    const { setSimpleValue, change}=this.props;
    change(form_name, 'photoURL', snapshot.downloadURL);
    setSimpleValue('new_company_photo', undefined);
  }

  handleUserDeletion = () => {
    const { change, submit } = this.props;
    change(form_name, 'delete_user', true);
    submit(form_name)
  }

  getProvider = (provider) => {
    if(provider.indexOf('facebook')>-1){
      return new firebase.auth.FacebookAuthProvider();
    }
    if(provider.indexOf('github')>-1){
      return new firebase.auth.GithubAuthProvider();
    }
    if(provider.indexOf('google')>-1){
      return new firebase.auth.GoogleAuthProvider();
    }
    if(provider.indexOf('twitter')>-1){
      return new firebase.auth.TwitterAuthProvider();
    }
    if(provider.indexOf('phone')>-1){
      return new firebase.auth.PhoneAuthProvider();
    }

    throw new Error('Provider is not supported!');
  };

  reauthenticateUser = (values, onSuccess) => {
    const { auth, firebaseApp, authError} = this.props;

    if (this.isLinkedWithProvider('password') && !values) {
      if(onSuccess && onSuccess instanceof Function){
        onSuccess();
      }
    } else if (this.isLinkedWithProvider('password') && values) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        auth.email,
        values.old_password
      )
      firebaseApp.auth().currentUser.reauthenticateWithCredential(credential)
      .then(() => {
        if(onSuccess && onSuccess instanceof Function){
          onSuccess();
        }
      }, e=>{authError(e)})
    } else {
      firebaseApp.auth().currentUser.reauthenticateWithPopup(this.getProvider(auth.providerData[0].providerId)).then(()=>{
        if(onSuccess && onSuccess instanceof Function){
          onSuccess()
        }
      }, e=>{authError(e)})
    }
  }

  isLinkedWithProvider = (provider) => {
    const { auth } = this.props;

    let providerId = ''

    if (typeof provider === 'string' || provider instanceof String) {
      providerId = provider
    } else {
      providerId = provider.PROVIDER_ID
    }

    try {
      return auth && auth.providerData && auth.providerData.find((p)=>{return p.providerId===providerId})!==undefined;
    } catch(e) {
      return false;
    }
  }

  linkUserWithPopup = (provider) => {
    const { firebaseApp, authError, authStateChanged } =this.props;

    firebaseApp.auth().currentUser.linkWithPopup(this.getProvider(provider.PROVIDER_ID))
    .then((payload) => {
      authStateChanged(firebaseApp.auth().currentUser);
    }, e=>{authError(e)})
  }


  handleCreateValues = (values) => {
    return false;
  }

  clean = (obj) => {
    Object.keys(obj).forEach((key) => (obj[key] === undefined) && delete obj[key]);
    return obj
  }


  handleUpdateValues = (values, dispatch, props) => {
    const { auth, firebaseApp, authStateChanged, authError }=this.props;


    const simpleChange=(values.displayName && values.displayName.localeCompare(auth.displayNam)) ||
    (values.photoURL && values.photoURL.localeCompare(auth.photoURL));

    let simpleValues={
      displayName: values.displayName,
      photoURL: values.photoURL
    }


    //Change simple data
    if(simpleChange){
      firebaseApp.auth().currentUser.updateProfile(simpleValues).then(() => {

        firebaseApp.database().ref(`users/${auth.uid}`).update(this.clean(simpleValues)).then(()=>{
          authStateChanged(values);
        }, e =>{authError(e)});
      }, e => {authError(e)});
    }

    //Change email
    if(values.email && values.email.localeCompare(auth.email)){

      this.reauthenticateUser(values, ()=>{
        firebaseApp.auth().currentUser.updateEmail(values.email).then(() => {
          firebaseApp.database().ref(`users/${auth.uid}`).update({email: values.email}).then(()=>{
            authStateChanged({email: values.email});
          }, e =>{authError(e)});
        }, e => {
          authError(e)

          // eslint-disable-next-line
          if (e.code == 'auth/requires-recent-login') {
            firebaseApp.auth().signOut().then(function() {
              setTimeout(() => {
                alert('Please sign in again to change your email.');
              }, 1);
            });
          }

        });
      })
    }

    //Change password
    if(values.new_password){

      this.reauthenticateUser( values, ()=>{
        firebaseApp.auth().currentUser.updatePassword(values.new_password).then(() => {
          firebaseApp.auth().signOut();
        }, e => {
          authError(e)

          // eslint-disable-next-line
          if (e.code == 'auth/requires-recent-login') {
            firebaseApp.auth().signOut().then(() => {
              setTimeout(() => {
                alert('Please sign in again to change your password.');
              }, 1);
            });
          }
        });
      })
    }

    //We manage the data saving above
    return false;
  }

  handleClose = () => {
    const { setSimpleValue }=this.props;
    setSimpleValue('delete_user', false);
    setSimpleValue('auth_menu', false);
  }

  handleDelete = () => {
    const { firebaseApp, authError }=this.props;

    this.reauthenticateUser( false , ()=>{
      firebaseApp.auth().currentUser.delete()
      .then(() => {
        this.handleClose();
      }, e => {
        authError(e)

        // eslint-disable-next-line
        if (e.code == 'auth/requires-recent-login') {
          firebaseApp.auth().signOut().then(() => {
            setTimeout(() => {
              alert('Please sign in again to delete your account.');
            }, 1);
          });
        }
      });
    });
  }


  validate = (values) => {
    const { auth } =this.props;
    const providerId=auth.providerData[0].providerId;
    const errors = {}

    if (!values.displayName) {
      errors.displayName = 'Required'
    }

    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    } else if (!values.old_password && providerId==='password' && auth.email.localeCompare(values.email)){
      errors.old_password = 'For email change enter your pasword'
    }

    if(values.new_password){
      if(values.new_password.length <6){
        errors.new_password = 'Password should be at least 6 characters'
      }else if (values.new_password.localeCompare(values.new_password_confirmation)) {
        errors.new_password = 'Must be equal'
        errors.new_password_confirmation = 'Must be equal'
      }

    }


    return errors
  }


  render() {
    const {
      history,
      intl,
      setSimpleValue,
      delete_user,
      auth,
      muiTheme,
      submit,
      firebaseApp
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
    ]

    const menuList = [
      {
        hidden: auth.uid === undefined,
        text: intl.formatMessage({id: 'save'}),
        icon: <FontIcon className="material-icons" color={muiTheme.palette.canvasColor}>save</FontIcon>,
        tooltip:intl.formatMessage({id: 'save'}),
        onClick: () => submit('my_account')
      },
      {
        hidden: auth.uid === undefined,
        text: intl.formatMessage({id: 'delete'}),
        icon: <FontIcon className="material-icons" color={muiTheme.palette.canvasColor}>delete</FontIcon>,
        tooltip: intl.formatMessage({id: 'delete'}),
        onClick: () => setSimpleValue('delete_user', true)
      }
    ]

    return (
      <Activity
        iconStyleRight={{width:'50%'}}
        iconElementRight={
          <ResponsiveMenu
            iconMenuColor={muiTheme.palette.canvasColor}
            menuList={menuList}
          />
        }
        title={intl.formatMessage({id: 'my_account'})}>

        {
          auth.uid &&
          <div style={{margin: 15, display: 'flex'}}>
            <FireForm
              firebaseApp={firebaseApp}
              validate={this.validate}
              name={form_name}
              path={path}
              handleUpdateValues={this.handleUpdateValues}
              onSubmitSuccess={(values)=>{history.push('/dashboard'); setSimpleValue('auth_menu', false)}}
              onDelete={(values)=>{history.push('/signin');}}
              handleCreateValues={this.handleCreateValues}
              uid={auth.uid}>
              <MyAccountForm
                linkUserWithPopup={this.linkUserWithPopup}
                isLinkedWithProvider={this.isLinkedWithProvider}
                getProviderIcon={this.getProviderIcon}
                handleEmailVerificationsSend={this.handleEmailVerificationsSend}
                handlePhotoUploadSuccess={this.handlePhotoUploadSuccess}
                handleUserDeletion={this.handleUserDeletion}
                {...this.props}
              />
            </FireForm>
          </div>
        }
        <Dialog
          title={intl.formatMessage({id: 'delete_account_dialog_title'})}
          actions={actions}
          modal={false}
          open={delete_user===true}
          onRequestClose={this.handleClose}>
          {intl.formatMessage({id: 'delete_account_dialog_message'})}
        </Dialog>
      </Activity>
    );
  }
}

MyAccount.propTypes = {
  history: PropTypes.object,
  setSimpleValue: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  isGranted: PropTypes.func,
  auth: PropTypes.object.isRequired,
  vehicle_types: PropTypes.array,
};

const selector = formValueSelector(form_name)

const mapStateToProps = (state) => {
  const { intl, simpleValues, auth } = state

  const delete_user = simpleValues.delete_user
  const new_user_photo = simpleValues.new_user_photo

  return {
    new_user_photo,
    intl,
    delete_user,
    auth,
    photoURL: selector(state, 'photoURL'),
    old_password: selector(state, 'old_password')
  };
};


export default connect(
  mapStateToProps, { setSimpleValue, change, submit }
)(injectIntl(withRouter(muiThemeable()(withFirebase(MyAccount)))))
