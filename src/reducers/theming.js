import{ SET_CURRENT_THEME } from '../actions/theming';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const initialState = {
  id: 'light',
  label: 'Light',
  source: lightBaseTheme,
}

const theming = (state = initialState , action) => {

  switch (action.type) {
    case SET_CURRENT_THEME:
    return {...action.theme} ;

    default:
    return state;
  }
}

export default theming;
