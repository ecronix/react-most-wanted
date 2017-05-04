import FirebaseList from '../../utils/firebase-list';
import * as types from './types';

const taskList= new FirebaseList({
  onAdd: createTaskSuccess,
  onChange: updateTaskSuccess,
  onLoad: loadTasksSuccess,
  onRemove: deleteTaskSuccess
}, 'public_tasks')


export function deleteTaskError(error) {
  return {
    type: types.DELETE_TASK_ERROR,
    payload: error
  };
}

export function deleteTaskSuccess(payload) {
  return {
    type: types.DELETE_TASK_SUCCESS,
    payload
  };
}

export function createTaskError(error) {
  return {
    type: types.CREATE_TASK_ERROR,
    payload: error
  };
}

export function createTaskSuccess(payload) {
  return {
    type: types.CREATE_TASK_SUCCESS,
    payload
  };
}


export function loadTasksSuccess(list) {
  return {
    type: types.LOAD_TASKS_SUCCESS,
    payload: {list}
  };
}

export function setIsCreating(isCreating) {
  return {
    type: types.CREATE_TASK,
    payload: {isCreating}
  };
}

export function setIsFetching(isFetching) {
  return {
    type: types.FETCH_TASKS,
    payload: {isFetching}
  };
}

export function setIsEditing(isEditing) {
  return {
    type: types.EDIT_TASK,
    payload: {isEditing}
  };
}

export function updateTaskSuccess(task) {
  return {
    type: types.UPDATE_TASK_SUCCESS,
    payload: task
  };
}

export function updateTaskError(error) {
  return {
    type: types.UPDATE_TASK_ERROR,
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
    type: types.UNLOAD_TASKS_SUCCESS
  };
}
