import{ UPDATE_THEME } from '../actions/theme';

const theme = (state = 'light' , action) => {

  switch (action.type) {
    case UPDATE_THEME:
    return action.theme ;

    default:
    return state;
  }
}

export default theme;
