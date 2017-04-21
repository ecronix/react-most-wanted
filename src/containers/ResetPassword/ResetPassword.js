import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { signUpUser, authError, resetPasswordEmail } from '../../store/auth/actions';
import { getValidationErrorMessage } from '../../store/auth/selectors';
import { push } from 'react-router-redux';
import { setDrawerOpen } from 'material-ui-responsive-drawer';
import { Activity } from '../../components/Activity'
import Snackbar from 'material-ui/Snackbar';

const styles={
  paper:{
    height: '100%',
    display: 'block',
    margin:0,
    padding: 15,
    minWidth: 300,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingTop: 50,
  },

}

export class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.email = null;

  }

  handleResetSuccess = (result) => {
    const {push, authError} =this.props;
    authError({
      code: 'success',
      message: 'Reset email successfully send. Pleas check inbox.'
    })
    push('signin');
  }

  hanleSignInSubmit = () => {
    const {resetPasswordEmail} =this.props;
    resetPasswordEmail(this.email.getValue(), this.handleResetSuccess);
  }


  render(){
    const {intl, getValidationErrorMessage, auth, push, authError} =this.props;

    const isSnackbarOpen=auth.error !==undefined
    && auth.error.message
    && auth.error.code.indexOf('email')<0;

    return (
      <Activity
        onBackClick={()=>{push('signin')}}
        title={intl.formatMessage({id: 'reset_password'})}>
        <div style={styles.container}>
          <Paper  zDepth={2} style={styles.paper}>
            <div style={{marginBottom: 20}}>
              <TextField
                id="email"
                ref={(field) => { this.email = field; }}
                defaultValue={auth.email}
                errorText={getValidationErrorMessage('email')}
                floatingLabelText={intl.formatMessage({id: 'email'})}
                hintText={intl.formatMessage({id: 'reset_password_hint'})}
                type="Email"
                fullWidth={true}
              /><br />
            </div>

            <RaisedButton
              label={intl.formatMessage({id: 'reset_password'})}
              secondary={true}
              fullWidth={true}
              onTouchTap={this.hanleSignInSubmit}
              icon={
                <FontIcon
                  className="material-icons">
                  refresh
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

ResetPassword.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
  const { auth, router } = state;
  return {
    auth,
    router,
    getValidationErrorMessage: (fieldID)=>getValidationErrorMessage(auth, fieldID)
  };
};

export const ResetPasswordTest = injectIntl(muiThemeable()(ResetPassword));

export default connect(
  mapStateToProps,
  { signUpUser, authError, push, setDrawerOpen, resetPasswordEmail }
)(injectIntl(muiThemeable()(ResetPassword)));
