import React from 'react'
import { TextField } from 'mui-rff'
import { Autocomplete } from 'rmw-shell/lib/components/FormFields/Autocomplete'

export default function ({ id, handleSubmit, users = [] }) {
  const helpers = users.map((u) => {
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
          openOnFocus
          label="Select Helper"
          name="helper"
          options={helpers}
          getOptionValue={(option) => option}
          getOptionLabel={(option) => option.label || ''}
          getOptionSelected={(o, v) => {
            return o.value === v.value
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
        />
      </div>
    </form>
  )
}
