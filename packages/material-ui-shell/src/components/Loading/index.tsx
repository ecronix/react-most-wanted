import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

/**
 * @description Circular loading indicator.
 * @returns CircularProgress component with size of 50
 */
export default function Loading(): JSX.Element {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={50} />
    </div>
  )
}
