import React from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import { useParams, useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import AccountBox from '@mui/icons-material/AccountBox'
import Save from '@mui/icons-material/Save'
import Delete from '@mui/icons-material/Delete'
import Lock from '@mui/icons-material/Lock'
import GrantsList from 'rmw-shell/lib/containers/GrantsList'
import Zoom from '@mui/material/Zoom'
import SearchField from 'material-ui-shell/lib/components/SearchField'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import FirebaseFrom from 'rmw-shell/lib/containers/FirebaseForm'
import Form from 'rmw-shell/lib/components/Forms/Role'
import IconButton from '@mui/material/IconButton'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { getDatabase, ref, set } from 'firebase/database'

const path = 'roles'
const singular = 'role'

export default function () {
  const intl = useIntl()
  const history = useHistory()
  const { uid, tab = 'main' } = useParams()
  const { getFilter, setSearch } = useFilter()
  const { search = {} } = getFilter(tab)
  const { openDialog } = useQuestions()
  const { auth } = useAuth()
  const { isGranted = () => false } = auth
  const { value: searchValue = '' } = search
  let submit

  const setSubmit = (s) => {
    submit = s
  }

  const grantsPath = `role_grants/${uid}`

  const openDeleteDialog = () => {
    openDialog({
      handleAction: async (handleClose) => {
        await set(ref(getDatabase(), `${path}/${uid}`), null)
        handleClose()
        history.push(`/${path}`)
      },
      title: intl.formatMessage({
        id: `delete_${singular}_dialog_title`,
        defaultMessage: 'Delete Role?',
      }),
      message: intl.formatMessage({
        id: `delete_${singular}_dialog_message`,
        defaultMessage: 'Role will be deleted permanently?',
      }),
      action: intl.formatMessage({
        id: `delete_${singular}_dialog_action`,
        defaultMessage: 'DELETE ROLE',
      }),
    })
  }

  return (
    <Page
      onBackClick={() => {
        history.goBack()
      }}
      pageTitle={intl.formatMessage({
        id: 'role',
        defaultMessage: 'Role',
      })}
      appBarContent={
        <div>
          {tab === 'main' && (
            <Zoom key={tab} in={tab === 'main'}>
              <div>
                <IconButton
                  disabled={
                    (!uid && !isGranted(auth, `create_${singular}`)) ||
                    !isGranted(auth, `edit_${singular}`)
                  }
                  color="inherit"
                  onClick={(e) => submit(e)}
                >
                  <Save />
                </IconButton>
                <IconButton
                  disabled={!uid || !isGranted(auth, `delete_${singular}`)}
                  color="inherit"
                  onClick={() => {
                    openDeleteDialog()
                  }}
                >
                  <Delete />
                </IconButton>
              </div>
            </Zoom>
          )}
          {tab !== 'main' && (
            <Zoom key={tab} in={tab !== 'main'}>
              <div>
                <SearchField
                  initialValue={searchValue}
                  onChange={(v) => {
                    setSearch(tab, v)
                  }}
                />
              </div>
            </Zoom>
          )}
        </div>
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

            <Tab value="grants" icon={<Lock className="material-icons" />} />
          </Tabs>
        </AppBar>
      }
    >
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <div style={{ height: '100%' }}>
          {tab === 'main' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <FirebaseFrom
                path={`${path}`}
                uid={uid}
                setSubmit={setSubmit}
                handleSubmit={(values, newUid) => {
                  if (newUid) {
                    history.replace(`/${path}/${newUid}`)
                  } else {
                    history.push(`/${path}`)
                  }
                }}
                Form={Form}
              />
            </div>
          )}

          {tab === 'grants' && <GrantsList grantsPath={grantsPath} />}
        </div>
      </div>
    </Page>
  )
}
