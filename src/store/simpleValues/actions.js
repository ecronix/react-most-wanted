import * as types from './types';

export function setSimpleValue(id, value){
  return {
    type: types.ON_SIMPLE_VALUE_CHANGED,
    id,
    value
  };
}
