import AccountBox from '@material-ui/icons/AccountBox'
import AppBar from '@material-ui/core/AppBar'
import Delete from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Lock from '@material-ui/icons/Lock'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect } from 'react'
import RoleForm from 'rmw-shell/lib/components/Forms/Role'
import Save from '@material-ui/icons/Save'
import SearchField from 'material-ui-shell/lib/components/SearchField'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Zoom from '@material-ui/core/Zoom'
import { Form } from 'react-final-form'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import { useIntl } from 'react-intl'
import { useParams, useHistory } from 'react-router-dom'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import GrantsList from 'rmw-shell/lib/containers/GrantsList'

export default function () {
  const history = useHistory()
  const intl = useIntl()
  const { uid, tab = 'main' } = useParams()
  const { openDialog } = useQuestions()
  const { watchPath, clearPath, getPath, firebaseApp } = usePaths()
  const { getFilter, setSearch } = useFilter()
  const { search = {} } = getFilter('grants')
  const { value: searchvalue = '' } = search

  const path = `roles/${uid}`
  const grantsPath = `role_grants/${uid}`
  const data = getPath(path)

  useEffect(() => {
    if (uid) {
      watchPath(path)
    }
    return () => clearPath(path)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  const openDeleteDialog = () => {
    openDialog({
      title: intl.formatMessage({
        id: 'delete_role_dialog_title',
        defaultMessage: 'Delete Role?',
      }),
      message: intl.formatMessage({
        id: 'delete_role_dialog_message',
        defaultMessage: 'Role will be deleted permanently?',
      }),
      action: intl.formatMessage({
        id: 'delete_role_dialog_action',
        defaultMessage: 'DELETE ROLE',
      }),
      handleAction: async (handleClose) => {
        await firebaseApp.database().ref(`roles/${uid}`).set(null)
        handleClose()
        history.replace('/roles')
      },
    })
  }

  return (
    <Page
      onBackClick={() => {
        history.goBack()
      }}
      pageTitle={'Role'}
      appBarContent={
        <React.Fragment>
          <Zoom key="form" in={tab === 'main'}>
            <div>
              <IconButton
                color="inherit"
                onClick={() => {
                  document
                    .getElementById('role')
                    .dispatchEvent(new Event('submit', { cancelable: true }))
                }}
              >
                <Save />
              </IconButton>

              <IconButton
                disabled={!uid}
                color="inherit"
                onClick={() => {
                  openDeleteDialog()
                }}
              >
                <Delete />
              </IconButton>
            </div>
          </Zoom>
          {tab === 'grants' && (
            <Zoom key="grants" in={tab === 'grants'}>
              <div>
                <SearchField
                  initialValue={searchvalue}
                  onChange={(v) => {
                    setSearch('grants', v)
                  }}
                />
              </div>
            </Zoom>
          )}
        </React.Fragment>
      }
      tabs={
        <AppBar position="static">
          <Tabs
            value={tab}
            onChange={(e, t) => {
              history.replace(`/roles/${uid}/${t}`)
            }}
            centered
          >
            <Tab
              value="main"
              icon={<AccountBox className="material-icons" />}
            />
            {uid && (
              <Tab value="grants" icon={<Lock className="material-icons" />} />
            )}
          </Tabs>
        </AppBar>
      }
    >
      <div
        style={{
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {tab === 'main' && (
          <div style={{ padding: 18 }}>
            <Form
              keepDirtyOnReinitialize
              onSubmit={async (values) => {
                if (uid) {
                  await firebaseApp
                    .database()
                    .ref(`roles/${uid}`)
                    .update(values)

                  history.push('/roles')
                } else {
                  const newRoleSnap = await firebaseApp
                    .database()
                    .ref(`roles`)
                    .push(values)
                  history.replace(`/roles/${newRoleSnap.key}`)
                }
              }}
              initialValues={data}
              render={RoleForm}
            />
          </div>
        )}
        {tab === 'grants' && <GrantsList grantsPath={grantsPath} />}
      </div>
    </Page>
  )
}
