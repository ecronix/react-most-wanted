import getTypes from './types';

export const initialState={
  isFetching: false,
  isCreating: false,
  isEditing: null,
  list: {},
}

export default function getListReducers(listName){

  const types=getTypes(listName);

  const reducers = (state = initialState, {payload, type}) => {
    switch (type) {
      case types.CREATE_SUCCESS:
      return {...state, list:{...state.list, [payload.key]: payload.data}};

      case types.UPDATE_SUCCESS:
      return {...state, list:{...state.list, [payload.key]: payload.data}};

      case types.DELETE_SUCCESS:
      let { [payload.key]: undefined, ...rest}= state.list;
      return { ...state, list: rest };

      case types.FETCH:
      case types.CREATE:
      case types.EDIT:
      return {...state, ...payload};

      case types.ERROR:
      return {...state, isFetching: false};

      case types.LOAD_SUCCESS:
      return  {...state, isFetching: false, ...payload};

      default:
      return state;
    }
  }

  return reducers;

}
