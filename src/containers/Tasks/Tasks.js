import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ReactDOM  from 'react-dom';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from '../../containers/Activity';
import ListActions from '../../firebase/list/actions';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import { green800} from 'material-ui/styles/colors';
import {BottomNavigation} from 'material-ui/BottomNavigation';
import {withRouter} from 'react-router-dom';

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
    this.listEnd=null
    this.new_task_title = null;
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.listEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate(prevProps, prevState) {

    if(Object.keys(prevProps.tasks.list).length!==Object.keys(this.props.tasks.list).length && !this.props.tasks.isEditing){
      this.scrollToBottom();
    }

  }

  componentDidMount() {
    const {initialiseList}=this.props;

    initialiseList();
    this.scrollToBottom();
  }

  handleKeyDown = (event, onSucces) => {
    if(event.keyCode===13){
      onSucces();
    }
  }

  componentWillUnmount() {
    const {unsubscribeList}=this.props;

    unsubscribeList();
  }


  handleAddTask = () => {
    const {pushChild, auth}=this.props;

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
      pushChild(newTask);
    }

  }

  handleUpdateTask = (key, task) => {
    const { updateChild }=this.props;
    updateChild(key, task);
  }

  handleCompletedChange = () => {

  }

  userAvatar = (key, task) => {
    const {auth} =this.props;

    return task.completed?
    <Avatar
      onTouchTap={auth.uid===task.userId?()=>{this.handleUpdateTask(key,{...task, completed: !task.completed})}:undefined}
      alt="person"
      icon={<FontIcon className="material-icons" >done</FontIcon>}
      backgroundColor={green800}
    />
    :
    <Avatar
      src={task.userPhotoURL}
      onTouchTap={auth.uid===task.userId?()=>{this.handleUpdateTask(key,{...task, completed: !task.completed})}:undefined}
      alt="person"
      icon={
        <FontIcon className="material-icons">
          person
        </FontIcon>
      }
    />
  }

  rednerTasks(tasks) {
    const {removeChild, muiTheme, setIsEditing, auth, intl, history, browser} =this.props;

    return _.map(tasks.list, (task, key) => {

      const isEditing=tasks.isEditing===key;

      return <div key={key}>

        {isEditing && <ListItem
          leftAvatar={this.userAvatar(key, task)}
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
              onTouchTap={()=>{history.push(`/tasks/edit/${key}`); setIsEditing(false)}}>
              <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>{'open_in_new'}</FontIcon>
            </IconButton>

            <IconButton
              onTouchTap={()=>{removeChild(key);}}>
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
          //onTouchTap={auth.uid===task.userId?()=>{this.handleUpdateTask(key,{...task, completed: !task.completed})}:undefined}
          leftAvatar={this.userAvatar(key, task)}
          id={key}>

          <div style={{display: 'flex'}}>
            <div>
              <div>
                {task.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: '16px',
                  height: 16,
                  margin: 0,
                  marginTop: 4,
                  color: muiTheme.listItem.secondaryTextColor,
                }}>
                {`${task.userName} ${task.created?intl.formatRelative(new Date(task.created)):undefined}`}
              </div>
              {task.description && <br/>}
              {task.description && task.description.split('\n').map(function(item, key) {
                return (
                  <span key={key}>
                    {item}
                    <br/>
                  </span>
                )
              })}
            </div>

            <div style={{alignSelf: 'center'}}>
              {task.userId===auth.uid?
                <div>
                  <IconButton
                    onTouchTap={isEditing?()=>{this.handleUpdateTask(key,{...task, title: this.new_task_title.getValue()})}:()=>{setIsEditing(key);}}>
                    <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>{isEditing?'save':'edit'}</FontIcon>
                  </IconButton>
                  <IconButton
                    style={{display:browser.lessThan.medium?'none':undefined}}
                    onTouchTap={isEditing?()=>{this.handleUpdateTask(key,{...task, title: this.new_task_title.getValue()})}:()=>{history.push(`/tasks/edit/${key}`)}}>
                    <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>open_in_new</FontIcon>
                  </IconButton>
                  <IconButton
                    style={{display:browser.lessThan.medium?'none':undefined}}
                    onTouchTap={()=>{removeChild(key);}}>
                    <FontIcon className="material-icons" color={'red'}>{'delete'}</FontIcon>
                  </IconButton>
                </div>:undefined
              }
            </div>
          </div>
        </ListItem>
      }
      <Divider inset={true}/>
    </div>
  });
}


render(){
  const {intl, tasks,  setIsCreating, muiTheme, history} =this.props;

  return (
    <Activity
      isLoading={tasks.isFetching}
      containerStyle={{overflow:'hidden'}}
      title={intl.formatMessage({id: 'tasks'})}>

      <div id="scroller" style={{overflow: 'auto', height: '100%'}}>
        {tasks.isFetching && tasks.isConnected && !Object.keys(tasks.list).length &&
          <div style={styles.center_container}>
            <CircularProgress  style={{padding: 20}} size={80} thickness={5} />
          </div>
        }

        <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
          <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
            {this.rednerTasks(tasks)}
          </List>
          <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.listEnd = el; }}
          />
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
            <FloatingActionButton onTouchTap={()=>{history.push(`/tasks/create`)}} style={{zIndex:3}}>
            <FontIcon className="material-icons" >add_to_photos</FontIcon>
          </FloatingActionButton>
          <div style={{margin:5}}></div>
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
};

const publicTasksActions = new ListActions('public_tasks').createActions();

const mapStateToProps = (state) => {
  const { tasks, auth, browser } = state;

  return {
    tasks,
    auth,
    browser,
  };
};




export default connect(
  mapStateToProps,
  {
    ...publicTasksActions
  }
)(injectIntl(muiThemeable()(withRouter(Tasks))));
