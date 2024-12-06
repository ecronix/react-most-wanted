import React from "react";
import { DesktopDatePicker, DesktopDatePickerProps } from "@mui/x-date-pickers";
import { showErrorOnChange } from "./Util";
import { Field, FieldInputProps, FieldMetaState } from "react-final-form";
import { Moment } from "moment";

type DatePickerProps = {
  input: FieldInputProps<any, HTMLElement>;
  meta: FieldMetaState<any>;
  formatValue?: (value: Moment | null) => string | null;
  fullWidth: boolean;
  helperText?: React.ReactNode;
  showError?: (meta: any) => boolean;
  required?: boolean;
  [key: string]: any;
};

export function DatePicker(props: DatePickerProps) {
  const { name, type, fieldProps, ...rest } = props;

  return (
    <Field
      name={name}
      type={type}
      render={({ input, meta }) => (
        <DatePickerWrapper
          {...rest}
          input={input}
          meta={meta}
          name={name}
          type={type}
        />
      )}
      {...fieldProps}
    />
  );
}

type DatePickerWrapperProps = DesktopDatePickerProps<Moment, boolean> & {
  input: FieldInputProps<any>;
  meta: FieldMetaState<any>;
  formatValue?: (value: Moment | null) => string | null;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  showError?: (meta: any) => boolean;
  required?: boolean;
  name?: string;
  type?: string;
};

export function DatePickerWrapper(props: DatePickerWrapperProps) {
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
      // fullWidth={fullWidth}
      // helperText={isError ? error || submitError : helperText}
      // error={isError}
      onChange={(v: Moment | null) => {
        onChange(formatValue(v));
      }}
      // onBlur={onBlur}
      // onFocus={onFocus}
      name={name}
      value={value}
      type={type}
      // required={required}
      // inputProps={{ required, ...restInput }}
      // renderInput={(params: TextFieldProps) => <TextField {...params} />}
      {...rest}
    />
  );
}
