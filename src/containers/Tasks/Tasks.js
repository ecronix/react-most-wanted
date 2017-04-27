import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../components/Activity';
import { loadTasks, filterTasks, createTask, deleteTask, unloadTasks } from '../../store/tasks/actions';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.name = null;
  }

  componentWillMount() {
    this.props.loadTasks();
  }

  componentWillUnmount() {
    this.props.unloadTasks();
  }

  handleAddTask = () => {
    const {createTask}=this.props;
    createTask(this.name.getValue());
    this.name.setState({ value: "" })
  }

  rednerTasks(tasks) {
    const {deleteTask} =this.props;

    return _.map(tasks, (task, key) => {
      return <ListItem
        key={key}
        primaryText={task}
        id={key}
        rightIconButton={
          <IconButton
            onTouchTap={()=>{deleteTask(key);}}>
            <FontIcon className="material-icons" color={'red'}>delete</FontIcon>
          </IconButton>
        }

      />
    });
  }


  render(){
    const {intl, tasks} =this.props;

    return (
      <Activity
        title={intl.formatMessage({id: 'tasks'})}>
        <TextField
          id="name"
          style={{margin: 15}}
          ref={(field) => { this.name = field; }}
          floatingLabelText={intl.formatMessage({id: 'name'})}
          hintText={intl.formatMessage({id: 'name'})}
          type="Text"
          //fullWidth={true}
        />
        <IconButton
          onTouchTap={this.handleAddTask}>
          <FontIcon className="material-icons" color={'green'}>add</FontIcon>
        </IconButton>
        <List>
          {this.rednerTasks(tasks.list)}
        </List>


      </Activity>
    );

  }

}

Tasks.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  loadTasks: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => {
  const { tasks } = state;
  return {
    tasks
  };
};


export default connect(
  mapStateToProps,
  {
    loadTasks, filterTasks, createTask, deleteTask, unloadTasks
  }
)(injectIntl(muiThemeable()(Tasks)));
