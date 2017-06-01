import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import {
  deleteUser,
  setDeleteDialogOpen,
  reauthenticateUser
} from '../../store/auth/actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export const DeleteAccountDialog = (props) => {

  const {
    auth,
    intl,
    setDeleteDialogOpen,
    deleteUser,
    reauthenticateUser
  } = props;

  const handleClose = () => {
    setDeleteDialogOpen(false);
  }

  const hanldeSubmit = () => {

    handleClose();        
    reauthenticateUser(auth, ()=>{deleteUser()});

  }


  const actions = [
    <FlatButton
      label={intl.formatMessage({id: 'delete'})}
      secondary={true}
      onTouchTap={hanldeSubmit}
    />,
    <FlatButton
      label={intl.formatMessage({id: 'cancel'})}
      primary={true}
      onTouchTap={handleClose}
    />,
  ];

  return (

    <Dialog
      title={intl.formatMessage({id: 'delete_account_dialog_title'})}
      actions={actions}
      modal={true}
      open={auth.isDeleteDialogOpen}>
      {intl.formatMessage({id: 'delete_account_dialog_message'})}
    </Dialog>

  );



}

DeleteAccountDialog.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  setDeleteDialogOpen: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  reauthenticateUser: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};


export default connect(
  mapStateToProps,
  {
    deleteUser,
    setDeleteDialogOpen,
    reauthenticateUser
  }
)(injectIntl(muiThemeable()(DeleteAccountDialog)));
