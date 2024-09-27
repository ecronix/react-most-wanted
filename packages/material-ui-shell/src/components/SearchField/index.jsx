import React, { useEffect, useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import { styled, alpha } from '@mui/material/styles'
import { InputBase } from '@mui/material'

let timeout = null

const Search = styled('div')(({ theme, isOpen }) => {
  return {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: isOpen
      ? alpha(theme.palette.common.white, 0.15)
      : undefined,
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }
})

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme, isOpen }) => {
  return {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: isOpen ? '20ch' : '0ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }
})

export default function SearchField({
  onChange,
  initialValue = '',
  alwaysOpen,
  deferTime = 1000,
}) {
  const [value, setValue] = useState('')
  useEffect(() => {
    setValue(initialValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Search isOpen={isOpen}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        isOpen={isOpen}
        autoComplete="off"
        id="search-input"
        value={value}
        ref={(node) => {
          if (node && initialValue && initialValue !== '') {
            node.focus()
          }
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Search>
  )
}
