import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import {Helmet} from 'react-helmet';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

import { signUpUser, authError, updateUser } from '../../store/auth/actions';
import { getValidationErrorMessage } from '../../store/auth/selectors';
import { push } from 'react-router-redux';
import { setDrawerOpen } from 'material-ui-responsive-drawer';
import { SignUp } from '../../components/SignUp'

const styles={
  paper:{
    height: '100%',
    display: 'block',
    margin:0,
    padding: 15
  },
  header:{
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //justifyContent: 'space-between'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingTop: 120,
  },
  button: {
    margin:6,
    align: 'left'
  },
  sign_up_button: {
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
    this.confirm_password = null;

  }

  hanleSignInSubmit = () => {
    const {authError, updateUser} =this.props;

    updateUser({displayName: this.name.getValue()});

  }


  render(){
    const {intl, getValidationErrorMessage, muiTheme, auth} =this.props;

    return (
      <div >
        <Helmet>
          <title>{intl.formatMessage({id: 'my_account'})}</title>
        </Helmet>
        <ResponsiveAppBar
          title={intl.formatMessage({id: 'my_account'})}
        />

        <div style={styles.container}>

          <Paper  zDepth={2} style={styles.paper}>
            <div style={styles.header}>


              <Avatar
                style={styles.sign_up_button}
                size={80}
                icon={auth.img===null?<FontIcon className="material-icons" >account_circle</FontIcon>:undefined}
                src={auth.img}
              />

              <h3>{auth.name}</h3>

            </div>
            <div style={{marginBottom: 20}}>
              <TextField
                disabled={true}
                ref={(field) => { this.email = field; }}
                defaultValue={auth.email}
                hintText="Email"
                type="Email"
                fullWidth={true}
              /><br />
              <TextField
                ref={(field) => { this.name = field; }}
                defaultValue={auth.name}
                hintText="name"
                type="Text"
                fullWidth={true}
              />
            </div>

            <RaisedButton
              label={intl.formatMessage({id: 'save'})}
              secondary={true}
              //style={styles.button}
              fullWidth={true}
              onTouchTap={this.hanleSignInSubmit}
              icon={
                <FontIcon
                  className="material-icons">
                  save
                </FontIcon>
              }
            />
            <br />

          </Paper>


        </div>

      </div>
    );

  }

}

MyAccount.propTypes = {
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

export const MyAccountTest = injectIntl(muiThemeable()(MyAccount));

export default connect(
  mapStateToProps,
  { signUpUser, authError, push, setDrawerOpen, updateUser }
)(injectIntl(muiThemeable()(MyAccount)));
