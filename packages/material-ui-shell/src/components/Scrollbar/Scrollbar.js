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
    /* native scrollbars needs to be conditionally turned off in rtl */
    <Scrollbars
    hideTracksWhenNotNeeded
    ref={refSetter}
    renderView={props => (
      isRTL ? <div {...props} style={{
        ...props.style,
        marginLeft: props.style.marginRight,
        marginRight: 0, }} /> : <div {...props} style={{
          ...props.style,}} />
    )}
    {...rest} />
  )
}

export default Scrollbar
