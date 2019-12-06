import AudioPlayer from '../../containers/AudioPlayer'
import Chip from '@material-ui/core/Chip'
import Done from '@material-ui/icons/Done'
import DoneAll from '@material-ui/icons/DoneAll'
import IconButton from '@material-ui/core/IconButton'
import ImageViewer from '../../components/ImageViewer'
import Place from '@material-ui/icons/Place'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import moment from 'moment'
import { Typography } from '@material-ui/core'
import { compose, bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import { setSimpleValue } from '../../store/simpleValues/actions'
import { useSelector, useDispatch } from 'react-redux'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

const getActions = dispatch => bindActionCreators({ setSimpleValue }, dispatch)

const Message = props => {
  const auth = useSelector(state => state.auth)
  const { setSimpleValue } = getActions(useDispatch())

  useEffect(() => {
    const { row, firebaseApp, path } = props

    const values = row.val

    if (auth.uid !== values.authorUid && !values.isRead) {
      firebaseApp
        .database()
        .ref(`${path}/${row.key}`)
        .update({
          isRead: true
        })
      firebaseApp
        .database()
        .ref(`user_chats/${auth.uid}/${values.authorUid}/unread`)
        .remove()
    }
  }, [])

  const {
    dataChanged,
    authorChanged,
    theme,
    values,
    uid,
    backgroundColor,
    color,
    intl,
    history,
    type,
    isGranted,
    scrollToBottom
  } = props

  const days = moment(values.created).diff(moment(), 'days')

  return (
    <div style={{ width: '100%' }}>
      <div>
        {dataChanged && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <div>
              <Chip
                label={`${values.created ? intl.formatRelativeTime(days, 'day', { numeric: 'auto' }) : undefined}`}
              />
            </div>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: values.authorUid === auth.uid ? 'flex-end' : 'flex-start'
          }}
        >
          <div
            onDoubleClick={() => {
              if (isGranted('administrator')) {
                setSimpleValue('delete_message', uid)
              }
            }}
            style={{
              ...theme.chip,
              margin: 1,
              marginTop: authorChanged === true ? 8 : 1,
              boxShadow: theme.shadows[3],
              borderRadius:
                authorChanged === true
                  ? values.authorUid === auth.uid
                    ? '8px 0 8px 8px'
                    : '0 8px 8px 8px'
                  : '8px 8px 8px 8px',
              backgroundColor: backgroundColor,
              color: color,
              fontFamily: theme.typography.fontFamily
            }}
          >
            <div
              style={{
                display: type === 'image' ? undefined : 'flex',
                margin: type === 'image' ? 0 : 5,
                padding: type === 'image' ? 5 : 0,
                flexOrientation: 'row',
                justifyContent: 'space-between',
                width: 'fit-content'
              }}
            >
              <Typography
                variant="body1"
                color="inherit"
                style={{
                  maxWidth: 500,
                  width: 'fit-content',
                  fontSize: 16,
                  paddingLeft: 5,
                  margin: 'auto',
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'break-word',
                  fontFamily: theme.typography.fontFamily
                }}
              >
                {values.authorUid !== auth.uid && (
                  <div
                    onClick={() => {
                      history.push(`/chats/edit/${values.authorUid}`)
                    }}
                    style={{ color: theme.palette.secondary.main, fontSize: 12, marginLeft: 0, cursor: 'pointer' }}
                  >
                    {values.authorName}
                  </div>
                )}
                {type === 'location' && (
                  <div style={{ padding: 7 }}>
                    <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
                      <IconButton target="_blank" href={values.location}>
                        <Place color="secondary" />
                      </IconButton>
                      {intl.formatMessage({ id: 'my_location' })}
                    </div>
                  </div>
                )}
                {type === 'audio' && (
                  <div style={{ padding: 7 }}>
                    <AudioPlayer src={values.audio} authorPhotoUrl={values.authorPhotoUrl} />
                    {values.message}
                  </div>
                )}
                {type === 'link' && (
                  <a target="_blank" rel="noopener noreferrer" href={values.link}>
                    {values.link}
                  </a>
                )}
                {type === 'image' && values.image !== null && (
                  <ImageViewer
                    style={{ height: 'auto', maxWidth: 400, paddingTop: 0, cursor: 'pointer', borderRadius: 5 }}
                    imageStyle={{ maxWidth: '100%', padding: 0, position: 'relative', borderRadius: 5 }}
                    onLoad={scrollToBottom}
                    src={values.image}
                    color={backgroundColor}
                  />
                )}
                {type === 'text' && <Typography variant="body1">{values.message}</Typography>}
              </Typography>
              <div
                style={{
                  fontSize: 9,
                  color: values.authorUid !== auth.uid ? theme.palette.text.secondary : theme.palette.text.secondary,
                  marginLeft: 8,
                  alignSelf: 'flex-end'
                }}
              >
                {`${values.created ? intl.formatTime(new Date(values.created)) : undefined}`}
                {values.isSend && values.isReceived && (
                  <DoneAll
                    style={{
                      fontSize: 11,
                      padding: 0,
                      paddingLeft: 2,
                      bottom: -2,
                      color: values.isRead ? theme.palette.secondary.main : theme.palette.text.primary
                    }}
                  />
                )}
                {values.isSend && !values.isReceived && (
                  <Done
                    style={{
                      fontSize: 11,
                      padding: 0,
                      paddingLeft: 2,
                      bottom: -2,
                      color: values.isRead ? theme.palette.secondary.main : theme.palette.text.primary
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Message.propTypes = {
  theme: PropTypes.object.isRequired
}

export default compose(
  injectIntl,
  withTheme,
  withRouter,
  withFirebase
)(Message)
