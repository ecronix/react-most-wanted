import React from 'react'
//import { TextField } from 'mui-rff'
import { TextField } from '@mui/material'

export default function ({ handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <button type="submit" style={{ display: 'none' }} />
      <div>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth={false}
        />
        <br />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          margin="normal"
          fullWidth={true}
          multiline
          rows={2}
        />
      </div>
    </form>
  )
}
