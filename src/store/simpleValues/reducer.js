import * as types from './types';

export default function simpleValues(state={}, action){

  switch (action.type) {
    case types.ON_SIMPLE_VALUE_CHANGED:
    return {...state, [action.id]: action.value};
    default:
    return state;
  }

}
