import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const theme = (state = Immutable('light') , action) => {

  switch (action.type) {
    case types.UPDATE_THEME:
    return action.theme ;

    default:
    return state;
  }
}

export default theme;
