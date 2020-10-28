import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import formatMessage from './messages'
import { Helmet } from 'react-helmet'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import { Scrollbars } from 'react-custom-scrollbars'
import Toolbar from '@material-ui/core/Toolbar'
import TrackChanges from '@material-ui/icons/TrackChanges'
import FileCopy from '@material-ui/icons/FileCopy'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#242424' },
    secondary: {
      main: '#c62828',
    },
  },
})

const PackageCard = ({ title, command, description, icons }) => {
  return (
    <Card elevation={4} style={{ margin: 18, maxWidth: 350 }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          {title}
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#F3F4F4',
            padding: 8,
          }}
        >
          <Typography
            gutterBottom
            variant="body1"
            color="textSecondary"
            component="h2"
          >
            {command}
          </Typography>
          <IconButton
            onClick={() => {
              if (window.clipboardData) {
                // Internet Explorer
                window.clipboardData.setData('Text', command)
              } else {
                try {
                  navigator.clipboard.writeText(command)
                } catch (error) {}
              }
            }}
          >
            <FileCopy />
          </IconButton>
        </div>
        <br />
        {icons}
        <br />
        <Typography variant="body2" component="div">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

// eslint-disable-next-lin
export default function () {
  const history = useHistory()
  const [scrollbar, setScrollbar] = useState(null)
  const [transparent, setTransparent] = useState(true)

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
                  component="h3"
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
                  component="h2"
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
                    variant="contained"
                    color="secondary"
                    name={'signin'}
                    onClick={() => {
                      history.push('/dashboard')
                    }}
                  >
                    {formatMessage('start')}
                  </Button>
                </div>
                <div style={{ height: 20 }} />
                <Typography
                  variant="h3"
                  //color="textSecondary"
                  style={{ margin: 16, textAlign: 'center' }}
                >
                  A solution for every project
                </Typography>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ margin: 16, textAlign: 'center' }}
                >
                  Choose from 3 different starter kits. From a basic one to a
                  full featured application.
                </Typography>
                <div style={{ height: 30 }} />

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'space-around',
                    flexWrap: 'wrap',
                  }}
                >
                  <PackageCard
                    title={'base-shell'}
                    command={'npx create-react-app my-app --template base'}
                    description={
                      'The basic react setup: routing, internationalization and async load.'
                    }
                    icons={
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-around',
                        }}
                      >
                        <img
                          src="react.png"
                          alt="react"
                          style={{ width: 50 }}
                        />
                      </div>
                    }
                  />
                  <PackageCard
                    title={'material-ui-shell'}
                    command={
                      'npx create-react-app my-app --template material-ui'
                    }
                    description={
                      'Includes all features from the base shell expanded with Material-UI.'
                    }
                    icons={
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-around',
                        }}
                      >
                        <img
                          src="react.png"
                          alt="react"
                          style={{ width: 50 }}
                        />
                        <img
                          src="material-ui.png"
                          alt="react"
                          style={{ width: 50 }}
                        />
                      </div>
                    }
                  />
                  <PackageCard
                    title={'rmw-shell'}
                    command={'npx create-react-app my-app --template rmw'}
                    description={'Base shell + Material UI shell + Firebase'}
                    icons={
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-around',
                        }}
                      >
                        <img
                          src="react.png"
                          alt="react"
                          style={{ width: 50 }}
                        />
                        <img
                          src="material-ui.png"
                          alt="react"
                          style={{ width: 50 }}
                        />
                        <img
                          src="firebase.png"
                          alt="react"
                          style={{ width: 50 }}
                        />
                      </div>
                    }
                  />
                </div>
                <div style={{ height: 30 }} />
                <div
                  style={{
                    //height: 400,
                    backgroundColor: '#2D2D2D',
                    backgroundImage: 'radial-gradient( #4F4F4F,#242424)',
                  }}
                >
                  <div style={{ height: 30 }} />
                  <Typography
                    variant="h3"
                    //color="textSecondary"
                    style={{ margin: 16, textAlign: 'center', color: 'white' }}
                  >
                    Not just a template
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{ margin: 16, textAlign: 'center', color: 'grey' }}
                  >
                    But also not a framework.
                  </Typography>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <TrackChanges style={{ fontSize: 150, color: 'white' }} />
                  </div>
                  <Typography
                    variant="h5"
                    style={{ margin: 16, textAlign: 'center', color: 'grey' }}
                  >
                    You start easy like with every other template but you can
                    also update the template parts over the time. And with the
                    updates you don't only update the components but also get
                    new features and get bugfixes.
                  </Typography>
                  <div style={{ height: 50 }} />
                </div>

                <div style={{ height: 30 }} />
                <Typography
                  variant="h3"
                  //color="textSecondary"
                  style={{ margin: 16, textAlign: 'center' }}
                >
                  Only the best
                </Typography>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ margin: 16, textAlign: 'center' }}
                >
                  Every template is a collection of very carefully picked
                  packages and projects. Only the creme de la creme of the react
                  ecosystem
                </Typography>
                <div style={{ height: 30 }} />
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                  }}
                >
                  <img src="react.png" alt="react" style={{ width: 150 }} />
                  <img
                    src="material-ui.png"
                    alt="react"
                    style={{ width: 150 }}
                  />
                  <img src="firebase.png" alt="react" style={{ width: 150 }} />
                </div>
                <div style={{ height: 50 }} />
              </Paper>
            </div>
            <div style={{ height: 200 }}></div>

            <div
              style={{
                height: '400px',
                //width: '100%',
                backgroundImage: 'url(bottom.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            ></div>
            <AppBar
              position="relative"
              style={{
                //position: 'absolute',
                width: '100%',
                padding: 18,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              id="footer-text"
            >
              {`© ${new Date().getFullYear()} Copyright: yourcompany.com! All Rights Reserved`}
            </AppBar>
          </div>
        </Scrollbars>
      </React.Fragment>
    </ThemeProvider>
  )
}
