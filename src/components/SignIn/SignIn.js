import React from 'react';
import Paper from 'material-ui/Paper';
import {GoogleIcon, FacebookIcon} from '../../components/Icons';
import {injectIntl} from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import config from '../../config'
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


const SignIn = ({muiTheme, intl, signIn, push, setDrawerOpen }) => {

  const handleSignIn = (auth) => {
    signIn(auth);
    push('/');
    setDrawerOpen(false);
  }

  const responseEmail = () => {
    const auth={name: 'Demo User', email: 'demo@email.com' };
    handleSignIn(auth);
  }

  const  responseGoogle = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    const auth={name: profile.getName(), email: profile.getEmail(), img: profile.getImageUrl() };
    handleSignIn(auth);
  }

  const responseFacebook = (facebookUser) => {
    const auth= {name: facebookUser.name, email: facebookUser.email, img: facebookUser.picture.data.url }
    handleSignIn(auth);
  }

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage({id: 'sign_in'})}</title>
      </Helmet>
      <ResponsiveAppBar
        title={intl.formatMessage({id: 'sign_in'})}
      />
      <div style={styles.container}>

        <Paper  zDepth={2} style={styles.paper}>
          <div style={styles.header}>
            <h3>{intl.formatMessage({id: 'sign_in'}).toUpperCase()}</h3>
            <FloatingActionButton style={styles.sign_up_button}>
              <FontIcon
                className="material-icons">
                person_add
              </FontIcon>
            </FloatingActionButton>
          </div>
          <div style={{marginBottom: 20}}>
            <TextField
              hintText="Email"
              type="Email"
              fullWidth={true}
            /><br />
            <TextField
              hintText="Password"
              type="Password"
              fullWidth={true}
            />
          </div>

          <RaisedButton
            label={intl.formatMessage({id: 'sign_in'})}
            secondary={true}
            style={styles.button}
            fullWidth={true}
            onTouchTap={responseEmail}
            icon={
              <FontIcon
                className="material-icons">
                lock
              </FontIcon>
            }
          />
          <br />

          <GoogleLogin
            style={{backgroundColor: 'transparent', borderRadius:0, border: 0, padding: 0, width: '100%'}}
            clientId={config.google_client_id}
            scope="profile"
            tag="div"
            onSuccess={responseGoogle}>
            <RaisedButton
              label={intl.formatMessage({id: 'sign_in_with_google'})}
              icon={<GoogleIcon color={muiTheme.palette.accent1Color}/>}
              style={styles.button}
              primary={true}
              fullWidth={true}
            />
          </GoogleLogin>

          <FacebookLogin
            appId={config.facebook_app_id}
            fields="name,email,picture"
            disableMobileRedirect={true}
            textButton=""
            cssClass=""
            icon={<RaisedButton
              label={intl.formatMessage({id: 'sign_in_with_facebook'})}
              icon={<FacebookIcon color={muiTheme.palette.accent1Color}/>}
              style={styles.button}
              primary={true}
              fullWidth={true}
            />}
            tag="div"
            callback={responseFacebook}
          />

        </Paper>


      </div>



    </div>

  );
}


export default injectIntl(muiThemeable()(SignIn));
