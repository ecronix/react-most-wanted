import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import {GoogleIcon, FacebookIcon} from '../../components/Icons';
import {injectIntl} from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { updateAuth } from '../../actions/auth';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import config from '../../config'
import { push } from 'react-router-redux';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import FontIcon from 'material-ui/FontIcon';

const styles={
  paper:{
    height: '100%',
    display: 'block',
    margin:0,
    padding: 15
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    marginTop: 100,
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


const SignIn = (props) => {

  const { muiTheme, intl, updateAuth, push }=props;


  const  responseGoogle = (googleUser) => {
    console.log(googleUser);
    var profile = googleUser.getBasicProfile();
    updateAuth({name: profile.getName(), email: profile.getEmail(), img: profile.getImageUrl() });
    push('/');
  }

  const responseFacebook = (facebookUser) => {
    console.log(facebookUser);
    updateAuth({name: facebookUser.name, email: facebookUser.email, img: facebookUser.picture.data.url });
    push('/');
  }

  return (
    <div>
      <ResponsiveAppBar
        title={intl.formatMessage({id: 'sign_in'})}
      />
      <div style={styles.container}>

        <Paper  zDepth={2} style={styles.paper}>
          <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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
            onSuccess={responseGoogle}>
            <RaisedButton
              label={intl.formatMessage({id: 'sign_in_with_google'})}
              icon={<GoogleIcon color={muiTheme.palette.accent1Color}/>}
              style={styles.button}
              primary={true}
              fullWidth={true}
            />
          </GoogleLogin>

          <br />
          <FacebookLogin
            appId={config.facebook_app_id}
            //autoLoad={true}
            fields="name,email,picture"
            redirectUri="https://www.soft-erp.eu/test"
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
            callback={responseFacebook}/>

          </Paper>


        </div>



      </div>

    );
  }
  SignIn.propTypes = {
    updateAuth: PropTypes.func.isRequired,
    auth: PropTypes.object,
    //intl: intlShape.isRequired,
  };

  const mapStateToProps = (state) => {
    const { auth } = state;
    return {
      auth
    };
  };

  const mapDispatchToProps = (dispatch) => {

    return {
      updateAuth: (auth) => {
        dispatch(updateAuth(auth));
      },
      push: (path)=>{
        dispatch(push(path))
      },
    }
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(muiThemeable()(SignIn)));
