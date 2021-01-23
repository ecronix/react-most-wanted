import React, { useCallback } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

const Scrollbar = (props) => {
  const { forwardedRef = () => {}, ...rest } = props

  const refSetter = useCallback(
    (scrollbarsRef) => {
      if (scrollbarsRef) {
        forwardedRef(scrollbarsRef.view)
      } else {
        forwardedRef(null)
      }
    },
    [forwardedRef]
  )

  // return <Scrollbars hideTracksWhenNotNeeded ref={refSetter} {...rest} />
  return (
  <Scrollbars
    hideTracksWhenNotNeeded
    ref={refSetter}
    renderView={props =>
      (<div
        {...props}
        style={{
          ...props.style,
          marginLeft: props.style.marginRight, 
          marginRight: 0, 
        }} /> )}
    {...rest} />)
}

export default Scrollbar
