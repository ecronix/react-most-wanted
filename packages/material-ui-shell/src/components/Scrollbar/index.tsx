import React, { useCallback } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useTheme as useAppTheme } from '@ecronix/material-ui-shell'

export default function Scrollbar(props: any) {
  const { forwardedRef = () => {}, ...rest } = props
  const { isRTL } = useAppTheme()

  const refSetter = useCallback(
    (scrollbarsRef: any) => {
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
      renderView={(props) =>
        isRTL ? (
          <div
            {...props}
            style={{
              ...props.style,
              marginLeft: props.style.marginRight,
              marginRight: 0,
            }}
          />
        ) : (
          <div
            {...props}
            style={{
              ...props.style,
            }}
          />
        )
      }
      {...rest}
    />
  )
}
