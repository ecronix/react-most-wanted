import React from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

export default function pickerProviderWrapper(
  dateFunsUtils,
  component,
  locale
) {
  return dateFunsUtils
    ? React.createElement(
        MuiPickersUtilsProvider,
        { locale: locale, utils: dateFunsUtils },
        component
      )
    : component
}
