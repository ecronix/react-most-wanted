import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

const Scrollbar = props => {
  const { ...rest } = props

  return <Scrollbars hideTracksWhenNotNeeded {...rest} />
}

export default Scrollbar
