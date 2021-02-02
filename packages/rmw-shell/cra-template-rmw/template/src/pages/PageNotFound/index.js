import React from 'react'
import { injectIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Button from '@material-ui/core/Button'
import Home from '@material-ui/icons/Home'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import logo from './404.svg'

const styles = (theme) => ({
  icon: {
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `100%`,
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    margin: 0,
    height: `calc(100vh - 64px)`,
  },
  button: {
    marginTop: 20,
  },
})

const PageNotFound = ({ intl, classes }) => {
  return (
    <Page pageTitle={intl.formatMessage({ id: 'page_not_found' })}>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <img style={{ maxHeight: '50%' }} src={logo} alt="logo" />

          <Button
            color="secondary"
            aria-label="home"
            href="/"
            className={classes.button}
          >
            <Home />
          </Button>
        </div>
      </Paper>
    </Page>
  )
}

export default injectIntl(withStyles(styles, { withTheme: true })(PageNotFound))
