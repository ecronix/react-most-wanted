import Button from '@material-ui/core/Button'
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import Snackbar from '@material-ui/core/Snackbar'
import { withRouter } from 'react-router-dom'

const isAnalyticsEnabled = () => {
  let enabled = localStorage.getItem('isAnalyticsEnabled')
  if (enabled === null) {
    enabled = null
  } else {
    enabled = JSON.parse(enabled)
  }

  return enabled
}

const setAnalyticsEnabled = (trackingID, enabled) => {
  window[`ga-disable-${trackingID}`] = !enabled
  localStorage.setItem('isAnalyticsEnabled', enabled)
}

class Analytics extends Component {
  state = {
    isEnabled: false,
    showDialog: false,
  }

  componentDidMount() {
    const { isOptOut = false } = this.props
    const isEnabled = isAnalyticsEnabled()

    //If analytics is enabled we run it
    if (isEnabled === true) {
      this.runAnalytics()
    }

    //We run analytics if we use opt-out and the analytics enabled is not set yet
    if (isEnabled === null && isOptOut) {
      this.runAnalytics()
    }

    //We show the analytics dialog if the analytics enabled flag is not set
    if (isEnabled === null) {
      this.setState({ showDialog: true })
    }
  }

  runAnalytics = () => {
    const { history, trackingID } = this.props
    ReactGA.initialize(trackingID, { anonymize_ip: true })
    ReactGA.pageview(window.location.pathname + window.location.search)

    history.listen(location => {
      ReactGA.set({ page: location.pathname }) // Update the user's current page
      ReactGA.pageview(location.pathname) // Record a pageview for the given page
    })
  }

  handleClose = () => {
    this.setState({ showDialog: false })
  }

  handleAccept = () => {
    const { trackingID } = this.props
    setAnalyticsEnabled(trackingID, true)
    this.runAnalytics()
    this.setState({ showDialog: false, isEnabled: true })
  }

  handlePolicy = () => {
    const { history, policyPath } = this.props
    history.push(policyPath)
  }

  handleDecline = () => {
    const { trackingID } = this.props
    setAnalyticsEnabled(trackingID, false)
    this.setState({ showDialog: false, isEnabled: false })
  }

  render() {
    const { showDialog } = this.state
    const {
      renderDialog,
      handlePolicyClick,
      acceptLabel = 'Accept',
      declineLabel = 'Decline',
      policyLabel = 'Privacypolicy',
      dialogMessage = 'This site uses cookies and website tracking technologies from third parties to offer and continuously improve their services. I consent to this and can revoke or change my consent at any time with future effect',
    } = this.props

    const Dialog = renderDialog

    if (showDialog && renderDialog) {
      return (
        <Dialog
          showDialog={showDialog}
          handleAccept={this.handleAccept}
          handleClose={this.handleClose}
          handleDecline={this.handleDecline}
          handlePolicyClick={handlePolicyClick}
          dialogMessage={dialogMessage}
          policyLabel={policyLabel}
          declineLabel={declineLabel}
          acceptLabel={acceptLabel}
          {...this.props}
        />
      )
    }

    if (showDialog) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={showDialog}
          onClose={this.handleClose}
          message={dialogMessage}
          action={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {handlePolicyClick && (
                <Button
                  color="secondary"
                  size="small"
                  onClick={handlePolicyClick}
                >
                  {policyLabel}
                </Button>
              )}
              <Button color="primary" size="small" onClick={this.handleDecline}>
                {declineLabel}
              </Button>
              <Button color="inherit" size="large" onClick={this.handleAccept}>
                {acceptLabel}
              </Button>
            </div>
          }
        />
      )
    } else {
      return null
    }
  }
}

export { isAnalyticsEnabled, setAnalyticsEnabled }
export default withRouter(Analytics)
