import React from 'react'
import MUISlider from '@material-ui/core/Slider'

const Slider = ({
  input: { onChange, value },
  onChange: onChangeFromField,
  ...custom
}) => {
  return (
    <MUISlider
      value={value}
      {...custom}
      onChange={(event, value) => {
        onChange(value)
        if (onChangeFromField) {
          onChangeFromField(value)
        }
      }}
    />
  )
}

export default Slider
