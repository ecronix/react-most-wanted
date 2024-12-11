import React, { useEffect, useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import { styled, alpha } from '@mui/material/styles'
import { InputBase } from '@mui/material'

let timeout: NodeJS.Timeout | null = null

const Search = styled('div')<{ open: boolean }>(({ theme, open }) => {
  return {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: open ? alpha(theme.palette.common.white, 0.15) : undefined,
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

const StyledInputBase = styled(InputBase)<{ open: boolean }>(({
  theme,
  open,
}) => {
  return {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: open ? '20ch' : '0ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }
})

type SearchFieldProps = {
  onChange: (v: string) => void
  initialValue: string
  alwaysOpen?: boolean
  deferTime?: number
}
export default function SearchField({
  onChange,
  initialValue = '',
  alwaysOpen,
  deferTime = 1000,
}: SearchFieldProps) {
  const [value, setValue] = useState('')
  useEffect(() => {
    setValue(initialValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasValue = value && value !== ''
  const isOpen = hasValue || alwaysOpen

  const handleChange = (v: string) => {
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
    <Search open={isOpen ?? false}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        open={isOpen ?? false}
        autoComplete="off"
        id="search-input"
        value={value}
        ref={(node: HTMLElement | null) => {
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
