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
import { authError, updateUser, changePassword } from '../../store/auth/actions';
import { getValidationErrorMessage } from '../../store/auth/selectors';
import { push } from 'react-router-redux';
import { Activity } from '../../components/Activity';
import Snackbar from 'material-ui/Snackbar';

const styles={
  paper:{
    height: '100%',
    display: 'block',
    margin:15,
    padding: 15
  },
  header:{
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  button: {
    marginTop:6,
    align: 'left'
  },
  avatar: {
    float: 'right',
    overflow: 'none',
    alignSelf: 'center',
    marginTop:-60,
  }
}

export class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.email = null;
    this.name = null;
    this.password = null;
    this.confirm_password = null;

  }

  hanleUpdateSubmit = () => {
    const {updateUser} =this.props;

    updateUser({displayName: this.name.getValue()});
  }

  handlePasswordChangeSuccess = () => {
    const {authError} =this.props;
    authError({
      code: 'success',
      message: 'Password changed successfully'
    })
  }

  handlePasswordChangeSubmit = () => {
    const {changePassword, authError} =this.props;

    if(this.password.getValue().localeCompare(this.confirm_password.getValue())===0){
      changePassword(this.password.getValue(), this.handlePasswordChangeSuccess);
    }else{
      authError({
        code: 'auth/invalid-confirm_password',
        message: 'Passwords doesn`t match'
      })
    }
  }


  render(){
    const {intl, getValidationErrorMessage, auth, authError} =this.props;

    const isSnackbarOpen=auth.error !==undefined
    && auth.error.message
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
            <div style={{marginBottom: 20}}>
              <TextField
                id="email"
                disabled={true}
                ref={(field) => { this.email = field; }}
                defaultValue={auth.email}
                errorText={getValidationErrorMessage('email')}
                hintText="Email"
                type="Email"
                fullWidth={true}
              /><br />
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
              secondary={true}
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
            <br />

          </Paper>

          <Paper  zDepth={2} style={styles.paper}>
            <div style={styles.header}>

              <h3>{intl.formatMessage({id: 'password'})}</h3>

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
              secondary={true}
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
  push: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
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
  { authError, push, updateUser, changePassword }
)(injectIntl(muiThemeable()(MyAccount)));
