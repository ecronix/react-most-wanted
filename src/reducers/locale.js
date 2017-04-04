import{ UPDATE_LOCALE } from '../actions/locale';

const locale = (state = 'en' , action) => {

  switch (action.type) {
    case UPDATE_LOCALE:
    return action.locale;

    default:
    return state;
  }
}

export default locale;
