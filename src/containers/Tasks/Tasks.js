import React, {Component} from 'react';
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
  }

  componentWillMount() {
    this.props.loadTasks();
  }

  handleKeyDown = (event) => {

    if(event.keyCode===13){
      this.handleAddTask();
    }
  }

  componentWillUnmount() {
    //console.log('test');
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
      return <div key={key}>
        <ListItem
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
        <Divider />
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
              <CircularProgress size={80} thickness={5} />
            </div>
          }

          <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor}}>
            <List  id='test' style={{height: '100%'}}>
              {this.rednerTasks(tasks.list)}
            </List>
          </div>



          <div style={{display: 'flex', zIndex:3, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'fixed', bottom: 15, left:0, width: '100%'}}>

            { tasks.isCreating &&
              <Chip>
                <TextField
                  onKeyDown={this.handleKeyDown}
                  ref={(field) => { this.name = field; this.name && this.name.focus(); }}
                  hintText={intl.formatMessage({id: 'name'})}
                />
                <IconButton
                  onTouchTap={this.handleAddTask}>
                  <FontIcon className="material-icons" color={muiTheme.palette.primary1Color}>send</FontIcon>
                </IconButton>
              </Chip>
            }

            { !tasks.isCreating &&
              <FloatingActionButton onTouchTap={()=>{setIsCreating(true)}} style={{zIndex:3}}>
                <FontIcon className="material-icons" >add</FontIcon>
              </FloatingActionButton>
            }

          </div>





        </div>


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
  setIsCreating: PropTypes.func.isRequired,

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
    loadTasks, filterTasks, createTask, deleteTask, unloadTasks, setIsCreating
  }
)(injectIntl(muiThemeable()(Tasks)));
