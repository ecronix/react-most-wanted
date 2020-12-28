import React, { useEffect, useState, useCallback } from 'react'
import Page from 'material-ui-shell/lib/containers/Page'
import { useHistory, useParams } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import Publish from '@material-ui/icons/Publish'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Delete from '@material-ui/icons/Delete'
import { useIntl } from 'react-intl'
import moment from 'moment'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import SimpleEditor from 'rmw-shell/lib/containers/PostEditor'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'

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
    }
  }, [auth.uid, firebaseApp, uid])

  useEffect(() => {
    if (uid) {
      loadPost()
    }
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
        img.onload = async () => {
          const index = file.name.lastIndexOf('.')
          const fileExtension = file.name.slice(index)
          const path = `user_posts/${
            auth.uid
          }/${uid}/${Date.now()}${fileExtension}`
          let snapshot = await firebaseApp.storage().ref(path).put(file)

          const downloadURL = await snapshot.ref.getDownloadURL()
          const contentType = snapshot.metadata.contentType || null

          resolve({
            downloadURL,
            contentType,
            width: img.width,
            height: img.height,
            path,
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

  const onDefferedStateChange = async (post) => {
    await firebaseApp.database().ref(`posts/${uid}`).update({
      post,
    })

    setChanged(false)
  }

  const handleDelete = async (handleClose) => {
    if (uid) {
      await firebaseApp.database().ref().child(`posts/${uid}`).remove()

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
              disabled={isPublishing}
              onClick={handlePublish}
              color="inherit"
            >
              {isPublishing ? (
                <CircularProgress
                  color="secondary"
                  style={{ height: 20, width: 20 }}
                />
              ) : (
                <Publish style={{ width: 25, height: 25 }} />
              )}
            </IconButton>
          </Tooltip>
          {uid && (
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
          )}
        </div>
      }
    >
      <React.Fragment>
        <SimpleEditor
          handleImageUpload={handleImageUpload}
          onStateChanged={onStateChanged}
          //onDefferedStateChange={onDefferedStateChange}
          initialState={post}
        />
      </React.Fragment>
    </Page>
  )
}

export default Post
