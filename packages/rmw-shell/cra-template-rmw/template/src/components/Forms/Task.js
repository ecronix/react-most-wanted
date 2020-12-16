import React from 'react'
//import { TextField } from 'mui-rff'
import {
  Autocomplete,
  KeyboardDatePicker,
  TextField,
} from 'rmw-shell/lib/components/FormFields'

// eslint-disable-next-line
const Form = ({ id, handleSubmit, values, users = [] }) => {
  const helpers = users.map((u) => {
    const { key, val } = u
    const { displayName } = val

    return { label: displayName, value: key }
  })

  return (
    <form
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
          fullWidth={true}
        />
        <br />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          minRows={2}
        />
        <br />

        <KeyboardDatePicker
          label={'Due to'}
          name="due_to"
          inputVariant="outlined"
          margin="normal"
          format="DD.MM.YYYY"
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

export default Form
