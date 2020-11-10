import React, { useEffect, useState } from 'react'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import ListPage from 'material-ui-shell/lib/containers/Page/ListPage'
import { useIntl } from 'react-intl'
import Fab from '@material-ui/core/Fab'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth } from 'base-shell/lib/providers/Auth'
import TextField from '@material-ui/core/TextField'
import { Paper } from '@material-ui/core'
import Page from 'material-ui-shell/lib/containers/Page'
import UserRow from 'rmw-shell/lib/components/UserRow'

export default function () {
  const { firebaseApp, watchList, getList, isListLoading } = useLists()
  const { watchPath, getPath, clearPath } = usePaths()
  const { auth } = useAuth()
  const intl = useIntl()
  const history = useHistory()
  const { uid = false } = useParams()
  const [selected, setSelected] = useState({})
  const [step, setStep] = useState(uid !== false ? 1 : 0)

  const { name: currentName = '' } = getPath(`group_chats/${uid}`, {}) || {}
  const [name, setName] = useState('')

  useEffect(() => {
    watchList('users')
    watchList('admins')

    if (uid) {
      watchPath(`group_chats/${uid}`)
    }

    return () => {
      if (uid) {
        clearPath(`group_chats/${uid}`)
      }
    }
  }, [watchList, uid, watchPath, clearPath])

  useEffect(() => {
    setName(currentName)
  }, [currentName])

  const admins = getList('admins')

  const list = getList('users')
    .map(({ key, val }) => {
      return { key, ...val }
    })
    .filter((u) => u.key !== auth.uid)

  const handleRowClick = (user) => {
    const key = user.key

    if (!selected[key]) {
      setSelected({ ...selected, [key]: user })
    } else {
      const { [key]: removed, ...rest } = selected
      setSelected(rest)
    }
  }

  const handleNextClick = async () => {
    if (step === 0) {
      setStep(1)
    } else {
      if (uid) {
        await firebaseApp.database().ref(`group_chats/${uid}`).update({
          name,
        })
        history.push('/chats')
      } else {
        let members = { [auth.uid]: true }

        Object.entries(selected).map((e) => {
          const [key] = e

          members[key] = true
          return e
        })
        const snap = await firebaseApp.database().ref(`group_chats`).push()

        await firebaseApp
          .database()
          .ref(`group_chats/${snap.key}/admins/${auth.uid}`)
          .set(true)

        await firebaseApp.database().ref(`group_chats/${snap.key}`).update({
          members,
          name,
        })

        history.push('/chats')
      }
    }
  }

  return (
    <React.Fragment>
      {step === 0 && (
        <ListPage
          name="users"
          list={list}
          Row={(p) => {
            return (
              <UserRow
                {...p}
                admins={admins}
                handleRowClick={handleRowClick}
                hasCheckbox
                isChecked={selected[p.data.key]}
              />
            )
          }}
          listProps={{ itemSize: 82 }}
          getPageProps={(list) => {
            return {
              pageTitle: intl.formatMessage({
                id: 'select_users',
                defaultMessage: 'Select Users',
              }),
              isLoading: isListLoading('users'),
              onBackClick: () => {
                history.goBack()
              },
            }
          }}
        />
      )}
      {step === 1 && (
        <Page
          pageTitle={intl.formatMessage({
            id: 'set_name',
            defaultMessage: 'Set name',
          })}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Paper style={{ padding: 18 }}>
              <TextField
                name="name"
                placeholder={intl.formatMessage({
                  id: 'group_name',
                  defaultMessage: 'Group name',
                })}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Paper>
          </div>
        </Page>
      )}
      <div style={{ position: 'absolute', bottom: 15, right: 35 }}>
        <Fab
          disabled={step === 1 && name === ''}
          color="secondary"
          onClick={handleNextClick}
        >
          <ArrowForward />
        </Fab>
      </div>
    </React.Fragment>
  )
}
