import React, { Attributes } from "react";
import { FormHelperText } from "@mui/material";
import { FieldMetaState, useField } from "react-final-form";

type ErrorMessageProps = {
  showError: boolean;
  meta: { error: string; submitError: string };
  formHelperTextProps: Attributes;
  helperText: string;
};

export type ErrorMetaType = {
  meta: FieldMetaState<any>;
};
export function ErrorMessage({
  showError,
  meta,
  formHelperTextProps,
  helperText,
}: ErrorMessageProps) {
  if (showError) {
    return React.createElement(
      FormHelperText,
      Object.assign({}, formHelperTextProps),
      meta.error || meta.submitError
    );
  } else if (!!helperText) {
    return React.createElement(
      FormHelperText,
      Object.assign({}, formHelperTextProps),
      helperText
    );
  } else {
    return React.createElement(React.Fragment, null);
  }
}
const config = {
  subscription: {
    error: true,
    submitError: true,
    dirtySinceLastSubmit: true,
    touched: true,
    modified: true,
  },
};
export const useFieldForErrors = (name: string) => useField(name, config);

export const showErrorOnChange = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched, modified },
}: ErrorMetaType) =>
  !!(
    ((submitError && !dirtySinceLastSubmit) || error) &&
    (touched || modified)
  );
export const showErrorOnBlur = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched },
}: ErrorMetaType) =>
  !!(((submitError && !dirtySinceLastSubmit) || error) && touched);
