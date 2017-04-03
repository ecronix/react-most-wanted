import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import ics_theme from './ics_theme';

const themes= [
  {
    id: 'light',
    label: 'Light',
    source: lightBaseTheme,
  },
  {
    id: 'dark',
    label: 'Dark',
    source: darkBaseTheme,
  },
  {
    id: 'ics',
    label: 'ICS',
    source: ics_theme,
  },
];

export default themes;
