import React, { Fragment, useEffect } from 'react'
import { useConfig } from '@ecronix/base-shell'
import { useSnackbar } from 'notistack'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'

const runUpdate = () => {
  window.update && window.update()
}

export function UpdateContainer({ children }) {
  const intl = useIntl()
  const { appConfig } = useConfig()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { update } = appConfig || {}
  const { checkInterval = 3000, repeatInterval = 300000 } = update || {}

  const action = (key) => (
    <Fragment>
      <Button
        variant="contained"
        style={{ margin: 8 }}
        onClick={() => {
          closeSnackbar(key)
          runUpdate()
        }}
      >
        {intl.formatMessage({ id: 'update', defaultMessage: 'Update' })}
      </Button>
      <Button
        color="secondary"
        onClick={() => {
          setTimeout(checkUpdate, repeatInterval)
          closeSnackbar(key)
        }}
      >
        {intl.formatMessage({
          id: 'later',
          defaultMessage: 'Later',
        })}
      </Button>
    </Fragment>
  )

  const showUpdateToast = () => {
    enqueueSnackbar(
      intl.formatMessage({
        id: 'update_available',
        defaultMessage: 'Update available!',
      }),
      {
        persist: true,
        action,
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      }
    )
  }

  const checkUpdate = () => {
    if (window.update) {
      showUpdateToast()
    } else {
      setTimeout(checkUpdate, checkInterval)
    }
  }

  useEffect(checkUpdate, [checkUpdate])

  return <Fragment>{children}</Fragment>
}
