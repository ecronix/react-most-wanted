import AccountBox from '@material-ui/icons/AccountBox'
import AppBar from '@material-ui/core/AppBar'
import Checkbox from '@material-ui/core/Checkbox'
import Delete from '@material-ui/icons/Delete'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Lock from '@material-ui/icons/Lock'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect } from 'react'
import RoleForm from 'rmw-shell/lib/components/Forms/Role'
import Save from '@material-ui/icons/Save'
import SearchField from 'material-ui-shell/lib/components/SearchField'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import VirtualList from 'material-ui-shell/lib/containers/VirtualList'
import Zoom from '@material-ui/core/Zoom'
import { Form } from 'react-final-form'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import { useIntl } from 'react-intl'
import { useParams, useHistory } from 'react-router-dom'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'

const Row = ({ index, style, data }) => {
  const { name } = data

  return (
    <div key={`${name}_${index}`} style={style}>
      <ListItem
        button
        alignItems="flex-start"
        onClick={() => {
          console.log('click')
        }}
      >
        <ListItemIcon>
          <Checkbox edge="start" checked={false} tabIndex={-1} disableRipple />
        </ListItemIcon>
        <ListItemText primary={name} secondary={name} />
      </ListItem>
      <Divider />
    </div>
  )
}

export default function () {
  const history = useHistory()
  const intl = useIntl()
  const { appConfig } = useConfig()
  const { auth: authConfig } = appConfig || {}
  const { grants = [] } = authConfig || {}
  const { uid, tab = 'main' } = useParams()
  const { openDialog } = useQuestions()
  const { watchPath, clearPath, getPath, firebaseApp } = usePaths()

  const path = `roles/${uid}`
  const data = getPath(path)

  useEffect(() => {
    watchPath(path)
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

  const { getList, getFilter, setSearch } = useFilter()
  const { search = {} } = getFilter('grants')
  const { value: searchvalue = '' } = search

  const list = getList(
    'grants',
    grants.map((g) => {
      return { name: g }
    }),
    [{ name: 'name' }]
  )

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
            <Zoom key="form" in={tab === 'grants'}>
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
    >
      <div
        style={{
          height: '100%',
          overflow: 'hidden',
        }}
      >
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
            <Tab value="grants" icon={<Lock className="material-icons" />} />
          </Tabs>
        </AppBar>

        {tab === 'main' && (
          <div style={{ padding: 18 }}>
            <Form
              keepDirtyOnReinitialize
              onSubmit={async (values) => {
                await firebaseApp.database().ref(`roles/${uid}`).update(values)
                history.push('/roles')
              }}
              initialValues={data}
              render={RoleForm}
            />
          </div>
        )}
        {tab === 'grants' && (
          <VirtualList
            list={list}
            name="grants"
            listProps={{ itemSize: 72 }}
            Row={Row}
          />
        )}
      </div>
    </Page>
  )
}
