import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Search from '@material-ui/icons/Search'

let timeout = null

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    flex: 1,
    borderRadius: 4,
    minHeight: 48,
    display: 'block',
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 0,
      '&:focus': {
        width: 240,
      },
    },
  },
  rootOpen: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    flex: 1,
    borderRadius: 4,
    minHeight: 48,
    display: 'block',
    background: fade(theme.palette.common.white, 0.25),
    width: 240,
  },
  search: {
    width: theme.spacing(1) * 5,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing(1) * 2}px 0px 0px ${theme.spacing(1) * 5}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
  inputOpen: {
    font: 'inherit',
    padding: `${theme.spacing(1) * 2}px 0px 0px ${theme.spacing(1) * 5}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    outline: 0,
  },
}))

export default function ({
  onChange,
  initialValue = '',
  alwaysOpen,
  deferTime = 1000,
}) {
  const classes = useStyles()
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(initialValue)
  }, [])

  const hasValue = value && value !== ''
  const isOpen = hasValue || alwaysOpen

  const handleChange = (v) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    setValue(v)

    timeout = setTimeout(() => {
      if (onChange) {
        onChange(v)
      }
    }, deferTime)
  }

  return (
    <div className={isOpen ? classes.rootOpen : classes.root}>
      <div className={classes.search}>
        <Search />
      </div>
      <input
        autoComplete="off"
        id="search-input"
        value={value}
        ref={(node) => {
          if (node && initialValue && initialValue !== '') {
            node.focus()
          }
        }}
        className={isOpen ? classes.inputOpen : classes.input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}
