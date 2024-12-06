import React from "react";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { Field, FieldRenderProps } from "react-final-form";
import { ErrorMetaType, showErrorOnChange } from "./Util";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Moment } from "moment";

type KeyboardDatePickerProps = {
  name: string;
  fieldProps?: any;
} & React.ComponentProps<typeof KeyboardDatePickerWrapper>;

export function KeyboardDatePicker(props: KeyboardDatePickerProps) {
  const { name, fieldProps, ...rest } = props;
  return React.createElement(
    Field,
    Object.assign(
      {
        name: name,
        render: (fieldRenderProps: FieldRenderProps<any, HTMLElement>) =>
          React.createElement(
            KeyboardDatePickerWrapper,
            Object.assign({}, fieldRenderProps, rest)
          ),
      },
      fieldProps
    )
  );
}

type KeyboardDatePickerWrapperProps = FieldRenderProps<any, HTMLElement> & {
  formatValue?: (value: Moment | null) => string | null;
  dateFunsUtils?: any;
  locale?: string;
  showError?: (meta: ErrorMetaType) => boolean;
} & Omit<
    DatePickerProps<Moment, boolean>,
    "onChange" | "value" | "renderInput"
  >;

function KeyboardDatePickerWrapper(props: KeyboardDatePickerWrapperProps) {
  const {
    input: { name, onChange, value, ...restInput },
    formatValue = (v: Moment | null) => {
      if (v && v.isValid()) {
        return v.format();
      } else {
        return null; //v?._i
      }
    },
    meta,
    dateFunsUtils,
    locale,
    showError = showErrorOnChange,
    ...rest
  } = props;
  const { error, submitError } = meta;
  const isError = showError({ meta });
  const { helperText, ...lessrest } = rest;

  return (
    React.createElement(
      DatePicker,
      Object.assign(
        {
          disableToolbar: true,
          fullWidth: true,
          autoOk: true,
          helperText: isError ? error || submitError : helperText,
          error: isError,
          onChange: (v: Moment | null) => {
            onChange(formatValue(v));
          },
          name: name,
          value: value === "" ? null : value,
          inputProps: restInput,
          renderInput: (params: TextFieldProps) => <TextField {...params} />,
        },
        lessrest
      )
    ),
    locale
  );
}
