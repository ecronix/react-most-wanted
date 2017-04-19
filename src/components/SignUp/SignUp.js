import React from 'react';
import Paper from 'material-ui/Paper';
import {injectIntl} from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import FontIcon from 'material-ui/FontIcon';
import {Helmet} from 'react-helmet';

const styles={
  paper:{
    height: '100%',
    display: 'block',
    margin:0,
    padding: 15
  },
  header:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingTop: 100,
  },
  button: {
    margin:6,
    align: 'left'
  },
  sign_up_button: {
    float: 'right',
    overflow: 'none',
    alignSelf: 'flex-end',
    marginRight:-43,
  }
}


const SignUp = (props) => {

  let email = null;
  let password = null;
  let confirm_password = null;

  const  {
    intl,
    signUpUser,
    authError,
    getValidationErrorMessage
  } = props;


  const hanleSignInSubmit = () => {

    if(password.getValue().localeCompare(confirm_password.getValue())===0){
      signUpUser({email: email.getValue(), password: password.getValue()});
    }else{
      authError({
        errorCode: 'auth/invalid-confirm_password',
        errorMessage: 'Masswords doent match'
      })
    }

  }


  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage({id: 'sign_up'})}</title>
      </Helmet>
      <ResponsiveAppBar
        title={intl.formatMessage({id: 'sign_up'})}
      />
      <div style={styles.container}>

        <Paper  zDepth={2} style={styles.paper}>
          <div style={styles.header}>
            <h3>{intl.formatMessage({id: 'sign_up'}).toUpperCase()}</h3>
          </div>
          <div style={{marginBottom: 20}}>
            <TextField
              id="email"
              ref={(field) => { email = field; }}
              hintText={intl.formatMessage({id: 'email'})}
              errorText={getValidationErrorMessage('email')}
              type="Email"
              fullWidth={true}
            /><br />
            <TextField
              id="password"
              ref={(field) => { password = field; }}
              hintText={intl.formatMessage({id: 'password'})}
              errorText={getValidationErrorMessage('password')}
              type="Password"
              fullWidth={true}
            /><br />
            <TextField
              id="confirm_password"
              ref={(field) => { confirm_password = field; }}
              hintText={intl.formatMessage({id: 'confirm_password'})}
              errorText={getValidationErrorMessage('confirm_password')}
              type="Password"
              fullWidth={true}
            />
          </div>

          <RaisedButton
            label={intl.formatMessage({id: 'sign_up'})}
            secondary={true}
            style={styles.button}
            fullWidth={true}
            onTouchTap={hanleSignInSubmit}
            icon={
              <FontIcon
                className="material-icons">
                person_add
              </FontIcon>
            }
          />
          <br />

        </Paper>


      </div>

    </div>

  );
}


export default injectIntl(muiThemeable()(SignUp));
