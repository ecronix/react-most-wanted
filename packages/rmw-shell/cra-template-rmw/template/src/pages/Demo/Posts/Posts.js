import React, { useCallback } from 'react'
import { ListPage } from 'rmw-shell/lib/containers/Page'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useAuth } from 'base-shell/lib/providers/Auth'
import Post from '../../../components/Post/Post'

const Row = ({ data, index, style }) => {
  const { key } = data
  const { auth } = useAuth()
  const navigate = useNavigate()

  const handlePostClick = (key, val, index) => {
    navigate(`/posts/view/${key}`)
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
  const navigate = useNavigate()

  const getRef = useCallback(() => {}, [])

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
        navigate(`/create_post`)
      }}
    />
  )
}

export default Posts
