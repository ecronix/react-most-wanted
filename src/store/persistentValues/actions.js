import * as types from './types';

export function setPeristentValue(id, value){
  return {
    type: types.ON_PERSISTANT_VALUE_CHANGED,
    id,
    value
  };
}
