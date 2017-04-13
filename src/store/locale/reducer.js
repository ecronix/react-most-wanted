import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const locale = (state = Immutable('en') , action) => {

  switch (action.type) {
    case types.UPDATE_LOCALE:
    return action.locale;

    default:
    return state;
  }
}

export default locale;
