/*
*SOURCE: https://github.com/lookfirst/mui-rff/blob/master/src/Autocomplete.tsx
This should be removed and the native one used ASAP this issues is fixed: https://github.com/lookfirst/mui-rff/issues/308
*/

import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  AutocompleteChangeDetails,
  Autocomplete as MuiAutocomplete,
} from "@mui/material";
import React from "react";
import { Field, FieldInputProps, FieldMetaState } from "react-final-form";
import { showErrorOnChange } from "./Util";

type AutocompleteProps = {
  name: string;
  fieldProps: any;
  input: FieldInputProps<any>;
  meta: FieldMetaState<any>;
  options: string[];
  label: string;
  // [key: string]: any;
};
export function Autocomplete(props: AutocompleteProps) {
  const { name, fieldProps, ...rest } = props;
  return React.createElement(
    Field,
    Object.assign(
      {
        name: name,
        render: (fieldRenderProps: AutocompleteProps) =>
          React.createElement(
            AutocompleteWrapper,
            Object.assign({}, fieldRenderProps, rest)
          ),
      },
      fieldProps
    )
  );
}
type AutocompleteWrapperProps = {
  input: FieldInputProps<any>;
  meta: FieldMetaState<any>;
  options: string[];
  label: string;
  required?: boolean;
  multiple?: boolean;
  textFieldProps?: TextFieldProps;
  getOptionValue?: (option: string) => string;
  getOptionSelected?: (option: string, value: string) => boolean;
  showError?: (meta: FieldMetaState<any>) => boolean;
  placeholder?: string;
  onChangeCallback?: (value: any) => void;
  [key: string]: any;
};
function AutocompleteWrapper(props: AutocompleteWrapperProps) {
  const {
    input: { name, onChange, value },
    meta,
    options,
    label,
    required,
    multiple,
    textFieldProps,
    getOptionValue,
    getOptionSelected,
    showError = showErrorOnChange,
    placeholder,
    onChange: onChangeCallback,
    ...rest
  } = props;

  function getValue(values) {
    if (!getOptionValue) {
      return values;
    }
    // ternary hell...
    return multiple
      ? values
        ? values.map(getOptionValue)
        : null
      : values
      ? getOptionValue(values)
      : null;
  }
  const { helperText, ...lessrest } = rest;
  const { variant, ...restTextFieldProps } = textFieldProps || {};

  // yuck...
  let defaultValue: null | any[] | any = null;
  if (!getOptionValue) {
    defaultValue = value;
  } else if (value) {
    options.forEach((option) => {
      const optionValue = getOptionValue(option);
      if (multiple) {
        if (!defaultValue) {
          defaultValue = [];
        }
        value.forEach((v) => {
          if (getOptionSelected?.(optionValue, v)) {
            defaultValue?.push(option);
          }
        });
      } else {
        if (getOptionSelected?.(optionValue, value)) {
          defaultValue = option;
        }
      }
    });
  }

  //defaultValue = getValue(value)

  const onChangeFunc = (
    event: React.SyntheticEvent,
    value: any,
    details?: string,
    reason?: AutocompleteChangeDetails<unknown>
  ) => {
    const gotValue = getValue(value);
    onChange(gotValue);
    if (onChangeCallback) {
      onChangeCallback(event, value, reason, details);
    }
  };
  const { error, submitError } = meta;
  const isError = showError({ meta });

  return React.createElement(
    MuiAutocomplete,
    Object.assign(
      {
        multiple: multiple,
        onChange: onChangeFunc,
        options: options,
        value: defaultValue,
        renderInput: (params: TextFieldProps) =>
          React.createElement(
            TextField,
            Object.assign(
              {
                label: label,
                required: required,
                helperText: isError ? error || submitError : helperText,
                error: isError,
                name: name,
                placeholder: placeholder,
                variant: variant,
              },
              params,
              restTextFieldProps,
              { fullWidth: true, value }
            )
          ),
      },
      lessrest
    )
  );
}
