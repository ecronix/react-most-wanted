import React, { useCallback } from 'react'
import { ListPage } from 'rmw-shell/lib/containers/Page'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useAuth } from 'base-shell/lib/providers/Auth'
import Post from '../../../components/Post/Post'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import moment from 'moment'

const Row = ({ data, index, style }) => {
  const { key } = data
  const { auth } = useAuth()
  const history = useHistory()

  const handlePostClick = (key, val, index) => {
    history.push(`/posts/view/${key}`)
  }

  return (
    <div key={key} style={style}>
      <Post
        auth={auth}
        key={key}
        uid={key}
        val={data}
        index={index}
        handlePostClick={handlePostClick}
      />
    </div>
  )
}

const Posts = () => {
  const intl = useIntl()
  const history = useHistory()
  const { auth } = useAuth()
  const { firebaseApp } = useFirebase()

  const getRef = useCallback((firebaseApp) => {
    return firebaseApp
      .database()
      .ref('posts')
      .orderByChild('order')
      .limitToLast(300)
  }, [])

  return (
    <ListPage
      path={'posts'}
      getRef={getRef}
      createGrant="administrator"
      Row={Row}
      listProps={{ itemSize: 425 }}
      getPageProps={() => {
        return {
          pageTitle: intl.formatMessage({
            id: 'posts',
            defaultMessage: 'Posts',
          }),
        }
      }}
      onCreateClick={async () => {
        const { displayName = null, photoURL = null, uid = null } = auth

        const postSnap = await firebaseApp
          .database()
          .ref(`user_posts/${auth.uid}`)
          .push({
            timestamp: moment().format(),
            author: { displayName, photoURL, uid },
          })

        history.push(`/user_posts/edit/${postSnap.key}`)
      }}
    />
  )
}

export default Posts
