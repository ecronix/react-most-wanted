import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../components/Activity';
import { loadTasks, filterTasks, createTask, deleteTask, unloadTasks, setIsCreating } from '../../store/tasks/actions';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

const styles={
  center_container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 16,
  }
}


class Tasks extends Component {

  constructor(props) {
    super(props);
    this.name = null;
    this.list = null;
    this.shouldScrollBottom = true;
  }

  componentWillMount() {
    this.props.loadTasks();
  }

  handleKeyDown = (event) => {

    if(event.keyCode===13){
      this.handleAddTask();
    }
  }

  scrollToBottom = () => {

    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: "smooth"});
  }

  componentWillUnmount() {
    this.props.unloadTasks();
  }

  componentDidUpdate() {
    // TODO: just a fast solution. Repair it ASAP
    window.scrollTo(0, 100000)
  }

  handleAddTask = () => {
    const {createTask, auth}=this.props;

    const newTask={
      title: this.name.getValue(),
      userName: auth.displayName,
      userPhotoURL: auth.photoURL,
      completed: false
    }

    createTask(newTask);
  }

  rednerTasks(tasks) {
    const {deleteTask} =this.props;

    return _.map(tasks, (task, key) => {
      return <div key={key}>
        <ListItem
          key={key}
          leftAvatar={<Avatar src={task.userPhotoURL} />}
          primaryText={task.title}
          secondaryText={task.userName}
          id={key}
          rightIconButton={
            <IconButton
              onTouchTap={()=>{deleteTask(key);}}>
              <FontIcon className="material-icons" color={'red'}>delete</FontIcon>
            </IconButton>
          }
        />
        <Divider inset={true}/>
      </div>
    });
  }


  render(){
    const {intl, tasks, setIsCreating, muiTheme} =this.props;

    return (
      <Activity
        title={intl.formatMessage({id: 'tasks'})}>
        <div >
          {tasks.isFetching &&
            <div style={styles.center_container}>
              <CircularProgress  style={{padding: 20}} size={80} thickness={5} />
            </div>
          }

          <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
            <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
              {this.rednerTasks(tasks.list)}
            </List>
          </div>

          <div style={{
            display: 'flex',
            zIndex:3,
            alignItems:
            'center',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'fixed',
            bottom: 15,
            left:0,
            width: '100%'
          }}>

          { tasks.isCreating &&
            <Chip>
              <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                <IconButton
                  onTouchTap={()=>{setIsCreating(false)}}>
                  <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>close</FontIcon>
                </IconButton>
                <TextField
                  id="public_task"
                  onKeyDown={this.handleKeyDown}
                  ref={(field) => { this.name = field; this.name && this.name.focus(); }}
                  type="Text"
                />
                <IconButton
                  onTouchTap={this.handleAddTask}>
                  <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>send</FontIcon>
                </IconButton>
              </div>
            </Chip>
          }

          { !tasks.isCreating &&
            <FloatingActionButton onTouchTap={()=>{setIsCreating(true)}} style={{zIndex:3}}>
              <FontIcon className="material-icons" >add</FontIcon>
            </FloatingActionButton>
          }
          <div style={ {float:"left", clear: "both"} }
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>

      </div>


    </Activity>
  );

}

}

Tasks.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadTasks: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  setIsCreating: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => {
  const { tasks, auth } = state;
  return {
    tasks,
    auth
  };
};


export default connect(
  mapStateToProps,
  {
    loadTasks, filterTasks, createTask, deleteTask, unloadTasks, setIsCreating
  }
)(injectIntl(muiThemeable()(Tasks)));
