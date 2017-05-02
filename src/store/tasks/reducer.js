import * as types from './types';

export const initialState={
  isFetching: false,
  isCreating: false,
  list: {},
}

export default function tasks(state = initialState, {payload, type}) {
  switch (type) {
    case types.CREATE_TASK_SUCCESS:
    return {...state, isCreating:false, list:{...state.list, [payload.key]: payload.data}};

    case types.DELETE_TASK_SUCCESS:
    let { [payload.key]: undefined, ...rest}= state.list;

    return { ...state,
      deleted: payload,
      previous: state.list,
      list: rest 
    };

    case types.FETCH_TASKS:
    case types.CREATE_TASK:
    return {...state, ...payload};

    case types.LOAD_TASKS_SUCCESS:
    return  {...state, isFetching: false, ...payload};

    case types.UPDATE_TASK_SUCCESS:
    return state.merge({
      deleted: null,
      previous: null,
      list: state.list.map(task => {
        return task.key === payload.key ? payload : task;
      })
    });


    default:
    return state;
  }
}
