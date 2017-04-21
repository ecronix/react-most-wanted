import React from 'react';
import Paper from 'material-ui/Paper';
import {injectIntl} from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Activity } from '../../components/Activity';

const styles={
  paper:{
    height: '100%',
    display: 'block',
    margin:0,
    padding: 15
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingTop: 50,
  },

}


const SignUp = (props) => {

  let email = null;
  let password = null;
  let confirm_password = null;

  const  {
    intl,
    signUpUser,
    authError,
    getValidationErrorMessage,
    push
  } = props;


  const hanleSignUpSubmit = () => {

    if(password.getValue().localeCompare(confirm_password.getValue())===0){
      signUpUser({email: email.getValue(), password: password.getValue()});
    }else{
      authError({
        code: 'auth/invalid-confirm_password',
        message: 'Masswords doent match'
      })
    }

  }


  return (
    <Activity
      onBackClick={()=>{push('signin')}}
      title={intl.formatMessage({id: 'sign_up'})}>

      <div style={styles.container}>

        <Paper  zDepth={2} style={styles.paper}>

          <h3>{intl.formatMessage({id: 'sign_up'}).toUpperCase()}</h3>

          <div style={{marginBottom: 20}}>
            <TextField
              id="email"
              ref={(field) => { email = field; }}
              hintText={intl.formatMessage({id: 'email'})}
              errorText={getValidationErrorMessage('email')}
              floatingLabelText={intl.formatMessage({id: 'email'})}
              type="Email"
              fullWidth={true}
            /><br />
            <TextField
              id="password"
              ref={(field) => { password = field; }}
              hintText={intl.formatMessage({id: 'password'})}
              errorText={getValidationErrorMessage('password')}
              floatingLabelText={intl.formatMessage({id: 'password'})}
              type="Password"
              fullWidth={true}
            /><br />
            <TextField
              id="confirm_password"
              ref={(field) => { confirm_password = field; }}
              hintText={intl.formatMessage({id: 'confirm_password'})}
              errorText={getValidationErrorMessage('confirm_password')}
              floatingLabelText={intl.formatMessage({id: 'confirm_password'})}
              type="Password"
              fullWidth={true}
            />
          </div>

          <RaisedButton
            label={intl.formatMessage({id: 'sign_up'})}
            secondary={true}
            style={styles.button}
            fullWidth={true}
            onTouchTap={hanleSignUpSubmit}
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

    </Activity>
  );
}


export default injectIntl(muiThemeable()(SignUp));
