import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl } from 'react-intl';
import { Activity } from '../../containers/Activity'
import { FireForm } from 'firekit'
import { setDialogIsOpen } from '../../store/dialogs/actions';
import Form from './Form';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { withFirebase } from 'firekit';

const path='/companies/';


class Company extends Component {

  handleCreateValues = (values) => {

    return {
      created: firebase.database.ServerValue.TIMESTAMP ,
      updated: firebase.database.ServerValue.TIMESTAMP ,
      ...values
    }
  }

  handleUpdateValues = (values) => {

    return {
      updated: firebase.database.ServerValue.TIMESTAMP ,
      ...values
    }
  }

  handleClose = () => {
    const { setDialogIsOpen }=this.props;

    setDialogIsOpen('delete_company', false);

  }

  handleDelete = () => {

    const {history, match, firebaseApp}=this.props;
    const uid=match.params.uid;

    if(uid){
      firebaseApp.database().ref().child(`${path}${uid}`).remove().then(()=>{
        this.handleClose();
        history.goBack();
      })
    }
  }


  render() {

    const {history, intl, setDialogIsOpen, dialogs, match}=this.props;

    const actions = [
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'delete'})}
        secondary={true}
        onTouchTap={this.handleDelete}
      />,
    ];

    const validate = values => {
      const errors = {}

      if (!values.name) {
        errors.name = intl.formatMessage({id: 'required'});
      }

      if (!values.full_name) {
        errors.full_name = intl.formatMessage({id: 'required'});
      }

      return errors
    }

    return (
      <Activity
        iconElementRight={
          match.params.uid?<FlatButton
            style={{marginTop: 4}}
            onTouchTap={()=>{setDialogIsOpen('delete_company', true);}}
            icon={<FontIcon className="material-icons" >delete</FontIcon>}
          />:undefined
        }
        onBackClick={()=>{history.goBack()}}
        title={intl.formatMessage({id: match.params.uid?'edit_company':'create_company'})}>

        <div style={{margin: 15, display: 'flex'}}>

          <FireForm
            name={'company'}
            path={`${path}`}
            validate={validate}
            onSubmitSuccess={(values)=>{history.push('/companies');}}
            onDelete={(values)=>{history.push('/companies');}}
            handleCreateValues={this.handleCreateValues}
            uid={match.params.uid}>
            <Form />
          </FireForm>
        </div>
        <Dialog
          title={intl.formatMessage({id: 'delete_company_title'})}
          actions={actions}
          modal={false}
          open={dialogs.delete_company===true}
          onRequestClose={this.handleClose}>
          {intl.formatMessage({id: 'delete_company_message'})}
        </Dialog>

      </Activity>
    );
  }
}


const mapStateToProps = (state) => {
  const { intl, dialogs } = state;

  return {
    intl,
    dialogs
  };
};

export default connect(
  mapStateToProps, {setDialogIsOpen}
)(injectIntl(withRouter(withFirebase(Company))));
