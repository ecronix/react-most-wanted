import React, { useState, lazy, Suspense, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { Helmet } from 'react-helmet'
import Paper from '@material-ui/core/Paper'
import { Scrollbars } from 'react-custom-scrollbars'
import Toolbar from '@material-ui/core/Toolbar'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'

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
  const [scrolled, setScrolled] = useState(false)
  const history = useHistory()

  return (
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
          <link rel="canonical" href="https://www.react-most-wanted.com" />
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
            setScrolled(true)
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
              <Typography style={{}}>React Most Wanted</Typography>
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
                  style={{ height: 150, maxWidth: 280, justifySelf: 'center' }}
                />

                <div style={{ padding: 8 }}>
                  <h3
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 50,
                    }}
                  >
                    REACT MOST WANTED
                  </h3>

                  <h4
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 25,
                      marginTop: -40,
                    }}
                  >
                    React Starter-Kit with all Most Wanted features
                  </h4>
                </div>
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
                style={{
                  width: '100%',
                  maxWidth: '90%',
                  borderRadius: 15,
                  minHeight: 400,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: -50,
                  }}
                >
                  <Button
                    size="large"
                    style={{
                      margin: 30,
                      borderRadius: '40px',
                      fontSize: 'bold',
                    }}
                    aria-label="Start button"
                    variant="contained"
                    color="secondary"
                    name={'signin'}
                    onClick={() => {
                      history.push('/dashboard')
                    }}
                  >
                    Start
                  </Button>
                </div>
                {scrolled && (
                  <Suspense fallback={<CircularProgress />}>
                    <PageContent />
                  </Suspense>
                )}
              </Paper>
            </div>
            <div style={{ height: 200 }}></div>
            {scrolled && (
              <Suspense fallback={<CircularProgress />}>
                <Footer />
              </Suspense>
            )}
          </div>
        </Scrollbars>
      </React.Fragment>
    </ThemeProvider>
  )
}

export default LandingPage
