import FirebaseList from '../../utils/firebase-list';
import * as types from './types';

const taskList= new FirebaseList({
  onAdd: createSuccess,
  onChange: updateSuccess,
  onLoad: loadSuccess,
  onRemove: deleteSuccess
}, 'users')


export function deleteError(error) {
  return {
    type: types.DELETE_ERROR,
    payload: error
  };
}

export function deleteSuccess(payload) {
  return {
    type: types.DELETE_SUCCESS,
    payload
  };
}

export function createError(error) {
  return {
    type: types.CREATE_ERROR,
    payload: error
  };
}

export function createSuccess(payload) {
  return {
    type: types.CREATE_SUCCESS,
    payload
  };
}


export function loadSuccess(list) {
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

export function updateSuccess(task) {
  return {
    type: types.UPDATE_SUCCESS,
    payload: task
  };
}

export function updateError(error) {
  return {
    type: types.UPDATE_ERROR,
    payload: error
  };
}

export function requestLoad() {
  return (dispatch, getState) => {

    dispatch(setIsFetching(true));
    taskList.subscribe(dispatch);
  };
}

export function requestCreate(task) {
  return dispatch => {

    dispatch(setIsCreating(false));

    taskList.push(task)
      .catch(error => dispatch(createError(error)));
  };
}

export function requestUpdate(key, changes) {
  return dispatch => {
    taskList.update(key, changes)
      .catch(error => dispatch(updateError(error)));
  };
}

export function requestDelete(key) {
  return dispatch => {
    taskList.remove(key)
      .catch(error => dispatch(deleteError(error)));
  };
}

export function requestUnload() {
  taskList.unsubscribe();
  return {
    type: types.UNLOAD_SUCCESS
  };
}
