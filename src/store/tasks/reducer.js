import * as types from './types';

export const initialState={
  isFetching: false,
  isCreating: false,
  list: [],
}

export default function tasks(state = initialState, {payload, type}) {
  switch (type) {
    case types.CREATE_TASK_SUCCESS:
    return {...state, isCreating:false, list: [...(state.list), payload]}

    case types.DELETE_TASK_SUCCESS:
    return { ...state,
      deleted: payload,
      previous: state.list,
      list: state.list.filter(task => task.key !== payload.key)
    };

    case types.CREATE_TASK:
    case types.FETCH_TASKS:
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
