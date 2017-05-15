import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../components/Activity';
import * as taskActions from '../../store/tasks/actions';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import {transparent, green800} from 'material-ui/styles/colors';
import {BottomNavigation} from 'material-ui/BottomNavigation';

const styles={
  center_container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 16,
  },
  button: {
    position: 'fixed',
    right: 18,
    zIndex:3,
    bottom: 18,
  },

  text_input: {
    position: 'fixed',
    zIndex:3,
    bottom: 15,
    marginLeft: -155
  }
}


class Tasks extends Component {

  constructor(props) {
    super(props);
    this.name = null;
    this.new_task_title = null;
  }

  componentWillMount() {
    this.props.loadTasks();
  }

  handleKeyDown = (event, onSucces) => {
    if(event.keyCode===13){
      onSucces();
    }
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

    const title=this.name.getValue();

    const newTask={
      title: title,
      created: firebase.database.ServerValue.TIMESTAMP ,
      userName: auth.displayName,
      userPhotoURL: auth.photoURL,
      userId: auth.uid,
      completed: false
    }

    if(title.length>0){
      createTask(newTask);
    }

  }

  handleUpdateTask = (key, task) => {
    const { updateTask }=this.props;
    updateTask(key, task);
  }

  userAvatar(task){
    return task.completed?
    <Avatar
      icon={<FontIcon className="material-icons" >check_circle</FontIcon>}
      color={green800}
      backgroundColor={transparent}
    />
    :
    <Avatar src={task.userPhotoURL} />
  }

  rednerTasks(tasks) {
    const {deleteTask, muiTheme, setIsEditing, auth, intl} =this.props;

    return _.map(tasks.list, (task, key) => {

      const isEditing=tasks.isEditing===key;

      return <div key={key}>

        {isEditing && <ListItem
          leftAvatar={this.userAvatar(task)}
          key={key} >
          <TextField
            id="new_task_title"
            style={{height: 26}}
            underlineShow={false}
            defaultValue={task.title}
            fullWidth={true}
            onKeyDown={(event)=>{this.handleKeyDown(event, ()=>{this.handleUpdateTask(key, {...task, title: this.new_task_title.getValue()})})}}
            ref={(field) => { this.new_task_title = field; this.new_task_title && this.new_task_title.focus(); }}
            type="Text"
          />

          <div>
            <IconButton
              onTouchTap={tasks.isEditing?()=>{this.handleUpdateTask(key,{...task, title: this.new_task_title.getValue()})}:()=>{setIsEditing(key);}}>
              <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>{'save'}</FontIcon>
            </IconButton>

            <IconButton
              onTouchTap={()=>{deleteTask(key);}}>
              <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>{'delete'}</FontIcon>
            </IconButton>

            <IconButton
              onTouchTap={()=>{setIsEditing(false);}}>
              <FontIcon className="material-icons" color={'red'}>{'cancel'}</FontIcon>
            </IconButton>
          </div>

        </ListItem>

      }

      {!isEditing &&
        <ListItem
          key={key}
          onTouchTap={()=>{this.handleUpdateTask(key,{...task, completed: !task.completed})}}
          leftAvatar={this.userAvatar(task)}
          primaryText={task.title}
          secondaryText={`${task.userName} ${task.created?intl.formatRelative(new Date(task.created)):undefined}`}
          id={key}
          rightIconButton={task.userId===auth.uid?
            <IconButton
              onTouchTap={isEditing?()=>{this.handleUpdateTask(key,{...task, title: this.new_task_title.getValue()})}:()=>{setIsEditing(key);}}>
              <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>{isEditing?'save':'edit'}</FontIcon>
            </IconButton>:undefined
          }
        />
      }
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
        {tasks.isFetching && tasks.isConnected && !Object.keys(tasks.list).length &&
          <div style={styles.center_container}>
            <CircularProgress  style={{padding: 20}} size={80} thickness={5} />
          </div>
        }

        <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
          <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
            {this.rednerTasks(tasks)}
          </List>
        </div>


        { tasks.isCreating &&
          <BottomNavigation style={{width: '100%'}}>
            <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-between', }}>
              <IconButton
                onTouchTap={()=>{setIsCreating(false)}}>
                <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>highlight_off</FontIcon>
              </IconButton>
              <TextField
                id="public_task"
                fullWidth={true}
                onKeyDown={(event)=>{this.handleKeyDown(event, this.handleAddTask)}}
                ref={(field) => { this.name = field; this.name && this.name.focus(); }}
                type="Text"
              />
              <IconButton
                onTouchTap={this.handleAddTask}>
                <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>send</FontIcon>
              </IconButton>
            </div>
          </BottomNavigation>
        }

        { !tasks.isCreating &&
          <div style={styles.button}>
            <FloatingActionButton onTouchTap={()=>{setIsCreating(true)}} style={{zIndex:3}}>
              <FontIcon className="material-icons" >add</FontIcon>
            </FloatingActionButton>
          </div>
        }


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
    ...taskActions
  }
)(injectIntl(muiThemeable()(Tasks)));
