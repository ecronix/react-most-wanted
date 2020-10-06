import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'

const Company = ({ company, history }) => {
  const { uid, name = '', description = '', feed = '', photoURL } = company

  return (
    <div key={uid} style={{ padding: 15 }}>
      <Card
        style={{
          width: '100%',
          //margin: 15,
          height: 400,
          maxWidth: 400,
          minWidth: 250,
          alignSelf: 'flex-start',
        }}
      >
        <CardActionArea
          onClick={() => {
            history.push(`/signin`)
          }}
        >
          <CardMedia
            component="img"
            style={{ height: 140 }}
            image={photoURL || '/background.webp'}
            data-src={photoURL || '/background.webp'}
            title="Main image"
            className="lazyload"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ padding: 15 }}>
          <Typography
            gutterBottom
            variant="body1"
            style={{ textAlign: 'justify' }}
          >
            {description && description.substring(0, 150)}
            {description && feed.length > 150 && '...'}
          </Typography>
        </CardActions>
      </Card>
    </div>
  )
}

export default withRouter(Company)
