import React, { useCallback } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useTheme as useAppTheme } from '@ecronix/material-ui-shell'

/**
 * A functional React component that wraps around a custom scrollbar implementation.
 *
 * The `Scrollbar` component provides a customizable scrollbar with support for RTL (right-to-left)
 * layouts and dynamic reference forwarding. It uses react-custom-scrollbars-2 package as base.
 *
 * @param {ScrollbarProps} props - The properties passed to the `Scrollbar` component.
 * @param {(ref: any) => void} [props.forwardedRef=() => {}] - A callback function for setting the forwarded reference
 *   to the scrollable view.
 * @param rest - Additional props passed to the underlying `Scrollbars` component.
 *
 * @returns The rendered scrollbar component.
 *
 * @example
 *  <Scrollbar>
 *    <CustomComponents />
 *  </Scrollbar>
 */
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
