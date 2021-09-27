import { Button } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSnackbar } from 'notistack'

const ToastDemo = () => {
  const intl = useIntl()
  const { enqueueSnackbar } = useSnackbar()

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'toast_demo',
        defaultMessage: 'Toast demo',
      })}
    >
      <br />
      <Button
        onClick={() => {
          enqueueSnackbar('Test', {
            variant: 'info',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          })
        }}
      >
        OPEN Toast
      </Button>
    </Page>
  )
}
export default ToastDemo
