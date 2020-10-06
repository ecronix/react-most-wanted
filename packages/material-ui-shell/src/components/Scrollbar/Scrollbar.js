import React, { useCallback } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

const Scrollbar = (props) => {
  const { forwardedRef = () => {}, ...rest } = props

  const refSetter = useCallback((scrollbarsRef) => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view)
    } else {
      forwardedRef(null)
    }
  }, [])

  return <Scrollbars hideTracksWhenNotNeeded ref={refSetter} {...rest} />
}

export default Scrollbar
