import FirebaseList from './firebase-list';
import getTypes from './firebase-list-types';

export default class ListActions {
  constructor(listName) {
    this._listName = listName;
    this._namespace = listName.toUpperCase();
    this._types = getTypes(listName);

    this._list= new FirebaseList({
      onAdd: this.createSuccess,
      onChange: this.updateSuccess,
      onLoad: this.loadSuccess,
      onRemove: this.deleteSuccess
    }, listName);

  }

  setIsFetching = (isFetching) => {
    return {
      type: this._types.FETCH,
      payload: {isFetching}
    };
  }

  setIsEditing = (isEditing) => {
    return {
      type: this._types.EDIT,
      payload: {isEditing}
    };
  }

  setIsCreating = (isCreating) => {
    return {
      type: this._types.CREATE,
      payload: {isCreating}
    };
  }

  listError = (error) => {
    return {
      type: this._types.ERROR,
      payload: {error}
    };
  }

  createSuccess = (payload) => {
    return {
      type: this._types.CREATE_SUCCESS,
      payload
    };
  }

  loadSuccess = (list) => {
    return {
      type: this._types.LOAD_SUCCESS,
      payload: {list}
    };
  }

  updateSuccess = (node) => {
    return {
      type: this._types.UPDATE_SUCCESS,
      payload: node
    };
  }

  deleteSuccess = (payload) => {
    return {
      type: this._types.DELETE_SUCCESS,
      payload
    };
  }

  createActions(){

    const setIsCreating = (isCreating) => {
      return (dispatch, getState) => {
        dispatch(this.setIsCreating(isCreating));
      };
    }

    const setIsEditing = (isEditing) => {
      return (dispatch, getState) => {
        dispatch(this.setIsEditing(isEditing));
      };
    }

    const initialiseList = () => {
      return (dispatch, getState) => {
        dispatch(this.setIsFetching(true));
        this._list.subscribe(dispatch);
      };
    }

    const unsubscribeList = () => {
      return dispatch => {
        this._list.unsubscribe();
      };
    }

    const removeChild = (key) => {
      return dispatch => {
        this._list.remove(key)
        .catch(error => dispatch(this.listError(error)));
      };
    }

    const pushChild = (node) => {
      return dispatch => {
        this._list.push(node)
        .catch(error => dispatch(this.listError(error)));
      };
    }

    const updateChild = (key, changes) => {
      return dispatch => {
        this._list.update(key, changes)
        .catch(error => dispatch(this.listError(error)));
      };
    }

    return {
      initialiseList,
      removeChild,
      pushChild,
      updateChild,
      setIsCreating,
      setIsEditing,
      unsubscribeList
    }
  }


}
