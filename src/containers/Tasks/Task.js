import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl } from 'react-intl';
import { FireForm } from '../../containers/FireForm'
import TaskForm from './TaskForm';
import { withRouter } from 'react-router-dom';

class Task extends Component {

  render() {
    return (
      <FireForm path={`/public_tasks/${this.props.match.params.taskUid}`}>
        <TaskForm />
      </FireForm>
    );
  }
}

export default connect()(injectIntl(withRouter(Task)));
