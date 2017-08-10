import * as types from './types';

export function setPersistentValue(id, value){
  return {
    type: types.ON_PERSISTENT_VALUE_CHANGED,
    id,
    value
  };
}
