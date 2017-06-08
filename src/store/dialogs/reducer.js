import * as types from './types';

export default function dialogs(state={}, action){

  switch (action.type) {
    case types.ON_DIALOG_OPEN_CHANGED:
    return {...state, [action.id]: action.isOpen};
    default:
    return state;
  }

}
