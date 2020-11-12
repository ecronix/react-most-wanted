import React, { useState, lazy, Suspense } from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import formatMessage from './messages'
import { Helmet } from 'react-helmet'
import Paper from '@material-ui/core/Paper'
import { Scrollbars } from 'react-custom-scrollbars'
import Toolbar from '@material-ui/core/Toolbar'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const PageContent = lazy(() => import('./PageContent'))
const Footer = lazy(() => import('./Footer'))

const theme = createMuiTheme({
  palette: {
    primary: { main: '#242424' },
    secondary: {
      main: '#c62828',
    },
  },
})

const LandingPage = () => {
  const [scrollbar, setScrollbar] = useState(null)
  const [transparent, setTransparent] = useState(true)

  return (
    <Suspense
      fallback={() => {
        return <div>Loading...</div>
      }}
    >
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <Helmet>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1, minimal-ui"
            />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta
              name="keywords"
              content={
                'react,pwa,material-ui,redux,boilerplate,lighthouse,gdg,react.js'
              }
            />
            <meta
              name="description"
              content={
                'React PWA boilerplate that is using create-react-app and firebase '
              }
            />

            <title>React Most Wanted</title>
          </Helmet>
          <Scrollbars
            ref={(e) => {
              if (e !== null) {
                setScrollbar(e)
              }
            }}
            onScroll={(e) => {
              setTransparent(scrollbar.viewScrollTop < 100)
            }}
            autoHide
            style={{ width: '100%', height: '100vh' }}
          >
            <AppBar
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: transparent ? 'transparent' : undefined,
                boxShadow: transparent ? 'none' : undefined,
                transition: 'background 1s',
              }}
              position="static"
            >
              <Toolbar>
                <Typography style={{ fontFamily: 'fantasy' }}>
                  React Most Wanted
                </Typography>
              </Toolbar>
            </AppBar>
            <div style={{ width: '100%', height: '100%' }}>
              <div
                style={{
                  height: '100vh',
                  width: '100%',
                  backgroundImage: 'url(background.webp)',
                  backgroundRepeat: 'no-repeat',
                  backgroundAttachment: 'fixed',
                  backgroundSize: 'cover',
                  display: 'flex',
                  justifyContent: 'center',
                  minHeight: 600,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <img
                    src={'/rmw.svg'}
                    alt="logo"
                    style={{ height: 150, maxWidth: 280 }}
                  />

                  <Typography
                    variant="h2"
                    align="center"
                    component="div"
                    color="inherit"
                    gutterBottom
                    style={{
                      color: 'white',
                      marginTop: 18,
                      textAlign: 'center',
                      fontSize: 'bold',
                      fontFamily: 'fantasy',
                    }}
                  >
                    REACT MOST WANTED
                  </Typography>

                  <Typography
                    variant="h5"
                    component="div"
                    color="inherit"
                    gutterBottom
                    style={{ color: 'white', textAlign: 'center' }}
                  >
                    {formatMessage('intro')}
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -80,
                }}
              >
                <Paper
                  elevation={3}
                  style={{ width: '100%', maxWidth: '90%', borderRadius: 15 }}
                >
                  <PageContent />
                </Paper>
              </div>
              <div style={{ height: 200 }}></div>
              <Footer />
            </div>
          </Scrollbars>
        </React.Fragment>
      </ThemeProvider>
    </Suspense>
  )
}

export default LandingPage
