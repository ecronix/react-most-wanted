import React from "react";
import { TextField as MuiTextField } from "@mui/material";
import { ErrorMetaType, showErrorOnChange } from "./Util";
import {
  Field,
  FieldInputProps,
  FieldMetaState,
  FieldProps,
  FieldRenderProps,
} from "react-final-form";
import { TextFieldProps } from "mui-rff";
import { TEXT_FIELD_TYPE } from "mui-rff/dist/TextField";

/*
const identity = (value) => value

const TextField = ({ fieldProps, ...rest }) => {
  return (
    <SourceField
      required
      fieldProps={{ parse: identity, ...fieldProps }}
      {...rest}
    />
  )
}

export { TextField }
export default TextField
*/

type TextFieldType = {
  name: string;
  type?: TEXT_FIELD_TYPE;
  fieldProps?: FieldProps<any, any, any>;
} & Omit<TextFieldProps, "name" | "type">;

export function TextField(props: TextFieldType) {
  const { name, type, fieldProps, ...rest } = props;

  return (
    <Field
      name={name}
      type={type}
      render={({ input, meta }) => (
        <TextFieldWrapper
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

type TextFieldWrapperType = FieldRenderProps<any, HTMLElement> & {
  input: FieldInputProps<any>;
  meta: FieldMetaState<any>;
  required?: boolean;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  showError?: (meta: ErrorMetaType) => boolean;
} & Omit<TextFieldProps, "helperText" | "error">;

export function TextFieldWrapper(props: TextFieldWrapperType) {
  const {
    input: { name, value, type, onChange, onBlur, onFocus, ...restInput },
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
    <MuiTextField
      // ...rest was on bottom
      {...rest}
      fullWidth={fullWidth}
      helperText={isError ? error || submitError : helperText}
      error={isError}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      value={value}
      type={type}
      required={required}
      inputProps={{ required, ...restInput }}
    />
  );
}
