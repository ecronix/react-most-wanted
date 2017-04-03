import{ UPDATE_LOCALE } from '../actions/locale';

const locales = (state = 'en' , action) => {

  switch (action.type) {
    case UPDATE_LOCALE:
    return action.locale ;

    default:
    return state;
  }
}

export default locales;
