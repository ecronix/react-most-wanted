import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl } from 'react-intl';
import { Activity } from '../../containers/Activity'
import { setDialogIsOpen } from '../../store/dialogs/actions';
import Form from './Form';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import firebase from 'firebase';
import { withFirebase, FireForm } from 'firekit';

const path='/users/';


class MyAccount extends Component {


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

    throw new Error('Provider is not supported!!!');

  };

  reauthenticateUser = (values, onSuccess) => {
    const { auth, firebaseApp, authError}=this.props;


    if(this.isLinkedWithProvider('password') && !values){

      if(onSuccess && onSuccess instanceof Function){
        onSuccess();
      }

    }else if(this.isLinkedWithProvider('password') && values){

      const credential = firebase.auth.EmailAuthProvider.credential(
        auth.email,
        values.old_password
      );

      firebaseApp.auth().currentUser.reauthenticateWithCredential(credential)
      .then(() => {
        if(onSuccess && onSuccess instanceof Function){
          onSuccess();
        }
      }, e=>{authError(e)});


    }else{
      firebaseApp.auth().currentUser.reauthenticateWithPopup(this.getProvider(auth.providerData[0].providerId)).then(()=>{
        if(onSuccess && onSuccess instanceof Function){
          onSuccess()
        }
      }, e=>{authError(e)})
    }


  }

  isLinkedWithProvider = (provider) => {
    const {auth} =this.props;

    let providerId=''

    if (typeof provider === 'string' || provider instanceof String){
      providerId=provider;
    }else{
      providerId=provider.PROVIDER_ID;
    }

    try{
      return auth && auth.providerData && auth.providerData.find((p)=>{return p.providerId===providerId})!==undefined;
    }catch(e){
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
          }  });
        })
      }

      //We manage the data saving above
      return false;
    }

    handleClose = () => {
      const { setDialogIsOpen }=this.props;
      setDialogIsOpen('delete_user', false);
      setDialogIsOpen('auth_menu', false);
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
          }  });
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

      const {history, intl, setDialogIsOpen, dialogs, auth}=this.props;

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
          iconElementRight={
            auth.uid?<FlatButton
              style={{marginTop: 4}}
              onTouchTap={()=>{setDialogIsOpen('delete_user', true);}}
              icon={<FontIcon className="material-icons" >delete</FontIcon>}
            />:undefined
          }
          title={intl.formatMessage({id: 'my_account'})}>

          {auth.uid &&
            <div style={{margin: 15, display: 'flex'}}>
              <FireForm
                validate={this.validate}
                name={'my_account'}
                path={`${path}`}
                handleUpdateValues={this.handleUpdateValues}
                onSubmitSuccess={(values)=>{history.push('/dashboard'); setDialogIsOpen('auth_menu', false)}}
                onDelete={(values)=>{history.push('/signin');}}
                handleCreateValues={this.handleCreateValues}
                uid={auth.uid}>
                <Form
                  linkUserWithPopup={this.linkUserWithPopup}
                  isLinkedWithProvider={this.isLinkedWithProvider}
                />
              </FireForm>
            </div>
          }
          <Dialog
            title={intl.formatMessage({id: 'delete_account_dialog_title'})}
            actions={actions}
            modal={false}
            open={dialogs.delete_user===true}
            onRequestClose={this.handleClose}>
            {intl.formatMessage({id: 'delete_account_dialog_message'})}
          </Dialog>


        </Activity>
      );
    }
  }

  const mapStateToProps = (state) => {
    const { intl, dialogs, auth } = state;

    return {
      intl,
      dialogs,
      auth
    };
  };

  export default connect(
    mapStateToProps, {setDialogIsOpen}
  )(injectIntl(withRouter(withFirebase(MyAccount))));
