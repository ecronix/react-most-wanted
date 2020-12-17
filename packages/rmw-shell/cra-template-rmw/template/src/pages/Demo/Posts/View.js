import React, { useEffect } from 'react'
import Page from 'material-ui-shell/lib/containers/Page'
import Typography from '@material-ui/core/Typography'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import moment from 'moment'
import { useHistory, useParams } from 'react-router'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'

const View = () => {
  const history = useHistory()
  const { uid } = useParams()
  const { watchPath, getPath, clearPath } = usePaths()

  const path = `posts/${uid}`

  useEffect(() => {
    watchPath(path)
    return () => {
      clearPath(path)
    }
  }, [path, watchPath, clearPath])

  const postData = getPath(path)
  const { post, author } = postData || {}
  const { elements = [], timesamp } = post || {}
  const { displayName, photoURL } = author || {}

  return (
    <Page
      onBackClick={() => {
        history.goBack()
      }}
    >
      <Scrollbar>
        <div
          style={{
            width: '100%',
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: 18,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Avatar
                src={photoURL}
                aria-label="recipe"
                style={{
                  width: 100,
                  height: 100,
                  //margin: 18,
                  //marginRigth: 8,
                }}
              />
              <div style={{ padding: 8 }}>
                <Typography variant="h6">{displayName}</Typography>
                <Typography variant="body1" color="textSecondary">
                  {moment(timesamp).format('DD.MM.YYYY HH:mm')}
                </Typography>
              </div>
            </div>
          </div>
          {elements.map((p, i) => {
            if (p.type === 'text') {
              return (
                <div>
                  {i === 0 && (
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        //marginBottom: 20,
                      }}
                    >
                      <Typography
                        key={p.value}
                        variant={i === 0 ? 'h3' : 'body1'}
                        style={{
                          fontSize: i === 0 ? undefined : p.fontSize,
                          //margin: 8,
                          marginTop: p.marginTop,
                          //fontWeight: i === 0 ? 900 : undefined,
                        }}
                      >
                        {p.value}
                      </Typography>
                    </div>
                  )}
                  {i !== 0 && (
                    <Typography
                      key={p.value}
                      variant={i === 0 ? 'h2' : 'body1'}
                      style={{
                        fontSize: i === 0 ? undefined : p.fontSize,
                        //margin: 8,
                        marginTop: p.marginTop,
                        textAlign: 'justify',
                        //fontWeight: i === 0 ? 900 : undefined,
                      }}
                    >
                      {p.value}
                    </Typography>
                  )}
                </div>
              )
            }

            if (p.type === 'image') {
              return (
                <img
                  key={p.value}
                  src={p.downloadURL}
                  alt="img"
                  style={{
                    maxWidth: '100vw',
                    maxHeight: 438,
                    alignSelf: 'center',
                    margin: 0,
                    marginTop: 30,
                  }}
                />
              )
            }

            return null
          })}
        </div>
        <Divider style={{ marginBottom: 30, marginTop: 30 }} />
      </Scrollbar>
    </Page>
  )
}

export default View
