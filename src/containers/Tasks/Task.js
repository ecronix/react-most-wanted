import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl } from 'react-intl';
import { Activity } from '../../containers/Activity'
import { FireForm } from '../../containers/FireForm'
import TaskForm from './TaskForm';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import ListActions from '../../firebase/list/actions';

class Task extends Component {

  componentDidMount() {
    this.props.initialiseList();
  }

  componentWillUnmount() {
    this.props.unsubscribeList();
  }

  handleCreateValues = (values) => {

    const {auth}=this.props;

    return {
      created: firebase.database.ServerValue.TIMESTAMP ,
      userName: auth.displayName,
      userPhotoURL: auth.photoURL,
      userId: auth.uid,
      completed: false,
      ...values
    }
  }

  render() {

    const {history, intl}=this.props;

    return (
      <Activity
        onBackClick={()=>{history.goBack()}}
        title={intl.formatMessage({id: this.props.match.params.taskUid?'edit_task':'create_task'})}>
        <div style={{margin: 15, display: 'flex'}}>
          <FireForm
            path={`/public_tasks/`}
            handleCreateValues={this.handleCreateValues}
            uid={this.props.match.params.taskUid}>
            <TaskForm />
          </FireForm>
        </div>
      </Activity>
    );
  }
}

const usersActions = new ListActions('users').createActions();


const mapStateToProps = (state) => {
  const { auth, intl } = state;

  return {
    auth,
    intl
  };
};

export default connect(
  mapStateToProps, {...usersActions}
)(injectIntl(withRouter(Task)));
