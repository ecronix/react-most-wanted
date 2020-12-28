import React, { useCallback } from 'react'
import { ListPage } from 'rmw-shell/lib/containers/Page'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useAuth } from 'base-shell/lib/providers/Auth'
import Post from '../../../components/Post/Post'

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
      onCreateClick={() => {
        history.push(`/create_post`)
      }}
    />
  )
}

export default Posts
