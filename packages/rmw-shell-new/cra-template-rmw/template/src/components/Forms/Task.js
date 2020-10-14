import React from 'react'
import { TextField, Autocomplete } from 'mui-rff'

export default function ({ id, handleSubmit, values, users = [] }) {
  const autocompleteData = users.map((u) => {
    const { key, val } = u
    const { displayName } = val

    return { label: displayName, value: key }
  })

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <button type="submit" style={{ display: 'none' }} />
      <div>
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth={false}
        />
        <br />
        <Autocomplete
          label="Choose one planet"
          name="helper"
          multiple={false}
          //required={required.planet}
          options={autocompleteData}
          getOptionValue={(option) => option.value}
          getOptionLabel={(option) => option.label}
          renderOption={(option) => option.label}
          disableCloseOnSelect={false}
          helperText={'test'}
          freeSolo={true}
          onChange={(_event, newValue, reason, details) => {
            if (
              newValue &&
              reason === 'select-option' &&
              details?.option.inputValue
            ) {
              // Create a new value from the user input
              autocompleteData.push({
                value: details?.option.inputValue,
                label: details?.option.inputValue,
              })
            }
          }}
          filterOptions={(options, params) => {
            const filtered = options.filter((v) => {
              return (
                JSON.stringify(v)
                  .toUpperCase()
                  .indexOf(params.inputValue.toUpperCase()) !== -1
              )
            })

            return filtered
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
        />
      </div>
    </form>
  )
}
