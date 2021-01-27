import React, { useCallback } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'

const Scrollbar = (props) => {
  const { forwardedRef = () => {}, ...rest } = props
  const { isRTL } = useAppTheme()

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
  return (
    /* native scrollbars need to be conditionally turned off in rtl */
    isRTL
    ? <Scrollbars
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
    {...rest} /> 
    : <Scrollbars hideTracksWhenNotNeeded ref={refSetter} {...rest} />
  )
}

export default Scrollbar
