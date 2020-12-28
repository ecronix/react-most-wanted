import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { injectIntl } from 'react-intl'
import { GitHubIcon } from 'rmw-shell/lib/components/Icons'
import Activity from 'rmw-shell/lib/containers/Activity'
import Scrollbar from 'rmw-shell/lib/components/Scrollbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    height: '100%'
  },
  hero: {
    height: '100%',
    minHeight: '80vh',
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
  h5: {
    paddingLeft: theme.spacing(1) * 4,
    paddingRight: theme.spacing(1) * 4,
    marginTop: theme.spacing(1),
    maxWidth: 600,
    textAlign: 'center',
    [theme.breakpoints.only('xs')]: {
      fontSize: 18
    }
  },
  content: {
    height: '100%',
    paddingTop: theme.spacing(1) * 8,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1) * 12
    }
  },
  button: {
    marginTop: theme.spacing(1) * 3
  },
  logo: {
    color: 'red',
    margin: `${theme.spacing(1) * 3}px 0 ${theme.spacing(1) * 4}px`,
    width: '100%',
    height: '40vw',
    maxHeight: 250
  },
  steps: {
    maxWidth: theme.spacing(1) * 130,
    margin: 'auto'
  },
  step: {
    padding: `${theme.spacing(1) * 3}px ${theme.spacing(1) * 2}px`
  },
  stepIcon: {
    marginBottom: theme.spacing(1)
  },
  markdownElement: {}
})

class LandingPage extends Component {
  render() {
    const { intl, classes, history } = this.props

    return (
      <Activity
        appBarContent={
          <IconButton
            color="inherit"
            href="https://github.com/TarikHuber/react-most-wanted"
            target="_blank"
            rel="noopener"
          >
            <GitHubIcon />
          </IconButton>
        }
      >
        <Scrollbar>
          <div className={classes.root}>
            <Helmet>
              <title>REACT MOST WANTED</title>
            </Helmet>
            <div className={classes.hero}>
              <div className={classes.content}>
                <img src="/rmw.svg" alt="Material-UI Logo" className={classes.logo} />
                <div className={classes.text}>
                  <Typography
                    variant="h2"
                    align="center"
                    component="h1"
                    color="inherit"
                    gutterBottom
                    className={classes.title}
                  >
                    {'REACT MOST WANTED'}
                  </Typography>
                  <Typography variant="h5" component="h2" color="inherit" gutterBottom className={classes.h5}>
                    {'React Starter-Kit with all Most Wanted features.'}
                  </Typography>
                  <Button
                    onClick={() => {
                      history.push('/signin')
                    }}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                  >
                    {'Get Started'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Scrollbar>
      </Activity>
    )
  }
}

LandingPage.propTypes = {
  
}

export default withRouter(injectIntl(withStyles(styles, { withTheme: true })(LandingPage)))
