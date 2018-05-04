import { createMuiTheme } from 'material-ui/styles'
import icsTheme from './ics_theme'
import red from 'material-ui/colors/red'
import pink from 'material-ui/colors/pink'
import green from 'material-ui/colors/green'
// import red from 'material-ui/colors/red'

const themes = [
  {
    id: 'light',
    source: {
      palette: {
        primary: red,
        secondary: green
      }
    }
  },
  {
    id: 'dark',
    source: {
      palette: {
        primary: red,
        secondary: pink,
        error: red
      }
    }
  },
  {
    id: 'ics',
    source: icsTheme
  }
]

export default themes
