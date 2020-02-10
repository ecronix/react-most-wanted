import React from 'react'
import TrackVisibility from 'react-on-screen'
import Fade from '@material-ui/core/Fade'

const CustomFade = ({ children, timeout = 2000 }) => {
  return (
    <TrackVisibility once partialVisibility>
      {({ isVisible }) => (
        <Fade in={isVisible} timeout={timeout}>
          {children}
        </Fade>
      )}
    </TrackVisibility>
  )
}

export default CustomFade
