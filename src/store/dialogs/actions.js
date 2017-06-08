import * as types from './types';

export function setDialogIsOpen(id, isOpen){
  return {
    type: types.ON_DIALOG_OPEN_CHANGED,
    id,
    isOpen
  };
}
