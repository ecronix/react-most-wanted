import * as types from './types';

export const initialState={
  isFetching: false,
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
    case types.EDIT_TASK:
    return {...state, ...payload};

    case types.LOAD_SUCCESS:
    return  {...state, isFetching: false, ...payload};


    default:
    return state;
  }
}
