import React, { useEffect, useState, useCallback } from 'react'
import Page from 'material-ui-shell/lib/containers/Page'
import { useHistory, useParams } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import Save from '@material-ui/icons/Save'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Delete from '@material-ui/icons/Delete'
import { useIntl } from 'react-intl'
import moment from 'moment'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import SimpleEditor from 'rmw-shell/lib/containers/PostEditor'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { KeyboardDateTimePicker } from '@material-ui/pickers'

const Post = () => {
  const history = useHistory()
  const { uid } = useParams()
  const intl = useIntl()
  const { auth } = useAuth()
  const [changed, setChanged] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const { firebaseApp } = useFirebase()
  const [isPublishing, setPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [post, setPost] = useState(false)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const { openDialog } = useQuestions()

  const loadPost = useCallback(async () => {
    const postSnap = await firebaseApp
      .database()
      .ref(`user_posts/${auth.uid}/${uid}`)
      .once('value')

    if (postSnap.exists()) {
      const s = moment(postSnap.child('start').val())
      const e = moment(postSnap.child('end').val())
      setPost({ ...postSnap.child('post').val() })
      setIsPublished(!!postSnap.child('publishedOn').val())
      setInitialized(true)
      setStart(s.isValid() ? s : null)
      setEnd(e.isValid() ? e : null)
    }
  }, [auth.uid, firebaseApp, uid])

  useEffect(() => {
    loadPost()
  }, [loadPost])

  const handlePublish = async () => {
    setPublishing(true)

    const postSnap = await firebaseApp
      .database()
      .ref(`user_posts/${auth.uid}/${uid}`)
      .once('value')

    const publishedOn = moment(undefined).valueOf()
    const order = 0 - publishedOn

    if (postSnap.exists()) {
      await firebaseApp
        .database()
        .ref(`posts/${uid}`)
        .update({ ...postSnap.val(), publishedOn, order })
      await firebaseApp
        .database()
        .ref(`user_posts/${auth.uid}/${uid}`)
        .update({ publishedOn, order })
    }

    setPublishing(false)
    history.goBack()
  }

  const handleImageUpload = (file) => {
    return new Promise((resolve) => {
      try {
        let img = new Image()
        img.src = window.URL.createObjectURL(file)
        img.onload = () => {
          const index = file.name.lastIndexOf('.')
          const fileExtension = file.name.slice(index)
          const snap = firebaseApp.database().ref(`posts/${auth.uid}`).push()
          const path = `user_posts/${auth.uid}/${uid}/${snap.key}${fileExtension}`
          let uploadTask = firebaseApp.storage().ref(path).put(file)

          uploadTask.on('state_changed', null, null, async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
            const contentType = uploadTask.snapshot.metadata.contentType || null

            resolve({
              downloadURL,
              contentType,
              width: img.width,
              height: img.height,
              path,
            })
          })
        }
      } catch (error) {
        resolve(error)
      }
    })
  }

  const onStateChanged = (state) => {
    setChanged(true)
  }

  const changeStart = (s) => {
    setStart(s)
    firebaseApp.database().ref(`user_posts/${auth.uid}/${uid}`).update({
      start: s.format(),
    })
  }
  const changeEnd = (e) => {
    setEnd(e)
    firebaseApp.database().ref(`user_posts/${auth.uid}/${uid}`).update({
      end: e.format(),
    })
  }

  const onDefferedStateChange = async (post) => {
    await firebaseApp.database().ref(`user_posts/${auth.uid}/${uid}`).update({
      post,
    })

    if (isPublished) {
      await firebaseApp.database().ref(`posts/${uid}`).update({
        post,
      })
    }

    setChanged(false)
  }

  const handleDelete = async (handleClose) => {
    if (uid) {
      await firebaseApp.database().ref().child(`posts/${uid}`).remove()

      await firebaseApp
        .database()
        .ref()
        .child(`user_posts/${auth.uid}/${uid}`)
        .remove()

      handleClose()
      history.goBack()
    }
  }

  const openDeleteDialog = () => {
    openDialog({
      handleAction: handleDelete,
      title: intl.formatMessage({
        id: `delete_post_dialog_title`,
        defaultMessage: 'Delete Post?',
      }),
      message: intl.formatMessage({
        id: `delete_post_dialog_message`,
        defaultMessage: 'Post will be deleted permanently?',
      }),
      action: intl.formatMessage({
        id: `delete_post_dialog_action`,
        defaultMessage: 'DELETE POST',
      }),
    })
  }

  return (
    <Page
      onBackClick={() => {
        history.goBack()
      }}
      appBarContent={
        <div>
          <Tooltip title={intl.formatMessage({ id: 'publish' })}>
            <IconButton
              disabled={changed || isPublishing}
              onClick={handlePublish}
              color="inherit"
            >
              {isPublishing ? (
                <CircularProgress
                  color="secondary"
                  style={{ height: 20, width: 20 }}
                />
              ) : (
                <Save style={{ width: 25, height: 25 }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage({ id: 'delete' })}
            onClick={() => {
              openDeleteDialog()
            }}
          >
            <IconButton disabled={isPublishing} color="inherit">
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      }
    >
      <React.Fragment>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: 18,
            flexWrap: 'wrap',
          }}
        >
          <KeyboardDateTimePicker
            value={start}
            ampm={false}
            onChange={changeStart}
            inputVariant="outlined"
            label={intl.formatMessage({ id: 'start', defaultMessage: 'Start' })}
            format="DD.MM.YYYY HH:mm"
            style={{ margin: 8, minWidth: 200 }}
          />
          <KeyboardDateTimePicker
            value={end}
            ampm={false}
            onChange={changeEnd}
            inputVariant="outlined"
            label={intl.formatMessage({ id: 'end', defaultMessage: 'End' })}
            format="DD.MM.YYYY HH:mm"
            style={{ margin: 8, minWidth: 200 }}
          />
        </div>
        {initialized && (
          <SimpleEditor
            handleImageUpload={handleImageUpload}
            onStateChanged={onStateChanged}
            onDefferedStateChange={onDefferedStateChange}
            initialState={post}
          />
        )}
      </React.Fragment>
    </Page>
  )
}

export default Post
