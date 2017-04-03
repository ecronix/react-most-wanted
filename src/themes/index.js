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

  const themeFound=themes.find((l)=>{return l.id===theme});

  if(themeFound){
    return themeFound.source;
  }

  //If no locale is found the first one will be returned
  return themes[0].source;
}


export default themes;
