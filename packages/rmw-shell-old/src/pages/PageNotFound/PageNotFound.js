import Activity from '../../containers/Activity'
import Button from '@material-ui/core/Button'
import Home from '@material-ui/icons/Home'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { injectIntl } from 'react-intl'
import { withAppConfigs } from '../../contexts/AppConfigProvider'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
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
    height: '100%',
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    margin: 0,
  },
  button: {
    marginTop: 20,
  },
})

const PageNotFound = ({ intl, appConfig, classes }) => {
  const AppIcon = appConfig.appIcon

  return (
    <Activity>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <AppIcon className={classes.icon} />
          <Typography variant="h4">
            {intl.formatMessage({ id: 'warning_404_message' })}
          </Typography>
          <Typography variant="subtitle1">
            {intl.formatMessage({ id: 'warning_404_description' })}
          </Typography>
          <Button
            variant="fab"
            color="secondary"
            aria-label="home"
            href="/"
            className={classes.button}
          >
            <Home />
          </Button>
        </div>
      </Paper>
    </Activity>
  )
}

export default injectIntl(
  withStyles(styles, { withTheme: true })(withAppConfigs(PageNotFound))
)
