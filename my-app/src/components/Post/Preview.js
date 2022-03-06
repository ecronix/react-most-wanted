import React from 'react'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import { injectIntl } from 'react-intl'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { makeStyles } from '@mui/styles'
import Collapse from '@mui/material/Collapse'
import Scrollbar from 'rmw-shell/lib/components/Scrollbar'

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

const getPostData = (post) => {
  const { elements = [] } = post || {}
  let title = ''
  let description = ''
  let thumbnail = ''

  for (let i = 0; i < elements.length; i++) {
    const e = elements[i]
    if (e.title) {
      title = e.value
    }
    if (e.description) {
      description = e.value
    }
    if (e.type === 'image') {
      thumbnail = e.thumbnail || e.downloadURL
    }

    if (title && description && thumbnail) {
      return { title, description, thumbnail }
    }
  }
  return { title, description, thumbnail }
}

const Post = ({ uid, val, handlePostClick, index, intl, handleLike, auth }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const {
    post = {},
    author = {},
    timesamp = moment(),
    level = {},
    publishedOn = false,
  } = val
  const { title } = getPostData(post)
  const { displayName, photoURL } = author
  const { levelName = '' } = level
  const key = uid
  const { elements = [] } = post

  return (
    <Card key={key} style={{ margin: 8 }}>
      <CardHeader
        style={{ padding: 14 }}
        avatar={<Avatar src={photoURL} aria-label="recipe" />}
        action={
          <IconButton
            className={
              expanded ? [classes.expand, classes.expandOpen] : [classes.expand]
            }
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </IconButton>
        }
        title={
          <div>
            {displayName}
            {publishedOn ? null : (
              <Chip
                style={{ marginLeft: 14 }}
                size="small"
                label={intl.formatMessage({ id: 'draft' })}
                color="secondary"
                variant="outlined"
              />
            )}
          </div>
        }
        subheader={
          <div>
            <div>{levelName}</div>
            <div>{moment(timesamp).format('DD.MM.YYYY HH:mm')}</div>
          </div>
        }
      />

      <CardContent
        style={{ cursor: 'pointer', padding: 14, height: 79 }}
        onClick={
          handlePostClick ? () => handlePostClick(key, val, index) : undefined
        }
      >
        <Typography variant="h5" component="p">
          {title}
        </Typography>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ height: 350, padding: 0 }}>
          <Scrollbar>
            <div
              style={{
                //width: '100%',
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {elements.map((p, i) => {
                if (p.type === 'text') {
                  if (i === 0) {
                    return null
                  }

                  return (
                    <div>
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
                        maxWidth: '100%',
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
          </Scrollbar>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export { getPostData }
export default injectIntl(Post)
