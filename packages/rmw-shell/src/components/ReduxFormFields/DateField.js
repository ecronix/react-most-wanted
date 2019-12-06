/* eslint-disable react/prop-types */
import React from 'react'
import moment from 'moment'
import { KeyboardDatePicker } from '@material-ui/pickers'

const DateField = props => {
  const {
    meta = {},
    input: { value, ...inputProps },
    dateFormat,
    yearPuffer,
    ...others
  } = props
  const { submitting, error, touched } = meta

  const handleBlur = e => {
    const value = e.target.value
    if (moment(value, dateFormat).isValid()) {
      let date = moment(value, dateFormat)

      if (date.month() < moment().month() && date.year() === moment().year() && moment().month() > 11 - yearPuffer) {
        date.add(1, 'year')
      }

      inputProps.onBlur(date.format())
    } else {
      inputProps.onBlur(null)
    }
  }

  const onAccept = value => {
    inputProps.onChange(moment(value, dateFormat).format())
  }

  return (
    <KeyboardDatePicker
      placeholder={moment().format()}
      {...inputProps}
      {...others}
      format={dateFormat}
      value={value ? new Date(value) : null}
      disabled={submitting}
      onBlur={handleBlur}
      error={error && touched}
      onAccept={onAccept}
    />
  )
}

DateField.defaultProps = {
  autoOk: true,
  disableOpenOnEnter: true,
  dateFormat: 'DD.MM.YYYY',
  yearPuffer: 0
}

export default DateField
