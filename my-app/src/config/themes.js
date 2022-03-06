import red from '@mui/material/colors/red'
import pink from '@mui/material/colors/pink'
import green from '@mui/material/colors/green'

const themes = [
  {
    id: 'default',
    source: {
      palette: {
        primary: { main: '#343434' },
        secondary: {
          main: '#c62828',
        },
      },
    },
  },
  {
    id: 'red',
    color: red[500],
    source: {
      palette: {
        primary: red,
        secondary: pink,
        error: red,
      },
    },
  },
  {
    id: 'green',
    color: green[500],
    source: {
      palette: {
        primary: green,
        secondary: red,
        error: red,
      },
    },
  },
  {
    id: 'standard',
  },
]

export default themes
