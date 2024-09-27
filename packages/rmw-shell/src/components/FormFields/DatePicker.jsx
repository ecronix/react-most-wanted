import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { showErrorOnChange } from "./Util";
import { Field } from "react-final-form";

export function DatePicker(props) {
  const { name, type, fieldProps, ...rest } = props;

  return (
    <Field
      name={name}
      type={type}
      render={({ input, meta }) => (
        <DatePickerWrapper
          input={input}
          meta={meta}
          name={name}
          type={type}
          {...rest}
        />
      )}
      {...fieldProps}
    />
  );
}

export function DatePickerWrapper(props) {
  const {
    input: { name, value, type, onChange, onBlur, onFocus, ...restInput },
    formatValue = (v) => {
      if (v && v.isValid()) {
        return v.format();
      } else {
        return null; //v?._i
      }
    },
    meta,
    required,
    fullWidth = true,
    helperText,
    showError = showErrorOnChange,
    ...rest
  } = props;

  const { error, submitError } = meta;
  const isError = showError({ meta });

  return (
    <DesktopDatePicker
      fullWidth={fullWidth}
      helperText={isError ? error || submitError : helperText}
      error={isError}
      onChange={(v) => {
        onChange(formatValue(v));
      }}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      value={value}
      type={type}
      required={required}
      inputProps={{ required, ...restInput }}
      renderInput={(params) => <TextField {...params} />}
      {...rest}
    />
  );
}
