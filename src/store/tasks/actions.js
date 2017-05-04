import FirebaseList from '../../utils/firebase-list';
import * as types from './types';

const taskList= new FirebaseList({
  onAdd: createTaskSuccess,
  onChange: updateTaskSuccess,
  onLoad: loadTasksSuccess,
  onRemove: deleteTaskSuccess,
  onConnectionChange: setIsConnected
}, 'public_tasks')


export function deleteTaskError(error) {
  return {
    type: types.DELETE_ERROR,
    payload: error
  };
}

export function deleteTaskSuccess(payload) {
  return {
    type: types.DELETE_SUCCESS,
    payload
  };
}

export function createTaskError(error) {
  return {
    type: types.CREATE_ERROR,
    payload: error
  };
}

export function createTaskSuccess(payload) {
  return {
    type: types.CREATE_SUCCESS,
    payload
  };
}


export function loadTasksSuccess(list) {
  return {
    type: types.LOAD_SUCCESS,
    payload: {list}
  };
}

export function setIsCreating(isCreating) {
  return {
    type: types.CREATE,
    payload: {isCreating}
  };
}

export function setIsConnected(isConnected) {
  return {
    type: types.CONNECTED,
    payload: {isConnected}
  };
}

export function setIsFetching(isFetching) {
  return {
    type: types.FETCH,
    payload: {isFetching}
  };
}

export function setIsEditing(isEditing) {
  return {
    type: types.EDIT,
    payload: {isEditing}
  };
}

export function updateTaskSuccess(task) {
  return {
    type: types.UPDATE_SUCCESS,
    payload: task
  };
}

export function updateTaskError(error) {
  return {
    type: types.UPDATE_ERROR,
    payload: error
  };
}

export function loadTasks() {
  return (dispatch, getState) => {

    dispatch(setIsFetching(true));
    taskList.subscribe(dispatch);
  };
}

export function createTask(task) {
  return dispatch => {

    dispatch(setIsCreating(false));

    taskList.push(task)
      .catch(error => dispatch(createTaskError(error)));
  };
}

export function updateTask(key, changes) {
  return dispatch => {
    taskList.update(key, changes)
      .catch(error => dispatch(updateTaskError(error)));
  };
}

export function deleteTask(key) {
  return dispatch => {
    taskList.remove(key)
      .catch(error => dispatch(deleteTaskError(error)));
  };
}

export function unloadTasks() {
  taskList.unsubscribe();
  return {
    type: types.UNLOAD_SUCCESS
  };
}
