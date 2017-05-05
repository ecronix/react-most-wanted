import React from 'react';
import Paper from 'material-ui/Paper';
import {GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon} from '../../components/Icons';
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
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import config from '../../config';

const styles={
  paper:{
    margin:0,
    padding: 15,
    minWidth: 300
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
  buttons_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    getValidationErrorMessage,
    authError
  } = props;

  const isSnackbarOpen=auth.error !==undefined
  && auth.error.message
  && auth.error.code.indexOf('email')<0
  && auth.error.code.indexOf('password')<0;


  const hanleSignInSubmit = () => {

    signInUser({email: email.getValue(), password: password.getValue()});
  }

  const handleKeyDown = (event, onSucces) => {
    if(event.keyCode===13){
      onSucces();
    }
  }


  const onSignInSuccess = (user) => {

    const pathname =((((router || {}).location || {}).state || {}).from || {}).pathname;
    push(pathname || '/');

  }

  const getProviderIcon = (provider) => {

    const color=muiTheme.palette.primary2Color;

    return <IconButton
      key={provider}
      onTouchTap={()=>{signInWithProvider(provider, onSignInSuccess)}}
      tooltip={intl.formatMessage({id: `sign_in_with_${provider}`})}>
      {provider==='google'&&<GoogleIcon color={color}/>}
      {provider==='facebook'&&<FacebookIcon color={color}/>}
      {provider==='twitter'&&<TwitterIcon color={color}/>}
      {provider==='github'&&<GitHubIcon color={color}/>}
    </IconButton>
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
                onTouchTap={()=>{push('/signup'); authError(undefined);}}
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
                ref={(field) => { email = field; email && email.focus(); }}
                hintText={intl.formatMessage({id: 'email'})}
                errorText={getValidationErrorMessage('email')}
                floatingLabelText={intl.formatMessage({id: 'email'})}
                type="Email"
                fullWidth={true}
              /><br />
              <TextField
                id="password"
                ref={(field) => { password = field; }}
                onKeyDown={(e)=>{handleKeyDown(e, hanleSignInSubmit)}}
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
                onTouchTap={()=>{push('/reset'); authError(undefined);}}
                style={{color:muiTheme.palette.primary3Color}} >
                {intl.formatMessage({id: 'forgort_password'})}
              </Link><br />
            </div>

            <RaisedButton
              label={intl.formatMessage({id: 'sign_in'})}
              primary={true}
              style={styles.button}
              fullWidth={true}
              onTouchTap={hanleSignInSubmit}
              icon={
                <FontIcon
                  color={muiTheme.palette.accent1Color}
                  className="material-icons">
                  lock
                </FontIcon>
              }
            />
            <br />

            <div style={{ marginBottom:15}} />
            <Divider />
            <div style={{ marginBottom:10}} />

            <div style={styles.buttons_container}>
              {config.providers.map((p)=>{
                return getProviderIcon(p);
              })}

            </div>

          </Paper>
        }


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


export default injectIntl(muiThemeable()(SignIn));
