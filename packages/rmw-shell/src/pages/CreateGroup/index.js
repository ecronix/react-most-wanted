import React, { useEffect, useState } from 'react'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import ListPage from 'material-ui-shell/lib/containers/Page/ListPage'
import { useIntl } from 'react-intl'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import Mail from '@material-ui/icons/Mail'
import Star from '@material-ui/icons/Star'
import GroupAdd from '@material-ui/icons/GroupAdd'
import ChatIcon from '@material-ui/icons/Chat'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import {
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  TwitterIcon,
} from 'rmw-shell/lib/components/Icons'
import Badge from '@material-ui/core/Badge'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'base-shell/lib/providers/Auth'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import { AppBar, Paper, StylesProvider } from '@material-ui/core'
import Page from 'material-ui-shell/lib/containers/Page'

const getProviderIcon = (id) => {
  const iconProps = {
    color: 'primary',
    style: {
      height: 20,
      width: 20,
    },
  }

  if (id === 'google.com') {
    return <GoogleIcon key={id} {...iconProps} />
  }
  if (id === 'facebook.com') {
    return <FacebookIcon key={id} {...iconProps} />
  }
  if (id === 'github.com') {
    return <GitHubIcon key={id} {...iconProps} />
  }
  if (id === 'twitter.com') {
    return <TwitterIcon key={id} {...iconProps} />
  }

  return <Mail key={id} {...iconProps} />
}

export default function () {
  const { firebaseApp, watchList, getList, isListLoading } = useLists()
  const { auth } = useAuth()
  const intl = useIntl()
  const history = useHistory()
  const [selected, setSelected] = useState({})
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    watchList('users')
    watchList('admins')
  }, [watchList])

  const admins = getList('admins')

  const list = getList('users')
    .map(({ key, val }) => {
      return { key, ...val }
    })
    .filter((u) => u.key !== auth.uid)

  const handleRowClick = (user) => {
    const key = user.key
    const userValues = user

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
      let members = { [auth.uid]: true }

      Object.entries(selected).map((e) => {
        const [key, val] = e

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

  const Row = ({ data, index, style }) => {
    const {
      displayName = '',
      key,
      photoURL,
      providerData = [],
      icon,
      secondaryText,
    } = data

    let isAdmin = false

    admins.map((a) => {
      if (a.key === key) {
        isAdmin = true
      }
    })

    return (
      <div key={key} style={style}>
        <ListItem
          button
          alignItems="flex-start"
          style={{ height: 82 }}
          onClick={() => handleRowClick(data)}
        >
          <ListItemAvatar>
            <Badge
              invisible={!isAdmin}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              badgeContent={
                <Star
                  style={{
                    width: 15,
                    padding: 0,
                  }}
                />
              }
              color="secondary"
            >
              <Avatar src={photoURL} style={{ height: 45, width: 45 }}>
                {icon}
              </Avatar>
            </Badge>
          </ListItemAvatar>

          <ListItemText
            primary={`${displayName}`}
            secondary={
              providerData.length > 0 ? (
                <React.Fragment>
                  {providerData.map((p) => {
                    return getProviderIcon(p.providerId)
                  })}
                </React.Fragment>
              ) : (
                secondaryText
              )
            }
          />
          <ListItemSecondaryAction>
            <Checkbox edge="end" onChange={() => {}} checked={selected[key]} />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" />
      </div>
    )
  }

  return (
    <React.Fragment>
      {step === 0 && (
        <ListPage
          name="users"
          list={list}
          Row={Row}
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
                valeu={name}
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
