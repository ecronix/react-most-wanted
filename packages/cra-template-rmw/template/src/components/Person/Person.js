import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const Person = ({ name, label, src, alt = 'img' }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Avatar
        src={src || 'background.webp'}
        data-src={src || 'background.webp'}
        title="Main image"
        className="lazyload"
        loading="lazy"
        style={{ width: 120, height: 120 }}
        alt={alt}
      />
      <br />
      <Typography variant="h5" color="secondary">
        {name}
      </Typography>
      <Typography
        variant="h6"
        style={{ paddingLeft: '6px', paddingRight: '6px' }}
      >
        {label}
      </Typography>
    </div>
  )
}

export default Person
