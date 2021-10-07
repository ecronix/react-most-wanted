import React from 'react'
import {
  Autocomplete,
  KeyboardDatePicker,
  TextField,
  DatePicker,
} from 'rmw-shell/lib/components/FormFields'
import Stack from '@mui/material/Stack'
// eslint-disable-next-line
const Form = ({ id, handleSubmit, values, users = [] }) => {
  const helpers = users.map((u) => {
    const { key, val } = u
    const { name } = val

    return { label: name, value: key }
  })

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <button type="submit" style={{ display: 'none' }} />
      <Stack spacing={3}>
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth={true}
        />

        <TextField
          label="Description"
          name="description"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          minRows={2}
        />

        <DatePicker
          label={'Due to'}
          name="due_to"
          inputVariant="outlined"
          margin="normal"
          mask="__.__.____"
          //format="DD.MM.YYYY"
          autoOk={true}
        />

        <Autocomplete
          openOnFocus
          label="Select Company"
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
      </Stack>
    </form>
  )
}

export default Form
