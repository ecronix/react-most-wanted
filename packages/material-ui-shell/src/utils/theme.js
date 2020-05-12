import { createMuiTheme } from '@material-ui/core/styles'

const getThemeSource = (id, ts, type = 'light') => {
  if (ts) {
    for (let i = 0; i < ts.length; i++) {
      if (ts[i]['id'] === id) {
        const source = ts[i]['source']

        const palette = source != null ? source.palette : {}

        return createMuiTheme({
          ...source,
          palette: { ...palette, type },
        })
      }
    }
  }

  return createMuiTheme({
    palette: { type },
  })
}

export default getThemeSource
