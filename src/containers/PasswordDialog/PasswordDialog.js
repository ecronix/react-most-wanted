import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import TextField from 'material-ui/TextField';
import {
  reauthenticateUserWithCredential,
  setPasswordDialogOpen
} from '../../store/auth/actions';
import { getValidationErrorMessage } from '../../store/auth/selectors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const styles={
  content:{
    maxWidth: 300
  },
}

export class PasswordDialog extends Component {

  constructor(props) {
    super(props);
    this.password = null;
  }

  handleClose = () => {
    const {setPasswordDialogOpen} = this.props;

    setPasswordDialogOpen(false);
  }

  handleKeyDown = (event, onSucces) => {
    if(event.keyCode===13){
      onSucces();
    }
  }

  handleReauthenticationSuccess = () => {
    const {auth} = this.props;

    this.handleClose()

    if(auth && auth.onPasswordDialogSuccess && auth.onPasswordDialogSuccess instanceof Function){
      auth.onPasswordDialogSuccess();
    }
  }


  hanldePasswordSubmit = () => {
    const {reauthenticateUserWithCredential} = this.props;

    reauthenticateUserWithCredential(this.password.getValue(), this.handleReauthenticationSuccess)
  }

  render(){
    const {intl, getValidationErrorMessage, auth } =this.props;

    const actions = [
      <FlatButton
        label={intl.formatMessage({id: 'submit'})}
        primary={true}
        onTouchTap={this.hanldePasswordSubmit}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (

      <Dialog
        title={intl.formatMessage({id: 'password'})}
        contentStyle={styles.content}
        actions={actions}
        modal={true}
        open={auth.isPasswordDialogOpen}>
        <TextField
          id="password"
          ref={(field) => { this.password = field; this.password && this.password.focus(); }}
          onKeyDown={(e)=>{this.handleKeyDown(e, this.hanldePasswordSubmit)}}
          errorText={getValidationErrorMessage('password')}
          floatingLabelText={intl.formatMessage({id: 'password'})}
          hintText={intl.formatMessage({id: 'password'})}
          type="Password"
          fullWidth={true}
        /><br />
      </Dialog>

    );

  }

}

PasswordDialog.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  reauthenticateUserWithCredential: PropTypes.func.isRequired,
  setPasswordDialogOpen: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
    getValidationErrorMessage: (fieldID)=>getValidationErrorMessage(auth, fieldID)
  };
};


export default connect(
  mapStateToProps,
  {
    reauthenticateUserWithCredential,
    setPasswordDialogOpen
  }
)(injectIntl(muiThemeable()(PasswordDialog)));
