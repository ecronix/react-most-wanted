import * as types from './types';

export default function persistentValues(state={}, action){

  switch (action.type) {
    case types.ON_PERSISTANT_VALUE_CHANGED:
    return {...state, [action.id]: action.value};
    default:
    return state;
  }

}
