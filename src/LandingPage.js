import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { GitHubIcon } from 'rmw-shell/lib/components/Icons'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Helmet } from 'react-helmet'
import AppBar from '@material-ui/core/AppBar'
import { withRouter } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar'

const styles = theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column'
  },
  root: {
    flexGrow: 1,
    flex: '1 0 100%'
    // height: '100%',
    // overflow: 'hidden'
  },
  hero: {
    height: '100%',
    // minHeight: '80vh',
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.type === 'light' ? theme.palette.primary.dark : theme.palette.primary.main
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    letterSpacing: '.7rem',
    textIndent: '.7rem',
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.only('xs')]: {
      fontSize: 24,
      letterSpacing: '.1em',
      textIndent: '.1rem'
    },
    whiteSpace: 'nowrap'
  },
  headline: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit,
    maxWidth: 600,
    textAlign: 'center',
    [theme.breakpoints.only('xs')]: {
      fontSize: 18
    }
  },
  content: {
    height: '100%',
    // paddingTop: theme.spacing.unit * 8,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 12
    }
  },
  button: {
    marginTop: theme.spacing.unit * 3
  },
  logo: {
    color: 'red',
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 4}px`,
    width: '100%',
    height: '40vw',
    maxHeight: 250
  },
  steps: {
    maxWidth: theme.spacing.unit * 130,
    margin: 'auto'
  },
  step: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  stepIcon: {
    marginBottom: theme.spacing.unit
  },
  markdownElement: {}

})

class LandingPage extends Component {


  isAuthorised = () => {
    try {
      const key = Object.keys(localStorage).find(e => e.match(/persist:root/))
      const data = JSON.parse(localStorage.getItem(key))
      const auth = JSON.parse(data.auth)

      return auth && auth.isAuthorised

    } catch (ex) {
      return false
    }
  }

  componentDidMount() {
    const { history } = this.props

    if (this.isAuthorised()) {
      history.push('/signin')
    }
  }


  render() {
    const { classes, history } = this.props

    return (
      <div className={classes.main}>
        <Helmet>
          <title>REACT MOST WANTED</title>
        </Helmet>
        <AppBar position='static'>
          <Toolbar disableGutters>
            <div style={{ flex: 1 }} />

            <IconButton
              name='github'
              aria-label='Open Github'
              color='inherit'
              href='https://github.com/TarikHuber/react-most-wanted'
              target='_blank'
              rel='noopener'
            >
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className={classes.root}>


          <div className={classes.hero}>
            <div className={classes.content}>
              <img
                src='/rmw.svg'
                alt='Material-UI Logo'
                className={classes.logo}
              />
              <div className={classes.text}>
                <Typography
                  variant='display2'
                  align='center'
                  component='h1'
                  color='inherit'
                  gutterBottom
                  className={classes.title}
                >
                  {'REACT MOST WANTED'}
                </Typography>
                <Typography
                  variant='headline'
                  component='h2'
                  color='inherit'
                  gutterBottom
                  className={classes.headline}
                >
                  {'React Starter-Kit with all Most Wanted features.'}
                </Typography>
                <Button
                  onClick={() => { history.push('/signin') }}
                  className={classes.button}
                  variant='outlined'
                  color='primary'
                >
                  {'Get Started'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(LandingPage))
