import * as types from './types';

export const initialState={
  isFetching: false,
  isConnected: false,
  isCreating: false,
  isEditing: null,
  list: {},
}

export default function tasks(state = initialState, {payload, type}) {
  switch (type) {
    case types.CREATE_SUCCESS:
    return {...state, isCreating:false, list:{...state.list, [payload.key]: payload.data}};

    case types.UPDATE_SUCCESS:
    return {...state, isEditing:false, list:{...state.list, [payload.key]: payload.data}};

    case types.DELETE_SUCCESS:
    let { [payload.key]: undefined, ...rest}= state.list;

    return { ...state,
      deleted: payload,
      previous: state.list,
      list: rest
    };

    case types.FETCH:
    case types.CREATE:
    case types.EDIT:
    case types.CONNECTED:
    return {...state, ...payload};

    case types.DELETE_ERROR:
    case types.CREATE_ERROR:
    case types.UPDATE_ERROR:
    return {...state, isFetching: false};

    case types.LOAD_SUCCESS:
    return  {...state, isFetching: false, ...payload};


    default:
    return state;
  }
}
