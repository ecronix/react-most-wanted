import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import ics_theme from './ics_theme';

const themes= [
  {
    id: 'light',
    source: lightBaseTheme,
  },
  {
    id: 'dark',
    source: darkBaseTheme,
  },
  {
    id: 'ics',
    source: ics_theme,
  },
];

export function getThemeSource(theme){


  if(themes){
    for (var i = 0; i < themes.length; i++) {
      if(themes[i]['id']===theme){
        return themes[i]['source']
      }
    }
  }

  return lightBaseTheme; //Default theme

}


export default themes;
