import React, { useState, lazy, Suspense } from 'react'
import AppBar from '@mui/material/AppBar'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { Helmet } from 'react-helmet'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useNavigate } from 'react-router-dom'

const PageContent = lazy(() => import('./PageContent'))
const Footer = lazy(() => import('./Footer'))
const ResponsiveMenu = lazy(() =>
  import('rmw-shell/lib/containers/ResponsiveMenu')
)

const LandingPage = () => {
  const [scrollbar, setScrollbar] = useState(null)
  const [transparent, setTransparent] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [components, setComponents] = useState(null)
  const [top, setTop] = useState(null)
  const navigate = useNavigate()

  const scrollTo = (e) => {
    e &&
      e.scrollIntoView({
        behavior: 'smooth',
        alignToTop: true,
      })
  }

  const sections = [
    {
      name: 'start',
      onClick: () => navigate('/dashboard'),
    },
    {
      name: 'components',
      onClick: () => {
        setScrolled(true)
        setTimeout(() => {
          scrollTo(components)
        }, 500)
      },
    },
  ]

  return (
    <React.Fragment>
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
        renderView={(props) => (
          <div
            {...props}
            style={{
              ...props.style,
            }}
          />
        )}
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
            backgroundColor: transparent ? 'transparent' : '#242424',
            boxShadow: transparent ? 'none' : '#242424',
            transition: 'background 1s',
          }}
          position="static"
        >
          <Toolbar disableGutters>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                scrollTo(top)
              }}
            >
              <img
                src={'/rmw.svg'}
                alt="logo"
                style={{
                  height: 35,
                  justifySelf: 'center',
                  color: 'white',
                  marginLeft: 12,
                  display: transparent ? 'none' : undefined,
                }}
              />
            </div>
            <div style={{ flex: 1 }} />

            <Suspense fallback={<CircularProgress />}>
              <ResponsiveMenu sections={sections} />
            </Suspense>
          </Toolbar>
        </AppBar>
        <div style={{ width: '100%', height: '100%' }}>
          <div
            ref={(r) => r && setTop(r)}
            style={{
              height: '100vh',
              width: '100%',
              backgroundColor: 'black',
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
                style={{ height: 150, width: 150, justifySelf: 'center' }}
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
                  React Starter-Kit with all the Most Wanted features
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
                    navigate('/dashboard')
                  }}
                >
                  Start
                </Button>
              </div>
              {scrolled && (
                <Suspense
                  fallback={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '125px',
                      }}
                    >
                      <CircularProgress />
                    </div>
                  }
                >
                  <PageContent setComponents={setComponents} />
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
  )
}

export default LandingPage
