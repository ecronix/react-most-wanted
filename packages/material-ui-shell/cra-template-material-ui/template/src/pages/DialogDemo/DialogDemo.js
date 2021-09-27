import { Button } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import { useIntl } from 'react-intl'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'

const DialogDemo = () => {
  const intl = useIntl()
  const { openDialog, setProcessing } = useQuestions()

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'dialog_demo',
        defaultMessage: 'Dialog demo',
      })}
    >
      <br />
      <Button
        onClick={() => {
          openDialog({
            title: intl.formatMessage({
              id: 'dialog_title',
              defaultMessage: 'Dialog title',
            }),
            message: intl.formatMessage({
              id: 'dialog_message',
              defaultMessage:
                'Dialog message. You can put as much text as you want here. Ask a question or show a warning before deleting something. You can also set the action text to something like "YES, Delete" and run that action by passing a "handleAction" prop. This receives a "handleClose" callback with which you can close the dialog when your action is done.',
            }),
            action: intl.formatMessage({
              id: 'dialog_action',
              defaultMessage: 'YES, Delete',
            }),
            handleAction: (handleClose) => {
              setProcessing(true)
              console.log('Doing some async stuff')

              setTimeout(() => {
                console.log('finished async stuff')
                //Do some stuff and then
                handleClose()
              }, 3000)
            },
          })
        }}
      >
        OPEN DIALOG
      </Button>
    </Page>
  )
}
export default DialogDemo
