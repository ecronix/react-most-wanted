import React, { Fragment, useEffect } from 'react'
import { useConfig } from '@ecronix/base-shell'
import { SnackbarKey, useSnackbar } from 'notistack'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'

const runUpdate = () => {
  window.update && window.update()
}

/**
 * @description React component that manages the update process.
 * The `UpdateContainer` component checks for updates periodically and shows a notification
 * if an update is available. It provides buttons to either update immediately or defer the update.
 * The update process is handled by a global `window.update` function, if available.
 *
 * @param {UpdateContainerProps} props - The properties passed to the `UpdateContainer` component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the container.
 *
 * @returns The rendered update container which wraps its children.
 *
 * @example
 * <UpdateContainer>
 *   <MyComponent />
 * </UpdateContainer>
 */
export function UpdateContainer({ children }: { children: React.ReactNode }) {
  const intl = useIntl()
  const { appConfig } = useConfig()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { update } = appConfig || {}
  const { checkInterval = 3000, repeatInterval = 300000 } = update || {}

  const action = (key: SnackbarKey) => (
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
