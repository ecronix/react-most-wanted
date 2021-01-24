import { createMuiTheme } from '@material-ui/core/styles'

const getThemeSource = (id, ts, type = 'light', direction) => {
  console.log("in theme, direction:", direction);
  if (ts) {
    for (let i = 0; i < ts.length; i++) {
      if (ts[i]['id'] === id) {
        const source = ts[i]['source']
        const palette = source != null ? source.palette : {}
        return createMuiTheme({
          ...source,
          palette: { ...palette, type },
          direction: direction
        })
      }
    }
  }

  return createMuiTheme({
    palette: { type },
    direction: direction
  })
}

export default getThemeSource
