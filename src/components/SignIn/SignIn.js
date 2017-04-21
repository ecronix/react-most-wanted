import React from 'react';
import Paper from 'material-ui/Paper';
import {GoogleIcon, FacebookIcon} from '../../components/Icons';
import {injectIntl} from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider';
import { Activity } from '../../components/Activity';
import CircularProgress from 'material-ui/CircularProgress';

const styles={
  paper:{
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
    paddingTop: 50,
  },
  button: {
    marginTop:6,
  },
  sign_up_button: {
    float: 'right',
    overflow: 'none',
    alignSelf: 'flex-end',
    marginRight:-43,
  }
}


const SignIn = (props) => {

  let email = null;
  let password = null;

  const  {
    muiTheme,
    intl,
    auth,
    signInWithProvider,
    push,
    router,
    signInUser,
    getValidationErrorMessage
  } = props;


  const hanleSignInSubmit = () => {

    signInUser({email: email.getValue(), password: password.getValue()});
  }


  const onSignInSuccess = (user) => {

    const pathname =((((router || {}).location || {}).state || {}).from || {}).pathname;
    push(pathname || '/');

  }


  return (
    <Activity
      title={intl.formatMessage({id: 'sign_in'})}>
      <div style={styles.container}>
        

        {auth.isFetching && <CircularProgress size={80} thickness={5} />}

        {!auth.isFetching &&
          <Paper  zDepth={2} style={styles.paper}>
            <div style={styles.header}>
              <h3>{intl.formatMessage({id: 'sign_in'}).toUpperCase()}</h3>
              <FloatingActionButton
                secondary={true}
                onTouchTap={()=>{push('/signup')}}
                style={styles.sign_up_button}>
                <FontIcon
                  className="material-icons">
                  person_add
                </FontIcon>
              </FloatingActionButton>
            </div>
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
              />
            </div>

            <div style={{margin:5, marginBottom:10}}>
              <Link
                to={`/reset`}
                style={{color:muiTheme.palette.primary3Color}} >
                {intl.formatMessage({id: 'forgort_password'})}
              </Link><br />
            </div>

            <RaisedButton
              label={intl.formatMessage({id: 'sign_in'})}
              secondary={true}
              style={styles.button}
              fullWidth={true}
              onTouchTap={hanleSignInSubmit}
              icon={
                <FontIcon
                  color={muiTheme.palette.primary2Color}
                  className="material-icons">
                  lock
                </FontIcon>
              }
            />
            <br />

            <div style={{ marginBottom:15}} />
            <Divider />
            <div style={{ marginBottom:10}} />


            <RaisedButton
              onTouchTap={()=>{signInWithProvider('google', onSignInSuccess)}}
              label={intl.formatMessage({id: 'sign_in_with_google'})}
              icon={<GoogleIcon color={muiTheme.palette.primary2Color}/>}
              style={styles.button}
              secondary={true}
              fullWidth={true}
            />
            <br />

            <RaisedButton
              onTouchTap={()=>{signInWithProvider('facebook', onSignInSuccess)}}
              label={intl.formatMessage({id: 'sign_in_with_facebook'})}
              icon={<FacebookIcon color={muiTheme.palette.primary2Color}/>}
              style={styles.button}
              secondary={true}
              fullWidth={true}
            />

          </Paper>
        }


      </div>

    </Activity>

  );
}


export default injectIntl(muiThemeable()(SignIn));
