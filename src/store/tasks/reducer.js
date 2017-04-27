import {
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  FILTER_TASKS,
  LOAD_TASKS_SUCCESS,
  UPDATE_TASK_SUCCESS
} from './types';

export const initialState={
  initialized: false,
  deleted: null,
  filter: '',
  list: [],
  previous: null
}

export default function tasks(state = initialState, {payload, type}) {
  switch (type) {
    case CREATE_TASK_SUCCESS:
    return {...state, list: [...(state.list), payload]}

    case DELETE_TASK_SUCCESS:
    return { ...state,
      deleted: payload,
      previous: state.list,
      list: state.list.filter(task => task.key !== payload.key)
    };

    case FILTER_TASKS:
    return {...state, filter: payload, list: payload};

    case LOAD_TASKS_SUCCESS:
    return  {...state, initialized: true, list: payload};

    case UPDATE_TASK_SUCCESS:
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
