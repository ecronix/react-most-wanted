import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import TextField from 'material-ui/TextField';
import { changePassword, authError, setIsEditing } from '../../store/auth/actions';
import { getValidationErrorMessage } from '../../store/auth/selectors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class ChangePasswordDialog extends Component {

  constructor(props) {
    super(props);
    this.password = null;
    this.confirm_password = null;
  }

  handleClose = () => {
    const {setIsEditing} = this.props;
    setIsEditing(null);
  }

  handleKeyDown = (event, onSucces) => {
    if(event.keyCode===13){
      onSucces();
    }
  }

  handlePasswordChangeSuccess = () => {
    const {authError, setIsEditing} =this.props;
    setIsEditing(false);
    authError({
      code: 'success',
      message: 'Password changed successfully'
    })
  }

  handlePasswordChangeSubmit = () => {
    const { changePassword, authError} =this.props;

    const password=this.password.getValue();

    if(password.localeCompare(this.confirm_password.getValue())===0){
      changePassword(password, this.handlePasswordChangeSuccess);
    }else{
      authError({
        code: 'auth/invalid-confirm_password',
        message: 'Passwords doesn`t match'
      })
    }
  }

  render(){
    const {intl, getValidationErrorMessage, open, title } =this.props;

    const actions = [
      <FlatButton
        label={intl.formatMessage({id: 'change_password'})}
        primary={true}
        onTouchTap={this.handlePasswordChangeSubmit}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (

      <Dialog
        title={title}
        actions={actions}
        onRequestClose={this.handleClose}
        open={open}>
        <TextField
          id="password"
          ref={(field) => { this.password = field; this.password && this.password.focus(); }}
          errorText={getValidationErrorMessage('password')}
          floatingLabelText={intl.formatMessage({id: 'password'})}
          hintText={intl.formatMessage({id: 'password'})}
          type="Password"
          fullWidth={true}
        /><br />
        <TextField
          id="confirm_password"
          ref={(field) => { this.confirm_password = field; }}
          onKeyDown={(e)=>{this.handleKeyDown(e, this.handlePasswordChangeSubmit)}}
          errorText={getValidationErrorMessage('confirm_password')}
          floatingLabelText={intl.formatMessage({id: 'confirm_password'})}
          hintText={intl.formatMessage({id: 'confirm_password'})}
          type="Password"
          fullWidth={true}
        />
      </Dialog>
    );

  }

}

ChangePasswordDialog.propTypes = {
  intl: intlShape.isRequired,
  open: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
    getValidationErrorMessage: (fieldID)=>getValidationErrorMessage(auth, fieldID)
  };
};

export const ChangePasswordDialogTest = injectIntl(muiThemeable()(ChangePasswordDialog));

export default connect(
  mapStateToProps,
  {
    changePassword, authError, setIsEditing
  }
)(injectIntl(ChangePasswordDialog));
